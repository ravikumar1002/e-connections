import { useState } from "react";
import { Navigate } from "react-router-dom";

export interface IProtectedRoutes {
  children?: JSX.Element;
}

const ProtectedRoutes = (props: IProtectedRoutes) => {
  const [login, setlogin] = useState(false);

  if (!login) return <Navigate replace to={"/signup"} />;

  return <>{props.children}</>;
};

export default ProtectedRoutes;
