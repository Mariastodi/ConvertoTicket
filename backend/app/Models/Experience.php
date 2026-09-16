<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Experience extends Model
{
    protected $fillable = [
        'organizer_id',
        'title',
        'slug',
        'tagline',
        'description',
        'kind',
        'city',
        'cover_image',
        'uses_date_pricing',
    ];

    protected $casts = [
        'uses_date_pricing' => 'boolean',
    ];

    public function organizer()
    {
        return $this->belongsTo(User::class, 'organizer_id');
    }

    public function dateSlots()
    {
        return $this->hasMany(ExperienceDateSlot::class);
    }

    public function ticketTypes()
    {
        return $this->morphMany(TicketType::class, 'ticketable');
    }
}
