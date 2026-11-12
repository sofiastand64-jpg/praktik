// app/product/[slug]/page.js
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import ProductInteractiveControls from "../../../components/ProductInteractiveControls";

const MOCK_PRODUCTS = [
  {
    id: 1,
    title: "Беспроводные наушники Studio Pro",
    slug: "studio-pro",
    price: 12990,
    description:
      "Полноразмерные беспроводные наушники с активным шумоподавлением и автономностью до 30 часов.",
    category: { id: 1, title: "Наушники", slug: "headphones" },
  },
  {
    id: 2,
    title: "Умные часы Series X",
    slug: "watch-series-x",
    price: 18500,
    description:
      "Смарт-часы с ярким AMOLED-экраном, датчиком пульса, GPS и влагозащитой.",
    category: { id: 2, title: "Смарт-часы", slug: "watches" },
  },
  {
    id: 3,
    title: "Быстрая зарядка GaN 65W",
    slug: "gan-charger-65w",
    price: 3490,
    description:
      "Компактное сетевое зарядное устройство на основе нитрида галлия с поддержкой Power Delivery.",
    category: { id: 3, title: "Аксессуары", slug: "accessories" },
  },
];

async function getProduct(slugOrId) {
  try {
    const url = new URL("http://127.0.0");
    url.searchParams.append("filters[slug][$eq]", slugOrId);
    url.searchParams.append("populate", "*");

    const res = await fetch(url.toString(), {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Ошибка загрузки");
    const data = await res.json();
    if (!data.data || data.data.length === 0) return null;
    return data.data[0];
  } catch (error) {
    return (
      MOCK_PRODUCTS.find(
        (item) => item.slug === slugOrId || String(item.id) === String(slugOrId)
      ) || null
    );
  }
}

async function ProductDetails({ paramsPromise }) {
  const resolvedParams = await paramsPromise;
  const product = await getProduct(resolvedParams.slug);

  if (!product) {
    notFound();
  }

  const imageUrl = product.image
    ? `http://127.0.0.1:1337${product.image.url}`
    : "https://placehold.co";

  return (
    <section className="product">
      <div className="container product__inner">
        <div className="product__gallery">
          <div className="product__main-img">
            <img src={imageUrl} alt={product.title} />
          </div>
        </div>
        <div className="product__info">
          <span className="product__category">
            {product.category ? product.category.title : "Товар"}
          </span>
          <h1 className="product__title">{product.title}</h1>

          <div className="product__meta">
            <span className="product__in-stock">✓ В наличии</span>
          </div>

          <div className="product__price">{product.price} ₽</div>
          <p className="product__desc">{product.description}</p>

          <ProductInteractiveControls product={product} />

          <div className="product__delivery">
            <span>🚚 Бесплатная доставка от 3000 ₽</span>
            <span>🛡 Гарантия 12 месяцев</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function ProductPage({ params }) {
  return (
    <main>
      <div className="container">
        <nav className="breadcrumbs" aria-label="Хлебные крошки">
          <Link href="/">Главная</Link>
          <span>/</span>
          <Link href="/#catalog">Каталог</Link>
          <span>/</span>
          <span className="breadcrumbs__current">Товар</span>
        </nav>
      </div>

      <Suspense
        fallback={
          <div style={{ textAlign: "center", padding: "50px" }}>
            Загрузка товара...
          </div>
        }
      >
        <ProductDetails paramsPromise={params} />
      </Suspense>
    </main>
  );
}
