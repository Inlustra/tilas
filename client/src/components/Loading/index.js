import React from 'react'

const LoadingComponent = ({ isLoading, error, pastDelay }) => {
  // Handle the loading state
  if (error) {
    // Handle the error state
    return (<div>Sorry, there was a problem loading the page.</div>)
  } if (isLoading && pastDelay) {
    return (<div>Loading...</div>)
  } else {
    return null
  }
}

export default LoadingComponent
