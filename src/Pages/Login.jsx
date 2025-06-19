import React from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userLogin } from "../Api/Functions/Login.api";
import { setLogin } from "../Redux/AuthSlice";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import {
  Box,
  Grid,
  Card,
  CardContent,
  TextField,
  Typography,
  Button,
} from "@mui/material";

const Login = () => {
  const { isLoggedIn } = useSelector((state) => state?.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { mutate, isPending } = useMutation({
    mutationFn: (data) => userLogin(data),
    onSuccess: (data) => {
      if (data?.status === 200) {
        localStorage.setItem("token", data?.token);
        localStorage.setItem("user", JSON.stringify(data?.data));

        Swal.fire({
          icon: "success",
          title: data?.message,
        });
        navigate("/");
      }
    },
    onError: (err) => {
      toast.error(err?.message);
      reset();
    },
  });

  const onSubmitLogin = (data) => {
    mutate(data, {
      onSuccess: (res) => dispatch(setLogin()),
    });
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{ minHeight: "100vh", p: 2 }}
      bgcolor="#f5f5f5"
    >
      <Grid item xs={12} md={8} lg={6} sx={{display:'flex',alignItems:'center',justifyContent:'center'}}>
        <Card sx={{ borderRadius: 3, overflow: "hidden" ,width:{xs:'100%',md:'80%'}}}>
          <Grid container>
            <Box sx={{display:{xs:'block',md:'flex'},justifyContent:'space-evenly'}}>
            <Grid item md={5} sx={{ display: { xs: "block", md: "block" },width:{md:'40%',xs:'100%'},height:{xs:'55%',md:'100%'}}}>
              <Box
                component="img"
                src="/img/Car_login.jpg"
                alt="login form"
                sx={{
                  width:{xs:'100%',md:'85%'},
                  height: "100%",
                  objectFit: "cover",

                }}
              />
            </Grid>
            <Grid item xs={12} md={7} display="flex" alignItems="center">
              <CardContent sx={{ p: 4, width:{xs:'100%',md:'500px'}}}>
                <Box display="flex" alignItems="center" mb={3}>
                  <Box
                    component="span"
                    sx={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mr: 1.5,
                      fontSize: "2rem",
                      color: "#ff6219",
                    }}
                  >
                    🚗
                  </Box>
                  <Typography variant="h4" fontWeight="bold">
                    Car <span style={{color:'red'}}>Serv</span>
                  </Typography>
                </Box>

                <Typography
                  variant="h6"
                  fontWeight="normal"
                 
                  sx={{ letterSpacing: "1px", marginBottom:{xs:0,md:3}}}
                >
                  Sign into your account
                </Typography>

                <Box
                  component="form"
                  className="signup-form"
                  onSubmit={handleSubmit(onSubmitLogin)}
                >
                  <Box mb={3}>
                    <TextField
                      label="Email Address"
                      type="email"
                      fullWidth
                      variant="outlined"
                      {...register("email", { required: true })}
                      error={!!errors.email}
                      helperText={
                        errors?.email?.type === "required" &&
                        "**Email is Required"
                      }
                    />
                  </Box>

                  <Box mb={3}>
                    <TextField
                      label="Password"
                      type="password"
                      fullWidth
                      variant="outlined"
                      {...register("password", { required: true })}
                      error={!!errors.password}
                      helperText={
                        errors?.password?.type === "required" &&
                        "**Password is Required"
                      }
                    />
                  </Box>

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="large"
                    sx={{
                      backgroundColor: "#D81324",
                      "&:hover": {
                        backgroundColor: "#b5121f",
                      },
                      mb: 2,
                    }}
                    disabled={isPending}
                  >
                    Login
                  </Button>

                  <Box textAlign="center" mb={2}>
                    <Link to="/forgot-password" style={{ textDecoration: "none", fontSize: "0.9rem", color: "#555" }}>
                      Forgot password?
                    </Link>
                  </Box>

                  <Typography variant="body2" textAlign="center" color="text.secondary" mb={2}>
                    Don't have an account?{" "}
                    <Link to="/registration" style={{ color: "#393f81", textDecoration: "none" }}>
                      Register here
                    </Link>
                  </Typography>

                  <Box textAlign="center">
                    <Typography variant="caption" display="block" color="text.secondary">
                      <Link to="#" style={{ textDecoration: "none", color: "#999" }}>
                        Terms of use
                      </Link>{" "}
                      |{" "}
                      <Link to="#" style={{ textDecoration: "none", color: "#999" }}>
                        Privacy policy
                      </Link>
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Grid>
            </Box>
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Login;
