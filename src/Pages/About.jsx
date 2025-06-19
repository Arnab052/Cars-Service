import React from 'react';
import { Box, Breadcrumbs, Link, Typography, Container } from '@mui/material';
import AboutUsPart from '../components/AboutUsPart';
import FactsPart from '../components/FactsPart';
import TechnicianParts from '../components/TechnicianParts';
import BannerServicePart from '../components/BannerServicePart';

const About = () => {
  return (
    <Box>
    <Box
      sx={{
        backgroundImage: 'url(/img/carousel-bg-1.jpg)',
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
            About Us
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
            <Typography color="white">About</Typography>
          </Breadcrumbs>
        </Container>
      </Box>

    </Box>
           <BannerServicePart />

      <AboutUsPart />

      {/* Facts Part */}
      <FactsPart />

      {/* Technician Parts */}
      <TechnicianParts />
    </Box>
  );
};

export default About;
