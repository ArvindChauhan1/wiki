import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from './store'
import { Provider } from 'react-redux'

import './index.css'

store.subscribe(() => {
  let item = store.getState()
  item = JSON.stringify(item.favoriteUnfavorite)
  localStorage.setItem('redux', item)
  console.log(store.getState())
})

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store} >
      <App />
      <h1 className="text-3xl font-bold text-blue-500 underline">
        Hello world!
      </h1>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


