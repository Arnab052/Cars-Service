import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import "@fontsource/poppins"; // Google Fonts
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const facts = [
  {
    icon: "fa fa-check",
    end: 1234,
    label: "Years Experience",
  },
  {
    icon: "fa fa-users-cog",
    end: 567,
    label: "Expert Technicians",
  },
  {
    icon: "fa fa-users",
    end: 890,
    label: "Satisfied Clients",
  },
  {
    icon: "fa fa-car",
    end: 234,
    label: "Complete Projects",
  },
];

const FactsPart = () => {
  return (
    <Box
      sx={{
        position: "relative",
        py: 5,
        my: 5,
        backgroundImage: `url('../../public/img/team-1.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "white",
        overflow: "hidden",
      }}
    >
      {/* Overlay */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          bgcolor: "rgba(0,0,0,0.7)",
          zIndex: 1,
        }}
      />

      <Container sx={{ position: "relative", zIndex: 2 }}>
        <Grid container spacing={4} justifyContent="space-between">
          {facts.map((fact, index) => (
            <Grid item xs={12} md={6} lg={3} key={index}>
              <FactItem
                icon={fact.icon}
                end={fact.end}
                label={fact.label}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

// এই কম্পোনেন্ট প্রতিটা fact এর জন্য
const FactItem = ({ icon, end, label }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  return (
    <Box textAlign="center" ref={ref}>
      <i className={`${icon} fa-2x mb-3`}></i>
      <Typography
        variant="h4"
        sx={{
          mb: 1,
          fontFamily: '"Poppins", sans-serif',
          fontWeight: 700,
        }}
      >
        {inView ? <CountUp end={end} duration={2} /> : 0}
      </Typography>
      <Typography
        sx={{
          fontFamily: '"Poppins", sans-serif',
        }}
      >
        {label}
      </Typography>
    </Box>
  );
};

export default FactsPart;
