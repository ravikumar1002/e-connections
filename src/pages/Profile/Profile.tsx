import { useDocumentTitle } from "@hooks/useDocumentTitle";
import { useEffect } from "react";

const Profile = () => {
  useEffect(() => {
    useDocumentTitle("Profile");
  }, []);

  return (
    <div>
      <h2>Profile</h2>
    </div>
  );
};

export default Profile;
