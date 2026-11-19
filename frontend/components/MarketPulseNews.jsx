"use client";

import { useState } from "react";

const MARKET_NEWS = [
  {
    id: 1,
    trend: "down",
    delta: "-20%",
    component: "NAND Flash (Спотовый рынок)",
    category: "Память и накопители",
    date: "Ноябрь 2026 • Bank of America / 36Kr",
    title:
      "Спотовые цены на чипы NAND Flash упали на 20% из-за охлаждения спроса",
    summary:
      "С конца октября спотовые котировки флеш-памяти снизились примерно на 20% на фоне замедления закупок со стороны производителей смартфонов и ПК. Аналитики прогнозируют дальнейшее снижение контрактных цен на IT-сегмент ещё на 5–10% в I квартале.",
    impact:
      "Хороший момент для покупки SSD-накопителей и карт памяти до нового цикла.",
  },
  {
    id: 2,
    trend: "up",
    delta: "+15% … +20%",
    component: "Enterprise SSD и серверная память",
    category: "Дата-центры и ИИ",
    date: "Ноябрь 2026 • TrendForce",
    title: "Контрактные цены на Enterprise SSD растут на 15–20% в IV квартале",
    summary:
      "Высокий спрос со стороны североамериканских ИИ-кластеров и дата-центров толкает вверх стоимость корпоративных твердотельных накопителей, вызывая дефицит производственных мощностей для массового сегмента.",
    impact: "Производители перераспределяют линии в пользу серверных чипов.",
  },
  {
    id: 3,
    trend: "up",
    delta: "+13% … +18%",
    component: "Оперативная память PC DRAM / DDR5",
    category: "Комплектующие ПК",
    date: "Ноябрь 2026 • TrendForce / BofA",
    title:
      "Оперативная память DRAM для ПК дорожает на 13–18% по итогам квартала",
    summary:
      "Несмотря на снижение отгрузок ноутбуков на 15,8%, поставщики чипов удерживают курс на повышение контрактных цен DRAM (прогноз +8% в среднем и до +18% для ПК-модулей) с потенциалом роста ещё на 5% в начале следующего года.",
    impact:
      "Ожидается плавное удорожание конфигураций ноутбуков и модулей ОЗУ.",
  },
  {
    id: 4,
    trend: "up",
    delta: "+10% … +15%",
    component: "Мобильные SoC-процессоры Qualcomm",
    category: "Смартфоны и носимая электроника",
    date: "Осень 2026 • Отчёт Qualcomm",
    title: "Повышение отпускных цен на мобильные чипсеты из-за дефицита памяти",
    summary:
      "Крупнейшие вендоры мобильных процессоров скорректировали прайс-листы на флагманские и среднебюджетные чипы на фоне удорожания сопутствующих микросхем памяти, что закладывается в себестоимость новых смартфонов и умных часов.",
    impact: "Новые партии гаджетов выходят с обновлённой розничной ценой.",
  },
  {
    id: 5,
    trend: "down",
    delta: "-12%",
    component: "Ноутбуки и потребительская электроника",
    category: "Готовая техника",
    date: "Ноябрь 2026 • TrendForce",
    title:
      "Снижение квартальных отгрузок ноутбуков на 15,8% усилило скидки на складах",
    summary:
      "Из-за накопления складских запасов у OEM-производителей ритейлеры запускают распродажи текущих линеек ультрабуков и периферии, чтобы освободить полки перед закупкой дорожающих комплектующих.",
    impact: "Пик сезонных акций на готовые гаджеты из складских запасов.",
  },
];

