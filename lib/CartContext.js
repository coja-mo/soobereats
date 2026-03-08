"use client";

import { createContext, useContext, useReducer, useEffect, useCallback, useState } from 'react';

const CartContext = createContext(null);

const DELIVERY_FEE = 4.99;
const TAX_RATE = 0.13; // Ontario HST

function cartReducer(state, action) {
    switch (action.type) {
        case 'ADD_ITEM': {
            const { item, restaurant } = action.payload;
            // If cart has items from a different restaurant, clear first
            if (state.restaurantId && state.restaurantId !== restaurant.id) {
                return {
                    ...state,
                    items: [{ ...item, quantity: 1 }],
                    restaurantId: restaurant.id,
                    restaurantName: restaurant.name,
                    restaurantImage: restaurant.image,
                    restaurantLogo: restaurant.logo,
                };
            }
            const existingIndex = state.items.findIndex(i => i.id === item.id);
            let newItems;
            if (existingIndex >= 0) {
                newItems = state.items.map((i, idx) =>
                    idx === existingIndex ? { ...i, quantity: i.quantity + 1 } : i
                );
            } else {
                newItems = [...state.items, { ...item, quantity: 1 }];
            }
            return {
                ...state,
                items: newItems,
                restaurantId: restaurant.id,
                restaurantName: restaurant.name,
                restaurantImage: restaurant.image,
                restaurantLogo: restaurant.logo,
            };
        }
        case 'REMOVE_ITEM': {
            const newItems = state.items.filter(i => i.id !== action.payload);
            if (newItems.length === 0) {
                return { ...state, items: [], restaurantId: null, restaurantName: null, restaurantImage: null, restaurantLogo: null };
            }
            return { ...state, items: newItems };
        }
        case 'UPDATE_QUANTITY': {
            const { id, quantity } = action.payload;
            if (quantity <= 0) {
                const filtered = state.items.filter(i => i.id !== id);
                if (filtered.length === 0) {
                    return { ...state, items: [], restaurantId: null, restaurantName: null, restaurantImage: null, restaurantLogo: null };
                }
                return { ...state, items: filtered };
            }
            return {
                ...state,
                items: state.items.map(i => i.id === id ? { ...i, quantity } : i),
            };
        }
        case 'CLEAR_CART':
            return { ...state, items: [], restaurantId: null, restaurantName: null, restaurantImage: null, restaurantLogo: null };
        case 'HYDRATE':
            return action.payload;
        default:
            return state;
    }
}

const initialState = {
    items: [],
    restaurantId: null,
    restaurantName: null,
    restaurantImage: null,
    restaurantLogo: null,
};

export function CartProvider({ children }) {
    const [state, dispatch] = useReducer(cartReducer, initialState);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [toast, setToast] = useState(null);
    const [hydrated, setHydrated] = useState(false);

    // Hydrate from localStorage
    useEffect(() => {
        try {
            const saved = localStorage.getItem('soober-cart');
            if (saved) {
                dispatch({ type: 'HYDRATE', payload: JSON.parse(saved) });
            }
        } catch (e) { /* noop */ }
        setHydrated(true);
    }, []);

    // Persist to localStorage
    useEffect(() => {
        if (hydrated) {
            localStorage.setItem('soober-cart', JSON.stringify(state));
        }
    }, [state, hydrated]);

    const subtotal = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const deliveryFee = state.items.length > 0 ? DELIVERY_FEE : 0;
    const tax = subtotal * TAX_RATE;
    const total = subtotal + deliveryFee + tax;
    const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);

    const showToast = useCallback((message) => {
        setToast(message);
        setTimeout(() => setToast(null), 2400);
    }, []);

    const addToCart = useCallback((item, restaurant) => {
        dispatch({ type: 'ADD_ITEM', payload: { item, restaurant } });
        showToast(`${item.name} added to cart`);
    }, [showToast]);

    const removeFromCart = useCallback((id) => {
        dispatch({ type: 'REMOVE_ITEM', payload: id });
    }, []);

    const updateQuantity = useCallback((id, quantity) => {
        dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
    }, []);

    const clearCart = useCallback(() => {
        dispatch({ type: 'CLEAR_CART' });
    }, []);

    return (
        <CartContext.Provider value={{
            ...state,
            subtotal, deliveryFee, tax, total, itemCount,
            addToCart, removeFromCart, updateQuantity, clearCart,
            isCartOpen, setIsCartOpen,
            toast, hydrated,
        }}>
            {children}
            {/* Toast notification */}
            {toast && (
                <div style={{
                    position: 'fixed', bottom: 32, left: '50%', transform: 'translateX(-50%)',
                    zIndex: 10000,
                    background: '#09090b', color: '#fafafa',
                    padding: '14px 28px', borderRadius: 16,
                    fontSize: 14, fontWeight: 600, fontFamily: "'DM Sans', sans-serif",
                    boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                    display: 'flex', alignItems: 'center', gap: 10,
                    animation: 'toastIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                }}>
                    <span style={{ fontSize: 18 }}>✓</span>
                    {toast}
                    <style>{`
                        @keyframes toastIn {
                            0% { opacity: 0; transform: translateX(-50%) translateY(20px) scale(0.9); }
                            100% { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); }
                        }
                    `}</style>
                </div>
            )}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) throw new Error('useCart must be used within CartProvider');
    return context;
}
