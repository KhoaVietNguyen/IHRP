//MinhNC15

export const GET_SALARYHISTORY = 'GET_SALARYHISTORY';
export const GET_SALARYHISTORY_SUCCESS = 'GET_SALARYHISTORY_SUCCESS';
export const GET_SALARYHISTORY_ERROR = 'GET_SALARYHISTORY_ERROR';

export const getSalaryHistoryAction = (data) => {
    return {
        type: GET_SALARYHISTORY,
        data
    }
}