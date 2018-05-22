//const Foo from './components/views/Foo';
import NotFoundView from './components/NotFoundView';
const SubApp = () => import('./components/SubApp');
const ManageApp = () => import('./components/ManageApp');
//import ManageApp from './components/ManageApp';
const Dash = () => import('./components/Dash');
const HealthRecords = () => import('./components/views/HealthRecords');
const HosDistribute = () => import('./components/views/hosDistribute');
const PhysicalData = () => import('./components/views/PhysicalData');
const RecordDetail = () => import('./components/views/HealthRecord/recordDetail');


const HospitalManage = ()=> import('./components/manageViews/hospitalManage')//医院管理
const HospitalListView = ()=> import('./components/manageViews/hospitalManage/listView')//医院列表
const AddHospital = ()=> import('./components/manageViews/hospitalManage/addHospital')
const HospitalDetail = ()=> import('./components/manageViews/hospitalManage/hospitalDetail')


const SignManage = ()=> import('./components/manageViews/signManage')//签约管理
const SignTableList = ()=> import('./components/manageViews/signManage/signTable')//签约列表
const SignDetail = ()=> import('./components/manageViews/signManage/signDetail')//签约详情

const PhysiqueManage = ()=> import('./components/manageViews/physiqueManage')//体格管理
const AddAdvise = ()=> import('./components/manageViews/physiqueManage/addAdvise')
const PhysiqueData = ()=> import('./components/manageViews/physiqueManage/physiqueData')
const PhysiqueAdvise = ()=> import('./components/manageViews/physiqueManage/physiqueAdvise')
const PhysiqueDetail = ()=> import('./components/manageViews/physiqueManage/physiqueDetail')


const ServiceManage = ()=> import('./components/manageViews/serviceManage')//服务管理
const DeviceManage = ()=> import('./components/manageViews/deviceManage')//设备管理

const HealthyManage = ()=> import('./components/manageViews/healthyManage')//健康管理
const AddArticle = ()=> import('./components/manageViews/healthyManage/addArticle')
const ArticleCategory = ()=> import('./components/manageViews/healthyManage/articleCategory')
const ArticleList = ()=> import('./components/manageViews/healthyManage/articleList')

const AccountManage = ()=> import('./components/manageViews/accountManage')//账号管理
const AccountList = ()=> import('./components/manageViews/accountManage/accountList')
const AddAccount = ()=> import('./components/manageViews/accountManage/addAccount')
const AccountPowset = ()=> import('./components/manageViews/accountManage/accountPowset')

const SystemManage = ()=> import('./components/manageViews/systemManage')//系统管理
const InfoManage = ()=> import('./components/manageViews/infoManage')//信息管理
const InfoPush = ()=> import('./components/manageViews/infoManage/infoPush')
const OpinionFeedback = ()=> import('./components/manageViews/infoManage/opinionFeedback')
const ServiceEvaluate = ()=> import('./components/manageViews/infoManage/serviceEvaluate')
const SystemInfo = ()=> import('./components/manageViews/infoManage/systemInfo')
const OpinionDetail = ()=> import('./components/manageViews/infoManage/opinionDetail')//反馈详情
const EvaluateDetail = ()=> import('./components/manageViews/infoManage/evaluateDetail')//评价详情

