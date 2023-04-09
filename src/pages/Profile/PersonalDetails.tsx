import { useAppSelector } from "@hooks/useAppSelector";
import { Typography, Box } from "@mui/material";

export const PersonalDetails = () => {
  const { authUserData } = useAppSelector(
    (state) => state.user
  );

  return (
    <Box>
      <Typography textAlign="left" variant="h6" component="h2">
        personal details
      </Typography>
    </Box>
  );
};
