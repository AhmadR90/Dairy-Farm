import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  Typography,
  IconButton,
  Alert,
  Snackbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  // Form validation errors
  const [formErrors, setFormErrors] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: "",
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    // Clear error for this field when user starts typing again
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...formErrors };

    // Validate full name
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
      isValid = false;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    // Validate password
    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 4) {
      newErrors.password = "Password must be at least 8 characters long";
      isValid = false;
    }

    // Validate confirm password
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    // Validate terms agreement
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms and conditions";
      isValid = false;
    }

    setFormErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validate form before submission
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // API call using axios for user registration
      const response = await axios.post("http://localhost:5000/api/users/register", {
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
      });

      setSuccess(true);

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      // Error handling with axios
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "An error occurred during registration";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const closeSnackbar = () => {
    setSuccess(false);
    setError("");
  };

  return (
    <Box 
      display="flex" 
      flexDirection={isMobile ? "column" : "row"} 
      height="98vh" 
      width="98vw"
      sx={{
        overflow: "hidden",
        maxHeight: "100vh",
        maxWidth: "100vw",
      }}
    >
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
    
          // padding: 4,
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
      <Box
        flex={1}
        display="flex"
        flexDirection="column"
        bgcolor="#FFFFFF"
        sx={{ 
          height: "100%",
          overflow: "hidden",
        }}
      >
        {/* Header with language selector and login link */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mx={24}
          mt={2}
         
        >
          <Select
            value="en"
            size="small"
            sx={{
              fontSize: "0.8rem",
              "& .MuiSelect-select": { py: 0.5 },
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "#e0e0e0" },
            }}
            renderValue={(value) => "English (United States)"}
          >
            <MenuItem value="en">English (United States)</MenuItem>
          </Select>
          
          <Box display="flex" alignItems="center">
            <Typography variant="body2" sx={{ mr: 1, color: "#666" }}>
              Already have an account?
            </Typography>
            <Button
              onClick={() => navigate("/login")}
              variant="contained"
              size="small"
              sx={{
                textTransform: "none",
                backgroundColor: "#8BD4E7",
                color: "#000",
                boxShadow: "none",
                borderRadius: "4px",
                px: 2,
                "&:hover": {
                  backgroundColor: "#7ac5d8",
                  boxShadow: "none",
                }
              }}
            >
              Login
            </Button>
          </Box>
        </Box>

        <Container 
          component="main" 
          maxWidth="sm"
          sx={{ 
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginTop:12,
            height: "auto",
            px: { xs: 2, sm: 4 },
            py: 4,
            border:"0.5px solid gray",
            borderRadius:"32px"
          }}
        >
          {/* Blue circle icon */}
          <Box 
            sx={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              backgroundColor: "#8BD4E7",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 2,
            }}
          />

          {/* Form content */}
          <Box 
            component="form"
            onSubmit={handleSubmit}
            width="100%"
            textAlign="center"
          >
            <Typography 
              variant="h5" 
              sx={{ 
                fontWeight: 500, 
                mb: 1,
                color: "#333"
              }}
            >
              Create an account
            </Typography>
            
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{ mb: 4 }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
              lobortis maximus mauris.
            </Typography>

            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
              <TextField
                label="Full Name"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                fullWidth
                size="small"
                error={!!formErrors.fullName}
                helperText={formErrors.fullName}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "4px",
                  }
                }}
              />
              
              <TextField
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                fullWidth
                size="small"
                error={!!formErrors.email}
                helperText={formErrors.email}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "4px",
                  }
                }}
              />
            </Box>

            <TextField
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleInputChange}
              fullWidth
              size="small"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={togglePasswordVisibility}
                      edge="end"
                      size="small"
                    >
                      {showPassword ? (
                        <VisibilityOffIcon fontSize="small" />
                      ) : (
                        <VisibilityIcon fontSize="small" />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={!!formErrors.password}
              helperText={formErrors.password}
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  borderRadius: "4px",
                }
              }}
            />

            <TextField
              label="Confirm Password"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={handleInputChange}
              fullWidth
              size="small"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={toggleConfirmPasswordVisibility}
                      edge="end"
                      size="small"
                    >
                      {showConfirmPassword ? (
                        <VisibilityOffIcon fontSize="small" />
                      ) : (
                        <VisibilityIcon fontSize="small" />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={!!formErrors.confirmPassword}
              helperText={formErrors.confirmPassword}
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  borderRadius: "4px",
                }
              }}
            />

            <FormControlLabel
              control={
                <Checkbox
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                  size="small"
                  sx={{
                    color: "#8BD4E7",
                    '&.Mui-checked': {
                      color: "#8BD4E7",
                    },
                  }}
                />
              }
              label={
                <Typography variant="body2" sx={{ fontSize: "0.8rem" }}>
                  By creating an account, I agree to our <b>Terms of use</b> and{" "}
                  <b>Privacy Policy</b>
                </Typography>
              }
              sx={{ 
                display: "block", 
                textAlign: "left", 
                mb: 2,
              }}
            />
            {formErrors.agreeToTerms && (
              <Typography
                variant="caption"
                color="error"
                sx={{ textAlign: "left", display: "block", mt: -1, mb: 2 }}
              >
                {formErrors.agreeToTerms}
              </Typography>
            )}

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              sx={{
                backgroundColor: "#8BD4E7",
                color: "#000",
                textTransform: "none",
                py: 1.5,
                borderRadius: "24px",
                fontWeight: 500,
                "&:hover": {
                  backgroundColor: "#7ac5d8",
                  boxShadow: "none",
                },
                boxShadow: "none",
              }}
            >
              {loading ? "Processing..." : "Sign up"}
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Success/Error Messages */}
      <Snackbar
        open={!!error || success}
        autoHideDuration={6000}
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={closeSnackbar}
          severity={success ? "success" : "error"}
          sx={{ width: "100%" }}
        >
          {success ? "Registration successful! Redirecting to login..." : error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default SignUp;