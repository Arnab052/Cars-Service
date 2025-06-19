import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  Avatar,
  Stack,
} from "@mui/material";
import { registration } from "../Api/Functions/registration.api";
import ButtonLoader from "../Loader/ButtonLoader";

const Registration = () => {
  const [image, setImage] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const navigate = useNavigate();

  const password = watch("password", "");

  const { mutate, isPending } = useMutation({
    mutationFn: (data) => registration(data),
    onSuccess: (data) => {
      if (data?.status === 201) {
        localStorage.setItem("userEmail", data?.data?.email);
        Swal.fire({
          icon: "info",
          title: data?.message,
          text: data?.info,
        });
        reset();
        setImage(undefined);
        navigate("/verify-otp");
      }
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message);
    },
  });

  const submitRegistrationForm = (data) => {
    let formdata = new FormData();
    Object.keys(data).forEach((key) => {
      formdata.append(key, data[key]);
    });
    formdata.append("profileImage", image);
    mutate(formdata);
  };

  return (
    <Box minHeight="100vh" bgcolor="#f5f5f5" py={4} display="flex" justifyContent="center" alignItems="center">
      <Card sx={{ width: '100%', maxWidth: 1200, borderRadius: 3, overflow: 'hidden', boxShadow: 3, p: 4 }}>
        <Grid container spacing={0} >
          <Box sx={{display:{xs:'block',md:'flex'},justifyContent:'space-between',alignItems:'center'}}>
          <Grid item xs={12} md={5} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center',width:'100%'}}>
            <Box width="100%" height="100%" display="flex" alignItems="center" justifyContent="center" bgcolor="#eee">
              <img src="/img/Car_Registration_Form.jpg" alt="register" style={{ width: '100%', height: 'auto', objectFit: 'cover' }} />
            </Box>
          </Grid>

          <Grid item xs={12} md={6} display="flex" alignItems="center" justifyContent="center" >
            <CardContent sx={{padding:{xs:'0px 0px',md:'0px 50px'}}}>
              <Box mb={3} textAlign="center">
                <Typography variant="h4" fontWeight="bold"><span style={{color:'blue'}}>Car</span><span style={{color:'red'}}>Serv</span></Typography>
                <Typography variant="subtitle1" >Sign up here</Typography>
              </Box>
              
              <form onSubmit={handleSubmit(submitRegistrationForm)} >
                <Grid container spacing={3} sx={{padding:{xs:'0px',md:'0px',display:'flex',justifyContent:'center' }}}>
                  <Grid item xs={12} sm={6} sx={{width:{xs:'100%',md:'45%'}}}>
                    <TextField label="First Name" fullWidth {...register("firstName", { required: "First name is required", minLength: { value: 3, message: "Min 3 chars" } })} error={!!errors.firstName} helperText={errors.firstName?.message} />
                  </Grid>
                  <Grid item xs={12} sm={6} sx={{width:{xs:'100%',md:'45%'}}}>
                    <TextField label="Last Name" fullWidth {...register("lastName", { required: "Last name is required", minLength: { value: 3, message: "Min 3 chars" } })} error={!!errors.lastName} helperText={errors.lastName?.message} />
                  </Grid>

                  <Grid item xs={12} sm={6} sx={{width:{xs:'100%',md:'45%'}}}>
                    <TextField label="Email" type="email" fullWidth {...register("email", { required: "Email is required", pattern: { message: "Invalid email" } })} error={!!errors.email} helperText={errors.email?.message} />
                  </Grid>
                  <Grid item xs={12} sm={6} sx={{width:{xs:'100%',md:'45%'}}}>
                    <TextField label="Mobile No" fullWidth {...register("mobileNo", { required: "Mobile number required", minLength: { value: 10, message: "Must be 10 digits" }, maxLength: { value: 10, message: "Must be 10 digits" } })} error={!!errors.mobileNo} helperText={errors.mobileNo?.message} />
                  </Grid>

                  <Grid item xs={12} sm={6} sx={{width:{xs:'100%',md:'45%'}}}>
                    <TextField label="Street" fullWidth {...register("street", { required: "Street is required" })} error={!!errors.street} helperText={errors.street?.message} />
                  </Grid>
                  <Grid item xs={12} sm={6} sx={{width:{xs:'100%',md:'45%'}}}>
                    <TextField label="City" fullWidth {...register("city", { required: "City is required" })} error={!!errors.city} helperText={errors.city?.message} />
                  </Grid>

                  <Grid item xs={12} sm={6} sx={{width:{xs:'100%',md:'45%'}}}>
                    <TextField label="Landmark" fullWidth {...register("landmark", { required: "Landmark is required" })} error={!!errors.landmark} helperText={errors.landmark?.message} />
                  </Grid>
                  <Grid item xs={12} sm={6} sx={{width:{xs:'100%',md:'45%'}}}>
                    <TextField label="State" fullWidth {...register("state", { required: "State is required" })} error={!!errors.state} helperText={errors.state?.message} />
                  </Grid>

                  <Grid item xs={12} sm={6} sx={{width:{xs:'100%',md:'45%'}}}>
                    <TextField label="Country" fullWidth {...register("country", { required: "Country is required" })} error={!!errors.country} helperText={errors.country?.message} />
                  </Grid>
                  <Grid item xs={12} sm={6} sx={{width:{xs:'100%',md:'45%'}}}>
                    <TextField label="Pincode" fullWidth {...register("pincode", { required: "Pincode is required" })} error={!!errors.pincode} helperText={errors.pincode?.message} />
                  </Grid>

                  <Grid item xs={12} sm={6} sx={{width:{xs:'100%',md:'45%'}}}>
                    <TextField label="Password" type="password" fullWidth {...register("password", { required: "Password is required", minLength: { value: 6, message: "Min 6 chars" } })} error={!!errors.password} helperText={errors.password?.message} />
                  </Grid>
                  <Grid item xs={12} sm={6} sx={{width:{xs:'100%',md:'45%'}}}>
                    <TextField label="Confirm Password" type="password" fullWidth {...register("cPassword", { required: "Confirm password", validate: (value) => value === password || "Passwords do not match" })} error={!!errors.cPassword} helperText={errors.cPassword?.message} />
                  </Grid>

                  <Grid item xs={12} sx={{width:'100%'}}>
                    <Stack direction="column" spacing={2} alignItems="center">
                      <Button variant="contained" component="label" sx={{width:'93%',backgroundColor:' rgb(242, 186, 34)'}}>
                        Upload Profile Image
                        <input type="file" hidden onChange={(e) => setImage(e.target.files[0])} />
                      </Button>
                      {image && <Avatar src={URL.createObjectURL(image)} sx={{ width: 100, height: 100 }} />}
                    </Stack>
                  </Grid>

                  <Grid item xs={12} >
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 0, bgcolor: '#D81324', '&:hover': { bgcolor: '#b3111d' } }} disabled={isPending}>
                      {isPending ? <ButtonLoader /> : 'Register'}
                    </Button>
                  </Grid>
                </Grid>
              </form>

              <Box mt={2} textAlign="center">
                <Typography variant="body2">
                  Already have an account? <Link to="/login">Login here</Link>
                </Typography>
                <Typography variant="body2" color="text.secondary" mt={1}>
                  <Link to="/forgot-password">Forgot password?</Link>
                </Typography>
              </Box>
            </CardContent>
          </Grid>
          </Box>
        </Grid>
      </Card>
    </Box>
  );
};

export default Registration;