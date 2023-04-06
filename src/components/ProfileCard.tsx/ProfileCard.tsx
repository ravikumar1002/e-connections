import { Box, Typography } from "@mui/material";
import { ProfileAbout } from "./ProfileAbout";
import { ProfileImage } from "./ProfileImage";

export const ProfileCard = () => {
  const ProfileData = {
    dp: "/static/images/avatar/1.jpg",
  };
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
      }}
    >
      <div
        style={{
          width: "35%",
          display: "flex",
          justifyContent: "center",
        //   background: "red",
        }}
      >
        <ProfileImage profileImageData={ProfileData} />
      </div>
      <div
        style={{
          width: "65%",
        //   border: "2px solid black",
        }}
      >
        <ProfileAbout />
      </div>
    </div>
  );
};
