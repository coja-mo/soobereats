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
import { SplashWrapper } from '../components/SplashWrapper';
import { CommandPalette } from '../components/CommandPalette';
import { BackToTop } from '../components/BackToTop';

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
  metadataBase: new URL('https://soober.ca'),
  title: {
    default: 'Soobér | Local Food Delivery & Electric Rides in Sault Ste. Marie',
    template: '%s | Soobér',
  },
  description: 'Sault Ste. Marie\'s local delivery and mobility platform. 18+ restaurants, electric ride-hailing, Soo MRKT marketplace. 100% electric fleet, zero emissions, community-first.',
  keywords: ['food delivery', 'sault ste marie', 'electric rides', 'local delivery', 'soober', 'northern ontario', 'algoma district', 'ride hailing', 'soo mrkt', 'electric fleet'],
  authors: [{ name: 'Antigravity Solutions' }],
  creator: 'Antigravity Solutions',
  publisher: 'Soobér',
  openGraph: {
    type: 'website',
    locale: 'en_CA',
    url: 'https://soober.ca',
    siteName: 'Soobér',
    title: 'Soobér | Local Food Delivery & Electric Rides in Sault Ste. Marie',
    description: 'The Soo\'s local delivery and mobility platform. 18+ restaurants, ride-hailing, marketplace. 100% electric fleet.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Soobér | Local Food Delivery & Electric Rides',
    description: '100% electric delivery in Sault Ste. Marie. Local restaurants, rides, and marketplace.',
  },
  robots: {
    index: true,
    follow: true,
  },
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
                    <SplashWrapper>
                      <ScrollRestoration />
                      <Navigation />
                      <CartPanel />
                      <main style={{ paddingTop: 72 }}>
                        {children}
                      </main>
                      <CookieConsent />
                      <AIChatWidget />
                      <BackToTop />
                      <CommandPalette />
                    </SplashWrapper>
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
