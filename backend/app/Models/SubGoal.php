<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SubGoal extends Model
{
    protected $table = 'sub_goals';

    protected $primaryKey = 'subgoal_id';

    public $timestamps = false;

    protected $fillable = [
        'goal_id',
        'subgoal_name',
        'target_amount',
        'start_date',
        'target_date',
        'status',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    // public function category()
    // {
    //     return $this->belongsTo(
    //         TransactionCategory::class,
    //         'category_id',
    //         'category_id'
    //     );
    // }

    public function goal()
    {
        return $this->belongsTo(
            Goal::class,
            'goal_id',
            'goal_id'
        );
    }

    public function transactions()
    {
        return $this->hasMany(Transaction::class, 'sub_goal_id', 'subgoal_id');
    }
}