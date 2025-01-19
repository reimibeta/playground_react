import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, Store, compose } from "redux";
import { Provider } from "react-redux";
import reduxThunk from "redux-thunk";
import App from './App';
import reportWebVitals from './reportWebVitals';
import reducers from "./redux/reducers/combine-reducer";
import { TOKEN } from './constants/authenticated.constant';
import { Auth } from './models/auth/auth';
const store: Store = createStore(
  reducers,
  {
    auths: {
      auth: {
        saveToken: localStorage.getItem(TOKEN)
      } as Auth
    }
  }, 
  compose(applyMiddleware(reduxThunk)) // still need to check
);

// console.log(token);

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
        <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
