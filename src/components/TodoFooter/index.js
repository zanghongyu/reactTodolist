import React,{Component} from 'react';
import {connect} from 'react-redux';
import * as Actions from '../../actions';
import {bindActionCreators} from 'redux';
import * as filterTypes from '../filter-types';

class TodoFooter extends Component{
    render() {
        let {activeTodoCount, filterType, changeFilterType, completedTodoCount} = this.props;
        let btns = [
            {type: filterTypes.ALL, text: "完成"},
            {type: filterTypes.ACTIVE, text: "未完成"},
            {type: filterTypes.COMPLETED, text: "已完成"}
        ];
        return (
            <div className="row text-center">
                {
                    activeTodoCount ? (
                        <div className="col-xs-4 ">
                            <button className="btn btn-primary" disabled={true}>待办事项数量<a href="#" className="badge">{activeTodoCount}</a></button>
                        </div>
                    ) : null
                }
                <div className="col-xs-5">
                    {
                        btns.map((btn, index)=>(
                            <button key={index} className={`btn ${filterType!==btn.type?'btn-default':'btn-success'} btn-sm`} style={{marginLeft: 10}} onClick={()=>changeFilterType(btn.type)}>{btn.text}</button>
                        ))
                    }
                </div>
                {
                    completedTodoCount ? ( <div className="col-xs-3">
                        <button className="btn btn-danger btn-sm" onClick={()=>this.props.todoActions.clearCompleted()}>删除已完成</button>
                    </div>) : null
                }
            </div>
        )
    }
}

export default connect(
    state=>({}),
    dispatch=>({
        todoActions: bindActionCreators(Actions, dispatch)
    })
)(TodoFooter);