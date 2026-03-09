"use client";

import { useState, useEffect, useRef } from 'react';
import { restaurants, categories, getRestaurantsByCategory, getFeaturedRestaurants } from '../lib/data/restaurants';
import { RestaurantCard } from '../components/RestaurantCard';
import { CategoryFilter } from '../components/CategoryFilter';
import { SooMrktSection } from '../components/SooMrktSection';
import { ArtisansSection } from '../components/ArtisansSection';
import { Button } from '../components/ui/Button';
import { useTheme } from '../lib/ThemeContext';

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('all');
  const { theme } = useTheme();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const displayedRestaurants = getRestaurantsByCategory(activeCategory);
  const featured = getFeaturedRestaurants();
  const isFiltering = activeCategory !== 'all';

  const sectionPad = isMobile ? '0 16px' : '0 40px';

  return (
    <div style={{ paddingBottom: 100 }}>

      {/* ═══════════════════════════════════════════════
          HERO SECTION — "The Soo Eats Local"
         ═══════════════════════════════════════════════ */}
      {!isFiltering && (
        <section style={{
          position: 'relative', paddingTop: isMobile ? 56 : 100,
          paddingBottom: isMobile ? 48 : 80,
          overflow: 'hidden', background: theme.bg,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          textAlign: 'center', transition: 'background 0.3s ease',
        }}>
          {/* Ambient glow */}
          <div style={{
            position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%, -50%)',
            width: isMobile ? 400 : 800, height: isMobile ? 300 : 500,
            background: theme.heroGlow, borderRadius: '50%', pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute', top: '60%', left: '20%',
            width: 300, height: 300,
            background: `radial-gradient(circle, ${theme.mode === 'dark' ? 'rgba(234,179,8,0.04)' : 'rgba(234,179,8,0.06)'} 0%, transparent 70%)`,
            borderRadius: '50%', pointerEvents: 'none',
          }} />

          <div style={{ position: 'relative', zIndex: 10, maxWidth: 800, padding: sectionPad }}>
            {/* Live badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '8px 20px', borderRadius: 100,
              background: theme.bgCard, border: `1px solid ${theme.border}`,
              fontSize: 12, fontWeight: 700, color: theme.textSecondary,
              letterSpacing: '0.05em', textTransform: 'uppercase',
              marginBottom: isMobile ? 24 : 36,
              boxShadow: theme.shadow,
              transition: 'all 0.3s ease',
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981', animation: 'pulse 2s infinite' }}></span>
              Now delivering in Sault Ste. Marie
            </div>

            {/* Main headline */}
            <h1 style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: isMobile ? 'clamp(38px, 12vw, 52px)' : 'clamp(56px, 8vw, 88px)',
              fontWeight: 700, letterSpacing: '-0.045em', lineHeight: 1.02,
              color: theme.text, marginBottom: isMobile ? 16 : 24,
              transition: 'color 0.3s ease',
            }}>
              The Soo{' '}
              <span style={{
                background: `linear-gradient(135deg, #eab308, #f59e0b, #d97706)`,
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>eats local.</span>
            </h1>

            <p style={{
              fontSize: isMobile ? 16 : 20, lineHeight: 1.6,
              color: theme.textMuted, maxWidth: 560,
              margin: `0 auto ${isMobile ? 28 : 40}px`,
              fontWeight: 400, letterSpacing: '-0.01em',
            }}>
              Skip the corporations. Support the Soo. Your favorite local restaurants and market vendors, delivered with zero middlemen.
            </p>

            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button size={isMobile ? 'md' : 'lg'} style={{ padding: isMobile ? '14px 28px' : '16px 36px', borderRadius: 16 }}>
                Order Now
              </Button>
              <Button variant="outline" size={isMobile ? 'md' : 'lg'} style={{ padding: isMobile ? '14px 28px' : '16px 36px', borderRadius: 16 }}>
                Explore Market
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════
          STATS BAR — Social proof
         ═══════════════════════════════════════════════ */}
      {!isFiltering && (
        <section style={{
          background: theme.bgAlt,
          borderTop: `1px solid ${theme.borderSubtle}`,
          borderBottom: `1px solid ${theme.borderSubtle}`,
          transition: 'all 0.3s ease',
        }}>
          <div style={{
            maxWidth: 1440, margin: '0 auto', padding: sectionPad,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: isMobile ? 16 : 48,
            padding: isMobile ? '20px 16px' : '24px 40px',
            flexWrap: 'wrap',
          }}>
            {[
              { value: '18', label: 'Local Restaurants', icon: '🍽️' },
              { value: '13', label: 'Market Vendors', icon: '🧺' },
              { value: '0%', label: 'Corporate Ownership', icon: '✊' },
              { value: '100%', label: 'Soo Owned', icon: '🏠' },
            ].map((stat, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: isMobile ? 8 : 10,
                whiteSpace: 'nowrap',
              }}>
                <span style={{ fontSize: isMobile ? 16 : 20 }}>{stat.icon}</span>
                <div>
                  <span style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: isMobile ? 18 : 22, fontWeight: 800,
                    color: theme.text, letterSpacing: '-0.03em',
                  }}>{stat.value}</span>
                  <span style={{
                    fontSize: isMobile ? 11 : 13, color: theme.textFaint,
                    fontWeight: 500, marginLeft: 6,
                  }}>{stat.label}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Categories */}
      <section style={{
        position: 'sticky', top: isMobile ? 64 : 72, zIndex: 50,
        background: theme.categoryBg,
        backdropFilter: 'saturate(180%) blur(20px)', WebkitBackdropFilter: 'saturate(180%) blur(20px)',
        borderBottom: `1px solid ${theme.borderSubtle}`,
        padding: '4px 0', transition: 'background 0.3s ease',
      }}>
        <div style={{ maxWidth: 1440, margin: '0 auto', padding: sectionPad }}>
          <CategoryFilter categories={categories} activeCategory={activeCategory} onSelect={setActiveCategory} />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          FEATURED PICKS — Cinema-style hero card
         ═══════════════════════════════════════════════ */}
      {!isFiltering && featured.length > 0 && (
        <section style={{ padding: isMobile ? '40px 0' : '64px 0', background: theme.bgAlt, transition: 'background 0.3s ease' }}>
          <div style={{ maxWidth: 1440, margin: '0 auto', padding: sectionPad }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: isMobile ? 20 : 32 }}>
              <div>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  fontSize: 12, fontWeight: 700, color: theme.accent,
                  letterSpacing: '0.06em', textTransform: 'uppercase',
                  marginBottom: 8,
                }}>🔥 Trending Now</div>
                <h2 style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: isMobile ? 24 : 32, fontWeight: 700, letterSpacing: '-0.03em',
                  color: theme.text, marginBottom: 6,
                }}>Featured Picks</h2>
                <p style={{ fontSize: isMobile ? 13 : 15, color: theme.textMuted, fontWeight: 400 }}>
                  Hand-selected restaurants trending in the Soo right now
                </p>
              </div>
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : featured.length >= 3 ? '1.4fr 1fr 1fr' : 'repeat(auto-fill, minmax(340px, 1fr))',
              gap: isMobile ? 16 : 28,
            }}>
              {featured.slice(0, isMobile ? 3 : 5).map((restaurant, i) => (
                <div key={restaurant.id} style={{
                  gridRow: !isMobile && i === 0 && featured.length >= 3 ? '1 / 3' : 'auto',
                }}>
                  <RestaurantCard restaurant={restaurant} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════
          SOO MRKT — "Store Within a Store"
         ═══════════════════════════════════════════════ */}
      {!isFiltering && <SooMrktSection />}

      {/* ═══════════════════════════════════════════════
          LOCAL ARTISANS & CRAFTERS
         ═══════════════════════════════════════════════ */}
      {!isFiltering && <ArtisansSection />}

      {/* ═══════════════════════════════════════════════
          ALL RESTAURANTS
         ═══════════════════════════════════════════════ */}
      <section style={{ padding: isMobile ? '40px 0' : '64px 0', transition: 'background 0.3s ease' }}>
        <div style={{ maxWidth: 1440, margin: '0 auto', padding: sectionPad }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: isMobile ? 20 : 32 }}>
            <h2 style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: isMobile ? 24 : 32, fontWeight: 700, letterSpacing: '-0.03em',
              color: theme.text,
            }}>
              {isFiltering ? `${categories.find(c => c.id === activeCategory)?.name} Restaurants` : 'All Restaurants'}
            </h2>
            {!isFiltering && (
              <span style={{ fontSize: 14, color: theme.textFaint, fontWeight: 500 }}>
                {restaurants.length} spots
              </span>
            )}
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: isMobile ? 16 : 28,
          }}>
            {displayedRestaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
          {displayedRestaurants.length === 0 && (
            <div style={{ textAlign: 'center', padding: '80px 0' }}>
              <div style={{ fontSize: 64, marginBottom: 16 }}>🍽️</div>
              <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8, color: theme.text }}>No restaurants found</h3>
              <p style={{ color: theme.textMuted, marginBottom: 24 }}>Try selecting a different category.</p>
              <Button onClick={() => setActiveCategory('all')}>View all restaurants</Button>
            </div>
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          WHY LOCAL? — Manifesto Section
         ═══════════════════════════════════════════════ */}
      {!isFiltering && (
        <section style={{
          padding: isMobile ? '56px 0' : '80px 0',
          background: theme.mode === 'dark'
            ? 'linear-gradient(180deg, #09090b 0%, #111113 100%)'
            : 'linear-gradient(180deg, #fafafa 0%, #f5f0eb 100%)',
          borderTop: `1px solid ${theme.borderSubtle}`,
          transition: 'all 0.3s ease',
        }}>
          <div style={{ maxWidth: 1440, margin: '0 auto', padding: sectionPad }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
              gap: isMobile ? 32 : 64,
              alignItems: 'center',
            }}>
              {/* Left — Manifesto */}
              <div>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  fontSize: 12, fontWeight: 700, color: theme.accent,
                  letterSpacing: '0.06em', textTransform: 'uppercase',
                  marginBottom: 16,
                }}>✊ Our Manifesto</div>
                <h2 style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: isMobile ? 28 : 40, fontWeight: 700,
                  letterSpacing: '-0.03em', color: theme.text,
                  lineHeight: 1.1, marginBottom: 20,
                }}>
                  Why local?{' '}
                  <span style={{ color: theme.textFaint }}>Because the Soo deserves better.</span>
                </h2>
                <p style={{
                  fontSize: isMobile ? 15 : 17, color: theme.textMuted,
                  lineHeight: 1.7, maxWidth: 480, marginBottom: 0,
                }}>
                  Every dollar you spend on SOOber Eats stays in Sault Ste. Marie. We&apos;re not a Silicon Valley app extracting 30% from local restaurants. We&apos;re your neighbours, building something that actually serves this community.
                </p>
              </div>

              {/* Right — Benefit Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: isMobile ? 10 : 14 }}>
                {[
                  { emoji: '💰', title: 'Keep $ Local', desc: 'Your money stays in the Soo. Not Silicon Valley.' },
                  { emoji: '🤝', title: 'Real Relationships', desc: 'Know who makes your food by name.' },
                  { emoji: '🥬', title: 'Fresher Food', desc: 'Local farms. Local kitchens. Shorter supply chains.' },
                  { emoji: '🚫', title: 'Zero Middlemen', desc: 'No corporate fees eating into local business profits.' },
                ].map((benefit) => (
                  <div key={benefit.title} style={{
                    background: theme.bgCard,
                    border: `1px solid ${theme.borderSubtle}`,
                    borderRadius: isMobile ? 16 : 20,
                    padding: isMobile ? '18px 14px' : '24px 20px',
                    transition: 'all 0.3s ease',
                  }}>
                    <div style={{ fontSize: isMobile ? 24 : 28, marginBottom: isMobile ? 8 : 12 }}>{benefit.emoji}</div>
                    <h4 style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: isMobile ? 14 : 16, fontWeight: 700,
                      color: theme.text, marginBottom: 6,
                      letterSpacing: '-0.01em',
                    }}>{benefit.title}</h4>
                    <p style={{
                      fontSize: isMobile ? 12 : 13, color: theme.textMuted,
                      lineHeight: 1.4, margin: 0,
                    }}>{benefit.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════
          FOOTER
         ═══════════════════════════════════════════════ */}
      <footer style={{
        borderTop: `1px solid ${theme.borderSubtle}`,
        padding: isMobile ? '32px 16px' : '48px 40px',
        background: theme.bg,
        transition: 'all 0.3s ease',
      }}>
        <div style={{
          maxWidth: 1440, margin: '0 auto',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'center' : 'flex-start',
          justifyContent: 'space-between',
          gap: isMobile ? 24 : 0,
          textAlign: isMobile ? 'center' : 'left',
        }}>
          <div>
            <div style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 18, fontWeight: 700,
              color: theme.text, letterSpacing: '-0.02em',
              marginBottom: 8,
            }}>
              Soober<span style={{ color: theme.textFaint }}> Eats</span>
            </div>
            <p style={{
              fontSize: 13, color: theme.textMuted,
              lineHeight: 1.5, maxWidth: 300,
            }}>
              The Soo&apos;s local food delivery platform. Built in Sault Ste. Marie, for Sault Ste. Marie.
            </p>
          </div>
          <div style={{
            display: 'flex', gap: isMobile ? 20 : 32,
            fontSize: 13, fontWeight: 500, color: theme.textFaint,
          }}>
            <span>Restaurants</span>
            <span>Soo MRKT</span>
            <span>About</span>
            <span>Contact</span>
          </div>
          <p style={{
            fontSize: 12, color: theme.textFaint,
            fontWeight: 400,
          }}>
            © 2026 SOOber Eats · Sault Ste. Marie, ON
          </p>
        </div>
      </footer>
    </div>
  );
}
