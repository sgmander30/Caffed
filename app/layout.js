import "./globals.css";
import { CartProvider } from "../components/CartContext";

export const metadata = {
  title: "Caffed | Premium Coffee Experience",
  description: "A bold, modern coffee brand landing page built with Tailwind CSS.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-brand-black text-white font-body antialiased">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
