import {
  Avatar,
  ListItemAvatar,
  ListItemText,
  Typography,
  Box,
  Menu,
  IconButton,
  Divider,
  TextField,
  Button,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch } from "@hooks/useAppDispatch";
import { useAppSelector } from "@hooks/useAppSelector";
import { deleteComment, editCommentInState } from "@slice/appSlice";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { blue } from "@mui/material/colors";

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
    <div
      style={{
        margin: "0.5rem",
      }}
    >
      <Divider />
      <div
        style={{
          display: "flex",
          width: "100%",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <Avatar
            sx={{ bgcolor: blue[500], marginRight: "1.5rem" }}
            aria-label={comment?.name?.charAt(0)?.toUpperCase()}
          >
            {comment?.name?.charAt(0)?.toUpperCase()}
          </Avatar>
          <ListItemText
            primary={comment?.name}
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
          <IconButton onClick={(e) => setMenuAnchorComments(e.currentTarget)}>
            <MoreVertIcon />
          </IconButton>
        )}
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap:"1rem",
            }}
          >
            <TextField
              id="outlined-basic"
              value={editCommentPara?.body}
              variant="outlined"
              onChange={(e) => {
                CommentEvent(e.target.value);
              }}
              sx={{ flexGrow: 1 }}
            />
            <Button
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
            </Button>
          </Box>
        ) : (
          <Typography component="p" variant="body2" color="text.primary">
            {comment?.body}
          </Typography>
        )}
      </div>
    </div>
  );
};
