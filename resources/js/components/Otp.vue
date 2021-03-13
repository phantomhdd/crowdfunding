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
                    maxlength = "6"
                ></v-text-field>
                
                <div class="text-xs-center d-flex justify-center">
                    {{ timeLeft }}
                </div>

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
                
                <div class="d-flex flex-row align-center px-5">
                    <v-divider></v-divider>
                </div>
                
                <div class="text-xs-center d-flex justify-center">
                    <v-btn class="caption" text @click="regenerateOtp">Re-generate OTP Code</v-btn>
                </div>
            </v-form>
        </v-container>
    </v-card>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex'
    var intervalTimer
    export default {
        name: 'otp',
        data() {
            return {
                selectedTime: 0,
                timeLeft: '00:00',
                endTime: '0',
                times: 300,
                loader: null,
                loading: false,
                valid: true,
                otpcode: '',
                otpcodeRules: [
                    v => !!v || 'Code is required',
                    v => /^[1-9]\d*$|^$/.test(v) || 'Number only',
                    v => (v && v.length >= 6) || 'Min 6 digits'
                ],
            }
        },
        created() {
            this.setTime(this.times)
        },
        computed: {
            ...mapGetters({
                current_user: 'auth/user'
            }),
            email() {
                return this.current_user.user.email
            },
        },
        methods: {
            ...mapActions({
                setDialogComponent: 'dialog/setComponent',
                setAlert: 'alert/set',
                setAuth: 'auth/set'
            }),
            regenerateOtp(){
                this.setTime(this.times)
                let formData = {
                    email: this.email
                }
                axios.post("/api/auth/regenerate-otp", formData).then(
                    (response) => {
                        let { data } = response
                        this.otpcode = ''
                        this.$refs.form.reset()
                        this.$refs.form.resetValidation()
                        if (data.response_code == '01') {
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
                                color: 'warning',
                                text: 'Check your E-mail!',
                                icon: 'mdi-alert-circle',
                                locAlert: false,
                            })
                        }
                    }
                ).catch(
                    (error) => {
                        console.log(error);
                    }
                )
            },
            setTime(seconds) {
                clearInterval(intervalTimer);
                this.timer(seconds);
            },
            timer(seconds) {
                const now = Date.now();
                const end = now + seconds * 1000;
                this.displayTimeLeft(seconds);

                this.selectedTime = seconds;
                this.countdown(end);
            },
            countdown(end) {
                intervalTimer = setInterval(() => {
                    const secondsLeft = Math.round((end - Date.now()) / 1000);

                    if(secondsLeft === 0) {
                        this.endTime = 0;
                    }

                    if(secondsLeft < 0) {
                        clearInterval(intervalTimer);
                        return;
                    }
                    this.displayTimeLeft(secondsLeft)
                }, 1000);
            },
            displayTimeLeft(secondsLeft) {
                const minutes = Math.floor((secondsLeft % 3600) / 60);
                const seconds = secondsLeft % 60;

                this.timeLeft = `${this.zeroPadded(minutes)}:${this.zeroPadded(seconds)}`;
            },
            zeroPadded(num) {
                return num < 10 ? `0${num}` : num;
            },
            submit() {
                this.loader = 'loading'
                if(this.$refs.form.validate()) {
                    let formData = {
                        'otp_code': this.otpcode,
                    }
                    axios.post('/api/auth/verification', formData)
                        .then((response) => {
                            let { data } = response
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
                                    text: 'Account was Verified!',
                                    icon: 'mdi-check-circle',
                                    locAlert: false,
                                })
                                this.setAuth(data.data)
                                this.otpcode = ''
                                this.$refs.form.reset()
                                this.$refs.form.resetValidation()
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