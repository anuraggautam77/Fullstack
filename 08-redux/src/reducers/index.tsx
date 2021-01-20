import { combineReducers } from "redux";
import trelloReducer from "./trelloreducer";
import slackReducer from "./slackreducer";
import todoReducer from "./todoreducer";

export default combineReducers({
  todoReducer,
  trelloReducer,
  slackReducer
});
