<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TestController extends Controller
{
    //
    public function route1() {
        return 'Route-1 Berhasil Masuk! E-mail terverifikasi.';
    }
    
    public function route2() {
        return 'Route-2 Berhasil Masuk! E-mail terverifikasi dan anda adalah Admin';
    }
}
