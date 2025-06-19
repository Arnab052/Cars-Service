import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { forgetPWEmailVerification } from "../Api/Functions/ForgotPassword.api";
import { useNavigate } from "react-router-dom";
import ButtonLoader from "../Loader/ButtonLoader";
import {
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
} from "@mui/material";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { mutate, isPending } = useMutation({
    mutationFn: (data) => forgetPWEmailVerification(data),
    onSuccess: (data) => {
      if (data?.status === 200) {
        localStorage.setItem("userEmail", data?.email);
        Swal.fire({
          icon: "info",
          title: data?.message,
        });
        reset();
        navigate("/verify-forgot-password-otp");
      }
    },
    onError: (err) => {
      console.log("error in sending email", err);
      toast.error(err?.message);
      reset();
    },
  });

  const onSubmitForgetPW = (data) => {
    mutate(data);
  };

  return (
    <Container maxWidth="sm">
      <Box mt={8} mb={8}>
        <Card elevation={3}>
          <CardContent>
            <Typography
              variant="h5"
              component="h2"
              align="center"
              gutterBottom
              sx={{ fontWeight: "bold" }}
            >
              Forgot Password
            </Typography>
            <form onSubmit={handleSubmit(onSubmitForgetPW)}>
              <TextField
                label="Email"
                type="email"
                fullWidth
                margin="normal"
                {...register("email", { required: "Email is required" })}
                error={!!errors.email}
                helperText={errors?.email?.message}
              />
              <Box textAlign="center" mt={3}>
                <Button
                  type="submit"
                  variant="contained"
                  color="error"
                  size="large"
                  sx={{
                    minWidth: "150px",
                    borderRadius: "5px",
                  }}
                  disabled={isPending}
                >
                  {isPending ? <ButtonLoader /> : "Get OTP"}
                </Button>
              </Box>
            </form>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default ForgotPassword;
