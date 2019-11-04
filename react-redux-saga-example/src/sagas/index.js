import {takeLatest, put, call} from 'redux-saga/effects'
import {
    fetchCategory,
    loginRequest,
    showTopics,
    deleteTopics,
    signupRequest,
    addTopics,
    editTopics,
    totalRating,
    requestComments,
    requestReviews,
    averageRating,
    postComments,
    postAuthor
} from "../API";
import actions from "../constants/index";

function* CategorySaga(action) {
    const data = yield call (fetchCategory);
    console.log(data);
    yield put({type: actions.CATEGORY_SUCCESS, data: data });
}

function* PostCategorySaga(action) {
    const data = yield call (fetchCategory);
    yield put({ type: actions.POST_CATEGORY_SUCCESS, data: data });
}

function* EditTopicsSaga(action) {
    console.log(action.payload.objectId);
    try {
        const data = yield call (()=>editTopics(action.payload));
        console.log(data);
        if (data) {
            const data = yield call (()=>showTopics(action.payload.payload.userid));
            yield put({ type: actions.TOPICS_SUCCESS, data: data });
        }
    } catch (error) {
        yield put({ type: actions.TEST_FAILURE, payload: error });
    }
}

function* DeleteTopicsSaga(action) {
    yield call (()=>deleteTopics(action.payload));
    console.log(action);
    const data = yield call (()=>showTopics(action.payload.role));
    console.log(data);
    yield put({type: actions.TOPICS_SUCCESS, data: data });
}

function* AddTopicsSaga(action) {
    try {
        const data = yield call (()=>addTopics(action.payload.payload));
        if (data) {
            const data = yield call (()=>showTopics(action.payload.payload.userid));
            yield put({type: actions.TOPICS_SUCCESS, data: data });
        }
    } catch (error) {
        yield put({ type: actions.TEST_FAILURE, payload: error });
    }
}

function* TopicsSaga(action) {
    console.log(action.payload);
    const data = yield call (()=>showTopics(action.payload));
    console.log(data);
    yield put({type: actions.TOPICS_SUCCESS, data: data });
}

function* RedirectSaga(action) {
    const data = 'true';
    yield put({type: actions.REDIRECT_SUCCESS, data: data });
    console.log(data)
}

function* LoginSaga(action) {
    try {
        const data = yield call (()=>loginRequest(action.payload.payload));
        if (data.status === 200) {
            yield put({type: actions.LOGIN_SUCCESS , data: data});
            yield put({type: actions.LOGIN_USER_SUCCESS , user: data.data.name});
        }
    } catch (error) {
        yield put({ type: actions.TEST_FAILURE, payload: error });
    }
}

function* SignupSaga(action) {
    const data = yield call (()=>signupRequest(action.payload.payload));
    console.log(data);
    yield put({type: actions.SIGNUP_SUCCESS , data: data});
    console.log(data);
}

function* TestSaga(action) {
    try {
        const response = yield call(() => showTopics(action));
        if (response) {
            yield put({ type: actions.TEST_SUCCESS, data: response });
        }
    } catch (error) {
        yield put({ type: actions.TEST_FAILURE, payload: error });
    }
}

function* RoleSaga(action) {
    console.log(action)
    yield put({ type: actions.ROLE_SUCCESS, data: action});
}

function* UserIdSaga(action) {
    console.log(action.userId)
    yield put({ type: actions.USER_ID_SUCCESS, data: action.userId});
}

function* ObjectIdSaga(action) {
    yield put({ type: actions.OBJECT_ID_SUCCESS, data: action});
}

function* AverageRatingSaga(action) {
    console.log(action);
    const data = yield call (()=>averageRating(action.user.data));
    console.log(data);
    yield put({ type: actions.AVERAGE_RATING_SUCCESS, data: data});
}

function* AuthorSaga(action) {
    console.log(action.author.name);
    // const data = yield call (()=>postAuthor(action.author.name));
    yield put({ type: actions.AUTHOR_SUCCESS, data: action.author.name});
}

function* TotalRatingSaga(action) {
    console.log(action);
    const data = yield call (()=>totalRating(action));
    console.log(data);
    yield put({ type: actions.TOTAL_RATING_SUCCESS, data: data});
}

function* CommentSaga(action) {
    console.log(action);
    const data = yield call (()=>requestComments(action.payload.data));
    console.log(data);
    yield put({ type: actions.COMMENTS_SUCCESS, data: data});
}

function* ReviewSaga(action) {
    console.log(action);
    const data = yield call (()=>requestReviews(action.payload.data));
    console.log(data);
    yield put({ type: actions.REVIEWS_SUCCESS, data: data});
}

function* PostCommentSaga(action) {
    console.log(action);
    const data = yield call (()=>postComments(action.payload.payload));
    console.log(data);
    yield put({ type: actions.POST_COMMENTS_SUCCESS, data: data});
}

export function* rootSaga() {
    yield takeLatest(actions.CATEGORY, CategorySaga);
    yield takeLatest(actions.TOPICS, TopicsSaga);
    yield takeLatest(actions.POST_CATEGORY, TopicsSaga);
    yield takeLatest(actions.REDIRECT_TO_CATEGORY, RedirectSaga);
    yield takeLatest(actions.REQUEST_LOGIN, LoginSaga);
    yield takeLatest(actions.REQUEST_SIGNUP, SignupSaga);
    yield takeLatest(actions.TEST, TestSaga);
    yield takeLatest(actions.USER_ID, UserIdSaga);
    yield takeLatest(actions.ROLE, RoleSaga);
    yield takeLatest(actions.DELETE_TOPICS, DeleteTopicsSaga);
    yield takeLatest(actions.ADD_TOPICS, AddTopicsSaga);
    yield takeLatest(actions.EDIT_TOPICS, EditTopicsSaga);
    yield takeLatest(actions.OBJECT_ID, ObjectIdSaga);
    yield takeLatest(actions.AVERAGE_RATING, AverageRatingSaga);
    yield takeLatest(actions.TOTAL_RATING, TotalRatingSaga);
    yield takeLatest(actions.COMMENTS, CommentSaga);
    yield takeLatest(actions.REVIEWS, ReviewSaga);
    yield takeLatest(actions.POST_COMMENTS, PostCommentSaga);
    yield takeLatest(actions.AUTHOR, AuthorSaga);
}