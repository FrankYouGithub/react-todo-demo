import React, { Component } from 'react';
import './App.css';
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';
import 'normalize.css';
import './reset.css';
import UserDialog from './UserDialog';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      user: {},
      newTodo: "",
      todoList: []
    }
  }
  render() {
    let todos = this.state.todoList.filter((item)=> !item.deleted).map((item,index)=>{
      return (
        <li key={index}>
          <TodoItem todo={item} onToggle={this.toggle.bind(this)} onDelete={this.delete.bind(this)}/>
        </li>
      )
    })
    return (
      <div className="App">
        <h1>{this.state.user.username || '我'}的待办</h1>
        <div className="inputWrapper">
          <TodoInput content={this.state.newTodo} onChange={this.changeTitle.bind(this)} onSubmit={this.addTodo.bind(this)}/>
        </div>
        <ol className="todoList">
          {todos}
        </ol>
        {this.state.user.id ? null : <UserDialog onSignUp={this.onSignUp.bind(this)}/>}
      </div> 
    );
  }
  onSignUp(user){
    //消除 不要直接修改state 的警告
    let stateCopy = JSON.parse(JSON.stringify(this.state))
    stateCopy.user = user
    this.setState(stateCopy)
  }
  delete(e,todo){
    todo.deleted = true
    this.setState(this.state)
  }
  toggle(e,todo){
    todo.status = todo.status === 'completed'? '': 'completed'
    this.setState(this.state)
  }
  changeTitle(event){
    this.setState({
      newTodo: event.target.value,
      todoList: this.state.todoList
    })
  }
  addTodo(event){
    if (event.target.value === '') {
      return
    }
     this.state.todoList.push({
       id: idMaker(),
       title: event.target.value,
       status: null,
       deleted: false
      })
     this.setState({
       newTodo: '',
       todoList: this.state.todoList
      })
    }
}
let id = 0
function idMaker(){
  id += 1
  return id
}
export default App;