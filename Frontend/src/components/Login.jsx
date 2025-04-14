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
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import axios from "axios"; // Import axios

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  // Form validation errors
  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
      // API call using axios for user login
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        {
          email: formData.email,
          password: formData.password,
        }
      );

      // Handle successful login
      setSuccess(true);

      if (response.data.token) {
        localStorage.setItem("authToken", response.data.token);
      }

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Login failed. Please check your credentials.";
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
    <Box display="flex" height="98vh" width="98vw">
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
              Don't have an account?
            </Typography>
            <Button
              onClick={() => navigate("/")}
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
                },
              }}
            >
              Sign Up
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
            marginTop: 12,
            height: "auto",
            px: { xs: 2, sm: 4 },
            py: 4,
            border: "0.5px solid gray",
            borderRadius: "32px",
          }}
        >
          <Box
            component="form"
            onSubmit={handleSubmit}
            textAlign="center"
            p={4}
            borderRadius={6}
          >
            <Box
              sx={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                backgroundColor: "#8BD4E7",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                ml: "210px",
                mb: "20px",
              }}
            />

            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Login
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              gutterBottom
              sx={{ mb: 3 }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
              lobortis maximus
            </Typography>

            <TextField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              size="small"
              sx={{ mb: 1.5 }}
              error={!!formErrors.email}
              helperText={formErrors.email}
            />

            <TextField
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
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
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 1.5 }}
              error={!!formErrors.password}
              helperText={formErrors.password}
            />

            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    size="small"
                  />
                }
                label={<Typography variant="body2">Remember me</Typography>}
              />
              <Button
                variant="text"
                sx={{
                  textTransform: "none",
                  fontSize: "0.875rem",
                  color: "#42A5F5",
                }}
                onClick={() => navigate("/forgot-password")}
              >
                Forgot Password?
              </Button>
            </Box>

            <Button
              type="submit"
              variant="contained"
              fullWidth
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
              {loading ? "Logging in..." : "Login"}
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Success/Error Messages */}
      <Snackbar
        open={!!error || success}
        autoHideDuration={6000}
        onClose={closeSnackbar}
      >
        <Alert
          onClose={closeSnackbar}
          severity={success ? "success" : "error"}
          sx={{ width: "100%" }}
        >
          {success ? "Login successful! Redirecting ..." : error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Login;
