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
        case actions.LOGIN_USER_SUCCESS: {
            return { ...state, User: action };
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
        case actions.ROLE_SUCCESS: {
            return { ...state, Role: action };
        }
        case actions.AVERAGE_RATING_SUCCESS: {
            return { ...state, AverageRatings: action };
        }
        case actions.TOTAL_RATING_SUCCESS: {
            return { ...state, TotalRatings: action };
        }
        case actions.COMMENTS_SUCCESS: {
            return { ...state, Comments: action };
        }
        case actions.REVIEWS_SUCCESS: {
            return { ...state, Reviews: action };
        }
        case actions.AUTHOR_SUCCESS: {
            return { ...state, Author: action };
        }
        default: {
            return state;
        }
    }
};

export default categoryReducer;