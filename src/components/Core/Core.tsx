import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const Core = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/home");
    }
  }, []);

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default Core;
