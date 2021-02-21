<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\UpdatePasswordRequest;
use App\User;

class UpdatePasswordController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(UpdatePasswordRequest $request)
    {
        $user = User::where('email', request('email'));
        
        $user->update([
            'password' => bcrypt(request('password')),
        ]);

        return response()->json([
            'response_code' => '00',
            'response_message' => 'password berhasil diubah',
            'data' => ['user' => $user->first()],
        ]);
    }
}
