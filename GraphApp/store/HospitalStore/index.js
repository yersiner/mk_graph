import { SET_HOT_DATA, SET_HOT_END_INDEX, UPDATE_HOT_LIST_LOGOOUT_STATUS,DETAIL_HOT_DATA} from '../mutation_types.js'
import { UPDATE_HOT_AUTHORIZE_STATUS, EDIT_HOT_DATA, INIT_ADD_HOT, ISEXIST_HOT_DATA} from '../mutation_types.js'
import Vue from 'vue';
import api from '~/GraphApp/api/index.js'

const pageCount = 10; //每页显示10个
export default {
	namespaced: true,
	state: () => ({
	    list: [], //医院列表数据
	    totalCount: '',
	    exportIds:'',
	    detailInfo: {
	    	images:[]
	    },
	    editInfo: {}
	}),
	actions: {
		//获取医院列表
		queryHospitalList ({ commit, rootState}, info) {
			commit('UPDATE_LOADING_STATUS', {isLoading: true}, {root:true})
			const {name, page_index, item_count} = info
			api.request('post', api.getURL('hospitalModule/queryHospitalList'), {
				name,
				page_index,
				item_count,
				token:rootState.token
			}).then(response => {
				//数据请求成功执行的方法
				commit('UPDATE_LOADING_STATUS', {isLoading: false}, {root:true})
				//更新 状态 执行mutation 就需要执行commit
				var res = response.data.obj;
				if (res) {
					commit(SET_HOT_DATA, res);
				}	
			})
		},
		//医院详情
		getHospitalDetail ({commit,rootState}, info) {
			commit('UPDATE_LOADING_STATUS', {isLoading: true}, {root:true})
			const {hospitalId} = info
			api.request('post', api.getURL('hospitalModule/queryHospitalDetail'), {
				hospitalId,
				token:rootState.token
			}).then(response => {
				var res = response.data;				
     		    commit('UPDATE_LOADING_STATUS', {isLoading: false}, {root:true});
     		    if (res) {
     		    	commit(DETAIL_HOT_DATA, res.obj);
     		    }
			})
		},
		//编辑医院信息
		updateHospitalInfo ({commit,rootState},info) {
			commit('UPDATE_LOADING_STATUS', {isLoading: true},  { root: true });
			const {name, res_person, phone, grade, nature, area_id, address, content, images, 
				hospitalId, region_id} = info
			api.request('post',api.getURL('hospitalModule/updateHospitalInfo'), {
				name,
				res_person,
				phone,
				grade,
				nature,
				area_id,
				address,
				content,
				images,
				hospitalId,
				region_id,
				token:rootState.token
			}).then(response => {
				//更新 状态 执行mutation 就需要执行commit
				var res = response.data;
				commit('UPDATE_LOADING_STATUS', {isLoading: false},  { root: true });
				commit('UPDATE_SUCCESS_STATUS', true,  { root: true })
			})
		},
		//按条件搜索医院列表
		searchHospital({commit},info) {
			commit('UPDATE_LOADING_STATUS', {isLoading: true},  { root: true });
			const {name, page_index, item_count} = info
			api.request('post',api.getURL('hospitalModule/'),{
				name,
				page_index,
				item_count
			}).then(response=> {
				commit('UPDATE_LOADING_STATUS', {isLoading: false},  { root: true });
				var res = response.data.obj;
				if (res) {
					commit(SET_HOT_DATA, res);
				}
			})
		},
		//添加医院
		sendAddHostpital({commit, rootState}, info) {
			commit('UPDATE_LOADING_STATUS', {isLoading: true},  { root: true });
			const {name, res_person, phone, grade, nature, area_id, address, content, images} = info
			api.request('POST', api.getURL('hospitalModule/addHospital'), {
				name,
				res_person,
				phone,
				grade,
				nature,
				area_id,
				address,
				content,
				images,
				token:rootState.token
			}).then(response => {
				//数据请求成功执行的方法	
							
				commit('UPDATE_LOADING_STATUS', {isLoading: false},  { root: true });
				commit('UPDATE_SUCCESS_STATUS', true,  { root: true });

			}).catch(()=>{
				console.log('eroor-------> kksdljfsldjljs');

			})
		},
		//删除图片
		deleteFile ({commit, rootState}, info) {
			commit('UPDATE_LOADING_STATUS', {isLoading: true},  { root: true });
			const { hash, hospitalId, type} = info
			api.request('POST', api.getURL('hospitalModule/deleteFile'), {
				hash:hash,
				type:type,
				hospitalId:hospitalId,
				token:rootState.token
			}).then(response => {
				commit('UPDATE_LOADING_STATUS', {isLoading: false},  { root: true });
			})
		},
		//查询医院是否存在
		selectHospitalIsExist({commit, rootState}, info){
			commit('UPDATE_LOADING_STATUS', {isLoading: true},  { root: true });
			const {name} = info
			api.request('post',api.getURL('hospitalModule/selectHospitalIsExist'), {
				naem:name,
				token,rootState
			}).then(response=> {
				commit('UPDATE_LOADING_STATUS', {isLoading: false},  { root: true });
				console.log('查医院是否存在',response);
				// commit(ISEXIST_HOT_DATA,response);
			})
		},
		//查询所授权的账号是否存在
		queryAccountIsExist ({commit, rootState}, info) {
			const {account} = info
			//由于组件要用到返回状态 这里return了一下
			return api.request('post',api.getURL('hospitalModule/queryAccountIsExist'), {
				account:account,
				token:rootState.token
			})
		},
		//账号授权
		sendAccountAuthorization({commit, rootState},info) {
			const {hospitalId, account, password, phone, region_id, hospitalName} = info
			api.request('post',api.getURL('hospitalModule/authAccount'),{
				hospitalId,
				account,
				password,
				phone,
				region_id,
				hospitalName,
				token:rootState.token
			}).then(response=> {
				// 如果有成功返回对象
				if (response.data.obj) {
					commit(UPDATE_HOT_AUTHORIZE_STATUS,hospitalId)
				}else{
					// this.$notify({ group: 'auth', title: '操作失败',  type: 'error', text: response.data.msg })
				}
				console.log("athor--->",response);				
			})
		},
		// 注销账号
		sendAccountLogout({commit, rootState},info) {
			commit('UPDATE_LOADING_STATUS', {isLoading: true},  { root: true });
			const {hospitalId, region_id, status} = info
			api.request('post',api.getURL('hospitalModule/logoutHospital'),{
				hospitalId,
				region_id,
				status,
				token:rootState.token
			}).then(response=> {
				// var res = response.data.obj;
				commit('UPDATE_LOADING_STATUS', {isLoading: false},  { root: true });
				commit(UPDATE_HOT_LIST_LOGOOUT_STATUS, hospitalId)
				console.log("athor--->",response);
			})
		},
		//导出当前列表
		exportHospitalList({commit, rootState},info) {
			const {hospitalIds} = info
			
			 window.location.href = "http://192.168.1.60:8080/api/hospitalModule/exportHospitalList?hospitalIds="+hospitalIds+"&token="+rootState.token;

			/*api.request('post',api.getURL('hospitalModule/exportHospitalList'),{
				hospitalIds,
				token:rootState.token,
			}).then(response=> {
				console.log("导出当前-->",response,rootState.token);

			})*/

		}
	},
	mutations: {
		//初始化添加医院的信息
		[INIT_ADD_HOT](state, payload) {
			Vue.set(state, 'detailInfo', {
				images:[]
			});
		},
		//只有通过commit提交mutation，才能改变vuex里的state
		[SET_HOT_DATA] (state, {hospitalList, totalCount, exportIds}) {
			//state.list = hospitalList 不能这样
			Vue.set(state, 'list', hospitalList);
			Vue.set(state, 'totalCount', totalCount);
			Vue.set(state, 'exportIds', exportIds);
		},
		//医院详情
		[DETAIL_HOT_DATA] (state, data) {
			state.detailInfo = Object.assign({}, state.detailInfo, data)
			//Vue.set(state, 'obj', obj);

		},
		//医院编辑
		[EDIT_HOT_DATA] (state,data) {
			state.editInfo = Object.assign({},state,editInfo,data)
		},
		//注销和启动
		[UPDATE_HOT_LIST_LOGOOUT_STATUS](state, hotId) {
			//改变医院列表的注销状态
			for(var item of state.list) {
				if(item.hospitalId === hotId) {
					if (item.status === -99) {
						item.status = 0; //改变成已注销的状态
						console.log("状态变为正常");
					}else if(item.status === 0){
						item.status = -99; //改变成已注销的状态
						console.log("状态变为注销");
					}
				}
			}
		},
		//授权
		[UPDATE_HOT_AUTHORIZE_STATUS](state,hotId) {
			for(var item of state.list) {
				if (item.hospitalId === hotId) {
					if (item.authorization === false) {
						item.authorization = true;
					}else if(item.status === true) {
						item.authorization = false;
					}
				}
			}
		}
	},
	getters: {
	  isSuccess (state, getters, rootState) {
	        return rootState.isSuccess
	   }
	}
}