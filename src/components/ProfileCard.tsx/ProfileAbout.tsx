import { useAppDispatch } from "@hooks/useAppDispatch";
import { useAppSelector } from "@hooks/useAppSelector";
import { Box, Button, Typography } from "@mui/material";
import { changeProfileModalState } from "@slice/appSlice";

export const ProfileAbout = () => {
  const { profileModalOpen } = useAppSelector((state) => state.appData);
  const dispatch = useAppDispatch();

  const handleOpenProfileEditModal = () => {
    dispatch(changeProfileModalState(true));
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "spaceBetween",
      }}
    >
      <div>
        <Typography textAlign="left" variant="h3" component="h1">
          Ravi Kumar
        </Typography>
        <Typography textAlign="left" variant="h6" component="h2">
          @ravikumar
        </Typography>
      </div>
      <div>
        <Button variant="contained" onClick={handleOpenProfileEditModal}>
          Edit
        </Button>
      </div>
    </div>
  );
};
