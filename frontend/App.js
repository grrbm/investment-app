import React from 'react';
import AppContainer from './AppContainer'
import { createStore, applyMiddleware } from "redux"
import createSocketIoMiddleware from "redux-socket.io"
import { Provider } from "react-redux"
import io from "socket.io-client"
import CONNECT_URL from './config.js'
const socket = io(CONNECT_URL)
const socketIoMiddleware = createSocketIoMiddleware(socket, "server/");

function reducer(state = {}, action) {
  switch (action.type) {
    case "message":
      return { ...state, message: action.data};
    case "users_online":
      return { ...state, usersOnline: action.data}
    default:
      return state;
  }
}

const store = applyMiddleware(socketIoMiddleware)(createStore)(reducer);

store.subscribe(() => {
  console.log("new state", store.getState());
})
store.dispatch({type: "server/hello", data: "Hello!"})

export default function App() {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
}

