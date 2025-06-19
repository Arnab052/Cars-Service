import { useState, useEffect, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../Api/AxiosInstance/AxiosInstance";
import { toast } from "react-toastify";
import ButtonLoader from "../Loader/ButtonLoader";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Link,
} from "@mui/material";

const ForgotPasswordOTPVerification = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputs = useRef([]);
  const [timeLeft, setTimeLeft] = useState(300);
  const navigate = useNavigate();
  const [userEmail] = useState(localStorage.getItem("userEmail"));

  useEffect(() => {
    if (!userEmail) {
      toast.error("Email not found. Please register first.");
      navigate("/registration");
      return;
    }

    const timer =
      timeLeft > 0 &&
      setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, userEmail, navigate]);

  const { mutate: verifyOtp, isPending: isVerifying } = useMutation({
    mutationFn: async (otpData) => {
      const response = await axiosInstance.post(
        "/forgot-password-otp-verification",
        {
          email: userEmail,
          otp: otpData.otp,
        }
      );
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
      navigate("/reset-password");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to verify OTP");
    },
  });

  const { mutate: resendOtp, isPending: isResending } = useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.post("/api/resend-otp", {
        email: userEmail,
      });
      return response.data;
    },
    onSuccess: () => {
      toast.success("New OTP sent successfully!");
      setTimeLeft(120);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to resend OTP");
    },
  });

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;
    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);
    if (element.value && index < 5) {
      inputs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
        inputs.current[index - 1].focus();
      } else {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6).split("");
    if (pastedData.some((char) => isNaN(char))) return;
    const newOtp = [...otp];
    pastedData.forEach((value, i) => {
      if (i < 6) newOtp[i] = value;
    });
    setOtp(newOtp);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const otpString = otp.join("");
    if (otpString.length !== 6) {
      toast.error("Please enter all 6 digits");
      return;
    }
    verifyOtp({
      otp: otpString,
    });
  };

  const handleResendOTP = () => {
    if (timeLeft > 0) return;
    resendOtp();
  };

  return (
    <Box sx={{ py: 8,bgcolor: "#f5f5f5" }}>
      <Grid container justifyContent="center" alignItems="center" sx={{width:'100%'}}>
        <Grid item xs={12} md={8} lg={6} sx={{width:{xs:'100%',md:'75%'}}}>
          <Card sx={{ display: "flex", borderRadius: 2, minHeight: 400 }}>
            <Grid container>
             <Box sx={{display:{xs:'block',md:'flex'},justifyContent:'space-around',alignItems:'center'}}>
              <Grid
                item
                xs={12}
                md={5}
                sx={{
                  display: { xs: "none", md: "flex" },
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "8px 0 0 8px",
                  width:{xs:'100%',md:'480px'}
                }}
              >
                <Box
                  component="img"
                  src="/img/Car_Registration_Form.jpg"
                  alt="verification form"
                  sx={{
                    width: "60%",
                    p: 2,
                    borderRadius: "8px 0 0 8px",
                  }}
                />
              </Grid>

              <Grid item xs={12} md={7} >
                <CardContent sx={{ p: 4 ,width:{sx:'100%',md:'550px'}}}>
                  <Box display="flex" alignItems="center" mb={3}>
                    <Box
                      component="span"
                      sx={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        bgcolor: "#ff6219",
                        color: "#fff",
                        mr: 2,
                        fontSize: 20,
                      }}
                    >
                      <i className="fas fa-cubes"></i>
                    </Box>
                    <Typography variant="h4" fontWeight="bold">
                      CarServ
                    </Typography>
                  </Box>

                  <Typography variant="h6" gutterBottom>
                    Verify Your Email
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mb={3}>
                    Please enter the 6-digit code sent to {userEmail}
                  </Typography>

                  <Box
                    component="form"
                    onSubmit={handleSubmit}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                  >
                    <Grid container spacing={1} justifyContent="center" mb={3}>
                      {otp.map((digit, index) => (
                        <Grid item key={index}>
                          <TextField
                            inputRef={(el) => (inputs.current[index] = el)}
                            value={digit}
                            onChange={(e) =>
                              handleChange(e.target, index)
                            }
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            onPaste={handlePaste}
                            inputProps={{
                              maxLength: 1,
                              style: {
                                textAlign: "center",
                                fontWeight: "bold",
                                fontSize: "1.5rem",
                                width: "50px",
                                height: "56px",
                              },
                            }}
                            disabled={isVerifying}
                          />
                        </Grid>
                      ))}
                    </Grid>

                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      sx={{
                        bgcolor: "#D81324",
                        "&:hover": { bgcolor: "#b1101c" },
                        mb: 2,
                        borderRadius: "5px",
                      }}
                      disabled={isVerifying || otp.includes("")}
                    >
                      {isVerifying ? <ButtonLoader /> : "Verify OTP"}
                    </Button>

                    <Typography variant="body2" textAlign="center">
                      Didn't receive the code?{" "}
                      <Link
                        component="button"
                        onClick={handleResendOTP}
                        disabled={timeLeft > 0 || isResending}
                        underline="none"
                        sx={{
                          color: timeLeft > 0 ? "text.secondary" : "#D81324",
                          fontWeight: 500,
                        }}
                      >
                        {isResending ? (
                          <ButtonLoader />
                        ) : timeLeft > 0 ? (
                          `Resend OTP in ${Math.floor(timeLeft / 60)}:${(
                            timeLeft % 60
                          )
                            .toString()
                            .padStart(2, "0")}`
                        ) : (
                          "Resend OTP"
                        )}
                      </Link>
                    </Typography>
                  </Box>
                </CardContent>
              </Grid>
              </Box>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ForgotPasswordOTPVerification;
