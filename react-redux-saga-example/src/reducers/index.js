import { combineReducers } from "redux";
import categoryReducer from "./categoryReducer";
import topicsReducer from "./topicsReducer";

const rootReducer = combineReducers({
    data: categoryReducer,
    topics: topicsReducer
});

export default rootReducer;