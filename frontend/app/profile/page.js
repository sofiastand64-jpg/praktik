"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ProductIcon from "@/components/ProductIcon";

const FRAME_STYLES = [
  {
    id: "cyber",
    name: "Неон Индиго",
    border: "3px solid #6366f1",
    shadow: "0 0 24px rgba(99, 102, 241, 0.55)",
    bg: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 60%, #312e81 100%)",
    badgeBg: "#4f46e5",
  },
  {
    id: "gold",
    name: "Золотой Премиум",
    border: "3px solid #f59e0b",
    shadow: "0 0 24px rgba(245, 158, 11, 0.5)",
    bg: "linear-gradient(135deg, #1c1917 0%, #451a03 60%, #78350f 100%)",
    badgeBg: "#d97706",
  },
  {
    id: "emerald",
    name: "Изумрудный Кибер",
    border: "3px solid #10b981",
    shadow: "0 0 24px rgba(16, 185, 129, 0.45)",
    bg: "linear-gradient(135deg, #022c22 0%, #064e3b 60%, #065f46 100%)",
    badgeBg: "#059669",
  },
  {
    id: "crimson",
    name: "Рубиновый Статус",
    border: "3px solid #f43f5e",
    shadow: "0 0 24px rgba(244, 63, 94, 0.5)",
    bg: "linear-gradient(135deg, #1f1218 0%, #4c0519 60%, #881337 100%)",
    badgeBg: "#e11d48",
  },
];

