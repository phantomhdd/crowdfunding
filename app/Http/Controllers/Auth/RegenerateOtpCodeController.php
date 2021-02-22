<?php

namespace App\Http\Controllers\Auth;

use App\Events\UserRegisteredEvent;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\RegenerateOtpCodeRequest;
use App\User;
use Carbon\Carbon;

class RegenerateOtpCodeController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(RegenerateOtpCodeRequest $request)
    {
        $user = User::where('email', request('email'))->first();

        $user->generate_otp_code();

        event(new UserRegisteredEvent($user));

        return response()->json([
            'response_code' => '00',
            'response_message' => 'silakan cek email',
            'data' => compact('user'),
        ]);
    }
}
