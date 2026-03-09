"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import { sampleOrders } from './data/orders';

const LiveOrderContext = createContext();

export function LiveOrderProvider({ children }) {
    // In a real app, this would be fetched from a DB and synced via WebSockets.
    // For this prototype, we'll initialize with some sample data and keep it in local state.
    const [activeOrders, setActiveOrders] = useState([]);
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        // Load initial state (e.g. from localStorage or just use samples)
        const savedOrders = localStorage.getItem('soobereats_live_orders');
        if (savedOrders) {
            try {
                setActiveOrders(JSON.parse(savedOrders));
            } catch (e) {
                console.error("Failed to parse orders from local storage", e);
                setActiveOrders(sampleOrders.filter(o => o.status !== 'delivered' && o.status !== 'cancelled'));
            }
        } else {
            // Start with only active sample orders
            setActiveOrders(sampleOrders.filter(o => o.status !== 'delivered' && o.status !== 'cancelled'));
        }
        setIsInitialized(true);
    }, []);

    // Save to local storage whenever orders change
    useEffect(() => {
        if (isInitialized) {
            localStorage.setItem('soobereats_live_orders', JSON.stringify(activeOrders));
        }
    }, [activeOrders, isInitialized]);

    const placeOrder = (orderData) => {
        const newOrder = {
            id: `ORD-${Math.floor(Math.random() * 9000) + 1000}`,
            ...orderData,
            status: 'confirmed',
            orderedAt: new Date().toISOString(),
        };

        setActiveOrders(prev => [newOrder, ...prev]);
        return newOrder.id;
    };

    const updateOrderStatus = (orderId, newStatus) => {
        setActiveOrders(prev =>
            prev.map(order =>
                order.id === orderId ? { ...order, status: newStatus } : order
            )
        );
    };

    // Helper: Returns all active orders for a specific vendor
    const getOrdersForVendor = (vendorId) => {
        return activeOrders.filter(o => o.restaurantId === vendorId);
    };

    // Helper: Returns a specific order
    const getOrderById = (orderId) => {
        return activeOrders.find(o => o.id === orderId);
    };

    return (
        <LiveOrderContext.Provider value={{
            activeOrders,
            placeOrder,
            updateOrderStatus,
            getOrdersForVendor,
            getOrderById
        }}>
            {children}
        </LiveOrderContext.Provider>
    );
}

export const useLiveOrders = () => useContext(LiveOrderContext);
