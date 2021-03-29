// export const API_IHRP_DEV = 'https://ihrp.fis.vn/bke_mob_v12_demo/api/v1/'
const API_IHRP_DEVELOPER = 'https://ihrp.fis.vn/bke_mob_v13/api/v1/'
const API_IHRP_PNJ = 'https://mobile-cafe.pnj.com.vn/api/v1/'

// Nhớ thay đổi Appversion ở dưới mỗi khi build app
export const API_IHRP_DEV = API_IHRP_PNJ


export const errorConnectServer = {
    vn: 'Không thể kết nối tới hệ thống',
    en: 'Connect server failed',
    vnData: 'Không tìm thấy dữ liệu để hiển thị',
    enData: 'No data found',

    errorData: 'errorData'
}

export const userProfile = {
    username: '',
    LangID: 'VN',
    Stoken: '',
    OS: '',
    Version: '',
    AppVersion: 'PNJ_20210105_V1',
    configApp: {
        'Content-Type': 'application/json',
        // 'Version-App-Redirect': '1.0.3',
        'DeviceID': '',
        'VERSION-APP': 'PNJ_20210105_V1',
    },
    typeLeaveApplication: '1',
    background: '', // save color theme of background: blue, orange, green
    typeWiFiOrWFH: 'WIFI',
    deviceID: '',
    tokenNoti: '',
}

export const getAppData = {
    commit: '',
    general: '',
    caption: '',
    config: '',
    controlConfig: '',
}