import { useClientPrincipal } from "@aaronpowell/react-static-web-apps-auth";
import { useNavigate } from "react-router-dom";
import { roleMap } from "../roleMap";

const PostLogin = () => {
  const navigate = useNavigate();
  const { loaded, clientPrincipal } = useClientPrincipal();

  if (loaded && clientPrincipal !== null) {
    const role = clientPrincipal.userRoles.find((role) => roleMap[role]);

    if (!role) {
      navigate("/unauthorized");
    } else {
      navigate(`/surgery/${role}`);
    }
  }

  return <div></div>;
};

export default PostLogin;
