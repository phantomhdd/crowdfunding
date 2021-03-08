<template>
    <div>
        <v-card class="mx-auto my-1" max-width="344" :to="'/campaign/'+campaign.id">
            <v-img :aspect-ratio="16/9" :src="campaign.image" class="white--text" height="200">
                <v-card-title class="fill-height align-end" v-text="campaign.title"></v-card-title>
            </v-img>

            <v-card-actions>
                <v-progress-linear v-model="progress" height="13" :color="color" rounded>
                    <span class="text-light text-caption">{{ progress }}%</span>
                </v-progress-linear>
            </v-card-actions>

            <v-card-actions>
                <v-icon>mdi-cash</v-icon>
                <span class="orange--text">{{ $n(campaign.required, 'currency', 'ja-JP') }}</span>
                <v-spacer></v-spacer>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>
    export default {
        name: 'campaign-item',
        props: ['campaign'],
        data: () => ({
            color: ''
        }),
        computed: {
            progress() {
                let progress = Math.ceil(this.campaign.collected / this.campaign.required * 100)
                this.color = progress > 85 ? 'green darken-2' : progress < 25 ? 'pink' : 'blue-grey'
                return progress
            }
        }
    }
</script>