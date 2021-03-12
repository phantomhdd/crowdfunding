<template>
    <v-card>
        <v-toolbar dark color="teal darken-2">
            <v-icon left>mdi-account-key</v-icon>
            <v-toolbar-title>Create Password</v-toolbar-title>
        </v-toolbar>

        <v-container fluid>
            <v-form ref="form" v-model="valid" lazy-validation>
                <v-text-field
                    v-model="password"
                    :rules="passwordRules"
                    label="Password"
                    required
                    prepend-icon="mdi-form-textbox-password"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="showPassword ? 'text' : 'password'"
                    hint="At least 8 characters"
                    @click:append="showPassword = !showPassword"
                    class="mb-2"
                ></v-text-field>
                <v-text-field
                    v-model="passwordConfirm"
                    :rules="passwordConfirmRules"
                    label="Password Confirmation"
                    required
                    prepend-icon="mdi-form-textbox-password"
                    :append-icon="showPasswordConfirm ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="showPasswordConfirm ? 'text' : 'password'"
                    hint="At least 8 characters"
                    @click:append="showPasswordConfirm = !showPasswordConfirm"
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
                        <v-icon left>mdi-account-check</v-icon>
                        Create
                    </v-btn>
                </div>
            </v-form>
        </v-container>
    </v-card>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex'

    export default {
        name: 'createPassword',
        data() {
            return {
                loader: null,
                loading: false,
                valid: true,
                showPassword: false,
                password: '',
                passwordRules: [
                    v => !!v || 'Password is required',
                    v => (v && v.length >= 8) || 'Min 8 characters'
                ],
                passwordConfirmRules: [
                    v => !!v || 'Password is required',
                    v => (v && v.length >= 8) || 'Min 8 characters',
                    v => v === this.password || 'Password don\'t match'
                ],
                showPasswordConfirm: false,
                passwordConfirm: '',
            }
        },
        computed: {
            ...mapGetters({
                current_user: 'auth/user'
            }),
            email(){
                return this.current_user.user.email
            }
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
                        'password': this.password,
                        'password_confirmation': this.passwordConfirm,
                    }
                    axios.post('/api/auth/update-password', formData)
                        .then((response) => {
                            let { data } = response.data
                            this.setAlert({
                                status: true,
                                color: 'success',
                                text: 'Account was Created!',
                                icon: 'mdi-check-circle',
                                locAlert: false,
                            })
                            this.setAuth(data)
                            this.login(this.email, this.password)
                            this.password = ''
                            this.passwordConfirm = ''
                            this.$refs.form.reset()
                            this.$refs.form.resetValidation()
                            this.close()
                        })
                        .catch((error) => {
                            let response = error.response
                            this.setAlert({
                                status: true,
                                color: 'error',
                                text: response.data.error,
                                icon: 'mdi-close-octagon',
                                locAlert: false,
                            })
                        })
                }
            },
            login(email,pass) {
                let formData = {
                    'email': email,
                    'password': pass
                }
                axios.post('/api/auth/login', formData)
                    .then((response) => {
                        let { data } = response.data
                        this.setAuth(data)
                        this.email = ''
                        this.password = ''
                        this.close()
                    })
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