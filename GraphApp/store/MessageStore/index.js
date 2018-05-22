import { SET_MESSAGE_DATA, MESSAGE_BACK_LIST, MESSAGE_DETAIL_DATA, MESSAGE_DELETE_DATA} from '../mutation_types.js'
import Vue from 'vue';
import api from '~/GraphApp/api/index.js'

const pageCount = 10; //每页显示10个
export default {
	namespaced: true,
	state: () => ({//状态需要的数据
	    list: [],
	    totalCount: '',
	    messageBackList: [],
	    backDetailInfo:{
	    	fk_time:{},
	    	disposal:{
	    		timed:{}
	    	}
	    }
	}),
	actions: {
		//信息列表
		messageList ({ commit, rootState }, info) {
			commit('UPDATE_LOADING_STATUS', {isLoading: true}, {root:true})
			const {pageIndex, pageSize, msgWay, status} = info
			api.request('POST', api.getURL('messageModule/messageList'), {
				pageIndex:pageIndex,
				pageSize:pageSize,
				msgWay:msgWay,
				status:status,
				userId:rootState.userInfo.accountId,
				token:rootState.token
			}).then(response => {
				//更新 状态 执行mutation 就需要执行commit
				commit('UPDATE_LOADING_STATUS', {isLoading: false}, {root:true})
				// console.log('用户信息：',rootState.userInfo);
				var res = response.data.obj;
				if (res) {
					commit(SET_MESSAGE_DATA, res);
				}
			})
		},
		//消息推送
		messageSend ({ commit, rootState}, info) {
			commit('UPDATE_LOADING_STATUS', {isLoading: true}, {root:true})
			const {msgTitle, msgTo, msgContent} = info
			api.request('POST', api.getURL('messageModule/messageSend'), {
				phone:rootState.userInfo.phone,
				name:rootState.userInfo.name,
				msgTitle:msgTitle,
				msgTo:msgTo,
				msgContent:msgContent,
				token:rootState.token
			}).then(response => {
				commit('UPDATE_LOADING_STATUS', {isLoading: false}, {root:true})
				// var res = response.data.obj;
			})
		},
		//意见反馈
		messageBackList ({commit, rootState}, info) {
			commit('UPDATE_LOADING_STATUS', {isLoading: true}, {root:true})
			const { msgWay, status, pageIndex, pageSize } = info
			api.request('POST', api.getURL('messageModule/messageBackList'), {
				msgWay:msgWay,
				status:status,
				pageIndex:pageIndex,
				pageSize:pageSize,
				token:rootState.token
			}).then(response => {
				commit('UPDATE_LOADING_STATUS', {isLoading: false}, {root:true})
				// console.log('意见反馈',response);
				var res = response.data.obj;
				if (res) {
					commit(MESSAGE_BACK_LIST, res);
				}
			})
		},
		//意见反馈详情
		getMessageDetail ({commit, rootState}, info) {
			commit('UPDATE_LOADING_STATUS', {isLoading: true}, {root:true})
			const { feedBackId } = info
			api.request('POST', api.getURL('messageModule/getMessageDetail'), {
				feedBackId:feedBackId,
				token:rootState.token
			}).then(response => {
				commit('UPDATE_LOADING_STATUS', {isLoading: false}, {root:true})
				var res = response.data.obj;
				commit(MESSAGE_DETAIL_DATA, res);
			})
		},
		//意见反馈删除
		messageDel ({commit, rootState}, info) {
			commit('UPDATE_LOADING_STATUS', {isLoading: true}, {root:true})
			const { feedBackId } = info
			api.request('POST', api.getURL('messageModule/messageDel'), {
				feedBackId:feedBackId,
				token:rootState.token
			}).then(response => {
				console.log('意见反馈删除',response);
				commit('UPDATE_LOADING_STATUS', {isLoading: false}, {root:true})
				var res = response.data.obj
				commit(MESSAGE_DELETE_DATA,feedBackId);
			})
		},
		//详情提交
		replyMsgBack ({commit, rootState}, info) {
			commit('UPDATE_LOADING_STATUS', {isLoading: true}, {root:true})
			const { feedBackId, phone, comment, channel } = info
			api.request('POST', api.getURL('messageModule/replyMsgBack'), {
				feedBackId:feedBackId,
				phone:phone,
				comment:comment,
				channel:channel,
				name:rootState.userInfo.name,
				token:rootState.token
			}).then(response => {
				console.log('反馈详情',response);
			})
		}
	},
	mutations: {//更新状态
		[SET_MESSAGE_DATA] (state, {list, totalCount}) {
			Vue.set(state, 'list', list);
			Vue.set(state, 'totalCount', totalCount);
		},
		[MESSAGE_BACK_LIST] (state, {list, totalCount}) {
			Vue.set(state, 'messageBackList', list);
			Vue.set(state, 'totalCount', totalCount);
		},
		[MESSAGE_DETAIL_DATA] (state, data) {
			state.backDetailInfo = Object.assign({}, state.detailInfo, data)
		},
		//删除反馈列表
		[MESSAGE_DELETE_DATA](state, feedBackId) {
			//改变医院列表的注销状态
			for(var item of state.messageBackList) {
				/*if(item.feedBackId === feedBackId) {
					if (item.status === -99) {
						item.status = 0; //改变成已注销的状态
						console.log("状态变为正常");
					}else if(item.status === 0){
						item.status = -99; //改变成已注销的状态
						console.log("状态变为注销");
					}
				}*/
			}
		}
	},
	getters: {
	  
	}
}