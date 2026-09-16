<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SecurityTest extends TestCase
{
    use RefreshDatabase;

    public function test_registration_cannot_escalate_to_organizer(): void
    {
        $response = $this->postJson('/api/auth/register', [
            'name' => 'Visitante',
            'email' => 'visitante@example.com',
            'password' => 'Senha-forte-123',
            'password_confirmation' => 'Senha-forte-123',
            'role' => 'organizador',
        ]);

        $response
            ->assertCreated()
            ->assertJsonPath('user.role', 'comprador');
    }

    public function test_checkout_requires_authentication(): void
    {
        $this->postJson('/api/checkout', [])->assertUnauthorized();
    }

    public function test_order_lookup_requires_authentication(): void
    {
        $this->getJson('/api/orders/CV-UNKNOWN')->assertUnauthorized();
    }
}
