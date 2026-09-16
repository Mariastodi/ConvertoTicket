<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->foreignId('organizer_id')->constrained('users');
            $table->foreignId('category_id')->nullable()->constrained('categories');
            $table->foreignId('venue_id')->nullable()->constrained('venues');
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('subtitle')->nullable();
            $table->text('description')->nullable();
            $table->enum('format', ['presencial', 'online'])->default('presencial');
            $table->string('online_url')->nullable();
            $table->string('cover_image')->nullable();
            $table->date('event_date');
            $table->time('event_time');
            $table->enum('status', ['rascunho', 'publicado', 'encerrado'])->default('rascunho');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};
