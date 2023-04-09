import { SvgIconProps } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import PersonIcon from "@mui/icons-material/Person";

interface INavigationItem {
  id: number;
  path: string;
  title: string;
  icon: (props: SvgIconProps) => JSX.Element;
  activeIcon: (props: SvgIconProps) => JSX.Element;
}

export const navigationLinks: INavigationItem[] = [
  {
    id: 1,
    path: "/home",
    title: "Home",
    icon: (props) => <HomeOutlinedIcon {...props} />,
    activeIcon: (props) => <HomeIcon {...props} />,
  },
  {
    id: 2,
    path: "/profile",
    title: "Profile",
    icon: () => <PermIdentityIcon />,
    activeIcon: () => <PersonIcon />,
  },
];
