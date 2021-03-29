//MinhNC15

export const GET_PAYSLIP = 'GET_PAYSLIP';
export const GET_PAYSLIP_SUCCESS = 'GET_PAYSLIP_SUCCESS';
export const GET_PAYSLIP_ERROR = 'GET_PAYSLIP_ERROR';

export const getPayslipAction = (data) => {
    return {
        type: GET_PAYSLIP,
        data
    }
}