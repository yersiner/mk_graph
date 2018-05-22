import {PHYSIQUE_LIST_DATA, PHYSIQUE_DETAIL_DATA} from '../mutation_types.js'
import Vue from 'vue';
import api from '~/GraphApp/api/index.js'

const pageCount = 10; //每页显示10个
const typeMap = {
	//[0=血压/1=血氧/3=脉搏4=血糖]
	"pressure": 0,
	"oxygen": 1,
	"sugar": 4,
	"heart": 3
}
const typeNameMap = {
	"pressure": "血压",
	"oxygen": "血氧",
	"sugar": "血糖",
	"heart": "心率"
}
export default {
	namespaced: true,
	state: () => ({//状态需要的数据
	    list: [],
	    totalCount: '',
	    userId: '',
	    physiqueDetail:{},
	    pressureList: {
	    	szy:[],
	    	ssy:[],
	    	list: [],
	    	day: []
	    },
	    sugarList: {
	    	list: [],
	    	day: []
	    },
	    oxygenList: {
	    	list: [],
	    	day: []
	    },
	    heartList: {
	    	list: [],
	    	day: []
	    }
	}),
	actions: {//异步操作需要调用的方法 
		physiqueList ({ commit, rootState}, info) {
			const {findCondition, pageIndex, pageSize} = info
			api.request('POST', api.getURL('physiqueModule/physiqueList'), {
				findCondition,
				pageIndex,
				pageSize,
				token:rootState.token
			}).then(response => {

				//更新 状态 执行mutation 就需要执行commit

				var res = response.data.obj;
				if (res) {
					commit(PHYSIQUE_LIST_DATA, res);
				}
				
			})
		},
		querySinglePhyData({commit, rootState, state}, payload) {
			let {type, beginTime, endTime} = payload
			return api.request('POST', api.getURL('physiqueModule/selectPhysique'), {
				beginTime,
				endTime,
				type: typeMap[type],
				userId: state.userId,
				token:rootState.token
			}).then((res) => {
				let list = res.data.obj.list
				let curData = {}
				curData[type] = {}
				if(type === 'pressure') {
					curData[type].ssy = list.map((item)=>{
						return item.ssy
					})
					curData[type].szy = list.map((item)=>{
						return item.szy
					})
				}else {
					curData[type].list = list.map((item)=>{
						return item.value
					})
				}
				curData.type = type
				curData.name = typeNameMap[type]
				curData[type].day = list.map((item)=>{
						return item.day
				})
				return curData
			})
		},
		getPhysiqueDetail({commit, rootState, state}, info) {
			const {userId} = info
			state.userId = userId
			//console.log(userId)
			return api.request('POST', api.getURL('physiqueModule/getPhysiqueDetail'), {
				userId,
				token:rootState.token
			}).then(response => {
				var res = response.data.obj;
				if (res) {
					console.log('详情',res);
					commit(PHYSIQUE_DETAIL_DATA, res);
					return {
						pressureList: state.pressureList,
						sugarList: state.sugarList,
						oxygenList: state.oxygenList,
						heartList: state.heartList
					}
				}
				
			})

		}
	},
	mutations: {//更新状态
		[PHYSIQUE_LIST_DATA] (state, {list, totalCount}) {
			//state.list = hospitalList 不能这样
			Vue.set(state, 'list', list);
			Vue.set(state, 'totalCount', totalCount);
		},
		[PHYSIQUE_DETAIL_DATA] (state, data) {
			console.log('detail',data);

			state.pressureList.ssy = data.pressureList.map((item) => {
				return item.ssy
			})
			state.pressureList.szy = data.pressureList.map((item) => {
				return item.szy
			})
			
			for(let key in data){
				state[key].day = data[key].map((item) => {
					return item.day
				})
				state[key].list = data[key].map((item) => {
					return item.value
				})
			}
			//state.physiqueDetail = Object.assign({},state.physiqueDetail,data);
		}
	},
	getters: {
	   isSuccess (state, getters, rootState) {
	        return rootState.isSuccess
	   }
	}
}