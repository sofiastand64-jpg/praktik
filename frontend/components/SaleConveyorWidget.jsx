"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import AddToCartButton from "@/components/AddToCartButton";
import ProductIcon from "@/components/ProductIcon";

const CONVEYOR_ITEMS = [
  {
    id: 101,
    slug: "studio-pro",
    title: "Беспроводные наушники Studio Pro",
    segment: "weekly",
    segmentLabel: "Недельная распродажа",
    discount: "-20%",
    price: 12990,
    oldPrice: 15990,
    timer: "Осталось 2 дня",
    specs: "ANC • До 36 ч • Bluetooth 5.4",
    accent: "#ef4444",
    bg: "linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)",
    icon: "headphones",
  },
  {
    id: 102,
    slug: "series-x",
    title: "Умные часы Series X Titanium",
    segment: "monthly",
    segmentLabel: "Месячная распродажа",
    discount: "-15%",
    price: 18500,
    oldPrice: 21800,
    timer: "Весь месяц",
    specs: 'AMOLED 1.96" • GPS + ЭКГ',
    accent: "#f97316",
    bg: "linear-gradient(135deg, #064e3b 0%, #047857 100%)",
    icon: "watch",
  },
  {
    id: 103,
    slug: "gan-65w",
    title: "Быстрая зарядка GaN 65W Pro",
    segment: "retail",
    segmentLabel: "Розничный сегмент",
    discount: "Розница",
    price: 3490,
    oldPrice: null,
    timer: "В наличии 48 шт.",
    specs: "65W • 2xUSB-C + USB-A • PD 3.0",
    accent: "#4f46e5",
    bg: "linear-gradient(135deg, #7c2d12 0%, #c2410c 100%)",
    icon: "charger",
  },
  {
    id: 104,
    slug: "studio-pro",
    title: "Акустика SoundBar Mini",
    segment: "weekly",
    segmentLabel: "Недельная распродажа",
    discount: "-25%",
    price: 7490,
    oldPrice: 9990,
    timer: "Осталось 4 дня",
    specs: "40 Вт • Стерео • AUX / BT",
    accent: "#ef4444",
    bg: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
    icon: "speaker",
  },
  {
    id: 105,
    slug: "gan-65w",
    title: "Кабель USB-C 100W Nylon",
    segment: "retail",
    segmentLabel: "Розничный сегмент",
    discount: "Розница",
    price: 1190,
    oldPrice: null,
    timer: "Базовая цена",
    specs: "2 метра • Нейлон • 100W",
    accent: "#4f46e5",
    bg: "linear-gradient(135deg, #312e81 0%, #4338ca 100%)",
    icon: "cable",
  },
];

const TABS = [
  { key: "all", label: "Все" },
  { key: "weekly", label: "Недельная акция" },
  { key: "monthly", label: "Месячная акция" },
  { key: "retail", label: "Розничные цены" },
];

