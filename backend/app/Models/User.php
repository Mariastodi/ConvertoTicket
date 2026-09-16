<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'document',
        'phone',
        'password',
        'role',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    public function events()
    {
        return $this->hasMany(Event::class, 'organizer_id');
    }

    public function experiences()
    {
        return $this->hasMany(Experience::class, 'organizer_id');
    }

    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    public function isOrganizer(): bool
    {
        return $this->role === 'organizador';
    }
}
