import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { updatePassword } from "../Api/Functions/UpdatePassword";
import { toast } from "react-toastify";
import ButtonLoader from "../Loader/ButtonLoader";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
} from "@mui/material";

const UpdatePassword = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { mutate, isPending } = useMutation({
    mutationFn: (data) => updatePassword(data),
    onSuccess: (data) => {
      if (data?.status === 200) {
        Swal.fire({
          icon: "success",
          text: data?.message,
        });
        navigate("/login");
      }
    },
    onError: (err) => {
      console.log(err);
      toast.error(err?.message);
    },
  });
  const onSubmitPW = async (data) => {
    mutate(data);
  };

  return (
    <Container maxWidth="sm" sx={{ py: 5 }}>
      <Card sx={{ boxShadow: 3 }}>
        <CardContent>
          <Typography
            variant="h5"
            component="h2"
            align="center"
            gutterBottom
            sx={{ fontWeight: "bold" }}
          >
            Update Your Password
          </Typography>
          <Box component="form" onSubmit={handleSubmit(onSubmitPW)} noValidate>
            <TextField
              fullWidth
              type="password"
              label="Current Password*"
              margin="normal"
              {...register("currentPassword", { required: true })}
              error={Boolean(errors.currentPassword)}
              helperText={
                errors.currentPassword && "**Current Password is Required"
              }
            />
            <TextField
              fullWidth
              type="password"
              label="New Password*"
              margin="normal"
              {...register("newPassword", { required: true })}
              error={Boolean(errors.newPassword)}
              helperText={
                errors.newPassword && "**New Password is Required"
              }
            />
            <Box sx={{ mt: 3 }}>
              {isPending ? (
                <ButtonLoader />
              ) : (
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="error"
                  sx={{ py: 1 }}
                >
                  Update
                </Button>
              )}
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default UpdatePassword;
