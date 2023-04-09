import Core from "@components/Core/Core";
import Layout from "@components/Layout/Layout";
import firebaseConfigs from "@config/firebase";
import { useAppDispatch } from "@hooks/useAppDispatch";
import RouteNotFound from "@pages/ErrorPage/RouteNotFound";
import Home from "@pages/Home/Home";
import Login from "@pages/Login/Login";
import Profile from "@pages/Profile/Profile";
import Signup from "@pages/Signup/Signup";
import ProtectedRoutes from "@routes/ProtectedRoutes";
import { addUserData } from "@slice/authSlice";
import { getAllPostsCommentsThunk, getPostsThunk } from "@thunk/postThunk";
import { getUsersThunk } from "@thunk/userThunk";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { doc, getFirestore, setDoc } from "firebase/firestore";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import { getUserDataThunk } from "@thunk/userDataThunk";

const firebaseApp = initializeApp(firebaseConfigs);
export const db = getFirestore(firebaseApp);

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Core />}>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route
          element={
            <ProtectedRoutes>
              <Layout />
            </ProtectedRoutes>
          }
        >
          <Route path="home" element={<Home />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="*" element={<RouteNotFound />} />
      </Route>
    )
  );
  const dispatch = useAppDispatch();
  const auth = getAuth();

  useEffect(() => {
    const AuthCheck = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(addUserData(user?.providerData[0]));
        dispatch(getUserDataThunk(user?.providerData[0].uid));
      }
    });
    return () => AuthCheck();
  }, [auth]);

  useEffect(() => {
    dispatch(getUsersThunk());
    dispatch(getPostsThunk());
    dispatch(getAllPostsCommentsThunk());
  }, []);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
