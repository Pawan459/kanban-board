import { Component } from 'react';

import ErrorBoundary from '../../shared/ErrorBoundary/ErrorBoundary';
import DragAndDrop from '../../components/DragAndDrop/DragAndDrop'

export default class BoardContainer extends Component {

  render() {
    return (
      <ErrorBoundary>
        <DragAndDrop />
      </ErrorBoundary>
    )
  }
}
