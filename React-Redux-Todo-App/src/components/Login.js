import * as React from 'react';
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
import {useNavigate } from "react-router-dom"
import axios from 'axios';
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { loginUserAction } from '../redux/auth';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    let ValidRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const [userData, setUserData] = React.useState({
        email: "",
        password: ""
    })
    const [userDataError, setUserDataError] = React.useState({})
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value }, setUserDataError(validation(name, value)))
    }

    const validation = (name, value) => {
        switch (name) {
            case 'email':
                if (!value) {
                    return 'email requied'
                } else {
                    if (!userData.email.match(ValidRex)) {
                        return 'enter valid email'
                    }
                    else {
                        return ''
                    }
                }
            case 'password':
                if (!value) {
                    return "please Input password *"
                } else {
                    const uppercaseRegExp = /(?=.*?[A-Z])/;
                    const lowercaseRegExp = /(?=.*?[a-z])/;
                    const digitsRegExp = /(?=.*?[0-9])/;
                    const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
                    const minLengthRegExp = /.{8,}/;
                    const passwordLength = userData.password.length;
                    const uppercasePassword = uppercaseRegExp.test(userData.password);
                    const lowercasePassword = lowercaseRegExp.test(userData.password);
                    const digitsPassword = digitsRegExp.test(userData.password);
                    const specialCharPassword = specialCharRegExp.test(userData.password);
                    const minLengthPassword = minLengthRegExp.test(userData.password);
                    if (passwordLength === 0) {
                        return "Password is empty";
                    } else if (!uppercasePassword) {
                        return "At least one Uppercase";
                    } else if (!lowercasePassword) {
                        return "At least one Lowercase";
                    } else if (!digitsPassword) {
                        return "At least one digit";
                    } else if (!specialCharPassword) {
                        return "At least one Special Characters";
                    } else if (!minLengthPassword) {
                        return "At least minumum 8 characters";
                    } else {
                        return "";
                    }
                    // return ""
                }
            default:
                break;
        }
    }


    const handleSubmit = (event) => {

        event.preventDefault();

        let allErrors = {}
        Object.keys(userData).forEach(key => {
            const error = validation(key, userData[key])
            if (error && error.length) {
                allErrors[key] = error
            }
        });
        if (Object.keys(allErrors).length) {
            return setUserDataError(allErrors)
        } else {
            console.log(userData)
            loginUser(userData)
        }

      };

      const loginUser = async (userData) => {
                
        const res = await axios({
          method: 'POST',
          url: `http://localhost:8080/api/v1/login`,
          data: userData
        })
        if (res.status === 200) {
          // window.location.href='/home'
          dispatch(loginUserAction(res));
          toast.success(res.data.message)
            localStorage.setItem("auth",JSON.stringify(res.data.userAuth))
            localStorage.setItem('token',JSON.stringify(res?.data?.userAuth?.token))
            navigate('/home'); 
            setUserData({
                email: "",
                password: ""
            })
        } else {
            toast.error(res.data.message || 'Invalid user Credentials')

        }
        console.log(res)

    }


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
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                name='email'
                value={userData.email}
                onChange={(e) => handleChange(e)}
                label="Email Address"
                autoComplete="email"
                autoFocus
                helperText={userDataError?.email?.length > 0 ? userDataError?.email : null}
              error={userDataError?.email?.length > 0 ? true : false}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name='password'
                value={userData.password}
                onChange={(e) => handleChange(e)}
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                helperText={userDataError?.password?.length > 0 ? userDataError?.password : null}
                error={userDataError?.password?.length > 0 ? true : false}
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
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  {/* <Link href="#" variant="body2">
                    Forgot password?
                  </Link> */}
                </Grid>
                <Grid item>
                  <Link onClick={()=>navigate("/signup")} variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}