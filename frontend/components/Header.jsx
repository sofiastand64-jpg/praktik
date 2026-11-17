"use client";

import Link from 'next/link';
import { useCart } from '../context/CartContext';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, Suspense } from 'react';
import { Search, ShoppingCart } from 'lucide-react';

function SearchForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/?q=${encodeURIComponent(query)}`);
    } else {
      router.push('/');
    }
  };

  return (
    <form className="search" role="search" onSubmit={handleSearch}>
      <input 
        type="search" 
        className="search__input" 
        placeholder="Поиск товаров..." 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit" className="search__btn">
        <Search size={18} color="#6b7280" />
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
          <Link href="/" className="nav__link">Главная</Link>
          <Link href="/#catalog" className="nav__link">Каталог</Link>
          <Link href="/#categories" className="nav__link">Категории</Link>
        </nav>

        <div className="header__actions">
          <Suspense fallback={<div className="search" style={{width: '240px'}}></div>}>
            <SearchForm />
          </Suspense>
          
          <Link href="/cart" className="btn btn--ghost cart-btn">
            <ShoppingCart size={20} />
            <span className="cart-btn__count">{cartCount}</span>
          </Link>
        </div>
      </div>
    </header>
  );
}