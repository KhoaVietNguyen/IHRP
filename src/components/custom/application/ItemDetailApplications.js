import * as React from 'react'

import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,

} from 'react-native'
import { Sizes } from '@dungdang/react-native-basic'
import getImage from '../../../res/values/strings/iconStrS'
import { colorForm } from '../../../res/values/strings/colorStr'
import { objectIsNull } from '@dungdang/react-native-basic/src/Functions'
import { colorApplication } from '../../../res/values/strings/colorStr'
import { userProfile } from '../../../config/settings'
// import {colorApplication} from '../../../res/values/strings/colorStr'
export default class ItemDetailApplications extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    formatStringHourOT(hour) {
        let h = hour + ''
        if (h.length <= 2) {
            return h + '.0'
        } else {
            return h
        }
    }
    itemLeaveApplication(item) {
        const { typeApplication } = this.props
        return (
            <TouchableOpacity onPress={() => {
                if (userProfile.typeLeaveApplication === '1') {
                    this.props.navigation.navigate('DayLeaveApplicationContainer', { itemLeaveApplication: item, typeApplication });
                } else if (userProfile.typeLeaveApplication === '2') {
                    this.props.navigation.navigate('LeaveApplicationContainer', { itemLeaveApplication: item, typeApplication })
                }

            }} style={styles.title}>
                <Image source={getImage(
                    item.statusID === 1 ? 'ic_tinhtrang_1'
                        : item.statusID === 2 ? 'ic_tinhtrang_2'
                            : item.statusID === 3 ? 'ic_tinhtrang_3'
                                : 'ic_tinhtrang_4'
                )} style={styles.image} />
                <View style={styles.info}>
                    <Text style={styles.textNameLeave}>{!objectIsNull(item) ? `${item.leaveName}` : ''}</Text>
                    <Text style={styles.textDateTime}>{!objectIsNull(item) ? `${item.duration}` : ''}</Text>
                    <Text style={styles.text}>{userProfile.LangID === 'VN' ? 'Tổng số ngày nghỉ' : 'Total leave day'} <Text style={{
                        color: item.statusID === 1 ? colorApplication.newApplication
                            : item.statusID === 2 ? colorApplication.waitingApplication
                                : item.statusID === 3 ? colorApplication.finishApplication
                                    : colorApplication.rejectApplication
                    }}>{!objectIsNull(item) ? `${item.taken}` : ''}</Text></Text>

                    <View style={styles.line}></View>
                </View>
            </TouchableOpacity>
        )
    }
    itemBusinessApplication(item) {
        const { typeApplication } = this.props
        return (
            <TouchableOpacity
                onPress={() => {
                    this.props.navigation.navigate('BusinessTripApplicationContainer', { itemBusinessTripApplication: item, typeApplication })
                }}
                style={styles.title}>
                <Image source={getImage(
                    item.statusID === 1 ? 'ic_tinhtrang_1'
                        : item.statusID === 2 ? 'ic_tinhtrang_2'
                            : item.statusID === 3 ? 'ic_tinhtrang_3'
                                : 'ic_tinhtrang_4'
                )} style={styles.image} />
                <View style={styles.info}>
                    <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between' }}>
                        <View style={styles.actionDate}>
                            <Text style={styles.textNameEmp}>{!objectIsNull(item) ? `${item.empName}` : ''}</Text>
                            <Text style={styles.textDateTime}>{!objectIsNull(item) ? `${item.fromDateTime}` : ''}</Text>
                            <Text style={styles.text}>{!objectIsNull(item) ? `${item.toDateTime}` : ''}</Text>
                        </View>
                        <View style={styles.actionDate}>
                            <Text style={styles.textActionDate}>{!objectIsNull(item) ? `${item.actionDate}` : ''}</Text>
                            <Text style={styles.textDateTimeWorking}><Text style={styles.numDateWorking}>{!objectIsNull(item) ? `${item.soNgayCongTac} ngày ` : ''}</Text>{!objectIsNull(item) ? `${item.soGioCongTac} giờ` : ''}</Text>
                        </View>
                    </View>


                    <View style={styles.line}></View>
                </View>
            </TouchableOpacity>
        )
    }

    itemOverTimeApplication(item) {
        const { typeApplication } = this.props
        return (
            <TouchableOpacity
                onPress={() => {
                    this.props.navigation.navigate('OverTimeApplicationContainer', { itemOverTimeApplication: item, typeApplication })
                }}
                style={styles.title}>
                <Image source={getImage(
                    item.statusID === 1 ? 'ic_tinhtrang_1'
                        : item.statusID === 2 ? 'ic_tinhtrang_2'
                            : item.statusID === 3 ? 'ic_tinhtrang_3'
                                : 'ic_tinhtrang_4'
                )} style={styles.image} />
                <View style={styles.info}>
                    <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between' }}>
                        <View style={styles.dateOT}>
                            <Text style={styles.textNameEmp}>{!objectIsNull(item) ? `${item.date}` : ''}</Text>
                            <Text style={styles.textDateTime}>{!objectIsNull(item) ? `${item.from} - ${item.to}` : ''}</Text>

                        </View>
                        <View style={styles.hourOT}>
                            <Text numberOfLines={1} style={[styles.hourDetailOT, { backgroundColor: colorApplication.dayStatusOT }]}>{!objectIsNull(item) ? this.formatStringHourOT(item.hourDay) : '0.0'}</Text>
                            <Text numberOfLines={1} style={[styles.hourDetailOT, { backgroundColor: colorApplication.nightStatusOT }]}>{!objectIsNull(item) ? this.formatStringHourOT(item.hourNight) : '0.0'}</Text>
                            <Text numberOfLines={1} style={[styles.hourDetailOT, { backgroundColor: colorApplication.replaceStatusOT }]}>{!objectIsNull(item) ? this.formatStringHourOT(item.hourReplace) : '0.0'}</Text>
                        </View>
                    </View>


                    <View style={styles.line}></View>
                </View>
            </TouchableOpacity>
        )
    }
    itemLogTMSApplication(item) {
        const { typeApplication } = this.props
        return (
            <TouchableOpacity onPress={() => {
                this.props.navigation.navigate('LogTMSApplicationContainer', { item: item, typeApplication })
            }} style={styles.titleLogTMS}>
                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ width: '60%', }}>
                        <Text style={{ fontSize: Sizes.h30 }}>{item.content1}</Text>
                        <Text style={{
                            fontSize: Sizes.h28,
                            color:
                                item.content3ID === 2 ? colorApplication.colorStatus2 :
                                    item.content3ID === 3 ? colorApplication.colorStatus3 :
                                        item.content3ID === 4 ? colorApplication.colorStatus4 :
                                            colorApplication.colorStatus1,

                        }}>{item.content2}</Text>
                    </View>
                    <View style={{ alignItems: 'flex-end', marginHorizontal: Sizes.s10, flex: 1, }}>
                        <Text style={{
                            textAlign: 'right', fontSize: Sizes.h28,
                            color:
                                item.content3ID === 2 ? colorApplication.colorStatus2 :
                                    item.content3ID === 3 ? colorApplication.colorStatus3 :
                                        item.content3ID === 4 ? colorApplication.colorStatus4 :
                                            colorApplication.colorStatus1,
                        }}>{item.content3}</Text>
                        <Text style={{ textAlign: 'right', fontSize: Sizes.h28 }}>{item.content4}</Text>
                        <Text style={{
                            textAlign: 'right', fontSize: Sizes.h28,
                            color:
                                item.content5ID === 2 ? colorApplication.colorStatus2 :
                                    item.content5ID === 3 ? colorApplication.colorStatus3 :
                                        item.content5ID === 4 ? colorApplication.colorStatus4 :
                                            colorApplication.colorStatus1,
                        }}>{item.content5}</Text>
                    </View>
                </View>
                <View style={styles.line}></View>
            </TouchableOpacity>
        )
    }
    render() {
        const { item, typeItem } = this.props
        return (
            <View style={styles.content}>
                {!objectIsNull(typeItem) ?
                    (
                        typeItem === '1' ?
                            (
                                this.itemLeaveApplication(item)
                            )
                            : typeItem === '11' ?
                                (
                                    this.itemBusinessApplication(item)
                                )
                                : typeItem === '3' ?
                                    (
                                        this.itemOverTimeApplication(item)
                                    )
                                    : typeItem === '75' ?
                                        (
                                            this.itemLogTMSApplication(item)
                                        )
                                        :
                                        (
                                            null
                                        )
                    )
                    :
                    null
                }
                {/* {this.itemLogTMSApplication(item)} */}

            </View>
        )
    }

}

