import { ErrorPageImg } from "@assets/index";
import { Button, Link } from "@mui/material";
import { useNavigate } from "react-router";
const RouteNotFound = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        height: "100vh",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <img src={ErrorPageImg} alt="Error logo" style={{ height: "30rem" }} />
      <Button
        onClick={() => {
          navigate("/home", { replace: true });
        }}
      >
        Go to home page
      </Button>
    </div>
  );
};

export default RouteNotFound;
