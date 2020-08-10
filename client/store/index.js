import Vue from 'vue'
import Vuex from 'vuex'
import pkg from 'package'
import * as actions from './actions'
import * as getters from './getters'

import app from './modules/app'
import menu from './modules/menu'

import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const store = new Vuex.Store({
    strict: true, // process.env.NODE_ENV !== 'production',
    actions,
    getters,
    modules: {
        app,
        menu
    },
    state: {
        pkg
    },
    mutations: {},
    plugins: [createPersistedState()]
})

export default store