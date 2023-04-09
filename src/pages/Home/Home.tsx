import { NewCreatePost } from "@components/NewPosts/NewPost";
import UserPost from "@components/Posts/Post";
import { useAppSelector } from "@hooks/useAppSelector";
import { useDocumentTitle } from "@hooks/useDocumentTitle";
import { useEffect } from "react";

const Home = () => {
  const { posts, getPostsStatus, indexedUsers, getUsersStatus } =
    useAppSelector((state) => state.appData);

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
        {getPostsStatus === "fulfilled" &&
          getUsersStatus === "fulfilled" &&
          posts?.slice(0,10).map((post) => {
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
