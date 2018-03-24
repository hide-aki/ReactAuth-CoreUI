import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {HashRouter, Route, Switch, Redirect} from 'react-router-dom';
// Styles
// Import Flag Icons Set
import 'flag-icon-css/css/flag-icon.min.css';
// Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css';
// Import Simple Line Icons Set
import 'simple-line-icons/css/simple-line-icons.css';
// Import Main styles for this application
import '../scss/style.scss';
// Temp fix for reactstrap
import '../scss/core/_dropdown-menu-right.scss';

// Containers
import Full from './containers/Full/';

// Views
import Login from './views/Pages/Login/';
import ForgotPassword from './views/Pages/ForgotPassword/';
import Register from './views/Pages/Register/';
import Page404 from './views/Pages/Page404/';
import Page500 from './views/Pages/Page500/';
import configureStore from './views/Pages/Login/configureStore';


const store = configureStore();

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    store.getState().auth.isAuthenticated === true
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
);
ReactDOM.render((
  <Provider store={store}>
    <HashRouter>
      <Switch>
        <Route exact path="/login" name="Login Page" component={Login}/>
        <Route exact path="/register" name="Register Page" component={Register}/>
        <Route exact path="/forgot-password" name="Forgot Password Page" component={ForgotPassword}/>
        <Route exact path="/404" name="Page 404" component={Page404}/>
        <Route exact path="/500" name="Page 500" component={Page500}/>
        <PrivateRoute path="/" name="Home" component={Full}/>
      </Switch>
    </HashRouter>
  </Provider>
), document.getElementById('root'));
