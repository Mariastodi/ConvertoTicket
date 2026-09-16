<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('code')->unique();
            $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('buyer_name');
            $table->string('buyer_email');
            $table->string('buyer_document')->nullable();
            $table->string('buyer_phone')->nullable();
            $table->enum('payment_method', ['pix', 'cartao'])->default('pix');
            $table->decimal('subtotal', 10, 2);
            $table->decimal('fee', 10, 2);
            $table->decimal('total', 10, 2);
            $table->enum('status', ['pendente', 'pago', 'cancelado'])->default('pendente');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
