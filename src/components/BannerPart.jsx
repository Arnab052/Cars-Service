import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Box, Grid, Typography, Button } from "@mui/material";
import "@fontsource/poppins"; // 👈 Google Font
import React, { useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';

// Slide data
const slides = [
  {
    bg: "img/carousel-bg-1.jpg",
    title: "Qualified Car Repair Service Center",
    img: "img/carousel-1.png",
  },
  {
    bg: "img/carousel-bg-2.jpg",
    title: "Qualified Car Wash Service Center",
    img: "img/carousel-2.png",
  },
];

const BannerPage = () => {
  
    useEffect(() => {
    AOS.init({
      duration: 1000, 
      once:true,
    });
  }, []);

  return (
    <Box sx={{ width: "100%", overflow: "hidden", mb: 5 }}>
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        autoplay={{ delay: 3000 }}
        navigation
        pagination={{ clickable: true }}
        loop
        style={{ width: "100%", height: "100%" }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <Box
              sx={{
                position: "relative",
                minHeight: { xs: "400px", md: "800px" },
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundImage: `url(${slide.bg})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  filter: "brightness(0.3)",
                  zIndex: 1,
                },
              }}
            >
              <Grid
                container
                spacing={2}
                alignItems="center"
                sx={{ position: "relative", zIndex: 2 }}
              >
                <Grid
                  item
                  xs={12}
                  md={7}
                  sx={{ textAlign: { xs: "center", md: "left" }, p: 3 }}
                
                >
                  <Typography
                    variant="h2"
                    sx={{
                      color: "white",
                      mb: 2,
                      fontWeight: 700,
                      textShadow: "2px 2px 4px rgba(0,0,0,0.7)",
                      width: { xs: "100%", md: "650px" },
                      fontSize: { xs: "40px", md: "60px" },
                      fontFamily: '"Poppins", sans-serif',
                    }}
                  >
                    {slide.title}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{
                      mt: 2,
                      px: 4,
                      py: 1,
                      backgroundColor: "#e90f0f",
                      fontFamily: '"Poppins", sans-serif',
                      "&:hover": { backgroundColor: "#c60000" },
                    }}
                  >
                    Learn More
                  </Button>
                </Grid>

                <Grid
                  item
                  md={5}
                  sx={{
                    display: { xs: "none", md: "flex" },
                    justifyContent: "center",
                    
                  }}
                  
                    data-aos="zoom-in" 
                >
                  <Box
                    
                    component="img"
                    src={slide.img}
                    alt="Car"
                    sx={{ maxWidth: "100%", maxHeight: "400px" }}
                  />
                </Grid>
              </Grid>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default BannerPage;
