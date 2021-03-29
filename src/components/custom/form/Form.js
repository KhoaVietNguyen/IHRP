import * as React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import {Sizes} from '@dungdang/react-native-basic';
import {Functions} from '@dungdang/react-native-basic';
const {objectIsNull, arrayIsEmpty, stringIsEmpty} = Functions;
import CustomPicker from '../CustomPicker';
import CustomSearchPicker from '../CustomSearchPicker';
import {CustomTextInput} from '../CustomTextInput';
import CustomTwoDatePicker from '../CustomTwoDatePicker';
import CustomTwoTimePicker from '../CustomTwoTimePicker';
import {CustomText} from '../CustomText';
import CustomTwoCheckBox from '../CustomTwoCheckBox';
import CustomTwoButton from '../CustomTwoButton';
import CustomTwoText from '../CustomTwoText';
import CustomDatePicker from '../CustomDatePicker';
import {colorForm} from '../../../res/values/strings/colorStr';
import CustomSearchPickerContainer from '../../../containers/custom/CustomSearchPickerContainer';
import CustomSwitchButton from '../CustomSwitchButton'; //ngantt97

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  checkEmpty() {
    const {form} = this.props;
    let isEmpty = false;
    for (let item of form) {
      if (!objectIsNull(this.refs[`item${item.id}`])) {
        if (this.refs[`item${item.id}`].checkEmpty()) {
          isEmpty = true;
        }
      }
    }
    return isEmpty;
  }

  renderForm = () => {
    const {form} = this.props;
    const list = [];
    for (let item of form) {
      list.push(<Item item={item} {...this.props} ref={`item${item.id}`} />);
    }
    return <View style={{flex: 1}}>{list}</View>;
  };

  render() {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          flex: 1,
          flexGrow: 1,
        }}>
        {this.renderForm()}
      </ScrollView>
    );
  }
}

