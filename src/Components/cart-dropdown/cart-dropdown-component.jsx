import { useContext } from "react";
import Button from "../button/button.component";
import { CartContext } from "../../context/cart.context";
import CartItem from "../cart-items/cart-item.component";
import "./cart-dropdown.styles.scss";
const CartDropDown = () =>{
    const {cartItems} = useContext(CartContext);
    return(
        <div className="cart-dropdown-container">
            <div className="cart-items">
                {cartItems.map((item)=>{
                    return(<CartItem cartItem={item} key={item.id} />
                    )
                })}
            </div>
            <Button buttonType>Checkout</Button>

        </div>
    )
}

export default CartDropDown