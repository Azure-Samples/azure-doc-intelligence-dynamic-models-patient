import {
  Logout,
  StaticWebAuthLogins,
  useClientPrincipal,
} from "@aaronpowell/react-static-web-apps-auth";
import { loginProviders, nav } from "./Nav.css";

const roleMap: { [key: string]: string } = {
  admin: "Surgery Admin",
};

const Nav = () => {
  const { loaded, clientPrincipal } = useClientPrincipal();
  return (
    <nav className={nav}>
      <div>
        {loaded ? (
          clientPrincipal === null ? (
            ""
          ) : (
            <h2>
              {clientPrincipal.userRoles.reduce(
                (acc, role) => (roleMap[role] ? acc + roleMap[role] : acc),
                ""
              )}
            </h2>
          )
        ) : (
          ""
        )}
      </div>
      <div>
        <h1>Contoso Health Care</h1>
      </div>

      {loaded ? (
        clientPrincipal === null ? (
          <div className={loginProviders}>
            <h2>Social login</h2>
            <StaticWebAuthLogins />
          </div>
        ) : (
          <div>
            <Logout />
          </div>
        )
      ) : (
        ""
      )}
    </nav>
  );
};

export default Nav;
