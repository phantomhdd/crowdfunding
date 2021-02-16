<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Traits\Uuid;

class Otp_codes extends Model
{
    use Uuid;

    protected $primaryKey = 'otpcode_id';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'otp_code', 'expired',
    ];
}
