import { useAppDispatch } from "@hooks/useAppDispatch";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { Box, Grid, TextField, Typography } from "@mui/material";
import { Controller } from "react-hook-form";
import { useAppSelector } from "@hooks/useAppSelector";
import useLogin from "@hooks/useLogin";
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

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { submitLoginForm, formUtils } = useLogin();
  const { authStatus } = useAppSelector((state) => state.user);

  useEffect(() => {
    useDocumentTitle("Login");
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
            Login
          </Typography>
          <Box
            component="form"
            noValidate
            py={4}
            onSubmit={formUtils.handleSubmit(submitLoginForm)}
          >
            <Grid container spacing={4}>
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
                Login
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
              Need an account?
            </Typography>

            <LinkItem to="/signup" replace>
              Click to Signup
            </LinkItem>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
