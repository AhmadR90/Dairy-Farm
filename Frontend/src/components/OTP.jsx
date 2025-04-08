import {
  Box,
  Button,
  Container,
  Select,
  MenuItem,
  TextField,
  Typography,
  Alert,
  Snackbar
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios'; // Make sure axios is installed in your project

const OTP = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(['', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');
  
  // We'll need to get the email from somewhere - either localStorage or URL params
  const [email, setEmail] = useState('');
  
  useEffect(() => {
    // Get email from localStorage or URL params
    const storedEmail = localStorage.getItem('email');
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      // You might want to redirect if email is not available
      setMessage('Email not found. Please try again.');
      setError(true);
    }
  }, []);

  const handleChange = (index, value) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      
      // Auto-focus next input field if a digit was entered
      if (value && index < 4) {
        const nextInput = document.querySelector(`input[name=otp-${index + 1}]`);
        if (nextInput) {
          nextInput.focus();
        }
      }
    }
  };

  const verifyOtp = async () => {
    // Join the OTP array into a single string
    const enteredOtp = otp.join('');
    
    if (enteredOtp.length !== 5) {
      setMessage('Please enter all 5 digits of the OTP.');
      setError(true);
      return;
    }

    setLoading(true);
    
    try {
      // Send OTP to backend for verification
      const response = await axios.post('http://localhost:5000/api/auth/verify-otp', {
        email: email,
        otp: enteredOtp
      });
      
      // If verification is successful
      setMessage(response.data.message || 'OTP verified successfully!');
      setError(false);
      
      // Redirect to reset password page
      setTimeout(() => {
        navigate('/reset-password');
      }, 1000);
      
    } catch (error) {
      // Handle verification failure
      setMessage(
        error.response?.data?.message || 
        'Failed to verify OTP. Please try again.'
      );
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  // Handle closing of error message
  const handleCloseAlert = () => {
    setMessage('');
  };
  
  // Handle resend OTP
  const handleResendOtp = async () => {
    if (!email) {
      setMessage('Email not found. Please try again.');
      setError(true);
      return;
    }
    
    setLoading(true);
    
    try {
      // Assuming you have a resend OTP endpoint
      const response = await axios.post('/resend-otp', { email });
      setMessage(response.data.message || 'OTP resent successfully!');
      setError(false);
    } catch (error) {
      setMessage(
        error.response?.data?.message || 
        'Failed to resend OTP. Please try again.'
      );
      setError(true);
    } finally {
      setLoading(false);
    }
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
              OTP
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom sx={{ mb: 3 }}>
              Enter the 5-digit OTP sent to your registered email
            </Typography>

            <Box display="flex" justifyContent="center" gap={1} mb={2}>
              {otp.map((digit, index) => (
                <TextField
                  key={index}
                  name={`otp-${index}`}
                  type="text"
                  inputProps={{ maxLength: 1, style: { textAlign: 'center' } }}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  size="small"
                  sx={{ width: "40px" }}
                />
              ))}
            </Box>

            <Button
              variant="contained"
              fullWidth
              onClick={verifyOtp}
              disabled={loading}
              sx={{
                mt: 1,
                backgroundColor: "#8BD4E7",
                "&:hover": { bgcolor: "#42A5F5" },
                textTransform: "none",
                py: 1,
                fontSize: "0.9375rem",
              }}
            >
              {loading ? 'Verifying...' : 'Submit'}
            </Button>
            
            {/* Resend OTP option */}
            <Box mt={2}>
              <Typography variant="body2" color="textSecondary">
                Didn't receive the OTP? 
                <Button 
                  variant="text" 
                  onClick={handleResendOtp}
                  disabled={loading}
                  sx={{ textTransform: "none", ml: 1 }}
                >
                  Resend
                </Button>
              </Typography>
            </Box>
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

export default OTP;