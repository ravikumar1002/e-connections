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
import { Link, useNavigate } from "react-router-dom";

interface IHeaderProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header = (props: IHeaderProps) => {
  const { open, setOpen } = props;
  const auth = getAuth();
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const navigate = useNavigate();

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
              sx={{
                mr: 2,
                display: {
                  xs: "none",
                  sm: "inherit",
                },
              }}
            >
              <MenuIcon />
            </IconButton>
            <Link
              to="/home"
              style={{
                textDecoration: "none",
                color: "inherit",
                flexGrow: 1,
              }}
              onClick={() => {
                window.scrollTo(0, 0);
              }}
            >
              <Typography variant="h6" noWrap component="span">
                E-connections
              </Typography>
            </Link>
            <Button
              sx={{
                border: "1px solid white",
              }}
              onClick={async () => {
                try {
                  await signOut(auth);
                  localStorage.clear();
                  dispatch(logoutUserProfile());
                  navigate("/login", {
                    replace: true,
                  });
                } catch (error) {
                  console.error(error);
                }
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
