import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Paper,
  CssBaseline,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// 1️⃣ Create a theme with Google Font
const theme = createTheme({
  typography: {
    fontFamily: "'Poppins', sans-serif",
  },
});
import  { useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';

const AboutUsPart = () => {
    useEffect(() => {
      AOS.init({
       
      });
    }, []);
  return (
    <ThemeProvider theme={theme}>
      {/* 2️⃣ CssBaseline resets default styles */}
      <CssBaseline />
      {/* 3️⃣ Google Font Link */}
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap"
        rel="stylesheet"
      />

      <Box py={8} sx={{ backgroundColor: "white", width: "100%" }}>
        <Container maxWidth="xl">
          <Grid>
            <Box
              sx={{
                display: { xs: "block", md: "flex" },
                justifyContent: "space-between",
                width: "100%",
                padding: "0px",
              }}
            >
              {/* Left section with image */}
              <Grid
                item
                xs={12}
                md={6}
                sx={{
                  position: "relative",
                  minHeight: { xs: "250px", md: "400px" },
                  width: { xs: "100%", md: "50%" },
                  padding: "0px",
                  margin: "0px",
                }}
             
              >
                <Box
                  sx={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    padding: "0px",
                    margin: "0px",
                  }}
                     data-aos="fade-up"
                    data-aos-duration="1500"
                >
                  <img
                    src="img/about.jpg"
                    alt="About Us"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      position: "absolute",
                      top: 0,
                      left: 0,
                      margin: 0,
                      padding: 0,
                      filter: "brightness(0.6)",
                    }}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      top: { xs: "auto", md: 0 },
                      bottom: { xs: 16, md: "auto" },
                      right: { xs: "50%", md: 0 },
                      transform: { xs: "translateX(50%)", md: "none" },
                      mt: { xs: 0, md: -4 },
                      mr: { xs: 0, md: -4 },
                      p: 3,
                      background: "rgba(0, 0, 0, 0.82)",
                      color: "white",
                      textAlign: "center",
                      width: { xs: "auto", md: "200px" },
                      height: { xs: "auto", md: "100px" },
                    }}
                  >
                    <Typography variant="h4" sx={{ mb: 0 }}>
                      15 <span style={{ fontSize: "1.2rem" }}>Years</span>
                    </Typography>
                    <Typography variant="h6">Experience</Typography>
                  </Box>
                </Box>
              </Grid>

              {/* Right section with text */}
              <Box
                sx={{ width: { xs: "100%", md: "45%" }, mt: { xs: 4, md: 0 } }}
              >
                <Grid
                  item
                  xs={12}
                  md={12}
                  sx={{
                    flex: "1 1 auto",
                    paddingLeft: { xs: 0, md: 3 },
                    paddingRight: { xs: 0, md: 3 },
                  }}
                   data-aos="fade-down"
                    data-aos-duration="1500"
                >
                  <Typography
                    variant="h6"
                    color="primary"
                    gutterBottom
                    sx={{ fontWeight: 600 ,textAlign:{xs:'center',md:'left'}}}
                  >
                    // About Us //
                  </Typography>
                  <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 ,textAlign:{xs:'center',md:'left'}}}>
                    <span style={{ color: "#1976d2" }}>CarServ</span> Is The
                    Best Place For Your Auto Care
                  </Typography>
                  <Typography sx={{textAlign:{xs:'center',md:'left'}}} variant="body1" paragraph>
                    Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit.
                    Aliqu diam amet diam et eos. Clita erat ipsum et lorem et
                    sit, sed stet lorem sit clita duo justo magna dolore erat
                    amet.
                  </Typography>

                  {/* Feature List */}
                  <Grid container spacing={2} mb={2}>
                    {/* Feature 1 */}
                    <Grid
                      item
                      xs={12}
                      sx={{ display: "block", width: { xs: "100%", md: "auto" } }}
                    >
                      <Paper
                        sx={{
                          p: 2,
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Box
                          sx={{
                            width: 45,
                            height: 45,
                            backgroundColor: "#f1f1f1",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginRight: 2,
                          }}
                        >
                          <Typography
                            variant="h6"
                            sx={{ color: "#1976d2", fontWeight: 700 }}
                          >
                            01
                          </Typography>
                        </Box>
                        <Box>
                          <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            Professional & Expert
                          </Typography>
                          <Typography variant="body2">
                            Diam dolor diam ipsum sit amet diam et eos
                          </Typography>
                        </Box>
                      </Paper>
                    </Grid>

                    {/* Feature 2 */}
                    <Grid
                      item
                      xs={12}
                      sx={{ width: { xs: "100%", md: "auto" } }}
                    >
                      <Paper
                        sx={{
                          p: 2,
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Box
                          sx={{
                            width: 45,
                            height: 45,
                            backgroundColor: "#f1f1f1",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginRight: 2,
                          }}
                        >
                          <Typography
                            variant="h6"
                            sx={{ color: "#1976d2", fontWeight: 700 }}
                          >
                            02
                          </Typography>
                        </Box>
                        <Box>
                          <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            Quality Servicing Center
                          </Typography>
                          <Typography variant="body2">
                            Diam dolor diam ipsum sit amet diam et eos
                          </Typography>
                        </Box>
                      </Paper>
                    </Grid>

                    {/* Feature 3 */}
                    <Grid
                      item
                      xs={12}
                      sx={{ width: { xs: "100%", md: "auto" } }}
                    >
                      <Paper
                        sx={{
                          p: 2,
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Box
                          sx={{
                            width: 45,
                            height: 45,
                            backgroundColor: "#f1f1f1",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginRight: 2,
                          }}
                        >
                          <Typography
                            variant="h6"
                            sx={{ color: "#1976d2", fontWeight: 700 }}
                          >
                            03
                          </Typography>
                        </Box>
                        <Box>
                          <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            Awards Winning Workers
                          </Typography>
                          <Typography variant="body2">
                            Diam dolor diam ipsum sit amet diam et eos
                          </Typography>
                        </Box>
                      </Paper>
                    </Grid>
                  </Grid>

                  {/* Read More Button */}
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    sx={{
                      px: 5,
                      py: 2,
                      fontSize: "1.1rem",
                      width: { xs: "100%", sm: "auto" },
                      backgroundColor: "#e03535",
                      fontWeight: 600,
                    }}
                  >
                    Read More
                    <i className="fa fa-arrow-right ms-3"></i>
                  </Button>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default AboutUsPart;
