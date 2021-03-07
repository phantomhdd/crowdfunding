<?php

namespace App\Http\Controllers;

use App\Blogs;
use Illuminate\Http\Request;

class BlogController extends Controller
{
    public function random($count) {
        $blogs = Blogs::select('*')
                            ->inRandomOrder()
                            ->limit($count)
                            ->get();

        $data['blogs'] = $blogs;

        return response()->json([
            'response_code' => '00',
            'response_message' => 'data blogs berhasil ditampilkan',
            'data' => $data,
        ], 200);
    }

    public function store(Request $request){
        $request->validate([
            'title' => 'required',
            'description' => 'required',
            'image' => 'required|mimes:jpeg,png,jpg',
        ]);

        $blog = Blogs::create([
            'title' => $request->title,
            'description' => $request->description,
        ]);

        if ($request->hasFile('image')) {
            
            // $image = $request->file('image');
            // $image_extension = $image->getClientOriginalExtension();
            // $image_name = $blog->id . '.' . $image_extension;
            // $image_folder = '/photos/blog/';
            // $image_location = $image_folder . $image_name;
            
            $image = $request->file('image');
            $fileName = $blog->id.'.'.$image->getClientOriginalExtension();
            $path = 'images/blog/';
            
            try {
                $image->move($path,$fileName);

                $blog->update([
                    'image' => $path.$fileName,
                ]);
            } catch (\Exception $e) {
                return response()->json([
                    'response_code' => '01',
                    'response_message' => 'image gagal diupload',
                ], 200);
            }
        }
        
        $data['blog'] = $blog;
        
        return response()->json([
            'response_code' => '00',
            'response_message' => 'data blogs berhasil ditambahkan',
            'data' => $data
        ], 200);

    }
}
