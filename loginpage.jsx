import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box, TextField, Button, Typography, Select, MenuItem, FormControl, InputLabel, Paper, Avatar
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";


export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");
    if (!role) {
      setError("Please select a role.");
      return;
    }
    if (role === "admin") {
      try {
        const response = await fetch("http://localhost:5000/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password })
        });
        const data = await response.json();
        if (response.status === 200) {
          navigate("/admin");
        } else {
          setError(data.message || "Admin login failed");
        }
      } catch (err) {
        setError("An error occurred. Please try again.");
      }
    } else {
      setError("Student login functionality coming soon.");
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
        backgroundColor: "#FFEFEF",
        padding: 2,
      }}
    >
      <Box sx={{ flexGrow: 0, mb: 2 }}>
        <img src="data:image/png;base64,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" alt="Logo" style={{ width: "100%", height: "100%" }} />
      </Box>
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          flexGrow: 1 
        }}
      >
        <Paper
          elevation={6}
          sx={{
            padding: { xs: 2, sm: 4 },
            width: { xs: '90vw', sm: 350 },
            maxWidth: '500px',
            backgroundColor: "#f5f5f5",
            borderRadius: "12px",
            border: "1px solid #c0c0c0",
          }}
        >
          <Box display="flex" flexDirection="column" alignItems="center">
            <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography variant="h5" gutterBottom textAlign="center" sx={{ color: "#333" }}>
              Login
            </Typography>
          </Box>
          <TextField
            fullWidth
            margin="normal"
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Role</InputLabel>
            <Select
              value={role}
              label="Role"
              onChange={(e) => setRole(e.target.value)}
            >
              <MenuItem value="student">Student</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </Select>
          </FormControl>
          {error && <Typography color="error" sx={{ mt: 1, textAlign: "center" }}>{error}</Typography>}
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 2, backgroundColor: "#4caf50" }}
            onClick={handleLogin}
          >
            Login
          </Button>
        </Paper>
      </Box>
    </Box>
  );
}

