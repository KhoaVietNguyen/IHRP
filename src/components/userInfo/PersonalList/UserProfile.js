import React, { Component } from 'react'
import { ScrollView, View, Image, Text, Dimensions, StyleSheet, TouchableOpacity, Modal, Button } from 'react-native'
import { Sizes } from '@dungdang/react-native-basic'
import getImage from '../../../res/values/strings/iconStrS'
import { userProfile } from '../../../config/settings'
import { objectIsNull, stringIsEmpty, arrayIsEmpty } from '@dungdang/react-native-basic/src/Functions'

export default class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item1: "",
            item2: "",
            gender: "1", // 0: female, 1: male
            avatar: "",
            showModal: false,
        }
    }
    onPressAvatar = () => {
        this.setState(() => ({
            showModal: true,
        }))
        // alert('changeavatar')
        // this.props.navigation.navigate('ShowGalleryContainer');
    }
    closeBottomPopup = () => {
        this.setState(() => ({
            showModal: false,
        }))
    }
    componentDidUpdate(prev) {
        if (prev.data !== this.props.data && !arrayIsEmpty(this.props.data)) {
            this.setState({
                item1: this.props.data[0].item1,
                item2: this.props.data[0].item2,
                gender: this.props.data[0].gender,
                avatar: this.props.data[0].avatar
            });
        }
        if (prev.error !== this.props.error && this.props.error !== null) {
            // console.warn(this.props.error);
            // console.log("[ProfileScreen-ERROR: ]", this.props.error)
        }
    }
    getImage() {
        // console.log(this.state.avatar)
        var link = this.state.avatar
        // console.log(link)
        return link
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={() => this.onPressAvatar()}
                    >
                        {!stringIsEmpty(this.state.avatar) ?
                            (
                                <Image
                                    source={{ uri: this.state.avatar }}
                                    style={{ height: Sizes.s200, width: Sizes.s200, borderRadius: Sizes.s160 }}
                                    defaultSource={getImage(`${this.state.gender === "0" ? "img_female" : "img_male"}`)}
                                />
                            )
                            : !stringIsEmpty(this.state.gender) ?
                                (
                                    <Image
                                        source={getImage(`${this.state.gender === "0" ? "img_female" : "img_male"}`)}
                                        style={{ height: Sizes.s200, width: Sizes.s200, borderRadius: Sizes.s160 }}
                                        defaultSource={getImage(`${this.state.gender === "0" ? "img_female" : "img_male"}`)}
                                    />
                                )
                                :
                                null

                        }

                    </TouchableOpacity>
                    <Text style={styles.textBehindImage1}>
                        {this.state.item1}
                    </Text>
                    <Text style={styles.textBehindImage2}>
                        {this.state.item2}
                    </Text>
                </View>
                <Modal
                    animationType={"fade"}
                    transparent={true}
                    visible={this.state.showModal}
                    // visible={true}
                    onRequestClose={() => { this.closeBottomPopup() }}
                >
                    <TouchableOpacity
                        style={{
                            flex: 1,
                            backgroundColor: '#000000AA',
                            justifyContent: 'flex-end',
                        }}
                        onPress={() => { this.closeBottomPopup() }}
                    >
                        <TouchableOpacity
                            style={{
                                backgroundColor: 'white',
                                width: '100%',
                                borderTopLeftRadius: Sizes.s20,
                                borderTopRightRadius: Sizes.s20,
                                paddingHorizontal: Sizes.s20,
                                paddingVertical: Sizes.s20,
                                maxHeight: phoneHeight * 0.4,
                                alignItems: 'center',
                            }}
                            onPress={() => {
                                this.closeBottomPopup()
                                this.props.navigation.navigate('ShowGalleryContainer')
                            }}
                        >
                            <View
                                style={{
                                    borderWidth: 2,
                                    borderTopColor: '#000000AA',
                                    opacity: 0.5,
                                    width: '10%',
                                    marginBottom: Sizes.s30,
                                }}
                            >
                            </View>
                            <View
                                style={{
                                    marginVertical: Sizes.s40,
                                }}
                            >
                                <Text
                                    style={{
                                        color: '#3CB3FC',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    {userProfile.LangID === 'VN' ? 'Chọn ảnh đại diện' : 'Choose avatar image'}
                                </Text>
                            </View>

                        </TouchableOpacity>
                    </TouchableOpacity>
                </Modal>
            </View>
        );
    }
}

let phoneWidth = Dimensions.get('screen').width
let phoneHeight = Dimensions.get('screen').height
const styles = StyleSheet.create({
    container: {
        width: phoneWidth,
        height: phoneHeight / 4,
        backgroundColor: 'white',
        justifyContent: "center",
        alignItems: "center"
    },
    header: {
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textBehindImage1: {
        marginTop: 5,
        fontWeight: 'bold'
    },
    textBehindImage2: {
        marginTop: 5,
        marginBottom: 5,
        color: 'darkgray'
    },
    body: {

    },
    bodyHeader: {
        backgroundColor: 'lightgray',
        justifyContent: 'center',
        height: 50
    }
}) 