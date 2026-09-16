<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('experience_date_slots', function (Blueprint $table) {
            $table->id();
            $table->foreignId('experience_id')->constrained('experiences')->cascadeOnDelete();
            $table->date('date');
            $table->enum('season', ['baixa', 'media', 'alta'])->default('baixa');
            $table->decimal('base_price', 10, 2);
            $table->unsignedInteger('capacity')->nullable();
            $table->timestamps();

            $table->unique(['experience_id', 'date']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('experience_date_slots');
    }
};
