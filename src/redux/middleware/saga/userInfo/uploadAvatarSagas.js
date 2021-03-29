import { UPLOAD_AVATAR, UPLOAD_AVATAR_FAILED, UPLOAD_AVATAR_SUCCESS } from '../../../actions/actionTypes'
import { POPUP_POST_LOGIN_SHOW } from '../../../actions/actionTypes'
import { call, takeEvery, put } from 'redux-saga/effects'
import { userProfile, errorConnectServer } from '../../../../config/settings'
import { objectIsNull, stringIsEmpty, arrayIsEmpty } from '@dungdang/react-native-basic/src/Functions'
import { uploadAvatarApi } from '../../api/userInfo/uploadAvatarApis'

function* uploadAvatarFlow(action) {
    try {
        const response = yield uploadAvatarApi(action.input)
        console.log('responseUploadAvatar: ', response)
        if (response !== undefined) {
            if (response.code === '0') {
                yield put({
                    type: UPLOAD_AVATAR_SUCCESS,
                    data: response.message
                })
            }
            else if (response.code === '1') {
                yield put({ type: POPUP_POST_LOGIN_SHOW, action: { type: UPLOAD_AVATAR, input: action.input } })
            } else {
                yield put({
                    type: UPLOAD_AVATAR_FAILED,
                    error: !objectIsNull(response.message) ? response.message : (userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en)
                })
            }
        } else {
            yield put({ type: UPLOAD_AVATAR_FAILED, error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en })
        }

    } catch (error) {
        console.log('errorCatchSagasUploadAvatar: ', error)
        yield put({ type: UPLOAD_AVATAR_FAILED, error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en })
    }
}

export function* watchUploadAvatar() {
    yield takeEvery(UPLOAD_AVATAR, uploadAvatarFlow);
}