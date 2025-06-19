import React from 'react';
import { Box, Breadcrumbs, Link, Typography, Container } from '@mui/material';
import BookingPart from '../components/BookingPart';
import TestimonialsPart from '../components/TestimonialsPart';
import OurServicesParts from '../components/OurServicesPart'
import { useSelector } from 'react-redux';
const ServicesHeader = () => {
   const { isLoggedIn } = useSelector((state) => state?.auth);
  return (
    <Box
      sx={{
        backgroundImage: 'url(/img/carousel-bg-2.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        mb: 5,
        p: 0,
      }}
    >
      <Box sx={{ backgroundColor: 'rgba(0,0,0,0.5)', py: 5 }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography
            variant="h3"
            component="h1"
            color="white"
            gutterBottom
            sx={{
              animation: 'slideInDown 1s',
            }}
          >
            Services
          </Typography>
          <Breadcrumbs
            aria-label="breadcrumb"
            sx={{
              display: 'flex',
              justifyContent: 'center',
              textTransform: 'uppercase',
              '& a': { color: 'white' },
              '& .MuiTypography-root': { color: 'white' },
            }}
          >
            <Link underline="hover" href="/">
              Home
            </Link>
            <Link underline="hover" href="#">
              Pages
            </Link>
            <Typography color="white">Services</Typography>
          </Breadcrumbs>
        </Container>
      </Box>
        {/* Our Services Part */}
      <OurServicesParts />

      {/* Booking Part */}
         {isLoggedIn ? <BookingPart /> : ""}

      {/* Testimonials Part */}
      <TestimonialsPart/>
    </Box>
  );
};

export default ServicesHeader;
