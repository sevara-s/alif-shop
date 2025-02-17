import { createContext, useReducer } from "react";

const CartContext = createContext({});

const CartContextProvider = ({ children }) => {
  const fetchFromStorage = (key) => JSON.parse(localStorage.getItem(key)) || [];

  const initialState = {
    cartItems: fetchFromStorage("cart"),
    favorites: fetchFromStorage("favorites"),
  };

  const saveToStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  const addItem = (state, key, item) => {
    const list = state[key];
    const existingItem = list.find((el) => el.id === item.id);

    let updatedList = existingItem
      ? list.map((el) =>
          el.id === item.id
            ? { ...el, quantity: el.quantity + 1 }
            : el
        )
      : [...list, { ...item, quantity: 1 }];

    saveToStorage(key, updatedList);
    return { ...state, [key]: updatedList };
  };

  const removeItem = (state, key, id) => {
    const updatedList = state[key].filter((el) => el.id !== id);
    saveToStorage(key, updatedList);
    return { ...state, [key]: updatedList };
  };

  const adjustQuantity = (state, key, item, increment = true) => {
    const updatedList = state[key].map((el) =>
      el.id === item.id
        ? { ...el, quantity: el.quantity + (increment ? 1 : -1) }
        : el
    );
    saveToStorage(key, updatedList);
    return { ...state, [key]: updatedList };
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "addItemToCart":
        return addItem(state, "cartItems", action.item);
      case "removeFromCart":
        return removeItem(state, "cartItems", action.itemId);
      case "incrementCartItem":
        return adjustQuantity(state, "cartItems", action.item, true);
      case "decrementCartItem":
        return adjustQuantity(state, "cartItems", action.item, false);
      case "addToFavorites":
        return addItem(state, "favorites", action.item);
      case "removeFromFavorites":
        return removeItem(state, "favorites", action.itemId);
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartContextProvider };
