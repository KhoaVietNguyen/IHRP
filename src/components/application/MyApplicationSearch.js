


import React from 'react'
import { Button, Image, View, Text, Alert, Modal, ScrollView, FlatList, StyleSheet, ActivityIndicator, SafeAreaView, } from 'react-native'
import {
    searchMyLeaveApplication,
    searchMyBusinessTripApplication,
    searchMyOverTimeApplication,
    searchMyLogTMSApplication
} from '../custom/form/FormTypeDetail'
import CustomHeader from '../custom/CustomHeader'
import { CustomButton } from '../custom/CustomButton'
import FormDetail from '../custom/form/FormDetail'
import getImage from '../../res/values/strings/iconStrS'
import { objectIsNull, arrayIsEmpty, stringIsEmpty } from '@dungdang/react-native-basic/src/Functions'
import { Sizes } from '@dungdang/react-native-basic'
import Loading from '../custom/Loading'
import ComboboxForm from '../custom/functionForm/ComboboxForm'
import { colorForm, colorApplication, colorHome } from '../../res/values/strings/colorStr'
import ItemDetailApplications from '../custom/application/ItemDetailApplications'
import { userProfile } from '../../config/settings'
import { appStrS } from '../../res/values/strings/appStrS'
export default class MyApplicationSearch extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            form: [],
            dataTypeApplication: [],
            selectedItem: undefined,
            dataSearch: [],
            errorSearch: '',
            flagSearch: false,
        }
    }
    componentDidMount() {
        this.willFocusSubscription = this.props.navigation.addListener(
            "willFocus",
            () => {
                this.onPressSubmit()
            }
        );
        let arr = [
            {
                id: '1',
                label: userProfile.LangID === 'VN' ? 'Đăng ký ngày nghỉ' : 'Take leave',
                value: '',
                isSelect: false,
                type: ''
            },
            // {
            //     id: '11',
            //     label: userProfile.LangID === 'VN' ? 'Nhật ký công tác' : 'Bussiness trip',
            //     value: '',
            //     isSelect: false,
            //     type: ''
            // },
            {
                id: '3',
                label: userProfile.LangID === 'VN' ? 'Đăng ký làm ngoài giờ' : 'Over time',
                value: '',
                isSelect: false,
                type: ''
            },
            {
                id: '75',
                label: userProfile.LangID === 'VN' ? 'Đăng ký bổ sung giờ công' : 'Log TMS',
                value: '',
                isSelect: false,
                type: ''
            }
        ]
        let idScreen = this.props.navigation.getParam('idScreen')
        let selectedItem = undefined
        let form = []
        if (!objectIsNull(idScreen)) {
            let items = arr.filter((value) => {
                return value.id === idScreen
            })
            if (!arrayIsEmpty(items)) {
                selectedItem = items[0]
            }

            if (idScreen === '1') {
                form = searchMyLeaveApplication()
                for (let item of form) {
                    if (item.tag === 'LeaveTypeID') {
                        item.onPress = () => { this.props.getTypesLeaveApplication() }
                        break
                    }

                }

            } else if (idScreen === '11') {
                form = searchMyBusinessTripApplication()
            }
            else if (idScreen === '3') {
                form = searchMyOverTimeApplication()
                for (let item of form) {
                    if (item.tag === 'StatusOverTime') {
                        item.onPress = () => { this.props.getListStatusOverTimeApplicationAction([{ F: '2' }]) }
                        break
                    }

                }
            } else if (idScreen === '75') {
                // Lấy trình trạng điều chỉnh
                // Lấy dữ liệu vân tay
                // Lấy tình trạng phê duyệt
                form = searchMyLogTMSApplication()
                for (let item of form) {
                    if (item.control === 'twoComboboxForm') {
                        let itemsMonth = this.createMonthPicker()
                        let itemsYear = this.createYearPicker()
                        item.items1 = itemsMonth.listMonth
                        item.items2 = itemsYear.listYear
                        item.selectedItem1 = itemsMonth.selectedMonth
                        item.selectedItem2 = itemsYear.selectedYear
                        item.value1 = itemsMonth.selectedMonth.label
                        item.value2 = itemsYear.selectedYear.label
                    } else if (item.tag === 'AdjustmentStatus') {
                        item.onPress = () => { this.props.getAdjustmentStatusLogTMSApplicationAction() }
                    } else if (item.tag === 'FingerPrintRecord') {
                        item.onPress = () => { this.props.getFingerPrintRecordLogTMSApplicationAction() }
                    } else if (item.tag === 'ApprovalStatus') {
                        item.onPress = () => { this.props.getApprovalStatusLogTMSApplicationAction() }
                    }
                }

            }
        } else {
            selectedItem = arr[0]
            form = searchMyLeaveApplication()
            for (let item of form) {
                if (item.tag === 'LeaveTypeID') {
                    item.onPress = () => { this.props.getTypesLeaveApplication() }
                    break
                }

            }
        }
        this.setState({
            dataTypeApplication: arr,
            selectedItem,
            form
        })
    }
    createMonthPicker() {
        let arr = []
        let month = new Date().getMonth() + 1
        let selectedMonth
        for (let i = 1; i < 13; i++) {
            if (i === month) {
                selectedMonth = {
                    id: i + '',
                    label: i + '',
                    value: {
                        id: i + '',
                        name: i + '',
                    },
                    isSelect: false,
                    type: undefined

                }
            }

            arr.push({
                id: i + '',
                label: i + '',
                value: {
                    id: i + '',
                    name: i + '',
                },
                isSelect: false,
                type: undefined

            })
        }
        return {
            listMonth: arr,
            selectedMonth
        }
    }

    createYearPicker() {
        let arr = []
        let year = new Date().getFullYear()
        let selectedYear
        for (let i = 2025; i > 2016; i--) {
            if (i === year) {
                selectedYear = {
                    id: i + '',
                    label: i + '',
                    value: {
                        id: i + '',
                        name: i + '',
                    },
                    isSelect: false,
                    type: undefined

                }
            }
            arr.push({
                id: i + '',
                label: i + '',
                value: {
                    id: i + '',
                    name: i + '',
                },
                isSelect: false,
                type: undefined

            })
        }
        return {
            listYear: arr,
            selectedYear
        }
    }
    onSelectedItemCombobox = (value) => {
        if (value.id === '1') {
            this.props.getTypesLeaveApplication()
            this.setState({
                form: searchMyLeaveApplication(),
                selectedItem: value,
                dataSearch: [],
                flagSearch: false,
            })
        } else if (value.id === '11') {
            this.setState({
                form: searchMyBusinessTripApplication(),
                selectedItem: value,
                dataSearch: [],
                flagSearch: false,
            })
        } else if (value.id === '3') {
            this.props.getListStatusOverTimeApplicationAction([{ F: '2' }])
            this.setState({
                form: searchMyOverTimeApplication(),
                selectedItem: value,
                dataSearch: [],
                flagSearch: false,
            })
        } else if (value.id === '75') {
            let form = searchMyLogTMSApplication()
            for (let item of form) {
                if (item.control === 'twoComboboxForm') {
                    let itemsMonth = this.createMonthPicker()
                    let itemsYear = this.createYearPicker()
                    item.items1 = itemsMonth.listMonth
                    item.items2 = itemsYear.listYear
                    item.selectedItem1 = itemsMonth.selectedMonth
                    item.selectedItem2 = itemsYear.selectedYear
                    item.value1 = itemsMonth.selectedMonth.label
                    item.value2 = itemsYear.selectedYear.label
                } else if (item.tag === 'AdjustmentStatus') {
                    item.onPress = () => { this.props.getAdjustmentStatusLogTMSApplicationAction() }
                } else if (item.tag === 'FingerPrintRecord') {
                    item.onPress = () => { this.props.getFingerPrintRecordLogTMSApplicationAction() }
                } else if (item.tag === 'ApprovalStatus') {
                    item.onPress = () => { this.props.getApprovalStatusLogTMSApplicationAction() }
                }
            }
            this.setState({
                form: form,
                selectedItem: value,
                dataSearch: [],
                flagSearch: false,
            })
        }
    }
    mapData(data, type) {
        let arr = data.map((value) => {
            let id = value.id
            let name = value.nameVN
            switch (type) {
                case 'LeaveTypeID':
                    id = value.id
                    name = value.nameVN
                    break
                case 'StatusOverTime':
                    id = value.item1
                    name = value.item2
                    break
                default:
                    id = value.id
                    break
            }
            return {
                id: id,
                label: name,
                value: value,
                isSelect: false,
                type: type
            }
        })

        let list = this.state.form
        for (let item of list) {
            if (item.tag === type) {
                item.items = arr
            }
        }
        this.setState({
            form: list
        })
    }
    componentDidUpdate(prevProps) {
        const {
            dataTypesLeave,
            dataSearch,
            dataSearchBusinessTrip,
            dataStatusOverTime,
            dataSearchOverTimeApplication,

            dataAdjustmentStatus,
            dataFingerPrintRecord,
            dataApprovalStatus,

            dataSearchLogTMSApplication,

            //error

            errorSearchLogTMSApplication,
            errorSearchOverTimeApplication,
            errorSearchBusinessTrip,
            errorSearch,

        } = this.props


        if (dataAdjustmentStatus !== prevProps.dataAdjustmentStatus) {
            if (!arrayIsEmpty(dataAdjustmentStatus)) {
                let form = this.state.form
                for (let item of form) {
                    if (item.tag === 'AdjustmentStatus') {
                        item.items = dataAdjustmentStatus.map((value) => {
                            return {
                                id: value.id,
                                label: value.name,
                                value: value,
                                isSelect: false,
                                type: 'AdjustmentStatus'
                            }
                        })
                        break
                    }
                }
                this.setState({
                    form: form
                })
            }
        }
        if (errorSearch !== prevProps.errorSearch) {
            if (!stringIsEmpty(errorSearch)) {
                this.setState({
                    errorSearch,
                    flagSearch: true,
                })
            }
        }
        if (errorSearchLogTMSApplication !== prevProps.errorSearchLogTMSApplication) {
            if (!stringIsEmpty(errorSearchLogTMSApplication)) {
                this.setState({
                    errorSearch: errorSearchLogTMSApplication,
                    flagSearch: true,
                })
            }
        }
        if (errorSearchOverTimeApplication !== prevProps.errorSearchOverTimeApplication) {
            if (!stringIsEmpty(errorSearchOverTimeApplication)) {
                this.setState({
                    errorSearch: errorSearchOverTimeApplication,
                    flagSearch: true,
                })
            }
        }
        if (errorSearchBusinessTrip !== prevProps.errorSearchBusinessTrip) {
            if (!stringIsEmpty(errorSearchBusinessTrip)) {
                this.setState({
                    errorSearch: errorSearchBusinessTrip,
                    flagSearch: true,
                })
            }
        }

        if (dataFingerPrintRecord !== prevProps.dataFingerPrintRecord) {
            if (!arrayIsEmpty(dataFingerPrintRecord)) {
                let form = this.state.form
                for (let item of form) {
                    if (item.tag === 'FingerPrintRecord') {
                        item.items = dataFingerPrintRecord.map((value) => {
                            return {
                                id: value.id,
                                label: value.name,
                                value: value,
                                isSelect: false,
                                type: 'FingerPrintRecord'
                            }
                        })
                        break
                    }
                }
                this.setState({
                    form: form
                })
            }
        }

        if (dataApprovalStatus !== prevProps.dataApprovalStatus) {
            if (!arrayIsEmpty(dataApprovalStatus)) {
                let form = this.state.form
                for (let item of form) {
                    if (item.tag === 'ApprovalStatus') {
                        item.items = dataApprovalStatus.map((value) => {
                            return {
                                id: value.id,
                                label: value.name,
                                value: value,
                                isSelect: false,
                                type: 'ApprovalStatus'
                            }
                        })
                        break
                    }
                }
                this.setState({
                    form: form
                })
            }
        }
        if (dataSearchLogTMSApplication !== prevProps.dataSearchLogTMSApplication) {
            // if (!arrayIsEmpty(dataSearchLogTMSApplication)) {
            //     this.setState({
            //         dataSearch: dataSearchLogTMSApplication
            //     })
            // }
            this.setState({
                dataSearch: !arrayIsEmpty(dataSearchLogTMSApplication) ? dataSearchLogTMSApplication : []
            })
        }

        if (dataTypesLeave !== prevProps.dataTypesLeave) {
            if (!objectIsNull(dataTypesLeave)) {
                this.mapData(dataTypesLeave, 'LeaveTypeID')
            }
        }

        if (dataSearch !== prevProps.dataSearch) {
            // if (!arrayIsEmpty(dataSearch)) {
            //     this.setState({
            //         dataSearch
            //     })
            // }
            this.setState({
                dataSearch: !arrayIsEmpty(dataSearch) ? dataSearch : []
            })
        }

        if (dataSearchBusinessTrip !== prevProps.dataSearchBusinessTrip) {
            // if (!arrayIsEmpty(dataSearchBusinessTrip)) {
            //     this.setState({
            //         dataSearch: dataSearchBusinessTrip
            //     })
            // }
            this.setState({
                dataSearch: !arrayIsEmpty(dataSearchBusinessTrip) ? dataSearchBusinessTrip : []
            })
        }
        if (dataSearchOverTimeApplication !== prevProps.dataSearchOverTimeApplication) {
            // if (!arrayIsEmpty(dataSearchOverTimeApplication)) {
            //     this.setState({
            //         dataSearch: dataSearchOverTimeApplication
            //     })
            // }
            this.setState({
                dataSearch: !arrayIsEmpty(dataSearchOverTimeApplication) ? dataSearchOverTimeApplication : []
            })
        }



        if (dataStatusOverTime !== prevProps.dataStatusOverTime) {
            if (!arrayIsEmpty(dataStatusOverTime)) {
                // this.set
                this.mapData(dataStatusOverTime, 'StatusOverTime')
            }
        }

    }
    onPressSubmit = () => {
        if (!objectIsNull(this.state.selectedItem)) {
            switch (this.state.selectedItem.id) {
                case '1':
                    let inputLeave = {
                        LeaveTypeID: '',
                        FromDate: '',
                        ToDate: '',
                        Status: '',

                    }
                    for (let item of this.state.form) {
                        if (item.tag === 'LeaveTypeID') {
                            inputLeave.LeaveTypeID = item.value
                        } else if (item.control === 'twoDatePicker') {
                            inputLeave.FromDate = item.value1
                            inputLeave.ToDate = item.value2
                        }
                    }
                    this.props.searchLeaveApplicationAction([inputLeave])
                    break
                case '11':
                    let inputBusinessTrip = {
                        FromDate: '',
                        ToDate: ''
                    }
                    for (let item of this.state.form) {
                        if (item.control === 'twoDatePicker') {
                            inputBusinessTrip.FromDate = item.value1
                            inputBusinessTrip.ToDate = item.value2
                        }
                    }
                    // console.log('searchBusinessTrip: ', inputBusinessTrip)
                    this.props.searchBusinessTripApplicationAction([inputBusinessTrip])
                    break

                case '3':
                    let inputOverTime = {
                        FromDate: '',
                        ToDate: '',
                        Status: '',

                    }
                    for (let item of this.state.form) {
                        if (item.control === 'twoDatePicker') {
                            inputOverTime.FromDate = item.value1
                            inputOverTime.ToDate = item.value2
                        } else if (item.tag === 'StatusOverTime') {
                            inputOverTime.Status = item.value
                        }
                    }
                    // console.log('searchOverTime: ', inputOverTime)
                    this.props.searchOverTimeApplicationAction([inputOverTime])

                    break
                case '75':
                    let inputLogTMS = {
                        MonthYear: '',
                        List1: '',
                        List2: '',
                        List3: '',
                    }
                    for (let item of this.state.form) {
                        if (item.control === 'twoComboboxForm') {
                            inputLogTMS.MonthYear = ('0' + item.value1).substr(-2) + '/' + item.value2
                        } else if (item.tag === 'AdjustmentStatus') {
                            inputLogTMS.List1 = item.value
                        } else if (item.tag === 'FingerPrintRecord') {
                            inputLogTMS.List2 = item.value
                        } else if (item.tag === 'ApprovalStatus') {
                            inputLogTMS.List3 = item.value
                        }
                    }
                    // console.log('inputLogTMSSSSSSSSS: ', inputLogTMS)
                    this.props.searchLogTMSApplicationAction([inputLogTMS])
                    break
                default:

                    break

            }
        }
    }
    noteStatusOT() {
        return (
            <View style={{ width: '100%', marginHorizontal: Sizes.s10, marginVertical: Sizes.s10, marginBottom: Sizes.s20 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ width: Sizes.s30, height: Sizes.s30, borderRadius: Sizes.s15, backgroundColor: colorApplication.dayStatusOT }}>

                    </View>
                    <Text> {userProfile.LangID === 'VN' ? 'Số giờ OT ban ngày' : 'Day time OT'}</Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ width: Sizes.s30, height: Sizes.s30, borderRadius: Sizes.s15, backgroundColor: colorApplication.nightStatusOT }}>

                    </View>
                    <Text> {userProfile.LangID === 'VN' ? 'Số giờ OT ban đêm' : 'Night OT'}</Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ width: Sizes.s30, height: Sizes.s30, borderRadius: Sizes.s15, backgroundColor: colorApplication.replaceStatusOT }}>

                    </View>
                    <Text> {userProfile.LangID === 'VN' ? 'Số giờ đăng ký nghỉ bù' : 'Registration hours off'}</Text>
                </View>
            </View>
        )
    }
    render() {
        const {
            fetchingDateInfo,
            fetchingApprover,
            fetchingCalculate,
            fetchingSave,

            //search
            fetchingSearch,
            fetchingSearchBusinessTrip,
            fetchingSearchOverTimeApplication,
            fetchingSearchLogTMSApplication,

        } = this.props
        const { dataTypeApplication, selectedItem, dataSearch, errorSearch, flagSearch } = this.state
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
                <CustomHeader
                    typeIconLeft={'back'}
                    title={userProfile.LangID === 'VN' ? 'Tìm kiếm đơn của tôi' : 'My application search'}
                    onPressLeft={() => { this.props.navigation.goBack() }}
                />
                <ScrollView style={{ flex: 1, backgroundColor: "white", paddingHorizontal: Sizes.s20 }}>
                    {(fetchingDateInfo || fetchingApprover || fetchingCalculate || fetchingSave) && <Loading />}


                    {/* <Text style={{ fontSize: Sizes.h30, color: colorForm.labelForm, marginVertical: Sizes.s10 }}>Loại đơn</Text> */}
                    <ComboboxForm onSelectedItemCombobox={this.onSelectedItemCombobox} selectedItem={selectedItem} tempCaption={userProfile.LangID === 'VN' ? 'Loại đơn' : 'Application type'} items={dataTypeApplication} />
                    <FormDetail ref='form' form={this.state.form} />
                    <CustomButton onPress={this.onPressSubmit} type='search' title={userProfile.LangID === 'VN' ? appStrS.vn.button.search : appStrS.en.button.search} />
                    {!arrayIsEmpty(dataSearch) &&
                        <Text style={{ width: '100%', textAlign: 'right', fontSize: Sizes.h30, marginVertical: Sizes.s10 }}><Text style={{ color: colorHome.colorTitle }}>{dataSearch.length}</Text> kết quả </Text>
                    }
                    {!objectIsNull(selectedItem) && selectedItem.id === '3' &&
                        this.noteStatusOT()
                    }
                    {
                        (fetchingSearch || fetchingSearchBusinessTrip || fetchingSearchOverTimeApplication || fetchingSearchLogTMSApplication) ?
                            (
                                <View style={{ width: '100%', marginVertical: Sizes.s10, justifyContent: 'center', alignItems: 'center' }}>
                                    <ActivityIndicator size='large' color={colorForm.labelForm} />
                                </View>
                            )
                            : (arrayIsEmpty(dataSearch) && !stringIsEmpty(errorSearch) && flagSearch) ?
                                (
                                    <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                                        <Image source={getImage('img_empty_data')} style={{ width: Sizes.s340, height: Sizes.s340 }} />
                                        <Text style={{ fontSize: Sizes.h30, color: colorForm.labelForm }}>{errorSearch}</Text>
                                    </View>
                                )
                                :
                                (
                                    <FlatList
                                        data={dataSearch}
                                        renderItem={({ item, index }) => {
                                            return (
                                                // <View style={{ width: '100%', height: 50, backgroundColor: 'yellow', marginVertical: Sizes.s10 }}><Text>{item.empName}</Text></View>
                                                <ItemDetailApplications
                                                    item={item}
                                                    typeItem={!objectIsNull(this.state.selectedItem) ? this.state.selectedItem.id : undefined}
                                                    {...this.props}
                                                />
                                            )
                                        }}
                                    />
                                )
                    }

                </ScrollView>

            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({

})