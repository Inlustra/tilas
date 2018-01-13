const App = ({ user }) => (
  <div></div>
)

const mapStateToProps = state => {
  return {
    user: getUser(state),
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchUser
    },
    dispatch,
  )

export default connect(null, mapDispatchToProps)(App)
