import axios from 'axios'

const devMode = false;

//所有请求路径的地址
const router = {
    login: {
        userLogin: 'loginModule/userLogin',
        captcha: 'loginModule/captchaImage'
    },
    dataAnalyzeModule: {
        healthRecordDistributionTotal: 'dataAnalyzeModule/healthRecordDistributionTotal', //健康档案列表查询
        staticticHealthTotal: 'dataAnalyzeModule/statisticHealthTotal', //健康档案地区统计
        exportHealthRecordList: 'dataAnalyzeModule/exportHealthRecordList', //导出健康档案列表

        signStatisticsTotal: 'dataAnalyzeModule/signStatisticsTotal', //体格地区统计
        hospitalSignTotal: 'dataAnalyzeModule/hospitalSignTotal', //医院体格统计数据
        selectAllSignTotal: 'dataAnalyzeModule/selectAllSignTotal', //全国体格统计数据

        hospitalDistributionTotal: 'dataAnalyzeModule/hospitalDistributionTotal', //医院分布地区统计
        queryHospitalLocationList: 'dataAnalyzeModule/queryHospitalLocationList', //根据医院名称查询坐标列表
        queryHealthRecordDetail:'dataAnalyzeModule/queryHealthRecordDetail' //健康档案详情
    },
    hospitalModule: {
      queryHospitalList: 'hospitalModule/queryHospitalList',
      addHospital: 'hospitalModule/addHospital',
      selectHospitalIsExist:'hospitalModule/selectHospitalIsExist',//新添加的医院是否存在
      queryHospitalDetail: 'hospitalModule/queryHospitalDetail',
      updateHospitalInfo: 'hospitalModule/updateHospitalInfo',
      authAccount:'hospitalModule/authAccount',
      logoutHospital:'hospitalModule/logoutHospital',
      exportHospitalList:'hospitalModule/exportHospitalList',
      deleteFile:'hospitalModule/deleteFile',
      queryAccountIsExist:'hospitalModule/queryAccountIsExist'//授权的账号是否存在
    },
    signModule: {
      querySignList: 'signModule/querySignList',
      querySignDetail: 'signModule/querySignDetail'
    },
    accountModule: {
      queryAccountList: 'accountModule/queryAccountList',
      addCloudAccount: 'accountModule/addCloudAccount',
      stopOrStartAccount: 'accountModule/stopOrStartAccount',
      queryAccountDetail: 'accountModule/queryAccountDetail',
      updateAccountInfo: 'accountModule/updateAccountInfo',
      queryAccuntIsExist: 'accountModule/queryAccuntIsExist'
    },
    //健康模块
    healthNousModule: {
      getCategory: 'healthNousModule/getCategory',
      delCategory: 'healthNousModule/delCategory',
      addOrEditCategory: 'healthNousModule/addOrEditCategory',
      articleList: 'healthNousModule/articleList',
      articleAddOrEdit: 'healthNousModule/articleAddOrEdit',
      articleFindById: 'healthNousModule/articleFindById',
      articleDelById: 'healthNousModule/articleDelById'
    },
    //信息模块
    messageModule: {
      messageList:'messageModule/messageList',//
      messageSend:'messageModule/messageSend',
      messageBackList:'messageModule/messageBackList',
      getMessageDetail:'messageModule/getMessageDetail',
      messageDel:'messageModule/messageDel',
      replyMsgBack:'messageModule/replyMsgBack'
    },
    physiqueModule: {
      physiqueList:'physiqueModule/physiqueList',
      getPhysiqueDetail:'physiqueModule/getPhysiqueDetail',
      selectPhysique: 'physiqueModule/selectPhysique'
    }

}
let webroot = '';

function interceptorsMethod(store, context) {
    //全局Ajax监控
    axios.interceptors.response.use((response) => {
      if(response.data.code !== 200) {
          //store.dispatch('displayErrorLoad');
          //store.commit('updateLoadText', response.data.msg)
          //return;
      }
      if(response.data.code === '505' || response.data.code === 505) {

         context.$notify({ group: 'auth', title: '请重新登录',  type: 'error', text: '登录权限过期' })

         setTimeout(()=> {
            location.href = "/login"
         }, 1000)
         //context.$notify({ group: 'auth', title: '请重新登录',  type: 'error', text: '登录权限过期' })
      }
      if(devMode) {
          return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(response)
                }, 0)
          })
      }
      return response
    }, (error) => {
        //store.dispatch('displayErrorLoad');
        console.log(error.response);
        Promise.resolve(error.response)
    })

    axios.interceptors.request.use((request) => {
      //console.log('---0---');
      //store.commit('UPDATE_LOADING_STATUS', {isLoading: true})      
      return request
    }, (error) => {
        //store.dispatch('displayErrorLoad');
        console.log(error);
        Promise.reject(error)
    })
}

function requestMethod (method, uri, data = null) {
    if (!method) {
      console.error('API function call requires method argument')
      return
    }

    if (!uri) {
      console.error('API function call requires uri argument')
      return
    }
    if(devMode) { //判断开发模式
      method = 'get'
      let url = uri

      return new Promise((resolve, reject) => {
            setTimeout(() => {
              axios({
                  method,
                  url,
                  data,
                  timeout: 5000
              }).then((res) => {
                  resolve(res)
              })
            }, 500)
      })
    }
    var url = uri
    return axios({ method, url, data })
}

export default  {
     serverURI: '',
     getURL: (url) => {
         url = url.replace(/^\//, "");
         const [path, subPath] = url.match(/\w+/g);
         if(devMode) {
            webroot = "/test/";
            let devPath = url.replace(/\//g, "");
            return webroot + devPath + ".json";
         }
         return '/api/' + router[path][subPath]
     },
     interceptorsMethod: interceptorsMethod,
     request: requestMethod

 };