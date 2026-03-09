"use client";

import { useState, useEffect, useRef } from 'react';
import { restaurants, categories, getRestaurantsByCategory, getFeaturedRestaurants } from '../lib/data/restaurants';
import { RestaurantCard } from '../components/RestaurantCard';
import { RestaurantCarousel } from '../components/RestaurantCarousel';
import { CategoryFilter } from '../components/CategoryFilter';
import { SooMrktSection } from '../components/SooMrktSection';
import { ArtisansSection } from '../components/ArtisansSection';
import { Button } from '../components/ui/Button';
import { useTheme } from '../lib/ThemeContext';
import Link from 'next/link';

export default function Home() {
  const { theme, isDark, toggleTheme } = useTheme();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const featured = getFeaturedRestaurants();

  const sectionPad = isMobile ? '0 16px' : '0 40px';

  return (
    <div style={{ paddingBottom: 100 }}>

      {/* ═══════════════════════════════════════════════
          HERO SECTION — "The Soo Eats Local"
         ═══════════════════════════════════════════════ */}
      <div id="all-restaurants">
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
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#0066FF', animation: 'pulse 2s infinite' }}></span>
              Now delivering across the Algoma District
              <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'rgba(255,255,255,0.3)', display: 'inline-block', margin: '0 4px' }}></span>
              <span style={{ color: '#0066FF', fontWeight: 800 }}>⚡ 100% Electric Fleet</span>
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
              Skip the corporations. Support the Soo. Your favorite local restaurants and market vendors, delivered to the Soo, Garden River, Goulais River & Echo Bay.
            </p>

            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="#restaurants" style={{ textDecoration: 'none' }}>
                <Button size={isMobile ? 'md' : 'lg'} style={{ padding: isMobile ? '14px 28px' : '16px 36px', borderRadius: 16 }}>
                  Order Now
                </Button>
              </a>
              <a href="#soo-mrkt" style={{ textDecoration: 'none' }}>
                <Button variant="outline" size={isMobile ? 'md' : 'lg'} style={{ padding: isMobile ? '14px 28px' : '16px 36px', borderRadius: 16 }}>
                  Explore Market
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════
          STATS BAR — Social proof
         ═══════════════════════════════════════════════ */}
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
              { value: '⚡', label: 'Electric Fleet', icon: '🔋' },
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
        <section style={{ padding: isMobile ? '32px 0' : '48px 0', transition: 'all 0.3s ease' }}>
          <div style={{ maxWidth: 1440, margin: '0 auto', padding: sectionPad }}>
            <h2 style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? 22 : 28, fontWeight: 700,
              color: theme.text, letterSpacing: '-0.02em', marginBottom: isMobile ? 16 : 24,
            }}>🔥 Collections</h2>
            <div style={{
              display: 'flex', gap: isMobile ? 10 : 14, overflowX: 'auto',
              WebkitOverflowScrolling: 'touch', paddingBottom: 4,
            }}>
              {[
                { title: 'Best Pizza in the Soo', emoji: '🍕', gradient: 'linear-gradient(135deg, #dc2626, #f97316)', count: 4 },
                { title: 'Late Night Eats', emoji: '🌙', gradient: 'linear-gradient(135deg, #6366f1, #8b5cf6)', count: 6 },
                { title: 'Family Favourites', emoji: '👨‍👩‍👧‍👦', gradient: 'linear-gradient(135deg, #059669, #10b981)', count: 8 },
                { title: 'Quick Bites', emoji: '⚡', gradient: 'linear-gradient(135deg, #eab308, #f59e0b)', count: 5 },
                { title: 'Local Artisan Picks', emoji: '🎨', gradient: 'linear-gradient(135deg, #ec4899, #f43f5e)', count: 6 },
              ].map(col => (
                <div key={col.title} style={{
                  minWidth: isMobile ? 200 : 230, padding: isMobile ? '24px 18px' : '28px 24px',
                  borderRadius: 22, background: col.gradient, cursor: 'pointer',
                  transition: 'transform 0.2s', flexShrink: 0,
                }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <div style={{ fontSize: isMobile ? 28 : 36, marginBottom: 12 }}>{col.emoji}</div>
                  <h3 style={{
                    fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? 15 : 17, fontWeight: 700,
                    color: '#fff', margin: 0, marginBottom: 6, lineHeight: 1.2,
                  }}>{col.title}</h3>
                  <span style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.7)' }}>{col.count} picks</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Categories */}
      <section style={{
        position: 'sticky', top: isMobile ? 64 : 72, zIndex: 50,
        background: theme.categoryBg,
        backdropFilter: 'saturate(180%) blur(20px)', WebkitBackdropFilter: 'saturate(180%) blur(20px)',
        borderBottom: `1px solid ${theme.borderSubtle}`,
        padding: '4px 0', transition: 'background 0.3s ease',
      }}>
        <div style={{ maxWidth: 1440, margin: '0 auto', padding: sectionPad }}>
          <CategoryFilter categories={categories} />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          FEATURED PICKS — Cinema-style hero card
         ═══════════════════════════════════════════════ */}
      {featured.length > 0 && (
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
          CATEGORIZED RESTAURANTS
         ═══════════════════════════════════════════════ */}
      {categories.map(category => {
        const categoryRestaurants = getRestaurantsByCategory(category.id);
        if (categoryRestaurants.length === 0) return null;

        return (
          <section key={category.id} id={category.id} style={{ padding: isMobile ? '40px 0' : '64px 0', transition: 'background 0.3s ease' }}>
            <div style={{ maxWidth: 1440, margin: '0 auto', padding: sectionPad }}>
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: isMobile ? 20 : 32 }}>
                <h2 style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: isMobile ? 24 : 32, fontWeight: 700, letterSpacing: '-0.03em',
                  color: theme.text,
                }}>
                  {category.emoji} {category.name}
                </h2>
                <span style={{ fontSize: 14, color: theme.textFaint, fontWeight: 500 }}>
                  {categoryRestaurants.length} local spots
                </span>
              </div>
              <RestaurantCarousel restaurants={categoryRestaurants} />
            </div>
          </section>
        );
      })}

      {/* ═══════════════════════════════════════════════
          SOO MRKT — "Store Within a Store"
         ═══════════════════════════════════════════════ */}
      <div id="soo-mrkt"><SooMrktSection /></div>

      {/* ═══════════════════════════════════════════════
          LOCAL ARTISANS & CRAFTERS
         ═══════════════════════════════════════════════ */}
      <ArtisansSection />

      {/* ═══════════════════════════════════════════════
          ELECTRIC FLEET SHOWCASE
         ═══════════════════════════════════════════════ */}
      <section style={{
        padding: isMobile ? '56px 0' : '80px 0',
        background: theme.mode === 'dark'
          ? 'linear-gradient(180deg, #09090b 0%, #0a0f1a 50%, #09090b 100%)'
          : 'linear-gradient(180deg, #fdfdfd 0%, #eef4ff 50%, #fdfdfd 100%)',
        borderTop: `1px solid ${theme.borderSubtle}`,
        borderBottom: `1px solid ${theme.borderSubtle}`,
      }}>
        <div style={{ maxWidth: 1440, margin: '0 auto', padding: sectionPad, textAlign: 'center' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '8px 20px', borderRadius: 100,
            background: 'rgba(0,102,255,0.1)', border: '1px solid rgba(0,102,255,0.25)',
            fontSize: 12, fontWeight: 700, color: '#0066FF', marginBottom: 24,
            letterSpacing: '0.05em', textTransform: 'uppercase',
          }}>⚡ Zero Emissions Delivery</div>
          <h2 style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: isMobile ? 28 : 40, fontWeight: 700,
            letterSpacing: '-0.03em', color: theme.text,
            lineHeight: 1.1, marginBottom: 16,
          }}>Every delivery. 100% electric.</h2>
          <p style={{
            fontSize: isMobile ? 15 : 17, color: theme.textMuted,
            lineHeight: 1.7, maxWidth: 560, margin: '0 auto 40px',
          }}>Our entire fleet runs on electricity — EVs, e-bikes, and electric scooters. Ontario&apos;s grid is 94% emissions-free. Your delivery is genuinely zero-carbon.</p>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: isMobile ? 12 : 20, maxWidth: 900, margin: '0 auto' }}>
            {[
              { emoji: '🔋', stat: '0g CO₂', label: 'Per Delivery' },
              { emoji: '🤫', stat: 'Silent', label: 'Night Delivery' },
              { emoji: '⚡', stat: '100%', label: 'Electric Fleet' },
            ].map(item => (
              <div key={item.label} style={{
                background: theme.bgCard, border: `1px solid ${theme.borderSubtle}`,
                borderRadius: 20, padding: isMobile ? '20px 16px' : '28px 24px',
                boxShadow: theme.shadow,
              }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{item.emoji}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 24, fontWeight: 800, color: '#0066FF', marginBottom: 4 }}>{item.stat}</div>
                <div style={{ fontSize: 13, color: theme.textMuted, fontWeight: 500 }}>{item.label}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 32 }}>
            <Link href="/about" style={{ color: '#0066FF', fontSize: 15, fontWeight: 700, textDecoration: 'none' }}>Learn more about our electric fleet →</Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          EXTENDED DELIVERY — Garden River, Goulais, Echo Bay
         ═══════════════════════════════════════════════ */}
      <section style={{
        padding: isMobile ? '56px 0' : '80px 0',
        background: theme.mode === 'dark'
          ? 'linear-gradient(180deg, #09090b 0%, #1a0f0a 30%, #1a1005 60%, #09090b 100%)'
          : 'linear-gradient(180deg, #fdfdfd 0%, #fef9f0 30%, #fef3e2 60%, #fdfdfd 100%)',
        borderTop: `1px solid ${theme.borderSubtle}`,
        borderBottom: `1px solid ${theme.borderSubtle}`,
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Ambient glow */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          width: 800, height: 500,
          background: 'radial-gradient(circle, rgba(234,179,8,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: 1100, margin: '0 auto', padding: sectionPad, position: 'relative', zIndex: 10 }}>
          <div style={{ textAlign: 'center', marginBottom: isMobile ? 32 : 48 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '10px 24px', borderRadius: 100,
              background: 'rgba(234,179,8,0.12)', border: '1px solid rgba(234,179,8,0.3)',
              fontSize: 13, fontWeight: 700, color: '#eab308', marginBottom: 24,
              letterSpacing: '0.06em', textTransform: 'uppercase',
            }}>🚀 Extended Coverage — NEW</div>
            <h2 style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: isMobile ? 32 : 48, fontWeight: 800,
              letterSpacing: '-0.04em', color: theme.text,
              lineHeight: 1.05, marginBottom: 16,
            }}>
              Now delivering{' '}
              <span style={{
                background: 'linear-gradient(135deg, #eab308, #f59e0b, #d97706)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>beyond the Soo.</span>
            </h2>
            <p style={{
              fontSize: isMobile ? 16 : 19, color: theme.textMuted,
              lineHeight: 1.7, maxWidth: 640, margin: '0 auto 40px',
            }}>
              We&apos;re proud to extend Soobér service to communities that have been underserved for too long.
              Garden River First Nation, Goulais River, and Echo Bay now have access to the same local food delivery
              and quality service as downtown Sault Ste. Marie.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: isMobile ? 16 : 24,
            marginBottom: isMobile ? 32 : 48,
          }}>
            {[
              {
                name: 'Garden River First Nation',
                emoji: '🏠',
                distance: '~12 km',
                fee: '$7.99',
                eta: '35–50 min',
                desc: 'Serving the Anishinaabe community of Ketegaunseebee. Full restaurant and market access.',
                highlight: '#eab308',
              },
              {
                name: 'Goulais River',
                emoji: '🏔️',
                distance: '~25 km',
                fee: '$11.99',
                eta: '45–65 min',
                desc: "Nestled along the shore of Lake Superior, now connected to the Soo's local food scene.",
                highlight: '#f97316',
              },
              {
                name: 'Echo Bay',
                emoji: '🌊',
                distance: '~20 km',
                fee: '$9.99',
                eta: '40–55 min',
                desc: 'A vibrant rural community east of the Soo, now with full Soobér delivery access.',
                highlight: '#0066FF',
              },
            ].map((zone) => (
              <div key={zone.name} style={{
                background: theme.bgCard,
                border: `1px solid ${theme.borderSubtle}`,
                borderRadius: 24,
                padding: isMobile ? '24px 20px' : '32px 28px',
                boxShadow: theme.shadow,
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = zone.highlight; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = theme.borderSubtle; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: 3,
                  background: `linear-gradient(90deg, ${zone.highlight}, transparent)`,
                }} />
                <div style={{ fontSize: 36, marginBottom: 12 }}>{zone.emoji}</div>
                <h3 style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: isMobile ? 18 : 20, fontWeight: 700,
                  color: theme.text, marginBottom: 8, letterSpacing: '-0.02em',
                }}>{zone.name}</h3>
                <p style={{ fontSize: 14, color: theme.textMuted, lineHeight: 1.6, marginBottom: 16 }}>
                  {zone.desc}
                </p>
                <div style={{
                  display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8,
                }}>
                  {[
                    { label: 'Distance', value: zone.distance },
                    { label: 'Delivery Fee', value: zone.fee },
                    { label: 'ETA', value: zone.eta },
                  ].map(stat => (
                    <div key={stat.label} style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: 10, fontWeight: 700, color: theme.textFaint, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 2 }}>
                        {stat.label}
                      </div>
                      <div style={{ fontSize: 15, fontWeight: 700, color: zone.highlight }}>
                        {stat.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div style={{
            textAlign: 'center',
            padding: isMobile ? '20px 16px' : '24px 32px',
            background: theme.mode === 'dark' ? 'rgba(234,179,8,0.06)' : 'rgba(234,179,8,0.08)',
            border: '1px solid rgba(234,179,8,0.15)',
            borderRadius: 20,
          }}>
            <p style={{
              fontSize: isMobile ? 14 : 16, color: theme.textSecondary,
              lineHeight: 1.6, margin: 0, maxWidth: 700, marginLeft: 'auto', marginRight: 'auto',
            }}>
              <strong style={{ color: theme.text }}>Our commitment:</strong> Every community in the Algoma District deserves
              access to quality food delivery. Premium rates reflect the extended distance — not a premium on the people.
              We&apos;re working to lower these as volume grows.
            </p>
          </div>

          <div style={{ textAlign: 'center', marginTop: 28 }}>
            <Link href="/delivery-zone" style={{
              color: '#eab308', fontSize: 15, fontWeight: 700, textDecoration: 'none',
            }}>View all delivery zones & coverage →</Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          WHY LOCAL? — Manifesto Section
         ═══════════════════════════════════════════════ */}
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
                Every dollar you spend on Soobér stays in Sault Ste. Marie. We&apos;re not a Silicon Valley app extracting 30% from local restaurants. We&apos;re your neighbours, building something that actually serves this community.
              </p>
            </div>

            {/* Right — Benefit Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: isMobile ? 10 : 14 }}>
              {[
                { emoji: '💰', title: 'Keep $ Local', desc: 'Your money stays in the Soo. Not Silicon Valley.' },
                { emoji: '🤝', title: 'Real Relationships', desc: 'Know who makes your food by name.' },
                { emoji: '🥬', title: 'Fresher Food', desc: 'Local farms. Local kitchens. Shorter supply chains.' },
                { emoji: '🚫', title: 'Direct to You', desc: 'No corporate fees eating into local business profits.' },
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

      {/* ═══════════════════════════════════════════════
          TESTIMONIALS
         ═══════════════════════════════════════════════ */}
      <section style={{ padding: isMobile ? '48px 16px' : '72px 40px', transition: 'all 0.3s ease' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: isMobile ? 28 : 40 }}>
            <h2 style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: isMobile ? 26 : 36, fontWeight: 700,
              color: theme.text, letterSpacing: '-0.03em', marginBottom: 8,
            }}>What the Soo Is Saying</h2>
            <p style={{ fontSize: 15, color: theme.textMuted }}>Real reviews from real locals.</p>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: isMobile ? 12 : 20,
          }}>
            {[
              { name: 'Melissa T.', location: 'East End', text: 'Finally, a delivery service that actually knows the Soo. My food arrives hot, the drivers are friendly, and I love that it\'s all electric. Way better than the big corporate apps.', rating: 5, tier: 'Gold' },
              { name: 'Jason R.', location: 'Downtown', text: 'I order from Aurora\'s almost every week. The fact that Soobér keeps my money local and delivers with zero emissions? That\'s how it should be done.', rating: 5, tier: 'Silver' },
              { name: 'Sarah & Mike K.', location: 'West End', text: 'We discovered so many amazing local artisans through Soo MRKT that we didn\'t even know existed. The delivery zone covers our whole neighborhood!', rating: 5, tier: 'Bronze' },
            ].map((review, i) => (
              <div key={i} style={{
                background: theme.bgCard, border: `1px solid ${theme.borderSubtle}`,
                borderRadius: 22, padding: isMobile ? 20 : 28, boxShadow: theme.shadow,
                display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
              }}>
                <div>
                  <div style={{ display: 'flex', gap: 2, marginBottom: 14 }}>
                    {Array(review.rating).fill(0).map((_, j) => (
                      <svg key={j} width="16" height="16" fill="#eab308" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p style={{ fontSize: 14, color: theme.textSecondary, lineHeight: 1.7, margin: '0 0 20px', fontStyle: 'italic' }}>
                    &ldquo;{review.text}&rdquo;
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 700, color: theme.text }}>{review.name}</div>
                    <div style={{ fontSize: 12, color: theme.textFaint }}>{review.location}, SSM</div>
                  </div>
                  <span style={{
                    fontSize: 10, fontWeight: 700, padding: '3px 10px', borderRadius: 8,
                    background: theme.accentBg, color: theme.accent, textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                  }}>{review.tier}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          NEWSLETTER
         ═══════════════════════════════════════════════ */}
      <section style={{
        padding: isMobile ? '40px 16px' : '56px 40px',
        background: theme.mode === 'dark' ? '#0c0a09' : '#1c1917',
        transition: 'all 0.3s ease',
      }}>
        <div style={{
          maxWidth: 600, margin: '0 auto', textAlign: 'center',
        }}>
          <div style={{ fontSize: 36, marginBottom: 16 }}>📬</div>
          <h2 style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? 24 : 32, fontWeight: 700,
            color: '#fafafa', letterSpacing: '-0.03em', marginBottom: 8,
          }}>Get the Soo Scoop</h2>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.5)', marginBottom: 28, lineHeight: 1.5 }}>
            New restaurants, exclusive deals, and local food stories — delivered to your inbox. No spam, ever.
          </p>
          <div style={{
            display: 'flex', gap: 10, maxWidth: 440, margin: '0 auto',
            flexDirection: isMobile ? 'column' : 'row',
          }}>
            <input
              type="email"
              placeholder="your@email.com"
              style={{
                flex: 1, padding: '14px 20px', borderRadius: 14,
                border: '1.5px solid rgba(255,255,255,0.15)',
                background: 'rgba(255,255,255,0.06)', color: '#fafafa',
                fontSize: 15, fontWeight: 500, outline: 'none',
                fontFamily: "'Inter', sans-serif",
              }}
            />
            <button style={{
              padding: '14px 28px', borderRadius: 14, border: 'none',
              background: '#eab308', color: '#09090b', fontSize: 15, fontWeight: 700,
              fontFamily: "'DM Sans', sans-serif", cursor: 'pointer',
              transition: 'all 0.2s', whiteSpace: 'nowrap',
            }}>Subscribe</button>
          </div>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', marginTop: 12 }}>Join 1,200+ Soo locals. Unsubscribe anytime.</p>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════
          SOOBER RIDES PROMO
         ═══════════════════════════════════════════════ */}
      <section style={{
        padding: isMobile ? '48px 16px' : '72px 40px',
        maxWidth: 1440, margin: '0 auto',
      }}>
        <div style={{
          background: isDark
            ? 'linear-gradient(135deg, rgba(0,102,255,0.06), rgba(0,102,255,0.02))'
            : 'linear-gradient(135deg, rgba(0,102,255,0.08), rgba(0,102,255,0.03))',
          border: '1px solid rgba(0,102,255,0.15)',
          borderRadius: 28, padding: isMobile ? 28 : 48, overflow: 'hidden',
          position: 'relative',
        }}>
          <div style={{
            position: 'absolute', top: -100, right: -100,
            width: 400, height: 400, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0,102,255,0.15) 0%, transparent 70%)',
            pointerEvents: 'none', filter: 'blur(60px)',
          }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(0,102,255,0.1)', border: '1px solid rgba(0,102,255,0.2)',
              borderRadius: 100, padding: '6px 16px', marginBottom: 20,
            }}>
              <span style={{ fontSize: 14 }}>⚡</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: '#0066FF' }}>New: Soobér Rides</span>
            </div>

            <h2 style={{
              fontFamily: "'DM Sans', sans-serif", fontWeight: 800,
              fontSize: isMobile ? 28 : 40, letterSpacing: '-0.04em',
              color: theme.text, margin: '0 0 12px', lineHeight: 1.1,
            }}>
              Not just eats anymore.
            </h2>
            <p style={{
              fontSize: isMobile ? 15 : 17, color: theme.textMuted,
              maxWidth: 480, margin: '0 0 28px', lineHeight: 1.6,
            }}>
              On-demand rides, airport transfers, and premium event fleets — all 100% electric, all local, zero emissions.
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
              gap: 12, marginBottom: 28,
            }}>
              {[
                { href: '/rides', emoji: '🚗', title: 'Soobér Rides', desc: 'On-demand rides across the Soo' },
                { href: '/rides/airport', emoji: '✈️', title: 'Airport Transfers', desc: 'Fixed-rate, no surprises' },
                { href: '/rides/events', emoji: '💎', title: 'Events & Fleets', desc: 'Electric Hummers & luxury' },
              ].map((item, i) => (
                <Link key={i} href={item.href} style={{
                  background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.7)',
                  border: `1px solid ${theme.borderSubtle}`,
                  borderRadius: 16, padding: '18px 20px', textDecoration: 'none',
                  transition: 'all 0.25s ease',
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#0066FF'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = theme.borderSubtle; e.currentTarget.style.transform = 'translateY(0)'; }}
                >
                  <span style={{ fontSize: 28, display: 'block', marginBottom: 8 }}>{item.emoji}</span>
                  <span style={{ fontWeight: 700, fontSize: 16, color: theme.text, display: 'block', fontFamily: "'DM Sans', sans-serif" }}>
                    {item.title}
                  </span>
                  <span style={{ fontSize: 13, color: theme.textMuted }}>{item.desc}</span>
                </Link>
              ))}
            </div>

            <Link href="/rides" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '14px 28px', borderRadius: 14,
              background: 'linear-gradient(135deg, #10b981, #0044CC)',
              color: '#fff', fontWeight: 700, fontSize: 15,
              fontFamily: "'DM Sans', sans-serif", textDecoration: 'none',
              boxShadow: '0 4px 20px rgba(0,102,255,0.25)',
              transition: 'transform 0.2s ease',
            }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              Explore Soobér Rides →
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          FOOTER
         ═══════════════════════════════════════════════ */}
      <footer style={{
        borderTop: `1px solid ${theme.borderSubtle}`,
        padding: isMobile ? '40px 20px 24px' : '56px 40px 24px',
        background: theme.bg,
        transition: 'all 0.3s ease',
      }}>
        <div style={{ maxWidth: 1440, margin: '0 auto' }}>
          {/* Footer Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1.5fr 1fr 1fr 1fr',
            gap: isMobile ? 32 : 48,
            marginBottom: 40,
          }}>
            {/* Brand Column */}
            <div>
              <div style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 20, fontWeight: 700,
                color: theme.text, letterSpacing: '-0.02em',
                marginBottom: 12,
              }}>
                Soobér
              </div>
              <p style={{
                fontSize: 13, color: theme.textMuted,
                lineHeight: 1.6, maxWidth: 280, margin: 0, marginBottom: 16,
              }}>
                The Algoma District&apos;s local delivery platform. Built in Sault Ste. Marie, for the Soo and beyond.
              </p>
              <div style={{ display: 'flex', gap: 8, fontSize: 12, color: theme.textFaint }}>
                <span>🌿 Zero-emission fleet</span>
                <span>·</span>
                <span>🍁 100% local</span>
              </div>
            </div>

            {/* Explore Column */}
            <div>
              <h4 style={{ fontSize: 12, fontWeight: 700, color: theme.textMuted, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 16, marginTop: 0 }}>Explore</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  { href: '/', label: 'Restaurants' },
                  { href: '/rides', label: '⚡ Soobér Rides', accent: true },
                  { href: '/delivery-zone', label: 'Delivery Zones' },
                  { href: '/rewards', label: 'Rewards' },
                  { href: '/how-it-works', label: 'How It Works' },
                ].map(l => (
                  <Link key={l.href} href={l.href} style={{ color: l.accent ? '#0066FF' : theme.textFaint, textDecoration: 'none', fontSize: 13, fontWeight: l.accent ? 700 : 500, transition: 'color 0.2s' }}>{l.label}</Link>
                ))}
              </div>
            </div>

            {/* Services Column */}
            <div>
              <h4 style={{ fontSize: 12, fontWeight: 700, color: theme.textMuted, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 16, marginTop: 0 }}>Services</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  { href: '/corporate', label: 'For Business' },
                  { href: '/for-drivers', label: 'Drive Electric' },
                  { href: '/support', label: 'Support' },
                  { href: '/contact', label: 'Contact' },
                  { href: '/links', label: 'All Links' },
                ].map(l => (
                  <Link key={l.href} href={l.href} style={{ color: theme.textFaint, textDecoration: 'none', fontSize: 13, fontWeight: 500 }}>{l.label}</Link>
                ))}
              </div>
            </div>

            {/* Company Column */}
            <div>
              <h4 style={{ fontSize: 12, fontWeight: 700, color: theme.textMuted, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 16, marginTop: 0 }}>Company</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  { href: '/about', label: 'About Soobér' },
                  { href: '/terms', label: 'Terms of Service' },
                  { href: '/privacy', label: 'Privacy Policy' },
                  { href: '/faq', label: 'FAQ' },
                ].map(l => (
                  <Link key={l.href} href={l.href} style={{ color: theme.textFaint, textDecoration: 'none', fontSize: 13, fontWeight: 500 }}>{l.label}</Link>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div style={{
            borderTop: `1px solid ${theme.borderSubtle}`,
            paddingTop: 20,
            display: 'flex',
            alignItems: isMobile ? 'center' : 'center',
            justifyContent: 'space-between',
            flexDirection: isMobile ? 'column' : 'row',
            gap: isMobile ? 16 : 0,
          }}>
            <p style={{
              fontSize: 12, color: theme.textFaint,
              fontWeight: 400, margin: 0,
            }}>
              © 2026 Soobér · Sault Ste. Marie, ON · Antigravity Solutions
            </p>
            <button
              onClick={toggleTheme}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                background: theme.bgInput, border: `1px solid ${theme.borderSubtle}`,
                borderRadius: 100, padding: '8px 16px',
                cursor: 'pointer', fontSize: 13, fontWeight: 500,
                color: theme.textMuted, transition: 'all 0.3s ease',
              }}
            >
              {isDark ? '☀️' : '🌙'}
              <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
