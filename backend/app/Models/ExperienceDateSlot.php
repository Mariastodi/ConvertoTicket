<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ExperienceDateSlot extends Model
{
    protected $fillable = ['experience_id', 'date', 'season', 'base_price', 'capacity'];

    protected $casts = [
        'date' => 'date',
        'base_price' => 'decimal:2',
    ];

    public function experience()
    {
        return $this->belongsTo(Experience::class);
    }
}
