import * as React from 'react'

import {
    StyleSheet,
    View,
    Text,
    Image,

} from 'react-native'
import { Sizes } from '@dungdang/react-native-basic'
import CustomTwoTimePicker from '../CustomTwoTimePicker'
import CustomTwoCheckBox from '../CustomTwoCheckBox'
import getImage from '../../../res/values/strings/iconStrS'
import { colorForm } from '../../../res/values/strings/colorStr'
import { objectIsNull } from '@dungdang/react-native-basic/src/Functions'
import { userProfile } from '../../../config/settings'
export default class ItemDetailLeave extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        const { item, resetErrorSaveDays } = this.props
        return (
            <View style={styles.content}>
                <View style={styles.title}>
                    {/* <Image source={getImage('ic_dangky_phep_3')} style={styles.image} /> */}
                    <Text style={styles.text}>{!objectIsNull(item) ? `${item.thu} ${item.dateID}` : ''}</Text>
                </View>
                <CustomTwoTimePicker
                    item={Object.assign({}, item, { caption1: userProfile.LangID === 'VN' ? 'Từ giờ' : 'From time', caption2: userProfile.LangID === 'VN' ? 'Đến giờ' : 'To time' })}
                    valueFrom={!objectIsNull(item) ? `${item.fromTime}` : '08:30'}
                    valueTo={!objectIsNull(item) ? `${item.toTime} ` : '17:30'}
                    onPressFromTime={(value) => {
                        item.fromTime = value
                        if (!objectIsNull(resetErrorSaveDays)) {
                            resetErrorSaveDays()
                        }
                    }}
                    onPressToTime={(value) => {
                        item.toTime = value
                        if (!objectIsNull(resetErrorSaveDays)) {
                            resetErrorSaveDays()
                        }
                    }}
                />
                <CustomTwoCheckBox
                    // item={item}
                    item={Object.assign({}, item, { caption1: userProfile.LangID === 'VN' ? 'Hôm sau' : 'Next day', caption2: userProfile.LangID === 'VN' ? 'Hôm sau' : 'Next day' })}
                    value1={!objectIsNull(item) ? `${item.isFromTom}` : '0'}
                    value2={!objectIsNull(item) ? `${item.isToTom} ` : '0'}
                    onPressValueFrom={(value) => {
                        item.isFromTom = value
                        if (!objectIsNull(resetErrorSaveDays)) {
                            resetErrorSaveDays()
                        }
                    }}
                    onPressValueTo={(value) => {
                        item.isToTom = value
                        if (!objectIsNull(resetErrorSaveDays)) {
                            resetErrorSaveDays()
                        }
                    }}
                />
            </View>
        )
    }

}

const styles = StyleSheet.create({
    content: {
        width: '95%',
        alignSelf: 'center',
        marginHorizontal: Sizes.s10,
        marginVertical: Sizes.s20,
        paddingHorizontal: Sizes.s20,
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
        alignItems: 'center',
        marginVertical: Sizes.s5
    },
    image: {
        width: Sizes.s60,
        height: Sizes.s60
    },
    text: {
        fontSize: Sizes.h28,
        color: colorForm.labelForm,
        marginLeft: Sizes.s10
    }
})