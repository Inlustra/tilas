import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { performLogin } from '../../modules/auth/auth.module';

class LoginPage extends React.Component {

    handleSubmit = (event) => {
        event.preventDefault()
        const { email, password } = this.refs
        if (email && password) {
            this.props.performLogin(email, password)
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
                            ref="email" />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="password"
                            autoComplete="current-password"
                            name="password"
                            ref="password" />
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
    performLogin
}, dispatch)

export default connect(
    null,
    mapDispatchToProps
)(LoginPage)
