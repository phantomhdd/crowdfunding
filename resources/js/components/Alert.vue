<template>
    <!-- snackbar -->
    <v-snackbar
        v-model="alert"
        top
        timeout="2751"
        :color="color"
    >
    <v-icon>mdi-check-circle</v-icon>
        <span v-html="text"></span>
        <!-- <template v-slot:action="{ attrs }">
            <v-btn
                dark
                text
                v-bind="attrs"
                @click="close"
            >
                Close
            </v-btn>
        </template> -->
    </v-snackbar>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'

    export default {
        name: 'alert',
        computed: {
            ...mapGetters({
                status: 'alert/status',
                color: 'alert/color',
                text: 'alert/text'
            }),
            alert: {
                set(value) {
                    this.setAlert({
                        status : value
                    })
                },
                get() {
                    return this.status
                }
            }
        },
        methods: {
            ...mapActions({
                setAlert: 'alert/set'
            }),
            close() {
                this.setAlert({
                    status: false
                })
            }
        }
    }
</script>