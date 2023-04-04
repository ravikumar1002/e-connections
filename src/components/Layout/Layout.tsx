import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <div>
        Aside bar
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
