<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\User;
use App\Models\UserAddress;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create admin user
        $admin = User::factory()->admin()->create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
        ]);

        // Create staff user
        $staff = User::factory()->staff()->create([
            'name' => 'Staff User',
            'email' => 'staff@example.com',
        ]);

        // Create test user
        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        // Create additional users
        $users = User::factory(10)->create();

        // Create categories
        $categories = Category::factory(10)->create();

        // Create products
        foreach ($categories as $category) {
            Product::factory(5)->create(['category_id' => $category->id]);
        }

        // Create addresses for users
        foreach ($users->take(5) as $user) {
            UserAddress::factory(2)->create(['user_id' => $user->id]);
            UserAddress::factory()->default()->create(['user_id' => $user->id]);
        }

        // Create admin and staff addresses
        UserAddress::factory()->default()->create(['user_id' => $admin->id]);
        UserAddress::factory()->default()->create(['user_id' => $staff->id]);

        // Create orders with items
        $products = Product::all();
        $usersWithAddresses = User::whereHas('addresses')->get();

        foreach ($usersWithAddresses->take(8) as $user) {
            $order = Order::factory()->create([
                'user_id' => $user->id,
                'shipping_address_id' => $user->addresses->first()->id,
            ]);

            // Add 1-3 random products to each order
            $orderProducts = $products->random(random_int(1, 3));
            $totalAmount = 0;

            foreach ($orderProducts as $product) {
                $quantity = random_int(1, 3);
                $unitPrice = (float) $product->price;
                $subtotal = $quantity * $unitPrice;

                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $product->id,
                    'quantity' => $quantity,
                    'unit_price' => $unitPrice,
                    'subtotal' => $subtotal,
                ]);

                $totalAmount += $subtotal;
            }

            $order->update(['total_amount' => $totalAmount]);
        }

        $this->command->info('ERP system data seeded successfully!');
        $this->command->info('Admin user: admin@example.com');
        $this->command->info('Staff user: staff@example.com');
        $this->command->info('Test user: test@example.com');
        $this->command->info('Password for all users: password');
    }
}