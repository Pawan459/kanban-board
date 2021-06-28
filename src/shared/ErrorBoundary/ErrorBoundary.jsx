import React, { Component } from 'react'

export default class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // We can log it to our custom service
    console.log(`error, info >>`, error, info)
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong. Please try after some time!</h1>;
    }
    return this.props.children;
  }
}
