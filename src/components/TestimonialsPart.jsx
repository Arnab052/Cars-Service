import React, { useEffect } from "react";
import {
  Box,
  Typography,
  Container,
  Card,
  CardContent,
  CardMedia,
  Button,
} from "@mui/material";

import AOS from 'aos';
import 'aos/dist/aos.css';
// Testimonial Data
const testimonials = [
  {
    image: "/img/testimonial-1.jpg",
    name: "Client Name 1",
    profession: "Profession 1",
    text: "Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit diam amet diam et eos. Clita erat ipsum et lorem et sit.",
  },
  {
    image: "/img/testimonial-2.jpg",
    name: "Client Name 2",
    profession: "Profession 2",
    text: "Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit diam amet diam et eos. Clita erat ipsum et lorem et sit.",
  },
  {
    image: "/img/testimonial-3.jpg",
    name: "Client Name 3",
    profession: "Profession 3",
    text: "Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit diam amet diam et eos. Clita erat ipsum et lorem et sit.",
  },
  {
    image: "/img/testimonial-4.jpg",
    name: "Client Name 4",
    profession: "Profession 4",
    text: "Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit diam amet diam et eos. Clita erat ipsum et lorem et sit.",
  }
];


const TestimonialsPart = () => {
    useEffect(() => {
    AOS.init({
      duration: 1000, 
      once: true,     
    });
  }, []);
  return (
    <Box sx={{ py: 5, backgroundColor: "#f5f5f5" }} data-aos="fade-up">
      <Container>
        <Box sx={{ textAlign: "center", mb: 5 }}>
          <Typography
            variant="h6"
            color="primary"
            sx={{ textTransform: "uppercase" }}
          >
            Testimonial
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            Our Clients Say!
          </Typography>
        </Box>

        {/* MUI Cards in Responsive Grid */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 3.5,
          }}
        >
          {testimonials.map((testimonial, idx) => (
            <Card
              key={idx}
              sx={{
                width: { xs: "100%", sm: "45%", md: "23%" }, // Responsive width
                boxShadow: 3,
                textAlign: "center",
          
              }}
            >
              <CardMedia
                component="img"
                image={testimonial.image}
                alt={testimonial.name}
                sx={{
                  borderRadius: "50%",
                  width: 80,
                  height: 80,
                  mx: "auto",
                  mt: 2,
                  objectFit: "cover",
                }}
              />
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  {testimonial.name}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ mb: 2 }}
                >
                  {testimonial.profession}
                </Typography>
                <Typography variant="body1" sx={{ fontStyle: "italic" }}>
                  "{testimonial.text}"
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* Navigation Buttons */}
        <Box sx={{ textAlign: "center", mt: 5 }}>
          <Button variant="contained" color="primary" sx={{ mx: 1 }}>
            Previous
          </Button>
          <Button variant="contained" color="primary" sx={{ mx: 1 }}>
            Next
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default TestimonialsPart;
