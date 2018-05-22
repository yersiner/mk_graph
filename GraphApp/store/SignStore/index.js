import { SET_SIGN_DATA, SET_SIGN_DETAIL} from '../mutation_types.js'
import Vue from 'vue';
import api from '~/GraphApp/api/index.js'

const pageCount = 10; //每页显示10个
export default {
	namespaced: true,
	state: () => ({//状态需要的数据
	    list: [],
	    totalCount: '',
	    detailInfo: {
	    	audit_time: {}
	    }
	}),
	actions: {//异步操作需要调用的方法
		getList ({ commit, rootState}, info) {
			commit('UPDATE_LOADING_STATUS', {isLoading: true}, {root:true})
			const {conditions, page_index, item_count} = info
			api.request('post', api.getURL('signModule/querySignList'), {
				conditions,
				page_index,
				item_count,
				token:rootState.token
			}).then(response => {
				//更新 状态 执行mutation 就需要执行commit
				commit('UPDATE_LOADING_STATUS', {isLoading: false}, {root:true})
				console.log('签约列表',response);
				var res = response.data.obj;
				if (res) {
					commit(SET_SIGN_DATA, res);
				}
			})
		},
		//签约详情
		querySignDetail ({ commit, rootState }, info) {
			commit('UPDATE_LOADING_STATUS', {isLoading: true}, {root:true})
			const { signId } = info
			api.request('post', api.getURL('signModule/querySignDetail'), {
				signId,
				token:rootState.token
			}).then(response => {
				//更新 状态 执行mutation 就需要执行commit
				commit('UPDATE_LOADING_STATUS', {isLoading: false}, {root:true})
				var res = response.data;
				if (res) {
					commit(SET_SIGN_DETAIL, res.obj);
				}
			})
		}
	},
	mutations: {//更新状态
		[SET_SIGN_DATA] (state, {signList, totalCount}) {
			//state.list = hospitalList 不能这样
			Vue.set(state, 'list', signList);
			Vue.set(state, 'totalCount', totalCount);
		},
		[SET_SIGN_DETAIL] (state, data) {
			state.detailInfo = Object.assign({}, state.detailInfo, data)
		}
	},
	getters: {
	  
	}
}