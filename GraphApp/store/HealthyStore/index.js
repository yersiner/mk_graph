import { ARTICLE_LIST_DATA, ARTICLE_ADD_EDIT, ARTICLE_DETAIL_INFO, 
	ARTICLE_CATE_ADD_EDIT, ARTICLE_CATEGORY_LIST, INIT_ARTICLE_DETAIL_INFO} from '../mutation_types.js'
import Vue from 'vue';
import api from '~/GraphApp/api/index.js'

const pageCount = 10; //每页显示10个

let layerCount = 1;
let initData = {
	"86": {

	}
}
function countRecursive(item){
    for(var i =0; i < item.length; i++) {
    	item[i].categoryId = item[i]._id
        item[i].layerNumber = layerCount  //判断层叠数
        if(!item[i].childNode) {
        	item[i].childNode = []
        }
        if(item[i].childNode.length > 0) {
            layerCount++;
            countRecursive(item[i].childNode)            
        }
        if((item.length - 1) === i) {
            layerCount--;
        }
    }
}

function listTranslateRegion(list, linkCategory) {
	for(var i =0; i < list.length; i++) {
		let tid = list[i]._id.match(/\d+/g).join('').slice(7);
		linkCategory[parseInt(tid, 10)] = list[i]._id

		if(list[i].layerNumber === 1) {
			let pid = list[i]._id.match(/\d+/g).join('').slice(7);
			initData["86"][parseInt(pid, 10)] = list[i].name
		}
		if(list[i].layerNumber === 2 || list[i].layerNumber === 3) {
			let cid = list[i].parent_id.match(/\d+/g).join('').slice(7)
			if(!initData[cid]) {
				initData[parseInt(cid, 10)] = {}
			}
			let id = list[i]._id.match(/\d+/g).join('').slice(7)
			//linkCategory[parseInt(cid, 10)] = list[i]._id
			initData[parseInt(cid, 10)][parseInt(id, 10)] = list[i].name
		}
	    if(list[i].childNode.length > 0) {
	        listTranslateRegion(list[i].childNode, linkCategory)         
	    }
	}
}
let initInfo = {
	_id: '',
    name:'addarticle',
    categoryId: true,
    categoryId_two: "",
    categoryId_three: "",
    imgHash: '',
    title:'我是标题',
    sortValue:20,
    content:'gyfnice',
    picked:true
}
export default {
	namespaced: true,
	state: () => ({//状态需要的数据
	    articleList: [],
	    CategoryList: [],
	    delList: [],
	    CategoryMap: {},
	    linkCategory: {},
	    addOrEditList: [],
	    totalCount: '',
	    articleInfo: initInfo,
	    editCategoryId: true
	}),
	actions: {
		//编辑文章
		articleFindById({ commit, rootState}, id) {
			api.request('POST', api.getURL('healthNousModule/articleFindById'), {
				token: rootState.token,
				articleId: id
			}).then(response => {
				commit(ARTICLE_DETAIL_INFO, response.data.obj)
				console.log('response')
			})
		},
		//通过Id删除文章
		articleDelById({ commit, rootState}, id) {
			api.request('POST', api.getURL('healthNousModule/articleDelById'), {
				token: rootState.token,
				articleId: id
			}).then(response => {
				console.log('response')
			})
		},
		//删除分类
		delCategory ({ commit, rootState, dispatch }, id) {
			state.editCategoryId = true
			api.request('POST', api.getURL('healthNousModule/delCategory'), {
				token: rootState.token,
				categoryId: id
			}).then(response => {
				console.log('删除分类')
			})
		},
		//获取分类列表
		getCategory ({ commit, rootState, state }, info) {
			if(!state.editCategoryId) {
				if(info) {
					 listTranslateRegion(state.CategoryList, state.linkCategory)
					 commit('initCategoryMap', initData)
					 return new Promise((resolve, reject) => {
					 	resolve(initData)
					 })
				}
				return;
			} 
			return api.request('POST', api.getURL('healthNousModule/getCategory'), {
				token: rootState.token
			}).then(response => {
				//更新 状态 执行mutation 就需要执行commit
				console.log(response);
				var res = response.data.obj;

				countRecursive(res.list)
				//console.log(res.list)
				commit('ARTICLE_CATEGORY_LIST', res.list)

				state.editCategoryId = false
				if(info) {
					 listTranslateRegion(res.list, state.linkCategory)
					 commit('initCategoryMap', initData)
					 return initData
				}
			})
		},
		//文章分类添加或者编辑
		addOrEditCategory ({commit, rootState, state, dispatch}, info) {
			//const { } = info
			/*let postData = {
				delList: state.delList,
				addOrEditList: state.addOrEditList,
				token: rootState.token
			}*/
			//console.log(postData)
			info.token = rootState.token
			state.editCategoryId = true
			api.request('POST', api.getURL('healthNousModule/addOrEditCategory'), info).then(response => {
				console.log(response);
				dispatch('getCategory')
			})
		},
		//文章列表
		articleList ({commit, rootState}, info) {
			const {userId, articleTitle, categoryId, pageIndex, pageSize } = info
			api.request('POST', api.getURL('healthNousModule/articleList'), {
				"userId":userId,
				"token": rootState.token,
                "articleTitle":articleTitle,
                "categoryId":categoryId,
                "pageIndex":pageIndex,
                "pageSize":pageSize
			}).then(response => {
				var res = response.data.obj;
				console.log('文章列表',res);
				commit('UPDATE_LOADING_STATUS', {isLoading: false},  { root: true });
				if (res) {
					commit(ARTICLE_LIST_DATA, res);
				}
			})
		},
		articleAddOrEdit ({commit, rootState}, info) {
			//const {userId, articleId, articleTitle, categoryId, categoryName, sortValue,content, picked} = info
			info.token = rootState.token
			api.request('POST', api.getURL('healthNousModule/articleAddOrEdit'), info).then(response => {
				var res = response.data;
				console.log('文章添加',res);
				// commit(ARTICLE_CATE_ADD_EDIT, res);
			})
		},
		//文章添加或者编辑

	},
	mutations: {//更新状态
		//文章分类列表
		[ARTICLE_CATEGORY_LIST] (state, data) {
			//Vue.set(state, 'CategoryList', [])
			layerCount = 1;
			initData = {
				"86": {

				}
			}
			Vue.set(state, 'CategoryList', data);
		},
		//文章列表
		[ARTICLE_LIST_DATA] (state, {list, totalCount}) {
			Vue.set(state, 'articleList', list);
			Vue.set(state, 'totalCount', totalCount);
		},
		[ARTICLE_CATE_ADD_EDIT] (state, {}) {

		},
		[ARTICLE_DETAIL_INFO] (state, data) {
			data.categoryId = parseInt(data.cate1.match(/\d+/g).join('').slice(7), 10)
			data.categoryId_two = data.cate2 && parseInt(data.cate2.match(/\d+/g).join('').slice(7), 10)
			data.categoryId_three = data.cate3 && parseInt(data.cate3.match(/\d+/g).join('').slice(7), 10)
            state.articleInfo = Object.assign({}, state.articleInfo, data)
            console.log(state.articleInfo)
		},
		[INIT_ARTICLE_DETAIL_INFO] (state) {
            state.articleInfo = Object.assign({}, state.articleInfo, initInfo)
		},
		initCategoryMap(state, data) {
            state.CategoryMap = Object.assign({}, state.CategoryMap, data)
		}
	},
	getters: {
	    sortedList: function(state) {
	      function compare(a, b) {
	        if (a.sort < b.sort)
	          return -1;
	        if (a.sort > b.sort)
	          return 1;
	        return 0;
	      }
	      return state.CategoryList.sort(compare);
	    }
	}
}