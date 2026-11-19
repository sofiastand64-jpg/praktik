"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ProductIcon from "@/components/ProductIcon";

const DEFAULT_PRODUCTS = [
  {
    id: 1,
    slug: "studio-pro",
    title: "Беспроводные наушники Studio Pro",
    category: "НАУШНИКИ",
    categorySlug: "headphones",
    price: 12990,
    oldPrice: 15990,
    badge: "ХИТ",
    badgeColor: "#ef4444",
    rating: 4.9,
    reviews: 142,
    specs: ["ANC шумоподавление", "До 36 ч работы", "Bluetooth 5.4"],
    bgGradient: "linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)",
    icon: "headphones",
  },
  {
    id: 2,
    slug: "series-x",
    title: "Умные часы Series X Titanium",
    category: "СМАРТ-ЧАСЫ",
    categorySlug: "smartwatches",
    price: 18500,
    oldPrice: 21800,
    badge: "-15%",
    badgeColor: "#f97316",
    rating: 4.8,
    reviews: 98,
    specs: ['AMOLED 1.96"', "GPS + ЭКГ", "Влагозащита 5 ATM"],
    bgGradient: "linear-gradient(135deg, #064e3b 0%, #047857 100%)",
    icon: "watch",
  },
  {
    id: 3,
    slug: "gan-65w",
    title: "Быстрая зарядка GaN 65W Pro",
    category: "АКСЕССУАРЫ",
    categorySlug: "accessories",
    price: 3490,
    oldPrice: null,
    badge: "ВЫБОР ПОКУПАТЕЛЕЙ",
    badgeColor: "#4f46e5",
    rating: 5.0,
    reviews: 215,
    specs: ["3 порта (2xUSB-C, USB-A)", "Power Delivery 3.0"],
    bgGradient: "linear-gradient(135deg, #7c2d12 0%, #c2410c 100%)",
    icon: "charger",
  },
  {
    id: 4,
    slug: "studio-pro",
    title: "Акустика SoundBar Mini",
    category: "НАУШНИКИ",
    categorySlug: "headphones",
    price: 7490,
    oldPrice: 9990,
    badge: "-25%",
    badgeColor: "#ef4444",
    rating: 4.7,
    reviews: 64,
    specs: ["40 Вт • Стерео", "AUX / Bluetooth 5.3"],
    bgGradient: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
    icon: "speaker",
  },
  {
    id: 5,
    slug: "gan-65w",
    title: "Кабель USB-C 100W Nylon",
    category: "АКСЕССУАРЫ",
    categorySlug: "accessories",
    price: 1190,
    oldPrice: null,
    badge: "БАЗА",
    badgeColor: "#4f46e5",
    rating: 4.9,
    reviews: 310,
    specs: ["2 метра", "Нейлоновая оплётка", "100W"],
    bgGradient: "linear-gradient(135deg, #312e81 0%, #4338ca 100%)",
    icon: "cable",
  },
];

const CATEGORY_MAP = {
  headphones: {
    label: "НАУШНИКИ",
    slug: "studio-pro",
    icon: "headphones",
    gradient: "linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)",
  },
  smartwatches: {
    label: "СМАРТ-ЧАСЫ",
    slug: "series-x",
    icon: "watch",
    gradient: "linear-gradient(135deg, #064e3b 0%, #047857 100%)",
  },
  accessories: {
    label: "АКСЕССУАРЫ",
    slug: "gan-65w",
    icon: "charger",
    gradient: "linear-gradient(135deg, #7c2d12 0%, #c2410c 100%)",
  },
};

