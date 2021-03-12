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
                    prepend-icon="mdi-key-variant"
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
                    prepend-icon="mdi-key-variant"
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
                        <v-icon left>mdi-key</v-icon>
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
                showPasswordConfirm: false,
                passwordConfirm: '',
                passwordConfirmRules: [
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
                        'otp_code': this.otpcode,
                    }
                    axios.post('/api/auth/verification', formData)
                        .then((response) => {
                            let { data } = response
                            console.log(data)
                            if(data.response_code == '01'){
                                this.setAlert({
                                    status: true,
                                    color: 'error',
                                    text: data.response_message,
                                    icon: 'mdi-close-octagon',
                                    locAlert: false,
                                })
                            } else {
                                this.setAlert({
                                    status: true,
                                    color: 'success',
                                    text: 'Berhasil diverifikasi!',
                                    icon: 'mdi-check-circle',
                                    locAlert: false,
                                })
                                this.setAuth(data)
                                this.otpcode = ''
                                this.close()
                            }
                        })
                        .catch((error) => {
                            let response = error.response
                            console.log(response)
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