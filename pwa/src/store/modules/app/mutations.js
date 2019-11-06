import { set, toggle } from '@/utils/vuex'

export default {
    showNavigation: set('navigationIsVisible'),
    toggleNavigation: toggle('navigationIsVisible')
}
