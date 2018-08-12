import Vue from 'vue'
import VueI18n from 'vue-i18n'
import lang from './lang'

Vue.use(VueI18n)

const i18n = new VueI18n({
    locale: 'zh_cn',
    fallbackLocale: 'zh_cn',
    silentTranslationWarn: true,
    messages: lang
})
export default i18n