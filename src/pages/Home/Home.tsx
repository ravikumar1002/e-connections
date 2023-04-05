import { useAppDispatch } from "@hooks/useAppDispatch";
import { logoutUserProfile } from "@slice/authSlice";
import { getAuth, signOut } from "firebase/auth";

const Home = () => {
  const dispatch = useAppDispatch();
  const auth = getAuth();

    return (
        <div>
          <h2>Home</h2>
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
        </div>
    );
};

export default Home;