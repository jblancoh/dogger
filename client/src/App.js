import React from 'react';
import { connect } from 'react-redux'
import { ToastContainer } from 'react-toastify';
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route
} from 'react-router-dom'
import { Navbar } from './components'
import {
  Home,
  LogIn,
  SignUp
} from './containers';
import 'react-toastify/dist/ReactToastify.css';

const AuthRoute = ({ isLogged }) => (
  <Route path="/dashboard">
    {
      isLogged
        ? (<>
          <h6>Dashboard</h6>
        </>
        )
        : (
          <Redirect
            to={{
              pathname: '/'
            }}
          />
        )
    }
  </Route>
)

function App(props) {
  const { isLogged } = props
  return (
    <Router>
      <div className='principal-container'>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/log-in">
            <LogIn />
          </Route>
          <Route path="/sign-up">
            <SignUp />
          </Route>
          <AuthRoute
            isLogged={isLogged}
          />
        </Switch>
      </div>
      <ToastContainer />
    </Router>
  );
}

const mapStateToProps = ({ account }) => ({
  isLogged: account.isLogged
})

export default connect(mapStateToProps)(App);
