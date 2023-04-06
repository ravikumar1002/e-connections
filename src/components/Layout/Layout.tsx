import { AsidebarNav } from "@components/AsideBar/AsideBar";
import Header from "@components/Header/Header";
import { useTheme } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  return (
    <Box>
      <Header open={open} setOpen={setOpen} />
      <Box
        sx={{
          marginTop: `${theme.mixins.appBar.height}px`,
        }}
      >
        <AsidebarNav open={open} setOpen={setOpen} />
        <Box
          sx={{
            marginLeft: open
              ? {
                  sm: `${theme.mixins.drawerWidth.expanded.sm + 3}px`,
                  xs: `${theme.mixins.drawerWidth.expanded.xs + 3}px`,
                }
              : {
                  sm: `${theme.mixins.drawerWidth.collapsed.sm + 3}px`,
                  xs: `${theme.mixins.drawerWidth.collapsed.xs + 3}px`,
                },
            minHeight: `calc(100vh - ${theme.mixins.appBar.height}px)`,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
