<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\User;

class LoginController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(LoginRequest $request)
    {
        
        $credentials = $request->only('email','password');
        
        if(!$token = auth()->attempt($credentials)) {
            return response()->json([
                'error' => 'E-mail atau Password salah!'
            ], 401);
        }
        
        $user = User::where('email',request('email'))
                    ->first();

        return response()->json([
            'response_code' => '00',
            'response_message' => 'user berhasil login',
            'data' => compact('token','user'),
        ]);
    }
}
