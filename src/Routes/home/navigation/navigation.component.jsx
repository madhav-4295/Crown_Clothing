import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { ReactComponent as CrwnLogo } from "../../../assets/crown.svg";
import { UserContext } from "../../../context/user.context";
import { CartContext } from "../../../context/cart.context";
import {signOutUser} from "../../../utils/firebase/firebase.utlis";
import CartIcon from "../../../Components/cart-icon/cart-icon.component";
import CartDropDown from "../../../Components/cart-dropdown/cart-dropdown-component";
import {NavigationContainer, LogoContainer, NavLinkContainer, NavLink} from "./navigation.styles";

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const {isCartOpen} = useContext(CartContext)

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer  to="/">
          <CrwnLogo className="logo" />
        </LogoContainer>
        <NavLinkContainer>
          <NavLink  to="/shop">
            SHOP
          </NavLink>
          {currentUser ? (
            <NavLink as ="span" onClick={signOutUser}>
              SIGN OUT
            </NavLink>
          ) : (
            <NavLink to="/auth">
              SIGN IN
            </NavLink>
          )}
          
          <CartIcon />
        </NavLinkContainer>
        {isCartOpen && <CartDropDown />}
      </NavigationContainer>

      {/* The React Router <Outlet/> component (from react-router-dom) is used within the parent route element to indicate where a child route element should be rendered. */}

      <Outlet />
    </Fragment>
  );
};
export default Navigation;
