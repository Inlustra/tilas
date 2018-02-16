import React from 'react'
import { connect } from 'react-redux'
import { getHealth, pageLoad } from './dashboard.module'
import { bindActionCreators } from 'redux'

class DashboardPage extends React.Component {

  componentWillMount() {
    this.props.pageLoad();
  }

  myTils() {
    return (<ol>Tils</ol>)
  }

  render() {
    return (
      <div>
        <h1>Dashboard</h1>
        <div>{this.props.health ? this.props.health.message : 'Loading...'}</div>
        <h2>My Tils</h2>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  health: getHealth(state),
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      pageLoad,
    },
    dispatch,
  )

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage)
