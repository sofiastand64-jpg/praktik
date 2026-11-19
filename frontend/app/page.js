"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import AddToCartButton from "@/components/AddToCartButton";
import SaleConveyorWidget from "@/components/SaleConveyorWidget";
import DailyCultConveyor from "@/components/DailyCultConveyor";
import ProductIcon from "@/components/ProductIcon";
import CatalogSkeleton from "@/components/CatalogSkeleton";
import ConsultationBlock from "@/components/ConsultationBlock";
import MarketPulseNews from "@/components/MarketPulseNews";

const CATEGORIES = [
  {
    id: 1,
    slug: "headphones",
    title: "Наушники и аудио",
    subtitle: "Беспроводные, с шумоподавлением ANC и студийным звуком",
    count: "12 моделей",
    badge: "Популярное",
    gradient: "linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%)",
    accent: "#4f46e5",
  },
  {
    id: 2,
    slug: "smartwatches",
    title: "Смарт-часы и трекеры",
    subtitle: "Контроль здоровья, GPS-навигация и AMOLED-экраны",
    count: "8 моделей",
    badge: "Новинки 2026",
    gradient: "linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)",
    accent: "#059669",
  },
  {
    id: 3,
    slug: "accessories",
    title: "Зарядки и аксессуары",
    subtitle: "Мощные GaN-адаптеры, кабели быстрой зарядки и док-станции",
    count: "15 моделей",
    badge: "До -20%",
    gradient: "linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)",
    accent: "#ea580c",
  },
];
const PRODUCTS = [
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
    slug: "soundbar-mini",
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
    slug: "usb-cable-100w",
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
function InteractiveShopSection() {
  const searchParams = useSearchParams();
  const urlQuery = (searchParams.get("q") || "").toLowerCase().trim();
  const urlCategory = (searchParams.get("category") || "").toLowerCase().trim();

  const [overrideCategory, setOverrideCategory] = useState(null);
  const [overrideSearch, setOverrideSearch] = useState(null);
  const [sortBy, setSortBy] = useState("popular");
  const [onlyDiscount, setOnlyDiscount] = useState(false);
  const [wishlist, setWishlist] = useState([]);

  const selectedCategory =
    overrideCategory !== null ? overrideCategory : urlCategory;
  const searchText = overrideSearch !== null ? overrideSearch : urlQuery;

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };
  const [catalogProducts, setCatalogProducts] = useState(PRODUCTS);
  useEffect(() => {
    const onHeaderSearch = (e) => {
      setOverrideSearch(e.detail ?? "");
    };
    window.addEventListener("shoply-search", onHeaderSearch);
    return () => window.removeEventListener("shoply-search", onHeaderSearch);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("shoply_admin_products");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const id = setTimeout(() => setCatalogProducts(parsed), 0);
          return () => clearTimeout(id);
        }
      } catch {
        // игнорируем
      }
    }

    const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
    if (strapiUrl) {
      fetch(`${strapiUrl}/api/products`)
        .then((res) => (res.ok ? res.json() : null))
        .then((json) => {
          if (json?.data?.length) {
            const mapped = json.data.map((entry, idx) => {
              const attrs = entry.attributes || entry;
              return {
                id: entry.id || idx + 100,
                slug: attrs.slug || "studio-pro",
                title: attrs.title || "Гарнитура Shoply",
                category: (attrs.category || "НАУШНИКИ").toUpperCase(),
                categorySlug: attrs.categorySlug || "headphones",
                price: Number(attrs.price) || 9990,
                oldPrice: attrs.oldPrice ? Number(attrs.oldPrice) : null,
                badge: attrs.badge || "НОВИНКА",
                badgeColor: "#4f46e5",
                rating: 4.9,
                reviews: 24,
                specs: attrs.specs || ["Гарантия 12 мес."],
                bgGradient: "linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)",
                icon: "headphones",
              };
            });
            setCatalogProducts(mapped);
          }
        })
        .catch(() => {});
    }
  }, []);

  const filteredProducts = catalogProducts
    .filter((item) => {
      const q = searchText.toLowerCase().trim();
      const matchesQuery =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q);
      const matchesCategory =
        !selectedCategory || item.categorySlug === selectedCategory;
      const matchesDiscount = !onlyDiscount || Boolean(item.oldPrice);
      return matchesQuery && matchesCategory && matchesDiscount;
    })
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      return b.rating - a.rating;
    });

  return (
    <>
      <section id="categories" style={{ marginBottom: "40px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <h2 style={{ fontSize: "22px", fontWeight: "700", margin: 0 }}>
            Категории товаров
          </h2>
          {selectedCategory && (
            <button
              type="button"
              onClick={() => setOverrideCategory("")}
              style={{
                background: "transparent",
                border: "none",
                fontSize: "14px",
                color: "#4f46e5",
                fontWeight: "700",
                cursor: "pointer",
              }}
            >
              Сбросить фильтр ×
            </button>
          )}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
          }}
        >
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.slug;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setOverrideCategory(isActive ? "" : cat.slug)}
                style={{
                  textAlign: "left",
                  background: "#ffffff",
                  borderRadius: "16px",
                  padding: "22px",
                  border: isActive
                    ? `2px solid ${cat.accent}`
                    : "1px solid #e2e8f0",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                  cursor: "pointer",
                }}
              >
                <span
                  style={{
                    alignSelf: "flex-start",
                    fontSize: "12px",
                    fontWeight: "700",
                    color: cat.accent,
                    background: cat.gradient,
                    padding: "4px 10px",
                    borderRadius: "999px",
                  }}
                >
                  {cat.badge}
                </span>
                <h3 style={{ fontSize: "18px", fontWeight: "700", margin: 0 }}>
                  {cat.title}
                </h3>
                <p style={{ fontSize: "13px", color: "#64748b", margin: 0 }}>
                  {cat.subtitle}
                </p>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    paddingTop: "12px",
                    borderTop: "1px solid #f1f5f9",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: cat.accent,
                  }}
                >
                  <span>{isActive ? "Выбрано ✓" : "Смотреть товары →"}</span>
                  <span>{cat.count}</span>
                </div>
              </button>
            );
          })}
        </div>
      </section>
      <section id="catalog">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "12px",
            marginBottom: "20px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <h2 style={{ fontSize: "26px", fontWeight: "800", margin: 0 }}>
              Каталог товаров ({filteredProducts.length})
            </h2>
            {wishlist.length > 0 && (
              <span
                style={{
                  background: "#fee2e2",
                  color: "#ef4444",
                  fontSize: "12px",
                  fontWeight: "800",
                  padding: "4px 10px",
                  borderRadius: "999px",
                }}
              >
                ♥ В избранном: {wishlist.length}
              </span>
            )}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              flexWrap: "wrap",
            }}
          >
            <input
              type="search"
              value={searchText}
              onChange={(e) => setOverrideSearch(e.target.value)}
              placeholder="Быстрый поиск товара..."
              style={{ minWidth: "210px" }}
            />

            <label
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "13px",
                fontWeight: "600",
                cursor: "pointer",
                background: "#ffffff",
                padding: "9px 12px",
                borderRadius: "10px",
                border: "1px solid #cbd5e1",
                color: "#0f172a",
              }}
            >
              <input
                type="checkbox"
                checked={onlyDiscount}
                onChange={(e) => setOnlyDiscount(e.target.checked)}
              />
              Со скидкой
            </label>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-label="Сортировка товаров"
            >
              <option value="popular">По популярности</option>
              <option value="price-asc">Сначала дешевле</option>
              <option value="price-desc">Сначала дороже</option>
            </select>
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div
            style={{
              background: "#ffffff",
              borderRadius: "16px",
              padding: "40px 20px",
              textAlign: "center",
              border: "1px solid #e2e8f0",
            }}
          >
            <p
              style={{ fontSize: "16px", color: "#64748b", margin: "0 0 14px" }}
            >
              По вашему запросу ничего не найдено.
            </p>
            <button
              type="button"
              onClick={() => {
                setOverrideSearch("");
                setOverrideCategory("");
                setOnlyDiscount(false);
              }}
              style={{
                background: "#4f46e5",
                color: "#ffffff",
                border: "none",
                borderRadius: "10px",
                padding: "10px 18px",
                fontWeight: "700",
                cursor: "pointer",
              }}
            >
              Сбросить все фильтры
            </button>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "24px",
            }}
          >
            {filteredProducts.map((product) => {
              const isFav = wishlist.includes(product.id);
              return (
                <article
                  key={product.id}
                  style={{
                    background: "#ffffff",
                    borderRadius: "18px",
                    border: "1px solid #e2e8f0",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      height: "200px",
                      background: product.bgGradient,
                    }}
                  >
                    <Link
                      href={`/product/${product.slug}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        textDecoration: "none",
                      }}
                    >
                      <span
                        style={{
                          position: "absolute",
                          top: "14px",
                          left: "14px",
                          background: product.badgeColor,
                          color: "#ffffff",
                          fontSize: "11px",
                          fontWeight: "800",
                          padding: "5px 11px",
                          borderRadius: "999px",
                        }}
                      >
                        {product.badge}
                      </span>
                      <ProductIcon type={product.icon} size={64} />
                    </Link>

                    <button
                      type="button"
                      onClick={() => toggleWishlist(product.id)}
                      style={{
                        position: "absolute",
                        top: "12px",
                        right: "12px",
                        background: isFav ? "#ef4444" : "rgba(255,255,255,0.2)",
                        color: "#ffffff",
                        border: "none",
                        borderRadius: "8px",
                        padding: "6px 10px",
                        fontSize: "12px",
                        fontWeight: "700",
                        cursor: "pointer",
                      }}
                    >
                      {isFav ? "♥ В избранном" : "♡"}
                    </button>
                  </div>

                  <div
                    style={{
                      padding: "20px",
                      display: "flex",
                      flexDirection: "column",
                      flexGrow: 1,
                      gap: "12px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "12px",
                        fontWeight: "700",
                        color: "#6366f1",
                      }}
                    >
                      {product.category} • ★ {product.rating} ({product.reviews}
                      )
                    </span>
                    <Link
                      href={`/product/${product.slug}`}
                      style={{
                        fontSize: "18px",
                        fontWeight: "700",
                        color: "#0f172a",
                        textDecoration: "none",
                      }}
                    >
                      {product.title}
                    </Link>
                    <div
                      style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}
                    >
                      {product.specs.map((spec, i) => (
                        <span
                          key={i}
                          style={{
                            fontSize: "12px",
                            color: "#475569",
                            background: "#f1f5f9",
                            padding: "4px 9px",
                            borderRadius: "6px",
                          }}
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                    <div
                      style={{
                        marginTop: "auto",
                        paddingTop: "14px",
                        borderTop: "1px solid #f1f5f9",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div>
                        {product.oldPrice && (
                          <div
                            style={{
                              fontSize: "13px",
                              color: "#94a3b8",
                              textDecoration: "line-through",
                            }}
                          >
                            {product.oldPrice.toLocaleString("ru-RU")} ₽
                          </div>
                        )}
                        <div
                          style={{
                            fontSize: "21px",
                            fontWeight: "800",
                            color: "#0f172a",
                          }}
                        >
                          {product.price.toLocaleString("ru-RU")} ₽
                        </div>
                      </div>
                      <AddToCartButton product={product} />
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </>
  );
}
export default function HomePage() {
  const [darkTheme, setDarkTheme] = useState(false);
  const [toastText, setToastText] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("shoply_theme");
    if (saved === "dark") {
      document.documentElement.classList.add("dark-theme");
      const id = setTimeout(() => setDarkTheme(true), 0);
      return () => clearTimeout(id);
    }
  }, []);

  useEffect(() => {
    const handleCartToast = (e) => {
      const btn = e.target.closest("button");
      if (
        btn &&
        btn.textContent &&
        btn.textContent.toLowerCase().includes("корзин")
      ) {
        setToastText("Товар добавлен в корзину");
        setTimeout(() => setToastText(""), 2500);
      }
    };

    document.addEventListener("click", handleCartToast);
    return () => document.removeEventListener("click", handleCartToast);
  }, []);

  const toggleTheme = () => {
    const next = !darkTheme;
    setDarkTheme(next);
    if (next) {
      document.documentElement.classList.add("dark-theme");
      localStorage.setItem("shoply_theme", "dark");
    } else {
      document.documentElement.classList.remove("dark-theme");
      localStorage.setItem("shoply_theme", "light");
    }
  };

  return (
    <main
      style={{
        maxWidth: "1440px",
        margin: "0 auto",
        padding: "24px 20px 64px",
        display: "grid",
        gridTemplateColumns: "minmax(0, 1fr) 340px",
        gap: "28px",
        alignItems: "start",
      }}
    >
      <div>
        <section
          style={{
            background:
              "linear-gradient(120deg, #1e293b 0%, #312e81 55%, #4f46e5 100%)",
            borderRadius: "20px",
            padding: "36px 40px",
            color: "#ffffff",
            marginBottom: "32px",
          }}
        >
          <span
            style={{
              display: "inline-block",
              background: "rgba(255,255,255,0.16)",
              padding: "6px 14px",
              borderRadius: "999px",
              fontSize: "13px",
              fontWeight: "600",
              marginBottom: "14px",
            }}
          >
            Официальная техника с гарантией 12 месяцев
          </span>
          <h1
            style={{
              fontSize: "34px",
              fontWeight: "800",
              color: "#ffffff",
              margin: "0 0 12px",
            }}
          >
            Умные гаджеты и аксессуары нового поколения
          </h1>
          <p style={{ fontSize: "16px", color: "#e0e7ff", margin: "0 0 22px" }}>
            Быстрая доставка в день заказа, проверка перед оплатой и актуальные
            модели в наличии.
          </p>
          <a
            href="#catalog"
            style={{
              display: "inline-block",
              background: "#ffffff",
              color: "#312e81",
              padding: "12px 24px",
              borderRadius: "10px",
              fontWeight: "700",
              textDecoration: "none",
            }}
          >
            Перейти в каталог
          </a>
        </section>

        <div id="sales">
          <DailyCultConveyor />
        </div>

        <Suspense fallback={<CatalogSkeleton />}>
          <InteractiveShopSection />
        </Suspense>

        <ConsultationBlock />
        <MarketPulseNews />
      </div>

      <SaleConveyorWidget />

      <button
        type="button"
        onClick={toggleTheme}
        style={{
          position: "fixed",
          bottom: "24px",
          left: "24px",
          zIndex: 9990,
          background: darkTheme ? "#f8fafc" : "#0f172a",
          color: darkTheme ? "#0f172a" : "#ffffff",
          border: "1px solid rgba(148, 163, 184, 0.4)",
          borderRadius: "999px",
          padding: "10px 16px",
          fontSize: "13px",
          fontWeight: "700",
          cursor: "pointer",
          boxShadow: "0 10px 25px rgba(15, 23, 42, 0.25)",
        }}
      >
        {darkTheme ? "Светлая тема" : "Тёмная тема"}
      </button>
      <Link
        href="/profile"
        style={{
          position: "fixed",
          bottom: "72px",
          left: "24px",
          zIndex: 9990,
          background: "#4f46e5",
          color: "#ffffff",
          borderRadius: "999px",
          padding: "10px 16px",
          fontSize: "13px",
          fontWeight: "700",
          textDecoration: "none",
          boxShadow: "0 10px 25px rgba(79, 70, 229, 0.35)",
        }}
      >
        Личный кабинет
        <Link
          href="/admin"
          style={{
            position: "fixed",
            bottom: "120px",
            left: "24px",
            zIndex: 9990,
            background: "#059669",
            color: "#ffffff",
            borderRadius: "999px",
            padding: "10px 16px",
            fontSize: "13px",
            fontWeight: "700",
            textDecoration: "none",
            boxShadow: "0 10px 25px rgba(5, 150, 105, 0.35)",
          }}
        >
          Админ-панель
        </Link>
      </Link>

      {toastText && (
        <div
          role="status"
          style={{
            position: "fixed",
            bottom: "24px",
            right: "24px",
            zIndex: 9999,
            background: "#059669",
            color: "#ffffff",
            padding: "12px 20px",
            borderRadius: "12px",
            fontSize: "14px",
            fontWeight: "700",
            boxShadow: "0 12px 30px rgba(5, 150, 105, 0.35)",
          }}
        >
          ✓ {toastText}
        </div>
      )}
    </main>
  );
}
