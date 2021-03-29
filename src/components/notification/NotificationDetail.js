import React from 'react'
import { View, Text, StyleSheet, ScrollView, Image, SafeAreaView } from 'react-native'
import CustomHeader from '../custom/CustomHeader'
import Loading from '../custom/Loading'
import { objectIsNull, arrayIsEmpty, stringIsEmpty } from '@dungdang/react-native-basic/src/Functions'
import { textForm } from '../custom/form/FormTypeDetail'
import Form from '../custom/form/FormDetail'
import Sizes from '../custom/popup/styles/fontStyles'
import getImage from '../../res/values/strings/iconStrS'
import { CustomButton } from '../custom/CustomButton'
import { userProfile } from '../../config/settings'
export default class NotificationDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: undefined,
        }
    }
    // textForm('7', 'I', 'textForm', null, null, 'Tổng số giờ nghỉ', '1', null, 7, null, null, false, 'TotalLeaveHours'),
    componentDidUpdate(prevProps) {
        const { dataNotificationDetail } = this.props
        if (dataNotificationDetail !== prevProps.dataNotificationDetail) {
            if (!objectIsNull(dataNotificationDetail)) {
                this.mapDataToForm(dataNotificationDetail)
            }
        }
    }
    mapDataToForm(data) {
        let arrayForm = []
        let keyData = Object.keys(data)
        for (let i = 0; i < keyData.length; i++) {
            let form = textForm(
                i + '',
                'I',
                'textForm',
                null,
                null,
                keyData[i].substr(4),
                '0',
                null,
                i,
                data[keyData[i]],
                true,
                false,
                keyData[i]
            )
            arrayForm.push(form)
        }
        this.setState({
            data: arrayForm
        })
    }
    showView() {
        const { data } = this.state
        return (
            <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
                <Form ref={'form'} form={data} />
            </ScrollView>
        )
    }
    showError() {
        const { errorNotificationDetail } = this.props
        return (
            <View style={styles.error}>
                <Image source={getImage('img_empty_data')} style={styles.imageError} />
                <Text style={styles.textError}>
                    {errorNotificationDetail}
                </Text>
                <CustomButton type={'reload'} title={userProfile.LangID === 'VN' ? 'Thử lại' : 'Reload'} onPress={() => {
                    const item = this.props.navigation.getParam('itemNotification')
                    if (!objectIsNull(item)) {
                        this.props.notificationDetailAction([{ ID: item.recordID, workflowID: item.workflowID }])
                    }
                }} />
            </View>
        )
    }
    render() {
        const {
            fetchingNotificationDetail,
            // dataNotificationDetail,
            errorNotificationDetail
        } = this.props

        const {
            data
        } = this.state
        // console.log('dataaaaa: ', dataNotificationDetail)
        return (
            <SafeAreaView style={styles.body}>
                {fetchingNotificationDetail && <Loading />}
                <CustomHeader
                    title={userProfile.LangID === 'VN' ? 'Chi tiết thông báo' : 'Notification detail'}
                    typeIconLeft={'back'}
                    onPressLeft={() => { this.props.navigation.goBack() }}
                />
                {data !== undefined && !arrayIsEmpty(data) && this.showView()}
                {!stringIsEmpty(errorNotificationDetail) && this.showError()}
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: 'white'
    },
    scroll: {
        paddingHorizontal: Sizes.s20,
        marginVertical: Sizes.s20,
        flex: 1,
        flexGrow: 1
    },
    error: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageError: {
        width: Sizes.s340,
        height: Sizes.s340
    },
    textError: {
        fontSize: Sizes.h30,
    }
})