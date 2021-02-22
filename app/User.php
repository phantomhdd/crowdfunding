<?php

namespace App;

use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use App\Traits\Uuid;
use Carbon\Carbon;

class User extends Authenticatable implements JWTSubject
{
    use Notifiable, Uuid;

    protected $primaryKey = 'user_id';

    public function roles() {
        return $this->belongsTo('App\Roles','role_id','role_id');
    }

    public function otp_code() {
        return $this->hasOne('App\Otp_codes','user_id','user_id');
    }

    /**
     * function for check role Admin
     *
     * @return boolean
     */
    public function isAdmin() {
        if ($this->role_id == Roles::where('role', 'admin')->first()->role_id) {
            return true;
        }
        return false;
    }

    /**
     * function for generate otp code
     *
     * @return void
     */
    public function generate_otp_code() {
        do {
            $random = mt_rand(000000, 999999);
            $check = Otp_codes::where('otp_code',$random)->first();
        } while ($check);

        Otp_codes::updateOrCreate(
            ['user_id' => $this->user_id],
            [
                'otp_code' => $random,
                'expired' => Carbon::now('Asia/Jakarta')->addMinutes(5),
            ]
        );
    }

    /**
     * The "booting" function of model
     *
     * @return void
     */
    protected static function boot() {
        parent::boot();

        static::creating(function ($model) {
            $model->role_id = Roles::where('role','user')->first()->role_id;
        });

        static::created(function ($model) {
            $model->generate_otp_code();
        });
    }

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }
}
