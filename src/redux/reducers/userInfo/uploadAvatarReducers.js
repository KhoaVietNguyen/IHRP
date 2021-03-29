import {
    UPLOAD_AVATAR_SUCCESS,
    UPLOAD_AVATAR_FAILED,
    UPLOAD_AVATAR
} from '../../actions/actionTypes';
import { POPUP_CALL_RESET_ALL_REDUCERS } from '../../actions/actionTypes';
var initalState = {
    loadingUploadAvatar: false,
    dataUploadAvatar: undefined,
    errorUploadAvatar: undefined,
};

const uploadAvatarReducers = (state = initalState, action) => {
    switch (action.type) {
        case UPLOAD_AVATAR:
            return Object.assign({}, state, {
                loadingUploadAvatar: true,
                dataUploadAvatar: undefined,
                errorUploadAvatar: undefined,
            });
        case UPLOAD_AVATAR_SUCCESS:
            return Object.assign({}, state, {
                loadingUploadAvatar: false,
                dataUploadAvatar: action.data,
                errorUploadAvatar: undefined,
            });
        case UPLOAD_AVATAR_FAILED:
            return Object.assign({}, state, {
                loadingUploadAvatar: false,
                dataUploadAvatar: undefined,
                errorUploadAvatar: action.error,
            });

        case POPUP_CALL_RESET_ALL_REDUCERS:
            return Object.assign({}, state, {
                loadingUploadAvatar: false,
                dataUploadAvatar: undefined,
                errorUploadAvatar: undefined,
            });
        default:
            return state;
    }
};

export default uploadAvatarReducers