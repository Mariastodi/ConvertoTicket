<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Experience;

class ExperienceController extends Controller
{
    public function index()
    {
        return response()->json(
            Experience::with('ticketTypes')->get()
        );
    }

    public function show(string $slug)
    {
        $experience = Experience::with(['ticketTypes', 'dateSlots'])
            ->where('slug', $slug)
            ->firstOrFail();

        return response()->json($experience);
    }

    public function dates(string $slug)
    {
        $experience = Experience::where('slug', $slug)->firstOrFail();

        return response()->json(
            $experience->dateSlots()->orderBy('date')->get()
        );
    }

    public function tickets(string $slug)
    {
        $experience = Experience::where('slug', $slug)->firstOrFail();

        return response()->json($experience->ticketTypes);
    }
}
