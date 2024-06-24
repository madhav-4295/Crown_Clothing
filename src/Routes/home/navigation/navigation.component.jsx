import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { ReactComponent as CrwnLogo } from "../../../assets/crown.svg";
import { UserContext } from "../../../context/user.context";
import { CartContext } from "../../../context/cart.context";
import {signOutUser} from "../../../utils/firebase/firebase.utlis";
import CartIcon from "../../../Components/cart-icon/cart-icon.component";
import CartDropDown from "../../../Components/cart-dropdown/cart-dropdown-component";
import "./navigation.styles.scss";

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const {isCartOpen} = useContext(CartContext)

  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <CrwnLogo className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            SHOP
          </Link>
          {currentUser ? (
            <span className="nav-link"  onClick={signOutUser}>
              SIGN OUT
            </span>
          ) : (
            <Link className="nav-link" to="/auth">
              SIGN IN
            </Link>
          )}
          
          <CartIcon />
        </div>
        {isCartOpen && <CartDropDown />}
      </div>

      {/* The React Router <Outlet/> component (from react-router-dom) is used within the parent route element to indicate where a child route element should be rendered. */}

      <Outlet />
    </Fragment>
  );
};
export default Navigation;
