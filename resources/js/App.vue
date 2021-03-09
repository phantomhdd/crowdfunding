<template>
    <v-app>
        <!-- Alert -->
        <Alert></Alert>

        <!-- Dialog -->
        <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-top-transition">
            <search @closed="closeDialog"></search>
        </v-dialog>

        <!-- Sidebar -->
        <v-navigation-drawer app v-model="drawer" color="teal darken-2" dark>
            <v-list>
                <v-list-item v-if="!guest">
                    <v-list-item-avatar>
                        <v-img src="./images/photo-profiles/0cd9ccda-683b-49f7-acff-8b88e4c1e6e2.jpg"></v-img>
                    </v-list-item-avatar>
                    <v-list-item-content>
                        <v-list-item-title>遠藤さくら</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <div class="pa-2" v-if="guest">
                    <v-btn block color="primary" class="mb-1">
                        <v-icon left>mdi-lock</v-icon>
                        Login
                    </v-btn>
                    <v-btn block color="success">
                        <v-icon left>mdi-account</v-icon>
                        Register
                    </v-btn>
                </div>

                <v-divider></v-divider>

                <v-list-item v-for="(item, index) in menus" :key="`menu`+index" :to="item.route">
                    <v-list-item-icon>
                        <v-icon left>{{ item.icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>

            <template v-slot:append v-if="!guest">
                <div class="pa-2">
                    <v-btn block dark color="red darken-2">
                        <v-icon left>mdi-lock</v-icon>
                        Logout
                    </v-btn>
                </div>
            </template>
        </v-navigation-drawer>

        <!-- Header Home -->
        <v-app-bar app color="teal" dark>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer" v-if="isHome"></v-app-bar-nav-icon>
            
            <v-btn icon @click.stop="$router.go(-1)" v-else>
                <v-icon>mdi-arrow-left-circle</v-icon>
            </v-btn>
            
            <v-toolbar-title>{{ titlePage }}</v-toolbar-title>

            <!-- Spacing -->
            <v-spacer></v-spacer>

            <v-btn icon>
                <v-badge color="orange" overlap :content="transactions" :value="transactions">
                    <!-- <template v-slot:badge>
                        <span>{{ $store.state.count }}</span>
                    </template> -->
                    <v-icon>mdi-cash-multiple</v-icon>
                </v-badge>
            </v-btn>
            <v-btn icon v-if="!isCampaign" @click="closeDialog">
                <v-icon>mdi-magnify</v-icon>
            </v-btn>
            <!-- <v-text-field class="mb-5" slot="extension" hide-details append-icon="mdi-microphone" flat label="Search Campaign" prepend-inner-icon="mdi-magnify" solo-inverted></v-text-field> -->
        </v-app-bar>

        <!-- Content -->
        <v-main>
            <!-- Provides the application the proper gutter -->
            <v-container fluid>
                <!-- If using vue-router -->
                <v-slide-y-transition>
                    <router-view></router-view>
                </v-slide-y-transition>
            </v-container>
        </v-main>

        <!-- Footer -->
        <v-card>
            <v-footer absolute app>
                <v-card-text class="text-center text-caption">
                    &copy;{{ new Date().getFullYear() }} - Crowdfunding <v-icon color="red lighten-1">mdi-heart</v-icon>
                </v-card-text>
            </v-footer>
        </v-card>
    </v-app>
</template>
<script>
    import { mapGetters } from 'vuex'

    export default {
        name: 'App',
        data: () => ({
            drawer: false,
            menus: [
                {title: 'Home', icon: 'mdi-home', route: '/'},
                {title: 'Campaigns', icon: 'mdi-hand-heart', route: '/campaigns'},
            ],
            guest: false,
            dialog: false,
        }),
        computed: {
            isHome() {
                return (this.$route.path === '/' || this.$route.path === '/home')
            },
            isCampaign() {
                let route = this.$route.path.split("/")
                route.pop()
                let removeId = route.join("/")
                return (removeId+'/' === '/campaign/')
            },
            ...mapGetters({
                transactions : 'transaction/transactions',
                titlePage: 'page/titlePage'
            }),
            // transaction () {
            //     return this.$store.getters.transaction
            // }
        },
        components: {
            Alert: () => import('./components/Alert.vue'),
            Search: () => import('./components/Search.vue')
        },
        methods: {
            closeDialog(value) {
                this.dialog = value
            }
        }
    };
</script>
