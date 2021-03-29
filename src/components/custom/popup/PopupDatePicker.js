import * as React from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Modal,
    TouchableWithoutFeedback,
    Dimensions,
    TextInput,
    FlatList,
    ActivityIndicator,
    ScrollView,
    Image,
} from 'react-native'
import Sizes from './styles/fontStyles'
import Icon from "react-native-vector-icons/FontAwesome5";
// import { Sizes } from '@dungdang/react-native-basic'
import { iconStr } from '../../../res/values/strings/iconStr'
import { userProfile } from '../../../config/settings';

const colorDefault = '#4E8DFF'
export default class PopupDatePicker extends React.Component {


    constructor(props) {
        super(props)
        this.state = {
            visiblePopup: false,
            // data: this.props.items,
            // defaultData: this.props.items,
            inputSearch: '',
            defaultPlaceHolder: '',
            dataDateTime: this.createDefaultDateData(),

            scrollDay: 0,
            heightDay: 0,
            selectedDay: 1,

            scrollMonth: 0,
            heightMonth: 0,
            selectedMonth: 1,

            scrollYear: 0,
            indexScrollYear: 0,
            heightYear: 0,
            selectedYear: new Date().getFullYear(),

            visibleIndicator: true,
            visibleSelectYear: false,
            visibleSelectMonth: false,
        }
    }
    getDay() {
        let d = new Date()

        return d.getDate()
    }
    getMonth() {
        let m = new Date()
        return m.getMonth()
    }
    getYear() {
        let y = new Date()
        return y.getFullYear()
    }
    getDate(day, month, year) {
        let d = ("0" + day).substr(-2)
        let m = ("0" + month).substr(-2)
        return d + '/' + m + '/' + year
    }
    calculateDayIsMonth(month, year) {
        let monthStart = new Date(year, month - 1, 1)
        let monthEnd = new Date(year, month, 1)
        return Math.round((monthEnd - monthStart) / (1000 * 60 * 60 * 24))
    }
    calculateDayPrevMonth(startMonth) {
        let d = startMonth.getDay()
        let arr = []
        let index = 0
        for (let i = d - 1; i >= 0; i--) {
            // let prevDay = startMonth.getDate() - ((index * -1) + 1)
            let date = new Date(startMonth.getFullYear(), startMonth.getMonth(), index)
            arr.push({ key: index + '', value: date.getDate(), visible: true })
            index--
        }
        return arr
    }
    calculateDayNextMonth(endMonth) {
        let d = endMonth.getDay()
        let arr = []
        let index = 1
        for (let i = d + 1; i <= 6; i++) {
            let nextDay = endMonth.getDate() + index
            let date = new Date(endMonth.getFullYear(), endMonth.getMonth(), nextDay)
            arr.push({ key: (endMonth.getDate() + index) + '', value: date.getDate(), visible: true })
            index++
        }
        return arr
    }

    createDefaultDateData() {

        var d = []
        var m = []
        var y = []
        for (let i = 0; i < 31; i++) {
            d.push({ key: i, value: i + 1, visible: false })
            if (i < 12) {
                m.push({ key: i + '', value: i + 1 })
            }
        }
        for (let i = 0; i <= 130; i++) {
            y.push({ key: i + '', value: 2030 - i })
        }
        return { day: d, month: m, year: y }


    }

