import React from 'react';
import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

export default function Welcome() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            <div className="container mx-auto px-4 py-12">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-6xl font-bold text-white mb-6">
                        📊 ERP Inventory & Sales
                    </h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        Complete business management solution for inventory tracking, sales management, 
                        and customer relationships. Streamline your operations with our powerful ERP system.
                    </p>
                </div>

                {/* Feature Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                        <div className="text-4xl mb-4">📦</div>
                        <h3 className="text-xl font-semibold text-white mb-3">Inventory Management</h3>
                        <p className="text-gray-300 text-sm">
                            Track products, categories, stock levels, and get low-stock alerts automatically.
                        </p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                        <div className="text-4xl mb-4">💰</div>
                        <h3 className="text-xl font-semibold text-white mb-3">Sales Management</h3>
                        <p className="text-gray-300 text-sm">
                            Create orders, track sales performance, and manage order fulfillment seamlessly.
                        </p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                        <div className="text-4xl mb-4">👥</div>
                        <h3 className="text-xl font-semibold text-white mb-3">User Management</h3>
                        <p className="text-gray-300 text-sm">
                            Manage customers, staff, and admins with role-based access control.
                        </p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                        <div className="text-4xl mb-4">📍</div>
                        <h3 className="text-xl font-semibold text-white mb-3">Address Management</h3>
                        <p className="text-gray-300 text-sm">
                            Handle multiple addresses per customer with shipping and billing options.
                        </p>
                    </div>
                </div>

                {/* Key Features */}
                <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 mb-16 border border-white/10">
                    <h2 className="text-3xl font-bold text-white text-center mb-8">🚀 Key Features</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div className="flex items-center space-x-3">
                                <span className="text-green-400">✅</span>
                                <span className="text-white">Real-time inventory tracking</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <span className="text-green-400">✅</span>
                                <span className="text-white">Order management with status tracking</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <span className="text-green-400">✅</span>
                                <span className="text-white">Product categorization</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <span className="text-green-400">✅</span>
                                <span className="text-white">Low stock alerts</span>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center space-x-3">
                                <span className="text-green-400">✅</span>
                                <span className="text-white">Customer address management</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <span className="text-green-400">✅</span>
                                <span className="text-white">Role-based access control</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <span className="text-green-400">✅</span>
                                <span className="text-white">Sales analytics & reporting</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <span className="text-green-400">✅</span>
                                <span className="text-white">Auto-generated order numbers</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Dashboard Preview */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-white mb-6">📈 Powerful Dashboard</h2>
                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 max-w-4xl mx-auto">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                            <div className="bg-blue-500/20 rounded-lg p-4">
                                <div className="text-2xl font-bold text-blue-300">1,234</div>
                                <div className="text-sm text-blue-200">Total Products</div>
                            </div>
                            <div className="bg-green-500/20 rounded-lg p-4">
                                <div className="text-2xl font-bold text-green-300">$45,678</div>
                                <div className="text-sm text-green-200">Revenue</div>
                            </div>
                            <div className="bg-orange-500/20 rounded-lg p-4">
                                <div className="text-2xl font-bold text-orange-300">89</div>
                                <div className="text-sm text-orange-200">Pending Orders</div>
                            </div>
                            <div className="bg-red-500/20 rounded-lg p-4">
                                <div className="text-2xl font-bold text-red-300">12</div>
                                <div className="text-sm text-red-200">Low Stock</div>
                            </div>
                        </div>
                        <p className="text-gray-300 text-sm">
                            Get real-time insights into your business performance
                        </p>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-white mb-6">Ready to get started? 🎯</h2>
                    <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
                        Join thousands of businesses using our ERP system to streamline their operations and boost productivity.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
                        <Link href="/register">
                            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold px-8 py-4 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200">
                                🚀 Start Free Trial
                            </Button>
                        </Link>
                        
                        <Link href="/login">
                            <Button variant="outline" size="lg" className="border-2 border-white/30 text-white hover:bg-white/10 font-semibold px-8 py-4 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200">
                                🔑 Sign In
                            </Button>
                        </Link>
                    </div>

                    <div className="mt-8 text-sm text-gray-400">
                        <p>Demo credentials: admin@example.com / password</p>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-16 pt-8 border-t border-white/10 text-center text-gray-400 text-sm">
                    <p>© 2024 ERP Inventory & Sales. Built with Laravel, React, and Inertia.js</p>
                </div>
            </div>
        </div>
    );
}