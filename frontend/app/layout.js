// app/layout.js
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { CartProvider } from "../context/CartContext";
import { Suspense } from "react"; // Добавили импорт

export const metadata = {
  title: "Shoply — маркетплейс гаджетов",
  description: "Гаджеты, аксессуары и электроника",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>
        <CartProvider>
          <Header />
          <main>{children}</main>
          {/* Обернули футер в Suspense */}
          <Suspense
            fallback={
              <div style={{ padding: "50px", textAlign: "center" }}>
                Загрузка подвала...
              </div>
            }
          >
            <Footer />
          </Suspense>
        </CartProvider>
      </body>
    </html>
  );
}
