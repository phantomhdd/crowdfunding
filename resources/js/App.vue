<template>
    <div class="wrapper">
        <h2>SANBERCODE</h2>
        <router-link to="/">Home</router-link>
        <router-link to="/donations">Donations</router-link>
        <router-link to="/blogs">Blog</router-link>
        <div class="content-wrapper">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
    export default {
        created() {
            console.log('Component mounted.')
        }
    }
</script>