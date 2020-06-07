import Vue from 'vue';
import Vuex from 'vuex';
import {
  url, requestGetOptions, requestPostOptions, responseHandler,
  getToken,
} from '../helpers';
// import router from '../router';

Vue.use(Vuex);
const user = JSON.parse(localStorage.getItem('user'));
const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: {}, user: null };
console.log(initialState);
export default new Vuex.Store({
  state: {
    provider: '',
    error: '',
    quotes: null,
    similarQuote: null,
    ...initialState,
  },
  mutations: {
    LOGIN_REQUEST(state, { provider }) {
      state.provider = provider;
    },
    LOGIN_PROCESS(state, { provider, token }) {
      state.provider = provider;
      localStorage.setItem('token', token);
    },
    USER_SUCCESS(state, { newUser }) {
      localStorage.setItem('user', JSON.stringify(newUser));
      state.status.loggedIn = true;
      state.user = newUser;
    },
    USER_FAIL(state) {
      state.status.loggedIn = false;
      state.error = 'Authentication failed';
    },
    QUOTES_SUCCESS(state, { quotes }) {
      state.quotes = quotes;
    },
    QUOTES_FAIL(state) {
      state.quotes = null;
      state.error = 'Quotes fetching failed';
    },
    VOTING_SUCCESS(state, { result }) {
      console.log(result);
      state.quotes = result.quote;
      state.similarQuote = result.similarQuote;
    },
    VOTING_FAIL(state, { err }) {
      console.log(err);
      state.error = 'Quotes voting failed';
    },
    LOGOUT(state) {
      state.status = {};
      state.user = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
  },
  actions: {
    login({ commit }, { provider }) {
      commit('LOGIN_REQUEST', { provider });
      console.log(url);
      window.open(`${url}/auth/${provider}`, '_self');
    },
    loginProcess({ dispatch, commit }, { provider, token }) {
      commit('LOGIN_PROCESS', { provider, token });
      dispatch('loginUser', { provider, token });
    },
    loginUser({ commit }, { provider, token }) {
      commit('LOGIN_REQUEST', { provider });
      fetch(`${url}/auth/${provider}/${token}`, requestGetOptions)
        .then(responseHandler)
        .then((userOptional) => {
          if (userOptional.user !== null) {
            commit('USER_SUCCESS', { newUser: userOptional.user });
          } else {
            commit('USER_FAIL');
          }
        });
    },
    getRandomQuotes({ commit }, { locale }) {
      fetch(`${url}/quotes/random/lang/${locale}`, requestGetOptions)
        .then(responseHandler)
        .then((randomQuotes) => {
          if (randomQuotes !== null) {
            commit('QUOTES_SUCCESS', { quotes: randomQuotes });
          } else {
            commit('QUOTES_FAIL');
          }
        });
    },
    vote({ commit }, { quoteId, newVote, locale }) {
      const token = getToken();
      requestPostOptions.body = JSON.stringify({
        quoteId, newVote, token, lang: locale,
      });
      console.log(requestPostOptions);
      fetch(`${url}/quotes/vote`, requestPostOptions)
        .then(responseHandler)
        .then((result) => commit('VOTING_SUCCESS', { result }))
        .catch((err) => commit('VOTING_FAIL', { err }));
    },
    logout({ commit }) {
      commit('LOGOUT');
    },
  },
  modules: {
  },
});
