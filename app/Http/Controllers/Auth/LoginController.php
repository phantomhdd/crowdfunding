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
            return response(null, 401);
        }
        
        $user = User::where('email',request('email'))
                    ->first();

        return response()->json(compact('token','user'));
    }
}
