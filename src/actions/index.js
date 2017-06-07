import * as Types from '../action-types'


export function add(title) {
   return {
       type: Types.ADD_TODO,
       data: title
   }
}
export function remove(id) {
    return {
        type: Types.REMOVE_TODO,
        data: id
    }
}
export function update() {
    return {
        type: Types.UPDATE_TODO
    }
}
export function toggle(id) {
    return {
        type: Types.TOGGLE_TODO,
        data: id
    }
}
export function toggleAll(check) {
    return {
        type: Types.TOGGLE_ALL,
        data: check
    }
}
export function clearCompleted() {
    return {
        type: Types.CLEAR_COMPLETED
    }
}
export function changeFilter(filter) {
    return {
        type: Types.CHANGE_FILTER,
        data: filter
    }
}
