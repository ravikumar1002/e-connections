import {
  Avatar,
  ListItemAvatar,
  ListItemText,
  Typography,
  Box,
  Menu,
  IconButton,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch } from "@hooks/useAppDispatch";
import { useAppSelector } from "@hooks/useAppSelector";
import { deleteComment, editCommentInState } from "@slice/appSlice";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export const PostAllComments = (props: any) => {
  const [editComment, setEditComment] = useState(false);

  const { authUser } = useAppSelector((state) => state.user);
  const { comment } = props;
  const [editCommentPara, setEditCommentPara] = useState({ body: "" });
  const [menuAnchorComments, setMenuAnchorComments] =
    useState<HTMLElement | null>(null);
  const dispatch = useAppDispatch();

  const CommentEvent = (targetValue: string) => {
    setEditCommentPara((prev) => {
      return {
        ...prev,
        body: targetValue,
      };
    });
  };

  const handleMenuClose = () => {
    setMenuAnchorComments(null);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          width: "100%",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
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
        <IconButton onClick={(e) => setMenuAnchorComments(e.currentTarget)}>
          <MoreVertIcon />
        </IconButton>
        {comment.email === authUser.email && (
          <Menu
            open={!!menuAnchorComments}
            onClose={handleMenuClose}
            anchorEl={menuAnchorComments}
          >
            <MenuItem
              onClick={() => {
                setEditCommentPara((prev) => {
                  return {
                    ...prev,
                    body: comment?.body,
                  };
                });
                setEditComment(true);
                handleMenuClose();
              }}
            >
              Edit
            </MenuItem>
            <MenuItem
              onClick={() => {
                dispatch(deleteComment(comment.id));
                handleMenuClose();
              }}
            >
              Delete
            </MenuItem>
          </Menu>
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
