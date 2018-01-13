import React from 'react'
import { connect } from 'react-redux'

class DashboardPage extends React.Component {

  componentWillUnmount() {
    this.props.clear()
  }

  render() {
    return (
      <div>
        <h1>Dashboard</h1>
      </div>
    )
  }
}



export default connect(null, null)(DashboardPage)
