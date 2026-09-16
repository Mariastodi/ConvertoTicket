<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    protected $fillable = [
        'organizer_id',
        'category_id',
        'venue_id',
        'title',
        'slug',
        'subtitle',
        'description',
        'format',
        'online_url',
        'cover_image',
        'event_date',
        'event_time',
        'status',
    ];

    protected $casts = [
        'event_date' => 'date',
    ];

    public function organizer()
    {
        return $this->belongsTo(User::class, 'organizer_id');
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function venue()
    {
        return $this->belongsTo(Venue::class);
    }

    public function ticketTypes()
    {
        return $this->morphMany(TicketType::class, 'ticketable');
    }
}
