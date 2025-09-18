<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'category_id' => Category::factory(),
            'name' => fake()->randomElement([
                'Wireless Headphones',
                'Smart Phone',
                'Laptop Computer',
                'Coffee Maker',
                'Running Shoes',
                'Winter Jacket',
                'Desk Chair',
                'LED Monitor',
                'Bluetooth Speaker',
                'Fitness Tracker'
            ]),
            'sku' => fake()->unique()->bothify('SKU-####-****'),
            'description' => fake()->paragraph(),
            'price' => fake()->randomFloat(2, 9.99, 999.99),
            'stock_quantity' => fake()->numberBetween(0, 100),
        ];
    }

    /**
     * Indicate that the product is out of stock.
     */
    public function outOfStock(): static
    {
        return $this->state(fn (array $attributes) => [
            'stock_quantity' => 0,
        ]);
    }

    /**
     * Indicate that the product has low stock.
     */
    public function lowStock(): static
    {
        return $this->state(fn (array $attributes) => [
            'stock_quantity' => fake()->numberBetween(1, 5),
        ]);
    }

    /**
     * Indicate that the product is premium priced.
     */
    public function premium(): static
    {
        return $this->state(fn (array $attributes) => [
            'price' => fake()->randomFloat(2, 500, 2000),
            'name' => 'Premium ' . fake()->randomElement([
                'Wireless Headphones',
                'Smart Phone',
                'Laptop Computer',
                'Coffee Maker'
            ]),
        ]);
    }
}