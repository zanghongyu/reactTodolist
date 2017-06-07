import React,{Component} from 'react';
import {connect} from 'react-redux';
import * as Actions from '../../actions';
import {bindActionCreators} from 'redux';

class TodoIem extends Component{
    render() {
        let {todo, editableTodo, changeEditableTodo ,clearEdit, changeTitle, editFinished} = this.props;
        return (
            <li className="list-group-item" onDoubleClick={()=>changeEditableTodo(todo)}>
                {
                    todo === editableTodo ? (
                        <input type="text" value={todo.title} autoFocus={true} onBlur={()=>clearEdit()} onKeyUp={this.editFinished} onChange={this.changeTitle}/>
                    ) : (
                        <div className="row">
                            <div className="col-md-1">
                                <input type="checkbox" checked={todo.completed} onChange={this.toggle}/>
                            </div>
                            <div className="col-md-10" style={{
                                textDecoration: todo.completed ? 'line-through' : '',
                                color: todo.completed ? "#c8c8c8" : '#000'
                            }}>
                                {todo.title}
                            </div>
                            <div className="col-md-1">
                                <button className="btn btn-danger btn-xs" onClick={this.remove}>&times;</button>
                            </div>
                        </div>
                    )
                }
            </li>
        )
    }
    componentDidMount(){
        this.unsubscribe = this.props.subscribe(this.changeView);
    }
    componentWillUnmount() {
        this.unsubscribe();
    }
    toggle = () => {
        this.props.todoActions.toggle(this.props.todo.id);
        this.props.todoActions.update();
        this.changeView();
    };
    remove = () => {
        this.props.todoActions.remove(this.props.todo.id);
        this.props.todoActions.update();
    };
    changeView = () => {
        this.setState({})
    };
    changeTitle = (e) => {
        this.props.changeTitle(e);
        this.setState({})
    };
    editFinished = (e) => {
        this.props.editFinished(e);
        this.setState({});
    }
}

export default connect(
    state=>({}),
    dispatch=>({
        todoActions: bindActionCreators(Actions, dispatch)
    })
)(TodoIem);