const styles = StyleSheet.create({
    content: {
        width: '100%',
        marginHorizontal: Sizes.s10,
        marginVertical: Sizes.s2,
        paddingVertical: Sizes.s10,
        borderRadius: Sizes.s20,
        backgroundColor: 'white',
        // shadowColor: 'rgba(0, 0, 0, 0.5 )',
        // shadowOffset: { width: 0, height: 4 },
        // shadowRadius: Sizes.h10,
        // shadowOpacity: 0.2,
        // elevation: 10,
    },
    title: {
        flexDirection: 'row',
        width: '100%',
        // alignItems: 'center'
    },
    info: {
        flex: 1,
        paddingHorizontal: Sizes.s20
    },

    image: {
        width: Sizes.s80,
        height: Sizes.s80,
    },
    text: {
        fontSize: Sizes.h28,
        color: '#B5B5B5',
        paddingVertical: Sizes.s2,
    },

    textNameLeave: {
        fontSize: Sizes.h30,
        color: '#4C4C4C',
    },
    textNameEmp: {
        fontSize: Sizes.h30,
        color: colorApplication.empNameApplication,
    },
    textDateTime: {
        fontSize: Sizes.h28,
        color: '#838383',
        paddingVertical: Sizes.s2,
    },
    line: {
        width: '100%',
        backgroundColor: '#F6F6F6',
        marginVertical: Sizes.s10,
        height: 2
    },



    // businessTrip
    infoBusinessTrip: {
        flex: 1,
        flexDirection: 'row',
        paddingHorizontal: Sizes.s20,
        justifyContent: 'space-between'

    },
    textDateTimeWorking: {
        fontSize: Sizes.h28,
        color: '#838383',
        paddingVertical: Sizes.s2,
        // alignSelf: 'flex-end',
        textAlign: "right",
    },
    numDateWorking: {
        color: colorApplication.empNameApplication,

    },
    textActionDate: {
        fontSize: Sizes.h28,
        color: '#4C4C4C',
        // alignSelf: 'flex-end',
        textAlign: "right",
    },
    actionDate: {
        paddingHorizontal: Sizes.s5,
        maxWidth: '50%'
    },


    // overTime 
    dateOT: {
        paddingHorizontal: Sizes.s10,
        flex: 1,
    },
    hourOT: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center'
    },
    hourDetailOT: {
        paddingHorizontal: Sizes.s20,
        paddingVertical: Sizes.s10,
        borderRadius: Sizes.s20,
        textAlign: "center",
        marginHorizontal: Sizes.s5,
        color: '#fff',
        flex: 1,
        fontSize: Sizes.h26
    },


    // logTMS
    titleLogTMS: {
        width: '100%',
        // flex: 1,
        // flexDirection: 'row',
        // justifyContent: 'space-between',
        // paddingHorizontal: Sizes.s20
    },
    timeLogTMS: {

    }

})