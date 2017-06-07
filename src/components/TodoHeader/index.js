import React,{Component} from 'react';
import {connect} from 'react-redux';
import * as Actions from '../../actions';
import {bindActionCreators} from 'redux';

class TodoHeader extends Component{
    handleKeyDown = (event) => {
        if (event.keyCode === 13) {
            let title = event.target.value;
            this.props.todoActions.add(title);
            this.props.todoActions.update();
            event.target.value = '';
        }
    };
    render() {
        return (
            <div>
                <input type="text" className="form-control" autoFocus={true} onKeyUp={this.handleKeyDown} placeholder="请输入待办事项"/>
            </div>
        )
    }
}

export default connect(
    state=>({}),
    dispatch=>({
        todoActions: bindActionCreators(Actions, dispatch)
    })
)(TodoHeader);
