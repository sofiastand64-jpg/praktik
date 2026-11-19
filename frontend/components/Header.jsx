// components/Header.jsx
"use client";

import Link from "next/link";
import { useCart } from "../context/CartContext";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";

function SearchForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");

  const handleSearch = (e) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent("shoply-search", { detail: query }));
    if (query.trim()) {
      router.push(`/?q=${encodeURIComponent(query)}#catalog`);
    } else {
      router.push("/#catalog");
    }
  };

  return (
    <form className="search" role="search" onSubmit={handleSearch}>
      <input
        type="search"
        className="search__input"
        placeholder="Поиск товаров..."
        value={query}
        onChange={(e) => {
          const val = e.target.value;
          setQuery(val);
          window.dispatchEvent(
            new CustomEvent("shoply-search", { detail: val })
          );
        }}
      />
      <button
        type="submit"
        className="search__btn"
        aria-label="Поиск"
        style={{ color: "inherit" }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </button>
    </form>
  );
}

export default function Header() {
  const { cartCount } = useCart();

  return (
    <header className="header">
      <div className="container header__inner">
        <Link href="/" className="logo">
          <span className="logo__mark">S</span>
          <span className="logo__text">Shoply</span>
        </Link>

        <nav className="nav" aria-label="Основная навигация">
          <Link href="/" className="nav__link">
            Главная
          </Link>
          <Link href="/#catalog" className="nav__link">
            Каталог
          </Link>
          <Link href="/#categories" className="nav__link">
            Категории
          </Link>
        </nav>

        <div className="header__actions">
          <Suspense
            fallback={<div className="search" style={{ width: "240px" }}></div>}
          >
            <SearchForm />
          </Suspense>

          <Link href="/cart" className="btn btn--ghost cart-btn">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            <span className="cart-btn__count">{cartCount}</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
