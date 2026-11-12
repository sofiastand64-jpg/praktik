// app/page.js
import { Suspense } from "react";
import Link from "next/link";
import AddToCartButton from "../components/AddToCartButton";

const MOCK_CATEGORIES = [
  { id: 1, title: "Наушники", slug: "headphones", icon: "🎧" },
  { id: 2, title: "Смарт-часы", slug: "watches", icon: "⌚" },
  { id: 3, title: "Аксессуары", slug: "accessories", icon: "🔌" },
];

const MOCK_PRODUCTS = [
  {
    id: 1,
    title: "Беспроводные наушники Studio Pro",
    slug: "studio-pro",
    price: 12990,
    badge: "Хит",
    category: { id: 1, title: "Наушники", slug: "headphones" },
  },
  {
    id: 2,
    title: "Умные часы Series X",
    slug: "watch-series-x",
    price: 18500,
    badge: "-15%",
    category: { id: 2, title: "Смарт-часы", slug: "watches" },
  },
  {
    id: 3,
    title: "Быстрая зарядка GaN 65W",
    slug: "gan-charger-65w",
    price: 3490,
    badge: null,
    category: { id: 3, title: "Аксессуары", slug: "accessories" },
  },
];

async function getProducts(query, categorySlug) {
  try {
    let filters = "";
    if (query) {
      filters += `&filters[title][$containsi]=${query}`;
    }
    if (categorySlug) {
      // Проверяем: если categorySlug - это число (id), фильтруем по id. Если текст - по slug.
      if (!isNaN(categorySlug)) {
        filters += `&filters[category][id][$eq]=${categorySlug}`;
      } else {
        filters += `&filters[category][slug][$eq]=${categorySlug}`;
      }
    }

    const res = await fetch(
      `http://127.0.0.1:1337/api/products?populate=*${filters}`,
      { cache: "no-store" }
    );
    if (!res.ok) throw new Error("Ошибка загрузки");
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("Ошибка в getProducts:", error);
    return MOCK_PRODUCTS.filter((item) => {
      const matchesQuery = query
        ? item.title.toLowerCase().includes(query.toLowerCase())
        : true;
      const matchesCategory = categorySlug
        ? item.category?.slug === categorySlug ||
          String(item.category?.id) === String(categorySlug)
        : true;
      return matchesQuery && matchesCategory;
    });
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
    return MOCK_CATEGORIES;
  }
}

async function CategoriesList() {
  const categories = await getCategories();
  return (
    <div className="categories">
      {categories.map((cat) => (
        // Если slug пустой, используем id категории
        <Link
          href={`/?category=${cat.slug || cat.id}`}
          key={cat.id}
          className="category-card"
        >
          <span className="category-card__icon">{cat.icon}</span>
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
        Товары не найдены. Убедитесь, что они привязаны к этой категории и
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
