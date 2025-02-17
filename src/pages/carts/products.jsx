import React, { useContext } from "react";
import { CartContext } from "../../context/shopLIke";
import Emptypage from "../../components/empty";
import CartItem from "./carts";
import Total from "./total";

const ProductsPage = () => {
  const { state } = useContext(CartContext);

  return (
    <div className="cart_page">
      <div className="container py-3">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-semibold">Shopping Cart</h1>
          <p className="text-gray-600">❤️ Liked Items: {state.favorites.length}</p>
        </div>

        {state.cartItems.length ? (
          <div className="grid items-start grid-cols-[2fr_1fr] max-[780px]:grid-cols-1">
            <div className="flex gap-5 flex-col">
              {state.cartItems.map((value) => (
                <CartItem key={value.id} {...value} />
              ))}
              <Total items={state.cartItems} />
            </div>
          </div>
        ) : (
          <Emptypage />
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
