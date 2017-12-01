import { submit, getError, clear } from './login.module';
import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class LoginPage extends React.Component {

    state = {
        email: '',
        password: ''
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
            this.props.submit(email, password)
        }
    }

    parseErrors() {
        const { error } = this.props
        if (!error) return null
        return error.status === 401
            ? (<div>The username or password provided was incorrect</div>)
            : (<div>An Unknown error occurred</div>)
    }

    componentWillUnmount() {
        this.props.clear();
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
                    {this.parseErrors()}
                </form>
            </div>
        )
    }
}


const mapStateToProps = state => ({
    error: getError(state)
})
const mapDispatchToProps = dispatch => bindActionCreators({
    submit, clear
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginPage)
