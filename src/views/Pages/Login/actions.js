import {doSignInWithEmailAndPassword} from "../../../components/Firebase/auth";

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';


function requestLogin(email, password) {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    email,
    password
  }
}

function receiveLogin(user) {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    authToken: user.authToken
  }
}


function loginError(message) {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
  }
}

export function loginUser(email, password) {
  
  return dispatch => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestLogin(email, password));
    let user = {};
    return doSignInWithEmailAndPassword(email, password)
      .then((response) => {
        let authToken = "";
        response.getIdToken().then(resToken => {
          authToken = resToken;
          user = _.assignIn({}, user, {authToken});
          localStorage.setItem('authToken', user.authToken);
          localStorage.setItem('id_token', user.access_token);
          // Dispatch the success action
          dispatch(receiveLogin(user))
        });
      })
      .catch(error => {
        dispatch(loginError(error.message));
      });
  }
}


function requestLogout() {
  return {
    type: LOGOUT_REQUEST,
    isFetching: true,
    isAuthenticated: true
  }
}

function receiveLogout() {
  return {
    type: LOGOUT_SUCCESS,
    isFetching: false,
    isAuthenticated: false
  }
}


// Logs the user out
export function logoutUser () {
  return dispatch => {
    dispatch(requestLogout());
    localStorage.removeItem('authToken');
    localStorage.removeItem('access_token');
    dispatch(receiveLogout());
  }
}