import React from 'react'
import { connect } from 'react-redux'
import { getHealth, load } from './dashboard.module'
import { bindActionCreators } from 'redux'

class DashboardPage extends React.Component {

  componentWillMount() {
    this.props.load();
  }

  myTils() {
    return (<ol>Tils</ol>)
  }

  render() {
    return (
      <div>
        {this.props.post}
      </div>
    )
  }
}

export default connect(null, null)(DashboardPage)
