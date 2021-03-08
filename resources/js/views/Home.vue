<template>
    <div>
        <!-- Template Campaigns -->
        <v-container class="ma-0 pa-0" grid-list-sm>
            
            <div class="text-right">
                <v-btn small text to="/campaigns" class="blue--text">
                    All Campaigns <v-icon>mdi-chevron-right</v-icon>
                </v-btn>
            </div>

            <v-layout wrap>
                <v-flex v-for="(campaign, index) in campaigns" :key="`campaign-`+campaign.id" xs6>
                    <!-- <v-card class="mx-auto" max-width="344" :to="'/campaign/'+campaign.id">
                        <v-img :aspect-ratio="16/9" :src="campaign.image" class="white--text">
                            <v-card-title class="fill-height align-end" v-text="campaign.title"></v-card-title>
                        </v-img>
                    </v-card> -->
                    <campaign-item :campaign="campaign"></campaign-item>
                </v-flex>
            </v-layout>

        </v-container>

        <!-- Template Blogs -->
        <v-container class="ma-0 pa-0" grid-list-sm>

            <div class="text-right">
                <v-btn small text to="/blogs" class="blue--text">
                    All Blogs <v-icon>mdi-chevron-right</v-icon>
                </v-btn>
            </div>

            <v-layout wrap>
                <v-carousel hide-delimiters height="200px" class="mx-auto my-1">
                    <v-carousel-item v-for="(blog,i) in blogs" :key="`blog-`+blog.id">
                        <v-img :src="blog.image" class="fill-height" gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)">
                            <v-container fill-height fluid pa-0 ma-0>
                                <v-layout fill-height align-end>
                                    <v-flex xs12 mx-2>
                                        <span class="headline white--text" v-text="blog.title"></span>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-img>
                    </v-carousel-item>
                </v-carousel>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
    export default {
        data: () => ({
            campaigns: [],
            blogs: [],
        }),
        components : {
            CampaignItem: () => import('../components/CampaignItem.vue')
        },
        created() {
            axios.get('api/campaign/random/2')
                .then((response) => {
                    let { data } = response.data
                    this.campaigns = data.campaigns
                })
                .catch((error) => {
                    let { responses } = error
                    console.log(responses)
                })

            axios.get('api/blog/random/2')
                .then((response) => {
                    let { data } = response.data
                    this.blogs = data.blogs
                })
                .catch((error) => {
                    let { responses } = error
                    console.log(responses)
                })
        }
    }
</script>
