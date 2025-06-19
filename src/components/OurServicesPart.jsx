import React from 'react';
import {
  Tabs,
  Tab,
  Box,
  Typography,
  Button,
  CssBaseline,
} from '@mui/material';
import { red, grey } from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Google Font theme
const theme = createTheme({
  typography: {
    fontFamily: "'Poppins', sans-serif",
  },
});

const services = [
  {
    label: 'Diagnostic Test',
    icon: 'fa-solid fa-car',
    img: '/img/service-1.jpg',
    content: '15 Years Of Experience In Auto Servicing...',
  },
  {
    label: 'Engine Servicing',
    icon: 'fa-solid fa-gears',
    img: '/img/service-2.jpg',
    content: '15 Years Of Experience In Auto Servicing...',
  },
  {
    label: 'Tires Replacement',
    icon: 'fa-solid fa-screwdriver-wrench',
    img: '/img/service-3.jpg',
    content: '15 Years Of Experience In Auto Servicing...',
  },
  {
    label: 'Oil Changing',
    icon: 'fa-solid fa-oil-can',
    img: '/img/service-4.jpg',
    content: '15 Years Of Experience In Auto Servicing...',
  },
];
import { useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';

const OurServicesStyled = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
     useEffect(() => {
       AOS.init({
        
       });
     }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* Google Font Link */}
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap"
        rel="stylesheet"
      />

      <Box sx={{ p: 4, bgcolor: '#fff' }} >
        <Typography
          variant="h6"
          color="error"
          sx={{ fontWeight: 'bold', mb: 1, textAlign: 'center' }}
        >
          // OUR SERVICES //
        </Typography>
        <Typography
          variant="h4"
          sx={{ fontWeight: 'bold', mb: 4, textAlign: 'center' }}
        >
          Explore Our Services
        </Typography>

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 3,
            maxWidth: '1200px',
            margin: '0 auto',
            alignItems: 'stretch',
          }}
        >
          {/* Left Tabs */}
          <Tabs
            data-aos="zoom-in" data-aos-duration="1800"
            orientation="vertical"
            value={value}
            onChange={handleChange}
            sx={{
              flex: 1,
              minWidth: { xs: '100%', md: '250px' },
              border: 'none',
              boxShadow: 'none',
              '& .MuiTabs-indicator': {
                display: 'none',
              },
            }}
          >
            {services.map((service, index) => (
              <Tab
                key={index}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <i className={service.icon}></i>
                    <Typography fontWeight="bold">{service.label}</Typography>
                  </Box>
                }
                sx={{
                  justifyContent: 'flex-start',
                  textAlign: 'left',
                  py: 3,
                  width: '100%',
                  borderRadius: 1,
                  backgroundColor: value === index ? red[700] : grey[100],
                  color: value === index ? 'white' : 'text.primary',
                  '&:hover': {
                    backgroundColor: value === index ? red[700] : grey[200],
                  },
                  margin: '0 auto',
                  mb: 4.6,
                  fontFamily: "'Poppins', sans-serif",
                }}
              />
            ))}
          </Tabs>

          {/* Image Section */}
          <Box
              data-aos="zoom-in" data-aos-duration="1800"
            sx={{
              flex: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
            }}
          >
            <Box
              component="img"
              src={services[value].img}
              alt={services[value].label}
              sx={{
                width: '100%',
                height: '100%',
                maxHeight: 400,
                borderRadius: 2,
                objectFit: 'cover',
              }}
            />
          </Box>

          {/* Content Section */}
          <Box
           data-aos="zoom-in" data-aos-duration="1800"
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '100%',
              p: 0,
              m: 0,
            }}
          >
            <Box>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 'bold',
                  mb: 2,
                  pt: 0,
                  mt: 0,
                }}
              >
                {services[value].content}
              </Typography>
              <Typography sx={{ mb: 2, mt: 2.5 }}>
                Tempor erat elit rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos.
                Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo magna dolore erat amet.
              </Typography>
              <Box sx={{ mb: 2, mt: 4 }}>
                <Typography sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  ✅ &nbsp; Quality Servicing
                </Typography>
                <Typography sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  ✅ &nbsp; Expert Workers
                </Typography>
                <Typography sx={{ display: 'flex', alignItems: 'center' }}>
                  ✅ &nbsp; Modern Equipment
                </Typography>
              </Box>
            </Box>
            <Button
              variant="contained"
              sx={{
                backgroundColor: red[700],
                alignSelf: 'flex-start',
                '&:hover': {
                  backgroundColor: red[800],
                },
                px: 3,
                py: 2,
                marginTop: 3,
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              READ MORE →
            </Button>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default OurServicesStyled;
