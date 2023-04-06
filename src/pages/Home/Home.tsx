import UserPost from "@components/Posts/Post";
import { useAppDispatch } from "@hooks/useAppDispatch";
import { useAppSelector } from "@hooks/useAppSelector";
import { useDocumentTitle } from "@hooks/useDocumentTitle";
import { logoutUserProfile } from "@slice/authSlice";
import { getAuth, signOut } from "firebase/auth";
import { useEffect } from "react";

const Home = () => {
  const dispatch = useAppDispatch();
  const auth = getAuth();
  const { posts, getPostsStatus } = useAppSelector((state) => state.appData);

  useEffect(() => {
    useDocumentTitle("Home");
  }, []);

  return (
    <div>
      <button
        color="inherit"
        onClick={() => {
          signOut(auth)
            .then(() => {
              localStorage.clear();
              dispatch(logoutUserProfile());
            })
            .catch((error) => {});
        }}
      >
        Logout
      </button>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
        }}
      >
        {getPostsStatus === "fulfilled" &&
          posts.map((post) => {
            return <UserPost postData={post} key={post.id} />;
          })}
      </div>
    </div>
  );
};

export default Home;
