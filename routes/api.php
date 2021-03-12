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

Route::prefix('auth')->namespace('Auth')->group(function(){
    Route::post('register','RegisterController');
    Route::post('verification','VerificationController');
    Route::post('regenerate-otp','RegenerateOtpCodeController');
    Route::post('update-password','UpdatePasswordController');
    Route::post('login','LoginController');
    Route::post('logout','LogoutController')->middleware('auth:api');
    Route::post('check-token','CheckTokenController')->middleware('auth:api');
    
    Route::get('/social/{provider}','SocialiteController@redirectToProvider');
    Route::get('/social/{provider}/callback','SocialiteController@handleProviderCallback');
});

Route::prefix('profile')->namespace('Profile')->middleware('auth')->group(function(){
    Route::get('get-profile','GetProfileController');
    Route::post('update-profile','UpdateProfileController');
});

Route::group([
    'middleware' => 'api',
    'prefix' => 'campaign',
], function(){
    Route::get('random/{count}','CampaignController@random');
    Route::post('store','CampaignController@store');
    Route::get('/','CampaignController@index');
    Route::get('/{id}','CampaignController@detail');
    Route::get('/search/{keyword}','CampaignController@search');
});

Route::group([
    'middleware' => 'api',
    'prefix' => 'blog',
], function(){
    Route::get('random/{count}','BlogController@random');
    Route::post('store','BlogController@store');
});