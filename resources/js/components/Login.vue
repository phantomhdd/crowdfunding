<template>
    <v-card>
        <v-toolbar dark color="teal darken-2">
            <v-icon left>mdi-login-variant</v-icon>
            <v-toolbar-title>Login</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon dark @click.native="close">
                <v-icon>mdi-close-circle</v-icon>
            </v-btn>
        </v-toolbar>

        <v-container fluid>
            <v-form ref="form" v-model="valid" lazy-validation>
                <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    label="Email"
                    required
                    autofocus
                    prepend-icon="mdi-email-variant"
                ></v-text-field>
                <v-text-field
                    v-model="password"
                    :rules="passwordRules"
                    label="Password"
                    required
                    prepend-icon="mdi-key-variant"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="showPassword ? 'text' : 'password'"
                    hint="At least 8 characters"
                    @click:append="showPassword = !showPassword"
                    class="mb-2"
                ></v-text-field>

                <div class="text-xs-center d-flex justify-center my-2">
                    <v-btn
                        color="teal darken-1"
                        :disabled="!valid"
                        @click="submit"
                        :loading="loading"
                        :dark="valid"
                    >
                        <v-icon left>mdi-lock-open</v-icon>
                        Login
                    </v-btn>
                </div>
                <div class="d-flex flex-row align-center">
                    <v-divider class="mx-3"></v-divider> or <v-divider class="mx-3"></v-divider>
                </div>
                <div class="text-xs-center d-flex justify-center my-2">
                    <v-btn
                        color="blue-grey"
                        @click="authProvider('google')"
                        outlined
                        :loading="loading2"
                    >
                        <v-icon left>mdi-google</v-icon>
                        Login with Google
                    </v-btn>
                </div>
                <div class="text-xs-center d-flex justify-center my-2">
                    <v-btn
                        color="blue-grey"
                        @click="authProvider('github')"
                        outlined
                        :loading="loading3"
                    >
                        <v-icon left>mdi-github</v-icon>
                        Login with GitHub
                    </v-btn>
                </div>
            </v-form>
        </v-container>
    </v-card>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex'

    export default {
        name: 'login',
        data() {
            return {
                loader: null,
                loading: false,
                loading2: false,
                loading3: false,
                valid: true,
                email: '',
                emailRules: [
                    v => !!v || 'E-mail is required',
                    v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
                ],
                showPassword: false,
                password: '',
                passwordRules: [
                    v => !!v || 'Password is required',
                    v => (v && v.length >= 8) || 'Min 8 characters'
                ],
            }
        },
        computed: {
            ...mapGetters({
                current_user: 'auth/user'
            }),
        },
        methods: {
            ...mapActions({
                setAlert: 'alert/set',
                setAuth: 'auth/set'
            }),
            submit() {
                this.loader = 'loading'
                if(this.$refs.form.validate()) {
                    let formData = {
                        'email': this.email,
                        'password': this.password
                    }
                    axios.post('/api/auth/login', formData)
                        .then((response) => {
                            let { data } = response.data
                            this.setAuth(data)
                            if(this.current_user.user.user_id.length>0) {
                                this.setAlert({
                                    status: true,
                                    color: 'success',
                                    text: 'Login Success!',
                                    icon: 'mdi-check-circle',
                                    locAlert: false,
                                })
                                this.email = ''
                                this.password = ''
                                this.close()
                            } else {
                                this.setAlert({
                                    status: true,
                                    color: 'error',
                                    text: 'Login Failed!',
                                    icon: 'mdi-alert-circle',
                                    locAlert: false,
                                })
                            }
                        })
                        .catch((error) => {
                            let resp_error = error.response
                            this.setAlert({
                                status: true,
                                color: 'error',
                                text: resp_error.data.error,
                                icon: 'mdi-close-octagon',
                                locAlert: false,
                            })
                        })
                }
            },
            close() {
                this.$emit('closed',false)
            },
            authProvider(provider) {
                this.loader = 'loading2'
                if(navigator.onLine) {
                    let url = '/api/auth/social/' + provider
                    axios.get(url)
                        .then((response) => {
                            let data = response.data
                            window.location.href = data.url
                        })
                        .catch((error) => {
                            this.setAlert({
                                status: true,
                                color: 'error',
                                text: 'Login Failed!',
                                icon: 'mdi-alert-circle',
                                locAlert: false,
                            })
                        })
                } else {
                    this.setAlert({
                        status: true,
                        color: 'error',
                        text: 'No Internet Connection!',
                        icon: 'mdi-google-downasaur',
                        locAlert: false,
                    })
                }
            }
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