import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);
export const store = new Vuex.Store({
    strict: true,
    state: {
        loggedIn: false
    },
    mutations: {
        logIn: state => {
            state.loggedIn = true;
        },
        logOut: state => {
            state.loggedIn = false;
        }
    },
    actions: {
        logIn: context => {
            context.commit('logIn');
        },
        logOut: context => {
            context.commit('logOut');
        }
    }
});