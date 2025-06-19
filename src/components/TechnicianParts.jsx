import React from "react";
import { Box, Typography, Grid, Paper, IconButton } from "@mui/material";
import { Facebook, Twitter, Instagram } from "@mui/icons-material";
import  { useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';

const TechnicianParts = () => {
    useEffect(() => {
    AOS.init({
      duration: 1500, 
      once: true,     
    });
  }, []);
  const technicians = [
    {
      name: "Full Name",
      designation: "Designation",
      image: "img/team-1.jpg",
    },
    {
      name: "Full Name",
      designation: "Designation",
      image: "img/team-2.jpg",
    },
    {
      name: "Full Name",
      designation: "Designation",
      image: "img/team-3.jpg",
    },
    {
      name: "Full Name",
      designation: "Designation",
      image: "img/team-4.jpg",
    },
  ];
  

  return (
    <Box
      sx={{
        py: 5,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        textAlign: "center",
      }}
    >
      <Typography variant="h6" color="primary" sx={{ mb: 2 }}>
        // Our Technicians //
      </Typography>
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 5 }}>
        Our Expert Technicians
      </Typography>

      <Grid container spacing={2} justifyContent="center">
        {technicians.map((technician, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper elevation={3} sx={{ padding: 2, borderRadius: 2 }}>
              <Box
                sx={{
                  position: "relative",
                  overflow: "hidden",
                  borderRadius: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "100%",
                  width:{xs:'100%',md:'260px'}
                }}
              >
                {/* Image section */}
                <Box
                  sx={{
                    flexGrow: 1,
                    display: "flex",
                    justifyContent: "center",
                    
                  }}
                  data-aos="zoom-in"
                >
                  <img
                    src={technician.image}
                    alt={technician.name}
                    style={{
                      width: "100%",
                      height: "auto",
                      borderRadius: "8px",
                      objectFit: "cover",
                    }}
                  />
                </Box>

                {/* Social Media Icons */}
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(243, 17, 17, 0.5)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    opacity: 0,
                    "&:hover": {
                      opacity: 1,
                    },
                  }}
                >
                  <Box>
                    <IconButton
                      sx={{ color: "white" }}
                      href="#"
                      aria-label="facebook"
                    >
                      <Facebook />
                    </IconButton>
                    <IconButton
                      sx={{ color: "white" }}
                      href="#"
                      aria-label="twitter"
                    >
                      <Twitter />
                    </IconButton>
                    <IconButton
                      sx={{ color: "white" }}
                      href="#"
                      aria-label="instagram"
                    >
                      <Instagram />
                    </IconButton>
                  </Box>
                  
                </Box>
              </Box>

              {/* Text below the image */}
              <Typography variant="h6" sx={{ mt: 2 }}>
                {technician.name}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {technician.designation}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TechnicianParts;
