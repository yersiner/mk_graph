import { SET_USER, SET_TOKEN } from '../mutation_types.js'
import api from '~/GraphApp/api/index.js'

const Store = function (namespace, data) {
    if (arguments.length > 1) {
      return localStorage.setItem(namespace, JSON.stringify(data));
    } else {
      var store = localStorage.getItem(namespace);
      return (store && JSON.parse(store)) || {};
    }
}

export default {
	namespaced: true,
	state: {
		userInfo: Store('user')
	},
	actions: {
		sendLogin ({ commit }, info) {
			const {phone, password, verification} = info
			return api.request('post', api.getURL('login/userLogin'), {
				phone,
				password,
				verification
			})
		},
		loadCaptcha () {
			return api.request('get', api.getURL('login/captcha'))
		}
	},
	mutations: {
		[SET_USER] (state, user) {
		  state.userInfo = user
		}
	},
	getters: {
		UserInfo: state => {
	      return state.userInfo
	    }
	}
}