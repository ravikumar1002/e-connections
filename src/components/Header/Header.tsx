import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Typography,
  CssBaseline,
  useTheme,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { getAuth, signOut } from "firebase/auth";
import { useAppDispatch } from "@hooks/useAppDispatch";
import { logoutUserProfile } from "@slice/authSlice";

interface IHeaderProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header = (props: IHeaderProps) => {
  const { open, setOpen } = props;
  const auth = getAuth();
  const dispatch = useAppDispatch();
  const theme = useTheme();

  return (
    <Box>
      <CssBaseline />
      <Box
        sx={{
          flexGrow: 1,
          [`& .MuiToolbar-root`]: {
            height: theme.mixins.appBar.height,
          },
        }}
      >
        <AppBar position="fixed" sx={{}}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => {
                setOpen(!open);
              }}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              News
            </Typography>
            <Button
              sx={{
                border: "1px solid white",
              }}
              onClick={() => {
                signOut(auth)
                  .then(() => {
                    localStorage.clear();
                    dispatch(logoutUserProfile());
                  })
                  .catch((error) => {
                    console.error(error)
                  });
              }}
            >
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </Box>
  );
};

export default Header;
