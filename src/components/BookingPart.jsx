// BookingPage.jsx

import React, { useEffect } from "react";
import {
  CssBaseline,
  ThemeProvider,
  createTheme,
  Grid,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  FormHelperText,
  Box,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useMutation, useQueries } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { getAllServices } from "../Api/Functions/Service.api";
import { getAllCategories } from "../Api/Functions/ServiceCategory.api";
import { bookingService } from "../Api/Functions/Booking.api";
import ButtonLoader from "../Loader/ButtonLoader";
import { useNavigate } from "react-router-dom";
import "@fontsource/poppins"; // Import Google Font
import AOS from 'aos';
import 'aos/dist/aos.css';
const theme = createTheme({
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
});

const BookingPage = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [
    { data: servicesData, isLoading: servicesLoading },
    { data: categoriesData },
  ] = useQueries({
    queries: [
      {
        queryKey: ["all_services"],
        queryFn: getAllServices,
      },
      {
        queryKey: ["all_service_category"],
        queryFn: getAllCategories,
      },
    ],
  });

  const { mutate, isLoading: isBookingLoading } = useMutation({
    mutationFn: (data) => bookingService(data),
    onSuccess: (data) => {
      if (data.status === 201) {
        toast(data?.message);
        reset();
        navigate("/bookings");
      }
    },
    onError: (err) => {
      console.error("Error in booking:", err);
      toast.error(err?.message);
    },
  });

  const bookingSubmit = (data) => {
    const bookingData = {
      serviceCategory: data?.serviceCategory,
      service: data?.service,
      serviceDate: data?.serviceDate,
      specialRequest: data?.specialRequest,
    };

    mutate(bookingData);
  };

  const isSmallScreen = useMediaQuery("(max-width:900px)");

    useEffect(() => {
      AOS.init({
       
      });
    }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          backgroundImage: `url('../../public/img/carousel-bg-2.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          py: 0,
          px: 2,
          backgroundColor: "rgba(0, 0, 0, 0.52)",
          backgroundBlendMode: "overlay",
        }}
      >
        <Grid
          container
          sx={{
            maxWidth: 1200,
            minHeight: 500,
            boxShadow: 0,
            borderRadius: 0,
            overflow: "hidden",
          }}
        >
          {/* Text Section */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              width: "600px",
            }}
            data-aos="zoom-out-right"
             data-aos-duration="1500"
          >
            <Typography
              variant="h4"
              gutterBottom
              sx={{ color: "white", fontWeight: "bold" ,textAlign:{xs:'center',md:'left'}}}
            >
              Certified & Award-Winning Car Repair
            </Typography>
            <Typography variant="body1" sx={{ color: "white", mt: 2,textAlign:{xs:'center',md:'left'} }}>
              Eirmod sed tempor lorem ut dolores. Aliquyam sit sadipscing kasd
              ipsum. Dolor ea et dolore et at sea ea at dolor, justo ipsum duo
              rebum sea invidunt voluptua. Eos vero eos vero ea et dolore
              eirmod et. Dolores diam duo invidunt lorem. Elitr ut dolores magna
              sit. Sea dolore sanctus sed et.
            </Typography>
          </Grid>

          {/* Form Section */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              p: 3,
              backgroundColor: "rgb(249, 189, 36)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            data-aos="zoom-in"
            data-aos-duration="1500"
          >
            <Box sx={{ width: "100%", maxWidth: 550, mx: "auto" }}>
              <Typography
                variant="h5"
                textAlign="center"
                gutterBottom
                sx={{ fontWeight: "bold", mb: 3 }}
              >
                Book For A Service
              </Typography>

              <form onSubmit={handleSubmit(bookingSubmit)}>
                <Grid container spacing={2}>
                  {/* Name & Email */}
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    sx={{
                      display: {
                        xs: "block",
                        md: "flex",
                        width: "100%",
                        justifyContent: "space-between",
                      },
                    }}
                  >
                    <TextField
                      variant="outlined"
                      label="Your Name"
                      sx={{ width:{xs:'100%',md:'260px'},marginBottom:{xs:'10px',md:'0',borderRadius:'5px'} }}
                      InputProps={{
                        readOnly: true,
                      }}
                      value={user?.fullName || ""}
                    
                    />
                    <TextField
                      sx={{ width:{xs:'100%',md:'260px'}}}
                      variant="outlined"
                      label="Your Email"
                      InputProps={{
                        readOnly: true,
                      }}
                      value={user?.email || ""}
                    />
                  </Grid>

                  {/* Service Category & Service */}
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    sx={{
                      display: {
                        xs: "block",
                        md: "flex",
                        width: "100%",
                        justifyContent: "space-between",
                      },
                    }}
                  >
                    <FormControl
                      sx={{ width:{xs:'100%',md:'260px'} }}
                      variant="outlined"
                      error={!!errors.serviceCategory}
                    >
                      <InputLabel >Service Category</InputLabel>
                      <Select
                        {...register("serviceCategory", { required: true })}
                        defaultValue=""
                        label="Service Category"
                        sx={{marginBottom:{xs:'10px',md:'0'}}}
                      >
                        <MenuItem value="">Select Category</MenuItem>
                        {categoriesData?.map((category) => (
                          <MenuItem
                            key={category._id}
                            value={category.categoryName}
                          >
                            {category.categoryName}
                          </MenuItem>
                        ))}
                      </Select>
                      {errors.serviceCategory && (
                        <FormHelperText>
                          **This field is required
                        </FormHelperText>
                      )}
                    </FormControl>
                    <FormControl
                      sx={{ width:{xs:'100%',md:'260px'} }}
                      variant="outlined"
                      error={!!errors.service}
                    >
                      <InputLabel sx={{marginBottom:{xs:'10px',md:'0'}}}>Select A Service</InputLabel>
                      <Select
                        {...register("service", { required: true })}
                        defaultValue=""
                        label="Select A Service"
                        sx={{marginBottom:{xs:'10px',md:'0'}}}
                      >
                        <MenuItem value="">Select A Service</MenuItem>
                        {servicesData?.data?.docs?.map((service) => (
                          <MenuItem key={service._id} value={service.title}>
                            {service.title}
                          </MenuItem>
                        ))}
                      </Select>
                      {errors.service && (
                        <FormHelperText>
                          **This field is required
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>

                  {/* Service Date */}
                  <Grid item xs={12} sm={6} sx={{ width: "100%" }}>
                    <TextField
                      sx={{ width: "260px" }}
                      type="date"
                      variant="outlined"
                      label="Service Date"
                      InputLabelProps={{ shrink: true }}
                      {...register("serviceDate", { required: true })}
                      error={!!errors.serviceDate}
                      helperText={
                        errors.serviceDate ? "**This field is required" : ""
                      }
                    />
                  </Grid>

                  {/* Special Request */}
                  <Grid item xs={12} sx={{ width: "100%" }}>
                    <TextField
                      fullWidth
                      multiline
                      rows={3}
                      variant="outlined"
                      label="Special Request"
                      {...register("specialRequest", { required: true })}
                      error={!!errors.specialRequest}
                      helperText={
                        errors.specialRequest
                          ? "**This field is required"
                          : ""
                      }
                    />
                  </Grid>

                  {/* Submit Button */}
                  <Grid item xs={12} sx={{ width: "100%" }}>
                    {servicesLoading || isBookingLoading ? (
                      <ButtonLoader />
                    ) : (
                      <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        type="submit"
                        sx={{
                          py: 1.2,
                          backgroundColor: "rgb(205, 58, 58)",
                        }}
                      >
                        Book Now
                      </Button>
                    )}
                  </Grid>
                </Grid>
              </form>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default BookingPage;
