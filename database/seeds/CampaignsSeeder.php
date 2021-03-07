<?php

use App\Campaigns;
use Illuminate\Database\Seeder;

class CampaignsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker\Factory::create('ja_JP');

        $given = array(
            '1913c3c3-fc32-4c59-999f-7506db544660.jpeg',
            '6244a491-f212-42c9-8c4c-b9022bbdb267.jpg',
            '8812cfea-2de8-46fd-b4ad-d9749699231f.png',
        );

        for ($i = 0; $i < 23; $i++){
            $id = $faker->uuid;
            $campaigns = Campaigns::create([
                'id' => $id,
                'title' => $faker->name . 'の助け',
                'description' => $faker->paragraph(),
                'image' => 'images/campaign/'.$given[array_rand($given)],
            ]);
        }
    }
}
