import { useAppSelector } from "@hooks/useAppSelector";
import { Typography, Box, Grid, Link } from "@mui/material";

export const PersonalDetails = () => {
  const { authUserData, authUser } = useAppSelector((state) => state.user);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Typography variant="h6" component="h2">
            Phone Number :
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography variant="h6" component="h2">
            {authUserData?.phone}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="h6" component="h2">
            Email :
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography variant="h6" component="h2">
            {authUser?.email}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="h6" component="h2">
            Website :
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Link href={authUserData?.website.toString()} color="inherit">
            <Typography variant="h6" component="h2">
              {authUserData?.website}
            </Typography>
          </Link>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="h6" component="h2">
            Bio :
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography variant="h6" component="h2">
            {authUserData?.bio}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};
