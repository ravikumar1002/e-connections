import { NewCreatePost } from "@components/NewPosts/NewPost";
import UserPost from "@components/Posts/Post";
import { useAppSelector } from "@hooks/useAppSelector";
import { useDocumentTitle } from "@hooks/useDocumentTitle";
import { useEffect } from "react";

const Home = () => {
  const { posts, getPostsStatus, indexedUsers, getUsersStatus } =
    useAppSelector((state) => state.appData);

  const { createdPosts, authUserData, authUser } = useAppSelector(
    (state) => state.user
  );

  useEffect(() => {
    useDocumentTitle("Home");
  }, []);

  return (
    <div>
      <div
        style={{
          margin: "1rem 0 1rem 0",
        }}
      >
        <NewCreatePost />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
        }}
      >
        {createdPosts &&
          createdPosts?.map((post) => {
            return (
              <UserPost
                userInfo={{
                  id: 11,
                  name: authUserData.name,
                  username: authUserData.username,
                  email: authUser.email,
                  phone: authUserData.phone,
                  website: authUserData.website,
                }}
                postData={post}
                key={post.id}
              />
            );
          })}
        {getPostsStatus === "fulfilled" &&
          getUsersStatus === "fulfilled" &&
          posts?.slice(0, 10).map((post) => {
            return (
              <UserPost
                userInfo={indexedUsers[post.userId]}
                postData={post}
                key={post.id}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Home;
