import Core from "@components/Core/Core";
import Layout from "@components/Layout/Layout";
import firebaseConfigs from "@config/firebase";
import RouteNotFound from "@pages/ErrorPage/RouteNotFound";
import Home from "@pages/Home/Home";
import Login from "@pages/Login/Login";
import Profile from "@pages/Profile/Profile";
import Signup from "@pages/Signup/Signup";
import ProtectedRoutes from "@routes/ProtectedRoutes";
import { initializeApp } from "firebase/app";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./App.css";

const firebaseApp = initializeApp(firebaseConfigs);

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

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
