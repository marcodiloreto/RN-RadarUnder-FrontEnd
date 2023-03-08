import {AuthState} from '../context/AuthContext';
import {User} from '../interfaces/AuthInterfaces';

type AuthAction =
  | {type: 'signUp'; payload: {token: string; user: User}}
  | {type: 'signOut'}
  | {type: 'authentication-fail'}
  | {type: 'addError'; payload: string}
  | {type: 'removeError'}
  | {type: 'profilePicChange'; payload: {user: User; picUrl: string}};

export function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'signUp':
      const {user, token} = action.payload;
      return {
        ...state,
        errorMessage: '',
        user,
        token,
        status: 'authenticated',
      };

    case 'removeError':
      return {
        ...state,
        errorMessage: '',
      };

    case 'addError':
    case 'signOut':
    case 'authentication-fail':
      return {
        ...state,
        status: 'not-authenticated',
        user: null,
        token: null,
        errorMessage: action.type === 'addError' ? action.payload : '',
      };
    case 'profilePicChange':
      const {user: us, picUrl} = action.payload;
      return {
        ...state,
        user: {...us, profilePicUrl: picUrl},
      };
    default:
      return state;
  }
}
