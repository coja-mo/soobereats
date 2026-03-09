import { Inter, DM_Sans } from 'next/font/google';
import './globals.css';
import { Navigation } from '../components/Navigation';
import { CartProvider } from '../lib/CartContext';
import { ThemeProvider } from '../lib/ThemeContext';
import { LiveOrderProvider } from '../lib/LiveOrderContext';
import { CartPanel } from '../components/CartPanel';
import { ThemedBody } from '../components/ThemedBody';
import { PinGate } from '../components/PinGate';
import { CookieConsent } from '../components/CookieConsent';
import { ScrollRestoration } from '../components/ScrollRestoration';
import AIChatWidget from '../components/AIChatWidget';
import { ToastProvider } from '../components/ToastProvider';

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
  title: 'Soobér | Premium Food Delivery',
  description: 'The Soo\'s premium food delivery platform. Your favorite local restaurants, delivered with obsessive attention to detail.',
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${dmSans.variable}`}>
      <body style={{ margin: 0, padding: 0 }}>
        <PinGate>
          <ThemeProvider>
            <LiveOrderProvider>
              <CartProvider>
                <ThemedBody>
                  <ToastProvider>
                    <ScrollRestoration />
                    <Navigation />
                    <CartPanel />
                    <main style={{ paddingTop: 72 }}>
                      {children}
                    </main>
                    <CookieConsent />
                    <AIChatWidget />
                  </ToastProvider>
                </ThemedBody>
              </CartProvider>
            </LiveOrderProvider>
          </ThemeProvider>
        </PinGate>
      </body>
    </html>
  );
}
