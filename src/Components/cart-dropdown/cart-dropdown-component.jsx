import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../button/button.component";
import { CartContext } from "../../context/cart.context";
import CartItem from "../cart-items/cart-item.component";
import "./cart-dropdown.styles.scss";
const CartDropDown = () =>{
    const {cartItems} = useContext(CartContext);
    const navigate = useNavigate();
    const goToCheckOutHandler = () =>{
        navigate('/checkout');
    }
    return(
        <div className="cart-dropdown-container">
            <div className="cart-items">
                {cartItems.map((item)=>{
                    return(<CartItem cartItem={item} key={item.id} />
                    )
                })}
            </div>
            <Button buttonType onClick={goToCheckOutHandler}>Checkout</Button>

        </div>
    )
}

export default CartDropDown