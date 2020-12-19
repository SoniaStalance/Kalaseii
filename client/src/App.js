import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Alert from './components/layout/Alert';
//Provider combines redux with react
import { Provider } from 'react-redux';
import store from './store';
import './App.css';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

//everytime the app loads
if(localStorage.token)
        setAuthToken(localStorage.token)

const App = () => {
  // similar to componentDidMount it will only update when [properties] update
  useEffect(()=>{
    store.dispatch(loadUser());
  },[])

  return(
    <Provider store={ store }>
      <Router>
      <Fragment>
        <Navbar />
        <Route exact path='/' component={ Landing } />
        <section className="container">
          <Alert/>
          <Switch>
            <Route exact path = '/register' component = { Register } />
            <Route exact path = '/login' component = { Login } />
          </Switch>
        </section>
      </Fragment>
    </Router>
    </Provider>
  );
}
export default App;
