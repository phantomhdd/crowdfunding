<template>
    <v-card>
        <v-toolbar dark color="teal darken-2">
            <v-icon left>mdi-account-multiple</v-icon>
            <v-toolbar-title>Register</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon dark @click.native="close">
                <v-icon>mdi-close-circle</v-icon>
            </v-btn>
        </v-toolbar>

        <v-container fluid>
            <v-form ref="form" v-model="valid" lazy-validation>
                <v-text-field
                    v-model="name"
                    :rules="nameRules"
                    label="Name"
                    required
                    autofocus
                    prepend-icon="mdi-account"
                ></v-text-field>
                <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    label="Email"
                    required
                    prepend-icon="mdi-email-variant"
                ></v-text-field>

                <div class="text-xs-center d-flex justify-center my-2">
                    <v-btn
                        color="orange lighten-2"
                        :disabled="!valid"
                        @click="registration"
                        :loading="loading"
                        :dark="valid"
                    >
                        <v-icon left>mdi-account-plus</v-icon>
                        Regist
                    </v-btn>
                </div>
            </v-form>
        </v-container>
    </v-card>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex'

    export default {
        name: 'register',
        data() {
            return {
                loader: null,
                loading: false,
                valid: true,
                name: '',
                nameRules: [
                    v => !!v || 'Name is required',
                ],
                email: '',
                emailRules: [
                    v => !!v || 'E-mail is required',
                    v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
                ],
            }
        },
        methods: {
            ...mapActions({
                setDialogComponent: 'dialog/setComponent',
                setAlert: 'alert/set',
                setAuth: 'auth/set'
            }),
            registration() {
                this.loader = 'loading'
                if(this.$refs.form.validate()) {
                    let formData = {
                        'name': this.name,
                        'email': this.email,
                    }
                    axios.post('/api/auth/register', formData)
                        .then((response) => {
                            let { data } = response.data
                            this.setAlert({
                                status: true,
                                color: 'warning',
                                text: 'Check your E-mail!',
                                icon: 'mdi-alert-circle',
                                locAlert: false,
                            })
                            this.setAuth(data)
                            this.name = ''
                            this.email = ''
                            this.$refs.form.reset()
                            this.$refs.form.resetValidation()
                            this.setDialogComponent('otp')
                        })
                        .catch((error) => {
                            let response = error.response
                            this.setAlert({
                                status: true,
                                color: 'error',
                                text: response.data.errors.email[0],
                                icon: 'mdi-close-octagon',
                                locAlert: false,
                            })
                        })
                }
            },
            close() {
                this.$emit('closed',false)
            },
        },
        watch: {
            loader () {
                const l = this.loader
                this[l] = !this[l]

                setTimeout(() => (this[l] = false), 4000)

                this.loader = null
            },
        },
    }
</script>