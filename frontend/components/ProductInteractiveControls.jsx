"use client";

import { useState } from "react";
import { useCart } from "../context/CartContext";
import { Check } from "lucide-react";

const MAX_QTY = 99;

export default function ProductInteractiveControls({ product }) {
  const [qty, setQty] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const { addToCart } = useCart();

  const handleAdd = () => {
    addToCart(product, qty);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="product__buy">
      <div className="qty">
        <button type="button" className="qty__btn" onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
        <input
          className="qty__input"
          type="number"
          value={qty}
          readOnly
          title="Используйте кнопки + и − для изменения количества"
        />
        <button type="button" className="qty__btn" onClick={() => setQty(Math.min(MAX_QTY, qty + 1))}>+</button>
      </div>

      {isAdded ? (
        <button type="button" className="btn btn--success btn--lg" disabled>
          <Check size={20} /> Добавлено в корзину
        </button>
      ) : (
        <button type="button" className="btn btn--primary btn--lg" onClick={handleAdd}>
          В корзину
        </button>
      )}
    </div>
  );
}