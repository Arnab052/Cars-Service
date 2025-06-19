import { Box, Typography, Button, Paper, Stack } from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";
import GroupsIcon from "@mui/icons-material/Groups";
import BuildIcon from "@mui/icons-material/Build";
import React, { useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';

const services = [
  {
    icon: <VerifiedIcon sx={{ fontSize: 60, color: "primary.main" }} />,
    title: "Quality Servicing",
    description: "Diam dolor diam ipsum sit amet diam et eos erat ipsum",
  },
  {
    icon: <GroupsIcon sx={{ fontSize: 60, color: "primary.main" }} />,
    title: "Expert Workers",
    description: "Diam dolor diam ipsum sit amet diam et eos erat ipsum",
    bgColor: "#f5f5f5", // <-- এখানে bg color
  },
  {
    icon: <BuildIcon sx={{ fontSize: 60, color: "primary.main" }} />,
    title: "Modern Equipment",
    description: "Diam dolor diam ipsum sit amet diam et eos erat ipsum",
  },
];

const BannerServicePart = () => {
   useEffect(() => {
    AOS.init({
     
    });
  }, []);
  return (
    <Box sx={{ py: 5, px: 2, maxWidth: "1200px", mx: "auto" }}>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={3}
        justifyContent="center"
      >
        {services.map((service, index) => (
          <Paper
            key={index}
            elevation={3}
            sx={{
              display: "flex",
              alignItems: "flex-start",
              gap: 2,
              p: 3,
              flex: 1,
              minWidth: { md: "250px" },
              backgroundColor: service.bgColor || "white",
              transition: "transform 0.3s",
              "&:hover": {
                transform: "translateY(-5px)",
              },
            }}
            data-aos="flip-left"
            data-aos-easing="ease-out-cubic"
            data-aos-duration="2000"
          >
            <Box>{service.icon}</Box>
            <Box>
              <Typography
                variant="h6"
                sx={{ mb: 1, fontWeight: 600, color: "text.primary" }}
              >
                {service.title}
              </Typography>
              <Typography sx={{ mb: 2, color: "text.secondary" }}>
                {service.description}
              </Typography>
              <Button variant="text" color="primary">
                Read More
              </Button>
            </Box>
          </Paper>
        ))}
      </Stack>
    </Box>
  );
};

export default BannerServicePart;
