"use client";

import { createContext, useContext, useState, useEffect, useRef } from "react";

const CartContext = createContext();
const MAX_QUANTITY = 99;

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const isFirstRender = useRef(true); // Используем useRef вместо useState для отслеживания первого рендера

  // Загружаем корзину при монтировании
  useEffect(() => {
    const savedCart = localStorage.getItem("shoply-cart");
    if (savedCart) {
      try {
        // Отключаем правило линтера для этой строки, так как это стандартный паттерн гидратации
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Ошибка парсинга корзины", e);
      }
    }
  }, []);

  // Сохраняем корзину при ее изменении, пропуская первый рендер
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    
    if (cart.length > 0) {
      localStorage.setItem("shoply-cart", JSON.stringify(cart));
    } else {
      localStorage.removeItem("shoply-cart");
    }
  }, [cart]);

  const addToCart = (product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      const imageUrl = product.image
        ? `${process.env.NEXT_PUBLIC_STRAPI_URL || "http://127.0.0.1:1337"}${product.image.url}`
        : "https://placehold.co/600x600/f0f4ff/6366f1?text=No+Image";

      if (existing) {
        const newQty = Math.min(existing.quantity + quantity, MAX_QUANTITY);
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: newQty } : item
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          title: product.title,
          price: product.price,
          imageUrl,
          quantity: Math.min(quantity, MAX_QUANTITY),
        },
      ];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }
    const clamped = Math.min(newQuantity, MAX_QUANTITY);
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity: clamped } : item
      )
    );
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, cartCount }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}