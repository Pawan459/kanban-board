import './BoardContainer.scss';
import { Component } from 'react';

import ErrorBoundary from '../../shared/ErrorBoundary/ErrorBoundary';
import DragAndDrop from '../../components/DragAndDrop/DragAndDrop'

export default class BoardContainer extends Component {

  render() {
    return (
      <ErrorBoundary>
        <div className="board-container">
          <h1>Welcome To Kanban</h1>
          <DragAndDrop />
        </div>
      </ErrorBoundary>
    )
  }
}
