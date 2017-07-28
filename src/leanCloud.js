import AV from 'leancloud-storage';

var APP_ID = 'I0qC3ES4VhYcgUHfbt8KJFBh-gzGzoHsz';
var APP_KEY = 'eBSC84SKjeDTmeeFakEeaR3g';

AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});

export default AV

export const TodoModel = {
  getByUser(user,successFn,errorFn){
    let query = new AV.Query('Todo')
    query.find().then((response) => {
      let array = response.map((t) => {
        console.log(...t.attributes.title+'--------'+user.username+'--------'+t.id)
        return{id:t.id,...t.attributes}
      })
      successFn.call(null,array)
    },(error) => {
      console.log(error)
      errorFn && errorFn.call(null,error)
    })
  },
  create({status,title,deleted},successFn,errorFn){
    let Todo = AV.Object.extend('Todo')
    let todo = new Todo()
    todo.set('title',title)
    todo.set('status',status)
    todo.set('deleted',deleted)
    // 新建一个 ACL 实例
    let acl = new AV.ACL()
    acl.setPublicReadAccess(false)
    console.log('=======')
    console.log(AV.User.current())
    acl.setWriteAccess(AV.User.current(),true)
    acl.setReadAccess(AV.User.current(),true)
    //将ACL实例赋予todo对象
    todo.setACL(acl)

    todo.save().then(function (response){
      successFn.call(null,response.id)
    },function(error){
      errorFn && errorFn.call(null,error)
    });
  },
  update(){

  },
  destroy(){

  }
}

export function signIn(username,password,successFn,errorFn){
  AV.User.logIn(username,password).then(function(loginedUser){
    let user = getUserFormAVUser(loginedUser)
    successFn.call(null,user)
  },function(error){
    errorFn.call(null,error)
  })
}

export function signUp(email,username,password,successFn,errorFn){
  //新建AVUser对象实例
  var user = new AV.User();
  /// 设置用户名
  user.setUsername(username);
  // 设置密码
  user.setPassword(password);
  //设置邮箱
  user.setEmail(email)
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
export function signOut(){
  AV.User.logOut()
  return undefined
}
export function getCurrentUser(){
  let user = AV.User.current();
  if(user){
    return getUserFormAVUser(user)
  }else{
    return null
  }
}
export function sendPasswordResetEmail(email,successFn,errorFn){
  AV.User.requestPasswordReset(email).then(function(success){
    successFn.call()
  },function(error){
    errorFn.call(null,error)
  })
}