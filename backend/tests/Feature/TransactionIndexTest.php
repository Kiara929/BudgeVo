<?php

namespace Tests\Feature;

use App\Models\Goal;
use App\Models\SubGoal;
use App\Models\Transaction;
use App\Models\TransactionCategory;
use App\Models\User;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Tests\TestCase;

class TransactionIndexTest extends TestCase
{
    protected function setUp(): void
    {
        parent::setUp();

        if (! Schema::hasTable('transactions_categories')) {
            Schema::create('transactions_categories', function (Blueprint $table) {
                $table->id('category_id');
                $table->foreignId('user_id')->constrained('users');
                $table->string('category_name');
                $table->string('category_type');
            });
        }

        if (! Schema::hasTable('goals')) {
            Schema::create('goals', function (Blueprint $table) {
                $table->id('goal_id');
                $table->foreignId('user_id')->constrained('users');
                $table->string('goal_name');
                $table->string('goal_type');
                $table->decimal('target_amount', 10, 2);
                $table->decimal('current_amount', 10, 2);
                $table->decimal('monthly_target', 10, 2);
                $table->date('start_date');
                $table->date('target_date');
                $table->string('status');
            });
        }

        if (! Schema::hasTable('sub_goals')) {
            Schema::create('sub_goals', function (Blueprint $table) {
                $table->id('subgoal_id');
                $table->foreignId('goal_id')->constrained('goals', 'goal_id');
                $table->string('subgoal_name');
                $table->decimal('target_amount', 10, 2);
                $table->date('start_date');
                $table->date('target_date');
                $table->string('status');
            });
        }

        if (! Schema::hasTable('transactions')) {
            Schema::create('transactions', function (Blueprint $table) {
                $table->id('transaction_id');
                $table->foreignId('user_id')->constrained('users');
                $table->foreignId('category_id')->constrained('transactions_categories', 'category_id');
                $table->foreignId('goal_id')->nullable()->constrained('goals', 'goal_id');
                $table->foreignId('sub_goal_id')->nullable()->constrained('sub_goals', 'subgoal_id');
                $table->string('type');
                $table->date('transaction_date');
                $table->decimal('amount', 10, 2);
                $table->string('description')->nullable();
            });
        }
    }

    public function test_it_returns_transactions_for_the_authenticated_user_with_related_data(): void
    {
        $user = User::factory()->create();
        $otherUser = User::factory()->create();

        $category = TransactionCategory::create([
            'user_id' => $user->id,
            'category_name' => 'Groceries',
            'category_type' => 'expense',
        ]);

        $goal = Goal::create([
            'user_id' => $user->id,
            'goal_name' => 'Emergency Fund',
            'goal_type' => 'savings',
            'target_amount' => 5000,
            'current_amount' => 1500,
            'monthly_target' => 300,
            'start_date' => '2026-01-01',
            'target_date' => '2026-12-31',
            'status' => 'active',
        ]);

        $subGoal = SubGoal::create([
            'goal_id' => $goal->goal_id,
            'subgoal_name' => 'Car Repair',
            'target_amount' => 1000,
            'start_date' => '2026-01-01',
            'target_date' => '2026-06-30',
            'status' => 'active',
        ]);

        Transaction::create([
            'user_id' => $user->id,
            'category_id' => $category->category_id,
            'goal_id' => $goal->goal_id,
            'sub_goal_id' => $subGoal->subgoal_id,
            'type' => 'expense',
            'transaction_date' => '2026-09-15',
            'amount' => 75.50,
            'description' => 'Weekly groceries',
        ]);

        Transaction::create([
            'user_id' => $otherUser->id,
            'category_id' => $category->category_id,
            'goal_id' => $goal->goal_id,
            'sub_goal_id' => $subGoal->subgoal_id,
            'type' => 'expense',
            'transaction_date' => '2026-09-16',
            'amount' => 40.00,
            'description' => 'Other user transaction',
        ]);

        $response = $this->actingAs($user)->getJson('/api/transactions');

        $response->assertOk();
        $response->assertJsonCount(1, '');
        $response->assertJsonPath('0.user_id', $user->id);
        $response->assertJsonPath('0.category.category_id', $category->category_id);
        $response->assertJsonPath('0.goal.goal_id', $goal->goal_id);
        $response->assertJsonPath('0.subGoal.subgoal_id', $subGoal->subgoal_id);
    }

    public function test_it_returns_each_goal_with_its_transaction_total(): void
    {
        $user = User::factory()->create();

        $category = TransactionCategory::create([
            'user_id' => $user->id,
            'category_name' => 'Savings',
            'category_type' => 'income',
        ]);

        $firstGoal = Goal::create([
            'user_id' => $user->id,
            'goal_name' => 'Emergency Fund',
            'goal_type' => 'savings',
            'target_amount' => 5000,
            'current_amount' => 0,
            'monthly_target' => 300,
            'start_date' => '2026-01-01',
            'target_date' => '2026-12-31',
            'status' => 'active',
        ]);

        $secondGoal = Goal::create([
            'user_id' => $user->id,
            'goal_name' => 'Holiday Fund',
            'goal_type' => 'savings',
            'target_amount' => 2000,
            'current_amount' => 0,
            'monthly_target' => 150,
            'start_date' => '2026-01-01',
            'target_date' => '2026-12-31',
            'status' => 'active',
        ]);

        Transaction::create([
            'user_id' => $user->id,
            'category_id' => $category->category_id,
            'goal_id' => $firstGoal->goal_id,
            'type' => 'income',
            'transaction_date' => '2026-09-15',
            'amount' => 125.50,
            'description' => 'Emergency fund contribution',
        ]);

        Transaction::create([
            'user_id' => $user->id,
            'category_id' => $category->category_id,
            'goal_id' => $secondGoal->goal_id,
            'type' => 'income',
            'transaction_date' => '2026-09-16',
            'amount' => 75.25,
            'description' => 'Holiday fund contribution',
        ]);

        $response = $this->actingAs($user)->getJson('/api/goals');

        $response->assertOk();
        $response->assertJsonCount(2, 'goals');
        $response->assertJsonPath('goals.0.goal_id', $firstGoal->goal_id);
        $response->assertJsonPath('goals.0.current_amount', 125.5);
        $response->assertJsonPath('goals.1.goal_id', $secondGoal->goal_id);
        $response->assertJsonPath('goals.1.current_amount', 75.25);
    }
}
