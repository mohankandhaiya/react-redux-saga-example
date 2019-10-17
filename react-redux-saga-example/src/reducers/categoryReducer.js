import actions from "../constants";
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'

const initState = {
    Category: {},
    Topics: {},
    UserId: {}
};

const categoryReducer = (state = {}, action) => {
    switch(action.type) {
        case actions.CATEGORY_SUCCESS: {
            return { ...state, Category: action.data };
        }
        case actions.TOPICS_SUCCESS: {
            console.log(action.data);
            return { ...state, Topics: action.data };
        }
        case actions.ADD_TOPICS_SUCCESS: {
            console.log(action.data);
            return { ...state, Topics: action.data };
        }
        case actions.REDIRECT_SUCCESS: {
            return { ...state, Redirect: action.data };
        }
        case actions.LOGIN_SUCCESS: {
            return { ...state, Login: action.data };
        }
        case actions.TEST_SUCCESS: {
            return { ...state, Topics: action };
        }
        case actions.USER_ID_SUCCESS: {
            return { ...state, UserId: action };
        }
        case actions.OBJECT_ID_SUCCESS: {
            return { ...state, ObjectId: action };
        }
        case actions.AVERAGE_RATING_SUCCESS: {
            return { ...state, AverageRatings: action };
        }
        case actions.COMMENTS_SUCCESS: {
            return { ...state, Comments: action };
        }
        default:
            return state;
    }
};

export default categoryReducer;