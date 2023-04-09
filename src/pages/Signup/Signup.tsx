import { useAppDispatch } from "@hooks/useAppDispatch";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { Box, Grid, TextField, Typography } from "@mui/material";
import { Controller } from "react-hook-form";
import useSignup from "@hooks/useSignup";
import { useAppSelector } from "@hooks/useAppSelector";
import styled from "@emotion/styled";
import { useEffect } from "react";
import { useDocumentTitle } from "@hooks/useDocumentTitle";

export const LinkItem = styled(Link)`
  text-decoration: none;
  color: #3683dc;
  &:hover {
    text-decoration: underline;
    color: #5ea1b6;
  }
`;

const Signup = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { submitSingupForm, formUtils } = useSignup();
  const { authStatus } = useAppSelector((state) => state.user);

  useEffect(() => {
    useDocumentTitle("Signup");
  }, []);

  return (
    <Box>
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          backgroundColor: "lightblue",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: {
              xs: "100%",
              sm: "500px",
            },
            padding: { xs: 4, md: 6 },
            bgcolor: "rgba(255,255,255,0.8)",
            borderRadius: "4px",
          }}
        >
          <Typography textAlign="center" variant="h4">
            Singup
          </Typography>
          <Box
            component="form"
            noValidate
            py={4}
            onSubmit={formUtils.handleSubmit(submitSingupForm)}
          >
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <Controller
                  control={formUtils.control}
                  name="name"
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextField
                      label="Name"
                      type="text"
                      fullWidth
                      error={!!formUtils.errors.name?.message}
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  control={formUtils.control}
                  name="username"
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextField
                      error={!!formUtils.errors.username?.message}
                      label="Username"
                      type="text"
                      fullWidth
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  control={formUtils.control}
                  name="email"
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextField
                      label="Email"
                      type="text"
                      error={!!formUtils.errors.email?.message}
                      fullWidth
                      helperText={
                        formUtils.errors.email?.message?.toString() ?? undefined
                      }
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  control={formUtils.control}
                  name="password"
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextField
                      label="Password"
                      type="password"
                      error={!!formUtils.errors.password?.message}
                      fullWidth
                      helperText={
                        formUtils.errors.password?.message?.toString() ??
                        undefined
                      }
                      {...field}
                    />
                  )}
                />
              </Grid>
            </Grid>
            <Grid mt={4} container justifyContent="center">
              <LoadingButton
                loading={authStatus === "pending"}
                sx={{ width: { sm: "100%", md: "50%" } }}
                variant="contained"
                type="submit"
              >
                Sign Up
              </LoadingButton>
            </Grid>
          </Box>
          <Box
            sx={{
              width: "100%",
              textAlign: "center",
            }}
          >
            <Typography sx={{ fontSize: "0.9rem" }}>
              Already have an account?
            </Typography>

            <LinkItem to="/login" replace>
              Click to Login
            </LinkItem>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Signup;
