<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\VerificationRequest;
use App\Otp_codes;
use App\User;
use Carbon\Carbon;

class VerificationController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(VerificationRequest $request)
    {
        $otp_code = Otp_codes::where('otp_code',request('otp_code'))->first();

        if(!$otp_code) {
            return response()->json([
                'response_code' => '01',
                'response_message' => 'kode otp tidak ditemukan',
            ]);
        }

        $now = Carbon::now('Asia/Jakarta');
        
        if(strtotime($now) > strtotime($otp_code->expired)) {
            return response()->json([
                'response_code' => '01',
                'response_message' => 'kode otp sudah tidak berlaku, silakan generate ulang',
            ]);
        }

        User::where('user_id', $otp_code->user_id)->update(['email_verified_at' => $now]);

        return response()->json([
            'response_code' => '00',
            'response_message' => 'berhasil diverifikasi',
        ]);
    }
}
