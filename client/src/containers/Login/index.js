import { submitLogin } from './login.module';
import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class LoginPage extends React.Component {

    constructor() {
        super();
        this.state = {
            email: '',
            password: ''
        }
    }

    handleInputChange = ({ target }) => {
        this.setState({
            [target.name]: target.value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const { email, password } = this.state
        if (email && password) {
            this.props.submitLogin(email, password)
        }
    }

    render() {
        return (
            <div>
                <h1>Login</h1>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="email"
                            autoComplete="email"
                            name="email"
                            value={this.state.email}
                            onChange={this.handleInputChange} />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="password"
                            autoComplete="current-password"
                            name="password"
                            value={this.state.password}
                            onChange={this.handleInputChange} />
                    </div>
                    <div>
                        <button type="submit">Login</button>
                    </div>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    submitLogin
}, dispatch)

export default connect(
    null,
    mapDispatchToProps
)(LoginPage)
