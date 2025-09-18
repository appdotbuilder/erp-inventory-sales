<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Category>
 */
class CategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->randomElement([
                'Electronics',
                'Clothing & Fashion',
                'Home & Garden',
                'Books & Media',
                'Sports & Outdoors',
                'Health & Beauty',
                'Toys & Games',
                'Food & Beverages',
                'Automotive',
                'Office Supplies'
            ]),
            'description' => fake()->paragraph(),
        ];
    }
}