


import React from 'react'
import { Button, Image, View, Text, Alert, Modal, ScrollView, FlatList, StyleSheet, ActivityIndicator, SafeAreaView, } from 'react-native'
import {
    searchMyLeaveApplication,
    searchMyBusinessTripApplication,
    searchMyOverTimeApplication,
    searchMyLogTMSApplication,
    // 

    searchApproverLeaveApplication,
    searchApproverBusinessApplicationForm,
    searchApproverOverTimeApplicationForm,
    searchApproverLogTMSApplicationForm,
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
export default class ApproverApplicationSearch extends React.Component {
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
                label: 'Nghỉ phép',
                value: '',
                isSelect: false,
                type: ''
            },
            {
                id: '11',
                label: 'Nhật ký công tác',
                value: '',
                isSelect: false,
                type: ''
            },
            {
                id: '3',
                label: 'Làm ngoài giờ',
                value: '',
                isSelect: false,
                type: ''
            },
            {
                id: '75',
                label: 'Xác nhận quẹt thẻ',
                value: '',
                isSelect: false,
                type: ''
            }
        ]
        let idScreen = this.props.navigation.getParam('idScreen')
        // console.log('idScreennnn :', idScreen)
        let selectedItem = undefined
        let form = []
        if (!objectIsNull(idScreen)) {
            let items = arr.filter((value) => {
                return value.id === idScreen
            })
            if (!arrayIsEmpty(items)) {
                selectedItem = items[0]
            }

            if (idScreen == '1') {
                form = searchApproverLeaveApplication()
                for (let item of form) {
                    if (item.tag === 'LeaveTypeID') {
                        item.onPress = () => { this.props.getTypesLeaveApplication() }
                    } else if (item.tag === 'Status') {
                        item.onPress = () => { this.props.getListStatusApplicationAction() }
                    }
                }

            } else if (idScreen === '11') {
                form = searchApproverBusinessApplicationForm()
                for (let item of form) {
                    if (item.tag === 'BusinessTripType') {
                        item.onPress = () => { this.props.getListTypeBusinessTripApplicationAction() }
                    } else if (item.tag === 'Status') {

                    }
                }
            }
            else if (idScreen === '3') {
                form = searchApproverOverTimeApplicationForm()
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
                form = searchApproverLogTMSApplicationForm()
                for (let item of form) {
                    // if (item.control === 'twoComboboxForm') {
                    //     let itemsMonth = this.createMonthPicker()
                    //     let itemsYear = this.createYearPicker()
                    //     item.items1 = itemsMonth.listMonth
                    //     item.items2 = itemsYear.listYear
                    //     item.selectedItem1 = itemsMonth.selectedMonth
                    //     item.selectedItem2 = itemsYear.selectedYear
                    //     item.value1 = itemsMonth.selectedMonth.label
                    //     item.value2 = itemsYear.selectedYear.label
                    // } else 
                    if (item.tag === 'AdjustmentStatus') {
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
            form = searchApproverLeaveApplication()
            for (let item of form) {
                if (item.tag === 'LeaveTypeID') {
                    item.onPress = () => { this.props.getTypesLeaveApplication() }
                } else if (item.tag === 'Status') {
                    item.onPress = () => { this.props.getListStatusApplicationAction() }
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
            let formLeave = searchApproverLeaveApplication()
            for (let item of formLeave) {
                if (item.tag === 'LeaveTypeID') {
                    item.onPress = () => { this.props.getTypesLeaveApplication() }
                    break
                }
            }
            this.setState({
                form: formLeave,
                selectedItem: value,
                dataSearch: [],
                flagSearch: false,
            })
        } else if (value.id === '11') {
            let formBusinessTrip = searchApproverBusinessApplicationForm()
            for (let item of formBusinessTrip) {
                if (item.tag === 'BusinessTripType') {
                    item.onPress = () => { this.props.getListTypeBusinessTripApplicationAction() }
                } else if (item.tag === 'Status') {

                }
            }
            this.setState({
                form: formBusinessTrip,
                selectedItem: value,
                dataSearch: [],
                flagSearch: false,
            })
        } else if (value.id === '3') {
            let formOverTimte = searchApproverOverTimeApplicationForm()
            for (let item of formOverTimte) {
                if (item.tag === 'StatusOverTime') {
                    item.onPress = () => { this.props.getListStatusOverTimeApplicationAction([{ F: '2' }]) }
                    break
                }
            }
            this.setState({
                form: formOverTimte,
                selectedItem: value,
                dataSearch: [],
                flagSearch: false,
            })
        } else if (value.id === '75') {
            let formLogTMS = searchApproverLogTMSApplicationForm()
            for (let item of formLogTMS) {
                // if (item.control === 'twoComboboxForm') {
                //     let itemsMonth = this.createMonthPicker()
                //     let itemsYear = this.createYearPicker()
                //     item.items1 = itemsMonth.listMonth
                //     item.items2 = itemsYear.listYear
                //     item.selectedItem1 = itemsMonth.selectedMonth
                //     item.selectedItem2 = itemsYear.selectedYear
                //     item.value1 = itemsMonth.selectedMonth.label
                //     item.value2 = itemsYear.selectedYear.label
                // } else 
                if (item.tag === 'AdjustmentStatus') {
                    item.onPress = () => { this.props.getAdjustmentStatusLogTMSApplicationAction() }
                } else if (item.tag === 'FingerPrintRecord') {
                    item.onPress = () => { this.props.getFingerPrintRecordLogTMSApplicationAction() }
                } else if (item.tag === 'ApprovalStatus') {
                    item.onPress = () => { this.props.getApprovalStatusLogTMSApplicationAction() }
                }
            }
            this.setState({
                form: formLogTMS,
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
                case 'Status':
                    id = value.id
                    name = value.nameVN
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
            dataStatusOverTime,
            dataAdjustmentStatus,
            dataFingerPrintRecord,
            dataApprovalStatus,
            dataTypeBusinessTrip,
            dataListStatusApplication,

            // search 
            dataSearchApprovedLeave,
            dataSearchApprovedBusinessTrip,
            dataSearchApprovedOverTimeApplication,
            dataSearchApprovedLogTMSApplication,

            //error
            errorSearchApprovedLeave,
            errorSearchApprovedBusinessTrip,
            errorSearchApprovedOverTimeApplication,
            errorSearchApprovedLogTMSApplication,

        } = this.props

        if (dataSearchApprovedLeave !== prevProps.dataSearchApprovedLeave) {
            this.setState({
                dataSearch: !arrayIsEmpty(dataSearchApprovedLeave) ? dataSearchApprovedLeave : []
            })
        }

        if (dataSearchApprovedBusinessTrip !== prevProps.dataSearchApprovedBusinessTrip) {
            this.setState({
                dataSearch: !arrayIsEmpty(dataSearchApprovedBusinessTrip) ? dataSearchApprovedBusinessTrip : []
            })
        }
        if (dataSearchApprovedOverTimeApplication !== prevProps.dataSearchApprovedOverTimeApplication) {
            this.setState({
                dataSearch: !arrayIsEmpty(dataSearchApprovedOverTimeApplication) ? dataSearchApprovedOverTimeApplication : []
            })
        }
        if (dataSearchApprovedLogTMSApplication !== prevProps.dataSearchApprovedLogTMSApplication) {
            this.setState({
                dataSearch: !arrayIsEmpty(dataSearchApprovedLogTMSApplication) ? dataSearchApprovedLogTMSApplication : []
            })
        }

        if (dataTypeBusinessTrip !== prevProps.dataTypeBusinessTrip) {
            if (!arrayIsEmpty(dataTypeBusinessTrip)) {
                let formTypeBusinessTrip = this.state.form
                for (let item of formTypeBusinessTrip) {
                    if (item.tag === 'BusinessTripType') {
                        item.items = dataTypeBusinessTrip.map((value) => {
                            return {
                                id: value.id,
                                label: value.name,
                                value: value,
                                isSelect: false,
                                type: 'BusinessTripType'
                            }
                        })
                        break
                    }
                }
                this.setState({
                    form: formTypeBusinessTrip
                })
            }
        }

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

        if (errorSearchApprovedLeave !== prevProps.errorSearchApprovedLeave) {
            if (!stringIsEmpty(errorSearchApprovedLeave)) {
                this.setState({
                    errorSearch: errorSearchApprovedLeave,
                    flagSearch: true,
                })
            }
        }
        if (errorSearchApprovedBusinessTrip !== prevProps.errorSearchApprovedBusinessTrip) {
            if (!stringIsEmpty(errorSearchApprovedBusinessTrip)) {
                this.setState({
                    errorSearch: errorSearchApprovedBusinessTrip,
                    flagSearch: true,
                })
            }
        }
        if (errorSearchApprovedOverTimeApplication !== prevProps.errorSearchApprovedOverTimeApplication) {
            if (!stringIsEmpty(errorSearchApprovedOverTimeApplication)) {
                this.setState({
                    errorSearch: errorSearchApprovedOverTimeApplication,
                    flagSearch: true,
                })
            }
        }
        if (errorSearchApprovedLogTMSApplication !== prevProps.errorSearchApprovedLogTMSApplication) {
            if (!stringIsEmpty(errorSearchApprovedLogTMSApplication)) {
                this.setState({
                    errorSearch: errorSearchApprovedLogTMSApplication,
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


        if (dataTypesLeave !== prevProps.dataTypesLeave) {
            if (!objectIsNull(dataTypesLeave)) {
                this.mapData(dataTypesLeave, 'LeaveTypeID')
            }
        }
        if (dataListStatusApplication !== prevProps.dataListStatusApplication) {
            if (!objectIsNull(dataListStatusApplication)) {
                this.mapData(dataListStatusApplication, 'Status')
            }
        }

        // if (dataSearchLogTMSApplication !== prevProps.dataSearchLogTMSApplication) {
        //     this.setState({
        //         dataSearch: !arrayIsEmpty(dataSearchLogTMSApplication) ? dataSearchLogTMSApplication : []
        //     })
        // }

        // if (dataSearch !== prevProps.dataSearch) {
        //     this.setState({
        //         dataSearch: !arrayIsEmpty(dataSearch) ? dataSearch : []
        //     })
        // }

        // if (dataSearchBusinessTrip !== prevProps.dataSearchBusinessTrip) {
        //     this.setState({
        //         dataSearch: !arrayIsEmpty(dataSearchBusinessTrip) ? dataSearchBusinessTrip : []
        //     })
        // }

        // if (dataSearchOverTimeApplication !== prevProps.dataSearchOverTimeApplication) {
        //     this.setState({
        //         dataSearch: !arrayIsEmpty(dataSearchOverTimeApplication) ? dataSearchOverTimeApplication : []
        //     })
        // }



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
                        EmpName: '',
                        ViewEmpID: '',
                        Status: '1',

                    }
                    for (let item of this.state.form) {
                        if (item.tag === 'LeaveTypeID') {
                            inputLeave.LeaveTypeID = item.value
                        } else if (item.tag === 'Name') {
                            inputLeave.EmpName = item.value
                        } else if (item.tag === 'Status') {
                            inputLeave.Status = item.value
                        } else if (item.control === 'twoDatePicker') {
                            inputLeave.FromDate = item.value1
                            inputLeave.ToDate = item.value2
                        }
                    }
                    // console.log('searchLeaveApplication - inputLeave : ', inputLeave)
                    this.props.searchApprovedLeaveApplicationAction([inputLeave])
                    break
                case '11':
                    let inputBusinessTrip = {
                        FromDate: '',
                        ToDate: '',
                        Status: '',
                        Rule: '',
                        EmpName: ''

                    }
                    for (let item of this.state.form) {
                        if (item.control === 'twoDatePicker') {
                            inputBusinessTrip.FromDate = item.value1
                            inputBusinessTrip.ToDate = item.value2
                        } else if (item.tag === 'Name') {
                            inputBusinessTrip.EmpName = item.value
                        } else if (item.tag === 'BusinessTripType') {
                            inputBusinessTrip.Rule = item.value
                        } else if (item.tag === 'Status') {
                            inputBusinessTrip.Status = item.value
                        }
                    }
                    // console.log('searchBusinessTrip: ', inputBusinessTrip)
                    this.props.searchApprovedBusinessTripApplicationAction([inputBusinessTrip])
                    break

                case '3':
                    let inputOverTime = {
                        FromDate: '',
                        ToDate: '',
                        Status: '',
                        EmpName: '',
                    }
                    for (let item of this.state.form) {
                        if (item.control === 'twoDatePicker') {
                            inputOverTime.FromDate = item.value1
                            inputOverTime.ToDate = item.value2
                        } else if (item.tag === 'StatusOverTime') {
                            inputOverTime.Status = item.value
                        } else if (item.tag === 'Name') {
                            inputOverTime.EmpName = item.value
                        }
                    }
                    // console.log('searchOverTime: ', inputOverTime)
                    this.props.searchApprovedOverTimeApplicationAction([inputOverTime])

                    break
                case '75':
                    let inputLogTMS = {
                        FromDate: '',
                        ToDate: '',
                        List1: '',
                        List2: '',
                        List3: '',
                    }
                    for (let item of this.state.form) {
                        // if (item.control === 'twoComboboxForm') {
                        //     inputLogTMS.MonthYear = ('0' + item.value1).substr(-2) + '/' + item.value2
                        // } else 
                        if (item.tag === 'AdjustmentStatus') {
                            inputLogTMS.List1 = item.value
                        } else if (item.tag === 'FingerPrintRecord') {
                            inputLogTMS.List2 = item.value
                        } else if (item.tag === 'ApprovalStatus') {
                            inputLogTMS.List3 = item.value
                        } else if (item.control === 'twoDatePicker') {
                            inputLogTMS.FromDate = item.value1
                            inputLogTMS.ToDate = item.value2
                        }
                    }
                    // console.log('inputLogTMSSSSSSSSS: ', inputLogTMS)
                    this.props.searchApprovedLogTMSApplicationAction([inputLogTMS])
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
                    <Text> Số giờ OT ban ngày</Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ width: Sizes.s30, height: Sizes.s30, borderRadius: Sizes.s15, backgroundColor: colorApplication.nightStatusOT }}>

                    </View>
                    <Text> Số giờ OT ban đêm</Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ width: Sizes.s30, height: Sizes.s30, borderRadius: Sizes.s15, backgroundColor: colorApplication.replaceStatusOT }}>

                    </View>
                    <Text> Số giờ đăng ký nghỉ bù</Text>
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
            // fetchingSearch,
            // fetchingSearchBusinessTrip,
            // fetchingSearchOverTimeApplication,
            // fetchingSearchLogTMSApplication,
            fetchingSearchApprovedBusinessTrip,
            fetchingSearchApprovedOverTimeApplication,
            fetchingSearchApprovedLogTMSApplication,
            fetchingSearchApprovedLeave,

        } = this.props
        const { dataTypeApplication, selectedItem, dataSearch, errorSearch, flagSearch } = this.state
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
                <CustomHeader
                    typeIconLeft={'back'}
                    title={userProfile.LangID === 'VN' ? 'Tìm kiếm đơn chờ duyệt' : 'Approve application search'}
                    onPressLeft={() => { this.props.navigation.goBack() }}
                />
                <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
                    {(fetchingDateInfo || fetchingApprover || fetchingCalculate || fetchingSave) && <Loading />}
                    <View style={{ flex: 1, padding: Sizes.s30 }}>

                        {/* <Text style={{ fontSize: Sizes.h30, color: colorForm.labelForm, marginVertical: Sizes.s10 }}>Loại đơn</Text> */}
                        <ComboboxForm tempCaption={userProfile.LangID === 'VN' ? 'Loại đơn' : 'Application type'} onSelectedItemCombobox={this.onSelectedItemCombobox} selectedItem={selectedItem} items={dataTypeApplication} />
                        <FormDetail ref='form' form={this.state.form} />
                        <CustomButton onPress={this.onPressSubmit} type='search' title={userProfile.LangID === 'VN' ? 'Tìm kiếm' : 'Search'} />
                        {!arrayIsEmpty(dataSearch) &&
                            <Text style={{ width: '100%', textAlign: 'right', fontSize: Sizes.h30, marginVertical: Sizes.s10 }}><Text style={{ color: colorHome.colorTitle }}>{dataSearch.length}</Text> kết quả </Text>
                        }
                        {!objectIsNull(selectedItem) && selectedItem.id === '3' &&
                            this.noteStatusOT()
                        }
                        {
                            (fetchingSearchApprovedBusinessTrip || fetchingSearchApprovedOverTimeApplication || fetchingSearchApprovedLogTMSApplication || fetchingSearchApprovedLeave) ?
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
                                                        typeApplication={'approveApplication'}
                                                        {...this.props}
                                                    />
                                                )
                                            }}
                                        />
                                    )
                        }
                    </View>
                </ScrollView>

            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({

})