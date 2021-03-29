export const GET_REPORT_WORKING_HOUR = 'GET_REPORT_WORKING_HOUR'
export const GET_REPORT_WORKING_HOUR_SUCCESS = ' GET_REPORT_WORKING_HOUR_SUCCESS'
export const GET_REPORT_WORKING_HOUR_ERROR = ' GET_REPORT_WORKING_HOUR_ERROR'

export const Get_ReportWorkingHour =(data)=>{
    return{
        type: GET_REPORT_WORKING_HOUR,
        data:data
    }
}