"use client";

import { getActiveOrders, getPastOrders } from '../../lib/data/orders';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';

export default function OrdersPage() {
    const activeOrders = getActiveOrders();
    const pastOrders = getPastOrders();

    const getStatusColor = (status) => {
        switch (status) {
            case 'preparing': return 'warning';
            case 'ready': return 'primary';
            case 'delivering': return 'info';
            case 'delivered': return 'success';
            case 'cancelled': return 'danger';
            default: return 'default';
        }
    };

    const formatStatus = (status) => {
        return status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };

    return (
        <div className="container py-10 max-w-4xl pb-24">
            <h1 className="text-4xl font-display font-bold mb-8">Your Orders</h1>

            {/* Active Orders Track */}
            {activeOrders.length > 0 && (
                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-primary)] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-[var(--color-primary-dark)]"></span>
                        </span>
                        Active Orders
                    </h2>

                    <div className="space-y-6">
                        {activeOrders.map(order => (
                            <Card key={order.id} hoverEffect className="overflow-hidden border-2 border-[var(--color-primary-light)]">

                                {/* Status Header Block */}
                                <div className="bg-[var(--color-primary-light)]/30 p-4 border-b border-[var(--color-border-subtle)] flex flex-wrap justify-between items-center gap-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-2xl border border-[var(--color-border-subtle)]">
                                            {order.restaurantLogo}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg leading-tight">{order.restaurantName}</h3>
                                            <p className="text-sm text-[var(--color-text-secondary)]">Order {order.id}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <Badge variant={getStatusColor(order.status)} className="mb-1 text-sm px-3 py-1">
                                            {formatStatus(order.status)}
                                        </Badge>
                                        {order.estimatedDelivery && (
                                            <span className="text-sm font-medium">Est. {order.estimatedDelivery}</span>
                                        )}
                                    </div>
                                </div>

                                <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-8">

                                    {/* Items List */}
                                    <div>
                                        <h4 className="font-bold text-[var(--color-text-secondary)] uppercase text-xs tracking-wider mb-4">Order Details</h4>
                                        <ul className="space-y-3 mb-6">
                                            {order.items.map((item, idx) => (
                                                <li key={idx} className="flex gap-3 text-sm">
                                                    <span className="w-6 h-6 rounded bg-[var(--color-bg-subtle)] flex items-center justify-center font-medium shrink-0 text-[var(--color-text-secondary)]">
                                                        {item.quantity}
                                                    </span>
                                                    <div className="flex-1">
                                                        <span className="font-medium text-[var(--color-text)] block">{item.name}</span>
                                                        {item.options && (
                                                            <span className="text-[var(--color-text-muted)] text-xs block mt-0.5">
                                                                {item.options.join(', ')}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <span className="font-medium text-[var(--color-text-secondary)]">${(item.price * item.quantity).toFixed(2)}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="border-t border-[var(--color-border-subtle)] pt-3 flex justify-between font-bold">
                                            <span>Total</span>
                                            <span>${order.total.toFixed(2)}</span>
                                        </div>
                                    </div>

                                    {/* Delivery Tracking Visualizer */}
                                    <div className="bg-[var(--color-bg-subtle)] rounded-xl p-4 flex flex-col justify-between relative overflow-hidden">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-primary-glow)] rounded-bl-full opacity-50"></div>

                                        <div className="relative z-10">
                                            <h4 className="font-bold text-[var(--color-text-secondary)] uppercase text-xs tracking-wider mb-4">Tracker Map</h4>

                                            {/* Fake Map UI Component */}
                                            <div className="w-full h-32 bg-[#e8eae9] rounded-lg border border-[var(--color-border)] mb-4 relative overflow-hidden shadow-inner flex items-center justify-center">
                                                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-repeat"></div>
                                                {order.status === 'delivering' ? (
                                                    <div className="animate-pulse flex flex-col items-center">
                                                        <span className="text-3xl drop-shadow-md">🚗</span>
                                                        <div className="mt-2 bg-black text-white px-2 py-0.5 rounded text-xs font-bold">
                                                            Driver approaching
                                                        </div>
                                                    </div>
                                                ) : order.status === 'preparing' ? (
                                                    <div className="animate-pulse flex flex-col items-center">
                                                        <span className="text-3xl drop-shadow-md">👨‍🍳</span>
                                                        <div className="mt-2 bg-black text-white px-2 py-0.5 rounded text-xs font-bold">
                                                            Cooking your order
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="text-[var(--color-text-muted)] text-sm font-medium">Map Unavailable</div>
                                                )}
                                            </div>

                                            {order.driverName && (
                                                <div className="flex items-center gap-3 bg-[var(--color-bg-elevated)] p-3 rounded-lg border border-[var(--color-border-subtle)] shadow-sm">
                                                    <div className="w-10 h-10 rounded-full bg-[var(--color-bg-muted)] overflow-hidden shrink-0">
                                                        <img src={`https://ui-avatars.com/api/?name=${order.driverName.replace(' ', '+')}&background=random`} alt={order.driverName} />
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="font-bold text-sm leading-none mb-1">{order.driverName}</div>
                                                        {order.vehicle && <div className="text-xs text-[var(--color-text-secondary)]">{order.vehicle}</div>}
                                                    </div>
                                                    <div className="text-sm font-bold flex items-center gap-1 bg-[var(--color-bg-subtle)] px-2 py-1 rounded-full">
                                                        ⭐ {order.driverRating}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                </div>
                            </Card>
                        ))}
                    </div>
                </section>
            )}

            {/* Past Orders Track */}
            <section>
                <h2 className="text-2xl font-bold mb-6">Past Orders</h2>

                {pastOrders.length === 0 ? (
                    <div className="text-center py-12 bg-[var(--color-bg-subtle)] rounded-[var(--radius-xl)]">
                        <p className="text-[var(--color-text-muted)]">No past orders found.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {pastOrders.map(order => (
                            <Card key={order.id} className="p-4 flex gap-4 transition-colors hover:bg-[var(--color-bg-subtle)]">
                                <div className="w-16 h-16 rounded-xl bg-[var(--color-bg-subtle)] flex items-center justify-center text-3xl shrink-0">
                                    {order.restaurantLogo}
                                </div>

                                <div className="flex-1 flex flex-col justify-between">
                                    <div>
                                        <div className="flex justify-between items-start mb-1">
                                            <h4 className="font-bold leading-tight">{order.restaurantName}</h4>
                                            <Badge variant="success" className="text-[10px] scale-90 origin-top-right">Delivered</Badge>
                                        </div>

                                        <p className="text-sm text-[var(--color-text-secondary)] truncate">
                                            {order.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}
                                        </p>
                                    </div>

                                    <div className="flex justify-between items-end mt-3">
                                        <p className="text-xs text-[var(--color-text-muted)] font-medium">
                                            {new Date(order.orderedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                        </p>
                                        <p className="font-bold">${order.total.toFixed(2)}</p>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}
            </section>

        </div>
    );
}
