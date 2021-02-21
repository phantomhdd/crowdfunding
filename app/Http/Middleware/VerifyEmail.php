<?php

namespace App\Http\Middleware;

use App\User;
use Closure;

class VerifyEmail
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $user = User::where('email',request('email'))->first();
        
        if($user->email_verified_at == null){
            return response(['message' => 'your email is not verified'], 403);
        }
        return $next($request);
    }
}
