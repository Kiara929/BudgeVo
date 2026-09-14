<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Attributes\Fillable;

#[Fillable([
    'category_id',
    'goal_id',
    'type',
    'transaction_date',
    'amount',
    'description'
])]

class Transaction extends Model
{
    protected $table = 'transactions';

    protected $primaryKey = 'transaction_id';

    // Relationships

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function category()
    {
        return $this->belongsTo(
            TransactionCategory::class,
            'category_id',
            'category_id'
        );
    }

    public function goal()
    {
        return $this->belongsTo(
            Goal::class,
            'goal_id',
            'goal_id'
        );
    }
}