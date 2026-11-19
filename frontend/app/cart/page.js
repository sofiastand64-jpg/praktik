// app/cart/page.js
"use client";

import { useCart } from "../../context/CartContext";
import Link from "next/link";

export default function CartPage() {
  const { cart, removeFromCart, cartCount, updateQuantity } = useCart();

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  if (cart.length === 0) {
    return (
      <div
        className="container"
        style={{ padding: "60px 20px", textAlign: "center" }}
      >
        <h1 className="section__title">Ваша корзина пуста</h1>
        <Link
          href="/"
          className="btn btn--primary"
          style={{ marginTop: "20px" }}
        >
          Вернуться к покупкам
        </Link>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: "40px 20px" }}>
      <h1 className="section__title" style={{ marginBottom: "30px" }}>
        Корзина ({cartCount})
      </h1>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          marginBottom: "40px",
        }}
      >
        {cart.map((item) => {
          // BUG-5: Берем готовую строку URL
          const imageUrl =
            item.imageUrl || "https://placehold.co/100x100?text=No";

          return (
            <div
              key={item.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
                borderBottom: "1px solid var(--border)",
                paddingBottom: "20px",
              }}
            >
              <img
                src={imageUrl}
                alt={item.title}
                style={{
                  width: "80px",
                  height: "80px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: "18px", marginBottom: "5px" }}>
                  {item.title}
                </h3>
                <p style={{ color: "var(--text-muted)" }}>{item.price} ₽</p>
              </div>

              <div className="qty" style={{ height: "40px" }}>
                <button
                  type="button"
                  className="qty__btn"
                  style={{ height: "100%" }}
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  −
                </button>
                <input
                  className="qty__input"
                  type="number"
                  value={item.quantity}
                  readOnly
                  style={{ height: "100%" }}
                />
                <button
                  type="button"
                  className="qty__btn"
                  style={{ height: "100%" }}
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </button>
              </div>

              <div
                style={{
                  fontWeight: "bold",
                  fontSize: "18px",
                  width: "100px",
                  textAlign: "right",
                }}
              >
                {item.price * item.quantity} ₽
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                style={{
                  color: "#ef4444",
                  fontSize: "14px",
                  cursor: "pointer",
                  background: "none",
                  border: "none",
                }}
              >
                Удалить
              </button>
            </div>
          );
        })}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ fontSize: "24px", fontWeight: "bold" }}>
          Итого: {totalPrice} ₽
        </div>
        <button
          className="btn btn--primary btn--lg"
          onClick={() => alert("Оформление заказа в разработке!")}
        >
          Оформить заказ
        </button>
      </div>
    </div>
  );
}
