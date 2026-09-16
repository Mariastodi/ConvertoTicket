<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    protected $fillable = [
        'order_id',
        'ticket_type_id',
        'title_snapshot',
        'variant_snapshot',
        'experience_date',
        'unit_price',
        'quantity',
        'qr_code',
    ];

    protected $casts = [
        'experience_date' => 'date',
        'unit_price' => 'decimal:2',
    ];

    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    public function ticketType()
    {
        return $this->belongsTo(TicketType::class);
    }
}
