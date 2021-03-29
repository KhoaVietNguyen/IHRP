//MinhNC15

export const GET_PAYSLIPVIEW_DETAIL = 'GET_PAYSLIPVIEW_DETAIL';
export const GET_PAYSLIPVIEW_DETAIL_SUCCESS = 'GET_PAYSLIPVIEW_DETAIL_SUCCESS';
export const GET_PAYSLIPVIEW_DETAIL_ERROR = 'GET_PAYSLIPVIEW_DETAIL_ERROR';

export const getPayslipViewDetailAction = (data) => {
    return {
        type: GET_PAYSLIPVIEW_DETAIL,
        data
    }
}