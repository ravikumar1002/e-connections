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
} from "@mui/material";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useAppSelector } from "@hooks/useAppSelector";
import { IUserData } from "@dto/user_data";
import { useAppDispatch } from "@hooks/useAppDispatch";
import { likeUserPostHandler, removedFromLiked } from "@slice/authSlice";

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
  const [expanded, setExpanded] = useState(false);
  const ref = useRef<number>(0);
  const { title, body, id, userId } = props.postData;
  const dispatch = useAppDispatch();

  const { users } = useAppSelector((state) => state.appData);
  const { likedPost, posts, authStatus } = useAppSelector(
    (state) => state.user
  );

  const [userDetails, setUserDetails] = useState<IUserData | undefined>();
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const findUserDetails = (id: number) => users.find((user) => user.id === id);

  useEffect(() => {
    const userData = findUserDetails(userId);
    setUserDetails(userData);
  }, [users]);

  const isThisPostLiked = likedPost.includes(id);

  return (
    <Card sx={{ maxWidth: 800 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {userDetails?.name.charAt(0)}
          </Avatar>
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
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum sed
            voluptatum fugiat quos nam fuga ipsum, odit, a eius laudantium
            distinctio, libero eveniet similique aliquid incidunt esse placeat
            pariatur quis?
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default UserPost;
