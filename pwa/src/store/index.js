// Lib imports
import Vue from 'vue'
import Vuex from 'vuex'

// Store functionality
import modules from './modules'

Vue.use(Vuex)

// Create our store
const store = new Vuex.Store({
    modules,
    state: {}
})

export default store