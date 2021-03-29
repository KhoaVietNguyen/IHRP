import React from 'react'
import { View, SafeAreaView, Image, Dimensions, ImageBackground, Platform } from 'react-native'
import CustomHeader from '../custom/CustomHeader'
import { userProfile } from '../../config/settings'

export default class ImageView extends React.Component {

    render() {
        const imageBase64 = this.props.navigation.getParam('imageBase64')
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
                {Platform.OS === 'android' ? null :
                    (
                        <CustomHeader
                            title={userProfile.LangID === 'VN' ? 'Hình ảnh' : 'Image'}
                            onPressLeft={() => { this.props.navigation.goBack() }}
                            typeIconLeft={'back'} />
                    )
                }
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Image
                        style={{
                            // flex: 1,
                            width: '100%',
                            height: '100%',
                            resizeMode: 'contain',
                        }}
                        source={{
                            uri: `data:image/gif;base64,${imageBase64}`
                        }} />
                </View>
            </SafeAreaView>
        )
    }
}