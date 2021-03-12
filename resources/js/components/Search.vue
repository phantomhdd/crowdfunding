<template>
    <v-card>
        <v-toolbar color="teal" dark>
            <v-text-field
                hide-details
                prepend-inner-icon="mdi-magnify"
                flat
                autofocus
                label="Search Campaign"
                v-model="keyword"
                @input="doSearch"
            ></v-text-field>
            <v-btn icon dark @click.native="close">
                <v-icon>mdi-close-circle</v-icon>
            </v-btn>
        </v-toolbar>
        <v-card-text>
            <v-subheader v-if="keyword.length>0">
                Search for "<span class="text-truncate" style="max-width: 75px">{{ keyword }}</span>" found {{ campaigns.length }}&nbsp;<span v-if="campaigns.length>1">campaigns</span><span v-else>campaign</span>
            </v-subheader>
            <v-alert text type="error" icon="mdi-cloud-alert" :value="campaigns.length==0 && keyword.length>0">
                Sorry, results weren't found.
            </v-alert>

            <!-- Hasil pencaharian ditampilkan di sini -->
            <v-container class="ma-0 pa-0" grid-list-sm>
                <v-layout wrap>
                    <v-flex v-for="(campaign) in campaigns" :key="'campaign-'+campaign.id" xs6>
                        <campaign-item :campaign="campaign" @click.native="close"></campaign-item>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card-text>
    </v-card>
</template>

<script>
    export default {
        name: 'search',
        data() {
            return {
                keyword: '',
                campaigns: []
            }
        },
        components: {
            CampaignItem: () => import('./CampaignItem.vue')
        },
        methods: {
            doSearch() {
                let keyword = this.keyword
                if (keyword.length>0) {
                    let url = '/api/campaign/search/'+keyword
                    axios.get(url)
                        .then((response) => {
                            let { data } = response.data
                            this.campaigns = data.campaigns
                        })
                        .catch((error) => {
                            console.log(error)
                        })
                } else {
                    this.campaigns = []
                }
            },
            close() {
                this.keyword = ''
                this.$emit('closed',false)
            }
        }
    }
</script>