<?php

namespace App\Http\Controllers\Auth;

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

        $user->otp_code()->update([
            'otp_code' => mt_rand(960000, 969999),
            'expired' => Carbon::now('Asia/Jakarta')->addMinutes(5),
        ]);

        return response()->json([
            'response_code' => '00',
            'response_message' => 'silakan cek email',
            'data' => ['user' => $user],
        ]);
    }
}
