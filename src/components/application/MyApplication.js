import React from 'react';
import { StyleSheet, View, Text, Image, SafeAreaView } from 'react-native';
import { Sizes } from '@dungdang/react-native-basic';
// import getImage from '../../../res/values/strings/iconStrS'
import CustomHeader from '../custom/CustomHeader';
import MyApplicationList from './myApplication/MyApplicationList'
import { userProfile } from '../../config/settings';
export default class MyApplication extends React.Component {
  render() {
    const { item } = this.props;
    return (
      <SafeAreaView style={styles.body}>
        <CustomHeader
          typeIconLeft={'back'}
          title={userProfile.LangID === 'VN' ? 'Đơn của tôi' : 'My application'}
          onPressLeft={() => {
            this.props.navigation.goBack();
          }}
          typeIconRight={'search'}
          onPressRight={() => {

          }}
        ></CustomHeader>
        <MyApplicationList> </MyApplicationList>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
});
