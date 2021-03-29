import * as React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {Sizes, Functions} from '@dungdang/react-native-basic';
import ToggleSwitch from 'toggle-switch-react-native';

export default class CustomSwitchButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOn: this.props.isOn,
    };
   this.props.onClick(this.state.isOn)
  }
  
  render() {
    const {onClick} = this.props;
    const {isOn} = this.state;
    return (
      <ToggleSwitch
        isOn={this.state.isOn}
        onColor={this.props.onColor}
        offColor={this.props.offColor}
        size={this.props.size}
        onToggle={(isOn) => {
         
            this.setState({isOn: !this.state.isOn}, () => {
              onClick(this.state.isOn);
            });
          // }else{
          //   this.setState({isOn: 0}, () => {
          //     onClick(this.state.isOn);
          //   });
          // }
        }}
      />
    );
  }
}
