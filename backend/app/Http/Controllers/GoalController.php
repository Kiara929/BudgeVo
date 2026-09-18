<?php

namespace App\Http\Controllers;

use App\Models\Goal;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Schema;


class GoalController extends Controller
{
    public function index(Request $request)
    {
        $goals = Goal::where('user_id', Auth::id())
        ->with([
            'subgoals.transactions',
            'transactions'
        ])
        ->get();

    $goals = $goals->map(function ($goal) {

        if ($goal->subgoals->count() > 0) {

            // Goal has subgoals
            // Add the current amounts of its subgoals
            $currentAmount = $goal->subgoals->sum(function ($subgoal) {
                return $subgoal->transactions->sum('amount');
            });

        } else {

            // Goal has no subgoals
            // Calculate directly from transactions belonging to the goal
            $currentAmount = $goal->transactions->sum('amount');
        }

        return [
            'goal_id' => $goal->goal_id,
            'user_id' => $goal->user_id,
            'goal_name' => $goal->goal_name,
            'goal_type' => $goal->goal_type,
            'target_amount' => $goal->target_amount,
            'current_amount' => $currentAmount,
            'monthly_target' => $goal->monthly_target,
            'start_date' => $goal->start_date,
            'target_date' => $goal->target_date,
            'status' => $goal->status,
        ];
    });

    return response()->json($goals);
    }

    public function create(Request $request)
    {
        $validated = $request->validate([
            'goal_name' => [
                'required',
                'string',
                'max:100'
            ],
            'goal_type' => [
                'required',
                'string',
                'max:100'
            ],
            'target_amount' => [
                'required',
                'numeric',
            ],
            'current_amount' => [
                'required',
                'numeric',
            ],
            'monthly_target' => [
                'required',
                'numeric',
            ],
            'start_date' => [
                'required',
                'date',
            ],
            'target_date' => [
                'required',
                'date',
            ],
            'status' => [
                'required',
                'string',
                'max:100'
            ],
        ]);

        $user = Auth::user();

        $goal = Goal::create([
            'user_id' => $user->id,
            'goal_name' => $validated['goal_name'],
            'goal_type' => $validated['goal_type'],
            'current_amount' => $validated['current_amount'],
            'target_amount' => $validated['target_amount'],
            'monthly_target' => $validated['monthly_target'],
            'start_date' => $validated['start_date'],
            'target_date' => $validated['target_date'],
            'status' => $validated['status'],
        ]);

        return response()->json([
            'message' => 'Goal added successfully.',
            'goal' => $goal
        ], 201);
    }
   

    public function show(Request $request)
    {
        
    }

    public function headings()
{
    return response()->json([
        [
            'name' => 'Goal Name',
            'field' => 'goal_name',
            'type' => 'text'
        ],
        [
            'name' => 'Type',
            'field' => 'goal_type',
            'type' => 'select'
        ],
        [
            'name' => 'Target Amount',
            'field' => 'target_amount',
            'type' => 'number'
        ],
        [
            'name' => 'Current Amount',
            'field' => 'current_amount',
            'type' => 'number'
        ],
        [
            'name' => 'Monthly Contribution',
            'field' => 'monthly_target',
            'type' => 'number'
        ],
        [
            'name' => 'Start Date',
            'field' => 'start_date',
            'type' => 'date'
        ],
        [
            'name' => 'Target Date',
            'field' => 'target_date',
            'type' => 'date'
        ],
        [
            'name' => 'Status',
            'field' => 'status',
            'type' => 'select'
        ],
    ]);
}
}