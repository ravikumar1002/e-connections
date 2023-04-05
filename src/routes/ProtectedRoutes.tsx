import { getAuth, onAuthStateChanged} from "firebase/auth";
import { useEffect } from "react";
import { useState } from "react";
import { Navigate , useNavigate} from "react-router-dom";

export interface IProtectedRoutes {
  children?: JSX.Element;
}

const ProtectedRoutes = (props: IProtectedRoutes) => {
  const [loading, setLoading] = useState(false);
  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const AuthCheck = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoading(false);
      } else {
        navigate("/login", { replace: true });
        console.log("unauthorized");
      }
    });

    return () => AuthCheck();
  }, [auth]);

  // if (auth) return <Navigate replace to={"/login"} />;

  return <>{props.children}</>;
};

export default ProtectedRoutes;
