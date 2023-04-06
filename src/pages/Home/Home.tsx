import { useAppDispatch } from "@hooks/useAppDispatch";
import { useDocumentTitle } from "@hooks/useDocumentTitle";
import { logoutUserProfile } from "@slice/authSlice";
import { getAuth, signOut } from "firebase/auth";
import { useEffect } from "react";

const Home = () => {
  const dispatch = useAppDispatch();
  const auth = getAuth();

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
      <div>

      </div>
      
    </div>
  );
};

export default Home;
