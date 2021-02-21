<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::namespace('Auth')->group(function(){
    Route::post('auth/register','RegisterController');
    Route::post('auth/verification','VerificationController');
    Route::post('auth/regenerate-otp','RegenerateOtpCodeController');
    Route::post('auth/update-password','UpdatePasswordController');
    Route::post('auth/login','LoginController');
});

Route::namespace('Profile')->group(function(){
    Route::get('profile/get-profile','GetProfileController');
    Route::post('profile/update-profile','UpdateProfileController');
});