import {
  Avatar,
  ListItemAvatar,
  ListItemText,
  Typography,
  Box,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch } from "@hooks/useAppDispatch";
import { PostMenu } from "./PostMenu";
import { useAppSelector } from "@hooks/useAppSelector";
import { deleteComment, editCommentInState } from "@slice/appSlice";

export const PostAllomments = (props: any) => {
  const [editComment, setEditComment] = useState(false);
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const { authUser } = useAppSelector((state) => state.user);
  const { comment } = props;
  const [editCommentPara, setEditCommentPara] = useState({ body: "" });

  const dispatch = useAppDispatch();

  const CommentEvent = (targetValue: string) => {
    setEditCommentPara((prev) => {
      return {
        ...prev,
        body: targetValue,
      };
    });
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  return (
    <div>
      <div style={{ display: "flex", width: "100%", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <ListItemAvatar>
            <Avatar alt={comment.id} />
          </ListItemAvatar>
          <ListItemText
            primary={comment.name}
            secondary={
              <>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="caption"
                  color="text.primary"
                >
                  {comment.email}
                </Typography>
              </>
            }
          />
        </div>
        {comment.email === authUser.email && (
          <PostMenu
            handleClose={handleClose}
            open={open}
            setOpen={setOpen}
            anchorRef={anchorRef}
          >
            <MenuItem
              onClick={(e) => {
                setEditCommentPara((prev) => {
                  return {
                    ...prev,
                    body: comment?.body,
                  };
                });
                setEditComment(true);
                handleClose(e);
              }}
            >
              Edit
            </MenuItem>
            <MenuItem
              onClick={() => {
                dispatch(deleteComment(comment.id));
              }}
            >
              Delete
            </MenuItem>
          </PostMenu>
        )}
      </div>
      <div>
        {editComment ? (
          <div>
            <input
              type="text"
              value={editCommentPara?.body}
              onChange={(e) => {
                CommentEvent(e.target.value);
              }}
            />
            <button
              onClick={() => {
                dispatch(
                  editCommentInState({
                    id: comment.id,
                    body: editCommentPara.body,
                  })
                );
                setEditCommentPara({
                  body: "",
                });
                setEditComment(false);
              }}
            >
              Edit
            </button>
          </div>
        ) : (
          <Typography component="p" variant="body2" color="text.primary">
            {comment?.body}
          </Typography>
        )}
      </div>
    </div>
  );
};
