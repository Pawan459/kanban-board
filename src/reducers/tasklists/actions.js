import { ADD_TASK_LIST_GROUP, UPDATE_TASK_AT_GROUP, UPDATE_TASK_LIST } from "./actionTypes";

export const updateTaskList = (payload) => ({
  type: UPDATE_TASK_LIST,
  payload
})

export const updateTasksAtGroup = (groupIndex, payload) => ({
  type: UPDATE_TASK_AT_GROUP,
  payload,
  groupIndex,
})

export const addTaskListGroup = (payload) => ({
  type: ADD_TASK_LIST_GROUP,
  payload,
})