export default function SaleConveyorWidget() {
  const [activeTab, setActiveTab] = useState("all");
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [popupProduct, setPopupProduct] = useState(null);

  const filtered = CONVEYOR_ITEMS.filter(
    (item) => activeTab === "all" || item.segment === activeTab
  );

  useEffect(() => {
    if (isPaused || filtered.length <= 1) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % filtered.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [isPaused, filtered.length]);

  const currentItem = filtered[activeIndex] || filtered;

  return (
    <aside
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      style={{
        position: "relative",
        background: "#ffffff",
        borderRadius: "20px",
        border: "1px solid #e2e8f0",
        padding: "20px",
        boxShadow: "0 10px 28px rgba(15, 23, 42, 0.06)",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <div>
          <span
            style={{
              fontSize: "11px",
              fontWeight: "800",
              color: "#4f46e5",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            Живой конвейер цен
          </span>
          <h3
            style={{
              fontSize: "18px",
              fontWeight: "800",
              color: "#0f172a",
              margin: "2px 0 0",
            }}
          >
            Распродажа и розница
          </h3>
        </div>
        <div style={{ display: "flex", gap: "6px" }}>
          <button
            type="button"
            onClick={() =>
              setActiveIndex(
                (prev) => (prev - 1 + filtered.length) % filtered.length
              )
            }
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "8px",
              border: "1px solid #e2e8f0",
              background: "#f8fafc",
              cursor: "pointer",
              fontWeight: "700",
            }}
          >
            ←
          </button>
          <button
            type="button"
            onClick={() =>
              setActiveIndex((prev) => (prev + 1) % filtered.length)
            }
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "8px",
              border: "1px solid #e2e8f0",
              background: "#f8fafc",
              cursor: "pointer",
              fontWeight: "700",
            }}
          >
            →
          </button>
        </div>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
        {TABS.map((tab) => {
          const active = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => {
                setActiveTab(tab.key);
                setActiveIndex(0);
              }}
              style={{
                padding: "6px 10px",
                borderRadius: "8px",
                fontSize: "12px",
                fontWeight: "600",
                border: active ? "1px solid #4f46e5" : "1px solid #e2e8f0",
                background: active ? "#eef2ff" : "#ffffff",
                color: active ? "#4f46e5" : "#475569",
                cursor: "pointer",
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      {currentItem && (
        <div
          onClick={() => setPopupProduct(currentItem)}
          style={{
            cursor: "pointer",
            borderRadius: "16px",
            border: "1px solid #e2e8f0",
            overflow: "hidden",
            background: "#f8fafc",
          }}
        >
          <div
            style={{
              height: "130px",
              background: currentItem.bg,
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                position: "absolute",
                top: "10px",
                left: "10px",
                background: currentItem.accent,
                color: "#ffffff",
                fontSize: "11px",
                fontWeight: "800",
                padding: "4px 9px",
                borderRadius: "999px",
              }}
            >
              {currentItem.discount}
            </span>
            <span
              style={{
                position: "absolute",
                bottom: "10px",
                right: "10px",
                background: "rgba(0,0,0,0.45)",
                color: "#ffffff",
                fontSize: "11px",
                padding: "3px 8px",
                borderRadius: "6px",
              }}
            >
              {currentItem.timer}
            </span>
            <ProductIcon type={currentItem.icon} size={52} />
          </div>

          <div
            style={{
              padding: "14px",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            <span
              style={{
                fontSize: "11px",
                fontWeight: "700",
                color: currentItem.accent,
              }}
            >
              {currentItem.segmentLabel}
            </span>
            <div
              style={{ fontSize: "15px", fontWeight: "700", color: "#0f172a" }}
            >
              {currentItem.title}
            </div>
            <div style={{ fontSize: "12px", color: "#64748b" }}>
              {currentItem.specs}
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "6px",
              }}
            >
              <div>
                {currentItem.oldPrice && (
                  <div
                    style={{
                      fontSize: "12px",
                      color: "#94a3b8",
                      textDecoration: "line-through",
                    }}
                  >
                    {currentItem.oldPrice.toLocaleString("ru-RU")} ₽
                  </div>
                )}
                <div
                  style={{
                    fontSize: "18px",
                    fontWeight: "800",
                    color: "#0f172a",
                  }}
                >
                  {currentItem.price.toLocaleString("ru-RU")} ₽
                </div>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setPopupProduct(currentItem);
                }}
                style={{
                  background: "#0f172a",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "8px",
                  padding: "8px 12px",
                  fontSize: "12px",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                Подробнее
              </button>
            </div>
          </div>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        {filtered.map((item, idx) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActiveIndex(idx)}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "8px 10px",
              borderRadius: "10px",
              border:
                idx === activeIndex
                  ? "1px solid #4f46e5"
                  : "1px solid transparent",
              background: idx === activeIndex ? "#eef2ff" : "#f8fafc",
              cursor: "pointer",
              textAlign: "left",
            }}
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "12px",
                fontWeight: "600",
                color: "#0f172a",
              }}
            >
              <span
                style={{
                  background: item.accent,
                  borderRadius: "6px",
                  padding: "4px",
                  display: "inline-flex",
                }}
              >
                <ProductIcon type={item.icon} size={14} />
              </span>
              {item.title}
            </span>
            <span
              style={{
                fontSize: "12px",
                fontWeight: "700",
                color: item.accent,
              }}
            >
              {item.price.toLocaleString("ru-RU")} ₽
            </span>
          </button>
        ))}
      </div>

      {popupProduct && (
        <div
          onClick={() => setPopupProduct(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(15, 23, 42, 0.55)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#ffffff",
              borderRadius: "20px",
              maxWidth: "420px",
              width: "100%",
              padding: "24px",
              boxShadow: "0 20px 45px rgba(15, 23, 42, 0.25)",
              display: "flex",
              flexDirection: "column",
              gap: "14px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: "800",
                  color: popupProduct.accent,
                  background: "#f1f5f9",
                  padding: "4px 10px",
                  borderRadius: "999px",
                }}
              >
                {popupProduct.segmentLabel} • {popupProduct.timer}
              </span>
              <button
                type="button"
                onClick={() => setPopupProduct(null)}
                style={{
                  border: "none",
                  background: "transparent",
                  fontSize: "20px",
                  cursor: "pointer",
                  color: "#64748b",
                }}
              >
                ×
              </button>
            </div>

            <div
              style={{
                height: "140px",
                borderRadius: "14px",
                background: popupProduct.bg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ProductIcon type={popupProduct.icon} size={64} />
            </div>

            <h4
              style={{
                fontSize: "20px",
                fontWeight: "800",
                color: "#0f172a",
                margin: 0,
              }}
            >
              {popupProduct.title}
            </h4>
            <p style={{ fontSize: "13px", color: "#475569", margin: 0 }}>
              Характеристики: {popupProduct.specs}
            </p>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingTop: "12px",
                borderTop: "1px solid #f1f5f9",
              }}
            >
              <div>
                {popupProduct.oldPrice && (
                  <div
                    style={{
                      fontSize: "13px",
                      color: "#94a3b8",
                      textDecoration: "line-through",
                    }}
                  >
                    {popupProduct.oldPrice.toLocaleString("ru-RU")} ₽
                  </div>
                )}
                <div
                  style={{
                    fontSize: "22px",
                    fontWeight: "800",
                    color: "#0f172a",
                  }}
                >
                  {popupProduct.price.toLocaleString("ru-RU")} ₽
                </div>
              </div>
              <AddToCartButton product={popupProduct} />
            </div>

            <Link
              href={`/product/${popupProduct.slug}`}
              style={{
                textAlign: "center",
                fontSize: "13px",
                fontWeight: "600",
                color: "#4f46e5",
                textDecoration: "none",
              }}
            >
              Открыть полную страницу товара →
            </Link>
          </div>
        </div>
      )}
    </aside>
  );
}
