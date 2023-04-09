import { useEffect, useRef, useState } from "react";
import { styled } from "@mui/material/styles";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Collapse,
  Avatar,
  Typography,
  MenuItem,
} from "@mui/material";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useAppSelector } from "@hooks/useAppSelector";
import { IUserData } from "@dto/user_data";
import { useAppDispatch } from "@hooks/useAppDispatch";
import {
  deleteUserPost,
  likeUserPostHandler,
  removedFromLiked,
} from "@slice/authSlice";
import { CrateComments } from "./CreateComments";
import { PostAllomments } from "./Postcomments";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { PostMenu } from "./PostMenu";
import { IComments } from "@dto/posts";
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
}

const UserPost = (props: IuserPost) => {
  const { title, body, id, userId } = props.postData;
  const dispatch = useAppDispatch();

  const { users, comments } = useAppSelector((state) => state.appData);
  const { likedPost } = useAppSelector((state) => state.user);

  const [expanded, setExpanded] = useState(false);
  const [commentsOnSinglePost, setCommentsOnSinglePost] = useState<IComments>(
    []
  );
  const [userDetails, setUserDetails] = useState<IUserData | undefined>();
  const [editPost, setEditPost] = useState(false);
  const [open, setOpen] = useState(false);

  const anchorRef = useRef<HTMLButtonElement | null>(null);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const findUserDetails = (id: number) => users.find((user) => user.id === id);

  const handleClose = (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    if (anchorRef.current && anchorRef.current.contains(event.currentTarget)) {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    const userData = findUserDetails(userId);
    setUserDetails(userData);
  }, [users]);

  useEffect(() => {
    const filterCommentsOnPost = comments.filter(
      (comment) => comment.postId === id
    );
    setCommentsOnSinglePost(filterCommentsOnPost);
  }, [comments]);

  const isThisPostLiked = likedPost.includes(id);

  return (
    <Card sx={{ maxWidth: 800 }}>
      {editPost ? (
        <NewCreatePost
          updatePost={editPost}
          setUpdatePost={setEditPost}
          updateData={{
            title: title,
            body: body,
            id: id,
            userId: 11,
          }}
        />
      ) : (
        <>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                {userDetails?.name.charAt(0)}
              </Avatar>
            }
            action={
              <PostMenu
                handleClose={handleClose}
                open={open}
                setOpen={setOpen}
                anchorRef={anchorRef}
              >
                <MenuItem
                  onClick={(e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
                    setEditPost(true);
                    handleClose(e);
                  }}
                >
                  Edit
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    dispatch(deleteUserPost(id));
                  }}
                >
                  Delete
                </MenuItem>
              </PostMenu>
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
                return <PostAllomments comment={comment} key={comment.id} />;
              })}
            </CardContent>
          </Collapse>
        </>
      )}
    </Card>
  );
};

export default UserPost;
