import React, {Component} from 'react';
import './TodoInput.css'
// export default class TodoInput extends Component {
//     render(){
//         return <input className="TodoInput" type="text" value={this.props.content} 
//         onChange={this.changeTitle.bind(this)} onKeyPress={this.submit.bind(this)}/>
//     }
//     submit(e){
//         if (e.key === "Enter") {
//             this.props.onSubmit(e)
//         }
//     }
//     changeTitle(e){
//         this.props.onChange(e)
//     }
    
// }

export default function(props){
    return <input className="TodoInput" type="text" value={props.content} 
        onChange={changeTitle.bind(this,props)} onKeyPress={submit.bind(this,props)}/>
}
function changeTitle(props,e){
    props.onChange(e)
}
function submit(props,e){
    if (e.key === 'Enter') {
        props.onSubmit(e)
    }
}