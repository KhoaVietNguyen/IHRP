// MinhNC15

import React from 'react';
import { Button, Image, View, Text, StyleSheet, ScrollView, TextInput, KeyboardAvoidingView, TouchableOpacity, Platform, Alert, ImageBackground, TouchableHighlight, Dimensions} from 'react-native';
import { Sizes } from '@dungdang/react-native-basic';
import { SafeAreaView } from 'react-navigation';
import { CustomButton } from '../custom/CustomButton';
import CustomHeader from '../custom/CustomHeader';
import {CustomControlTab} from '../custom/CustomControlTab'
import { SIGNIN_ERROR } from '../../redux/actions/actionTypes';
import Loading from '../custom/Loading'
import { arrayIsEmpty } from '@dungdang/react-native-basic/src/Functions';
import ComboboxForm from '../custom/functionForm/ComboboxForm'
import { userProfile } from '../../config/settings'

export default class SalaryScreen extends React.Component{
    constructor(props) {
        super(props) 
        this.state = {
            selectedIndex: false,
            isShowPeriod: false,
            payListView:{},
            payslipViewDetail: [],
            renderPayslipViewDetail: [],
            listPeriod:[],
            salaryHistoryOb:{},
            salaryHistory:[],
            isShowHistory: false,
            isGetPayslipSuccess: false,
            isGetPayslipViewSuccess: false,
            isGetSalaryHistorySuccess: false,
        }
    }

    onPressChangePeriod() {
        this.setState(prevState => ({
            isShowPeriod: !prevState.isShowPeriod 
        }))
        alert('change period')
        // alert(`${this.getPeriod()}`)
    }

