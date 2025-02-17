import React, { useContext, useState } from "react";
import { CartContext } from "../../context/shopLIke";
import { CiHeart } from "react-icons/ci";
import { TbShoppingBagPlus } from "react-icons/tb";

const FavoriteItem = ({ id, image, cost,  payment, info, shade, title }) => {
  const [isFavorited, setIsFavorited] = useState(true);
  const { dispatch } = useContext(CartContext);

  const handleRemoveFromFavorites = () => {
    dispatch({ type: "removeFromFavorites", deletedId: id });
    toast.error("Removed from favorites");
  };

  const handleAddToCart = () => {
    dispatch({
      type: "addItemToCart",
      product: { id, image, cost,  payment, info, shade, title },
    });
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-3 w-full">
      <div className="relative mb-3">
        <img src={image} alt={title} className="w-full h-44 object-cover" />
        <button
          onClick={handleRemoveFromFavorites}
          className={`absolute top-2 right-2 p-2 rounded-full ${isFavorited ? "bg-red-600" : "bg-gray-300"} transition-transform hover:scale-110`}
        >
          <CiHeart className={`h-6 w-6 ${isFavorited ? "text-white" : "text-gray-600"}`} />
        </button>
      </div>
      <h3 className="text-lg font-medium">{title}</h3>
      <div className="flex justify-between text-gray-700 text-sm my-2">
        <span>{info}</span>
        <span>{shade}</span>
      </div>
      <div className="flex flex-col mt-2">
        <span className="text-xl font-semibold">{cost?.toLocaleString()} so'm</span>
        <span className="text-sm text-gray-500">12 x { payment?.toLocaleString()} so'm/oy</span>
      </div>
      <button
        id={id}
        onClick={handleAddToCart}
        className="mt-4 w-full flex items-center justify-center gap-2 bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-400 active:scale-95 transition-all"
      >
        <TbShoppingBagPlus className="w-5 h-5" /> Добавить в корзину
      </button>
    </div>
  );
};

export default FavoriteItem;

