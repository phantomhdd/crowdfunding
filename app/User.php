<?php

namespace App;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use App\Traits\Uuid;

class User extends Authenticatable
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
     * The "booting" function of model
     *
     * @return void
     */
    protected static function boot() {
        parent::boot();

        static::creating(function ($model) {
            $model->role_id = Roles::where('role','user')->first()->role_id;
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
}
