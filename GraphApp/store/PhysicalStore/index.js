import {SET_HOSPITAL_PHYSICAL_DATA, SET_PHYSICAL_AREA_DATA, SET_WORLD_PHYSICAL_DATA} from '../mutation_types.js'
import api from '~/GraphApp/api/index.js'

export default {
	namespaced: true,
	state: {
		hosPyhsicalData: {
			labels: [],
			datas: []
		}, //医院体格数据
		worldPyhsicalData: {
			labels: [],
			datas: []
		}, //全国体格数据
		areaData: {
			
		}
	},
	actions: {
		fetchWorldPhysical({commit, rootState}, payload) {
			const {year, month, type} = payload
			return api.request('post', api.getURL('dataAnalyzeModule/selectAllSignTotal'), {
				token:rootState.token,
				year,
				month
			}).then((res)=>{
				commit('SET_WORLD_PHYSICAL_DATA', res.data.obj)
				console.log('loadHospitalPhysical--->', res)
			}).catch((res)=> {
     		    //commit('UPDATE_LOADING_STATUS', {isLoading: false}, {root:true})
				console.log('各省份医院体格数据查询报错')
			})
		},
		fetchHospitalPhysical({commit, rootState}, payload) {
			const {province} = payload
			return api.request('post', api.getURL('dataAnalyzeModule/hospitalSignTotal'), {
				token:rootState.token,
				province
			}).then((res)=>{
				commit('SET_HOSPITAL_PHYSICAL_DATA', res.data.obj)
				console.log('loadHospitalPhysical--->', res)
			}).catch((res)=> {
     		    //commit('UPDATE_LOADING_STATUS', {isLoading: false}, {root:true})
				console.log('各省份医院体格数据查询报错')
			})
		},
		fetchPhysicalAreaData({commit, rootState}, payload) {
			const {province, prefecture} = payload
			return api.request('post', api.getURL('dataAnalyzeModule/signStatisticsTotal'), {
				token:rootState.token,
				province,
				prefecture
			}).then((res)=>{
     		    commit('UPDATE_LEFT_LOADING_STATUS', {isLoading: false}, {root:true})
				commit('SET_PHYSICAL_AREA_DATA', res.data.obj)
				console.log('areaData--->', res)
			}).catch((res)=> {
     		    //commit('UPDATE_LOADING_STATUS', {isLoading: false}, {root:true})
				console.log('健康档案地区查询报错')
			})
		}
	},
	mutations: {
		[SET_HOSPITAL_PHYSICAL_DATA] (state, data) {
			state.hosPyhsicalData.labels = []
			state.hosPyhsicalData.datas = []
			for(let item of data.signsTotalList) {
				state.hosPyhsicalData.labels.push(item.hospitalName)
				state.hosPyhsicalData.datas.push(item.signTotal)
			}
		},
		[SET_WORLD_PHYSICAL_DATA](state, data) {
			state.worldPyhsicalData.labels = []
			state.worldPyhsicalData.datas = []
			for(let item of data.allSignList) {
				state.worldPyhsicalData.labels.push(item.day)
				state.worldPyhsicalData.datas.push(item.signsTotal)
			}
		},
		[SET_PHYSICAL_AREA_DATA](state, data) {
			state.areaData = Object.assign({}, state.areaData, data)
		}
	},
	getters: {
		
	}
}