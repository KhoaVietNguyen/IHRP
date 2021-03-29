import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
import getImage from '../../res/values/strings/iconStrS';
import { Sizes } from '@dungdang/react-native-basic';
import {
  objectIsNull,
  stringIsEmpty,
} from '@dungdang/react-native-basic/src/Functions';
import { colorForm } from '../../res/values/strings/colorStr';
import DocumentPicker from 'react-native-document-picker';
import { fontSizes, fontColors, fontView } from '../../res/values/styles/appStyles'
import { userProfile } from '../../config/settings';
import RNFS from 'react-native-fs'
export default class CustomAttachFile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fileName: '',
    };
  }
  componentDidUpdate(prevProps) {
    if (this.props.value !== prevProps.value) {
      if (stringIsEmpty(this.props.value)) {
        this.setState({ fileName: '' });
      } else {
        this.setState({
          fileName: this.props.value,
        });
      }
    }
  }
  // async onChooseFile() {
  //   // console.log('onChooseFile -.................')
  //   this.props.navigation.navigate('ShowGalleryContainer', { typeImage: 'attachFile', setDataFromGallery: this.setDataFromGallery })
  // }

  setDataFromGallery = (data) => {
    // console.log('1111111111111111111111111: ', data)
    this.setState({
      fileName: data.name,
    }, () => {
      if (!objectIsNull(this.props.onPress)) {
        this.props.onPress(data);
      }
    })

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

  // Đọc file .....
  async onChooseFile() {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      if (!objectIsNull(res)) {
        if (res.size / 1048576 > 4) {
          Alert.alert(userProfile.LangID === 'VN' ? 'Thông báo' : 'Notice', userProfile.LangID === 'VN' ? 'Kích thước file không được vượt quá 4MB.' : 'The file size should not exceed 4MB.', [
            { text: userProfile.LangID === 'VN' ? 'Đóng' : 'Cancel' },
          ]);
        } else {
          let content = await RNFS.readFile(decodeURI(res.uri), 'base64');
          if (content.length > 0) {
            let nameUUID = this.uuidv4();
            let name = nameUUID;
            for (let i = 0; i < 4; i++) {
              name = name.replace("-", "");
            }
            let split = res.name.split(".")

            this.setState(
              {
                fileName: `${name}.${split[split.length - 1]}`,
              },
              () => {

                if (!objectIsNull(this.props.onPress)) {
                  this.props.onPress({
                    uri: res.uri,
                    name: this.state.fileName,
                    file: content
                  });
                }
              },
            );
          } else {
            Alert.alert(
              userProfile.LangID === 'VN' ? 'Thông báo' : 'Notice',
              userProfile.LangID === 'VN' ? 'Định dạng tập tin không hợp lệ. Vui lòng kiểm tra lại !' : 'Invalid File Format. Please check again !',
              [{
                text: userProfile.LangID === 'VN' ? 'Đóng' : 'Close',
                onPress: () => {

                }
              }]
            )
          }

        }
      }

      console.log('RessFile: ', res);
      console.log('logAttachFileURI: ', res.uri);
      console.log('logAttachFileTYPE: ', res.type);
      console.log('logAttachFileNAME: ', res.name);
      console.log('logAttachFileSIZE: ', res.size);
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
      } else {
      }
    }
  }
  render() {
    const { item, onPressDeleteValue, value } = this.props;
    return (
      <TouchableOpacity
        disabled={
          objectIsNull(item)
            ? false
            : item.editable === false
              ? !stringIsEmpty(item.value)
                ? false
                : true
              : false
        }
        onPress={() => {
          console.log('11111111111111111111')
          if (!stringIsEmpty(item.value)) {
            let split = item.value.split('.')
            let type = split[split.length - 1]
            if (
              type.toLocaleUpperCase() === 'PNG'.toLocaleUpperCase() ||
              type.toLocaleUpperCase() === 'JPG'.toLocaleUpperCase()
            ) {
              // this.props.navigation.navigate('ImageView', { imageBase64: fileBase64 })
              if (!objectIsNull(item.onPressViewFile)) {
                item.onPressViewFile();
              }
            } else {
              if (!objectIsNull(item.onPressReadFile)) {
                item.onPressReadFile();
              }
            }

          } else {
            this.onChooseFile();
          }
        }}
        style={[styles.body, {
          paddingVertical: (stringIsEmpty(value) && stringIsEmpty(this.state.fileName)) ? fontView.paddingVerticalText
            : fontView.paddingVertical
        }]}>
        {(stringIsEmpty(value) && stringIsEmpty(this.state.fileName)) ?
          (
            <Text style={styles.title}>{!stringIsEmpty(item) ? item.caption : ''}</Text>
          )
          :
          (
            <View>
              <Text style={styles.titleSmall}>{!stringIsEmpty(item) ? item.caption : ''}</Text>
              <Text style={styles.textInput}>{stringIsEmpty(value) ? this.state.fileName : value}</Text>
            </View>
          )
        }

        {!stringIsEmpty(this.state.fileName) && item.editable ? (
          <TouchableOpacity
            onPress={() => {
              if (!objectIsNull(onPressDeleteValue)) {
                onPressDeleteValue();
                this.setState({
                  fileName: '',
                });
              }
            }}>
            <Image
              source={getImage('ic_close_black')}
              style={styles.iconRequire}
            />
          </TouchableOpacity>
        ) : (
            <Image source={getImage('ic_attach')} style={styles.iconRequire} />
          )}
        {/* {item.require && item.value === '' &&
                (
                    <Image source={iconStr.ic_pen} style={styles.iconRequire} />
                )
            } */}
      </TouchableOpacity>
    );
  }
}


const styles = StyleSheet.create({
  body: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: fontView.paddingHorizontal,
    // paddingVertical: fontView.paddingVertical,
    alignItems: 'center',
    borderRadius: fontView.border,
    borderWidth: fontSizes.border,
    borderColor: fontColors.border,
    // marginHorizontal: Sizes.h20
    alignSelf: 'center',
    backgroundColor: colorForm.inputForm,
  },
  textInput: {
    flex: 1,
    fontSize: fontSizes.title,
    // paddingVertical: Sizes.h10,
    color: 'blue',
    textDecorationLine: "underline"
  },
  title: {
    fontSize: fontSizes.title,
    color: fontColors.title
  },
  titleSmall: {
    fontSize: fontSizes.titleSmall,
    color: fontColors.title
  },
  iconRequire: {
    width: Sizes.s45,
    height: Sizes.s45,
  },
});
