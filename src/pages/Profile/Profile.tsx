import { ProfileCard } from "@components/ProfileCard.tsx/ProfileCard";
import { useDocumentTitle } from "@hooks/useDocumentTitle";
import { useEffect, useState } from "react";

import { Box, Tabs, Tab, TextField } from "@mui/material";
import { PersonalDetails } from "./PersonalDetails";
import UserPost from "@components/Posts/Post";
import { useAppSelector } from "@hooks/useAppSelector";
import { IUserPost } from "@dto/posts";
import { useAppDispatch } from "@hooks/useAppDispatch";
import { ModalBox } from "@components/Modal/Modal";
import { changeProfileModalState } from "@slice/appSlice";
import { getAuth } from "firebase/auth";
import { IAuthUserData } from "@slice/authSlice";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "App";

const Profile = () => {
  const [value, setValue] = useState(0);
  const { createdPosts, authUser, authUserData } = useAppSelector(
    (state) => state.user
  );

  const [userInformations, setUserInformations] = useState<IAuthUserData>({
    ...authUserData,
  });

  const [updateData, setUpdateData] = useState<Partial<IAuthUserData>>({});
  const { profileModalOpen } = useAppSelector((state) => state.appData);
  const auth = getAuth();
  const dispatch = useAppDispatch();

  const [userCreatedPost, setUserCreatedPost] = useState<IUserPost[]>([]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    useDocumentTitle("Profile");
    setUserCreatedPost(createdPosts);
  }, []);

  useEffect(() => {
    setUserCreatedPost([...createdPosts].reverse());
    setUserInformations({ ...authUserData });
  }, [createdPosts, authUser, authUserData, auth]);

  const updateUserData = async (data: Partial<IAuthUserData>) => {
    await updateDoc(
      doc(
        db,
        `${auth?.currentUser?.providerData[0].uid}`,
        "Personal-informations"
      ),
      { ...data }
    );
  };

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
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
        }}
      >
        {value === 0 &&
          userCreatedPost &&
          userCreatedPost.map((post) => {
            return (
              <UserPost
                userInfo={{
                  email: authUser.email,
                  id: 11,
                  name: authUserData.name,
                  phone: authUserData.phoneNumber ?? "",
                  username: authUserData.username,
                  website: authUserData.website,
                }}
                postData={post}
                key={post.id}
              />
            );
          })}
      </Box>
      <ModalBox>
        <TextField
          required
          id="outlined-required"
          label="User Name"
          defaultValue={userInformations?.username}
          onChange={(e) => {
            setUpdateData((data) => {
              return {
                ...data,
                username: e.target?.value,
              };
            });
          }}
        />
        <TextField
          required
          id="outlined-required"
          label="Name"
          defaultValue={userInformations?.name}
          onChange={(e) => {
            setUpdateData((data) => {
              return {
                ...data,
                name: e.target?.value,
              };
            });
          }}
        />
        <TextField
          required
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          id="outlined-required"
          label="Phone Number"
          defaultValue={userInformations?.phoneNumber}
          onChange={(e) => {
            setUpdateData((data) => {
              return {
                ...data,
                phoneNumber: e.target?.value,
              };
            });
          }}
        />
        <TextField
          required
          id="outlined-required"
          label="website"
          defaultValue={userInformations?.website}
          onChange={(e) => {
            setUpdateData((data) => {
              return {
                ...data,
                website: e.target?.value,
              };
            });
          }}
        />
        <TextField
          required
          id="outlined-required"
          label="bio"
          defaultValue={userInformations?.bio}
          onChange={(e) => {
            setUpdateData((data) => {
              return {
                ...data,
                bio: e.target?.value,
              };
            });
          }}
        />
        <button
          onClick={async () => {
            await updateUserData(updateData);
            dispatch(changeProfileModalState(false));
          }}
        >
          Update
        </button>
      </ModalBox>
    </div>
  );
};

export default Profile;
