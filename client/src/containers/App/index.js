import React from 'react'
import { Route, Link } from 'react-router-dom'
import Home from '../Home'
import Login from '../Login'
import Register from '../Register'
import { getUser } from '../../modules/auth/auth.module'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

const App = ({ user }) => (
  <div>
    <header>
      <Link to='/'>Home</Link>
      <Link to='/login'>Login</Link>
      <Link to='/register'>Register</Link>
      <div style={{ float: 'right' }}><b>{user ? user.name : 'Not logged in'}</b></div>
    </header>

    <main>
      <Route exact path='/' component={Home} />
      <Route exact path='/login' component={Login} />
      <Route exact path='/register' component={Register} />
    </main>
  </div>
)

const mapStateToProps = state => {
  return {
    user: getUser(state)
  }
}

export default withRouter(connect(mapStateToProps)(App))
