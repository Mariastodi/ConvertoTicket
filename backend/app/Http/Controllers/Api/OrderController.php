<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\TicketType;
use App\Services\PricingService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class OrderController extends Controller
{
    public function __construct(private PricingService $pricing)
    {
    }

    public function show(string $code)
    {
        $order = Order::with('items')->where('code', $code)->firstOrFail();

        return response()->json($order);
    }

    public function checkout(Request $request)
    {
        $data = $request->validate([
            'buyer.name' => 'required|string|max:180',
            'buyer.email' => 'required|email',
            'buyer.document' => 'required|string|max:20',
            'buyer.phone' => 'required|string|max:20',
            'payment_method' => 'required|in:pix,cartao',
            'items' => 'required|array|min:1',
            'items.*.ticket_type_id' => 'required|exists:ticket_types,id',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.experience_date' => 'nullable|date',
        ]);

        return DB::transaction(function () use ($data) {
            $subtotal = 0;
            $quantity = 0;
            $items = [];

            foreach ($data['items'] as $item) {
                $ticketType = TicketType::findOrFail($item['ticket_type_id']);
                $lineTotal = $ticketType->price * $item['quantity'];
                $subtotal += $lineTotal;
                $quantity += $item['quantity'];

                $items[] = [
                    'ticket_type_id' => $ticketType->id,
                    'title_snapshot' => $ticketType->ticketable->title,
                    'variant_snapshot' => $ticketType->name,
                    'experience_date' => $item['experience_date'] ?? null,
                    'unit_price' => $ticketType->price,
                    'quantity' => $item['quantity'],
                ];
            }

            $totals = $this->pricing->calculateTotal($subtotal, $quantity);

            $order = Order::create([
                'code' => 'CV-'.strtoupper(Str::random(6)),
                'user_id' => auth('sanctum')->id(),
                'buyer_name' => $data['buyer']['name'],
                'buyer_email' => $data['buyer']['email'],
                'buyer_document' => $data['buyer']['document'],
                'buyer_phone' => $data['buyer']['phone'],
                'payment_method' => $data['payment_method'],
                'subtotal' => $totals['subtotal'],
                'fee' => $totals['fee'],
                'total' => $totals['total'],
                'status' => 'pago',
            ]);

            $order->items()->createMany($items);

            return response()->json($order->load('items'), 201);
        });
    }
}
