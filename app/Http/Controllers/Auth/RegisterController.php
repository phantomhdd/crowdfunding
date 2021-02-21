<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\RegisterRequest;
use App\User;
use Carbon\Carbon;

class RegisterController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(RegisterRequest $request)
    {
        $user = User::create([
            'name' => request('name'),
            'email' => request('email'),
            'password' => bcrypt('12345678')
        ]);

        $user->otp_code()->create([
            'otp_code' => mt_rand(960000, 969999),
            'expired' => Carbon::now('Asia/Jakarta')->addMinutes(5),
        ]);

        $response = [
            'response_code' => '00',
            'response_message' => 'silakan cek email',
            'data' => ['user' => $user],
        ];

        return response($response);
    }
}
