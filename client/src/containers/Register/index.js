import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { performRegister } from '../../modules/auth/auth.module';

class RegisterPage extends React.Component {

    state = {
        name: '',
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
        const { name, email, password } = this.state
        if (name && email && password) {
            this.props.performRegister(name, email, password)
        }
    }

    render() {
        return (
            <div>
                <h1>Login</h1>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label htmlFor="name">Name</label>
                        <input type="text"
                            autoComplete="name"
                            name="name"
                            value={this.state.name}
                            onChange={this.handleInputChange} />
                    </div>
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
    performRegister
}, dispatch)

export default connect(
    null,
    mapDispatchToProps
)(RegisterPage)
