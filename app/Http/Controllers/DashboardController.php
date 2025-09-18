<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the ERP dashboard.
     */
    public function index()
    {
        // Get key statistics
        $stats = [
            'total_products' => Product::count(),
            'total_categories' => Category::count(),
            'total_orders' => Order::count(),
            'total_users' => User::count(),
            'pending_orders' => Order::pending()->count(),
            'low_stock_products' => Product::lowStock()->count(),
            'total_revenue' => Order::completed()->sum('total_amount'),
            'products_out_of_stock' => Product::where('stock_quantity', 0)->count(),
        ];

        // Recent orders
        $recentOrders = Order::with(['user', 'shippingAddress'])
            ->latest()
            ->limit(5)
            ->get();

        // Low stock products
        $lowStockProducts = Product::with('category')
            ->lowStock()
            ->limit(5)
            ->get();

        // Monthly revenue chart data (last 6 months)
        $monthlyRevenue = Order::completed()
            ->select(
                DB::raw('strftime("%m", created_at) as month'),
                DB::raw('strftime("%Y", created_at) as year'),
                DB::raw('SUM(total_amount) as revenue')
            )
            ->where('created_at', '>=', now()->subMonths(6))
            ->groupBy('year', 'month')
            ->orderBy('year')
            ->orderBy('month')
            ->get();

        // Order status distribution
        $orderStatusCounts = Order::select('status', DB::raw('count(*) as count'))
            ->groupBy('status')
            ->get()
            ->pluck('count', 'status');

        return Inertia::render('dashboard', [
            'stats' => $stats,
            'recentOrders' => $recentOrders,
            'lowStockProducts' => $lowStockProducts,
            'monthlyRevenue' => $monthlyRevenue,
            'orderStatusCounts' => $orderStatusCounts,
        ]);
    }
}