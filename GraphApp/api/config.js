/**
  * config
  * @global variable
  */
const devMode = false;

//所有请求路径的地址
const router = {
    login: {
        userLogin: 'loginModule/userLogin',
        captcha: 'loginModule/captchaImage'
    },
    hospitalModule: {
      queryHospitalList: 'hospitalModule/queryHospitalList',
      addHospital: 'hospitalModule/addHospital'
    },
    accountModule: {
      queryAccountList: 'accountModule/queryAccountList'
    }
}
let webroot = '';
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
     }

 };