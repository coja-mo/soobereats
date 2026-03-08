"use client";

import { useState, useEffect } from 'react';
import { restaurants, categories, getRestaurantsByCategory, getFeaturedRestaurants, sooMrktVendors } from '../lib/data/restaurants';
import { RestaurantCard } from '../components/RestaurantCard';
import { CategoryFilter } from '../components/CategoryFilter';
import { Button } from '../components/ui/Button';
import { useTheme } from '../lib/ThemeContext';
import { useCart } from '../lib/CartContext';

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedVendor, setSelectedVendor] = useState(null);
  const { theme } = useTheme();
  const { addToCart } = useCart();
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

      {/* Hero Section */}
      {!isFiltering && (
        <section style={{
          position: 'relative', paddingTop: isMobile ? 48 : 80,
          paddingBottom: isMobile ? 48 : 80,
          overflow: 'hidden', background: theme.bg,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          textAlign: 'center', transition: 'background 0.3s ease',
        }}>
          <div style={{ position: 'relative', zIndex: 10, maxWidth: 720, padding: sectionPad }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '8px 20px', borderRadius: 100,
              background: theme.bgCard, border: `1px solid ${theme.border}`,
              fontSize: 12, fontWeight: 700, color: theme.textSecondary,
              letterSpacing: '0.05em', textTransform: 'uppercase',
              marginBottom: isMobile ? 20 : 32,
              boxShadow: theme.shadow,
              transition: 'all 0.3s ease',
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981' }}></span>
              Now delivering in Sault Ste. Marie
            </div>

            <h1 style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: isMobile ? 'clamp(36px, 10vw, 48px)' : 'clamp(48px, 8vw, 80px)',
              fontWeight: 700, letterSpacing: '-0.045em', lineHeight: 1.05,
              color: theme.text, marginBottom: isMobile ? 20 : 28,
              transition: 'color 0.3s ease',
            }}>
              Crave it.{' '}<br />
              <span style={{ color: theme.textFaint }}>We deliver it.</span>
            </h1>

            <p style={{
              fontSize: isMobile ? 15 : 18, lineHeight: 1.6, color: theme.textMuted,
              maxWidth: 480, margin: `0 auto ${isMobile ? 28 : 40}px`, fontWeight: 400,
            }}>
              The Soo&apos;s premium food delivery platform. Your favorite local restaurants, delivered with obsessive attention to detail.
            </p>

            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button size={isMobile ? 'md' : 'lg'} style={{ padding: isMobile ? '14px 28px' : '16px 36px', borderRadius: 16 }}>
                Find Food Nearby
              </Button>
              <Button variant="outline" size={isMobile ? 'md' : 'lg'} style={{ padding: isMobile ? '14px 28px' : '16px 36px', borderRadius: 16 }}>
                How it Works
              </Button>
            </div>
          </div>
          <div style={{
            position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)',
            width: 600, height: 400, background: theme.heroGlow,
            borderRadius: '50%', pointerEvents: 'none',
          }} />
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

      {/* Featured Section */}
      {!isFiltering && featured.length > 0 && (
        <section style={{ padding: isMobile ? '40px 0' : '60px 0', background: theme.bgAlt, transition: 'background 0.3s ease' }}>
          <div style={{ maxWidth: 1440, margin: '0 auto', padding: sectionPad }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: isMobile ? 20 : 32 }}>
              <div>
                <h2 style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: isMobile ? 22 : 28, fontWeight: 700, letterSpacing: '-0.03em',
                  color: theme.text, marginBottom: 6,
                }}>Featured Picks</h2>
                <p style={{ fontSize: isMobile ? 13 : 15, color: theme.textMuted, fontWeight: 400 }}>
                  Hand-selected restaurants trending in the Soo
                </p>
              </div>
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(340px, 1fr))',
              gap: isMobile ? 16 : 28,
            }}>
              {featured.slice(0, 3).map((restaurant) => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Soo MRKT Section */}
      {!isFiltering && (
        <section style={{
          padding: isMobile ? '40px 0' : '60px 0',
          background: theme.sooMrktBg,
          transition: 'background 0.3s ease',
        }}>
          <div style={{ maxWidth: 1440, margin: '0 auto', padding: sectionPad }}>
            <div style={{ display: 'flex', alignItems: isMobile ? 'flex-start' : 'flex-end', justifyContent: 'space-between', marginBottom: isMobile ? 20 : 32, flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? 16 : 0 }}>
              <div>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '6px 16px', borderRadius: 100,
                  background: '#1c1917', color: '#fafaf9',
                  fontSize: 11, fontWeight: 700,
                  letterSpacing: '0.08em', textTransform: 'uppercase',
                  marginBottom: 16,
                }}>🧺 Local Marketplace</div>
                <h2 style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: isMobile ? 26 : 32, fontWeight: 700, letterSpacing: '-0.03em',
                  color: theme.text, marginBottom: 6,
                }}>Soo MRKT</h2>
                <p style={{ fontSize: isMobile ? 13 : 15, color: theme.textMuted, fontWeight: 400, maxWidth: 500 }}>
                  Algoma&apos;s finest farmers, artisans, and food vendors — fresh from the Saturday market at 73 Brock St.
                </p>
              </div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: isMobile ? 10 : 16,
            }}>
              {sooMrktVendors.map((vendor) => (
                <div key={vendor.id}
                  onClick={() => setSelectedVendor(vendor)}
                  style={{
                    background: theme.vendorCard,
                    backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
                    border: `1px solid ${theme.borderSubtle}`,
                    borderRadius: isMobile ? 16 : 20,
                    padding: isMobile ? '16px 14px' : '24px 20px',
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = theme.shadowLg;
                    e.currentTarget.style.borderColor = theme.border;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.borderColor = theme.borderSubtle;
                  }}
                >
                  <div style={{ fontSize: isMobile ? 26 : 32, marginBottom: isMobile ? 8 : 12 }}>{vendor.emoji}</div>
                  <h3 style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: isMobile ? 13 : 15, fontWeight: 700, color: theme.text,
                    marginBottom: 4, letterSpacing: '-0.01em',
                  }}>{vendor.name}</h3>
                  <p style={{ fontSize: isMobile ? 10 : 12, color: theme.textFaint, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 4 }}>
                    {vendor.category}
                  </p>
                  {!isMobile && (
                    <p style={{ fontSize: 13, color: theme.textMuted, lineHeight: 1.4 }}>
                      {vendor.description?.substring(0, 60)}...
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Restaurants Grid */}
      <section style={{ padding: isMobile ? '40px 0' : '60px 0', transition: 'background 0.3s ease' }}>
        <div style={{ maxWidth: 1440, margin: '0 auto', padding: sectionPad }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: isMobile ? 20 : 32 }}>
            <h2 style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: isMobile ? 22 : 28, fontWeight: 700, letterSpacing: '-0.03em',
              color: theme.text,
            }}>
              {isFiltering ? `${categories.find(c => c.id === activeCategory)?.name} Restaurants` : 'All Restaurants'}
            </h2>
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

      {/* Vendor Modal */}
      {selectedVendor && (
        <VendorModal
          vendor={selectedVendor}
          onClose={() => setSelectedVendor(null)}
          theme={theme}
          isMobile={isMobile}
          addToCart={addToCart}
        />
      )}
    </div>
  );
}

