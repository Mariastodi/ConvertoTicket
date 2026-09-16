<?php

use App\Http\Controllers\Api\EventController;
use App\Http\Controllers\Api\ExperienceController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\AuthController;
use Illuminate\Support\Facades\Route;

Route::middleware('throttle:10,1')->group(function () {
    Route::post('/auth/register', [AuthController::class, 'register']);
    Route::post('/auth/login', [AuthController::class, 'login']);
});

Route::get('/events', [EventController::class, 'index']);
Route::get('/events/{slug}', [EventController::class, 'show']);

Route::get('/experiences', [ExperienceController::class, 'index']);
Route::get('/experiences/{slug}', [ExperienceController::class, 'show']);
Route::get('/experiences/{slug}/dates', [ExperienceController::class, 'dates']);
Route::get('/experiences/{slug}/tickets', [ExperienceController::class, 'tickets']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/auth/me', [AuthController::class, 'me']);
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::post('/events', [EventController::class, 'store']);
    Route::put('/events/{event}', [EventController::class, 'update']);
    Route::delete('/events/{event}', [EventController::class, 'destroy']);
    Route::get('/orders/{code}', [OrderController::class, 'show']);
    Route::post('/checkout', [OrderController::class, 'checkout']);
});
