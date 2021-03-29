
import {
    ATTACH_FILE_APPLICATION,
    ATTACH_FILE_APPLICATION_FAILED,
    ATTACH_FILE_APPLICATION_SUCCESS,

    WORKFLOW_DOWNLOAD_FILE,
    WORKFLOW_DOWNLOAD_FILE_FAILED,
    WORKFLOW_DOWNLOAD_FILE_SUCCESS,

} from '../../actions/application/applicationActions';
import {POPUP_CALL_RESET_ALL_REDUCERS} from '../../actions/actionTypes'
const initialState = {
    fetchingAttachFile: false,
    dataAttachFile: undefined,
    errorAttachFile: undefined,

    fetchingDownloadFile: false,
    dataDownloadFile: undefined,
    errorDownloadFile: undefined,


}

const attachFileApplicationReducers = (state = initialState, action) => {

    switch (action.type) {
        case ATTACH_FILE_APPLICATION:
            return Object.assign({}, state, {
                fetchingAttachFile: true,
                dataAttachFile: undefined,
                errorAttachFile: undefined,
            })

        case ATTACH_FILE_APPLICATION_SUCCESS:
            return Object.assign({}, state, {
                fetchingAttachFile: false,
                dataAttachFile: action.data,
                errorAttachFile: undefined,
            })

        case ATTACH_FILE_APPLICATION_FAILED:
            return Object.assign({}, state, {
                fetchingAttachFile: false,
                dataAttachFile: undefined,
                errorAttachFile: action.error,
            })

        case WORKFLOW_DOWNLOAD_FILE:
            return Object.assign({}, state, {
                fetchingDownloadFile: true,
                dataDownloadFile: undefined,
                errorDownloadFile: undefined,
            })

        case WORKFLOW_DOWNLOAD_FILE_SUCCESS:
            return Object.assign({}, state, {
                fetchingDownloadFile: false,
                dataDownloadFile: action.data,
                errorDownloadFile: undefined,
            })

        case WORKFLOW_DOWNLOAD_FILE_FAILED:
            return Object.assign({}, state, {
                fetchingDownloadFile: false,
                dataDownloadFile: undefined,
                errorDownloadFile: action.error,
            })
            case POPUP_CALL_RESET_ALL_REDUCERS:
                return Object.assign({}, state, {
                    fetchingAttachFile: true,
                    dataAttachFile: undefined,
                    errorAttachFile: undefined,

                    fetchingDownloadFile: true,
                    dataDownloadFile: undefined,
                    errorDownloadFile: undefined,
                })
        default:
            return state;
    }
}

export default attachFileApplicationReducers;