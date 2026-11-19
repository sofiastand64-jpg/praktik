"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import AddToCartButton from "@/components/AddToCartButton";
import ProductIcon from "@/components/ProductIcon";

const CULT_DEALS = [
  {
    id: 201,
    slug: "studio-pro",
    title: "Studio Pro Flagship ANC",
    tag: "КУЛЬТОВЫЙ ВЫБОР #1",
    subtitle: "Студийное шумоподавление и 36 часов автономии",
    price: 11990,
    oldPrice: 15990,
    discount: "-25%",
    stockLeft: 4,
    icon: "headphones",
    gradient: "linear-gradient(135deg, #1e1b4b 0%, #3730a3 100%)",
    accent: "#818cf8",
  },
  {
    id: 202,
    slug: "series-x",
    title: "Series X Titanium Edition",
    tag: "ХИТ ДНЯ #2",
    subtitle: "Титановый корпус, сапфировое стекло и двухчастотный GPS",
    price: 16990,
    oldPrice: 21800,
    discount: "-22%",
    stockLeft: 3,
    icon: "watch",
    gradient: "linear-gradient(135deg, #064e3b 0%, #065f46 100%)",
    accent: "#34d399",
  },
  {
    id: 203,
    slug: "gan-65w",
    title: "GaN 65W Ultra Compact",
    tag: "БЕСТСЕЛЛЕР #3",
    subtitle: "Зарядка ноутбука и смартфона одновременно без нагрева",
    price: 2990,
    oldPrice: 4200,
    discount: "-29%",
    stockLeft: 7,
    icon: "charger",
    gradient: "linear-gradient(135deg, #7c2d12 0%, #9a3412 100%)",
    accent: "#fb923c",
  },
  {
    id: 204,
    slug: "studio-pro",
    title: "SoundBar Mini Bass Boost",
    tag: "ЛИМИТ ДНЯ #4",
    subtitle: "Объёмный звук 40 Вт в компактном алюминиевом корпусе",
    price: 6990,
    oldPrice: 9990,
    discount: "-30%",
    stockLeft: 2,
    icon: "speaker",
    gradient: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
    accent: "#38bdf8",
  },
];

export default function DailyCultConveyor() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(14 * 3600 + 28 * 60 + 45);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 86399));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (paused) return;
    const slider = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % CULT_DEALS.length);
    }, 4000);
    return () => clearInterval(slider);
  }, [paused]);

  const hours = String(Math.floor(secondsLeft / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((secondsLeft % 3600) / 60)).padStart(
    2,
    "0"
  );
  const seconds = String(secondsLeft % 60).padStart(2, "0");

  const featured = CULT_DEALS[activeIdx];

  return (
    <section
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{
        background:
          "linear-gradient(135deg, #0f172a 0%, #1e1b4b 60%, #312e81 100%)",
        borderRadius: "20px",
        padding: "24px",
        color: "#ffffff",
        marginBottom: "36px",
        boxShadow: "0 16px 36px rgba(15, 23, 42, 0.18)",
        border: "1px solid rgba(255, 255, 255, 0.12)",
      }}
    >
      {/* Верхняя панель с таймером дня */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "12px",
          marginBottom: "20px",
          paddingBottom: "16px",
          borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span
            style={{
              background: "#f59e0b",
              color: "#0f172a",
              fontSize: "11px",
              fontWeight: "900",
              padding: "5px 12px",
              borderRadius: "999px",
              letterSpacing: "0.06em",
            }}
          >
            ТОВАРЫ ДНЯ
          </span>
          <h2
            style={{
              fontSize: "20px",
              fontWeight: "800",
              color: "#ffffff",
              margin: 0,
            }}
          >
            Культовый конвейер предложений
          </h2>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "12px", color: "#c7d2fe" }}>
            До обновления ленты:
          </span>
          <div
            style={{
              background: "rgba(255, 255, 255, 0.12)",
              padding: "6px 12px",
              borderRadius: "10px",
              fontFamily: "monospace",
              fontSize: "15px",
              fontWeight: "800",
              color: "#fbbf24",
              letterSpacing: "0.05em",
            }}
          >
            {hours}:{minutes}:{seconds}
          </div>
        </div>
      </div>

      {/* Главная карточка текущего товара дня */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "20px",
          alignItems: "center",
          background: "rgba(255, 255, 255, 0.06)",
          borderRadius: "16px",
          padding: "20px",
          marginBottom: "18px",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
          <div
            style={{
              width: "84px",
              height: "84px",
              borderRadius: "18px",
              background: featured.gradient,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              border: "1px solid rgba(255,255,255,0.2)",
            }}
          >
            <ProductIcon type={featured.icon} size={44} />
          </div>

          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "6px",
              }}
            >
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: "800",
                  color: featured.accent,
                }}
              >
                {featured.tag}
              </span>
              <span
                style={{
                  background: "#ef4444",
                  color: "#ffffff",
                  fontSize: "11px",
                  fontWeight: "800",
                  padding: "2px 8px",
                  borderRadius: "6px",
                }}
              >
                {featured.discount}
              </span>
            </div>
            <Link
              href={`/product/${featured.slug}`}
              style={{
                fontSize: "19px",
                fontWeight: "800",
                color: "#ffffff",
                textDecoration: "none",
              }}
            >
              {featured.title}
            </Link>
            <p
              style={{ fontSize: "13px", color: "#cbd5e1", margin: "4px 0 0" }}
            >
              {featured.subtitle}
            </p>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "16px",
            flexWrap: "wrap",
          }}
        >
          <div>
            <div
              style={{
                fontSize: "13px",
                color: "#94a3b8",
                textDecoration: "line-through",
              }}
            >
              {featured.oldPrice.toLocaleString("ru-RU")} ₽
            </div>
            <div
              style={{ fontSize: "26px", fontWeight: "900", color: "#ffffff" }}
            >
              {featured.price.toLocaleString("ru-RU")} ₽
            </div>
            <div
              style={{
                fontSize: "11px",
                color: "#fbbf24",
                fontWeight: "600",
                marginTop: "2px",
              }}
            >
              Осталось по акции: {featured.stockLeft} шт.
            </div>
          </div>

          <AddToCartButton product={featured} />
        </div>
      </div>

      {/* Нижняя лента-конвейер всех 4 товаров дня */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "10px",
        }}
      >
        {CULT_DEALS.map((deal, idx) => {
          const isCurrent = idx === activeIdx;
          return (
            <button
              key={deal.id}
              type="button"
              onClick={() => setActiveIdx(idx)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "10px 12px",
                borderRadius: "12px",
                border: isCurrent
                  ? "1px solid #fbbf24"
                  : "1px solid rgba(255,255,255,0.1)",
                background: isCurrent
                  ? "rgba(251, 191, 36, 0.16)"
                  : "rgba(255, 255, 255, 0.04)",
                color: "#ffffff",
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              <span
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "8px",
                  background: deal.gradient,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <ProductIcon type={deal.icon} size={18} />
              </span>
              <div style={{ minWidth: 0 }}>
                <div
                  style={{
                    fontSize: "12px",
                    fontWeight: "700",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {deal.title}
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    fontWeight: "800",
                    color: "#fbbf24",
                  }}
                >
                  {deal.price.toLocaleString("ru-RU")} ₽
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
