//加载相关
export const UPDATE_LOADING_STATUS = 'UPDATE_LOADING_STATUS' //更新加载状态
export const UPDATE_SUCCESS_STATUS = 'UPDATE_SUCCESS_STATUS' //更新加载状态

export const UPDATE_LEFT_LOADING_STATUS = 'UPDATE_LEFT_LOADING_STATUS' //更新左侧面板加载状态

//登陆相关
export const SET_USER = 'SET_USER'; //设置用户信息
export const SET_TOKEN = 'SET_TOKEN'; //设置Token

//健康档案相关
export const SET_HEALTH_RECORD_LIST = 'SET_HEALTH_RECORD_LIST' //获得健康档案列表
export const SET_HEALTH_RECORD_AREA_DATA = 'SET_HEALTH_RECORD_AREA_DATA' //获得健康档案地区统计数据
export const SET_HEALTH_RECORD_DETAIL = 'SET_HEALTH_RECORD_DETAIL' //健康档案详情

//体格数据相关
export const SET_HOSPITAL_PHYSICAL_DATA = 'SET_HOSPITAL_PHYSICAL_DATA' //获得各省份医院体格数据
export const SET_WORLD_PHYSICAL_DATA = 'SET_WORLD_PHYSICAL_DATA' //获得全国各时间体格数据
export const SET_PHYSICAL_AREA_DATA = 'SET_PHYSICAL_AREA_DATA' //获得体格数据地区数据


//医院分布相关
export const UPDATE_POSITION_LIST = 'UPDATE_POSITION_LIST' //更新医院坐标列表
export const INIT_MAP_INSTANCE = 'INIT_MAP_INSTANCE' //初始化百度地图实例
export const SET_MAP_VIEWPORT = 'SET_MAP_VIEWPORT' //通过坐标设置地图的可视化区域
export const SET_HOSPITAL_AREA_DATA = 'SET_HOSPITAL_AREA_DATA' //通过坐标设置地图的可视化区域
export const DETAIL_PANE_TOGGLE = 'DETAIL_PANE_TOGGLE' //医院详情面板切换标志


//医院管理相关
export const SET_HOT_DATA = 'SET_HOT_LIST'; //设置医院列表
//export const SET_HOT_INDEX = 'SET_CURRENT_INDEX'; //设置页面开始的索引值
//export const SET_HOT_END_INDEX = 'SET_HOT_END_INDEX'; //设置页面结束的索引值
export const DETAIL_HOT_DATA = 'DETAIL_HOT_DATA'; //设置医院详情
export const UPDATE_HOT_LIST_LOGOOUT_STATUS = 'UPDATE_HOT_LIST_LOGOOUT_STATUS'; //改变医院列表的注销状态
export const UPDATE_HOT_AUTHORIZE_STATUS = 'UPDATE_HOT_AUTHORIZE_STATUS'; //医院授权
export const EDIT_HOT_DATA = 'EDIT_HOT_DATA'; //医院编辑
export const INIT_ADD_HOT = 'INIT_ADD_HOT'; //初始化添加医院
export const ISEXIST_HOT_DATA = 'ISEXIST_HOT_DATA'; //医院是否存在
export const ADD_HOT_DATA = 'ADD_HOT_DATA'; //添加医院


//签约管理
export const SET_SIGN_DATA = 'SET_SIGN_DATA'; //签约列表
export const SET_SIGN_DETAIL = 'SET_SIGN_DETAIL'; //签约详情


//账户管理
export const SET_ACCOUNT_DATA = 'SET_ACCOUNT_DATA'; //设置账号列表
export const INIT_ADD_ACCOUNT = 'INIT_ADD_ACCOUNT'; //初始化添加账号
export const ADD_ACCOUNT_DATA = 'ADD_ACCOUNT_DATA'; //添加账号
export const LOGOUT_ACTIVE_ACCOUNT = 'LOGOUT_ACTIVE_ACCOUNT'; //注销 激活 账号
export const DETAIL_ACCOUNT_DATA = 'DETAIL_ACCOUNT_DATA'; //账号详情
export const UPDATE_ACCOUNT_DATA = 'UPDATE_ACCOUNT_DATA'; //账号更新
export const ISEXIST_ACCOUNT_DATA = 'ISEXIST_ACCOUNT_DATA'; //账号是否存在

//健康常识
export const ARTICLE_LIST_DATA = 'ARTICLE_LIST_DATA'; //设置健康常识列表
export const ARTICLE_ADD_EDIT = 'ARTICLE_ADD_EDIT'; //文章添加或编辑
export const ARTICLE_CATE_ADD_EDIT = 'ARTICLE_CATE_ADD_EDIT'; //添加或编辑 文章分类
export const ARTICLE_CATEGORY_LIST = 'ARTICLE_CATEGORY_LIST'; //获取文章分类列表
export const ARTICLE_DETAIL_INFO = 'ARTICLE_DETAIL_INFO'; //获取文章详情
export const INIT_ARTICLE_DETAIL_INFO = 'INIT_ARTICLE_DETAIL_INFO'; //初始化文章详情

//信息管理
export const SET_MESSAGE_DATA = 'SET_MESSAGE_DATA'; //设置信息管理列表
export const MESSAGE_BACK_LIST = 'MESSAGE_BACK_LIST'; //意见反馈列表
export const MESSAGE_DETAIL_DATA = 'MESSAGE_DETAIL_DATA'; //意见反馈详情
export const MESSAGE_DELETE_DATA = 'MESSAGE_DELETE_DATA'; //意见反馈删除

//体格数据管理
export const PHYSIQUE_LIST_DATA = 'PHYSIQUE_LIST_DATA'; //体格列表
export const PHYSIQUE_DETAIL_DATA = 'PHYSIQUE_DETAIL_DATA'; //体格详情


//export const SET_ACCOUNT_INDEX = 'SET_CURRENT_INDEX'; //设置账号开始的索引值
//export const SET_ACCOUNT_END_INDEX = 'SET_ACCOUNT_END_INDEX'; //设置账号结束的索引值
