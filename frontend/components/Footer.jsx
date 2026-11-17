// components/Footer.jsx
import Link from 'next/link';

async function getGlobalSettings() {
  try {
    // Используем точный адрес с двойкой на конце
    const res = await fetch('http://127.0.0.1:1337/api/global-settings2', { cache: 'no-store' });
    if (!res.ok) return null;
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("Ошибка загрузки настроек:", error);
    return null;
  }
}

export default async function Footer() {
  const settings = await getGlobalSettings();

  // Берем данные из базы. Если их нет — показываем старые (заглушки)
  const phone = settings?.phone || '8 800 000-00-00';
  const email = settings?.email || 'hello@shoply.ru';
  const description = settings?.description || 'Маркетплейс гаджетов и электроники.';

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__col">
          <Link href="/" className="logo logo--footer">
            <span className="logo__mark">S</span>
            <span className="logo__text">Shoply</span>
          </Link>
          <p className="footer__text">{description}</p>
        </div>
        <div className="footer__col">
          <h4 className="footer__title">Магазин</h4>
          <ul className="footer__list">
            <li><Link href="#catalog">Каталог</Link></li>
            <li><Link href="#categories">Категории</Link></li>
            <li><Link href="#">Акции</Link></li>
          </ul>
        </div>
        <div className="footer__col">
          <h4 className="footer__title">Помощь</h4>
          <ul className="footer__list">
            <li><Link href="#">Доставка</Link></li>
            <li><Link href="#">Оплата</Link></li>
            <li><Link href="#">Возврат</Link></li>
          </ul>
        </div>
        <div className="footer__col">
          <h4 className="footer__title">Контакты</h4>
          <ul className="footer__list">
            <li><Link href={`tel:${phone}`}>{phone}</Link></li>
            <li><Link href={`mailto:${email}`}>{email}</Link></li>
          </ul>
        </div>
      </div>
      <div className="container footer__bottom">
        <span>© 2025 Shoply. Все права защищены.</span>
      </div>
    </footer>
  );
}