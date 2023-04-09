import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  Typography,
  MenuItem,
  Menu,
  Collapse,
} from "@mui/material";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import { red } from "@mui/material/colors";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useAppSelector } from "@hooks/useAppSelector";
import { IUserData } from "@dto/user_data";
import { useAppDispatch } from "@hooks/useAppDispatch";
import {
  deleteUserPost,
  likeUserPostHandler,
  removedFromLiked,
} from "@slice/authSlice";
import { CrateComments } from "./CreateComments";
import { PostAllComments } from "./Postcomments";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IComment } from "@dto/posts";
import { NewCreatePost } from "@components/NewPosts/NewPost";
interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

interface IUserPostDetails {
  title: string;
  body: string;
  id: number;
  userId: number;
}

interface IuserPost {
  postData: IUserPostDetails;
  userInfo: IUserData;
}

const UserPost = (props: IuserPost) => {
  const {
    postData: { title, body, id },
    userInfo: userDetails,
  } = props;

  const dispatch = useAppDispatch();

  const { users, comments } = useAppSelector((state) => state.appData);
  const { likedPost, authUserData } = useAppSelector((state) => state.user);

  const [expanded, setExpanded] = useState(false);
  const [commentsOnSinglePost, setCommentsOnSinglePost] = useState<IComment[]>(
    []
  );
  const [editPost, setEditPost] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  useEffect(() => {
    const filterCommentsOnPost = comments.filter(
      (comment) => comment.postId === id
    );
    setCommentsOnSinglePost(filterCommentsOnPost);
  }, [comments]);

  const isThisPostLiked = likedPost.includes(id);

  return (
    <Card sx={{ maxWidth: 800, height: 400 }}>
      {editPost ? (
        <NewCreatePost
          setUpdatePost={setEditPost}
          updateData={{
            title,
            body,
            id,
            userId: 11,
          }}
        />
      ) : (
        <>
          <CardHeader
            avatar={
              <Avatar
                sx={{ bgcolor: red[500] }}
                aria-label={authUserData?.name?.charAt(0)?.toUpperCase()}
              >
                {userDetails?.name?.charAt(0)}
              </Avatar>
            }
            action={
              userDetails.id === 11 ? (
                <IconButton onClick={(e) => setMenuAnchor(e.currentTarget)}>
                  <MoreVertIcon />
                </IconButton>
              ) : null
            }
            title={userDetails?.name}
            subheader="September 14, 2016"
          />
          <CardContent>
            <Typography variant="h6" color="text.primary" gutterBottom>
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {body}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton
              aria-label="add to favorites"
              sx={{
                color: isThisPostLiked ? "red" : "unset",
              }}
              onClick={() => {
                if (isThisPostLiked) {
                  dispatch(removedFromLiked(id));
                  return;
                }
                dispatch(likeUserPostHandler(id));
              }}
            >
              <FavoriteIcon />
            </IconButton>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
          <CrateComments postID={id} />
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent
              sx={{
                maxHeight: "300px",
                overflow: "scroll",
              }}
            >
              {commentsOnSinglePost.map((comment) => {
                return <PostAllComments comment={comment} key={comment.id} />;
              })}
            </CardContent>
          </Collapse>
        </>
      )}
      <Menu open={!!menuAnchor} onClose={handleMenuClose} anchorEl={menuAnchor}>
        <MenuItem
          onClick={() => {
            setEditPost(true);
            handleMenuClose();
          }}
        >
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            dispatch(deleteUserPost(id));
            handleMenuClose();
          }}
        >
          Delete
        </MenuItem>
      </Menu>
    </Card>
  );
};

export default UserPost;
