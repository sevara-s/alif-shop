import React, { useContext } from "react";
import { CartContext } from "../../context/shopLIke";
import EmptyState from "../../components/empty";
import FavoriteProduct from "./liked";

const Favorites = () => {
  const { state } = useContext(CartContext);

  if (state.favorites.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 py-6">
      {state.favorites.map((item) => (
        <FavoriteProduct key={item.id} {...item} />
      ))}
    </div>
  );
};

export default Favorites;
