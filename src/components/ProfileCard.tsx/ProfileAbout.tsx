import { useAppDispatch } from "@hooks/useAppDispatch";
import { Box, Button, Typography } from "@mui/material";
import { changeProfileModalState } from "@slice/appSlice";

interface IProfileAbout {
  name: string;
  username: string;
}

export const ProfileAbout = (props: IProfileAbout) => {
  const { name, username } = props;
  const dispatch = useAppDispatch();

  const handleOpenProfileEditModal = () => {
    dispatch(changeProfileModalState(true));
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      {name && username && (
        <>
          <div>
            <Typography textAlign="left" variant="h3" component="h1">
              {name}
            </Typography>
            <Typography textAlign="left" variant="h6" component="h2">
              @{username}
            </Typography>
          </div>
          <div>
            <Button variant="contained" onClick={handleOpenProfileEditModal}>
              Edit
            </Button>
          </div>
        </>
      )}
    </div>
  );
};
