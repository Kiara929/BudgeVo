<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use App\Models\Goal;
use App\Models\SubGoal;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Schema;


class TransactionController extends Controller
{
    public function index(Request $request)
    {
        $transactions = Transaction::with(['category', 'goal', 'subGoal'])
            ->where('user_id', Auth::id())
            ->orderBy('transaction_date', 'desc')
            ->get();

        return response()->json($transactions);
    }

    public function create(Request $request)
    {
        $validated = $request->validate([
            'category_id' => ['required', 'integer'],
            'goal_id' => ['nullable', 'integer'],
            'sub_goal_id' => ['nullable', 'integer'],
            'type' => ['required', 'string', 'max:100'],
            'transaction_date' => ['required', 'date'],
            'amount' => ['required', 'numeric'],
            'description' => ['nullable', 'string', 'max:255'],
        ]);

        $user = Auth::user();

        if (!empty($validated['goal_id'])) {
            Goal::where('goal_id', $validated['goal_id'])
                ->where('user_id', $user->id)
                ->firstOrFail();
        }

        if (!empty($validated['sub_goal_id'])) {
            SubGoal::where('subgoal_id', $validated['sub_goal_id'])
                ->whereHas('goal', fn ($query) => $query->where('user_id', $user->id))
                ->firstOrFail();
        }

        $transaction = Transaction::create([
            'user_id' => $user->id,
            'category_id' => $validated['category_id'],
            'goal_id' => $validated['goal_id'] ?? null,
            'sub_goal_id' => $validated['sub_goal_id'] ?? null,
            'type' => $validated['type'],
            'transaction_date' => $validated['transaction_date'],
            'amount' => $validated['amount'],
            'description' => $validated['description'] ?? null,
        ]);

        return response()->json([
            'message' => 'Transaction added successfully.',
            'transaction' => $transaction
        ], 201);
    }
   

    public function show(Request $request)
    {
        
    }

    public function headings()
{
    return response()->json([
        [
            'name' => 'Category',
            'field' => 'category_id',
            'type' => 'select'
        ],
        [
            'name' => 'Goal',
            'field' => 'goal_id',
            'type' => 'select'
        ],
        [
            'name' => 'Description',
            'field' => 'description',
            'type' => 'text'
        ],
        [
            'name' => 'Amount',
            'field' => 'amount',
            'type' => 'number'
        ],
        [
            'name' => 'Date',
            'field' => 'transaction_date',
            'type' => 'date'
        ],
        
    ]);
}
}