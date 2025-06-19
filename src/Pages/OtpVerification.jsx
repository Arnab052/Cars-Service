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
} from "@mui/material";

const OTPVerification = () => {
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

  // Verify OTP mutation
  const { mutate: verifyOtp, isPending: isVerifying } = useMutation({
    mutationFn: async (otpData) => {
      const response = await axiosInstance.post("/otp-verification", {
        email: userEmail,
        otp: otpData.otp,
      });
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
      localStorage.removeItem("userEmail");
      navigate("/login");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to verify OTP");
    },
  });

  // Resend OTP mutation
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
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{ minHeight: "100vh", p: 2}}
    >
      <Grid item xs={12} md={8} lg={6} sx={{width:{xs:'100%',md:'80%'},display:'flex',alignItems:'center',justifyContent:'center'}}>
        <Card sx={{ borderRadius: 3, overflow: "hidden" }}>
          <Grid container>
            <Box sx={{display:{xs:'block',md:'flex'},alignItems:'center',justifyContent:'center'}}>
            <Grid item md={6} sx={{ display: { xs: "flex", md: "block" },padding:{xs:'0px'} , width:{xs:'100%',md:'100%'}}}>
              <Box
                component="img"
                src="/img/Car_Registration_Form.jpg"
                alt="verification form"
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CardContent sx={{ p: 4 ,paddingTop:{xs:'0px',md:'80px'}}}>
                <Box display="flex" alignItems="center" mb={2}>
                  <Box
                    component="span"
                    sx={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mr: 1.5,
                      fontSize: "2rem",
                      color: "#ff6219",
                    }}
                  >
                    🚗
                  </Box>
                  <Typography variant="h4" fontWeight="bold">
                    CarServ
                  </Typography>
                </Box>
                <Typography variant="h6" mb={2}>
                  Verify Your Email
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={3}>
                  Please enter the 6-digit code sent to <strong>{userEmail}</strong>
                </Typography>

                <Box component="form" onSubmit={handleSubmit}>
                  <Box display="flex" justifyContent="center" gap={1} mb={3} >
                    {otp.map((digit, index) => (
                      <TextField
                        key={index}
                        inputRef={(el) => (inputs.current[index] = el)}
                        value={digit}
                        onChange={(e) => handleChange(e.target, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        onPaste={handlePaste}
                        variant="outlined"
                        size="small"
                        inputProps={{
                          maxLength: 1,
                          style: {
                            textAlign: "center",
                            fontSize: "1.5rem",
                            width: {md:'45px',xs:'20px'},
                            height: "45px",

                          },
                        }}
                        disabled={isVerifying}
                      />
                    ))}
                  </Box>

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="error"
                    disabled={isVerifying || otp.includes("")}
                    sx={{ borderRadius: 1, py: 1 }}
                  >
                    {isVerifying ? <ButtonLoader /> : "Verify OTP"}
                  </Button>

                  <Box mt={2} textAlign="center">
                    <Typography variant="body2">
                      Didn't receive the code?{" "}
                      <Button
                        variant="text"
                        onClick={handleResendOTP}
                        disabled={timeLeft > 0 || isResending}
                        sx={{
                          textTransform: "none",
                          color: timeLeft > 0 ? "text.secondary" : "error.main",
                          p: 0,
                          minWidth: "auto",
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
                      </Button>
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Grid>
            </Box>
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
};

export default OTPVerification;
