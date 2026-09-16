<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'code',
        'user_id',
        'buyer_name',
        'buyer_email',
        'buyer_document',
        'buyer_phone',
        'payment_method',
        'subtotal',
        'fee',
        'total',
        'status',
    ];

    protected $casts = [
        'subtotal' => 'decimal:2',
        'fee' => 'decimal:2',
        'total' => 'decimal:2',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }
}
