//MinhNC15

export const GET_PAYSLIPVIEW = 'GET_PAYSLIPVIEW';
export const GET_PAYSLIPVIEW_SUCCESS = 'GET_PAYSLIPVIEW_SUCCESS';
export const GET_PAYSLIPVIEW_ERROR = 'GET_PAYSLIPVIEW_ERROR';

export const getPayslipViewAction = (data) => {
    return {
        type: GET_PAYSLIPVIEW,
        data
    }
}