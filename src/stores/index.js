import { createStore } from "redux";
import rootReducer from "../reducers/rootReducer";

const initialState = {};

export const store = createStore(rootReducer, initialState);
