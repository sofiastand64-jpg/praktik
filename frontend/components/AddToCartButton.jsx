// components/AddToCartButton.jsx
"use client";

import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Check } from 'lucide-react'; // Иконка галочки

export default function AddToCartButton({ product, className = "btn btn--primary btn--sm" }) {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = () => {
    addToCart(product);
    setIsAdded(true);
    
    // Через 2 секунды возвращаем кнопку в исходное состояние
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  if (isAdded) {
    return (
      <button className="btn btn--success btn--sm" disabled>
        <Check size={16} /> Добавлено
      </button>
    );
  }

  return (
    <button onClick={handleAdd} className={className}>
      В корзину
    </button>
  );
}