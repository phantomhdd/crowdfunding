<?php

namespace App\Http\Controllers\Profile;

use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UpdateProfileController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        Validator::make($request->all(), [
            'name' => 'required|string',
            'photo' => 'required|mimes:jpg,jpeg,png|max:1024',
        ])->validate();

        $photo = $request->file('photo');
        $fileName = $request->user()->user_id.'.'.$photo->getClientOriginalExtension();
        $path = '/images/photo-profiles/';

        $user = User::where('user_id', $request->user()->user_id);
        
        try {
            $user->update([
                'name' => request('name'),
                'photo' => $path.$fileName,
            ]);
    
            $photo->move($path,$fileName);
        } catch (\Exception $e) {
            return response()->json([
                'response_code' => '01',
                'response_message' => 'profil gagal diupdate',
            ]);
        }

        return response()->json([
            'response_code' => '00',
            'response_message' => 'profil berhasil diupdate',
            'data' => ['user' => $user->first()],
        ]);
    }
}
