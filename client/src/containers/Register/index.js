import { getError, submit, clear } from './register.module'
import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class RegisterPage extends React.Component {
  state = {
    name: '',
    email: '',
    password: '',
  }

  handleInputChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    const { name, email, password } = this.state
    if (name && email && password) {
      this.props.submit(name, email, password)
    }
  }

  componentWillUnmount() {
    this.props.clear()
  }

  parseErrors() {
    const { error } = this.props
    if (!error) return null
    return error.status === 422 ? (
      <div>A user already exists for the email provided</div>
    ) : (
      <div>An Unknown error occurred</div>
    )
  }

  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              autoComplete="name"
              name="name"
              value={this.state.name}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              autoComplete="email"
              name="email"
              value={this.state.email}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              autoComplete="current-password"
              name="password"
              value={this.state.password}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <button type="submit">Login</button>
          </div>
          {this.parseErrors()}
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  error: getError(state),
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      submit,
      clear,
    },
    dispatch,
  )

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage)
