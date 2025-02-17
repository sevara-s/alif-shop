import React, { useContext } from "react";
import { CartContext } from "../../context/shopLIke"; // Adjust the import path
import CartItem from "./carts";
import Emptypage from "../../components/empty";

const Cart = () => {
  const { state } = useContext(CartContext);

  return (
    <div className="space-y-4">
      {state.cartItems.length > 0 ? (
        state.cartItems.map((item) => <CartItem key={item.id} {...item} />)
      ) : (
        <Emptypage />
      )}
    </div>
  );
};

export default Cart;
