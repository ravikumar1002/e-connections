import Core from "@components/Core/Core";
import Layout from "@components/Layout/Layout";
import Home from "@pages/Home/Home";
import Login from "@pages/Login/Login";
import Profile from "@pages/Profile/Profile";
import Signup from "@pages/Signup/Signup";
import ProtectedRoutes from "@routes/ProtectedRoutes";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./App.css";

function App() {
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
      </Route>
    )
  );

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
