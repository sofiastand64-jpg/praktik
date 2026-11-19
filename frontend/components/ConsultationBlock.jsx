"use client";

import { useState } from "react";

const TOPICS = [
  "Подбор наушников и аудио",
  "Сравнение смарт-часов",
  "Совместимость GaN-зарядок",
  "Доставка, гарантия и возврат",
];

export default function ConsultationBlock() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [topic, setTopic] = useState(TOPICS[0]);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    setSubmitted(true);
  };

  return (
    <section
      aria-label="Бесплатная консультация специалиста"
      style={{
        marginTop: "48px",
        background:
          "linear-gradient(135deg, #0f172a 0%, #1e1b4b 55%, #312e81 100%)",
        borderRadius: "22px",
        padding: "32px 36px",
        color: "#ffffff",
        boxShadow: "0 18px 40px rgba(15, 23, 42, 0.16)",
        border: "1px solid rgba(255, 255, 255, 0.12)",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "28px",
        alignItems: "center",
      }}
    >
      <div>
        <span
          style={{
            display: "inline-block",
            background: "rgba(16, 185, 129, 0.2)",
            color: "#34d399",
            fontSize: "12px",
            fontWeight: "800",
            padding: "5px 12px",
            borderRadius: "999px",
            marginBottom: "12px",
          }}
        >
          Онлайн-поддержка • Ответ за 3 минуты
        </span>
        <h2
          style={{
            fontSize: "26px",
            fontWeight: "800",
            color: "#ffffff",
            margin: "0 0 10px",
          }}
        >
          Нужна помощь с выбором гаджета?
        </h2>
        <p
          style={{
            fontSize: "14px",
            color: "#cbd5e1",
            margin: "0 0 16px",
            lineHeight: "1.6",
          }}
        >
          Оставьте контакты — технический эксперт Shoply сравнит характеристики
          моделей, проверит наличие и подберёт оптимальный вариант под ваш
          бюджет.
        </p>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "14px",
            fontSize: "13px",
            color: "#e0e7ff",
            fontWeight: "600",
          }}
        >
          <span>✓ Без навязывания услуг</span>
          <span>✓ Проверка совместимости</span>
          <span>✓ Подбор по бюджету</span>
        </div>
      </div>

      {submitted ? (
        <div
          style={{
            background: "rgba(255, 255, 255, 0.08)",
            border: "1px solid rgba(52, 211, 153, 0.45)",
            borderRadius: "16px",
            padding: "24px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: "18px",
              fontWeight: "800",
              color: "#34d399",
              marginBottom: "8px",
            }}
          >
            ✓ Заявка на консультацию принята
          </div>
          <p style={{ fontSize: "14px", color: "#e2e8f0", margin: "0 0 16px" }}>
            {name}, специалист свяжется с вами по номеру{" "}
            <strong>{phone}</strong> по теме «{topic}» в течение 3 минут.
          </p>
          <button
            type="button"
            onClick={() => {
              setSubmitted(false);
              setName("");
              setPhone("");
            }}
            style={{
              background: "#ffffff",
              color: "#0f172a",
              border: "none",
              borderRadius: "10px",
              padding: "10px 18px",
              fontSize: "13px",
              fontWeight: "700",
              cursor: "pointer",
            }}
          >
            Отправить ещё один вопрос
          </button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          style={{
            background: "rgba(255, 255, 255, 0.07)",
            border: "1px solid rgba(255, 255, 255, 0.14)",
            borderRadius: "16px",
            padding: "22px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          <select
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            aria-label="Тема консультации"
            style={{ width: "100%" }}
          >
            {TOPICS.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Ваше имя"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="tel"
            placeholder="+7 (999) 000-00-00"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />

          <button
            type="submit"
            style={{
              background: "#4f46e5",
              color: "#ffffff",
              border: "none",
              borderRadius: "10px",
              padding: "12px 20px",
              fontSize: "14px",
              fontWeight: "700",
              cursor: "pointer",
              marginTop: "4px",
            }}
          >
            Получить бесплатную консультацию
          </button>
        </form>
      )}
    </section>
  );
}
