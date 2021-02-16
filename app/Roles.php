<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Traits\Uuid;

class Roles extends Model
{
    use Uuid;

    protected $primaryKey = 'role_id';

    public function user() {
        return $this->hasMany('App\User');
    }

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'role',
    ];
}
