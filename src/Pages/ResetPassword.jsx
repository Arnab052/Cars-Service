import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { resetpassword } from "../Api/Functions/ResetPassword.api";
import ButtonLoader from "../Loader/ButtonLoader";

// MUI Components
import {
  Container,
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
} from "@mui/material";

const ResetPassword = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const password = watch("newPassword", "");

  const { mutate, isPending } = useMutation({
    mutationFn: (data) => {
      const { newPassword } = data;
      const email = localStorage.getItem("userEmail");
      return resetpassword({ email, newPassword });
    },
    onSuccess: (data) => {
      if (data?.status === 200) {
        Swal.fire({
          icon: "success",
          title: data?.message,
        });
        localStorage.removeItem("userEmail");
        navigate("/login");
      }
    },
    onError: (err) => {
      console.log("error in resetting password", err);
      toast.error(err?.message);
      reset();
    },
  });

  const onSubmitResetPW = (data) => {
    mutate(data);
  };

  return (
    <Container maxWidth="sm" sx={{ py: 5 }}>
      <Card elevation={3}>
        <CardContent>
          <Typography
            variant="h4"
            component="h1"
            align="center"
            gutterBottom
            sx={{ fontWeight: "bold", color: "#D81324" }}
          >
            Reset Password
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit(onSubmitResetPW)}
            noValidate
            sx={{ mt: 3 }}
          >
            <TextField
              fullWidth
              type="password"
              label="New Password"
              variant="outlined"
              margin="normal"
              {...register("newPassword", {
                required: "New Password is required",
              })}
              error={Boolean(errors?.newPassword)}
              helperText={errors?.newPassword?.message}
            />

            <TextField
              fullWidth
              type="password"
              label="Confirm New Password"
              variant="outlined"
              margin="normal"
              {...register("cPassword", {
                required: "Confirm New Password is required",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              error={Boolean(errors?.cPassword)}
              helperText={errors?.cPassword?.message}
            />

            <Box sx={{ mt: 3 }}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="error"
                size="large"
                disabled={isPending}
              >
                {isPending ? <ButtonLoader /> : "Reset"}
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ResetPassword;
