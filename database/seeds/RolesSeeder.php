<?php

use Illuminate\Database\Seeder;
use App\Roles;

class RolesSeeder extends Seeder
{

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $roles = array(
            ['role' => 'admin'],
            ['role' => 'user']
        );

        foreach($roles as $role){
            Roles::create($role);
        }
    }
}
