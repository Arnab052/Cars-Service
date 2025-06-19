import React from "react";
import BookingPart from "../components/BookingPart";
import { Box, Container, Typography, Breadcrumbs, Link } from "@mui/material";

const Bookings = () => {
  return (
    <>
      {/* Hero Section */}
      <Box
        sx={{
          backgroundImage: "url(/img/carousel-bg-1.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          py: 8,
          color: "white",
          mb: 5,
        }}
      >
        <Container>
          <Box sx={{ textAlign: "center" }}>
            <Typography
              variant="h3"
              component="h1"
              sx={{
                mb: 2,
                fontWeight: "bold",
                textShadow: "2px 2px 4px rgba(0,0,0,0.6)",
              }}
            >
              Booking
            </Typography>
            <Breadcrumbs
              separator="›"
              aria-label="breadcrumb"
              sx={{
                justifyContent: "center",
                display: "flex",
                color: "white",
                textTransform: "uppercase",
              }}
            >
              <Link underline="hover" color="inherit" href="#">
                Home
              </Link>
              <Link underline="hover" color="inherit" href="#">
                Pages
              </Link>
              <Typography color="white">Booking</Typography>
            </Breadcrumbs>
          </Box>
        </Container>
      </Box>

      {/* Booking Part */}
      <BookingPart/>
    </>
  );
};

export default Bookings;
