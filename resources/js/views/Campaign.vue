<template>
    <div>
        <v-card v-if="campaign.id">
            <v-img :aspect-ratio="4/2" :src="campaign.image" class="white--text">
                <v-card-title class="fill-height align-end" v-text="campaign.title"></v-card-title>
            </v-img>

            <v-card-text>
                <v-simple-table dense>
                    <tbody>
                        <tr>
                            <td style="white-space:nowrap"><v-icon>mdi-home-city</v-icon> Address</td>
                            <td>{{ campaign.address }}</td>
                        </tr>
                        <tr>
                            <td style="white-space:nowrap"><v-icon>mdi-hand-heart</v-icon> Collected</td>
                            <td class="blue--text">{{ $n(campaign.collected, 'currency', 'ja-JP') }}</td>
                        </tr>
                        <tr>
                            <td style="white-space:nowrap"><v-icon>mdi-cash</v-icon> Needed</td>
                            <td class="orange--text">{{ $n(campaign.required, 'currency', 'ja-JP') }}</td>
                        </tr>
                        <tr>
                            <td colspan="2" style="border-bottom-style: none"><v-icon>mdi-text-box-outline</v-icon> Description</td>
                        </tr>
                        <tr>
                            <td colspan="2" class="text--secondary pl-7" style="text-align: justify">{{ campaign.description }}</td>
                        </tr>
                    </tbody>
                </v-simple-table>
                <!-- <div class="text--primary">Description:</div>
                <div class="text--secondary pl-3" style="text-align: justify">{{ campaign.description }}</div> -->
                
            </v-card-text>
            <v-card-actions>
                <v-btn block dark color="light-green darken-4" @click="donate" :disabled="campaign.collected >= campaign.required">
                    <v-icon>mdi-hand-heart</v-icon>&nbsp; DONATE
                </v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>
    import { mapActions, mapMutations } from 'vuex'

    export default {
        data: () => ({
            campaign: {},
            titlePage: 'Campaign'
        }),
        created() {
            this.go()
            this.setTitle({
                titlePage : this.titlePage
            })
        },
        methods: {
            go() {
                let { id } = this.$route.params
                let url = '/api/campaign/'+id
                axios.get(url)
                    .then((response) => {
                        let { data } = response.data
                        this.campaign = data.campaign
                    })
                    .catch((error) => {
                        let { responses } = error
                        console.log(responses)
                    })
            },
            // donate() {
            //     this.$store.commit('increment')
            // },
            ...mapMutations({
                addTransaction: 'transaction/increment'
            }),
            ...mapActions({
                setAlert: 'alert/set',
                setTitle: 'page/set'
            }),
            donate(){
                this.addTransaction()
                this.setAlert({
                    status: true,
                    color: 'green darken-2',
                    text: 'Thanks, Donate Success!',
                    icon: 'mdi-check-circle',
                    locAlert: true,
                })
            }
        }
    }
</script>