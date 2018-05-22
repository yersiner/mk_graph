import {SET_HEALTH_RECORD_LIST, SET_HEALTH_RECORD_AREA_DATA,SET_HEALTH_RECORD_DETAIL} from '../mutation_types.js'
import api from '~/GraphApp/api/index.js'

export default {
	namespaced: true,
	state: {
		recordData: {
			//健康档案数据
		},
		iconRecordData: {

		},
		areaData: {
			
		},
		recordDetail: {
			//健康档案详情
			times:{}
		}
	},
	actions: {
		queryHealthRecordList({commit, rootState}, payload) {
     		commit('UPDATE_LOADING_STATUS', {isLoading: true}, {root:true})
			const {conditions, province, prefecture, sex, page_index, item_count} = payload
			return api.request('post', api.getURL('dataAnalyzeModule/healthRecordDistributionTotal'), {
				page_index,
				item_count,
				token:rootState.token,
				conditions,
				province,
				prefecture,
				sex
			}).then((res)=>{
     			commit('UPDATE_LOADING_STATUS', {isLoading: false}, {root:true})
				commit('SET_HEALTH_RECORD_LIST', res.data.obj)
			}).catch((res)=> {
				console.log('健康档案查询报错')
			})
		},
		//导出当前列表
		exportHealthList({commit, rootState}, info) {
			const {exportIds} = info
			let path = api.getURL('dataAnalyzeModule/exportHealthRecordList')
			console.log(path)
			window.location.href ="http://" + location.hostname + "/"+ path +"?exportIds="+exportIds+"&token="+rootState.token;
		},
		fetchHealthAreaData({commit, rootState}, payload) {
			const {province, prefecture} = payload
			return api.request('post', api.getURL('dataAnalyzeModule/staticticHealthTotal'), {
				token:rootState.token,
				province,
				prefecture
			}).then((res)=>{
     		    commit('UPDATE_LEFT_LOADING_STATUS', {isLoading: false}, {root:true})
				commit('SET_HEALTH_RECORD_AREA_DATA', res.data.obj)
			}).catch((res)=> {
				console.log('健康档案地区查询报错')
			})
		},
		//健康档案详情
		queryHealthRecordDetail({commit, rootState}, info) {
			const { case_id, region_id, user_id } = info
			api.request('POST',api.getURL('dataAnalyzeModule/queryHealthRecordDetail'), {
				token:rootState.token,
				case_id:case_id,
				user_id:user_id,
				region_id:region_id
			}).then(res=> {
				console.log('res----->',res);
				console.log('data----->',case_id,region_id,user_id);

				commit(SET_HEALTH_RECORD_DETAIL,res.data.obj)
			})
		}
	},
	mutations: {
		[SET_HEALTH_RECORD_LIST] (state, data) {
			state.recordData = Object.assign({}, state.recordData, data)
			state.iconRecordData = Object.assign({}, state.iconRecordData, data)
		},
		[SET_HEALTH_RECORD_AREA_DATA](state, data) {
			state.areaData = {}
			state.areaData = Object.assign({}, state.areaData, data)
		},
		[SET_HEALTH_RECORD_DETAIL] (state, data) {
			state.recordDetail = Object.assign({}, state.recordDetail, data)
			console.log('data',data)
		}
	},
	getters: {
		
	}
}