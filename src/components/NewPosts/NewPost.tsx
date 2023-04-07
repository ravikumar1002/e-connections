import { useState } from "react";
import Box from "@mui/material/Box";
import { Avatar, Button, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import { useAppSelector } from "@hooks/useAppSelector";
import { blue } from "@mui/material/colors";

const Item = (props) => {
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

export const NewCreatePost = () => {
  const updatePost = false;
  const updateData = {
    title: "",
    body: "",
  };

  const [inputValue, setInputValue] = useState(
    updatePost ? { ...updateData } : { title: "", body: "" }
  );

  const { posts, authUser, authUserData } = useAppSelector(
    (state) => state.user
  );

  const handleTitleChange = (e) => {
    if (e.target.value.length <= 80) {
      setInputValue((prev) => {
        return {
          ...prev,
          title: e.target.value,
        };
      });
    }
  };

  const handleBodyChange = (e) => {
    if (e.target.value.length <= 360) {
      setInputValue((prev) => {
        return {
          ...prev,
          body: e.target.value,
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
              id="standard-basic"
              label="Heading"
              variant="standard"
              sx={{ marginBottom: "1rem" }}
              fullWidth
              value={inputValue.title}
              onChange={handleTitleChange}
            />
            <TextField
              id="outlined-multiline-flexible"
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
              color: inputValue.body.length >= 360 - 5 ? "red" : "inherit",
            }}
            variant="caption"
          >
            {inputValue.body.length}/360 characters
          </Typography>
          <Button variant="contained" onClick={() => {}}>
            Post
          </Button>
        </div>
      </Box>
    </div>
  );
};
