import { Avatar } from "@mui/material";

interface IProfileImageProps {
  dp?: string;
  dpAlt?: string;
}

export const ProfileImage = (props: IProfileImageProps) => {
  const { dp, dpAlt } = props;
  return (
    <div>
      <Avatar
        alt={dpAlt?.toUpperCase()}
        src={dp}
        sx={{ width: 96, height: 96, fontSize: "1.5rem" }}
      />
    </div>
  );
};
