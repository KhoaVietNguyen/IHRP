
import * as React from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    ImageBackground
} from 'react-native'
import { iconStr } from '../../res/values/strings/iconStr'
import { Sizes, Colors } from '@dungdang/react-native-basic'
import { objectIsNull, arrayIsEmpty, stringIsEmpty } from '@dungdang/react-native-basic/src/Functions'
export class ItemPicker extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            // item: this.props.item
        }
    }
    componentDidUpdate(prev) {
        // if (prev.item !== this.props.item) {
        //     if (this.props.item !== undefined) {
        //         this.setState({
        //             item: this.props.item
        //         })
        //     }
        // }
    }

    render() {
        const { item, type, onSelectItem } = this.props
        return (
            <View style={{ width: type === 'SELECT' ? null : '100%', marginHorizontal: type === 'SELECT' ? Sizes.h20 : null, }}>
                {(type === 'combobox' || type === 'comboboxSearchForm') ?
                    (
                        <TouchableOpacity
                            onPress={() => {
                                if (!objectIsNull(onSelectItem)) {
                                    onSelectItem(item)
                                }
                            }}
                        >
                            {item.type === 'ReplacePerson' ?
                                (
                                    <View style={styles.touch}>
                                        {item.value.gender === '0' ?
                                            (
                                                <Image
                                                    source={iconStr.img_female}
                                                    style={styles.avatar}
                                                />
                                            )
                                            :
                                            (
                                                <Image
                                                    source={iconStr.img_male}
                                                    style={styles.avatar}
                                                />
                                            )
                                        }
                                        <View style={styles.infoUser}>
                                            <Text style={styles.textUser1}>{item.value.item1}</Text>
                                            <Text style={styles.textUser2}>{item.value.item2}</Text>
                                            <Text style={styles.textUser3}>{item.value.item3}</Text>
                                        </View>
                                    </View>
                                )
                                :
                                (
                                    <View style={styles.touch}>
                                        <Image source={iconStr.ic_dangky_phep_1} style={styles.image} />
                                        <Text style={styles.text}> {item.label} </Text>
                                    </View>
                                )
                            }

                        </TouchableOpacity>
                    )
                    : (type === 'comboboxMulti' || type === 'comboboxMultiSearchForm') ?
                        (
                            <TouchableOpacity onPress={() => {
                                if (!objectIsNull(onSelectItem)) {
                                    onSelectItem(item)
                                }
                            }} style={styles.touch}>
                                {item.type === 'NotifyTo' ?
                                    (
                                        <View style={styles.touch}>
                                            {item.value.gender === '0' ?
                                                (
                                                    <Image
                                                        source={iconStr.img_female}
                                                        style={styles.avatar}
                                                    />
                                                )
                                                :
                                                (
                                                    <Image
                                                        source={iconStr.img_male}
                                                        style={styles.avatar}
                                                    />
                                                )
                                            }
                                            <View style={styles.infoUser}>
                                                <Text style={styles.textUser1}>{item.value.item1}</Text>
                                                <Text style={styles.textUser2}>{item.value.item2}</Text>
                                                <Text style={styles.textUser3}>{item.value.item3}</Text>
                                            </View>
                                            {item.isSelect &&
                                                (
                                                    // <View style={styles.check}>
                                                    <Image
                                                        source={iconStr.ic_check_success_i}
                                                        style={styles.check}
                                                    />
                                                    // </View>
                                                )
                                            }
                                        </View>
                                    )
                                    :
                                    (
                                        <View style={styles.touch}>
                                            <Image source={iconStr.ic_dangky_phep_1} style={styles.image} />
                                            <Text style={styles.text}> {item.label} </Text>
                                            {item.isSelect &&
                                                (
                                                    <Image
                                                        source={iconStr.ic_check_success_i}
                                                        style={styles.check}
                                                    />
                                                )
                                            }
                                        </View>
                                    )
                                }
                            </TouchableOpacity>
                        )
                        : type === 'SELECT' ?
                            (
                                <TouchableOpacity onPress={() => { onSelectItem(item) }} style={{ alignItems: 'center', }} >
                                    <View style={{ margin: Sizes.h10, padding: Sizes.h10, paddingHorizontal: Sizes.h20 }}>
                                        {item.value.gender === '0' ?
                                            (
                                                <Image
                                                    source={iconStr.img_female}
                                                    style={styles.avatarSelect}
                                                />
                                            )
                                            :
                                            (
                                                <Image
                                                    source={iconStr.img_male}
                                                    style={styles.avatarSelect}
                                                />
                                            )
                                        }

                                        <Image
                                            source={iconStr.ic_clear_text}
                                            style={styles.closeAvatar}
                                        />
                                    </View>
                                    <Text style={{ maxWidth: Sizes.s200, textAlign: 'center', color: 'blue' }} numberOfLines={1}>{item.value.item1}</Text>

                                </TouchableOpacity>
                            )
                            :
                            (
                                <View style={{}}></View>
                            )

                }
            </View>
        )
    }

}

const styles = StyleSheet.create({
    touch: {
        flexDirection: 'row',
        width: '100%',
        paddingVertical: Sizes.h20,
        alignItems: 'center',
        paddingHorizontal: Sizes.h10,
        justifyContent: 'space-between'
    },
    image: {
        width: Sizes.s60,
        height: Sizes.s60,
        marginHorizontal: Sizes.h10
    },
    text: {
        color: 'black',
        fontSize: Sizes.s30,
        marginHorizontal: Sizes.h20,
        textAlign: "left",
        // backgroundColor: 'red',
        flex: 1,
    },

    avatar: {
        width: Sizes.s90,
        height: Sizes.s90,
        borderRadius: Sizes.s45
    },
    avatarSelect: {
        width: Sizes.s90,
        height: Sizes.s90,
        borderRadius: Sizes.s45,
        // padding: Sizes.h10
    },
    closeAvatar: {
        width: Sizes.s45,
        height: Sizes.s45,
        position: 'absolute',
        alignSelf: 'flex-end',
        // backgroundColor: 'red'
    },
    infoUser: {
        flex: 1,
        marginHorizontal: Sizes.h20,
        textAlign: "left"
    },
    check: {
        width: Sizes.s60,
        height: Sizes.s60,
    },

    select: {
        width: 50,
        height: 50,
        backgroundColor: 'orange',
        margin: Sizes.h10
    },

    textUser1: {
        color: 'blue',
        fontSize: Sizes.s30,
    },
    textUser2: {
        color: 'black',
        fontSize: Sizes.s25,
    },
    textUser3: {
        color: 'gray',
        fontSize: Sizes.s25,
    },
})
