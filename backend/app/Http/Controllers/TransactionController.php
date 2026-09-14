<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Schema;


class TransactionController extends Controller
{
    public function index(Request $request)
    {
        // Get the authenticated user
        $user = Auth::user();

        // Retrieve transactions for the authenticated user
        $transactions = Transaction::where('user_id', $user->id)->get();

        return response()->json($transactions);
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