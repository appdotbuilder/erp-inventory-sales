import React from 'react';
import { Link } from '@inertiajs/react';
import AppShell from '@/components/app-shell';
import { Button } from '@/components/ui/button';

interface Category {
    id: number;
    name: string;
    description: string | null;
    products_count: number;
    created_at: string;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface CategoriesData {
    data: Category[];
    current_page: number;
    last_page: number;
    links: PaginationLink[];
    per_page: number;
    total: number;
}

interface Props {
    categories: CategoriesData;
    [key: string]: unknown;
}

export default function CategoriesIndex({ categories }: Props) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-CA', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <AppShell>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">📊 Product Categories</h1>
                        <p className="text-gray-600 mt-1">Organize your products into categories</p>
                    </div>
                    <Link href="/categories/create">
                        <Button className="bg-blue-600 hover:bg-blue-700">
                            <span className="mr-2">➕</span>
                            Add Category
                        </Button>
                    </Link>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white rounded-lg shadow p-4 border-l-4 border-blue-500">
                        <p className="text-sm font-medium text-gray-500">Total Categories</p>
                        <p className="text-2xl font-semibold text-gray-900">{categories.total}</p>
                    </div>
                    <div className="bg-white rounded-lg shadow p-4 border-l-4 border-green-500">
                        <p className="text-sm font-medium text-gray-500">Total Products</p>
                        <p className="text-2xl font-semibold text-gray-900">
                            {categories.data.reduce((sum, cat) => sum + cat.products_count, 0)}
                        </p>
                    </div>
                    <div className="bg-white rounded-lg shadow p-4 border-l-4 border-purple-500">
                        <p className="text-sm font-medium text-gray-500">Avg Products/Category</p>
                        <p className="text-2xl font-semibold text-gray-900">
                            {categories.total > 0 
                                ? Math.round(categories.data.reduce((sum, cat) => sum + cat.products_count, 0) / categories.total)
                                : 0
                            }
                        </p>
                    </div>
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.data.length > 0 ? (
                        categories.data.map((category) => (
                            <div key={category.id} className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                                <div className="p-6">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                                {category.name}
                                            </h3>
                                            {category.description && (
                                                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                                    {category.description}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                                        <div className="flex items-center text-sm text-gray-500">
                                            <span className="mr-2">📦</span>
                                            <span>{category.products_count} products</span>
                                        </div>
                                        <div className="text-xs text-gray-400">
                                            {formatDate(category.created_at)}
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
                                    <div className="flex items-center justify-between">
                                        <div className="flex space-x-3">
                                            <Link 
                                                href={`/categories/${category.id}`}
                                                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                                            >
                                                View Details
                                            </Link>
                                            <Link 
                                                href={`/categories/${category.id}/edit`}
                                                className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
                                            >
                                                Edit
                                            </Link>
                                        </div>
                                        {category.products_count > 0 && (
                                            <Link 
                                                href={`/products?category=${category.id}`}
                                                className="text-sm text-gray-600 hover:text-gray-800"
                                            >
                                                View Products →
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full">
                            <div className="text-center py-12 bg-white rounded-lg shadow">
                                <span className="text-6xl mb-4 block">📊</span>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">No categories found</h3>
                                <p className="text-gray-500 mb-6">Get started by creating your first product category.</p>
                                <Link href="/categories/create">
                                    <Button className="bg-blue-600 hover:bg-blue-700">
                                        <span className="mr-2">➕</span>
                                        Create Category
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {categories.last_page > 1 && (
                    <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 rounded-lg shadow">
                        <div className="flex-1 flex justify-between sm:hidden">
                            {categories.links.find(link => link.label === '&laquo; Previous')?.url && (
                                <Link 
                                    href={categories.links.find(link => link.label === '&laquo; Previous')?.url || '#'}
                                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                >
                                    Previous
                                </Link>
                            )}
                            {categories.links.find(link => link.label === 'Next &raquo;')?.url && (
                                <Link 
                                    href={categories.links.find(link => link.label === 'Next &raquo;')?.url || '#'}
                                    className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                >
                                    Next
                                </Link>
                            )}
                        </div>
                        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                            <div>
                                <p className="text-sm text-gray-700">
                                    Showing <span className="font-medium">{((categories.current_page - 1) * categories.per_page) + 1}</span> to{' '}
                                    <span className="font-medium">
                                        {Math.min(categories.current_page * categories.per_page, categories.total)}
                                    </span> of{' '}
                                    <span className="font-medium">{categories.total}</span> results
                                </p>
                            </div>
                            <div>
                                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                                    {categories.links.map((link, index) => (
                                        link.url ? (
                                            <Link
                                                key={index}
                                                href={link.url}
                                                className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                                    link.active 
                                                        ? 'z-10 bg-blue-50 border-blue-500 text-blue-600' 
                                                        : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                                }`}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        ) : (
                                            <span
                                                key={index}
                                                className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-300"
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        )
                                    ))}
                                </nav>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AppShell>
    );
}