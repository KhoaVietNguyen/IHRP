
import {
    DELETE_TOKEN_NOTI_ACTION_FAILED,
    DELETE_TOKEN_NOTI_ACTION_SUCCESS,
    DELETE_TOKEN_NOTI_ACTION,
} from '../actions/actionTypes';
import {
    arrayIsEmpty,
    objectIsNull,
    stringIsEmpty,
} from '@dungdang/react-native-basic/src/Functions';
const initialState = {
    fetchingDeleteTokenNoti: false,
    dataDeleteTokenNoti: undefined,
    errorDeleteTokenNoti: undefined,
};

const configReducers = (state = initialState, action) => {
    switch (action.type) {
        case DELETE_TOKEN_NOTI_ACTION:
            return Object.assign({}, state, {
                fetchingDeleteTokenNoti: true,
                dataDeleteTokenNoti: undefined,
                errorDeleteTokenNoti: undefined,
            });

        case DELETE_TOKEN_NOTI_ACTION_SUCCESS:
            return Object.assign({}, state, {
                fetchingDeleteTokenNoti: false,
                dataDeleteTokenNoti: action.data,
                errorDeleteTokenNoti: undefined,
            });

        case DELETE_TOKEN_NOTI_ACTION_FAILED:
            return Object.assign({}, state, {
                fetchingDeleteTokenNoti: false,
                dataDeleteTokenNoti: undefined,
                errorDeleteTokenNoti: action.error,
            });

        default:
            return state;
    }
};

export default configReducers;