    showPayslipViewDetail() {
        if ( !arrayIsEmpty(this.state.payslipViewDetail) ) {
            let i = 0
            for(let item of this.state.payslipViewDetail){
                // console.log('item + ' + i + ': ', item)
                i++
            }
        }
    }
    // tab bên trái CustomControlTab: Phiếu lương
    onPressPayslip() {
        const { listPeriod, isGetPayslipSuccess } = this.state
        return (
            (isGetPayslipSuccess === false && this.props.fetchingRequester !== null && this.props.fetchingRequester === false )
            ?
            <View style={{alignItems: 'center'}}>
                <Image 
                    source={require('../../res/icon/img_empty_data.png')}
                    style={{width: Sizes.s260*2, height: Sizes.s260*2}}
                />
                <Text style={styles.textNoData}>{userProfile.LangID === 'VN' ? 'Không có dữ liệu' : 'Data is empty'}</Text>
            </View>
            :
            <View>
                <ImageBackground
                    // style={{borderRadius: 10, backgroundColor: 'red', alignSelf: 'center'}} 
                    // style={{height: (width - Sizes.s60) * (280 / 640), marginHorizontal:Sizes.s20}}
                    style={{ marginHorizontal:Sizes.s20}}
                    imageStyle={{ borderRadius: 10 }}
                    source={require('../../res/icon/bg_phieuluong_1.png')}
                >
                    <Text style={styles.textNamePayslip}>{this.state.payListView.item1}</Text>
                    <View style={{marginHorizontal: Sizes.s20, marginTop: Sizes.s10,}}>
                        <Text style={styles.textPayslip}>{userProfile.LangID === 'VN' ? 'Lương thực nhận' : 'Real salary'}</Text>
                        <Text style={styles.numberSalaryPayslip}>{this.state.payListView.item2}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: Sizes.s20, marginTop: Sizes.s10}}>
                        <View>
                        <Text style={styles.textPayslip}>{userProfile.LangID === 'VN' ? 'Kỳ tính lương' : 'Pay period'}</Text>
                        {/* <TouchableOpacity 
                            style={{ flexDirection: 'row'}}
                            onPress={() => this.onPressChangePeriod()}
                        >
                            <Text style={styles.textPayslip}>{this.state.payListView.item3}</Text>
                            <Image 
                                source={require('../../res/icon/ic_dropdownwhite.png')}
                                style={{width: Sizes.s50, height: Sizes.s50}}
                            />
                        </TouchableOpacity> */}
                        {/* combobox: khi chọn 1 giá trị thì sẽ gọi API để hiển thị phiếu lương tương ứng */}
                        <ComboboxForm 
                            onSelectedItemCombobox={(value) => this.props.getPayslipViewAction({F: "1", F1: value.label})} 
                            selectedItem={listPeriod[0]} 
                            items={listPeriod} 
                            typeCombobox={"simple"}
                        />
                        </View>  
                        <View>
                            <Image 
                                source={require('../../res/icon/ic_money.png')}
                                style={{width: Sizes.s100, height: Sizes.s100, margin: Sizes.s10}}
                            />
                        </View>  
                    </View>                   
                </ImageBackground>
                {this.showPayslipViewDetail()}
            </View>
        )
    }
    // tab bên phải CustomControlTab: Quá trình lương
    onPressSalaryHistory() {
        const { salaryHistory, salaryHistoryOb, isShowHistory } = this.state
        return (
            <View 
                style={{
                    // height: (width - Sizes.s60) * (280 / 640), 
                    marginHorizontal:Sizes.s20, 
                    borderWidth: 1,
                    borderColor: 'lightgrey',
                    borderRadius: 10,
                    backgroundColor: 'white'
                }}
            >
                <TouchableOpacity 
                    onPress={() => {this.setState({ isShowHistory: !this.state.isShowHistory })}}
                    activeOpacity={0.5}
                >
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Image 
                                source={require('../../res/icon/private_list_ic31.png')}
                                style={{width: Sizes.s80, height: Sizes.s80, margin: Sizes.s10}}
                            />
                            <Text style={styles.numberSalaryHistory}>{userProfile.LangID === 'VN' ? salaryHistoryOb[`002_#private_list_ic31^0`] : salaryHistoryOb[`002_#private_list_ic31^0`]}</Text>
                        </View>
                        <View>
                            <Image 
                                source={this.state.isShowHistory === false ? require('../../res/icon/ic_zoom_out.png') : require('../../res/icon/ic_zoom_in.png')}
                                style={{width: Sizes.s70, height: Sizes.s70, margin: Sizes.s10}}
                            />
                        </View>
                    </View>
                    <Text style={styles.textHistory}>{userProfile.LangID === 'VN' ? 'Ngày hiệu lực' : 'Effective date'}</Text>
                    <Text style={styles.numberHistory}>{userProfile.LangID === 'VN' ? salaryHistoryOb[`004_Ngày hiệu lực^0`] : salaryHistoryOb[`004_Effective date^0`]}</Text>
                    <Text style={styles.textHistory}>{userProfile.LangID === 'VN' ? 'Ngày thực tế' : 'Actual date'}</Text>
                    <Text style={styles.numberHistory}>{userProfile.LangID === 'VN' ? salaryHistoryOb[`006_Ngày thực tế^0`] : salaryHistoryOb[`006_Actual date^0`]}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    getPeriod = () => {
        const { listPeriod, salaryHistory} = this.state
        const {dataRequester, dataSalaryHistory} = this.props
        if(!arrayIsEmpty(dataRequester)){
            // for(let i = 0; i < dataRequester.length; i++){
            //     listPeriod.push(
            //         dataRequester[0].month
            //     )
            // }
            let data = dataRequester.map((value) => {
                // return value
                return {
                    id: value.month,
                    label: value.month,
                    value: value,
                    isSelect: false,
                    type: undefined,
                }
            })
            //map reduce filter
            if(!arrayIsEmpty(data)){
                this.setState({
                    listPeriod: data
                }, () => {
                    // console.log("payslipView---dataa---", data)
                    // console.log("listPeriod", this.state.listPeriod)
                    // console.log("listPeriod[0]", this.state.listPeriod[0].label)
                })
            }
        }
    }

    getSalaryHistory = () => {
        const { listPeriod, salaryHistory} = this.state
        const {dataRequester, dataSalaryHistory} = this.props
        if(!arrayIsEmpty(dataSalaryHistory)) {
            // console.log("[DEBUG-dataSalaryHistory-----]", dataSalaryHistory)
            let data = dataSalaryHistory.map((value) => {
                // return value
                return {
                    item1: value['002_#private_list_ic31^0'],
                    item2: value['004_Ngày hiệu lực^0'],
                    item3: value['006_Ngày thực tế^0'],
                    item4: value['008_Ngày kết thúc^0'],
                }
            })
            //map reduce filter
            if(!arrayIsEmpty(data)){
                this.setState({
                    salaryHistory: data
                }, () => {
                    // console.log("salaryHistory---dataa---", data)
                    // console.log("salaryHistory", this.state.salaryHistory)
                    // console.log("listPeriod[0]", this.state.listPeriod[0].label)
                })
            }
        }
    }

    async componentDidUpdate(prevProps, prevState) {
        const { 
            listPeriod, 
            salaryHistory, 
            isGetPayslipSuccess, 
            isGetPayslipViewSuccess, 
            payslipViewDetail,
            countTitle,
        } = this.state
        const { 
            dataPayslipViewDetail,

            errorRequester, 
            errorPayslipView,
            errorSalaryHistory,
            errorPayslipViewDetail,
        } = this.props
        if (prevProps.dataRequester !== this.props.dataRequester && this.props.dataRequester !== null)
        {
            this.getPeriod()
            this.setState({
                isGetPayslipSuccess: true
            })
            this.props.getPayslipViewAction({F: "1", F1: listPeriod[0]})
            this.props.getPayslipViewDetailAction({F: "2", F1: listPeriod[0]})
        } else if (this.props.dataRequester === null)
        {
            // this.setState({
            //     isGetPayslipSuccess: false
            // })
            Alert.alert('Thông báo', 'Không có dữ liệu', [{ text: 'Đóng', onPress: () => { } }])
        }

        if (prevProps.dataPayslipView !== this.props.dataPayslipView && this.props.dataPayslipView !== null)
        {
            for(let item of this.props.dataPayslipView){
                this.setState({
                    payListView:item
                })
            }
        } else if (this.props.dataPayslipView === null)
        {
            Alert.alert('Thông báo', 'Không có dữ liệu', [{ text: 'Đóng', onPress: () => { } }])
        }

        if (prevProps.dataPayslipViewDetail !== this.props.dataPayslipViewDetail && this.props.dataPayslipViewDetail !== null)
        {
            let countTitle = 0
            let countTitleArray = []
            for(let item of this.props.dataPayslipViewDetail){
                if(item.grade === '1') {
                    // payslipViewDetail.push(item)
                    countTitle++
                    countTitleArray.push(countTitle)
                }
            }
            // console.log('[DEBUG-countTitle------]', countTitle)
            // console.log('[DEBUG-countTitleArray------]', countTitleArray)
            let array = countTitleArray.map((value) => {
                return {
                    id: value,
                    grade1: [],
                    data: [],
                }
            })
            if(!arrayIsEmpty(array)) {
                await this.setState({
                    payslipViewDetail: array
                }, () => {
                    let temp = -1
                    let arr = this.state.payslipViewDetail
                    for(let item of this.props.dataPayslipViewDetail){
                    
                    if(item.grade === '1') 
                    {
                        ++temp
                        arr[temp].grade1.push(item)
                    } else if (item.grade === '2' || item.grade === '3') 
                    {
                        arr[temp].data.push(item)
                    } 
                    }
                    this.setState({
                    payslipViewDetail: arr
                }, () => {
                    // console.log('33333: ', this.state.payslipViewDetail)
                    let renderPSVD = this.state.payslipViewDetail.map((value) => {
                        // console.log('31. 3131313131313131313131313: ', value)   
                        return (
                            <View>
                                <PayslipViewDetailItem value={value}></PayslipViewDetailItem>
                            </View>
                        )     
                    })
                    this.setState({
                        renderPayslipViewDetail: renderPSVD
                    }, () => {
                    })
                })

                }
                )
            }
        } else if (this.props.dataPayslipViewDetail === null)
        {
            Alert.alert('Thông báo', 'Không có dữ liệu', [{ text: 'Đóng', onPress: () => { } }])
        }

        if (prevProps.dataSalaryHistory !== this.props.dataSalaryHistory && this.props.dataSalaryHistory !== null) 
        {
            this.getSalaryHistory()
            for(let item of this.props.dataSalaryHistory){
                this.setState({
                    salaryHistoryOb:item
                })
            }
        } else if (this.props.dataSalaryHistory === null)
        {
            Alert.alert('Thông báo', 'Không có dữ liệu', [{ text: 'Đóng', onPress: () => { } }])
        }

        if (errorRequester !== prevProps.errorRequester) {
            if (errorRequester !== undefined) {
                Alert.alert('Thông báo', errorRequester + '', [
                    {
                        text: 'Đóng',
                        onPress: () => { }
                    }
                ])
            }
        }

        if (errorPayslipView !== prevProps.errorPayslipView) {
            if (!stringIsEmpty(errorPayslipView)) {
                Alert.alert('Thông báo', errorPayslipView, [
                    {
                        text: 'Đóng',
                        onPress: () => { }
                    }
                ])
            }
        }

        if (errorSalaryHistory !== prevProps.errorSalaryHistory) {
            if (!stringIsEmpty(errorSalaryHistory)) {
                Alert.alert('Thông báo', errorSalaryHistory, [
                    {
                        text: 'Đóng',
                        onPress: () => { }
                    }
                ])
            }
        }

        if (errorPayslipViewDetail !== prevProps.errorPayslipViewDetail) {
            if (!stringIsEmpty(errorPayslipViewDetail)) {
                Alert.alert('Thông báo', errorPayslipViewDetail, [
                    {
                        text: 'Đóng',
                        onPress: () => { }
                    }
                ])
            }
        }
        // console.log('[DEBUG-SalaryScreen-didupdate-payslipViewDetail1111] ', this.state.payslipViewDetail)
    }

    render() {
        const { selectedIndex, listPeriod } = this.state
        return(
            <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
                {/* <Loading /> */}
                {(this.props.fetchingPayslipView || this.props.fetchingSalaryHistory ) && <Loading />}
                <View style={styles.body}>
                    <CustomHeader
                        typeIconLeft={'back'}
                        title = {userProfile.LangID === 'VN' ? 'Thông tin lương' : 'Salary'}
                        onPressLeft={() => { this.props.navigation.goBack() }}
                    />
                    <CustomControlTab
                        titleLeft = {userProfile.LangID === 'VN' ? 'Phiếu lương' : 'Payslip'}
                        titleRight = {userProfile.LangID === 'VN' ? 'Quá trình lương' : 'Salary History'}
                        backgroundColorLeft = {this.state.selectedIndex ? '#E1E1E1' : '#FFFFFF'}
                        backgroundColorRight = {this.state.selectedIndex ? '#FFFFFF' : '#E1E1E1'}
                        colorLeft = {this.state.selectedIndex ? '#707070' : '#4F83DE'}
                        colorRight = {this.state.selectedIndex ? '#4F83DE' : '#707070'}
                        onPressLeft = {(value) => {this.setState({selectedIndex: value})}}
                        onPressRight = {(value) => {this.setState({selectedIndex: value})}}
                    />      
                </View>
                <ScrollView style={{flex: 1, flexGrow: 1}}>
                {/* choose tab to show             */}
                {this.state.selectedIndex ? this.onPressSalaryHistory() : this.onPressPayslip()}
                {this.state.selectedIndex ? null : this.state.renderPayslipViewDetail}
                </ScrollView>
            </SafeAreaView>
        )
    }
}

// class PayslipViewDetailItem render dữ liệu với style tương ứng với từng grade của dữ liệu trả về
class PayslipViewDetailItem extends React.Component {
    constructor(props) {
        super(props) 
        this.state = {
            isShowDetail: false,
        }
    }
    render() {
        return(
            <View style={{
                backgroundColor: 'white',
                borderRadius: 10, 
                marginTop: 5, 
                marginHorizontal: Sizes.s25,
                marginVertical: Sizes.s20,
                // borderWidth: 1,
                shadowColor: 'rgba(0, 0, 0, 0.5 )',
                shadowOffset: {width: 0, height: 2},
                shadowRadius: Sizes.h5,
                shadowOpacity: 0.8,
                elevation: 4,
            }}
            >
                <TouchableOpacity 
                    activeOpacity={1}
                    style={{
                        flex: 1
                    }}
                    onPress={() => {this.setState({ isShowDetail: !this.state.isShowDetail })}}
                >
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                        <Text style={{fontSize: Sizes.h30, fontWeight: 'bold', color: '#4184FF', marginHorizontal: Sizes.s15, marginVertical: 15}}>
                            {this.props.value.grade1[0].item}
                        </Text>
                        <Image 
                                source={this.state.isShowDetail === false ? require('../../res/icon/ic_zoom_out.png') : require('../../res/icon/ic_zoom_in.png')}
                                style={{width: Sizes.s50, height: Sizes.s50}}
                        />
                    </View>
                    {this.props.value.data.map((item) => {
                        return(
                            <View style={{width: '100%'}}>
                                {
                                    this.state.isShowDetail === false
                                    ?
                                    <View></View>
                                    :
                                    item.grade === '2' ? 
                                    (
                                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                            <Text 
                                                style={{
                                                    fontSize: Sizes.h30,   
                                                    fontWeight: 'bold', 
                                                    color: 'black', 
                                                    marginHorizontal: Sizes.s25, 
                                                    width: width / 2
                                                }}
                                                numberOfLines={2}
                                            >
                                                {item.item}
                                            </Text>
                                            <Text 
                                                style={{
                                                    fontSize: Sizes.h30, 
                                                    fontWeight: 'bold', 
                                                    color: '#4184FF', 
                                                    marginHorizontal: Sizes.s25, 
                                                }}
                                            >
                                                {item.value}
                                            </Text>
                                        </View>
                                    )    
                                    : item.grade === '3' ? 
                                    (
                                        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginVertical: Sizes.s10}}>
                                            <Text 
                                                style={{fontSize: Sizes.h30, color: '#b9b9b9', marginHorizontal: Sizes.s40, width: width / 2}}
                                                numberOfLines={2}
                                            >
                                                {item.item}</Text>
                                            <Text style={{fontSize: Sizes.h30, fontWeight: 'bold', color: '#4184FF', marginHorizontal: Sizes.s25, }}>{item.value}</Text>
                                        </View>
                                    )
                                    :
                                    null
                                }
                            </View>
                        )
                    })}
                </TouchableOpacity>
            </View>
        )
    }
}

const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
    body: {
        alignItems: 'center'
    },
    textNamePayslip: {
        color: 'white',
        fontSize: Sizes.h44,
        marginHorizontal: Sizes.s20,
        marginTop: Sizes.s10,
        fontWeight: 'bold'
    },
    textPayslip: {
        color: 'white',
        fontSize: Sizes.h30,
    },
    numberSalaryPayslip: {
        color: 'white',
        fontSize: Sizes.h44,
        fontWeight: 'bold'
    },
    numberSalaryHistory: {
        color: '#4184FF'
    },
    textHistory: {
        marginHorizontal: 30,
        color: '#b9b9b9'
    },
    numberHistory: {
        marginHorizontal: 30
    },
    textNoData: {
        fontSize: Sizes.h40,
        color: '#4184FF'
    }
})