export default function MarketPulseNews() {
  const [filter, setFilter] = useState("all");
  const [expandedId, setExpandedId] = useState(null);

  const visibleNews = MARKET_NEWS.filter((item) => {
    if (filter === "all") return true;
    return item.trend === filter;
  });

  return (
    <section
      aria-label="Глобальный пульс цен на чипы и технику"
      style={{
        marginTop: "48px",
        background: "#ffffff",
        borderRadius: "22px",
        border: "1px solid #e2e8f0",
        padding: "28px 32px",
        boxShadow: "0 14px 34px rgba(15, 23, 42, 0.05)",
      }}
    >
      {/* Шапка блока и фильтры */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "14px",
          marginBottom: "22px",
        }}
      >
        <div>
          <span
            style={{
              display: "inline-block",
              fontSize: "12px",
              fontWeight: "800",
              color: "#4f46e5",
              background: "#eef2ff",
              padding: "4px 12px",
              borderRadius: "999px",
              marginBottom: "8px",
            }}
          >
            Глобальная аналитика рынка • Ноябрь 2026
          </span>
          <h2 style={{ fontSize: "24px", fontWeight: "800", margin: 0 }}>
            Пульс цен: чипы, память и электроника
          </h2>
        </div>

        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {[
            { key: "all", label: `Все сводки (${MARKET_NEWS.length})` },
            { key: "up", label: "▲ Прирост цен" },
            { key: "down", label: "▼ Упадок цен" },
          ].map((btn) => {
            const active = filter === btn.key;
            return (
              <button
                key={btn.key}
                type="button"
                onClick={() => setFilter(btn.key)}
                style={{
                  padding: "8px 14px",
                  borderRadius: "10px",
                  fontSize: "13px",
                  fontWeight: "700",
                  border: active ? "1px solid #4f46e5" : "1px solid #cbd5e1",
                  background: active ? "#4f46e5" : "#f8fafc",
                  color: active ? "#ffffff" : "#0f172a",
                  cursor: "pointer",
                }}
              >
                {btn.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Сетка новостных карточек */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
          gap: "18px",
        }}
      >
        {visibleNews.map((news) => {
          const isUp = news.trend === "up";
          const isExpanded = expandedId === news.id;

          return (
            <article
              key={news.id}
              style={{
                background: "#f8fafc",
                borderRadius: "16px",
                border: "1px solid #e2e8f0",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              {/* Верхняя строка: компонент и индикатор изменения цены */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: "700",
                    color: "#6366f1",
                  }}
                >
                  {news.component}
                </span>
                <span
                  style={{
                    background: isUp ? "#fee2e2" : "#dcfce7",
                    color: isUp ? "#dc2626" : "#15803d",
                    fontSize: "12px",
                    fontWeight: "800",
                    padding: "4px 10px",
                    borderRadius: "999px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {isUp ? `▲ ${news.delta}` : `▼ ${news.delta}`}
                </span>
              </div>

              <h3
                style={{
                  fontSize: "16px",
                  fontWeight: "800",
                  margin: 0,
                  lineHeight: "1.4",
                }}
              >
                {news.title}
              </h3>

              <p
                style={{
                  fontSize: "13px",
                  color: "#475569",
                  margin: 0,
                  lineHeight: "1.55",
                  display: "-webkit-box",
                  WebkitLineClamp: isExpanded ? "unset" : 3,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {news.summary}
              </p>

              {/* Вывод для покупателя */}
              <div
                style={{
                  marginTop: "auto",
                  padding: "10px 12px",
                  borderRadius: "10px",
                  background: isUp
                    ? "rgba(239, 68, 68, 0.08)"
                    : "rgba(16, 185, 129, 0.1)",
                  fontSize: "12px",
                  fontWeight: "600",
                  color: isUp ? "#b91c1c" : "#047857",
                }}
              >
                {news.impact}
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingTop: "8px",
                  borderTop: "1px solid #e2e8f0",
                  fontSize: "11px",
                  color: "#64748b",
                }}
              >
                <span>{news.date}</span>
                <button
                  type="button"
                  onClick={() => setExpandedId(isExpanded ? null : news.id)}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "#4f46e5",
                    fontSize: "12px",
                    fontWeight: "700",
                    cursor: "pointer",
                    padding: 0,
                  }}
                >
                  {isExpanded ? "Свернуть ↑" : "Подробнее ↓"}
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
