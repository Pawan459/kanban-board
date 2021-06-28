import { ADD_TASK_LIST_GROUP, UPDATE_TASK_AT_GROUP, UPDATE_TASK_LIST } from "./actionTypes";

const initialState = {
  taskList: []
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
