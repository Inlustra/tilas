import React from 'react'
import {
  Route,
  Redirect
} from 'react-router-dom'

function PrivateRoute({ component: Component, redirectTo, authed, ...rest }) {
    return (
        <Route
            {...rest}
            render={(props) => !!authed
                ? <Component {...props} />
                : <Redirect to={{ pathname: redirectTo, state: { from: props.location } }} />}
        />
    )
}

export default PrivateRoute;
