<?php

namespace App;

use App\Traits\Uuid;
use Illuminate\Database\Eloquent\Model;

class Campaigns extends Model
{
    use Uuid;

    protected $guarded = [];
}
