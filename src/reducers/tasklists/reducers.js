import { ADD_TASK_LIST_GROUP, UPDATE_TASK_AT_GROUP, UPDATE_TASK_LIST } from "./actionTypes";

const initialState = {
  taskList: [
    {
      "title": "Pawan",
      "color": "hsla(356.0083061177213, 100%, 75%, 0.4)",
      "tasks": [
        {
          "title": "Excited to go forward with Dreamers"
        },
        {
          "title": "Optimize the code"
        }
      ]
    },
    {
      "title": "Adam",
      "color": "hsla(20.807763357430005, 100%, 75%, 0.4)",
      "tasks": [
        {
          "title": "Go through the assignment"
        },
        {
          "title": "Provide Feedback"
        },
        {
          "title": "Tell further steps to Pawan"
        },
        {
          "title": "Onboard Pawan"
        }
      ]
    },
    {
      "title": "Chessboard",
      "color": "hsla(36.60094844215606, 100%, 75%, 0.4)",
      "tasks": [
        {
          "title": "Assuming it's white move"
        },
        {
          "title": "Move (Queen) E3 ======> A3, Checkmate"
        },
        {
          "title": "If it's black's turn then the game will be of more than one move. We can play it from here"
        }
      ]
    },
    {
      "title": "Completed",
      "color": "hsla(61.53400524433657, 100%, 75%, 0.4)",
      "tasks": [
        {
          "title": "Make default state"
        },
        {
          "title": "Find Checkmate in chessboard"
        },
        {
          "title": "Notify Adam, about the task completion"
        }
      ]
    }
  ]
}

const taskReducer = (state = initialState, { type, payload, ...action }) => {
  switch (type) {
    case UPDATE_TASK_LIST:
      return {
        ...state,
        taskList: payload
      }
    case UPDATE_TASK_AT_GROUP: {
      const { groupIndex } = action;
      const { taskList } = state;

      taskList[groupIndex]?.tasks.push(payload);

      return {
        ...state,
        taskList
      }
    }
    case ADD_TASK_LIST_GROUP: {
      const { taskList } = state;

      taskList.push(payload);
      return {
        ...state,
        taskList
      }
    }
    default:
      return state
  }
}


export default taskReducer
