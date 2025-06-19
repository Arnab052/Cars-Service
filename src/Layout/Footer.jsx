import React, { useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  TextField,
  Button,
  IconButton,
  Divider,
} from '@mui/material';
import {
  Facebook,
  Twitter,
  YouTube,
  LinkedIn,
  LocationOn,
  Phone,
  Email,
} from '@mui/icons-material';
import AOS from 'aos';
import 'aos/dist/aos.css';

const FooterPage = () => {
  useEffect(() => {
  AOS.init({
    duration: 1500, 
    once: true,     
  });
}, []);
  return (
    <Box
      sx={{
        position: 'relative',
        pt: 6,
        pb: 3,
        mt: 0,
        overflow: 'hidden',
        color: '#fff',
      }}
     
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'url(../../public/img/carousel-bg-1.jpg)', // Set your image path
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          zIndex: 1,
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',// Dark overlay,
           backgroundColor: 'rgba(0, 0, 0, 0.81)',  // color layer
           backgroundBlendMode: 'multiply', 
            
          },
          
        }}
         
      />

      <Container sx={{ position: 'relative', zIndex: 2 }} maxWidth="lg" data-aos="slide-up">
        <Grid container spacing={10} >
          {/* Address */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Address
            </Typography>
            <Box display="flex" alignItems="center" mb={1}>
              <LocationOn sx={{ color: '#fff', mr: 1 }} />
              <Typography>123 Street, New York, USA</Typography>
            </Box>
            <Box display="flex" alignItems="center" mb={1}>
              <Phone sx={{ color: '#fff', mr: 1 }} />
              <Typography>+012 345 67890</Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <Email sx={{ color: '#fff', mr: 1 }} />
              <Typography>info@example.com</Typography>
            </Box>
            <Box mt={2}>
              <IconButton href="#" sx={{ color: '#fff' }}>
                <Twitter />
              </IconButton>
              <IconButton href="#" sx={{ color: '#fff' }}>
                <Facebook />
              </IconButton>
              <IconButton href="#" sx={{ color: '#fff' }}>
                <YouTube />
              </IconButton>
              <IconButton href="#" sx={{ color: '#fff' }}>
                <LinkedIn />
              </IconButton>
            </Box>
          </Grid>

          {/* Opening Hours */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Opening Hours
            </Typography>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
              Monday – Friday:
            </Typography>
            <Typography mb={2}>09.00 AM – 09.00 PM</Typography>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
              Saturday – Sunday:
            </Typography>
            <Typography>09.00 AM – 12.00 PM</Typography>
          </Grid>

          {/* Services */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Services
            </Typography>
            {['Diagnostic Test', 'Engine Servicing', 'Tires Replacement', 'Oil Changing', 'Vacuum Cleaning'].map((service, index) => (
              <Link
                key={index}
                href="#"
                underline="hover"
                color="inherit"
                display="block"
                sx={{
                  mb: 1,
                  display: 'flex',
                  alignItems: 'center',
                  '&::before': {
                    content: '"›"',
                    marginRight: 1,
                    color: 'red',
                  },
                  '&:hover': {
                    color: 'red',
                  },
                }}
              >
                {service}
              </Link>
            ))}
          </Grid>

          {/* Newsletter */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Newsletter
            </Typography>
            <Typography mb={2}>
              Dolor amet sit justo amet elitr clita ipsum elitr est.
            </Typography>
            <Box display="flex">
              <TextField
                variant="filled"
                placeholder="Your email"
                fullWidth
                sx={{
                  bgcolor: '#fff',
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                  input: { color: '#000',py:'15px'},
                  pt:'0px'
                }}
              />
              <Button
                variant="contained"
                sx={{
                  bgcolor: 'red',
                  color: '#fff',
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                  '&:hover': { bgcolor: 'darkred' },
                }}
              >
                SIGNUP
              </Button>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ bgcolor: '#333', my: 4 }} />

        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="body2" align="center" md={{ textAlign: 'left' }}>
              &copy;{' '}
              <Link href="#" underline="hover" color="inherit">
                CarsServ
              </Link>
              , All Right Reserved. Designed by{' Arnab Barman'}
              {/* <Link href="https://htmlcodex.com" underline="hover" color="inherit">
                HTML Codex
              </Link> */}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              display="flex"
              justifyContent="center"
              md={{ justifyContent: 'flex-end' }}
              flexWrap="wrap"
              mt={{ xs: 2, md: 0 }}
            >
              {['Home', 'Cookies', 'Help', 'FAQs'].map((item, index) => (
                <Link
                  key={index}
                  href="#"
                  underline="hover"
                  color="inherit"
                  sx={{ mx: 1, '&:hover': { color: 'red' } }}
                >
                  {item}
                </Link>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default FooterPage;