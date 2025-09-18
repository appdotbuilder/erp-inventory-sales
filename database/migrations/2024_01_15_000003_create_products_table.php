<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('category_id')->constrained()->cascadeOnDelete();
            $table->string('name');
            $table->string('sku')->unique()->comment('Unique product code');
            $table->text('description')->nullable();
            $table->decimal('price', 10, 2)->comment('Product price');
            $table->integer('stock_quantity')->default(0)->comment('Current stock quantity');
            $table->timestamps();
            
            $table->index(['category_id', 'name']);
            $table->index('sku');
            $table->index('stock_quantity');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};