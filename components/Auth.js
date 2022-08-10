import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';

const theme = createTheme();

export default function Auth({ setLoggedIn }) {
  const [authMode, setAuthMode] = useState('user');

  const [isSignIn, setIsSignIn] = useState(true);

  const handleAuthMode = (event, changedMode) => {
    setAuthMode(changedMode);
  };

  const handleSignIn = () => {
    setIsSignIn(prev => !prev)
    console.log(isSignIn);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light'
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          > 
            <ToggleButtonGroup
              color="primary"
              value={authMode}
              exclusive
              onChange={handleAuthMode}
              sx={{
                mt: 4,
                mb: 2,
              }}
            >
              <ToggleButton value="user">User Mode</ToggleButton>
              <ToggleButton value="admin">Admin Mode</ToggleButton>
            </ToggleButtonGroup>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {authMode == 'user' ? isSignIn ? 'User Login' : 'User Sign Up' : isSignIn ? 'Admin Login' : 'Admin Sign Up'}
            </Typography>

            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              {!isSignIn &&
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Full Name"
                name="name"
                autoComplete="name"
                autoFocus
              />}
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={() => setLoggedIn(true)}
              >
                {isSignIn ? 'Sign In' : 'Sign Up'}
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Button onClick={handleSignIn} sx={ {textTransform: 'none', mt: -0.5} }>
                    {isSignIn ? "Don't have an account? Sign Up" : "Switch to Login"}
                  </Button>
                </Grid>
              </Grid>
  
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
