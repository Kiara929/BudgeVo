<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TransactionCategory extends Model
{
    protected $table = 'transactions_categories';

    protected $primaryKey = 'category_id';

    public $timestamps = false;

    protected $fillable = [
        'user_id',
        'category_name',
        'category_type',
    ];

    public function user()
    {
        return $this->belongsTo(
            User::class,
            'user_id',
            'id'
        );
    }

    public function transactions()
    {
        return $this->hasMany(
            Transaction::class,
            'category_id',
            'category_id'
        );
    }
}