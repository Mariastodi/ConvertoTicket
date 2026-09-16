<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Http\Request;

class EventController extends Controller
{
    public function index(Request $request)
    {
        $events = Event::query()
            ->with(['category', 'venue', 'ticketTypes'])
            ->where('status', 'publicado')
            ->when($request->query('categoria'), fn ($query, $categoria) => $query->whereHas(
                'category',
                fn ($q) => $q->where('slug', $categoria)
            ))
            ->when($request->query('formato'), fn ($query, $formato) => $query->where('format', $formato))
            ->when($request->query('busca'), fn ($query, $busca) => $query->where('title', 'like', "%{$busca}%"))
            ->orderBy('event_date')
            ->paginate(12);

        return response()->json($events);
    }

    public function show(string $slug)
    {
        $event = Event::query()
            ->with(['category', 'venue', 'ticketTypes', 'organizer'])
            ->where('slug', $slug)
            ->where('status', 'publicado')
            ->firstOrFail();

        return response()->json($event);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string|max:180',
            'subtitle' => 'nullable|string|max:220',
            'description' => 'nullable|string',
            'category_id' => 'nullable|exists:categories,id',
            'venue_id' => 'nullable|exists:venues,id',
            'format' => 'required|in:presencial,online',
            'online_url' => 'nullable|url',
            'cover_image' => 'nullable|url',
            'event_date' => 'required|date',
            'event_time' => 'required',
            'tickets' => 'required|array|min:1',
            'tickets.*.name' => 'required|string|max:120',
            'tickets.*.price' => 'required|numeric|min:0',
            'tickets.*.quantity_available' => 'required|integer|min:1',
        ]);

        $event = Event::create([
            ...$data,
            'organizer_id' => $request->user()->id,
            'slug' => str($data['title'])->slug(),
            'status' => 'publicado',
        ]);

        foreach ($data['tickets'] as $ticket) {
            $event->ticketTypes()->create($ticket);
        }

        return response()->json($event->load('ticketTypes'), 201);
    }

    public function update(Request $request, Event $event)
    {
        $this->authorize('update', $event);

        $event->update($request->validate([
            'title' => 'sometimes|string|max:180',
            'subtitle' => 'sometimes|nullable|string|max:220',
            'description' => 'sometimes|nullable|string',
            'event_date' => 'sometimes|date',
            'event_time' => 'sometimes',
            'status' => 'sometimes|in:rascunho,publicado,encerrado',
        ]));

        return response()->json($event);
    }

    public function destroy(Event $event)
    {
        $this->authorize('delete', $event);

        $event->delete();

        return response()->json(null, 204);
    }
}
