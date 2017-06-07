import * as Types from '../action-types'
import {setStorage, getStorage} from '../local';

let initState = [];
export default function reducer(state=initState, action) {
    // state = getStorage('todos');
    switch (action.type) {
        case Types.ADD_TODO:
            let todo = {};
            todo = Object.assign({}, {id: Math.random(), completed: false, title: action.data});
            return [...state, todo];
        case Types.REMOVE_TODO:
            return state.filter(todo=>todo.id!==action.data);
        case Types.TOGGLE_TODO:
            return state.map(todo=>{
                if (todo.id === action.data) {
                    todo.completed = !todo.completed;
                }
                return todo;
            });
        case Types.CLEAR_COMPLETED:
            return state.filter(todo=>!todo.completed);
        case Types.TOGGLE_ALL:
            return state.map(todo=>{
                todo.completed = action.data;
                return todo;
            });
        case Types.UPDATE_TODO:
            setStorage('todos', state);
            return state;
        default:
            return state;
    }
}
