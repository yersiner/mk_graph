import { SET_ACCOUNT_DATA , ADD_ACCOUNT_DATA, LOGOUT_ACTIVE_ACCOUNT, DETAIL_ACCOUNT_DATA,
UPDATE_ACCOUNT_DATA, ISEXIST_ACCOUNT_DATA, INIT_ADD_ACCOUNT} from '../mutation_types.js'
import Vue from 'vue';
import api from '~/GraphApp/api/index.js'

const pageCount = 10; //每页显示10个
export default {
	namespaced: true,
	state: () => ({//状态需要的数据
	    list: [],
	    totalCount: '',
	    detailInfo: {},
	    addAccountInfo: {},
	    updateAccountInfo: {},
	    existAcountInfo: {}
	}),
	actions: {//异步操作需要调用的方法 
		queryAccountList ({ commit, rootState}, info) {
			commit('UPDATE_LOADING_STATUS', {isLoading: true}, {root:true})
			const {conditions, page_index, item_count} = info
			api.request('POST', api.getURL('accountModule/queryAccountList'), {
				conditions,
				page_index,
				item_count,
				token:rootState.token
			}).then(response => {
				//更新 状态 执行mutation 就需要执行commit
				commit('UPDATE_LOADING_STATUS', {isLoading: false}, {root:true})
				var res = response.data.obj;
				if (res) {
					commit(SET_ACCOUNT_DATA, res);
				}
				
			})
		},
		//添加账户信息
		sendAddAccount ({ commit ,rootState}, info) {
			commit('UPDATE_LOADING_STATUS', {isLoading: true}, {root:true})
			const {name, password, title, phone} = info
			api.request('POST', api.getURL('accountModule/addCloudAccount'), {
				name,
				password,
				title,
				phone,
				token:rootState.token
			}).then(response => {
				//更新 状态 执行mutation 就需要执行commit
				commit('UPDATE_LOADING_STATUS', {isLoading: false}, {root:true})
				var res = response.data;
				console.log('添加账户信息',res)
				// commit('UPDATE_SUCCESS_STATUS', false,  { root: true })
				// commit(ADD_ACCOUNT_DATA,res);
			})
		},
		//查询账户是否存在
		queryAccuntIsExist ({commit, rootState}, info) {
			// commit('UPDATE_LOADING_STATUS', {isLoading: true}, {root:true})
			const {phone} = info
			return api.request('POST',api.getURL('accountModule/queryAccuntIsExist'), {
				account:phone,
				token:rootState.token
			})
		},
		//账号详情
		queryAccountDetail ({ commit, rootState}, info) {
			commit('UPDATE_LOADING_STATUS', {isLoading: true}, {root:true})
			const { accountId } = info
			api.request('POST', api.getURL('accountModule/queryAccountDetail'), {
				accountId,
				token:rootState.token
			}).then(response => {
				commit('UPDATE_LOADING_STATUS', {isLoading: false}, {root:true})
				var res = response.data;
				if (res.obj) {
					commit(DETAIL_ACCOUNT_DATA, res.obj);
				}
			})
		},
		//账号编辑
		updateAccountInfo ({ commit, rootState}, info) {
			commit('UPDATE_LOADING_STATUS', {isLoading: true}, {root:true})
			const {name, password, title, phone,accountId } = info
			api.request('POST', api.getURL('accountModule/updateAccountInfo'), {
				name,
				password,
				title,
				phone,
				accountId,
				token:rootState.token
			}).then((res) => {
				 commit('UPDATE_LOADING_STATUS', {isLoading: false},  { root: true });
        		 commit('UPDATE_SUCCESS_STATUS', true,  { root: true })
			})
		},
		//注销 激活账号
		stopOrStartAccount ({ commit, rootState}, info) {
			commit('UPDATE_LOADING_STATUS', {isLoading: true}, {root:true})
			const {accountId, status} = info
			api.request('POST', api.getURL('accountModule/stopOrStartAccount'), {
				accountId,
				status,
				token:rootState.token
			}).then(response => {
				commit('UPDATE_LOADING_STATUS', {isLoading: false}, {root:true})
				
				commit(LOGOUT_ACTIVE_ACCOUNT,accountId)
			})
		}
	},
	mutations: {//更新状态
		//初始化添加状态
		[INIT_ADD_ACCOUNT](state, payload) {
			Vue.set(state, 'detailInfo', {
				
			});
		},
		//添加账号
		[SET_ACCOUNT_DATA] (state, {accountList, totalCount}) {
			//state.list = hospitalList 不能这样
			Vue.set(state, 'list', accountList);
			Vue.set(state, 'totalCount', totalCount);
		},
		//注销激活账号
		[LOGOUT_ACTIVE_ACCOUNT] (state, accountId) {
			for(var item of state.list) {
				if(item.accountId === accountId) {
					if (item.status === -99) {
						item.status = 0; //改变成已注销的状态
						console.log("状态变为正常");
					}else if(item.status === 0){
						item.status = -99; //改变成已注销的状态
					}
				}
			}
		},
		//账号详情
		[DETAIL_ACCOUNT_DATA] (state, data) {
			state.detailInfo = Object.assign({}, state.detailInfo, data)
		},
		//添加账户返回的信息
		[ADD_ACCOUNT_DATA] (state,data) {
			state.addAccountInfo = Object.assign({}, state.addAccountInfo, data)
		},
		//修改账户返回信息
		[UPDATE_ACCOUNT_DATA] (state,data) {
			state.updateAccountInfo = Object.assign({}, state.updateAccountInfo, data);
		}
	},
	getters: {
	   isSuccess (state, getters, rootState) {
	        return rootState.isSuccess
	   }
	}
}