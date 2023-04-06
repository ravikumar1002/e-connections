import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Typography,
  CssBaseline,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import MenuIcon from "@mui/icons-material/Menu";

interface IHeaderProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header = (props: IHeaderProps) => {
  const { open, setOpen } = props;

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
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </Box>
    </Box>
  );
};

export default Header;
