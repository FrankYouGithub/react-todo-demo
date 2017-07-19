import AV from 'leancloud-storage';

var APP_ID = 'I0qC3ES4VhYcgUHfbt8KJFBh-gzGzoHsz';
var APP_KEY = 'eBSC84SKjeDTmeeFakEeaR3g';

AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});

export default AV

export function signUp(username,password,successFn,errorFn){
  //新建AVUser对象实例
  var user = new AV.User();
  /// 设置用户名
  user.setUsername(username);
  // 设置密码
  user.setPassword(password);
  user.signUp().then(function (loginedUser) {
    let user = getUserFormAVUser(loginedUser)
    console.log(user)
    successFn.call(null,user)
  }, function (error) {
    console.log(error)
    errorFn.call(null,error)
  });
  return undefined
}
function getUserFormAVUser(AVUser){
  return {
    id: AVUser.id,
    ...AVUser.attributes
  }
}