const AVATAR_PRESETS = [
  {
    id: "indigo",
    label: "Индиго",
    bg: "linear-gradient(135deg, #4f46e5 0%, #818cf8 100%)",
  },
  {
    id: "sunset",
    label: "Закат",
    bg: "linear-gradient(135deg, #f97316 0%, #ec4899 100%)",
  },
  {
    id: "emerald",
    label: "Мята",
    bg: "linear-gradient(135deg, #059669 0%, #34d399 100%)",
  },
  {
    id: "dark",
    label: "Графит",
    bg: "linear-gradient(135deg, #334155 0%, #0f172a 100%)",
  },
];
const INITIAL_ORDERS = [
  {
    id: "SHP-8492",
    date: "15 ноября 2026",
    status: "Доставлен",
    statusColor: "#059669",
    statusBg: "#ecfdf5",
    total: 12990,
    items: [
      {
        title: "Беспроводные наушники Studio Pro",
        qty: 1,
        price: 12990,
        icon: "headphones",
      },
    ],
  },
  {
    id: "SHP-7910",
    date: "02 ноября 2026",
    status: "В пути (курьер)",
    statusColor: "#4f46e5",
    statusBg: "#eef2ff",
    total: 21990,
    items: [
      {
        title: "Умные часы Series X Titanium",
        qty: 1,
        price: 18500,
        icon: "watch",
      },
      {
        title: "Быстрая зарядка GaN 65W Pro",
        qty: 1,
        price: 3490,
        icon: "charger",
      },
    ],
  },
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("customize");
  const [savedToast, setSavedToast] = useState(false);

  const [user, setUser] = useState({
    name: "Александр Волков",
    nickname: "@volkov_tech",
    bio: "Люблю качественный звук, умные гаджеты и быструю зарядку.",
    email: "a.volkov@shoply.ru",
    phone: "+7 (927) 555-34-12",
    city: "г. Маркс, пр-т Ленина, д. 42, кв. 18",
    bonus: 1450,
    level: "Gold Статус • Кэшбэк 7%",
    frameId: "cyber",
    avatarPreset: "indigo",
    avatarUrl: "",
    avatarShape: "rounded",
  });

  useEffect(() => {
    const saved = localStorage.getItem("shoply_profile_v2");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const id = setTimeout(
          () => setUser((prev) => ({ ...prev, ...parsed })),
          0
        );
        return () => clearTimeout(id);
      } catch {
        // игнорируем ошибку парсинга
      }
    }
  }, []);

  const currentFrame =
    FRAME_STYLES.find((f) => f.id === user.frameId) || FRAME_STYLES[0];
  const currentAvatar =
    AVATAR_PRESETS.find((a) => a.id === user.avatarPreset) || AVATAR_PRESETS[0];

  const handleAvatarUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setUser((prev) => ({ ...prev, avatarUrl: reader.result }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSaveProfile = (e) => {
    if (e) e.preventDefault();
    localStorage.setItem("shoply_profile_v2", JSON.stringify(user));
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2500);
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
            ← Вернуться в магазин
          </Link>
          <h1
            style={{ fontSize: "30px", fontWeight: "800", margin: "6px 0 0" }}
          >
            Личный кабинет и оформление профиля
          </h1>
        </div>
        <span
          style={{
            background: currentFrame.badgeBg,
            color: "#ffffff",
            fontSize: "12px",
            fontWeight: "800",
            padding: "6px 14px",
            borderRadius: "999px",
          }}
        >
          {user.level}
        </span>
      </div>

      <section
        style={{
          background: currentFrame.bg,
          border: currentFrame.border,
          boxShadow: currentFrame.shadow,
          borderRadius: "22px",
          padding: "28px 32px",
          color: "#ffffff",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "22px",
          marginBottom: "28px",
          transition: "all 0.25s ease",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              width: "84px",
              height: "84px",
              borderRadius: user.avatarShape === "circle" ? "50%" : "20px",
              border: currentFrame.border,
              boxShadow: currentFrame.shadow,
              background: currentAvatar.bg,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "32px",
              fontWeight: "900",
              color: "#ffffff",
              overflow: "hidden",
              flexShrink: 0,
            }}
          >
            {user.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt={user.name}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              user.name.charAt(0).toUpperCase()
            )}
          </div>

          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                flexWrap: "wrap",
                marginBottom: "4px",
              }}
            >
              <h2
                style={{
                  fontSize: "24px",
                  fontWeight: "800",
                  color: "#ffffff",
                  margin: 0,
                }}
              >
                {user.name}
              </h2>
              <span
                style={{
                  background: "rgba(255,255,255,0.16)",
                  padding: "3px 10px",
                  borderRadius: "999px",
                  fontSize: "12px",
                  fontWeight: "700",
                  color: "#e0e7ff",
                }}
              >
                {user.nickname}
              </span>
            </div>
            <p
              style={{ fontSize: "14px", color: "#e2e8f0", margin: "0 0 6px" }}
            >
              {user.bio}
            </p>
            <div style={{ fontSize: "12px", color: "#cbd5e1" }}>
              {user.email} • {user.phone}
            </div>
          </div>
        </div>

        <div
          style={{
            background: "rgba(15, 23, 42, 0.45)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            borderRadius: "16px",
            padding: "14px 22px",
            textAlign: "right",
          }}
        >
          <div
            style={{ fontSize: "12px", color: "#c7d2fe", fontWeight: "600" }}
          >
            Бонусный баланс
          </div>
          <div
            style={{ fontSize: "26px", fontWeight: "900", color: "#fbbf24" }}
          >
            {user.bonus.toLocaleString("ru-RU")} ₽
          </div>
        </div>
      </section>
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "24px",
          flexWrap: "wrap",
        }}
      >
        {[
          { key: "customize", label: "Оформление рамки и аватарки" },
          {
            key: "orders",
            label: `История заказов (${INITIAL_ORDERS.length})`,
          },
          { key: "settings", label: "Личные данные и адрес" },
        ].map((tab) => {
          const active = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              style={{
                padding: "10px 18px",
                borderRadius: "12px",
                fontSize: "14px",
                fontWeight: "700",
                border: active ? "1px solid #4f46e5" : "1px solid #cbd5e1",
                background: active ? "#4f46e5" : "#ffffff",
                color: active ? "#ffffff" : "#0f172a",
                cursor: "pointer",
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {activeTab === "customize" && (
        <div
          style={{
            background: "#ffffff",
            borderRadius: "18px",
            border: "1px solid #e2e8f0",
            padding: "26px",
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          <div>
            <h3
              style={{
                fontSize: "17px",
                fontWeight: "800",
                margin: "0 0 12px",
              }}
            >
              1. Выберите стиль рамки мини-профиля
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "12px",
              }}
            >
              {FRAME_STYLES.map((frame) => {
                const selected = user.frameId === frame.id;
                return (
                  <button
                    key={frame.id}
                    type="button"
                    onClick={() => setUser({ ...user, frameId: frame.id })}
                    style={{
                      background: frame.bg,
                      border: frame.border,
                      boxShadow: selected ? frame.shadow : "none",
                      color: "#ffffff",
                      borderRadius: "14px",
                      padding: "14px 16px",
                      textAlign: "left",
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ fontSize: "14px", fontWeight: "700" }}>
                      {frame.name}
                    </span>
                    {selected && (
                      <span style={{ fontSize: "14px", fontWeight: "900" }}>
                        ✓
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <h3
              style={{
                fontSize: "17px",
                fontWeight: "800",
                margin: "0 0 12px",
              }}
            >
              2. Настройка аватарки (фото, цвет или форма)
            </h3>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "14px",
                alignItems: "center",
              }}
            >
              <label
                style={{
                  background: "#0f172a",
                  color: "#ffffff",
                  padding: "10px 16px",
                  borderRadius: "10px",
                  fontSize: "13px",
                  fontWeight: "700",
                  cursor: "pointer",
                }}
              >
                Загрузить своё фото
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  style={{ display: "none" }}
                />
              </label>

              {user.avatarUrl && (
                <button
                  type="button"
                  onClick={() => setUser({ ...user, avatarUrl: "" })}
                  style={{
                    background: "#fee2e2",
                    color: "#ef4444",
                    border: "none",
                    padding: "10px 14px",
                    borderRadius: "10px",
                    fontSize: "13px",
                    fontWeight: "700",
                    cursor: "pointer",
                  }}
                >
                  Удалить фото
                </button>
              )}

              <div
                style={{ display: "flex", gap: "8px", alignItems: "center" }}
              >
                {AVATAR_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() =>
                      setUser({
                        ...user,
                        avatarPreset: preset.id,
                        avatarUrl: "",
                      })
                    }
                    title={preset.label}
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      background: preset.bg,
                      border:
                        user.avatarPreset === preset.id && !user.avatarUrl
                          ? "3px solid #0f172a"
                          : "2px solid #cbd5e1",
                      cursor: "pointer",
                    }}
                  />
                ))}
              </div>

              <div style={{ display: "flex", gap: "8px" }}>
                <button
                  type="button"
                  onClick={() => setUser({ ...user, avatarShape: "rounded" })}
                  style={{
                    padding: "8px 12px",
                    borderRadius: "8px",
                    border:
                      user.avatarShape === "rounded"
                        ? "2px solid #4f46e5"
                        : "1px solid #cbd5e1",
                    background: "#f8fafc",
                    fontSize: "12px",
                    fontWeight: "700",
                    cursor: "pointer",
                  }}
                >
                  Скруглённый квадрат
                </button>
                <button
                  type="button"
                  onClick={() => setUser({ ...user, avatarShape: "circle" })}
                  style={{
                    padding: "8px 12px",
                    borderRadius: "8px",
                    border:
                      user.avatarShape === "circle"
                        ? "2px solid #4f46e5"
                        : "1px solid #cbd5e1",
                    background: "#f8fafc",
                    fontSize: "12px",
                    fontWeight: "700",
                    cursor: "pointer",
                  }}
                >
                  Круглая аватарка
                </button>
              </div>
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "16px",
            }}
          >
            <div
              style={{ display: "flex", flexDirection: "column", gap: "6px" }}
            >
              <label style={{ fontSize: "13px", fontWeight: "700" }}>
                Никнейм в мини-профиле
              </label>
              <input
                type="text"
                value={user.nickname}
                onChange={(e) => setUser({ ...user, nickname: e.target.value })}
              />
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "6px" }}
            >
              <label style={{ fontSize: "13px", fontWeight: "700" }}>
                Статус / подпись в рамке
              </label>
              <input
                type="text"
                value={user.bio}
                onChange={(e) => setUser({ ...user, bio: e.target.value })}
              />
            </div>
          </div>

          <div>
            <button
              type="button"
              onClick={handleSaveProfile}
              style={{
                background: "#4f46e5",
                color: "#ffffff",
                border: "none",
                borderRadius: "10px",
                padding: "12px 24px",
                fontSize: "14px",
                fontWeight: "700",
                cursor: "pointer",
              }}
            >
              Сохранить оформление профиля
            </button>
          </div>
        </div>
      )}
      {activeTab === "orders" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          {INITIAL_ORDERS.map((order) => (
            <article
              key={order.id}
              style={{
                background: "#ffffff",
                borderRadius: "18px",
                border: "1px solid #e2e8f0",
                padding: "22px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "10px",
                  paddingBottom: "14px",
                  borderBottom: "1px solid #f1f5f9",
                  marginBottom: "16px",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "12px" }}
                >
                  <span style={{ fontSize: "17px", fontWeight: "800" }}>
                    Заказ #{order.id}
                  </span>
                  <span style={{ fontSize: "13px", color: "#64748b" }}>
                    от {order.date}
                  </span>
                </div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "14px" }}
                >
                  <span
                    style={{
                      background: order.statusBg,
                      color: order.statusColor,
                      fontSize: "12px",
                      fontWeight: "800",
                      padding: "5px 12px",
                      borderRadius: "999px",
                    }}
                  >
                    {order.status}
                  </span>
                  <span style={{ fontSize: "18px", fontWeight: "800" }}>
                    {order.total.toLocaleString("ru-RU")} ₽
                  </span>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                {order.items.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: "12px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                      }}
                    >
                      <span
                        style={{
                          width: "38px",
                          height: "38px",
                          borderRadius: "10px",
                          background: "#1e1b4b",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <ProductIcon type={item.icon} size={20} />
                      </span>
                      <span style={{ fontSize: "14px", fontWeight: "600" }}>
                        {item.title} × {item.qty}
                      </span>
                    </div>
                    <span
                      style={{
                        fontSize: "14px",
                        fontWeight: "700",
                        color: "#64748b",
                      }}
                    >
                      {item.price.toLocaleString("ru-RU")} ₽
                    </span>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      )}
      {activeTab === "settings" && (
        <form
          onSubmit={handleSaveProfile}
          style={{
            background: "#ffffff",
            borderRadius: "18px",
            border: "1px solid #e2e8f0",
            padding: "26px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "18px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label style={{ fontSize: "13px", fontWeight: "700" }}>
              ФИО получателя
            </label>
            <input
              type="text"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              required
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label style={{ fontSize: "13px", fontWeight: "700" }}>
              Электронная почта
            </label>
            <input
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              required
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label style={{ fontSize: "13px", fontWeight: "700" }}>
              Телефон для курьера
            </label>
            <input
              type="tel"
              value={user.phone}
              onChange={(e) => setUser({ ...user, phone: e.target.value })}
              required
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label style={{ fontSize: "13px", fontWeight: "700" }}>
              Адрес доставки по умолчанию
            </label>
            <input
              type="text"
              value={user.city}
              onChange={(e) => setUser({ ...user, city: e.target.value })}
            />
          </div>

          <div style={{ gridColumn: "1 / -1", marginTop: "6px" }}>
            <button
              type="submit"
              style={{
                background: "#4f46e5",
                color: "#ffffff",
                border: "none",
                borderRadius: "10px",
                padding: "12px 24px",
                fontSize: "14px",
                fontWeight: "700",
                cursor: "pointer",
              }}
            >
              Сохранить контакты
            </button>
          </div>
        </form>
      )}

      {savedToast && (
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
          ✓ Оформление и данные профиля сохранены
        </div>
      )}
    </main>
  );
}
