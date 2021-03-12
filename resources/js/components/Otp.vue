<template>
    <v-card>
        <v-toolbar dark color="teal darken-2">
            <v-icon left>mdi-shield-key</v-icon>
            <v-toolbar-title>OTP Code</v-toolbar-title>
        </v-toolbar>

        <v-container fluid>
            <v-form ref="form" v-model="valid" lazy-validation>
                <v-text-field
                    v-model="otpcode"
                    label="OTP Code"
                    :rules="otpcodeRules"
                    required
                    autofocus
                    prepend-icon="mdi-key"
                    hint="At least 6 digits"
                ></v-text-field>

                <div class="text-xs-center d-flex justify-center my-2">
                    <v-btn
                        color="teal darken-1"
                        :disabled="!valid"
                        @click="submit"
                        :loading="loading"
                        :dark="valid"
                    >
                        <v-icon left>mdi-send</v-icon>
                        Send Otp
                    </v-btn>
                </div>
            </v-form>
        </v-container>
    </v-card>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex'

    export default {
        name: 'otp',
        data() {
            return {
                loader: null,
                loading: false,
                valid: true,
                otpcode: '',
                otpcodeRules: [
                    v => !!v || 'Code is required',
                    v => (v && v.length >= 6) || 'Min 6 characters'
                ],
            }
        },
        methods: {
            ...mapActions({
                setDialogComponent: 'dialog/setComponent',
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
                                this.setDialogComponent('createPassword')
                            }
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