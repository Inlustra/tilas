import React from 'react'
import { Route, Link } from 'react-router-dom'
import { getUser, isLoggedIn } from '../../modules/auth/auth.module'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Loadable from 'react-loadable'
import LoadingComponent from '../../components/Loading'
import PrivateRoute from '../../common/components/PrivateRoute'
import Dashboard from '../Dashboard'

const Home = Loadable({
  loader: () => import('../Home'),
  loading: LoadingComponent,
})

const Login = Loadable({
  loader: () => import('../Login'),
  loading: LoadingComponent,
})

const Register = Loadable({
  loader: () => import('../Register'),
  loading: LoadingComponent,
})

const App = ({ user, isLoggedIn }) => (
  <div>
    <header>
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
      <Link to="/dashboard">Dashboard</Link>
      <div style={{ float: 'right' }}>
        <b>{user ? user.name : 'Not logged in'}</b>
      </div>
    </header>

    <main>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <PrivateRoute exact path="/dashboard" authed={isLoggedIn} redirectTo="/login" component={Dashboard} />
    </main>
  </div>
)

const mapStateToProps = state => {
  return {
    user: getUser(state),
    isLoggedIn: isLoggedIn(state)
  }
}

export default withRouter(connect(mapStateToProps)(App))