    componentDidUpdate(prevProps, prevState) {


        if (this.state.selectedMonth !== prevState.selectedMonth) {
            let dayIsMonth = this.calculateDayIsMonth(this.state.selectedMonth, this.state.selectedYear)
            let arrDay = []
            for (let i = 1; i <= dayIsMonth; i++) {
                arrDay.push({ key: i + '', value: i, visible: false })
            }

            let startMonth = new Date(this.state.selectedYear, this.state.selectedMonth - 1, 1)
            let endMonth = new Date(this.state.selectedYear, this.state.selectedMonth - 1, dayIsMonth)
            let arrDayPrevMonth = this.calculateDayPrevMonth(startMonth)

            let arrDayNextMonth = this.calculateDayNextMonth(endMonth)

            let newArr = arrDayPrevMonth.concat(arrDay)

            let arr = this.state.dataDateTime
            arr.day = newArr.concat(arrDayNextMonth)

            // let arr = this.state.dataDateTime
            // arr.day = arrDay
            this.setState({
                dataDateTime: arr,
                selectedDay: dayIsMonth < this.state.selectedDay ? dayIsMonth : this.state.selectedDay,
                scrollDay: dayIsMonth < this.state.selectedDay ? (arrDay.length - 1) : this.state.scrollDay,
            })
        }
        if (this.state.selectedYear !== prevState.selectedYear) {
            let dayIsMonth = this.calculateDayIsMonth(this.state.selectedMonth, this.state.selectedYear)
            let arrDay = []

            for (let i = 1; i <= dayIsMonth; i++) {
                arrDay.push({ key: i + '', value: i, visible: false, })
            }
            let startMonth = new Date(this.state.selectedYear, this.state.selectedMonth, 1)
            let endMonth = new Date(this.state.selectedYear, this.state.selectedMonth, dayIsMonth)
            let arrDayPrevMonth = this.calculateDayPrevMonth(startMonth)
            let arrDayNextMonth = this.calculateDayNextMonth(endMonth)
            let arr = this.state.dataDateTime

            let newArr = arrDayPrevMonth.concat(arrDay)
            arr.day = newArr.concat(arrDayNextMonth)

            // let arr = this.state.dataDateTime
            // arr.day = arrDay
            this.setState({
                dataDateTime: arr,
                selectedDay: dayIsMonth < this.state.selectedDay ? dayIsMonth : this.state.selectedDay,
                scrollDay: dayIsMonth < this.state.selectedDay ? (arrDay.length - 1) : this.state.scrollDay,
            })
        }
    }
    onChangeVisiblePopup(visible) {
        this.setState({ visiblePopup: visible })
    }
    onChangeText(text) {
        this.setState({
            inputSearch: text
        }, () => {
            if (text.trim() === '') {
                this.setState({ data: this.state.defaultData })
            } else {
                let arr = []
                const data = this.state.defaultData
                let i = 0
                for (let item of data) {
                    var position = item.label.normalize().search(text.normalize())
                    if (position > -1) {
                        arr.push(item)
                    }
                }
                this.setState({ data: arr })
            }
        })
    }
    onPressItem = (item) => {
        // this.props.onValueChange(item)
    }
    setDefaultDate() {
        let d = this.getDay()
        let m = this.getMonth()
        let y = this.getYear()

        let date = new Date(this.props.date)
        if (date.toDateString().normalize() === 'Invalid Date'.normalize()) {

        } else {
            d = date.getDate()
            m = date.getMonth()
            y = date.getFullYear()
        }



        const { day, month, year } = this.state.dataDateTime
        let dIndex = day.filter((item) => {
            return (item.value === d && !item.visible)
        })
        let mIndex = month.filter((item) => {
            return item.value === m + 1
        })
        let yIndex = year.filter((item) => {
            return item.value === y
        })

        this.setState({
            selectedDay: dIndex.length > 0 ? dIndex[0].value : 1,
            scrollDay: dIndex.length > 0 ? parseInt(dIndex[0].key) : 0,

            selectedMonth: mIndex.length > 0 ? mIndex[0].value : 1,
            scrollMonth: mIndex.length > 0 ? parseInt(mIndex[0].key) : 0,

            selectedYear: yIndex.length > 0 ? yIndex[0].value : 1,
            scrollYear: yIndex.length > 0 ? parseInt(yIndex[0].key) : 0,

        }, () => {
            let dayIsMonth = this.calculateDayIsMonth(this.state.selectedMonth, this.state.selectedYear)
            let arrDay = []
            for (let i = 1; i <= dayIsMonth; i++) {
                arrDay.push({ key: i + '', value: i, visible: false })
            }

            let startMonth = new Date(this.state.selectedYear, this.state.selectedMonth - 1, 1)
            let endMonth = new Date(this.state.selectedYear, this.state.selectedMonth - 1, dayIsMonth)
            let arrDayPrevMonth = this.calculateDayPrevMonth(startMonth)

            let arrDayNextMonth = this.calculateDayNextMonth(endMonth)

            let newArr = arrDayPrevMonth.concat(arrDay)

            let arr = this.state.dataDateTime
            arr.day = newArr.concat(arrDayNextMonth)

            // let arr = this.state.dataDateTime
            // arr.day = arrDay
            this.setState({
                dataDateTime: arr,
                selectedDay: dayIsMonth < this.state.selectedDay ? dayIsMonth : this.state.selectedDay,
                scrollDay: dayIsMonth < this.state.selectedDay ? (arrDay.length - 1) : this.state.scrollDay,
            })
        })
    }
    componentDidMount() {
        this.setDefaultDate()
    }
    scrollFlatListToIndex() {
        this.dayFlatList.scrollToIndex({ animated: true, index: 17 })
    }

