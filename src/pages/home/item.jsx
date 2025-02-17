import React, { useContext } from "react";
import { TbShoppingBagPlus } from "react-icons/tb";
import { CiHeart } from "react-icons/ci";
import { CartContext } from "../../context/shopLIke";
import { toast } from "react-toastify";

const SingleItem = ({ id, image, cost, payment, info,  shade,  title }) => {
  const { state, dispatch } = useContext(CartContext);

  // Check if item is already liked
  const isLiked = state.favorites.some((item) => item.id === id);

  const addToCart = () => {
    dispatch({
      type: "addItemToCart",
      product: { id, image, cost, payment, info,  shade,  title },
    });
    toast.success("Added to cart 🛒");
  };

  const toggleLike = () => {
    if (isLiked) {
      dispatch({ type: "removeFromFavorites", deletedId: id });
      toast.warning("Removed from likes ❌");
    } else {
      dispatch({
        type: "addToFavorites",
        product: { id, image, cost, payment, info,  shade,  title },
      });
      toast.success("Added to likes ❤️");
    }
  };

  return (
    <div className="relative flex flex-col bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all">
      <div className="relative w-full h-48">
        <image src={image} alt={ title} className="w-full h-full object-cover" />
        <button
          onClick={toggleLike}
          className={`absolute top-3 right-3 p-2 rounded-full ${
            isLiked ? "bg-red-500" : "bg-gray-300"
          } hover:scale-105 transition-all`}
        >
          <CiHeart
            className={`w-6 h-6 ${isLiked ? "text-white" : "text-gray-600"}`}
          />
        </button>
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h2 className="text-lg font-semibold text-gray-800">{ title}</h2>
        <p className="text-sm text-gray-500">
          {info} | { shade}
        </p>

        <div className="mt-auto">
          <p className="text-xl font-bold text-gray-800">
            {cost.toLocaleString()} so'm
          </p>
          <p className="text-sm text-gray-500">
            12 x {payment.toLocaleString()} so'm/oy
          </p>
          <button
            onClick={addToCart}
            className="w-full flex items-center justify-center gap-2 bg-yellow-400 text-white py-2 rounded-lg hover:bg-yellow-500 active:scale-95 transition-all mt-3"
          >
            <TbShoppingBagPlus className="w-5 h-5" /> Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleItem;
