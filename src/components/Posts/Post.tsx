import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { TitleOutlined } from "@mui/icons-material";
import { useAppSelector } from "@hooks/useAppSelector";
import { IUserData } from "@dto/user_data";

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
  const { title, body, id, userId } = props.postData;
  
  const { users, getUsersStatus } = useAppSelector((state) => state.appData);
  const [userDetails, setUserDetails] = useState<IUserData | undefined>();
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const findUserDetails = (id: number) => users.find((user) => user.id === id);

  useEffect(() => {
    const userData = findUserDetails(userId);
    setUserDetails(userData);
  }, [users]);

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
        <IconButton aria-label="add to favorites">
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
