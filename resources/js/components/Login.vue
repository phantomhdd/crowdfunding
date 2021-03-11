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
                    hint="At least 6 characters"
                    @click:append="showPassword = !showPassword"
                    class="mb-2"
                ></v-text-field>

                <div class="text-xs-center d-flex align-end">
                    <v-btn
                        color="success lighten-1"
                        :disabled="!valid"
                        @click="submit"
                    >
                        Login
                        <v-icon dark right>mdi-lock-open</v-icon>
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
                valid: true,
                email: '',
                emailRules: [
                    v => !!v || 'E-mail is required',
                    v => /([a-zA-Z0-9_]{1,})(@)([a-zA-Z0-9_]{2,}).([a-zA-Z0-9_]{2,})+/.test(v) || 'E-mail must be valid'
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
                                    locAlert: true,
                                })
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
            }
        }
    }
</script>