<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Goal extends Model
{
    protected $table = 'goals';

    protected $primaryKey = 'goal_id';

    public $timestamps = false;

    protected $fillable = [
        'user_id',
        'goal_name',
        'goal_type',
        'target_amount',
        'current_amount',
        'monthly_target',
        'start_date',
        'target_date',
        'status',
    ];

    protected $casts = [
        'target_amount' => 'float',
        'current_amount' => 'float',
        'monthly_target' => 'float',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function transactions()
    {
        return $this->hasMany(Transaction::class, 'goal_id', 'goal_id');
    }

    public function subgoals()
{
    return $this->hasMany(SubGoal::class, 'goal_id', 'goal_id');
}

    // public function category()
    // {
    //     return $this->belongsTo(
    //         TransactionCategory::class,
    //         'category_id',
    //         'category_id'
    //     );
    // }

    // public function goal()
    // {
    //     return $this->belongsTo(
    //         Goal::class,
    //         'goal_id',
    //         'goal_id'
    //     );
    // }
}