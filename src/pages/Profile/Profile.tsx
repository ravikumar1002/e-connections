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
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { getUserDataThunk } from "@thunk/userDataThunk";

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
  }, []);

  useEffect(() => {
    setUserCreatedPost([...createdPosts].reverse());
    setUserInformations({ ...authUserData });
  }, [createdPosts, authUser, authUserData, auth]);

  const updateUserData = async (data: Partial<IAuthUserData>) => {
    console.log(data);
    await updateDoc(
      doc(
        db,
        `${auth?.currentUser?.providerData[0].uid}`,
        "Personal-informations"
      ),
      { ...data }
    );
    await dispatch(getUserDataThunk(auth?.currentUser?.providerData[0].uid));
  };

  return (
    <div
      style={{
        width: "800px",
        padding: "3rem",
      }}
    >
      <div>
        <ProfileCard
          dp="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.flaticon.com%2Ffree-icon%2Fprofile_3135715&psig=AOvVaw2lvhMCjGwS_h4IqPMLZs63&ust=1681129678851000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCNi9g53mnP4CFQAAAAAdAAAAABAE"
          dpAlt={authUserData.name}
          name={authUserData.name}
          username={authUserData.username}
        />
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
                  phone: authUserData.phone ?? "",
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
        <Typography variant="h6" component="h2" textAlign={"center"}>
          Update Data
        </Typography>
        <TextField
          required
          id="outlined-required"
          label="User Name"
          defaultValue={userInformations?.username}
          onChange={(e) => {
            setUserInformations((data) => {
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
            setUserInformations((data) => {
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
          label="Phone Number"
          defaultValue={userInformations?.phone}
          onChange={(e) => {
            setUserInformations((data) => {
              return {
                ...data,
                phone: e.target?.value,
              };
            });
          }}
        />
        <TextField
          required
          label="website"
          defaultValue={userInformations?.website}
          onChange={(e) => {
            setUserInformations((data) => {
              return {
                ...data,
                website: e.target?.value,
              };
            });
          }}
        />
        <TextField
          required
          label="bio"
          multiline
          rows={4}
          defaultValue={userInformations?.bio}
          onChange={(e) => {
            setUserInformations((data) => {
              return {
                ...data,
                bio: e.target?.value,
              };
            });
          }}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button
            onClick={async () => {
              setUserInformations({ ...authUserData });
              dispatch(changeProfileModalState(false));
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={async () => {
              await updateUserData(userInformations);
              dispatch(changeProfileModalState(false));
            }}
          >
            Update
          </Button>
        </Box>
      </ModalBox>
    </div>
  );
};

export default Profile;
