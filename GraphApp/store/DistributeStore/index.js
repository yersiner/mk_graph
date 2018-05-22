import { UPDATE_POSITION_LIST, INIT_MAP_INSTANCE, SET_MAP_VIEWPORT, SET_HOSPITAL_AREA_DATA, DETAIL_PANE_TOGGLE } from '../mutation_types.js'
import api from '~/GraphApp/api/index.js'
import Vue from 'vue'
export default {
	namespaced: true,
	state: {
		Points: [],
		hospitalList: [],
        areaData: {

        },
        barToggle: false,
        mapInstance: null
	},
	actions: {
		fetchPositionList({commit, rootState}, hospitalName) {
     		commit('UPDATE_LOADING_STATUS', {isLoading: true}, {root:true})
			return api.request('post', api.getURL('dataAnalyzeModule/queryHospitalLocationList'), {
				token: rootState.token,
				hospitalName:hospitalName
			}).then((res) => {
     		    commit('UPDATE_LOADING_STATUS', {isLoading: false}, {root:true})
				commit('UPDATE_POSITION_LIST', res.data.obj)
				commit('SET_MAP_VIEWPORT')
				console.log('hospitalName--->', res)
			})
		},
		fetchHospitalAreaData({commit, rootState}, payload) {
			const {province, prefecture} = payload
			return api.request('post', api.getURL('dataAnalyzeModule/hospitalDistributionTotal'), {
				token:rootState.token,
				province,
				prefecture
			}).then((res)=>{
     		    commit('UPDATE_LEFT_LOADING_STATUS', {isLoading: false}, {root:true})
				commit('SET_HOSPITAL_AREA_DATA', res.data.obj)
				console.log('areaData--->', res)
			}).catch((res)=> {
				console.log('健康档案地区查询报错')
			})
		}
	},
	mutations: {
		[UPDATE_POSITION_LIST] (state, data) {
		  Vue.set(state, 'hospitalList', []);
		  Vue.set(state, 'hospitalList', data.locationList);
		  let list = data.locationList.map((item)=>{
		  	 return {
		  	 	lat: item.location.lat,
		  	 	lng: item.location.lng
		  	 }
		  })
		  console.log('posList-->', list)
		  Vue.set(state, 'Points', list)
		},
		[INIT_MAP_INSTANCE] (state, map) {
			state.mapInstance = map
			console.log('mapInstance-->', state.mapInstance);
		},
		[SET_MAP_VIEWPORT] (state) {
			let posList = state.Points
			state.mapInstance.setViewport(posList)
		},
		[SET_HOSPITAL_AREA_DATA](state, data) {
			state.areaData = {}
			state.areaData = Object.assign({}, state.areaData, data)
		},
		[DETAIL_PANE_TOGGLE](state) {
			state.barToggle = !state.barToggle
		}
	},
	getters: {
		
	}
}