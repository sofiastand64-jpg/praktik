"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  const router = useRouter();

  const goToSection = (e, sectionId) => {
    e.preventDefault();
    if (pathname === "/") {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }
    router.push(`/#${sectionId}`);
  };

  const linkStyle = {
    fontSize: "14px",
    lineHeight: "1.45",
    color: "#cbd5e1",
    textDecoration: "none",
    display: "inline-block",
  };

  return (
    <footer
      style={{
        marginTop: "auto",
        background: "#1e1e1e",
        color: "#e2e8f0",
        borderTop: "1px solid #333333",
      }}
    >
      <div
        style={{
          maxWidth: "1240px",
          margin: "0 auto",
          padding: "48px 24px 36px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "48px",
        }}
      >
        <div>
          <h4
            style={{
              fontSize: "15px",
              fontWeight: "700",
              color: "#ffffff",
              margin: "0 0 14px",
              paddingBottom: "12px",
              borderBottom: "1px solid #3a3a3a",
            }}
          >
            Компания
          </h4>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            <Link href="/info/about" style={linkStyle}>
              О компании
            </Link>
            <a
              href="#market-news"
              onClick={(e) => goToSection(e, "market-news")}
              style={linkStyle}
            >
              Новости рынка: чипы и аудио
            </a>
            <Link href="/info/partners" style={linkStyle}>
              Партнерам (аренда, сотрудничество)
            </Link>
            <Link href="/info/vacancies" style={linkStyle}>
              Вакансии
            </Link>
            <Link href="/info/privacy" style={linkStyle}>
              Политика компании в отношении обработки персональных данных
            </Link>
            <Link href="/info/sales-rules" style={linkStyle}>
              Правила продаж
            </Link>
            <Link href="/info/terms" style={linkStyle}>
              Правила пользования сайта
            </Link>
            <Link href="/info/recommendations" style={linkStyle}>
              На информационном ресурсе применяются рекомендательные технологии
            </Link>
            <Link href="/info/service-centers" style={linkStyle}>
              Сервисные центры
            </Link>
          </div>
        </div>
        <div style={{ gridColumn: "span 2" }}>
          <h4
            style={{
              fontSize: "15px",
              fontWeight: "700",
              color: "#ffffff",
              margin: "0 0 14px",
              paddingBottom: "12px",
              borderBottom: "1px solid #3a3a3a",
            }}
          >
            Покупателям
          </h4>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
              gap: "24px",
            }}
          >
            <div
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              <Link href="/info/how-to-order" style={linkStyle}>
                Как оформить заказ
              </Link>
              <Link href="/info/payment" style={linkStyle}>
                Способы оплаты
              </Link>
              <Link href="/info/credits" style={linkStyle}>
                Кредиты и рассрочка
              </Link>
              <Link href="/info/delivery" style={linkStyle}>
                Доставка
              </Link>
              <Link href="/profile" style={linkStyle}>
                Статус заказа
              </Link>
              <Link href="/info/warranty" style={linkStyle}>
                Обмен, возврат, гарантия
              </Link>
              <Link href="/info/repair-status" style={linkStyle}>
                Проверка статуса ремонта
              </Link>
            </div>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              <Link href="/info/b2b" style={linkStyle}>
                Юридическим лицам
              </Link>
              <Link href="/info/invoice-check" style={linkStyle}>
                Проверка счета
              </Link>
              <Link href="/info/corporate" style={linkStyle}>
                Корпоративные отделы
              </Link>
              <Link href="/info/gift-cards" style={linkStyle}>
                Подарочные карты
              </Link>
              <Link href="/profile" style={linkStyle}>
                Бонусная программа и профиль
              </Link>
              <a
                href="#sales"
                onClick={(e) => goToSection(e, "sales")}
                style={linkStyle}
              >
                Акции и товары дня
              </a>
              <a
                href="#consultation"
                onClick={(e) => goToSection(e, "consultation")}
                style={linkStyle}
              >
                Подбор гарнитуры и обратная связь
              </a>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          maxWidth: "1240px",
          margin: "0 auto",
          padding: "18px 24px 28px",
          borderTop: "1px solid #333333",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "12px",
          fontSize: "13px",
          color: "#94a3b8",
        }}
      >
        <span>© 2026 Shoply • Магазин гарнитур и умных аксессуаров</span>
        <div style={{ display: "flex", gap: "18px", alignItems: "center" }}>
          <a
            href="#catalog"
            onClick={(e) => goToSection(e, "catalog")}
            style={{ color: "#94a3b8", textDecoration: "none" }}
          >
            Каталог
          </a>
          <a
            href="#categories"
            onClick={(e) => goToSection(e, "categories")}
            style={{ color: "#94a3b8", textDecoration: "none" }}
          >
            Категории
          </a>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            style={{
              background: "#2d2d2d",
              border: "1px solid #444444",
              borderRadius: "8px",
              padding: "6px 12px",
              color: "#ffffff",
              fontSize: "12px",
              fontWeight: "700",
              cursor: "pointer",
            }}
          >
            Наверх ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
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
</Link>;
