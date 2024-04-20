import { Fragment } from "react";
import { Outlet, Link } from "react-router-dom";
import {ReactComponent as CrwnLogo} from "../../../assets/crown.svg";
import "./navigation.styles.scss";
const Navigation = () => {
  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to='/'>
          <CrwnLogo className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            SHOP
          </Link>
          <Link className="nav-link" to="/signIn">SIGN IN</Link>
        </div>
      </div>

      {/* The React Router <Outlet/> component (from react-router-dom) is used within the parent route element to indicate where a child route element should be rendered. */}

      <Outlet />
    </Fragment>
  );
};
export default Navigation;
