import { useAppDispatch } from "@hooks/useAppDispatch";
import { useAppSelector } from "@hooks/useAppSelector";
import {
  Box,
  Button,
  Divider,
  Input,
  TextField,
  Typography,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { commentOnPost } from "@slice/appSlice";
import { useState } from "react";

const TextFieldWithoutUnderLine = styled(TextField)(() => ({
  "&&&:before": {
    borderBottom: "none",
  },
  "&&:after": {
    borderBottom: "none",
  },
}));

interface ICommentProps {
  postID: number;
}

export const CrateComments = (props: ICommentProps) => {
  const dispatch = useAppDispatch();
  const { authUserData, authUser } = useAppSelector((state) => state.user);
  const { comments } = useAppSelector((state) => state.appData);
  const { postID } = props;
  const [commentPara, setCommentPara] = useState({ body: "" });

  const CommentEvent = (targetValue: string) => {
    setCommentPara((prev) => {
      return {
        ...prev,
        body: targetValue,
      };
    });
  };

  const postComments = (commentData: object) => {
    dispatch(
      commentOnPost({
        id: comments.length - 1,
        postId: postID,
        name: authUserData.name,
        body: commentPara.body,
        email: authUser.email,
      })
    );
    setCommentPara({
      body: "",
    });
  };

  return (
    <Box>
      <Divider />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          padding: "0 0.5rem",
        }}
      >
        <Typography variant="h6" gutterBottom component="span">
          😂
        </Typography>
        <TextFieldWithoutUnderLine
          placeholder="Add a Comment..."
          fullWidth
          value={commentPara.body}
          multiline
          variant="standard"
          onChange={(e) => {
            CommentEvent(e.target.value);
          }}
        />

        <Button
          variant="text"
          disabled={commentPara.body.length <= 0}
          onClick={() => {
            postComments(commentPara);
          }}
        >
          Post
        </Button>
      </div>
    </Box>
  );
};
