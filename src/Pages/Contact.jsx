import React from "react";
import {
  Box,
  Container,
  Typography,
  Breadcrumbs,
  Link,
  Grid,
  Paper,
  TextField,
  Button,
  Card,
  CardContent,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
 // Optional: for embedding the map in a custom component

const Contact = () => {
  return (
    <>
      {/* Header Section */}
      <Box
        sx={{
          backgroundImage: "url('/img/carousel-bg-1.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          py: 8,
          color: "white",
          textAlign: "center",
        }}
      >
        <Container>
          <Typography variant="h3" sx={{ mb: 2 }}>
            Contact
          </Typography>
          <Breadcrumbs sx={{ justifyContent: "center", display: "flex" }}>
            <Link underline="hover" color="inherit" href="/">
              Home
            </Link>
            <Link underline="hover" color="inherit" href="#">
              Pages
            </Link>
            <Typography color="text.primary">Contact</Typography>
          </Breadcrumbs>
        </Container>
      </Box>

      {/* Contact Section */}
      <Container sx={{ py: 8 }}>
        <Typography
          variant="overline"
          color="primary"
          sx={{ display: "block", textAlign: "center", mb: 1 }}
        >
          // Contact Us //
        </Typography>
        <Typography variant="h4" align="center" gutterBottom>
          Contact For Any Query
        </Typography>

        <Grid container spacing={12} sx={{ mt: 4,textAlign:'center' }}>
          {/* Contact Info */}
          {[
            { title: "// Booking //", email: "book@example.com" },
            { title: "// General //", email: "info@example.com" },
            { title: "// Technical //", email: "tech@example.com" },
          ].map((item, index) => (
            <Grid item xs={12} md={4} key={index} sx={{margin:'0 auto'}}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  textAlign: "center",
                  height: "100%",
                  width:'250px',
                }}
              >
                <Typography variant="subtitle1" gutterBottom>
                  {item.title}
                </Typography>
                <Typography variant="body2">
                  <EmailIcon sx={{ mr: 1, color: "primary.main" }} />
                  {item.email}
                </Typography>
              </Paper>
            </Grid>
          ))}

          {/* Google Map */}
         <Grid sx={{display:{xs:'block',md:'flex'},justifyContent:'space-between',height:{xs:'auto',md:'500px'},width:'100%'}}>
            <Grid item xs={12} md={6} sx={{width:'100%',height:'500px'}}>
            <Grid sx={{ height: "100%", borderRadius: 2 ,width:'100%'}}>
              <CardContent sx={{ p: 0 }}>
              
                <Box
                  component="iframe"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d118643.79808429127!2d88.31732814902841!3d21.6786856596183!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a03b74d398c1aa1%3A0xae8d763910d3a7cc!2sG-Plot%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1749050725067!5m2!1sen!2sin"
                  sx={{height:'500px',width:'100%'}}
                  frameBorder="0"
                  style={{ border: 0 }}
                 
                  tabIndex="0"
                ></Box>
              </CardContent>
            </Grid>
          </Grid>
        

          {/* Contact Form */}
          <Grid item xs={12} md={6} sx={{width:{xs:'100%',md:'80%'},marginTop:{xs:'20px',md:'0px'}}}>
          
            <Box component="form" noValidate autoComplete="off" sx={{width:{xs:'100%',md:'90%'},margin:'0 auto'}}>
              <Grid container spacing={2}>
              
                <Grid item xs={12} sm={6} >
                   <TextField
                    fullWidth
                    label="Your Name"
                    variant="outlined"
                    name="name"
                    sx={{marginBottom:'40px'}}
                  />
                  <TextField
                    fullWidth
                    label="Your Email"
                    variant="outlined"
                    name="email"
                    type="email"
                    sx={{marginBottom:'40px'}}
                  />
                     <TextField
                    fullWidth
                    label="Subject"
                    variant="outlined"
                    name="subject"
                    sx={{marginBottom:'40px'}}
                  />
                    <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Message"
                    variant="outlined"
                    name="message"
                      sx={{marginBottom:'25px'}}
                  />
                </Grid>
               
             
                <Grid item xs={12}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    size="large"
                  >
                    Send Message
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Contact;
