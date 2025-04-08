import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  MenuItem,
  Select,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState(""); // Email state
  const [error, setError] = useState(""); // Error state to handle invalid emails
  const [loading, setLoading] = useState(false); // Loading state to show a loading spinner during request

  // Handle email input change
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setError("Email is required");
      return;
    }
    localStorage.setItem("email", email);
    setError("");
    setLoading(true);

    try {
      // Send POST request to your API endpoint
      const response = await axios.post(
        "http://localhost:5000/api/auth/send-otp",
        { email }
      );

      // Check if OTP was sent successfully
      if (response.status === 200) {
        alert("OTP sent successfully to your email.");
        const generatedOTP = response.data.otp;
        localStorage.setItem("otp", generatedOTP);

        navigate("/otp"); // Navigate to OTP verification page
      }
    } catch (error) {
      // Handle email not found error
      if (error.response && error.response.status === 404) {
        setError("Email not found in our database.");
      } else {
        setError("Failed to send OTP. Please try again.");
      }
      console.error("Error sending OTP:", error);
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
      <Box
        flex={1}
        alignItems="center"
        justifyContent="center"
        bgcolor="#FAFAFA"
      >
        <Container component="main" maxWidth="md">
          <Box
            textAlign="center"
            p={4}
            borderRadius={6}
            sx={{ bgcolor: "white", boxShadow: 3 }}
          >
            {/* Language selector and login link at the top */}
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={20}
            >
              <Select
                value="en"
                size="small"
                sx={{
                  fontSize: "0.875rem",
                  "& .MuiSelect-select": { py: 0.5 },
                }}
              >
                <MenuItem value="en">English (United States)</MenuItem>
              </Select>
              <Typography variant="body2">
                Already have an account?{" "}
                <Button
                  onClick={() => {
                    navigate("/login");
                  }}
                  variant="text"
                  sx={{
                    textTransform: "none",
                    width: "65px",
                    text: "#111111",
                    backgroundColor: " #8BD4E7",
                    p: 0,
                    minWidth: 0,
                  }}
                >
                  Login
                </Button>
              </Typography>
            </Box>

            {/* Main form content */}
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Forgot Password
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              gutterBottom
              sx={{ mb: 3 }}
            >
              Please enter your email to receive an OTP to reset your password.
            </Typography>

            {/* Email Input */}
            <TextField
              label="Email"
              fullWidth
              margin="normal"
              size="small"
              sx={{ mb: 1.5 }}
              value={email}
              onChange={handleEmailChange}
              error={!!error}
              helperText={error}
            />

            {/* Submit Button */}
            <Button
              variant="contained"
              fullWidth
              sx={{
                mt: 1,
                backgroundColor: " #8BD4E7",
                "&:hover": { bgcolor: "#42A5F5" },
                textTransform: "none",
                py: 1,
                fontSize: "0.9375rem",
              }}
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Sending OTP..." : "Submit"}
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default ForgotPassword;