class Item extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            item: this.props.item,
            error: '',
        };
    }
    componentDidUpdate(prevProps) {
        if (this.props.item !== prevProps.item) {
            this.onResetError()
        }
        // if (!objectIsNull(this.props.item) && !objectIsNull(prevProps.item)) {
        //     if (this.props.item.value !== prevProps.item.value) {
        //         console.log('3333333333333333333')
        //         this.onResetError()
        //     }
        // }
    }

    checkEmpty() {
        const { item } = this.props;
        if (item.require) {
            if (
                item.type === 'TWO_DATEPICKER' ||
                item.type === 'TWO_TIMEPICKER' ||
                item.type === 'TWO_CHECKBOX'
            ) {
                if (!stringIsEmpty(item.valueFrom) && !stringIsEmpty(item.valueTo)) {
                } else {
                    this.setState({
                        error: '*Thông tin không hợp lệ',
                    });
                    return true;
                }
            } else {
                if (!stringIsEmpty(item.value)) {
                } else {
                    this.setState({
                        error: '*Trường này không được để trống !',
                    });
                    return true;
                }
            }
        } else {
          this.setState({
            error: '*Thông tin không hợp lệ',
          });
          return true;
        }
      } 
    onResetError = () => {
        this.setState({
            error: '',
        });
    };

    render() {
        // const { item } = this.state
        const { onPressButton, item } = this.props
        let itemView = null
        switch (item.type) {
            case 'TEXT':
                itemView = (
                    <CustomText item={item} />

                )
                break
            case 'PICKER':
                itemView = (
                    <CustomPicker
                        items={item.items !== undefined ? item.items : []}
                        mode={item.mode}
                        type={item.type}
                        item={item}
                        onPressSelected={(data) => {
                            this.onResetError()
                            item.value = data
                        }}
                    />
                )
                break
            case 'PICKER_MULTI':
                itemView = (
                    <CustomPicker
                        mode={item.mode}
                        type={item.type}
                        item={item}
                    />
                )
                break
            case 'PICKER_SEARCH':
                itemView = (
                    <CustomSearchPickerContainer
                        items={item.items !== undefined ? item.items : []}
                        mode={item.mode}
                        type={item.type}
                        item={item}
                        onPressSelected={(data) => {
                            this.onResetError()
                            item.value = data
                        }}
                    />
                )
                break
            case 'PICKER_SEARCH_MULTI':
                itemView = (
                    // <Text style={{ fontWeight: 'bold', fontSize: Sizes.s40, margin: Sizes.h10 }}> {item.type} </Text>
                    // <CustomSearchPicker
                    //     items={item.items !== undefined ? item.items : []}
                    //     mode={item.mode}
                    //     type={item.type}
                    //     item={item}
                    // />
                    <CustomSearchPickerContainer
                        items={item.items !== undefined ? item.items : []}
                        mode={item.mode}
                        type={item.type}
                        item={item}
                        onPressSelected={(data) => {
                            this.onResetError()
                            console.log('yyyy: ', data)
                            item.valule = data
                        }}
                    />
                )
                break
            case 'TEXT_INPUT':
                itemView = (
                    // <Text style={{ fontWeight: 'bold', fontSize: Sizes.s40, margin: Sizes.h10 }}> {item.type} </Text>
                    <CustomTextInput item={item} onChangeText={(text) => {
                        // this.setState({
                        //     item: Object.assign({}, item, { value: text })
                        // })
                        item.value = text
                        this.onResetError()
                    }} />
                )
                break
            case 'TWO_DATEPICKER':
                itemView = (
                    // <Text style={{ fontWeight: 'bold', fontSize: Sizes.s40, margin: Sizes.h10 }}> {item.type} </Text>
                    <CustomTwoDatePicker
                        valueFrom={item.valueFrom}
                        valueTo={item.valueTo}
                        onPressFromDate={(value) => {
                            item.valueFrom = value
                            this.onResetError()
                        }}
                        onPressToDate={(value) => {
                            item.valueTo = value
                            this.onResetError()
                        }}
                    />
                )
                break
            case 'DATE_PICKER':
                itemView = (
                    <CustomDatePicker
                        value={item.value}
                        onPressDate={(value) => {
                            item.value = value
                            this.onResetError()
                        }}
                    />
                )
                break
            case 'TWO_TIMEPICKER':
                itemView = (
                    // <Text style={{ fontWeight: 'bold', fontSize: Sizes.s40, margin: Sizes.h10 }}> {item.type} </Text>
                    <CustomTwoTimePicker
                        valueFrom={item.valueFrom}
                        valueTo={item.valueTo}
                        onPressFromTime={(value) => {
                            item.valueFrom = value
                            this.onResetError()
                        }}
                        onPressToTime={(value) => {
                            item.valueTo = value
                            this.onResetError()
                        }}
                    />
                )
                break

            case 'TWO_CHECKBOX':
                itemView = (

                    <CustomTwoCheckBox
                        item={item}
                        onPressValueFrom={(value) => {
                            item.valueFrom = value
                            this.onResetError()
                        }}
                        onPressValueTo={(value) => {
                            item.valueTo = value
                            this.onResetError()
                        }}
                    />
                )
                break

            case 'TWO_BUTTON':
                itemView = (
                    <CustomTwoButton item={item} />
                    // <TouchableOpacity onPress={() => {
                    //     onPressButton()
                    // }} >
                    //     <Text style={{ fontWeight: 'bold', fontSize: Sizes.s40, margin: Sizes.h10 }}> {item.type} </Text>
                    // </TouchableOpacity>
                )
                break
            case 'TWO_TEXT':
                itemView = (
                    <CustomTwoText item={item} />
                )
                break

            // case 'TWO_CHECKBOX':
            //     itemView = (

            //         <CustomTwoCheckBox
            //             item={item}
            //             onPressValueFrom={(value) => {
            //                 item.valueFrom = value;
            //                 this.onResetError();
            //             }}
            //             onPressValueTo={(value) => {
            //                 item.valueTo = value;
            //                 this.onResetError();
            //             }}
            //         />
            //     );
            //     break;

            // case 'TWO_BUTTON':
            //     itemView = (
            //         <CustomTwoButton />
            //     );
            //     break;
            case 'INPUT_FILE':
                itemView = (
                    <Text
                        style={{
                            fontWeight: 'bold',
                            fontSize: Sizes.s40,
                            margin: Sizes.h10,
                        }}>
                        {' '}
                        {item.type}{' '}
                    </Text>
                );
                break;
            // case 'TWO_TEXT':
            //     itemView = <CustomTwoText item={item} />;
            //     break;
            case 'TOGGLE_PICKER':
                itemView = <CustomSwitchButton isOn={false} onColor={'blue'} offColor={'grey'} size={'small'}></CustomSwitchButton>;
                break;
            default:
                itemView = (
                    <Text
                        style={{
                            fontWeight: 'bold',
                            fontSize: Sizes.s40,
                            margin: Sizes.h10,
                        }}>
                        {' '}
                        {item.type}{' '}
                    </Text>
                );
                break;
        }
        return (
            <View style={styles.itemView}>
                {!stringIsEmpty(item.label) && (
                    <Text style={styles.itemTitle}>
                        {`${item.label} `}
                        {/* <Text>
                            {item.require === true && item.editable !== false ? '' : ''}
                        </Text> */}
                    </Text>
                )}
                {itemView}
                {(!stringIsEmpty(this.state.error) && stringIsEmpty(item.value)) && (
                    <Text style={styles.itemError}>{this.state.error}</Text>
                )}
            </View>
        );
        
  }
}

const styles = StyleSheet.create({
  itemView: {
    marginVertical: Sizes.h10,
  },
  itemTitle: {
    color: colorForm.labelForm,
    fontSize: Sizes.s30,
    marginBottom: Sizes.h10,
    fontWeight: '600',
  },
  itemRequire: {
    color: 'red',
    fontSize: Sizes.s30,
  },
  itemError: {
    color: 'red',
    fontSize: Sizes.s25,
    fontStyle: 'italic',
  },
});