const Login = ()=> import('./components/Login.vue');
const HomePage = ()=> import('./components/HomePage.vue');
const routers = [
	{
		path: '/view/',
		component: SubApp,
		meta: {description: '图表平台', requiresAuth: true},
		children: [{
	        path:'healthRecords',
            name: 'healthRecords',
	        component:HealthRecords,
	        meta: {description: '健康档案', requiresAuth: true}
	    },
        {
            path:'recordDetail/:case_id/:region_id/:user_id',
            name: 'recordDetail',
            component:RecordDetail,
            meta: {description: '档案详情', requiresAuth: true}
        },
        {
	        path:'hosDistribute',
            name: 'hosDistribute',
	        component:HosDistribute,
	        meta: {description: '医院分布', requiresAuth: true}
	    },{
	        path:'physicalData',
            name: 'physicalData',
	        component:PhysicalData,
	        meta: {description: '体格数据', requiresAuth: true}
	    }]
	}, {
		path: '/manage',
		component: ManageApp,
        redirect: { name: 'hospitalManage' },
		children:[
    		{ 
                name: 'hospitalManage',
    			path:'hospitalManage',
    			component:HospitalManage,
                meta: {description: '医院管理', requiresAuth: true},
                redirect: { name: 'list' },
                children: [
                    {   
                        name: 'list',
                        path: 'list',
                        meta: {description: 'dd', requiresAuth: true},
                        component: HospitalListView
                    },{
                        name: 'addhospital',
                        path: 'add/:id',
                        component: AddHospital,
                        meta: {description: 'cc', requiresAuth: true},
                    },{
                        name:'edithospital',
                        path: 'edit/:id',
                        component: AddHospital,
                        meta: {description: 'eee', requiresAuth: true},
                    },{
                        name:'detailhospital',
                        path:'detail/:id',
                        component: HospitalDetail,
                        meta: {description: 'yy', requiresAuth: true}
                    }
                ]
    		},
            {
    			path:'signManage',//签约管理
    			component:SignManage,
                meta: {description: '签约管理', requiresAuth: true},
                redirect: { name: 'signList' },
                children: [
                    {   
                        name: 'signList',
                        path: 'list',
                        component: SignTableList
                    },{
                        name:'signdetail',
                        path:'detail/:id',
                        component: SignDetail
                    }
                ]
    		},{
    			path:'physiqueManage',//体格数据
    			component:PhysiqueManage,
                meta: {description: '体格数据', requiresAuth: true},
                redirect: { name: 'physiqueData' },
                children: [
                    {
                        name: 'physiqueData',
                        path: 'data',
                        component: PhysiqueData
                    },{
                        name:'physiqueAdvise',
                        path: 'advise',
                        component: PhysiqueAdvise
                    },{
                        name:'addAdvise',
                        path: 'add/:id',
                        component: AddAdvise
                    },
                    {
                        name:'editAdvise',
                        path: 'edit/:id',
                        component: AddAdvise
                    },
                    {
                        name:'physiqueDetail',
                        path: 'phyDetail/:detailid',
                        component: PhysiqueDetail
                    }
                ]
    		},
            {
                name:'serviceManage',
    			path:'serviceManage',//服务管理
    			component:ServiceManage,
                meta: {description: '服务管理', requiresAuth: true}
    		},{
                name:'deviceManage',
    			path:'deviceManage',//设备管理
    			component:DeviceManage,
                meta: {description: '设备管理', requiresAuth: true}
    		},{
                name:'healthyManage',
                path:'healthyManage',//健康常识
                component:HealthyManage,
                redirect: { name: 'artlist' },
                children: [
                    {
                        name: 'artlist',
                        path: 'artlist',
                        component: ArticleList
                    },{
                        name:'addart',
                        path: 'addart',
                        component: AddArticle
                    },{
                        name:'artcate',
                        path: 'artcate',
                        component: ArticleCategory
                    },
                    {   
                        name: 'editcate',
                        path: 'edit/:id',
                        component: AddArticle
                    }
                ]
            },{
                name:'accountManage',
                path:'accountManage',//账号管理
                component:AccountManage,
                meta: {description: '账号管理', requiresAuth: true},
                redirect: { name: 'accountList' },
                children: [
                    {
                        path: 'list',
                        name: 'accountList',
                        component: AccountList
                    },
                    {
                        name:'addAccount',
                        path: 'add/:id',
                        component: AddAccount
                    },{
                        name:'editAccount',
                        path: 'edit/:id',
                        component: AddAccount
                    },{
                        name:'accountPowset',
                        path:'powset/:id',
                        component: AccountPowset
                    }
                ]       
            },{
                name:'infoManage',
                path:'infoManage',//信息管理
                component:InfoManage,
                meta: {description: '信息管理', requiresAuth: true},
                redirect: { name: 'system' },
                children: [
                    {
                        name:'system',
                        path:'system',
                        component:SystemInfo
                    },
                    {
                        name:'push',
                        path:'push',
                        component:InfoPush
                    },
                    {
                        name:'opinion',
                        path:'opinion',
                        component:OpinionFeedback
                    },
                    {
                        name:'service',
                        path:'service',
                        component:ServiceEvaluate
                    },{
                        name:'opinionDetail',
                        path: 'opinionDetail/:id',
                        component: OpinionDetail
                    },{
                        name:'evaluateDetail',
                        path: 'evaluateDetail/:id',
                        component: EvaluateDetail
                    }
                ]

            },{
                name:'systemManage',
    			path:'systemManage',//系统管理
    			component:SystemManage,
                meta: {description: '系统管理', requiresAuth: true}
    		},
    	]
	},{
        name:'login',
		path: '/login',
		component: Login
	},{
        path: '/',
        name: 'HomePage',
        component: HomePage,
        meta: {description: '首页', requiresAuth: true}
    }
]


export default routers;