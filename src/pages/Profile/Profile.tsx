import { ProfileCard } from "@components/ProfileCard.tsx/ProfileCard";
import { useDocumentTitle } from "@hooks/useDocumentTitle";
import { useEffect, useState } from "react";

import { Box, Tabs, Tab, TextField } from "@mui/material";
import { PersonalDetails } from "./PersonalDetails";
import UserPost from "@components/Posts/Post";
import { getUserPostsThunk } from "@thunk/postThunk";
import { useAppSelector } from "@hooks/useAppSelector";
import { IUserPosts } from "@dto/posts";
import { useAppDispatch } from "@hooks/useAppDispatch";
import { ModalBox } from "@components/Modal/Modal";
import { changeProfileModalState } from "@slice/appSlice";
import { getAuth } from "firebase/auth";
import { IUserData } from "@dto/user_data";
import { IAuthUser, IAuthUserData } from "@slice/authSlice";
import { useFirebaseStoreDataUpdate } from "@hooks/useFirebaseStoreData";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "App";

type IUpdateUserData = {};

const Profile = () => {
  const [value, setValue] = useState(0);
  const { posts, authUser, authUserData } = useAppSelector(
    (state) => state.user
  );

  const [userInformations, setUserInformations] = useState<IAuthUserData>({
    ...authUser,
  });

  const [updateData, setUpdateData] = useState<IUpdateUserData>();
  const { profileModalOpen } = useAppSelector((state) => state.appData);
  const auth = getAuth();
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
    setUserInformations({ ...authUserData });
  }, [posts, authUser, authUserData, auth]);

  const updateUserData = async (data) => {
    console.log(data)
    await updateDoc(
      doc(
        db,
        `${auth?.currentUser.providerData[0].uid}`,
        "Personal-informations"
      ),{...data}
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
      <Box>
        {value === 0 &&
          userCreatedPost &&
          userCreatedPost.map((post) => {
            return <UserPost postData={post} key={post.id} />;
          })}
      </Box>
      <ModalBox>
        <TextField
          required
          id="outlined-required"
          label="User Name"
          defaultValue={userInformations?.userName}
          onChange={(e) => {
            setUpdateData((data) => {
              return {
                ...data,
                userName: e.target?.value,
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
            console.log(updateData, "userInformations")
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
