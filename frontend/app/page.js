import { Suspense } from "react";
import Link from "next/link";
import AddToCartButton from "../components/AddToCartButton";
// Добавили больше иконок для разных категорий
import {
  Headphones,
  Watch,
  Glasses,
  Package,
  Keyboard,
  Mouse,
  Smartphone,
  Laptop,
  Gamepad2,
} from "lucide-react";

async function getProducts(query, categorySlug) {
  try {
    let filters = "";
    if (query) {
      filters += `&filters[title][$containsi]=${query}`;
    }
    if (categorySlug) {
      if (!isNaN(categorySlug)) {
        filters += `&filters[category][id][$eq]=${categorySlug}`;
      } else {
        filters += `&filters[category][slug][$eq]=${categorySlug}`;
      }
    }

    const res = await fetch(
      `http://127.0.0.1:1337/api/products?populate=*${filters}`,
      { cache: "no-store" },
    );
    if (!res.ok) throw new Error("Ошибка загрузки");
    const data = await res.json();
    return data.data;
  } catch (error) {
    return [];
  }
}

async function getCategories() {
  try {
    const res = await fetch("http://127.0.0.1:1337/api/categories", {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Ошибка");
    const data = await res.json();
    return data.data;
  } catch (error) {
    return [];
  }
}

async function CategoriesList() {
  const categories = await getCategories();

  // Улучшенная функция: проверяет и slug, и название (на русском и английском)
  const getCategoryIcon = (slug, title) => {
    const s = (slug || "").toLowerCase();
    const t = (title || "").toLowerCase();

    // Аудио
    if (s.includes("audio") || t.includes("аудио") || t.includes("audio"))
      return <Headphones size={32} />;
    // Часы
    if (s.includes("watch") || t.includes("час") || t.includes("watch"))
      return <Watch size={32} />;
    // Аксессуары
    if (s.includes("access") || t.includes("аксесс") || t.includes("access"))
      return <Glasses size={32} />;
    // Периферия / Клавиатуры
    if (
      s.includes("peripher") ||
      t.includes("перифер") ||
      t.includes("клавиатур") ||
      t.includes("keyboard")
    )
      return <Keyboard size={32} />;
    // Мыши
    if (s.includes("mouse") || t.includes("мыш")) return <Mouse size={32} />;
    // Смартфоны
    if (s.includes("phone") || t.includes("телефон") || t.includes("смартфон"))
      return <Smartphone size={32} />;
    // Ноутбуки / ПК
    if (
      s.includes("laptop") ||
      t.includes("ноутбук") ||
      t.includes("компьютер")
    )
      return <Laptop size={32} />;
    // Игры
    if (s.includes("game") || t.includes("игр")) return <Gamepad2 size={32} />;

    // Если ничего не подошло — иконка коробки
    return <Package size={32} />;
  };

  return (
    <div className="categories">
      {categories.map((cat) => (
        <Link
          href={`/?category=${cat.slug || cat.id}`}
          key={cat.id}
          className="category-card"
        >
          <span
            className="category-card__icon"
            style={{ color: "var(--primary)", marginBottom: "12px" }}
          >
            {/* Передаем и slug, и title */}
            {getCategoryIcon(cat.slug, cat.title)}
          </span>
          <span className="category-card__title">{cat.title}</span>
          <span className="category-card__count">Смотреть товары</span>
        </Link>
      ))}
    </div>
  );
}

async function ProductsList({ query, categorySlug }) {
  const products = await getProducts(query, categorySlug);

  if (products.length === 0) {
    return (
      <p>
        Товары не найдены. Убедитесь, что они привязаны к категории и
        опубликованы в Strapi.
      </p>
    );
  }

  return (
    <div className="products">
      {products.map((product) => {
        const imageUrl = product.image
          ? `http://127.0.0.1:1337${product.image.url}`
          : "https://placehold.co/600x600/f0f4ff/6366f1?text=No+Image";
        return (
          <article key={product.id} className="product-card">
            <Link
              href={`/product/${product.slug || product.id}`}
              className="product-card__media"
            >
              <img
                src={imageUrl}
                alt={product.title}
                className="product-card__img"
              />
              {product.badge && (
                <span className="product-card__badge product-card__badge--sale">
                  {product.badge}
                </span>
              )}
            </Link>
            <div className="product-card__body">
              <span className="product-card__category">
                {product.category ? product.category.title : "Товар"}
              </span>
              <h3 className="product-card__title">
                <Link href={`/product/${product.slug || product.id}`}>
                  {product.title}
                </Link>
              </h3>
              <div className="product-card__footer">
                <span className="product-card__price">{product.price} ₽</span>
                <AddToCartButton product={product} />
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}

async function HomeContent({ searchParams }) {
  const resolvedParams = await searchParams;
  const currentQuery = resolvedParams?.q || "";
  const currentCategory = resolvedParams?.category || "";

  return (
    <>
      {!currentQuery && !currentCategory && (
        <section id="categories" className="section">
          <div className="container">
            <header className="section__head">
              <h2 className="section__title">Категории</h2>
            </header>
            <Suspense fallback={<p>Загрузка категорий...</p>}>
              <CategoriesList />
            </Suspense>
          </div>
        </section>
      )}

      <section id="catalog" className="section section--alt">
        <div className="container">
          <header className="section__head">
            <h2 className="section__title">
              {currentQuery
                ? `Результаты поиска: "${currentQuery}"`
                : currentCategory
                  ? "Товары в категории"
                  : "Популярные товары"}
            </h2>
            {currentCategory && (
              <Link href="/" className="section__link">
                Сбросить фильтр ✕
              </Link>
            )}
          </header>
          <Suspense
            key={currentQuery + currentCategory}
            fallback={<p>Загрузка товаров...</p>}
          >
            <ProductsList query={currentQuery} categorySlug={currentCategory} />
          </Suspense>
        </div>
      </section>
    </>
  );
}

export default function Home({ searchParams }) {
  return (
    <>
      <section className="hero">
        <div className="container hero__inner">
          <div className="hero__content">
            <span className="badge">Новая коллекция 2025</span>
            <h1 className="hero__title">
              Технологии, которые делают жизнь проще
            </h1>
            <p className="hero__text">
              Гаджеты, аксессуары и электроника от проверенных брендов.
            </p>
            <div className="hero__actions">
              <Link href="#catalog" className="btn btn--primary">
                Перейти в каталог
              </Link>
            </div>
          </div>
          <div className="hero__visual">
            <img
              src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop"
              alt=""
              className="hero__image"
            />
          </div>
        </div>
      </section>

      <Suspense fallback={<p>Загрузка...</p>}>
        <HomeContent searchParams={searchParams} />
      </Suspense>
    </>
  );
}
