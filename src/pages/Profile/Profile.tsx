import { ProfileCard } from "@components/ProfileCard.tsx/ProfileCard";
import { useDocumentTitle } from "@hooks/useDocumentTitle";
import { useEffect, useState } from "react";

import { Box, Tabs, Tab } from "@mui/material";
import { PersonalDetails } from "./PersonalDetails";
import UserPost from "@components/Posts/Post";
import { getUserPostsThunk } from "@thunk/postThunk";
import { useAppSelector } from "@hooks/useAppSelector";
import { IUserPosts } from "@dto/posts";
import { useAppDispatch } from "@hooks/useAppDispatch";

const Profile = () => {
  const [value, setValue] = useState(0);
  const { posts } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const [userCreatedPost, setUserCreatedPost] = useState<IUserPosts | []>([]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    useDocumentTitle("Profile");
    dispatch(getUserPostsThunk());
    setUserCreatedPost(posts);
  }, []);

  useEffect(() => {
    setUserCreatedPost(posts);
  }, [posts]);

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
      <Box>
        {value === 0 &&
          userCreatedPost &&
          userCreatedPost.map((post) => {
            return <UserPost postData={post} />;
          })}
      </Box>
    </div>
  );
};

export default Profile;
