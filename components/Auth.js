import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
  CircularProgress,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import FormInputText from './form-components/FormInputText';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { profileActions } from '../store/profile-slice';
import { useRouter } from 'next/router';

const theme = createTheme();

export default function Auth() {
  const [authMode, setAuthMode] = useState('user');
  const [isSignIn, setIsSignIn] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = React.useState(false);

  const dispatch = useDispatch();
  const router = useRouter();


  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const handleAuthMode = (event, changedMode) => {
    setErrorMessage('');
    setAuthMode(changedMode);
  };

  const handleSignIn = () => {
    setErrorMessage('');
    setIsSignIn((prev) => !prev);
    console.log(isSignIn);
  };

  const onSubmitHandler = async (data) => {
    setLoading(true);
    setErrorMessage('');
    if (isSignIn && authMode == 'user') {
      try {
        const loginRes = await axios.post('/auth/user/login', {
          ...data,
          role: 'user',
        });
        dispatch(profileActions.userLogin(loginRes.data));
        console.log('user Signed in');
        setLoading(false);
        router.push('/user/quiz-list')
      } catch (error) {
        setErrorMessage(error.response?.data.message);
        setLoading(false);
      }
    }

    // user Signup
    if (!isSignIn && authMode == 'user') {
      try {
        await axios.put('/auth/user/signup', {
          ...data,
          role: 'user',
        });
        console.log('User Sign UP');

        const loginRes = await axios.post('/auth/user/login', {
          ...data,
          role: 'user',
        });
        dispatch(profileActions.userLogin(loginRes.data));
        setLoading(false);
      } catch (error) {
        setErrorMessage(error.response?.data.message);
        setLoading(false);
      }
    }

    if (isSignIn && authMode == 'admin') {
      try {
        const loginRes = await axios.post('/auth/admin/login', {
          ...data,
          role: 'admin',
        });
        dispatch(profileActions.userLogin(loginRes.data));
        setLoading(false);
        router.push('/quiz-list')
      } catch (error) { 
        setErrorMessage(error.response?.data.message);
        setLoading(false);
      }
    }

    if (!isSignIn && authMode == 'admin') {
      try {
        await axios.put('/auth/admin/signup', {
          ...data,
          role: 'admin',
        });
        console.log('admin Sign UP');

        const loginRes = await axios.post('/auth/admin/login', {
          ...data,
          role: 'admin',
        });
        dispatch(profileActions.userLogin(loginRes.data));
        setLoading(false);
      } catch (error) {
        setErrorMessage(error.response?.data.message);
        setLoading(false);
      }
    }
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
              {authMode == 'user'
                ? isSignIn
                  ? 'User Login'
                  : 'User Sign Up'
                : isSignIn
                ? 'Admin Login'
                : 'Admin Sign Up'}
            </Typography>

            <Stack
              spacing={3}
              component="form"
              noValidate
              // onClick={handleSubmit(onSubmitHandler)}
              sx={{ mt: 1, width: '85%' }}
            >
              {!isSignIn && (
                <FormInputText
                  name={'name'}
                  control={control}
                  label="Full Name"
                />
              )}
              <FormInputText
                name={'email'}
                control={control}
                label="Email Address"
                type="email"
              />

              <FormInputText
                name={'password'}
                control={control}
                label="Password"
                type="password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              {errorMessage && (
                <Typography sx={{ color: 'red' }}>{errorMessage}</Typography>
              )}
              <Box sx={{ position: 'relative' }}>
                <Button
                  type="submit"
                  fullWidth
                  disabled={loading}
                  variant="contained"
                  onClick={handleSubmit(onSubmitHandler)}
                >
                  {isSignIn ? 'Sign In' : 'Sign Up & Login'}
                </Button>
                {loading && (
                  <CircularProgress
                    size={24}
                    sx={{
                      color: '#2563eb',
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      marginTop: '-10px',
                      marginLeft: '-12px',
                    }}
                  />
                )}
              </Box>

              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Button
                    onClick={handleSignIn}
                    sx={{ textTransform: 'none', mt: -0.5 }}
                  >
                    {isSignIn
                      ? "Don't have an account? Sign Up"
                      : 'Switch to Login'}
                  </Button>
                </Grid>
              </Grid>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
