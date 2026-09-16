<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TicketType extends Model
{
    protected $fillable = [
        'name',
        'description',
        'price',
        'quantity_available',
        'sales_start_date',
        'sales_end_date',
    ];

    protected $casts = [
        'price' => 'decimal:2',
    ];

    public function ticketable()
    {
        return $this->morphTo();
    }

    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }
}
