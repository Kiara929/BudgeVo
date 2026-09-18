<?php

namespace App\Http\Controllers;

use App\Models\SubGoal;
use App\Models\Goal;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Schema;


class SubGoalController extends Controller
{
    public function index(Request $request, $goalId)
    {
        $goal = Goal::where('goal_id', $goalId)
            ->where('user_id', Auth::id())
            ->firstOrFail();

        $subGoals = SubGoal::where('goal_id', $goal->goal_id)
            ->withSum('transactions', 'amount')
            ->get()
            ->map(function ($subGoal) {
                return [
                    'subgoal_id' => $subGoal->subgoal_id,
                    'goal_id' => $subGoal->goal_id,
                    'subgoal_name' => $subGoal->subgoal_name,
                    'target_amount' => (float) $subGoal->target_amount,
                    'current_amount' => (float) ($subGoal->transactions_sum_amount ?? 0),
                    'start_date' => $subGoal->start_date,
                    'target_date' => $subGoal->target_date,
                    'status' => $subGoal->status,
                ];
            });

        return response()->json($subGoals->values());
    }

    public function create(Request $request, $goalId)
    {
        $validated = $request->validate([
            'subgoal_name' => [
                'required',
                'string',
                'max:100'
            ],
            'target_amount' => [
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

        $goal = Goal::where('goal_id', $goalId)
        ->where('user_id', Auth::id())
        ->firstOrFail(); // 404s if this goal isn't theirs

        // $user = Auth::user();
        // $goal = Auth::goal();

        $subgoal = SubGoal::create([
            'goal_id' => $goal->goal_id,
            'subgoal_name' => $validated['subgoal_name'],
            'target_amount' => $validated['target_amount'],
            'start_date' => $validated['start_date'],
            'target_date' => $validated['target_date'],
            'status' => $validated['status'],
        ]);

        return response()->json([
            'message' => 'Sub Goal added successfully.',
            'sub-goal' => $subgoal
        ], 201);
    }
   

    public function show(Request $request)
    {
        
    }

    public function headings()
{
    return response()->json([
        [
            'name' => 'Sub Goal Name',
            'field' => 'subgoal_name',
            'type' => 'text'
        ],
        [
            'name' => 'Target Amount',
            'field' => 'target_amount',
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