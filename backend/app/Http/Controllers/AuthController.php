<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        // Validate the information sent by React
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        // Find the user by email
        $user = User::where('email', $credentials['email'])->first();

        // Check if the user exists and the password is correct
        if (!$user || !Hash::check($credentials['password'], $user->password)) {
            return response()->json([
                'message' => 'Invalid email or password.'
            ], 401);
        }

        Auth::login($user);

        $request->session()->regenerate();

        // Login successful
        return response()->json([
            'message' => 'Login successful.',
            'user' => $user
        ], 200);
    }

    public function signup(Request $request)
    {
        // Validate the information sent by React
        $credentials = $request->validate([
            'email' => ['required', 'email', 'unique:users,email'],
            'password' => ['required', 'min:8'],
        ]);

        // Create a new user
        $user = User::create([
            'name' => $request->input('name'),
            'email' => $credentials['email'],
            'password' => Hash::make($credentials['password']),
        ]);

        // Signup successful
        return response()->json([
            'message' => 'Signup successful.',
            'user' => $user
        ], 201);
    }
}