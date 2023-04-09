import { useAppSelector } from "@hooks/useAppSelector";
import { Box, Typography } from "@mui/material";
import { ProfileAbout } from "./ProfileAbout";
import { ProfileImage } from "./ProfileImage";

interface IProfileCardData {
  dp: string;
  dpAlt: string;
  name: string;
  username: string;
}

export const ProfileCard = (props: IProfileCardData) => {
  const { dp, dpAlt, name, username } = props;
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
      }}
    >
      <div
        style={{
          width: "20%",
          display: "flex",
          justifyContent: "center",
          //   background: "red",
        }}
      >
        <ProfileImage dp={dp} dpAlt={dpAlt} />
      </div>
      <div
        style={{
          width: "80%",
          //   border: "2px solid black",
        }}
      >
        <ProfileAbout  name={name} username= {username}/>
      </div>
    </div>
  );
};
