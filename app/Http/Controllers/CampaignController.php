<?php

namespace App\Http\Controllers;

use App\Campaigns;
use Illuminate\Http\Request;

class CampaignController extends Controller
{
    public function random($count){
        $campaigns = Campaigns::select('*')
                            ->inRandomOrder()
                            ->limit($count)
                            ->get();

        $data['campaigns'] = $campaigns;

        return response()->json([
            'response_code' => '00',
            'response_message' => 'data campaigns berhasil ditampilkan',
            'data' => $data,
        ], 200);
    }

    public function store(Request $request){
        $request->validate([
            'title' => 'required',
            'description' => 'required',
            'image' => 'required|mimes:jpeg,png,jpg',
        ]);

        $campaign = Campaigns::create([
            'title' => $request->title,
            'description' => $request->description,
        ]);

        if ($request->hasFile('image')) {
            
            // $image = $request->file('image');
            // $image_extension = $image->getClientOriginalExtension();
            // $image_name = $campaign->id . '.' . $image_extension;
            // $image_folder = '/photos/campaign/';
            // $image_location = $image_folder . $image_name;
            
            $image = $request->file('image');
            $fileName = $campaign->id.'.'.$image->getClientOriginalExtension();
            $path = 'images/campaign/';
            
            try {
                $image->move($path,$fileName);

                $campaign->update([
                    'image' => $path.$fileName,
                ]);
            } catch (\Exception $e) {
                return response()->json([
                    'response_code' => '01',
                    'response_message' => 'image gagal diupload',
                ], 200);
            }
        }
        
        $data['campaign'] = $campaign;
        
        return response()->json([
            'response_code' => '00',
            'response_message' => 'data campaigns berhasil ditambahkan',
            'data' => $data
        ], 200);

    }

    public function index() {
        $campaigns = Campaigns::paginate(6);

        $data['campaigns'] = $campaigns;

        return response()->json([
            'response_code' => '00',
            'response_message' => 'data campaigns berhasil ditampilkan',
            'data' => $data,
        ], 200);
    }

    public function detail($id) {
        $campaign = Campaigns::find($id);

        $data['campaign'] = $campaign;

        if ($campaign) {
            return response()->json([
                'response_code' => '00',
                'response_message' => 'data campaign berhasil ditampilkan',
                'data' => $data,
            ], 200);
        } else {
            return response()->json([
                'response_code' => '01',
                'response_message' => 'data campaign tidak ditemukan',
            ], 404);
        }
    }

    public function search($keyword) {
        $campaigns = Campaigns::select('*')
                                ->where('title', 'LIKE', '%'.$keyword.'%')
                                ->get();

        $data['campaigns'] = $campaigns;

        if ($campaigns) {
            return response()->json([
                'response_code' => '00',
                'response_message' => 'data campaign berhasil ditampilkan',
                'data' => $data,
            ], 200);
        } else {
            return response()->json([
                'response_code' => '01',
                'response_message' => 'data campaign tidak ditemukan',
            ], 404);
        }
    }
}
