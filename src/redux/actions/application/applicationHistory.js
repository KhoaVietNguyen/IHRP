
export const GET_APPLICATION_HISTORY = 'GET_APPLICATION_HISTORY'
export const GET_APPLICATION_HISTORY_SUCCESS = 'GET_APPLICATION_HISTORY_SUCCESS'
export const GET_APPLICATION_HISTORY_FAILED = 'GET_APPLICATION_HISTORY_FAILED'


export const getApplicationHistoryAction = (input) => {
    return {
        type: GET_APPLICATION_HISTORY,
        input:input
    }
}