function VendorModal({ vendor, onClose, theme, isMobile, addToCart }) {
  const handleAdd = (product) => {
    addToCart(product, {
      id: vendor.id,
      name: vendor.name,
      image: null,
      logo: vendor.emoji,
    });
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 300,
          background: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)',
          animation: 'fadeIn 0.3s ease',
        }}
      />
      {/* Modal */}
      <div style={{
        position: 'fixed', zIndex: 301,
        top: isMobile ? 'auto' : '50%', left: isMobile ? 0 : '50%',
        right: isMobile ? 0 : 'auto', bottom: isMobile ? 0 : 'auto',
        transform: isMobile ? 'none' : 'translate(-50%, -50%)',
        width: isMobile ? '100%' : '90%', maxWidth: 560,
        maxHeight: isMobile ? '85vh' : '80vh',
        background: theme.bgCard,
        borderRadius: isMobile ? '24px 24px 0 0' : 28,
        boxShadow: '0 24px 80px rgba(0,0,0,0.25)',
        display: 'flex', flexDirection: 'column',
        animation: isMobile ? 'slideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1)' : 'scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        overflow: 'hidden',
      }}>
        {/* Header */}
        <div style={{
          padding: isMobile ? '20px 20px 16px' : '28px 32px 20px',
          borderBottom: `1px solid ${theme.borderLight}`,
          flexShrink: 0,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{
                width: 52, height: 52, borderRadius: 16,
                background: theme.bgInput,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 28,
              }}>{vendor.emoji}</div>
              <div>
                <h2 style={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? 18 : 22,
                  fontWeight: 700, color: theme.text, letterSpacing: '-0.02em', margin: 0,
                }}>{vendor.name}</h2>
                <span style={{
                  fontSize: 12, fontWeight: 600, color: theme.textFaint,
                  textTransform: 'uppercase', letterSpacing: '0.04em',
                }}>{vendor.category}</span>
              </div>
            </div>
            <button
              onClick={onClose}
              style={{
                width: 36, height: 36, borderRadius: 12,
                background: theme.bgInput, border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 18, color: theme.textMuted,
              }}
            >✕</button>
          </div>
          <p style={{
            fontSize: 14, color: theme.textMuted, lineHeight: 1.5,
            margin: 0, marginTop: 12,
          }}>{vendor.description}</p>
        </div>

        {/* Products */}
        <div style={{ flex: 1, overflowY: 'auto', padding: isMobile ? '12px 20px 24px' : '16px 32px 32px' }}>
          <h3 style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 700,
            color: theme.text, marginBottom: 14, letterSpacing: '-0.01em',
          }}>Products</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {vendor.products?.map((product) => (
              <VendorProductItem key={product.id} product={product} theme={theme} onAdd={() => handleAdd(product)} />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleIn {
          from { opacity: 0; transform: translate(-50%, -50%) scale(0.95); }
          to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
      `}</style>
    </>
  );
}

function VendorProductItem({ product, theme, onAdd }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onAdd}
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '14px 16px', borderRadius: 16, cursor: 'pointer',
        background: hovered ? theme.bgCardHover : 'transparent',
        border: `1px solid ${hovered ? theme.borderSubtle : 'transparent'}`,
        transition: 'all 0.2s ease',
      }}
    >
      <div style={{ flex: 1, marginRight: 12 }}>
        <h4 style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 700,
          color: theme.text, margin: 0, marginBottom: 3,
        }}>{product.name}</h4>
        <p style={{ fontSize: 13, color: theme.textFaint, margin: 0, lineHeight: 1.4 }}>
          {product.description}
        </p>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
        <span style={{ fontSize: 15, fontWeight: 700, color: theme.text, fontFamily: "'DM Sans', sans-serif" }}>
          ${product.price.toFixed(2)}
        </span>
        <div style={{
          width: 34, height: 34, borderRadius: 10,
          background: hovered ? theme.dark : theme.bgInput,
          color: hovered ? theme.darkText : theme.textMuted,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 18, fontWeight: 300,
          transition: 'all 0.2s ease',
        }}>+</div>
      </div>
    </div>
  );
}
