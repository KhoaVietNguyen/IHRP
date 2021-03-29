import React from 'react'
import { View, SafeAreaView, Image, Dimensions, ImageBackground, Platform, } from 'react-native'
import CustomHeader from '../custom/CustomHeader'
import { userProfile } from '../../config/settings'
import WebView from 'react-native-webview'

export default class FileWebVuew extends React.Component {

    render() {
        const imageBase64 = this.props.navigation.getParam('imageBase64')
        // console.log('imageBase 65555555: ', imageBase64)
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
                <CustomHeader
                    title={userProfile.LangID === 'VN' ? 'File' : 'File'}
                    onPressLeft={() => { this.props.navigation.goBack() }}
                    typeIconLeft={'back'}
                />
                {/* <WebView 

                /> */}
                <WebView
                    source={{
                        uri: imageBase64
                    }}
                    style={{ flex: 1 }}
                />
                {/* <Image
                        style={{
                            // flex: 1,
                            width: '100%',
                            height: '100%',
                            resizeMode: 'contain',
                        }}
                        source={{
                            uri: `data:image/gif;base64,${imageBase64}`
                        }} /> */}
            </SafeAreaView >
        )
    }
}