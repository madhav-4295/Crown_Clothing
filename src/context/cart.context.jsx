import { createContext, useState, useEffect } from "react";

const addCartItem = (cartItems, productToAdd) => {
  //find cartitems contains producttoAdd
  //If found, increment count
  //return new array with modified cartItems

  const exisitngCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );
  if (exisitngCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};
const removeCartItem = (cartItems, cartItemToRemove) => {
  //find cart item to remove
  //check if quantity is 1 if yes then remove the item
  // reduce the quantity by 1 if quanoty is not 1
  const exisitngCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );

  if (exisitngCartItem.quantity=== 1) {
    return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
  }
  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity -1 }
      : cartItem
  );
};

const clearItemCart = (cartItems, cartItemToClear) =>{
  
    return cartItems.filter(cartItem => cartItem.id !== cartItemToClear.id);
  }
export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemToCart: () => {},
  clearItemFromCart: () =>{},
  cartCount: 0,
  cartTotal: 0
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0)

  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (total, cartItem) => (total += cartItem.quantity),
      0
    );
    setCartCount(newCartCount);
  }, [cartItems]);


  useEffect(() => {

    
    const newTotal = cartItems.reduce((total,cartItem)=>(total+  cartItem.quantity * cartItem.price),0);
    setCartTotal(newTotal)
  }, [cartItems]);


  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };
  const removeItemToCart = (cartItemToRemove) => {
    setCartItems(removeCartItem(cartItems, cartItemToRemove));
  };

  const clearItemFromCart = (cartItemToClear) => {
    setCartItems(clearItemCart(cartItems, cartItemToClear));
  };

  const value = {
    isCartOpen,
    cartItems,
    cartCount,
    cartTotal,
    setIsCartOpen,
    addItemToCart,
    removeItemToCart,
    clearItemFromCart
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
