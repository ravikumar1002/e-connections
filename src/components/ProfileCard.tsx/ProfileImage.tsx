import { Avatar } from "@mui/material";

interface IProfileImageData {
  dp: string;
}

interface IProfileImageProps {
  profileImageData: IProfileImageData;
}

export const ProfileImage = (props: IProfileImageProps) => {
  const { dp } = props.profileImageData;
  return (
    <div>
      <Avatar alt="Remy Sharp" src={dp}  sx={{ width: 96, height: 96 }}/>
    </div>
  );
};
