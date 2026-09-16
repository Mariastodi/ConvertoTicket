<?php

namespace App\Services;

class PricingService
{
    private const FEE_PER_TICKET = 0.5;

    public function calculateFee(int $quantity): float
    {
        if ($quantity <= 0) {
            return 0.0;
        }

        return $quantity * self::FEE_PER_TICKET;
    }

    public function calculateTotal(float $subtotal, int $quantity): array
    {
        $fee = $this->calculateFee($quantity);

        return [
            'subtotal' => round($subtotal, 2),
            'fee' => round($fee, 2),
            'total' => round($subtotal + $fee, 2),
        ];
    }
}
