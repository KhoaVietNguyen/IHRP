import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';

export default class PersonalHeader extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.headerContainer}>
        <Text style={styles.textStyle}>{this.props.text.toUpperCase()}</Text>
      </View>
    );
  }
}
let phoneWidth = Dimensions.get('screen').width;
let phoneHeight = Dimensions.get('screen').height;
const styles = StyleSheet.create({
  headerContainer: {
    width: phoneWidth,
    height: phoneHeight / 15,
    backgroundColor: '#f2f4f5',
    justifyContent:'center',

  },
  textStyle: {
    marginLeft: 10,
    
  },
});
