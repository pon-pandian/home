import { LOGIN, LOGOUT } from '../actionType/actionType';

const appState = {
        login:false,  
        token: "" 
 }

export const rootReducer = (state = appState, action) => {
    switch (action.type) {

      case LOGIN: 
        return {
          ...state,
          login: true,
          token: action.payload
        }

      case LOGOUT: 
        return {
          ...state,
          login: false,
          token: ""
        }

      default:
        return state;
    }
  };
