<template>
    <v-app>
        <v-navigation-drawer app>
            Sidebar
        </v-navigation-drawer>

        <v-app-bar app>
            Header
        </v-app-bar>

        <!-- Sizes your content based upon application components -->
        <v-main>
            <!-- Provides the application the proper gutter -->
            <v-container fluid>
                <!-- If using vue-router -->
                <router-view></router-view>
            </v-container>
        </v-main>

        <v-footer app>
            @Footer
        </v-footer>
    </v-app>
</template>
<script>
export default {
    created() {
        console.log("Component mounted.");
    }
};
</script>
