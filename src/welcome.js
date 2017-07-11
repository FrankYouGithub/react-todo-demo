import React from 'react';

class Welcome extends React.Component { 
  constructor(props){
    super(props)

      this.state = {
        date: new Date()
      }
      // setTimeout(()=>{
      //   this.setState({
      //     date: new Date()
      //   })
      // },1000)
      console.log('constructor...........我已经在 constructor 里将 props 和 state 初始化好了')
  }
  componentWillMount(){
    this.setState({
          date: new Date()
    })
    console.log('componentWillMount.........运行到这里的话，说明马上就要运行 render 了')
  }
  
  render() {
    console.log('render........嗯，这里是 render')
    return (
      <div>
        <h1>hello, {this.props.name}</h1>
        <h2>{this.state.date.toString()}</h2>
      </div>
    )
    
  }
  componentWillReceiveProps(nextProps){
    this.setState({
          date: new Date()
    })
    console.log('componentWillReceiveProps=============我要读取 props 啦！')
  }
  shouldComponentUpdate(nextProps,nextState){
    this.setState({
          date: new Date()
    })
    console.log('shouldComponentUpdate=================请问要不要更新组件？true / false')
    return true
  }
  componentWillUpdate(){
    
    console.log('componentWillUpdate====================我要更新组件啦！')
  }
  componentDidUpdate(){
    this.setState({
          date: new Date()
    })
    console.log('componentDidUpdate=====================更新完毕啦！')
  }



  componentDidMount(){
    
    console.log('componentDidMount...............已经挂载到页面里了')
  }
}

  
  
  
//props 还有另一个写法，那就是把 class Welcome 变成 function Welcome（函数形式的组件）
// function Welcome(props) {
//   return <h1>Hello, {props.name}</h1>;
// }
export default Welcome;