import Link from "next/link";
import ProductIcon from "@/components/ProductIcon";

const PRODUCT_DETAILS = {
  "gan-65w": {
    slug: "gan-65w",
    title: "Быстрая зарядка GaN 65W Pro",
    category: "АКСЕССУАРЫ",
    badge: "ВЫБОР ПОКУПАТЕЛЕЙ",
    badgeColor: "#4f46e5",
    price: 3490,
    oldPrice: null,
    rating: 5.0,
    reviews: 215,
    icon: "charger",
    bgGradient: "linear-gradient(135deg, #7c2d12 0%, #c2410c 100%)",
    shortDesc:
      "Компактный сетевой адаптер на нитриде галлия (GaN III) мощностью 65 Вт для одновременной быстрой зарядки ноутбука, смартфона и беспроводных наушников без перегрева.",
    features: [
      "Интеллектуальное распределение мощности между 3 портами (2×USB-C + 1×USB-A)",
      "Поддержка протоколов Power Delivery 3.0, PPS, Quick Charge 4+ и Super Fast Charging",
      "Многоуровневая защита от перенапряжения, короткого замыкания и перегрева",
      "Складная евровилка и корпус на 40% меньше стандартных блоков на 65 Вт",
    ],
    specs: [
      {
        name: "Максимальная мощность",
        value: "65 Вт (до 65 Вт на один порт USB-C)",
      },
      { name: "Разъёмы", value: "2 × USB Type-C, 1 × USB Type-A" },
      { name: "Технология транзисторов", value: "GaN III (нитрид галлия)" },
      {
        name: "Комплектация",
        value: "Адаптер питания, документация, гарантийный талон 12 мес.",
      },
    ],
  },
  "studio-pro": {
    slug: "studio-pro",
    title: "Беспроводные наушники Studio Pro",
    category: "НАУШНИКИ",
    badge: "ХИТ",
    badgeColor: "#ef4444",
    price: 12990,
    oldPrice: 15990,
    rating: 4.9,
    reviews: 142,
    icon: "headphones",
    bgGradient: "linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)",
    shortDesc:
      "Полноразмерная беспроводная гарнитура студийного класса с гибридным активным шумоподавлением (ANC до -45 дБ), 40-мм динамическими драйверами и автономностью до 36 часов.",
    features: [
      "Гибридное шумоподавление ANC с 6 микрофонами и режимом прозрачности",
      "Поддержка кодеков Hi-Res Audio (LDAC / AAC) и проводного подключения по USB-C / 3.5 мм",
      "Мягкие амбушюры из пены с эффектом памяти для комфорта при работе весь день",
      "Мультипоинт-подключение одновременно к ноутбуку и смартфону по Bluetooth 5.4",
    ],
    specs: [
      { name: "Излучатели", value: "40 мм с титановым напылением" },
      { name: "Автономность", value: "До 36 часов (с ANC — до 28 часов)" },
      { name: "Беспроводной интерфейс", value: "Bluetooth 5.4, Multipoint" },
      {
        name: "Комплектация",
        value: "Наушники, жёсткий кейс, кабель USB-C, аудиокабель 3.5 мм",
      },
    ],
  },
  "usb-cable-100w": {
    slug: "usb-cable-100w",
    title: "Кабель USB-C 100W Nylon",
    category: "АКСЕССУАРЫ",
    badge: "БАЗА",
    badgeColor: "#4f46e5",
    price: 1190,
    oldPrice: null,
    rating: 4.9,
    reviews: 310,
    icon: "cable",
    bgGradient: "linear-gradient(135deg, #312e81 0%, #4338ca 100%)",
    shortDesc:
      "Усиленный кабель USB-C — USB-C длиной 2 метра со встроенным чипом E-Marker для безопасной передачи мощности до 100 Вт и высокой износостойкостью.",
    features: [
      "Встроенный смарт-чип E-Marker контролирует ток (до 5 А) и защищает аккумулятор устройства",
      "Плотная двухслойная нейлоновая оплётка выдерживает более 25 000 перегибов",
      "Алюминиевые коннекторы с усиленной защитой от заломов у основания",
      "Подходит для зарядки MacBook, игровых ноутбуков, планшетов и смартфонов",
    ],
    specs: [
      { name: "Пропускная мощность", value: "До 100 Вт (20 В / 5 А, PD 3.0)" },
      { name: "Длина кабеля", value: "2.0 метра" },
      { name: "Скорость передачи данных", value: "480 Мбит/с (USB 2.0)" },
      {
        name: "Материалы",
        value: "Нейлоновая оплётка, анодированный алюминий",
      },
    ],
  },
  "series-x": {
    slug: "series-x",
    title: "Умные часы Series X Titanium",
    category: "СМАРТ-ЧАСЫ",
    badge: "-15%",
    badgeColor: "#f97316",
    price: 18500,
    oldPrice: 21800,
    rating: 4.8,
    reviews: 98,
    icon: "watch",
    bgGradient: "linear-gradient(135deg, #064e3b 0%, #047857 100%)",
    shortDesc:
      'Флагманские смарт-часы в титановом корпусе с ярким LTPO AMOLED-дисплеем 1.96", двухдиапазонным GPS, датчиком ЭКГ и влагозащитой 5 ATM.',
    features: [
      'Яркий безрамочный AMOLED-экран 1.96" с функцией Always-On Display и сапфировым стеклом',
      "Круглосуточный мониторинг пульса, SpO2, уровня стресса, фаз сна и снятие ЭКГ",
      "Встроенный микрофон и динамик для приёма звонков по Bluetooth прямо с запястья",
      "До 14 дней работы без подзарядки в стандартном режиме",
    ],
    specs: [
      { name: "Дисплей", value: '1.96" AMOLED, 410×502 пикселей, 1000 нит' },
      {
        name: "Корпус и защита",
        value: "Титановый сплав, влагозащита 5 ATM / IP68",
      },
      {
        name: "Навигация и датчики",
        value: "GPS / ГЛОНАСС, ЭКГ, пульсоксиметр, барометр",
      },
      {
        name: "Комплектация",
        value: "Часы, титановый и силиконовый ремешки, магнитная зарядка",
      },
    ],
  },
  "soundbar-mini": {
    slug: "soundbar-mini",
    title: "Акустика SoundBar Mini",
    category: "НАУШНИКИ",
    badge: "-25%",
    badgeColor: "#ef4444",
    price: 7490,
    oldPrice: 9990,
    rating: 4.7,
    reviews: 64,
    icon: "speaker",
    bgGradient: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
    shortDesc:
      "Компактный настольный саундбар мощностью 40 Вт с двумя широкополосными динамиками и пассивными басовыми излучателями для чистого объёмного звука.",
    features: [
      "Мощный стереозвук 40 Вт (2×20 Вт) с тремя режимами эквалайзера: Игры, Кино, Музыка",
      "Универсальное подключение: Bluetooth 5.3 без задержек, AUX 3.5 мм и USB-аудио",
      "Лаконичный корпус шириной 42 см идеально помещается под монитор или телевизор",
      "Удобный поворотный регулятор громкости на боковой панели",
    ],
    specs: [
      { name: "Выходная мощность", value: "40 Вт RMS (стерео 2.0)" },
      { name: "Частотный диапазон", value: "55 Гц – 20 кГц" },
      { name: "Интерфейсы", value: "Bluetooth 5.3, AUX 3.5 мм, USB-C" },
      { name: "Габариты", value: "420 × 78 × 72 мм" },
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(PRODUCT_DETAILS).map((slug) => ({ slug }));
}
export default async function ProductDetailPage({ params }) {
  const { slug } = await params;
  const product = PRODUCT_DETAILS[slug] || PRODUCT_DETAILS["studio-pro"];

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
          marginBottom: "20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <Link
          href="/#catalog"
          style={{
            fontSize: "14px",
            fontWeight: "700",
            color: "#4f46e5",
            textDecoration: "none",
          }}
        >
          ← Назад в каталог
        </Link>
        <Link
          href="/cart"
          style={{
            fontSize: "14px",
            fontWeight: "700",
            color: "#059669",
            textDecoration: "none",
          }}
        >
          Перейти в корзину →
        </Link>
      </div>

      {/* Главная карточка товара: визуал слева + описание и цена справа */}
      <div
        style={{
          background: "#ffffff",
          borderRadius: "24px",
          border: "1px solid #e2e8f0",
          padding: "28px",
          boxShadow: "0 16px 36px rgba(15, 23, 42, 0.06)",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "32px",
          alignItems: "center",
        }}
      >
        {/* Визуальный блок товара (как на карточке, но крупный) */}
        <div
          style={{
            height: "340px",
            borderRadius: "20px",
            background: product.bgGradient,
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "16px",
            padding: "24px",
          }}
        >
          <span
            style={{
              position: "absolute",
              top: "16px",
              left: "16px",
              background: product.badgeColor,
              color: "#ffffff",
              fontSize: "12px",
              fontWeight: "800",
              padding: "6px 12px",
              borderRadius: "8px",
            }}
          >
            {product.badge}
          </span>

          <div
            style={{
              width: "100%",
              maxWidth: "280px",
              height: "220px",
              borderRadius: "20px",
              background: "#ffffff",
              padding: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 10px 25px rgba(0, 0, 0, 0.25)",
            }}
          >
            <img
              src={`/products/${product.slug}.png`}
              alt={product.title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                borderRadius: "12px",
              }}
            />
          </div>

          <span
            style={{
              fontSize: "12px",
              fontWeight: "700",
              color: "rgba(255,255,255,0.8)",
              letterSpacing: "0.06em",
            }}
          >
            ОРИГИНАЛ • ГАРАНТИЯ 12 МЕСЯЦЕВ
          </span>
        </div>

        {/* Правая колонка: заголовок, рейтинг, описание, цена */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            style={{
              fontSize: "12px",
              fontWeight: "800",
              color: "#4f46e5",
              letterSpacing: "0.05em",
            }}
          >
            {product.category} • ★ {product.rating} ({product.reviews} отзывов)
          </div>

          <h1
            style={{
              fontSize: "30px",
              fontWeight: "800",
              margin: 0,
              lineHeight: "1.2",
            }}
          >
            {product.title}
          </h1>

          <p
            style={{
              fontSize: "15px",
              color: "#475569",
              lineHeight: "1.65",
              margin: 0,
            }}
          >
            {product.shortDesc}
          </p>

          {/* Блок цены */}
          <div
            style={{
              padding: "18px 20px",
              borderRadius: "16px",
              background: "#f8fafc",
              border: "1px solid #e2e8f0",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "16px",
              marginTop: "4px",
            }}
          >
            <div>
              {product.oldPrice && (
                <div
                  style={{
                    fontSize: "14px",
                    color: "#94a3b8",
                    textDecoration: "line-through",
                    fontWeight: "600",
                  }}
                >
                  {product.oldPrice.toLocaleString("ru-RU")} ₽
                </div>
              )}
              <div
                style={{
                  fontSize: "28px",
                  fontWeight: "800",
                  color: "#4f46e5",
                }}
              >
                {product.price.toLocaleString("ru-RU")} ₽
              </div>
            </div>

            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <Link
                href="/#catalog"
                style={{
                  background: "#4f46e5",
                  color: "#ffffff",
                  padding: "12px 22px",
                  borderRadius: "12px",
                  fontSize: "14px",
                  fontWeight: "700",
                  textDecoration: "none",
                }}
              >
                Выбрать в каталоге
              </Link>
              <Link
                href="/#consultation"
                style={{
                  background: "#eef2ff",
                  color: "#4f46e5",
                  padding: "12px 18px",
                  borderRadius: "12px",
                  fontSize: "14px",
                  fontWeight: "700",
                  textDecoration: "none",
                }}
              >
                Задать вопрос
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Нижняя секция: ключевые преимущества + технические характеристики */}
      <div
        style={{
          marginTop: "24px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "24px",
        }}
      >
        <section
          style={{
            background: "#ffffff",
            borderRadius: "20px",
            border: "1px solid #e2e8f0",
            padding: "24px",
          }}
        >
          <h2
            style={{ fontSize: "19px", fontWeight: "800", margin: "0 0 14px" }}
          >
            Ключевые особенности
          </h2>
          <ul
            style={{
              margin: 0,
              paddingLeft: "20px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              fontSize: "14px",
              color: "#334155",
              lineHeight: "1.55",
            }}
          >
            {product.features.map((feat, i) => (
              <li key={i}>{feat}</li>
            ))}
          </ul>
        </section>

        <section
          style={{
            background: "#ffffff",
            borderRadius: "20px",
            border: "1px solid #e2e8f0",
            padding: "24px",
          }}
        >
          <h2
            style={{ fontSize: "19px", fontWeight: "800", margin: "0 0 14px" }}
          >
            Технические характеристики
          </h2>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            {product.specs.map((row, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "12px",
                  paddingBottom: "8px",
                  borderBottom: "1px solid #f1f5f9",
                  fontSize: "14px",
                }}
              >
                <span style={{ color: "#64748b" }}>{row.name}</span>
                <span style={{ fontWeight: "700", textAlign: "right" }}>
                  {row.value}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
