import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Avatar,
  CssBaseline,
  Grid,
  Link,
  Paper,
  InputAdornment,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Visibility,
  VisibilityOff,
  ErrorOutline,
  CheckCircle,
} from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../features/auth/authSlice";

const theme = createTheme();

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Login = () => {
  const users = useSelector((state: any) => state.registration.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isError, setError] = useState<string | null>(null);

  const handleSubmit = (values: { email: string; password: string }) => {
    console.log("Form Submitted:", values);
    const userExists = users.some(
      (user: { email: string; password: string }) =>
        user.email === values.email && user.password === values.password
    );

    if (userExists) {
      dispatch(login(values));
      setError(null);
      navigate("/todo-list");
    } else {
      setError("Invalid Credentials");
      console.log("Invalid credentials");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Paper
          elevation={6}
          sx={{
            marginTop: 8,
            padding: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: 2,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit} 
          >
            {({ values, errors, touched, handleChange, handleBlur }) => (
              <Form>
                <Box component="div" sx={{ mt: 1 }}>
                  <Field
                    as={TextField}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="email"
                    label="Email Address"
                    autoComplete="email"
                    autoFocus
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    error={touched.email && Boolean(errors.email)}
                    helperText={<ErrorMessage name="email" />}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          {touched.email &&
                            (errors.email ? (
                              <ErrorOutline color="error" />
                            ) : (
                              <CheckCircle color="success" />
                            ))}
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Field
                    as={TextField}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    error={touched.password && Boolean(errors.password)}
                    helperText={<ErrorMessage name="password" />}
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign In
                  </Button>
                  {isError && (
                    <Typography
                      variant="body1"
                      sx={{ color: "red", fontWeight: "bold" }}
                    >
                      {isError}
                    </Typography>
                  )}
                  <Grid container justifyContent="center">
                    <Grid item>
                      <Link href="/register" variant="body2">
                        {"Don't have an account? Sign Up"}
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </Form>
            )}
          </Formik>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
