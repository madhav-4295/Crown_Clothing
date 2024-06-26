import { CartContext } from "../../context/cart.context";
import "./checkout.styles.scss";
import { useContext } from "react";
import CheckoutItem from "../../Components/checkout-item/checkout-item.component";

const CheckOut = () => {
  const headers = ["Product", "Description", "Quantity", "Price", "Remove"];
  const { cartItems, cartTotal } =
    useContext(CartContext);
  return (
    <div className="checkout-container">
      <div className="checkout-header">
          {headers.map((header) => {
            return (
            <div className="header-block">
            <span>{header}</span>
            </div>
            );
          })}
      </div>
      {cartItems.map((cartItem) => {
        return (
            <CheckoutItem key = {cartItem.id}cartItem={cartItem}/>
            // <span onClick={() => removeItemToCart(cartItem)}>Decrement</span>
            // <br />
            // <span onClick={() => addItemToCart(cartItem)}>Increment</span>
        );
      })}
      <span className="total">Total :${cartTotal}</span>
    </div>
  );
};

export default CheckOut;
