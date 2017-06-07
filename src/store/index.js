import {createStore} from 'redux';
import reducer from '../reducers';

export function configureStore(initState) {
    return createStore(reducer, initState, window.devToolsExtension ? window.devToolsExtension() : null);
}

