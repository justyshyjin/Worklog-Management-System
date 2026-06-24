import { useState } from "react";

import { TextField, Button, Paper, Typography, Box } from "@mui/material";

import { Navigate,useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import axiosClient from "../api/axiosClient";

import "../styles/loginpage.css";

const LoginPage = () => {
  

  const { login,
          isAuthenticated
        } =
    useAuth();

  const [username,
    setUsername] =
    useState("");

  const [password,
    setPassword] =
    useState("");

  const [error,
    setError] =
    useState("");

  const handleLogin =
    async (e) => {
      e.preventDefault();

      try {

        const response =
          await axiosClient.post(
            "/auth/login",
            {
              username,
              password
            }
          );

        login(
          response.data.access_token,
          response.data.user
        );

        navigate("/",{
                replace:true
            });
      } catch (err) {
        setError(
          "Invalid username or password"
        );
      }
    };

  const {  } = useAuth();

  // const navigate = useNavigate();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="login-page">

      <Paper
        elevation={0}
        className="login-card"
      >
        <Typography
          variant="h4"
          gutterBottom
        >
          WorkLog
        </Typography>

        <Typography
          variant="body2"
          gutterBottom
        >
          Management System
        </Typography>

        <Box
          component="form"
          onSubmit={handleLogin}
        >
          <TextField
            fullWidth
            margin="normal"
            label="Username"
            value={username}
            onChange={(e) =>
              setUsername(
                e.target.value
              )
            }
            InputLabelProps={{
              className: "username-label",
            }}
          />

          <TextField
            fullWidth
            margin="normal"
            label="Password"
            type="password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            InputLabelProps={{
              className: "username-label",
            }}
          />

          {error && (
            <p className="error">
              {error}
            </p>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            className="login-btn"
          >
            LOGIN
          </Button>
        </Box>

      </Paper>

    </div>
  );
};

export default LoginPage;