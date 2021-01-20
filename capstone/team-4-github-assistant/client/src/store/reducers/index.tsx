
import { combineReducers } from 'redux';
import slackReducer from './slackReducer';
import gitHubReducer from './githubReducer';
import loginReducer from "./loginReducer";

export default combineReducers({
	slackReducer,
  gitHubReducer,
  loginReducer
});
