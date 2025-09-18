import React from 'react';
import AppShell from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';

interface Stats {
    total_products: number;
    total_categories: number;
    total_orders: number;
    total_users: number;
    pending_orders: number;
    low_stock_products: number;
    total_revenue: number;
    products_out_of_stock: number;
}

interface Order {
    id: number;
    order_number: string;
    status: string;
    total_amount: string;
    user: {
        name: string;
    };
    created_at: string;
}

interface Product {
    id: number;
    name: string;
    sku: string;
    stock_quantity: number;
    category: {
        name: string;
    };
}

interface Props {
    stats: Stats;
    recentOrders: Order[];
    lowStockProducts: Product[];
    monthlyRevenue: Array<{
        month: number;
        year: number;
        revenue: number;
    }>;
    orderStatusCounts: Record<string, number>;
    [key: string]: unknown;
}

export default function Dashboard({
    stats,
    recentOrders,
    lowStockProducts
}: Props) {
    const formatCurrency = (amount: number | string) => {
        const num = typeof amount === 'string' ? parseFloat(amount) : amount;
        return new Intl.NumberFormat('en-CA', {
            style: 'currency',
            currency: 'CAD'
        }).format(num);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'paid': return 'bg-blue-100 text-blue-800';
            case 'shipped': return 'bg-purple-100 text-purple-800';
            case 'completed': return 'bg-green-100 text-green-800';
            case 'cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <AppShell>
            <div className="space-y-8">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">📊 ERP Dashboard</h1>
                    <p className="text-gray-600">Welcome back! Here's what's happening with your business.</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <span className="text-2xl">📦</span>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-500">Total Products</p>
                                <p className="text-2xl font-semibold text-gray-900">{stats.total_products}</p>
                            </div>
                        </div>
                        <div className="mt-4">
                            <Link href="/products">
                                <Button variant="outline" size="sm">View Products</Button>
                            </Link>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <span className="text-2xl">💰</span>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-500">Total Revenue</p>
                                <p className="text-2xl font-semibold text-gray-900">{formatCurrency(stats.total_revenue)}</p>
                            </div>
                        </div>
                        <div className="mt-4">
                            <Link href="/orders">
                                <Button variant="outline" size="sm">View Orders</Button>
                            </Link>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6 border-l-4 border-yellow-500">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <span className="text-2xl">⏳</span>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-500">Pending Orders</p>
                                <p className="text-2xl font-semibold text-gray-900">{stats.pending_orders}</p>
                            </div>
                        </div>
                        <div className="mt-4">
                            <Link href="/orders?status=pending">
                                <Button variant="outline" size="sm">View Pending</Button>
                            </Link>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <span className="text-2xl">⚠️</span>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-500">Low Stock Items</p>
                                <p className="text-2xl font-semibold text-gray-900">{stats.low_stock_products}</p>
                            </div>
                        </div>
                        <div className="mt-4">
                            <Link href="/products?filter=low_stock">
                                <Button variant="outline" size="sm">Check Inventory</Button>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">🚀 Quick Actions</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <Link href="/products/create">
                            <Button className="w-full justify-start" variant="outline">
                                <span className="mr-2">➕</span>
                                Add Product
                            </Button>
                        </Link>
                        <Link href="/orders/create">
                            <Button className="w-full justify-start" variant="outline">
                                <span className="mr-2">🛒</span>
                                Create Order
                            </Button>
                        </Link>
                        <Link href="/categories/create">
                            <Button className="w-full justify-start" variant="outline">
                                <span className="mr-2">📁</span>
                                Add Category
                            </Button>
                        </Link>
                        <Link href="/users/create">
                            <Button className="w-full justify-start" variant="outline">
                                <span className="mr-2">👤</span>
                                Add User
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Recent Orders */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold text-gray-900">📋 Recent Orders</h2>
                            <Link href="/orders">
                                <Button variant="outline" size="sm">View All</Button>
                            </Link>
                        </div>
                        <div className="space-y-4">
                            {recentOrders.length > 0 ? (
                                recentOrders.map((order) => (
                                    <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                        <div>
                                            <p className="font-medium text-gray-900">#{order.order_number}</p>
                                            <p className="text-sm text-gray-500">{order.user.name}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-medium text-gray-900">{formatCurrency(order.total_amount)}</p>
                                            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                                                {order.status}
                                            </span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 text-center py-4">No recent orders</p>
                            )}
                        </div>
                    </div>

                    {/* Low Stock Products */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold text-gray-900">⚠️ Low Stock Alert</h2>
                            <Link href="/products">
                                <Button variant="outline" size="sm">Manage Inventory</Button>
                            </Link>
                        </div>
                        <div className="space-y-4">
                            {lowStockProducts.length > 0 ? (
                                lowStockProducts.map((product) => (
                                    <div key={product.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg border-l-4 border-red-400">
                                        <div>
                                            <p className="font-medium text-gray-900">{product.name}</p>
                                            <p className="text-sm text-gray-500">SKU: {product.sku}</p>
                                            <p className="text-sm text-gray-500">{product.category.name}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-lg font-bold text-red-600">{product.stock_quantity}</p>
                                            <p className="text-xs text-red-500">units left</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 text-center py-4">All products well stocked! 🎉</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Additional Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <span className="text-2xl mr-4">📊</span>
                            <div>
                                <p className="text-sm font-medium text-gray-500">Categories</p>
                                <p className="text-2xl font-semibold text-gray-900">{stats.total_categories}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <span className="text-2xl mr-4">👥</span>
                            <div>
                                <p className="text-sm font-medium text-gray-500">Total Users</p>
                                <p className="text-2xl font-semibold text-gray-900">{stats.total_users}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <span className="text-2xl mr-4">🚫</span>
                            <div>
                                <p className="text-sm font-medium text-gray-500">Out of Stock</p>
                                <p className="text-2xl font-semibold text-gray-900">{stats.products_out_of_stock}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}