import React from 'react'
import { Route, Link } from 'react-router-dom'
import Home from '../Home'
import Login from '../Login'

const App = () => (
  <div>
    <header>
      <Link to='/'>Home</Link>
      <Link to='/login'>Login</Link>
      <div style={{float: "right"}}>Logged in as <b>Not implemented yet!</b></div>
    </header>

    <main>
      <Route exact path='/' component={Home} />
      <Route exact path='/login' component={Login} />
    </main>
  </div>
)

export default App
