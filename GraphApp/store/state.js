const Store = function (namespace, data) {
    if (arguments.length > 1) {
      return localStorage.setItem(namespace, JSON.stringify(data));
    } else {
      var store = localStorage.getItem(namespace);
      return store || null;
    }
}

export default {
  callingAPI: false,
  loading: false,
  left_loading: false,
  searching: '',
  isSuccess: false,
  serverURI: 'http://10.110.1.136:8080',
  token: Store('token'),
  userInfo:JSON.parse(Store('user'))
  // userInfo:Store('user')
  //userInfo: {
  //  "accountId":77777,                 
  //  "phone": 13020003856,                       
  //  "name": "gyfnice",                        
  //  "status": 2,                      
  //  "times": 1512463606394
  //}
}
