import { configureStore } from '@reduxjs/toolkit';
import playerReducer from './reducers/playerReducer';
import loginReducer from './reducers/loginReducer';

const store = configureStore({
  reducer: {
    player: playerReducer,
    login: loginReducer,
  },
});

export default store;
