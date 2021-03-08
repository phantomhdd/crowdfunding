import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

const numberFormats = {
    'id-ID': {
        currency: {
            style: 'currency',
            currency: 'IDR',
            currencyDisplay: 'symbol'
        }
    },
    'ja-JP': {
        currency: {
            style: 'currency',
            currency: 'JPY',
            currencyDisplay: 'symbol'
        }
    },
    'en-EN': {
        currency: {
            style: 'currency',
            currency: 'EUR',
            currencyDisplay: 'symbol'
        }
    }
}  

export default new VueI18n({
    numberFormats
})