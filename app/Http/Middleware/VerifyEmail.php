<?php

namespace App\Http\Middleware;

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
        if($request->user()->email_verified_at == null){
            abort(403, 'Your email is not verified.');
        }
        return $next($request);
    }
}
