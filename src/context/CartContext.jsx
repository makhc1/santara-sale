import { createContext, useContext, useState, useMemo } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartPageOpen, setIsCartPageOpen] = useState(false); // <-- TAMBAHKAN INI

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prevItems, { ...product, qty: 1 }];
    });
  };

  const updateQty = (id, type) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === id
            ? { ...item, qty: type === 'plus' ? item.qty + 1 : item.qty - 1 }
            : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const removeItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const totalItems = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.qty, 0);
  }, [cartItems]);

  const totalPrice = useMemo(() => {
    return cartItems.reduce((total, item) => total + (item.price * item.qty), 0);
  }, [cartItems]);

  // Fungsi buka dan tutup halaman cart
  const openCartPage = () => setIsCartPageOpen(true); // <-- TAMBAHKAN INI
  const closeCartPage = () => setIsCartPageOpen(false); // <-- TAMBAHKAN INI

  return (
    <CartContext.Provider value={{ cartItems, isCartPageOpen, openCartPage, closeCartPage, addToCart, updateQty, removeItem, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};