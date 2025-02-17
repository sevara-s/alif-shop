import React, { useContext } from "react";
 import { CartContext } from "../../context/shopLIke.jsx";
import { toast } from "react-toastify";

const CartItem = ({
  id,
  image,
  info = "No info available",
  cost = 0,
  payment = 0,
  shade = "Unknown",
  title = "Unknown Item",
  quantity = 1,
}) => {
  const { dispatch } = useContext(CartContext);

  const decrementQuantity = () => {
    if (quantity > 1) {
      dispatch({
        type: "decrementCartItem",
        item: { id, image, info, cost, payment, shade, title, quantity },
      });
    } else {
      dispatch({ type: "removeFromCart", itemId: id });
      toast.error("Item removed from cart");
    }
  };

  const incrementQuantity = () => {
    dispatch({
      type: "incrementCartItem",
      item: { id, image, info, cost, payment, shade, title, quantity },
    });
  };

  const removeItem = () => {
    dispatch({ type: "removeFromCart", itemId: id });
    toast.error("Item removed from cart");
  };

  return (
    <div className="flex flex-col md:flex-row gap-3 shadow-md rounded-lg p-4 border-gray-200 border">
      <img className="w-24 h-20 object-contain" src={image} alt={title} />
      <div className="flex flex-col flex-grow">
        <h2 className="text-base font-semibold mb-1">{title}</h2>
        <span className="text-sm text-gray-500">{info}</span>
        <span>Color: {shade}</span>
        <span className="text-gray-600 text-sm">
          Price: {cost.toLocaleString().replace(/,/g, " ")} so'm
        </span>
        <div className="bg-gray-100 p-2 rounded-md mt-2">
          <span className="text-xs text-gray-400">Installment Plan</span>
          <p className="text-sm font-medium">
            {payment.toLocaleString().replace(/,/g, " ")} so'm x 12 months
          </p>
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-md">
            <button
              onClick={decrementQuantity}
              className="text-lg"
              aria-label="Decrease"
            >
              -
            </button>
            <span>{quantity}</span>
            <button
              onClick={incrementQuantity}
              className="text-lg"
              aria-label="Increase"
            >
              +
            </button>
          </div>
          <button
            onClick={removeItem}
            className="flex items-center gap-1 text-red-500"
          >
            <p>delete</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