    scrollDayToIndex() {
        const day = this.state.scrollDay
        this.dayFlatList.scrollToIndex({ animated: true, index: day })
    }
    scrollMonthToIndex() {
        const month = this.state.scrollMonth
        this.monthFlatList.scrollToIndex({ animated: true, index: month })
    }
    scrollYearToIndex() {
        const year = this.state.scrollYear
        this.yearFlatList.scrollToIndex({ animated: true, index: year })
    }

    renderDay() {
        let listDay = [
            {
                id: '0',
                akaVN: 'CN',
                akaEN: 'Sun',
            },
            {
                id: '2',
                akaVN: 'T2',
                akaEN: 'Mon',
            },
            {
                id: '3',
                akaVN: 'T3',
                akaEN: 'Tue',
            },
            {
                id: '4',
                akaVN: 'T4',
                akaEN: 'Wed',
            },
            {
                id: '5',
                akaVN: 'T5',
                akaEN: 'Thu',
            },
            {
                id: '6',
                akaVN: 'T6',
                akaEN: 'Fri',
            },
            {
                id: '7',
                akaVN: 'T7',
                akaEN: 'Sat',
            },

        ]
        return (
            <View style={{ width: '100%', flexDirection: 'row' }}>
                {listDay.map((value) => {
                    return (
                        <View key={value.id} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: Sizes.h30, fontWeight: 'bold', color: '#335272' }}>{userProfile.LangID === 'VN' ? value.akaVN : value.akaEN}</Text>
                        </View>
                    )
                })}
            </View>
        )
    }

    render() {
        const { visiblePopup, dataDateTime, selectedDay, selectedMonth, selectedYear } = this.state
        const { width, height } = Dimensions.get('window')
        const {
            placeholder,
            onValueChange,
            style,

            //style truyền vào
            colorBackground,
            colorTextPlaceHolder,
            colorText,
            colorButtonDropdown,
            sizeText,
            onDateChange,

            colorIconDate,
            nameIconDate,
            sizeIconDate,
        } = this.props
        // this.calculateDayIsMonth()
        // console.log('arrDaysssssss: ', this.state.dataDateTime.day)
        return (
            <View style={styles.body}>
                <TouchableOpacity onPress={() => {
                    this.onChangeVisiblePopup(true)
                }} style={[styles.styleBox, {}]}>
                    {/* <Text style={{
                        color: this.state.defaultPlaceHolder === '' ? (colorTextPlaceHolder === undefined ? '#99A4AE' : colorTextPlaceHolder) : (colorText === undefined ? 'black' : colorText),
                        fontSize: sizeText === undefined ? Sizes.h30 : sizeText
                    }}>{this.state.defaultPlaceHolder === '' ? this.props.placeholder.label : this.state.defaultPlaceHolder}</Text> */}
                    {/* <Icon color={colorIconDate === undefined ? 'black' : colorIconDate} name={nameIconDate === undefined ? 'calendar-alt' : nameIconDate} size={sizeIconDate === undefined ? Sizes.h52 : sizeIconDate} /> */}
                    <Image source={iconStr.ic_calendar} style={{ width: Sizes.s45, height: Sizes.s45 }} />
                </TouchableOpacity>
                <Modal
                    transparent={true}
                    onRequestClose={() => {
                        this.onChangeVisiblePopup(false)
                    }}
                    hardwareAccelerated={true}
                    visible={visiblePopup}
                    animationType='fade'>
                    <TouchableOpacity
                        onPress={() => {
                            this.onChangeVisiblePopup(false)
                        }}
                        style={{
                            flex: 1,
                            backgroundColor: '#00000066',
                            justifyContent: 'center',
                            alignItems: 'center',
                            // paddingHorizontal: Sizes.h30
                        }}>
                        <TouchableWithoutFeedback style={{
                            paddingHorizontal: Sizes.s20
                        }}>
                            <View style={{
                                width: '95%',
                                backgroundColor: 'white',
                                height: height * 2 / 3,
                                borderRadius: Sizes.h10,
                                // marginHorizontal: Sizes.s50,
                                // paddingHorizontal: Sizes.s20,
                                // paddingVertical: Sizes.h18
                            }}>
                                <View style={{
                                    width: '100%', flexDirection: 'row', justifyContent: 'space-between',
                                    backgroundColor: colorDefault,
                                    paddingVertical: Sizes.h10,
                                    borderTopRightRadius: Sizes.h10,
                                    borderTopLeftRadius: Sizes.h10,
                                    // paddingHorizontal: Sizes.s10
                                    // flex: 1, 
                                    // backgroundColor: 'white',
                                }}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.onChangeVisiblePopup(false)
                                        }}
                                        style={{
                                            paddingVertical: Sizes.s10,
                                            alignItems: 'flex-start',
                                            justifyContent: 'center',
                                            marginHorizontal: Sizes.h20,
                                        }}>
                                        <Text style={{ fontSize: Sizes.s35, color: 'white', }}>Hủy</Text>
                                    </TouchableOpacity>
                                    <View style={{ paddingVertical: Sizes.s10, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                        {/* <Text style={{ fontWeight: 'bold', fontSize: Sizes.s30 }}>Chọn ngày tháng </Text> */}
                                        {/* <Text style={{ fontSize: Sizes.s50, fontWeight: 'bold', alignSelf: 'center', color: 'white', }}>{this.getDate(selectedDay, selectedMonth, selectedYear)}</Text> */}

                                    </View>
                                    <TouchableOpacity
                                        onPress={() => {
                                            if (onDateChange !== undefined) {
                                                onDateChange(this.getDate(this.state.selectedDay, this.state.selectedMonth, this.state.selectedYear))
                                            }
                                            this.onChangeVisiblePopup(false)
                                        }}
                                        style={{
                                            paddingVertical: Sizes.s10,
                                            alignItems: 'flex-end',
                                            justifyContent: 'center',
                                            marginHorizontal: Sizes.h20,
                                        }}>
                                        <Text style={{ fontSize: Sizes.s35, color: 'white' }}>Xác nhận</Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={{
                                    // width: '100%',
                                    // width: '10%',
                                    // width: '40%',

                                    flexDirection: 'row',
                                    // backgroundColor: 'yellow',
                                    justifyContent: 'space-between',
                                    paddingHorizontal: Sizes.h20,
                                    // paddingVertical: Sizes.s10,
                                    alignItems: 'center'

                                }}>

                                    <View style={{
                                        flexDirection: 'row',
                                        marginVertical: Sizes.h10,
                                        marginHorizontal: Sizes.h10,
                                        alignItems: 'center',
                                        paddingHorizontal: Sizes.h10,
                                        paddingVertical: Sizes.h10
                                    }}>
                                        {!this.state.visibleSelectYear && !this.state.visibleSelectMonth &&
                                            (<TouchableOpacity
                                                onPress={() => {
                                                    if (this.state.scrollYear + 1 >= this.state.dataDateTime.year.length) {

                                                    } else {
                                                        this.setState({
                                                            selectedYear: this.state.selectedYear - 1,
                                                            scrollYear: this.state.scrollYear + 1
                                                        })
                                                    }
                                                }}
                                                style={{
                                                    marginHorizontal: Sizes.h10,
                                                    paddingHorizontal: Sizes.h22
                                                }}>
                                                {/* <Text style={{ fontSize: Sizes.s55 }}>{' <-- '}</Text> */}
                                                <Icon name='caret-left' color={colorDefault} size={Sizes.s50} />
                                            </TouchableOpacity>)
                                        }
                                        {!this.state.visibleSelectMonth ?
                                            (
                                                <TouchableOpacity
                                                    activeOpacity={this.state.visibleSelectYear ? 1 : 0}
                                                    onPress={() => {
                                                        if (!this.state.visibleSelectYear) {
                                                            this.setState({ visibleSelectYear: true })
                                                        }
                                                    }}
                                                >
                                                    <Text style={{ fontSize: Sizes.s45, fontWeight: 'bold', color: '#335272', marginHorizontal: Sizes.h10 }}>{this.state.selectedYear}</Text>
                                                </TouchableOpacity>
                                            )
                                            :
                                            (
                                                <Text style={{ fontSize: Sizes.s45, fontWeight: 'bold', color: '#335272', marginHorizontal: Sizes.h10 }}>Tháng {this.state.selectedMonth}</Text>
                                            )
                                        }


                                        {!this.state.visibleSelectYear && !this.state.visibleSelectMonth &&
                                            (
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        if (this.state.scrollYear - 1 < 0) {

                                                        } else {
                                                            this.setState({
                                                                selectedYear: this.state.selectedYear + 1,
                                                                scrollYear: this.state.scrollYear - 1
                                                            })
                                                        }

                                                    }}
                                                    style={{
                                                        marginHorizontal: Sizes.h10,
                                                        paddingHorizontal: Sizes.h22
                                                    }}>
                                                    {/* <Text style={{ fontSize: Sizes.s55 }}>{' --> '}</Text> */}
                                                    <Icon name='caret-right' color={colorDefault} size={Sizes.s50} />
                                                </TouchableOpacity>
                                            )
                                        }

                                    </View>
                                    {(this.state.visibleSelectYear || this.state.visibleSelectMonth) && (<TouchableOpacity onPress={() => { this.setState({ visibleSelectYear: false, visibleSelectMonth: false, }) }}><Icon name='calendar-alt' size={Sizes.s50} color={colorDefault} /></TouchableOpacity>)}
                                    {!this.state.visibleSelectYear && !this.state.visibleSelectMonth &&
                                        (
                                            <View style={{
                                                flexDirection: 'row',
                                                // justifyContent: 'space-between',
                                                alignItems: 'center',
                                                paddingHorizontal: Sizes.h10,
                                                paddingVertical: Sizes.h10,
                                                marginVertical: Sizes.h10,
                                                marginHorizontal: Sizes.h10,
                                            }}>

                                                <TouchableOpacity
                                                    style={{ paddingHorizontal: Sizes.h22, }}
                                                    onPress={() => {
                                                        // this.setState({
                                                        //     selectedMonth: this.state.selectedMonth - 1
                                                        // })
                                                        if (this.state.selectedMonth - 1 <= 0) {
                                                            this.setState({
                                                                selectedMonth: 12
                                                            })
                                                        } else {
                                                            this.setState({
                                                                selectedMonth: this.state.selectedMonth - 1
                                                            })
                                                        }
                                                    }}
                                                >
                                                    <Icon name='caret-left' color={colorDefault} size={Sizes.s50} />
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        if (!this.state.visibleSelectMonth) {
                                                            this.setState({ visibleSelectMonth: true })
                                                        }
                                                    }}
                                                    style={{ padding: Sizes.s10, justifyContent: 'center', alignItems: 'center' }}>
                                                    <Text style={{ fontSize: Sizes.s40, paddingHorizontal: Sizes.h10, color: '#335272', fontWeight: 'bold' }}>Tháng {this.state.selectedMonth}</Text>
                                                </TouchableOpacity>

                                                <TouchableOpacity
                                                    style={{ paddingHorizontal: Sizes.h22 }}
                                                    onPress={() => {
                                                        if (this.state.selectedMonth + 1 > 12) {
                                                            this.setState({
                                                                selectedMonth: 1
                                                            })
                                                        } else {
                                                            this.setState({ selectedMonth: this.state.selectedMonth + 1 })
                                                        }

                                                    }}>
                                                    <Icon name='caret-right' color={colorDefault} size={Sizes.s50} />
                                                </TouchableOpacity>

                                            </View>
                                        )
                                    }
                                </View>


                                {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                                    <Text style={{ fontSize: Sizes.s40, paddingHorizontal: Sizes.h10, color: '#335272', fontWeight: 'bold' }}>Tháng {this.state.selectedMonth}</Text>

                                    <View style={{ flexDirection: 'row' }}>
                                        <TouchableOpacity
                                            style={{ paddingHorizontal: Sizes.h14 }}
                                            onPress={() => { this.setState({ selectedMonth: this.state.selectedMonth - 1 }) }}
                                        >
                                            <Icon name='chevron-left' color='#335272' size={Sizes.s40} />
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            style={{ paddingHorizontal: Sizes.h14 }}
                                            onPress={() => { this.setState({ selectedMonth: this.state.selectedMonth + 1 }) }}>
                                            <Icon name='chevron-right' color='#335272' size={Sizes.s40} />
                                        </TouchableOpacity>
                                    </View>

                                </View> */}
                                <ScrollView>
                                    <View style={{ width: '100%', paddingHorizontal: Sizes.h10, paddingVertical: Sizes.h10 }}>
                                        {this.state.visibleSelectYear ?
                                            (
                                                <FlatList
                                                    key={this.state.dataDateTime.year.length}
                                                    numColumns={5}
                                                    data={this.state.dataDateTime.year}
                                                    // keyExtractor={(item) => item.key}
                                                    showsVerticalScrollIndicator={false}
                                                    style={{ width: '100%' }}
                                                    renderItem={({ item, index }) => {
                                                        return (
                                                            <TouchableOpacity
                                                                onPress={() => {
                                                                    this.setState({
                                                                        scrollYear: index,
                                                                        selectedYear: item.value,
                                                                        visibleSelectYear: false
                                                                    })
                                                                }}
                                                                style={{
                                                                    width: '20%',
                                                                    paddingVertical: Sizes.s20,
                                                                    // justifyContent: 'center',
                                                                    // alignItems: 'center',
                                                                    // backgroundColor: this.state.scrollYear === index ? '#335272' : 'white'
                                                                }}>
                                                                <Text style={{
                                                                    backgroundColor: this.state.scrollYear === index ? colorDefault : 'white',
                                                                    borderWidth: 2,
                                                                    borderColor: this.state.scrollYear === index ? colorDefault : 'white',
                                                                    borderRadius: this.state.scrollYear === index ? Sizes.s20 : 0,
                                                                    paddingVertical: Sizes.h10,
                                                                    paddingHorizontal: Sizes.h20,
                                                                    alignSelf: 'center',
                                                                    color: this.state.scrollYear === index ? 'white' : 'gray',
                                                                    fontSize: this.state.scrollYear === index ? Sizes.s30 : Sizes.s30,
                                                                    // fontWeight: this.state.scrollYear === index ? 'bold' : null,
                                                                }}>{item.value}</Text>
                                                            </TouchableOpacity>
                                                        )
                                                    }}
                                                />

                                            )
                                            : this.state.visibleSelectMonth ?
                                                (
                                                    <FlatList
                                                        key={this.state.dataDateTime.month.length}
                                                        style={{ width: '100%' }}
                                                        numColumns={4}
                                                        data={dataDateTime.month}
                                                        keyExtractor={item => item.key + ""}
                                                        style={{ width: '100%', }}
                                                        // contentContainerStyle={{justifyContent: 'space-around', alignItems: 'center', backgroundColor: 'yellow'}}
                                                        renderItem={({ item, index }) => {
                                                            return (
                                                                <TouchableOpacity
                                                                    onPress={() => {
                                                                        this.setState({
                                                                            selectedMonth: item.value,
                                                                            visibleSelectMonth: false
                                                                        })
                                                                    }}
                                                                    style={{
                                                                        width: '25%',
                                                                        // paddingVertical: Sizes.s20,
                                                                        // paddingHorizontal: Sizes.s20,
                                                                        justifyContent: 'center',
                                                                        alignItems: 'center'
                                                                        // justifyContent: 'center',
                                                                        // alignItems: 'center',
                                                                        // backgroundColor: this.state.scrollYear === index ? '#335272' : 'white'
                                                                    }}>
                                                                    <Text style={{
                                                                        backgroundColor: item.value === this.state.selectedMonth ? colorDefault : 'white',
                                                                        borderWidth: 2,
                                                                        borderColor: item.value === this.state.selectedMonth ? colorDefault : 'white',
                                                                        borderRadius: item.value === this.state.selectedMonth ? Sizes.s20 : 0,
                                                                        paddingVertical: Sizes.h10,
                                                                        paddingHorizontal: Sizes.h20,
                                                                        textAlign: 'center',
                                                                        // alignSelf: 'center',
                                                                        color: item.value === this.state.selectedMonth ? 'white' : 'gray',
                                                                        fontSize: item.value === this.state.selectedMonth ? Sizes.s30 : Sizes.s30,
                                                                        // fontWeight: this.state.scrollYear === index ? 'bold' : null,
                                                                    }}>{item.value}</Text>
                                                                </TouchableOpacity>
                                                            )
                                                        }}
                                                    />


                                                )
                                                :
                                                (
                                                    <View style={{ width: '100%' }}>
                                                        {this.renderDay()}
                                                        <FlatList
                                                            key={this.state.dataDateTime.day.length}
                                                            numColumns={7}
                                                            ref={(ref) => {
                                                                this.dayFlatList = ref
                                                            }}
                                                            onLayout={(event) => {

                                                            }}
                                                            onScrollToIndexFailed={info => {
                                                                // this.dayFlatList.scrollToEnd()
                                                            }}
                                                            onContentSizeChange={() => {
                                                                // this.scrollDayToIndex()
                                                            }}
                                                            style={{ width: '100%' }}
                                                            // initialScrollIndex={this.state.scrollYear}
                                                            showsVerticalScrollIndicator={false}
                                                            data={dataDateTime.day}
                                                            keyExtractor={(item) => item.key}
                                                            renderItem={({ item, index }) => {
                                                                if (item.visible) {
                                                                    return (
                                                                        <View style={{
                                                                            // flex: 1,
                                                                            width: '14%',
                                                                        }}></View>
                                                                    )
                                                                } else {
                                                                    return (
                                                                        <TouchableOpacity
                                                                            onPress={() => { this.setState({ scrollDay: index, selectedDay: item.value }) }}
                                                                            style={{
                                                                                // width: '100%',
                                                                                width: '14%',
                                                                                // minWidth: '13%',
                                                                                // flex: 1,
                                                                                alignSelf: 'stretch',
                                                                                paddingVertical: Sizes.h10,
                                                                                justifyContent: 'center',
                                                                                alignItems: 'center',
                                                                                // backgroundColor: 'red'
                                                                                // paddingHorizontal: Sizes.s20,
                                                                                // marginHorizontal: Sizes.h20,

                                                                            }}>
                                                                            <Text style={{
                                                                                // alignSelf: 'center', 
                                                                                // color: this.state.scrollDay === index ? 'white' : '#335272', 
                                                                                // fontSize: Sizes.s30, 
                                                                                // minWidth: '13%',
                                                                                // width: '14%',
                                                                                backgroundColor: item.value === this.state.selectedDay ? colorDefault : 'white',
                                                                                borderWidth: 2,
                                                                                borderColor: item.value === this.state.selectedDay ? colorDefault : 'white',
                                                                                borderRadius: item.value === this.state.selectedDay ? Sizes.s20 : 0,
                                                                                paddingVertical: Sizes.s10,
                                                                                paddingHorizontal: Sizes.s20,
                                                                                alignSelf: 'center',
                                                                                color: item.value === this.state.selectedDay ? 'white' : 'gray',
                                                                                fontSize: Sizes.s30,
                                                                                // fontWeight: this.state.scrollDay === index ? 'bold' : null,
                                                                            }}>{(' ' + item.value).substr(-2)}</Text>
                                                                        </TouchableOpacity>
                                                                    )
                                                                }

                                                            }}
                                                        />
                                                    </View>
                                                )
                                        }

                                    </View>
                                </ScrollView>

                                {/* <View style={{ width: '100%', height: 1, backgroundColor: 'black' }}></View>
                                <View style={{ flex: 5, flexDirection: 'row', marginVertical: Sizes.s10 }}>
                                    <View style={{ flex: 1, paddingHorizontal: Sizes.s10 }}>
                                        <Text style={{ alignSelf: 'center', fontWeight: 'bold', fontSize: Sizes.s30, marginVertical: Sizes.s5 }}>Ngày</Text>
                                        <FlatList
                                            ref={(ref) => {
                                                this.dayFlatList = ref
                                            }}
                                            onLayout={(event) => {

                                            }}
                                            onScrollToIndexFailed={info => {
                                                // this.dayFlatList.scrollToEnd()
                                            }}
                                            onContentSizeChange={() => {
                                                this.scrollDayToIndex()
                                            }}
                                            // initialScrollIndex={this.state.scrollYear}
                                            showsVerticalScrollIndicator={false}
                                            data={dataDateTime.day}
                                            keyExtractor={(item) => item.key}
                                            renderItem={({ item, index }) => {
                                                return (
                                                    <TouchableOpacity
                                                        onPress={() => { this.setState({ scrollDay: index, selectedDay: item.value }) }}
                                                        style={{
                                                            width: '100%',
                                                            paddingVertical: Sizes.s20,
                                                            // backgroundColor: this.state.scrollDay === index ? '#335272' : 'white' 
                                                        }}>
                                                        <Text style={{
                                                            // alignSelf: 'center', 
                                                            // color: this.state.scrollDay === index ? 'white' : '#335272', 
                                                            // fontSize: Sizes.s30, 

                                                            alignSelf: 'center',
                                                            color: this.state.scrollDay === index ? 'black' : 'gray',
                                                            fontSize: this.state.scrollDay === index ? Sizes.s40 : Sizes.s30,
                                                            fontWeight: this.state.scrollDay === index ? 'bold' : null,
                                                        }}>{item.value}</Text>
                                                    </TouchableOpacity>
                                                )
                                            }}
                                        />
                                    </View>
                                    <View style={{ flex: 1, paddingHorizontal: Sizes.s10 }}>
                                        <Text
                                            onLayout={(event) => {
                                                var { height, y } = event.nativeEvent.layout
                                            }}
                                            style={{
                                                alignSelf: 'center',
                                                fontWeight: 'bold',
                                                fontSize: Sizes.s30,
                                                marginVertical: Sizes.s5
                                            }}>Tháng</Text>
                                        <FlatList
                                            showsVerticalScrollIndicator={false}
                                            onScroll={(event) => {
                                            }}
                                            ref={ref => {
                                                this.monthFlatList = ref
                                            }}
                                            onScrollToIndexFailed={() => {
                                                // this.monthFlatList.scrollToEnd()
                                            }}
                                            onContentSizeChange={() => {
                                                this.scrollMonthToIndex()
                                            }}
                                            data={dataDateTime.month}
                                            keyExtractor={(item) => item.key}
                                            renderItem={({ item, index }) => {
                                                return (
                                                    <TouchableOpacity
                                                        onPress={() => { this.setState({ scrollMonth: index, selectedMonth: item.value }) }}
                                                        style={{
                                                            width: '100%',
                                                            paddingVertical: Sizes.s20,
                                                            // backgroundColor: this.state.scrollMonth === index ? '#335272' : 'white' 
                                                        }}>
                                                        <Text style={{
                                                            alignSelf: 'center',
                                                            color: this.state.scrollMonth === index ? 'black' : 'gray',
                                                            fontWeight: this.state.scrollMonth === index ? 'bold' : null,
                                                            fontSize: this.state.scrollMonth === index ? Sizes.s40 : Sizes.s30,
                                                        }}>{item.value}</Text>
                                                    </TouchableOpacity>
                                                )
                                            }}
                                        />
                                    </View>
                                    <View style={{ flex: 1, paddingHorizontal: Sizes.s10 }}>
                                        <Text style={{ alignSelf: 'center', fontWeight: 'bold', fontSize: Sizes.s30, marginVertical: Sizes.s5 }}>Năm</Text>
                                        <FlatList
                                            ref={ref => { this.yearFlatList = ref }}
                                            showsVerticalScrollIndicator={false}

                                            inverted={-1}
                                            onScrollToIndexFailed={(index) => {
                                                // this.yearFlatList.scrollToEnd({ animated: true })
                                            }}
                                            onContentSizeChange={() => {
                                                this.scrollYearToIndex()
                                                // this.yearFlatList.scrollToEnd()
                                            }}
                                            onLayout={(event) => {
                                                const { width, height } = event.nativeEvent.layout
                                            }}
                                            extraData={this.state.dataDateTime.year}
                                            // initialScrollIndex={this.state.scrollYear}
                                            data={dataDateTime.year}
                                            keyExtractor={(item) => item.key}
                                            renderItem={({ item, index }) => {
                                                return (
                                                    <TouchableOpacity
                                                        onPress={() => { this.setState({ scrollYear: index, selectedYear: item.value }) }}
                                                        style={{
                                                            width: '100%',
                                                            paddingVertical: Sizes.s20,
                                                            // backgroundColor: this.state.scrollYear === index ? '#335272' : 'white'
                                                        }}>
                                                        <Text style={{
                                                            alignSelf: 'center',
                                                            color: this.state.scrollYear === index ? 'black' : 'gray',
                                                            fontSize: this.state.scrollYear === index ? Sizes.s40 : Sizes.s30,
                                                            fontWeight: this.state.scrollYear === index ? 'bold' : null,
                                                        }}>{item.value}</Text>
                                                    </TouchableOpacity>
                                                )
                                            }}
                                        />
                                    </View>
                                </View> */}
                            </View>
                        </TouchableWithoutFeedback>
                    </TouchableOpacity>
                </Modal>
                {/* <View style={styles.popupPicker}></View> */}


            </View>
        )
    }
}


const styles = StyleSheet.create({
    body: {
        // width: '100%',
    },
    styleBox: {
        // width: '100%',
        // flexDirection: 'row',
        // justifyContent: 'space-between',
        paddingHorizontal: Sizes.h10,
        paddingVertical: Sizes.h10,
        // alignItems: 'center'
    },
    popupPicker: {
        width: 120,
        height: 100,
        top: 0,
        left: 0,
        position: 'absolute',
        backgroundColor: 'red',
        zIndex: 1000,
        elevation: 100000
    }

})

PopupDatePicker.defaultProps = {

}