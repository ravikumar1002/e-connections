import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Avatar, Button, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useAppSelector } from "@hooks/useAppSelector";
import { blue } from "@mui/material/colors";
import { createPostsThunk } from "@thunk/postThunk";
import { useAppDispatch } from "@hooks/useAppDispatch";
import { LoadingButton } from "@mui/lab";
import { updateUserPost } from "@slice/authSlice";
import { CreateNewPostData } from "@dto/posts";

const Item = (props: any) => {
  const { sx, ...other } = props;
  return (
    <Box
      xs={{ width: "90%" }}
      sx={{
        p: 1,
        m: 1,
        color: (theme) =>
          theme.palette.mode === "dark" ? "grey.300" : "grey.800",
        borderRadius: 2,
        fontSize: "0.875rem",
        fontWeight: "700",
        ...sx,
      }}
      {...other}
    />
  );
};

interface INewCreatePost {
  setUpdatePost?: Dispatch<SetStateAction<boolean>>;
  updateData?: CreateNewPostData;
}

export const NewCreatePost = (props: INewCreatePost) => {
  const { updateData, setUpdatePost } = props;

  const dispatch = useAppDispatch();

  const [inputValue, setInputValue] = useState<CreateNewPostData>({
    title: "",
    body: "",
    userId: 11,
  });

  const { authUserData, createPostStatus } = useAppSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (updateData) {
      setInputValue({ ...updateData });
    }
  }, [updateData]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 80) {
      setInputValue((prev) => {
        return {
          ...prev,
          title: e.target.value,
        };
      });
    }
  };

  const handleBodyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value.length <= 360) {
      setInputValue((prev) => {
        return {
          ...prev,
          body: value,
        };
      });
    }
  };

  return (
    <div style={{ width: "100%" }}>
      <Box
        sx={{
          p: 1,
          bgcolor: "background.paper",
          borderRadius: 1,
          boxShadow:
            "0px 2px 1px -1px rgb(33 33 33 / 47%), 0px 1px 1px 0px rgb(10 7 7 / 14%), 0px 1px 3px 0px rgba(0,0,0,0.12)",
        }}
      >
        <div style={{ display: "flex", width: "100%" }}>
          <Item>
            <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe">
              {authUserData?.name.charAt(0).toUpperCase()}
            </Avatar>
          </Item>
          <Item sx={{ flexGrow: 1 }}>
            <TextField
              label="Heading"
              variant="standard"
              sx={{ marginBottom: "1rem" }}
              fullWidth
              value={inputValue.title}
              onChange={handleTitleChange}
            />
            <TextField
              placeholder="Write something"
              multiline
              fullWidth
              value={inputValue.body}
              onChange={handleBodyChange}
              minRows={2}
              maxRows={8}
            />
          </Item>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "end",
            padding: "0 1rem",
          }}
        >
          <Typography
            sx={{
              margin: "0 2rem",
              color: `${
                inputValue?.body?.length >= 360 - 5 ? "red" : "inherit"
              }`,
            }}
            variant="caption"
          >
            {inputValue?.body?.length}/360 characters
          </Typography>
          {updateData ? (
            <Box>
              <Button
                variant="outlined"
                onClick={() => {
                  setUpdatePost && setUpdatePost(false);
                }}
              >
                Cancel
              </Button>
              <LoadingButton
                variant="contained"
                onClick={async () => {
                  await dispatch(updateUserPost(inputValue));
                  setUpdatePost && setUpdatePost(false);
                }}
              >
                Update
              </LoadingButton>
            </Box>
          ) : (
            <LoadingButton
              loading={createPostStatus === "pending"}
              variant="contained"
              onClick={async () => {
                await dispatch(createPostsThunk(inputValue));
                setInputValue({ title: "", body: "", userId: 11 });
              }}
            >
              Post
            </LoadingButton>
          )}
        </div>
      </Box>
    </div>
  );
};
