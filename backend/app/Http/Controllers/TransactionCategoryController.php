<?php

namespace App\Http\Controllers;

use App\Models\TransactionCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Schema;


class TransactionCategoryController extends Controller
{
    public function index(Request $request)
    {
        // Get the authenticated user
        $user = Auth::user();

        // Retrieve transactions for the authenticated user
        $transactionCategories = TransactionCategory::where('user_id', $user->id)->get();

        return response()->json($transactionCategories);
    }

    public function create(Request $request)
    {
        $credentials = $request->validate([
            'category_name' => [
                'required',
                'string',
                'max:100'
            ],

            'category_type' => [
                'required',
                'string',
                'max:100'
            ],
        ]);

        $user = Auth::user();

        $category = TransactionCategory::create([
            'user_id' => $user->id,
            'category_name' => $credentials['category_name'],
            'category_type' => $credentials['category_type'],
        ]);

        return response()->json([
            'message' => 'Category added successfully.',
            'category' => $category
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