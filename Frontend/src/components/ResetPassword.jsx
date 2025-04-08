import {
    Box,
    Button,
    Container,
    Select,
    MenuItem,
    TextField,
    Typography,
    Alert,
    Snackbar,
    InputAdornment,
    IconButton
  } from '@mui/material';
  import { useNavigate } from 'react-router-dom';
  import { useState, useEffect } from 'react';
  import axios from 'axios';
  
  // You'll need to install these icons or use your own
  import Visibility from '@mui/icons-material/Visibility';
  import VisibilityOff from '@mui/icons-material/VisibilityOff';
  
  const ResetPassword = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
      newPassword: '',
      confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [message, setMessage] = useState('');
    const [email, setEmail] = useState('');
  
    useEffect(() => {
      // Get email from localStorage 
      const storedEmail = localStorage.getItem('email');
      if (storedEmail) {
        setEmail(storedEmail);
      } else {
        // You might want to redirect if email is not available
        setMessage('Email not found. Please try again.');
        setError(true);
      }
    }, []);
    
  
    const handleChange = (event) => {
      const { name, value } = event.target;
      setFormData({
        ...formData,
        [name]: value
      });
    };
  
    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };
  
    const toggleConfirmPasswordVisibility = () => {
      setShowConfirmPassword(!showConfirmPassword);
    };
  
    const validatePasswords = () => {
      if (!formData.newPassword) {
        setMessage('Please enter a new password');
        setError(true);
        return false;
      }
      
      if (formData.newPassword.length < 4) {
        setMessage('Password should be at least 4 characters long');
        setError(true);
        return false;
      }
  
      if (!formData.confirmPassword) {
        setMessage('Please confirm your password');
        setError(true);
        return false;
      }
  
      if (formData.newPassword !== formData.confirmPassword) {
        setMessage('Passwords do not match');
        setError(true);
        return false;
      }
  
      return true;
    };
  
    const handleResetPassword = async () => {
      if (!validatePasswords()) {
        return;
      }
  
      setLoading(true);
      
      try {
        // Call your password update API
        const response = await axios.post('http://localhost:5000/api/reset/update-password', {
          email: email,
          newPassword: formData.newPassword
        });
        
        // Handle successful password update
        setMessage(response.data.message || 'Password reset successfully!');
        setError(false);
        
        // Clear data from localStorage
        localStorage.removeItem('email');
        
        // Redirect to login page after a short delay
        setTimeout(() => {
          navigate('/login');
        }, 2000);
        
      } catch (error) {
        // Handle update failure
        setMessage(
          error.response?.data?.message || 
          'Failed to reset password. Please try again.'
        );
        setError(true);
      } finally {
        setLoading(false);
      }
    };
  
    // Handle closing of error/success message
    const handleCloseAlert = () => {
      setMessage('');
    };
  
    return (
      <Box display="flex" height="100vh" width="100vw">
        {/* Left Section */}
        <Box
          flex={1}
          sx={{
            backgroundImage:
              "url('https://s3-alpha-sig.figma.com/img/b436/fe5e/e1e81003db2cab973299f78b5dd4c030?Expires=1744588800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=h9bVsN2H~Kjyt4L-TLr-IAYvjn67Xt~7URAjY-wOflLkVknqLFkHzSNrjOVSWZsH1Cbgauf5HXtsGzTFwu0i4H4R0jbt8uaFyJ6M5RD7AeatOpx9nGLH2H83oDLQgtR7i6yBk-QpojrIb7HJxkcRMw3rEj0Zr0SmemxO9B75EiBymfaJluKTDrJCkik~PvdLCxHy52zSgx3WZVjvPXYHJfQYtXjFqWoyXAxC1qicut6ouWJPpc2WXM55dw3W81TMTVEm7Y-GIbkjiKWzKJxG5cKwl5gzArwKqKpWDnqnWE9RrLhUp-MI9ZUZSAUNfV7CYYEXEOOk9ndlltjvZV-Kww__')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            padding: 4,
          }}
        >
          <Box textAlign="center" maxWidth="300px">
            <Typography variant="h6" fontWeight="bold">
              Tips
            </Typography>
            <Typography variant="body2">
              Lorem ipsum dolor sit amet consectetur. Vestibulum sit id in cras.
              Aenean eget viverra tortor mus placerat enim. Lobortis amet odio
              lobortis convallis sapien purus eget. Porta ultrices.
            </Typography>
          </Box>
        </Box>
  
        {/* Right Section */}
        <Box flex={1} alignItems="center" justifyContent="center" bgcolor="#FAFAFA" marginTop={5}>
          <Container component="main" maxWidth="md">
            <Box textAlign="center" p={4} borderRadius={6} sx={{ bgcolor: "white", boxShadow: 3 }}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={20}>
                <Select value="en" size="small" sx={{ fontSize: "0.875rem", "& .MuiSelect-select": { py: 0.5 } }}>
                  <MenuItem value="en">English (United States) </MenuItem>
                </Select>
                <Typography variant="body2">
                  Already have an account? {" "}
                  <Button
                    onClick={() => navigate("/")}
                    variant="text"
                    sx={{
                      textTransform: "none",
                      width: "65px",
                      text: "#111111",
                      backgroundColor: "#8BD4E7",
                      p: 0,
                      minWidth: 0,
                    }}
                  >
                    Sign Up
                  </Button>
                </Typography>
              </Box>
  
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                Reset Password
              </Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom sx={{ mb: 3 }}>
                Please enter your new password
              </Typography>
  
              <Box sx={{ mb: 2 }}>
                <TextField
                  fullWidth
                  margin="normal"
                  name="newPassword"
                  label="New Password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.newPassword}
                  onChange={handleChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={togglePasswordVisibility}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                
                <TextField
                  fullWidth
                  margin="normal"
                  name="confirmPassword"
                  label="Confirm Password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={toggleConfirmPasswordVisibility}
                          edge="end"
                        >
                          {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
  
              <Button
                variant="contained"
                fullWidth
                onClick={handleResetPassword}
                disabled={loading}
                sx={{
                  mt: 2,
                  backgroundColor: "#8BD4E7",
                  "&:hover": { bgcolor: "#42A5F5" },
                  textTransform: "none",
                  py: 1,
                  fontSize: "0.9375rem",
                }}
              >
                {loading ? 'Resetting...' : 'Reset Password'}
              </Button>
            </Box>
          </Container>
        </Box>
        
        {/* Notification for success/error */}
        <Snackbar 
          open={Boolean(message)} 
          autoHideDuration={6000} 
          onClose={handleCloseAlert}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert 
            onClose={handleCloseAlert} 
            severity={error ? "error" : "success"} 
            sx={{ width: '100%' }}
          >
            {message}
          </Alert>
        </Snackbar>
      </Box>
    );
  };
  
  export default ResetPassword;