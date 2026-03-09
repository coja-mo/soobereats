import { Inter, DM_Sans } from 'next/font/google';
import './globals.css';
import { Navigation } from '../components/Navigation';
import { CartProvider } from '../lib/CartContext';
import { ThemeProvider } from '../lib/ThemeContext';
import { CartPanel } from '../components/CartPanel';
import { ThemedBody } from '../components/ThemedBody';
import { PinGate } from '../components/PinGate';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
});

export const metadata = {
  title: 'Soober Eats | Premium Food Delivery',
  description: 'The Soo\'s premium food delivery platform. Your favorite local restaurants, delivered with obsessive attention to detail.',
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${dmSans.variable}`}>
      <body style={{ margin: 0, padding: 0 }}>
        <PinGate>
          <ThemeProvider>
            <CartProvider>
              <ThemedBody>
                <Navigation />
                <CartPanel />
                <main style={{ paddingTop: 72 }}>
                  {children}
                </main>
              </ThemedBody>
            </CartProvider>
          </ThemeProvider>
        </PinGate>
      </body>
    </html>
  );
}
