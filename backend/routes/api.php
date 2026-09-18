<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\TransactionCategoryController;
use App\Http\Controllers\GoalController;
use App\Http\Controllers\SubGoalController;



Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/login', [AuthController::class, 'login']);
Route::post('/signup', [AuthController::class, 'signup']);
Route::get('/transactions', [TransactionController::class, 'index'])->middleware('auth:sanctum');
Route::post('/transactions/create', [TransactionController::class, 'create'])->middleware('auth:sanctum');
Route::get('/transactions/heading', [TransactionController::class, 'headings']);
Route::get('/transactions/categories', [TransactionCategoryController::class, 'index']);
Route::post('/transactions/categories/create', [TransactionCategoryController::class, 'create'])->middleware('auth:sanctum');
Route::get('/goals', [GoalController::class, 'index'])->middleware('auth:sanctum');
Route::get('/goals/heading', [GoalController::class, 'headings']);
Route::post('/goals/create', [GoalController::class, 'create'])->middleware('auth:sanctum');
Route::get('/goals/{goalId}/subgoals', [SubGoalController::class, 'index'])->middleware('auth:sanctum');
Route::post('/goals/{goalId}/subgoals/create', [SubGoalController::class, 'create'])->middleware('auth:sanctum');
Route::get('/goals/subgoals/heading', [SubGoalController::class, 'headings']);






