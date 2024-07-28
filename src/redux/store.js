import { createStore } from "redux";
import goldReducer from "./reducers";

const store = createStore(goldReducer);

export default store;
