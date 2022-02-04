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
  SignUp,
  Dashboard,
} from './containers';
import 'react-toastify/dist/ReactToastify.css';

const AuthRoute = ({ children, isLogged, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLogged ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location }
            }}
          />
        )
      }
    />
  )
}

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
            path="/dashboard"
          >
            <Dashboard />
          </AuthRoute>
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