export default function AdminCatalogPage() {
  const [products, setProducts] = useState(DEFAULT_PRODUCTS);
  const [title, setTitle] = useState("");
  const [categorySlug, setCategorySlug] = useState("headphones");
  const [price, setPrice] = useState("");
  const [oldPrice, setOldPrice] = useState("");
  const [badge, setBadge] = useState("НОВИНКА");
  const [specsText, setSpecsText] = useState(
    "ANC шумоподавление, Bluetooth 5.4"
  );
  const [toast, setToast] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("shoply_admin_products");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const id = setTimeout(() => setProducts(parsed), 0);
          return () => clearTimeout(id);
        }
      } catch {
        // игнорируем ошибку чтения
      }
    }
  }, []);

  const showNotice = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  };

  const syncStorage = (nextList) => {
    setProducts(nextList);
    localStorage.setItem("shoply_admin_products", JSON.stringify(nextList));
  };
  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!title.trim() || !price) return;

    const meta = CATEGORY_MAP[categorySlug] || CATEGORY_MAP.headphones;
    const newProduct = {
      id: Date.now(),
      slug: meta.slug,
      title: title.trim(),
      category: meta.label,
      categorySlug,
      price: Number(price),
      oldPrice: oldPrice ? Number(oldPrice) : null,
      badge: badge.trim() || "НОВИНКА",
      badgeColor: oldPrice ? "#ef4444" : "#4f46e5",
      rating: 5.0,
      reviews: 1,
      specs: specsText
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      bgGradient: meta.gradient,
      icon: meta.icon,
    };

    syncStorage([newProduct, ...products]);

    const strapiUrl =
      process.env.NEXT_PUBLIC_STRAPI_URL || "http://10.0.2.2:1337";
    try {
      await fetch(`${strapiUrl}/api/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: {
            title: newProduct.title,
            category: newProduct.category,
            categorySlug: newProduct.categorySlug,
            price: newProduct.price,
            oldPrice: newProduct.oldPrice,
            badge: newProduct.badge,
          },
        }),
      });
    } catch {
      // Если CMS временно недоступна, товар уже сохранён локально
    }

    setTitle("");
    setPrice("");
    setOldPrice("");
    showNotice("Товар добавлен и отправлен в CMS");
  };

  const handlePriceChange = (id, newPrice) => {
    const updated = products.map((item) =>
      item.id === id ? { ...item, price: Number(newPrice) || 0 } : item
    );
    syncStorage(updated);
  };

  const handleDelete = (id) => {
    const updated = products.filter((item) => item.id !== id);
    syncStorage(updated);
    showNotice("Товар удалён из витрины");
  };

  const handleReset = () => {
    syncStorage(DEFAULT_PRODUCTS);
    showNotice("Восстановлен стандартный каталог");
  };

  return (
    <main
      style={{
        maxWidth: "1160px",
        margin: "0 auto",
        padding: "28px 20px 64px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <div>
          <Link
            href="/"
            style={{
              fontSize: "13px",
              fontWeight: "700",
              color: "#4f46e5",
              textDecoration: "none",
            }}
          >
            ← Перейти на витрину магазина
          </Link>
          <h1
            style={{ fontSize: "28px", fontWeight: "800", margin: "6px 0 0" }}
          >
            Админ-панель управления товарами
          </h1>
        </div>
        <button
          type="button"
          onClick={handleReset}
          style={{
            background: "#f1f5f9",
            color: "#0f172a",
            border: "1px solid #cbd5e1",
            borderRadius: "10px",
            padding: "9px 14px",
            fontSize: "13px",
            fontWeight: "700",
            cursor: "pointer",
          }}
        >
          Сбросить до базовых товаров
        </button>
      </div>

      {/* Форма добавления нового товара */}
      <form
        onSubmit={handleAddProduct}
        style={{
          background: "#ffffff",
          borderRadius: "18px",
          border: "1px solid #e2e8f0",
          padding: "24px",
          marginBottom: "28px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
          gap: "14px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <label style={{ fontSize: "12px", fontWeight: "700" }}>
            Название гарнитуры / товара *
          </label>
          <input
            type="text"
            placeholder="Например: Гарнитура HyperSound X"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <label style={{ fontSize: "12px", fontWeight: "700" }}>
            Категория
          </label>
          <select
            value={categorySlug}
            onChange={(e) => setCategorySlug(e.target.value)}
          >
            <option value="headphones">Наушники и аудио</option>
            <option value="smartwatches">Смарт-часы и трекеры</option>
            <option value="accessories">Зарядки и аксессуары</option>
          </select>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <label style={{ fontSize: "12px", fontWeight: "700" }}>
            Актуальная цена (₽) *
          </label>
          <input
            type="number"
            placeholder="9990"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <label style={{ fontSize: "12px", fontWeight: "700" }}>
            Старая цена для скидки (₽)
          </label>
          <input
            type="number"
            placeholder="12990"
            value={oldPrice}
            onChange={(e) => setOldPrice(e.target.value)}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <label style={{ fontSize: "12px", fontWeight: "700" }}>
            Бейдж на карточке
          </label>
          <input
            type="text"
            placeholder="ХИТ / -20% / НОВИНКА"
            value={badge}
            onChange={(e) => setBadge(e.target.value)}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <label style={{ fontSize: "12px", fontWeight: "700" }}>
            Характеристики (через запятую)
          </label>
          <input
            type="text"
            value={specsText}
            onChange={(e) => setSpecsText(e.target.value)}
          />
        </div>

        <div style={{ gridColumn: "1 / -1", marginTop: "4px" }}>
          <button
            type="submit"
            style={{
              background: "#4f46e5",
              color: "#ffffff",
              border: "none",
              borderRadius: "10px",
              padding: "12px 22px",
              fontSize: "14px",
              fontWeight: "700",
              cursor: "pointer",
            }}
          >
            + Опубликовать товар на витрине
          </button>
        </div>
      </form>

      {/* Список активных товаров в каталоге */}
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: "800", margin: "0 0 6px" }}>
          Активные товары на витрине ({products.length})
        </h2>

        {products.map((item) => (
          <div
            key={item.id}
            style={{
              background: "#ffffff",
              borderRadius: "14px",
              border: "1px solid #e2e8f0",
              padding: "14px 18px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "12px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "10px",
                  background: item.bgGradient,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ProductIcon type={item.icon} size={22} />
              </span>
              <div>
                <div style={{ fontSize: "15px", fontWeight: "700" }}>
                  {item.title}
                </div>
                <div style={{ fontSize: "12px", color: "#64748b" }}>
                  {item.category} • Бейдж: {item.badge}
                </div>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <label
                style={{
                  fontSize: "12px",
                  fontWeight: "700",
                  color: "#475569",
                }}
              >
                Цена ₽:
              </label>
              <input
                type="number"
                value={item.price}
                onChange={(e) => handlePriceChange(item.id, e.target.value)}
                style={{ width: "110px" }}
              />
              <button
                type="button"
                onClick={() => handleDelete(item.id)}
                style={{
                  background: "#fee2e2",
                  color: "#ef4444",
                  border: "none",
                  borderRadius: "8px",
                  padding: "8px 12px",
                  fontSize: "12px",
                  fontWeight: "700",
                  cursor: "pointer",
                }}
              >
                Удалить
              </button>
            </div>
          </div>
        ))}
      </div>

      {toast && (
        <div
          style={{
            position: "fixed",
            bottom: "24px",
            right: "24px",
            zIndex: 99999,
            background: "#059669",
            color: "#ffffff",
            padding: "12px 20px",
            borderRadius: "12px",
            fontSize: "14px",
            fontWeight: "700",
          }}
        >
          ✓ {toast}
        </div>
      )}
    </main>
  );
}
