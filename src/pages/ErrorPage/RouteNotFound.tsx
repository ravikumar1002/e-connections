import { ErrorPageImg } from "@assets/index";

const RouteNotFound = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        height: "100vh",
        alignItems: "center",
      }}
    >
      <img src={ErrorPageImg} alt="Error logo" style={{ height: "30rem" }} />
    </div>
  );
};

export default RouteNotFound;
