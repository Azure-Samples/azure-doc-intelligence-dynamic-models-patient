import {
  Logout,
  StaticWebAuthLogins,
  useClientPrincipal,
} from "@aaronpowell/react-static-web-apps-auth";
import { loginMenu, loginMenuButton, loginMenuLabel, nav } from "./Nav.css";
import { roleMap } from "../roleMap";
import { useState } from "react";
import { Icon } from "@mdi/react";
import { Link } from "react-router-dom";
import { mdiHome } from "@mdi/js";

const Nav = () => {
  const { loaded, clientPrincipal } = useClientPrincipal();
  const [showMenu, setShowMenu] = useState(false);
  return (
    <nav className={nav}>
      <div>
        <h2>
          <Link to="/" title="Home" style={{ color: "#fff" }}>
            <Icon path={mdiHome} size={1} />
            &nbsp;
            {loaded
              ? clientPrincipal
                ? clientPrincipal.userRoles.reduce(
                    (acc, role) => (roleMap[role] ? acc + roleMap[role] : acc),
                    ""
                  )
                : ""
              : ""}
          </Link>
        </h2>
      </div>
      <div>
        <h1>Contoso Health Care</h1>
      </div>

      {loaded ? (
        clientPrincipal === null ? (
          <div>
            <button
              className={loginMenuButton}
              onClick={() => setShowMenu(!showMenu)}
            >
              <h2 className={loginMenuLabel}>Login</h2>
            </button>
            {showMenu && (
              <div className={loginMenu}>
                <StaticWebAuthLogins postLoginRedirect="/post-login" />
              </div>
            )}
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
