import React from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { performLogin } from '../../modules/auth/auth.module';

function handleSubmit(event) {
    event.preventDefault();
    const { email, password } = event.refs;
    if (email && password) {
        performLogin({ email, password })
    }
}

const Login = props => (
    <div>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
            <div>
                <label for="email">Email</label>
                <input type="email" name="email" ref="email" />
            </div>
            <div>
                <label for="password">Password</label>
                <input type="password" name="password" ref="password" />
            </div>
            <div>
                <button type="submit">Login</button>
            </div>
        </form>
    </div>
)

const mapDispatchToProps = dispatch => bindActionCreators({
    changePage: () => push('/about-us')
}, dispatch)

export default connect(
    null,
    mapDispatchToProps
)(Login)
