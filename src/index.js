import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css'
import {configureStore} from './store'
import {Provider} from 'react-redux';
import {getStorage} from './local'

let store = configureStore(getStorage('todos'));
ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);
/*function render() {

}
store.subscribe(render);
render();*/
