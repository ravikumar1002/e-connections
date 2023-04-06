import { ProfileCard } from "@components/ProfileCard.tsx/ProfileCard";
import { useDocumentTitle } from "@hooks/useDocumentTitle";
import { useEffect, useState } from "react";

import { Box, Tabs, Tab } from "@mui/material";
import { PersonalDetails } from "./PersonalDetails";

const Profile = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    useDocumentTitle("Profile");
  }, []);

  return (
    <div
      style={{
        width: "800px",
        padding: "3rem",
      }}
    >
      <div>
        <ProfileCard />
      </div>
      <Box sx={{ width: "100%", margin: " 1rem 0 1rem 0" }}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Posts" />
          <Tab label="Persnal Details" />
        </Tabs>
      </Box>
      <Box>{value === 1 && <PersonalDetails />}</Box>
    </div>
  );
};

export default Profile;
