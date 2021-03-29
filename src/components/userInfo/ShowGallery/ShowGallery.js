// MinhNC15

import React from 'react';
import {
    Button,
    Image,
    View, Text,
    StyleSheet,
    ScrollView,
    TextInput,
    KeyboardAvoidingView,
    TouchableOpacity,
    Alert,
    FlatList,
    Dimensions,
    ActivityIndicator,
    PermissionsAndroid,
    Platform
} from 'react-native';
import { Sizes } from '@dungdang/react-native-basic';
import { SafeAreaView } from 'react-navigation';
import CustomHeader from '../../../components/custom/CustomHeader'
import { arrayIsEmpty, objectIsNull, stringIsEmpty } from '@dungdang/react-native-basic/src/Functions';
// import ComboboxForm from '../custom/functionForm/ComboboxForm'
import { userProfile } from '../../../config/settings'
import CameraRoll from "@react-native-community/cameraroll"
import RNFS from 'react-native-fs'
import Loading from '../../custom/Loading'
import ImageResizer from 'react-native-image-resizer';
export default class ShowGallery extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            status: null,
            press: false,
            choosedItem: null,
            page: 1,
            isGranted: undefined,
            loadMore: true,
        }
    }

    async componentDidMount() {
        // this.setState(() => ({
        //     isGranted: this.hasAndroidPermission(),
        // }))
        // if (this.state.isGranted === true) {
        //     await this.getImage()
        // }
        // this.getImage()
        if (Platform.OS === 'android') {
            this.hasAndroidPermission()
        } else if (Platform.OS === 'ios') {
            this.setState({
                isGranted: true
            })
        }
        // console.log('this.hasAndroidPermission()', this.hasAndroidPermission())
    }

    async getImage() {
        // console.log('5555555555555555555555555555555')
        const imageData = await CameraRoll.getPhotos({
            first: 50,
            assetType: 'Photos',
        })
            .then(image => {
                return image
            })

            .catch((err) => {
                // console.log('666: ', err)
                // alert('Thất bại')
                Alert.alert(
                    userProfile.LangID === 'VN' ? 'Thông báo' : 'Notice',
                    userProfile.LangID === 'VN' ? 'Bạn vui lòng kiểm tra quyền truy cập thư viện ảnh của ứng dụng !' : "Please check your app's gallery permissions'",
                    [{
                        text: userProfile.LangID === 'VN' ? 'Đóng' : 'Close',
                        onPress: () => {
                            this.props.navigation.goBack()
                        }
                    }]
                )
            })
        this.setState({
            data: imageData.edges,
            page: ++this.state.page,
            loadMore: imageData.edges.length < 50 ? false : true
        }, () => {
            this.state.data.forEach(data => {
                Object.assign(data, { status: false })
            })
        })
    }
    // hàm yêu cầu cấp quyền truy cập bộ nhớ máy, nếu chưa có request yêu cầu
    async hasAndroidPermission() {
        const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

        const hasPermission = await PermissionsAndroid.check(permission);
        if (hasPermission) {
            this.setState(() => ({
                isGranted: true,
            }))
            return true;
        }

        const status = await PermissionsAndroid.request(permission);
        // return status === 'granted';
        if (status === 'granted') {
            this.setState(() => ({
                isGranted: true,
            }))
            return true;
        }
    }

    async componentDidUpdate(prevProps, prevState) {
        // if (this.hasAndroidPermission() === true || this.hasAndroidPermission() === 'granted') {
        //     await this.getImage()
        // }
        if (prevState.isGranted !== this.state.isGranted) {
            if (this.state.isGranted === true) {
                await this.getImage()
                // console.log('111111111111111111111', this.state.isGranted)
            }

            // console.log('this.hasAndroidPermission()', this.hasAndroidPermission())
            // console.log('3333333333333333333333333', this.state.isGranted)
        }

        if (prevProps.dataUploadAvatar !== this.props.dataUploadAvatar && this.props.dataUploadAvatar !== null) {
            Alert.alert(
                `${userProfile.LangID === 'VN' ? 'Thông báo' : 'Notice'}`,
                userProfile.LangID === 'VN' ? 'Đổi ảnh đại diện thành công !' : 'Change avatar success !',
                [
                    {
                        text: `${userProfile.LangID === 'VN' ? 'Đóng' : 'Close'}`,
                        // text: 'Đóng',
                        onPress: () => {
                            this.props.navigation.goBack()
                        },
                    },
                ],
            );
        }

        if (prevProps.errorUploadAvatar !== this.props.errorUploadAvatar && this.props.errorUploadAvatar !== null) {
            Alert.alert(
                `${userProfile.LangID === 'VN' ? 'Thông báo' : 'Notice'}`,
                userProfile.LangID === 'VN' ? 'Đổi ảnh đại diện thất bại.' : 'Change avatar failed.',
                [
                    {
                        text: `${userProfile.LangID === 'VN' ? 'Đóng' : 'Close'}`,
                        onPress: () => {

                        },
                    },
                ],
            );
        }

    }

    _renderItem = (item) => {
        const { data } = this.state
        return (
            <TouchableOpacity
                style={(item.status === true) ? styles.itemChoosing : styles.item}
                onPress={() => {
                    data.forEach(data => {
                        data.status = false
                    })
                    item.status = !item.status
                    this.setState({
                        press: true,
                        choosedItem: item
                    })
                }}
            >
                <Image
                    resizeMode='contain'
                    style={styles.imageStyle}
                    source={{ uri: item.node.image.uri }}
                />
            </TouchableOpacity>
        )
    }

    loadMoreData = async () => {
        const moreImage = await CameraRoll.getPhotos({
            first: 50 * this.state.page,
            assetType: 'Photos',
        })
            .then(image => {
                return image
            })
            .catch((err) => {
                Alert.alert(
                    userProfile.LangID === 'VN' ? 'Thông báo' : 'Notice',
                    userProfile.LangID === 'VN' ? 'Bạn vui lòng kiểm tra quyền truy cập thư viện ảnh của ứng dụng !' : "Please check your app's gallery permissions'",
                    [{
                        text: userProfile.LangID === 'VN' ? 'Đóng' : 'Close',
                        onPress: () => {
                            this.props.navigation.goBack()
                        }
                    }]
                )
            })
        let isLoadMore = moreImage.edges.length < (50 * this.state.page) ? false : true
        moreImage.edges.splice(0, (50 * (this.state.page - 1)))

        this.setState({
            data: this.state.data.concat(moreImage.edges),
            page: ++this.state.page,
            loadMore: isLoadMore
        }, () => {

        })

    }
    resizeImage = async image => {
        let imageUri = image;
        let newWidth = 700;
        let newHeight = 700;
        let compressFormat = 'JPEG';
        let quality = 100;

        return await ImageResizer.createResizedImage(
            imageUri,
            newWidth,
            newHeight,
            compressFormat,
            quality,
        )
            .then(async response => {
                let content = await RNFS.readFile(response.uri, 'base64');
                return { content: content, size: response.size };
            })
            .catch(err => { });
    };
    chooseImage = async () => {
        // alert('choose image!!!')
        console.log('chooseItemmmmmmmmmmmmmmmmm', this.state.choosedItem)
        // console.log('chooseItemmmmmmmmmmmmmmmmm---uri', this.state.choosedItem.node.image.uri)
        let split = this.state.choosedItem.node.image.uri.split(".")

        let nameUUID = this.uuidv4();
        let name = nameUUID;
        for (let i = 0; i < 4; i++) {
            name = name.replace("-", "");
        }
        let typeImage = this.props.navigation.getParam('typeImage')
        let setDataFromGallery = this.props.navigation.getParam('setDataFromGallery')
        if (Platform.OS === 'android') {

            // Chọn file hình ảnh cho các màn hình loại đơn (Android)
            if (!stringIsEmpty(typeImage) && typeImage === 'attachFile') {
                let response = await this.resizeImage(this.state.choosedItem.node.image.uri)
                if (!objectIsNull(response)) {
                    if (response.size / 1048576 > 4) {
                        Alert.alert(userProfile.LangID === 'VN' ? 'Thông báo' : 'Notice', userProfile.LangID === 'VN' ? 'Kích thước file không được vượt quá 4MB.' : 'The file size should not exceed 4MB.', [
                            { text: userProfile.LangID === 'VN' ? 'Đóng' : 'Cancel' },
                        ]);
                    } else {
                        let content = await RNFS.readFile(decodeURI(this.state.choosedItem.node.image.uri), 'base64');
                        let fileName = `${name}.${split[split.length - 1]}`
                        if (!objectIsNull(setDataFromGallery)) {
                            setDataFromGallery({
                                uri: this.state.choosedItem.node.image.uri,
                                name: fileName,
                                file: content
                            })
                            this.props.navigation.goBack()
                        }

                        // this.setState(
                        //     {
                        //         fileName: res.name,
                        //     },
                        //     () => {
                        //         if (!objectIsNull(this.props.onPress)) {
                        //             this.props.onPress(res);
                        //         }
                        //     },
                        // );
                    }
                } else {
                    Alert.alert(userProfile.LangID === 'VN' ? 'Thông báo' : 'Notice', userProfile.LangID === 'VN' ? 'File không hợp lệ. Vui lòng chọn lại. ' : 'Invalid file. Please choose again.', [
                        { text: userProfile.LangID === 'VN' ? 'Đóng' : 'Cancel' },
                    ]);
                }
            } else {
                // Chọn hình ảnh để thay đổi avatar (Android)

                let content = await RNFS.readFile(decodeURI(this.state.choosedItem.node.image.uri), 'base64');

                // make a new image's name
                let fileName = `${name}.${split[split.length - 1]}`
                this.props.uploadAvatarAction([{
                    FileName: fileName,
                    FileContent: content,
                }])
            }

        } else {
            if (!stringIsEmpty(typeImage) && typeImage === 'attachFile') {
                // Chọn file hình ảnh cho các màn hình loại đơn (iOS)
                let fileName = `${name}.jpg`
                let response = await this.resizeImage(this.state.choosedItem.node.image.uri)
                if (!objectIsNull(response)) {
                    if (response.size / 1048576 > 4) {
                        Alert.alert(userProfile.LangID === 'VN' ? 'Thông báo' : 'Notice', userProfile.LangID === 'VN' ? 'Kích thước file không được vượt quá 4MB.' : 'The file size should not exceed 4MB.', [
                            { text: userProfile.LangID === 'VN' ? 'Đóng' : 'Cancel' },
                        ]);
                    } else {
                        if (!objectIsNull(setDataFromGallery)) {
                            setDataFromGallery({
                                uri: this.state.choosedItem.node.image.uri,
                                name: fileName,
                                file: response.content
                            })
                            this.props.navigation.goBack()
                        }
                    }
                } else {
                    Alert.alert(userProfile.LangID === 'VN' ? 'Thông báo' : 'Notice', userProfile.LangID === 'VN' ? 'File không hợp lệ. Vui lòng chọn lại. ' : 'Invalid file. Please choose again.', [
                        { text: userProfile.LangID === 'VN' ? 'Đóng' : 'Cancel' },
                    ]);
                }

            } else {
                // Chọn hình ảnh để thay đổi avatar (iOS)
                let fileName = `${name}.jpg`
                let response = await this.resizeImage(this.state.choosedItem.node.image.uri)
                // console.log('response - Choose Image : ', {
                //     a: fileName,
                //     b: response.content
                // })
                this.props.uploadAvatarAction([{
                    FileName: fileName,
                    FileContent: response.content,
                }])
            }


        }

    }

    uuidv4() {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (
            c
        ) {
            var r = (Math.random() * 16) | 0,
                v = c == "x" ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        });
    }

    renderFooter = () => {
        const { data, press, status, isLoadMore } = this.state
        if (!arrayIsEmpty(data) && data.length > 50 && isLoadMore) {
            return (
                <View style={{ marginVertical: Sizes.s10, width: '100%', }}>
                    <ActivityIndicator size='large' color='blue' />
                </View>
            )
        } else {
            return null
        }

    }
    render() {
        const { data, press, status } = this.state
        return (
            <SafeAreaView style={{
                flex: 1,
                // backgroundColor: 'white',
            }}>
                {/* Loading */}
                {this.props.loadingUploadAvatar && <Loading />}
                <View style={styles.body}>
                    <CustomHeader
                        typeIconLeft={'back'}
                        title={userProfile.LangID === 'VN' ? 'CHỌN ẢNH' : 'CHOOSE IMAGE'}
                        onPressLeft={() => { this.props.navigation.goBack() }}
                        typeIconRight={'choose'}
                        onPressRight={() => { this.chooseImage() }}
                        showIconRight={objectIsNull(this.state.choosedItem) ? false : true}
                    />

                </View>
                <FlatList
                    data={data}
                    extraData={this.state}
                    renderItem={({ item }) => (
                        this._renderItem(item)
                    )}
                    numColumns={3}
                    keyExtractor={(item, index) => index.toString()}
                    onMomentumScrollEnd={() => {
                        // console.log('11111111111111111111111111111111111')
                        this.loadMoreData()
                    }}
                    ListFooterComponent={this.renderFooter}
                />
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    body: {
        alignItems: 'center'
    },
    Gallery: {
        // margin: Sizes.s20,
        // backgroundColor: 'cyan',
    },
    item: {
        width: Dimensions.get('window').width / 3,
        height: Dimensions.get('window').width / 3,
        padding: Sizes.s2,
    },
    itemChoosing: {
        width: Dimensions.get('window').width / 3,
        height: Dimensions.get('window').width / 3,
        borderWidth: 2,
        borderColor: '#0A84FF',
        padding: Sizes.s2,
    },
    imageStyle: {
        width: '100%',
        height: '100%'
    }
})
