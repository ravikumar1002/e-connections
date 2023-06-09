import {
  Box,
  List,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Drawer,
  useTheme,
  drawerClasses,
} from "@mui/material";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import "./asidebar.css";
import { navigationLinks } from "./navigationsLinks";
interface ISideNavDrawerProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AsidebarNav = (props: ISideNavDrawerProps) => {
  const { open, setOpen } = props;
  const location = useLocation();
  const theme = useTheme();

  const activeStyle = {
    color: "black",
    background: "#808085",
    textDecoration: "none",
    display: "block",
  };

  const inactiveStyle = {
    color: "black",
    textDecoration: "none",
    display: "block",
  };

  const getActiveStyle = ({ isActive }: { isActive: boolean }) =>
    isActive ? activeStyle : inactiveStyle;

  return (
    <Box>
      <Drawer
        variant="permanent"
        className="responsive-bar-list"
        open={false}
        sx={{
          [`& .${drawerClasses.paper}`]: {
            width: open
              ? {
                  sm: theme.mixins.drawerWidth.expanded.sm,
                  xs: theme.mixins.drawerWidth.expanded.xs,
                }
              : {
                  sm: theme.mixins.drawerWidth.collapsed.sm,
                  xs: theme.mixins.drawerWidth.collapsed.xs,
                },
            top: theme.mixins.appBar.height,
          },
        }}
      >
        <Divider />
        <List className="align-aside-ul">
          {navigationLinks.map((item) => {
            return (
              <ListItem key={item.id} disablePadding sx={{ display: "block" }}>
                <NavLink
                  style={getActiveStyle}
                  to={item.path}
                  title={item.title}
                >
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      flexDirection: open ? "initial" : "column",
                      px: 2.5,
                      "& .MuiListItemIcon-root": {
                        marginRight: "inherit",
                      },
                      gap: open ? "1rem" : "",
                      padding: {
                        xs: "8px",
                        sm: "1rem 0rem",
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      {location.pathname.includes(item.path) ? (
                        <item.activeIcon />
                      ) : (
                        <item.icon />
                      )}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.title}
                      sx={{
                        "& .MuiTypography-root": {
                          fontSize: open ? "1rem" : "0.7rem",
                          width: open ? "auto" : "4rem",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: open ? "clip" : "ellipsis",
                          textAlign: open ? "left" : "center",
                        },
                      }}
                    />
                  </ListItemButton>
                </NavLink>
              </ListItem>
            );
          })}
        </List>
      </Drawer>
    </Box>
  );
};
