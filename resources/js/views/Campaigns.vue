<template>
    <div>
        <v-container class="ma-0 pa-0" grid-list-sm>
            <v-layout wrap>
                <v-layout wrap>
                    <v-flex v-for="(campaign) in campaigns" :key="`campaign-`+campaign.id" xs6>
                        <!-- <v-card class="mx-auto" max-width="344" :to="'/campaign/'+campaign.id">
                            <v-img :aspect-ratio="16/9" :src="campaign.image" class="white--text">
                                <v-card-title class="fill-height align-end" v-text="campaign.title"></v-card-title>
                            </v-img>
                        </v-card> -->
                        <campaign-item :campaign="campaign"></campaign-item>
                    </v-flex>
                </v-layout>
            </v-layout>

            <v-pagination v-model="page" @input="go" :length="lengthPage" :total-visible="6">
            </v-pagination>
        </v-container>
    </div>
</template>

<script>
    import { mapActions } from 'vuex'

    export default {
        data: () => ({
            campaigns: [],
            page: 0,
            lengthPage: 0,
            titlePage: 'All Campaigns'
        }),
        components: {
            CampaignItem: () => import('../components/CampaignItem.vue')
        },
        created() {
            this.go()
            this.setTitle({
                titlePage : this.titlePage
            })
        },
        methods: {
            ...mapActions({
                setTitle: 'page/set'
            }),
            go(){
                let url = '/api/campaign?page=' + this.page
                axios.get(url)
                    .then((response) => {
                        let { data } = response.data

                        this.campaigns = data.campaigns.data
                        this.page = data.campaigns.current_page
                        this.lengthPage = data.campaigns.last_page
                    })
                    .catch((error) => {
                        let { responses } = error
                        console.log(responses)
                    })
            }
        }
    }
</script>
