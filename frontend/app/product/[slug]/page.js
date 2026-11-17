import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import ProductInteractiveControls from "../../../components/ProductInteractiveControls";
import { Truck, ShieldCheck } from "lucide-react";

async function getProduct(slugOrId) {
  try {
    const res = await fetch(
      `http://127.0.0.1:1337/api/products?filters[$or][0][slug][$eq]=${slugOrId}&filters[$or][1][id][$eq]=${slugOrId}&populate=*`,
      {
        cache: "no-store",
      },
    );
    if (!res.ok) throw new Error("Ошибка загрузки");
    const data = await res.json();
    if (!data.data || data.data.length === 0) return null;
    return data.data[0];
  } catch (error) {
    console.error(error);
    return null;
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
    : "https://placehold.co/600x600/f0f4ff/6366f1?text=No+Image";

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
            <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Truck size={18} /> Бесплатная доставка от 3000 ₽
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <ShieldCheck size={18} /> Гарантия 12 месяцев
            </span>
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
