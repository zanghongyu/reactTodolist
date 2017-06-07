import React from 'react';
import TodoHeader from './components/TodoHeader'
import TodoItem from './components/TodoItem/'
import TodoFooter from './components/TodoFooter'
import * as filterTypes from './components/filter-types'
import {connect} from 'react-redux';
import * as Actions from './actions';
import {bindActionCreators} from 'redux';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterType: filterTypes.ALL,
            editableTodo: null,
            oldTitle: '',
            listeners: []
        }
    }
    changeFilterType = (type) => {
        this.setState({
            filterType: type
        })
    };
    changeEditableTodo = (editableTodo) => {
        this.setState({
            oldTitle: editableTodo.title
        });
        this.setState({
            editableTodo
        })
    };
    clearEdit = () => {
        this.setState({
            editableTodo: null
        })
    };
    changeTitle = (e) => {
        this.state.editableTodo.title = e.target.value;
        this.props.todoActions.update();
    };
    editFinished = (e) => {
        if (e.keyCode === 13) {
            this.setState({
                editableTodo: null
            });
        } else if (e.keyCode === 27) {
            // 两种方式有区别，如果重新设置state则会重新把editableTodo传给自组建，子组件的value值会改变，如果直接通过指针改变todo的title，子组件的value值不会改变，所以此处必须重设editableTodo
            // this.state.editableTodo.title = this.state.oldTitle;
            let editableTodo = this.state.editableTodo;
            editableTodo.title = this.state.oldTitle;
            this.setState({
                editableTodo
            });
        }

    };
    toggleAll = (e) => {
        this.props.todoActions.toggleAll(e.target.checked);
        this.props.todoActions.update();
        this.dispatch();
    };
    subscribe = (listener) => {
        let listeners = this.state.listeners;
        listeners.push(listener);
        this.setState({
            listeners
        });
        return () => {
            let listeners = this.state.listeners.filter(l=> l !== listener);
            this.setState({
                listeners
            });
        }
    };
    dispatch = () => {
        this.state.listeners.forEach(l=>l());
    };
    render() {
        let todos = this.props.todos;
        let activeTodoCount = todos.reduce((count, todo)=>count + !todo.completed, 0);
        let completedTodoCount = todos.length - activeTodoCount;
        let showTodos = todos.filter(todo=>{
            switch (this.state.filterType) {
                case filterTypes.ACTIVE:
                    return !todo.completed;
                case filterTypes.COMPLETED:
                    return todo.completed;
                default:
                    return true;
            }
        });
        let main = (
            <ul className="list-group">
                {
                    todos.length ? (
                        <li className="list-group-item">
                          <input type="checkbox" checked={activeTodoCount==0} onChange={this.toggleAll}/>{activeTodoCount===0?'全部取消': '全部选中'}
                        </li>
                    ) : null
                }
                {
                    showTodos.map((todo, index) => (
                        <TodoItem
                            todo={todo}
                            key={index}
                            subscribe={this.subscribe}
                            toggle={this.toggle}
                            editableTodo={this.state.editableTodo}
                            changeEditableTodo = {this.changeEditableTodo}
                            clearEdit={this.clearEdit}
                            editFinished={this.editFinished}
                            changeTitle={this.changeTitle}
                        />
                    ))
                }
            </ul>
        );
        return (
            <div className="container" style={{marginTop: 20}}>
              <div className="row">
                <div className="col-md-6 col-md-offset-3">
                  <div className="panel panel-primary">
                    <div className="panel-heading">
                      <TodoHeader/>
                    </div>
                    <div className="panel-body">
                        {main}
                    </div>
                    <div className="panel-footer">
                      <TodoFooter
                          activeTodoCount={activeTodoCount}
                          changeFilterType={this.changeFilterType}
                          filterType={this.state.filterType}
                          completedTodoCount = {completedTodoCount}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
        )
    }
}

export default connect(
    state=>({
        todos: state
    }),
    dispatch=>({
        todoActions: bindActionCreators(Actions, dispatch)
    })
)(App);


