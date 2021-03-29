import React, {Component} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';

import {Sizes} from '@dungdang/react-native-basic';
import DashBoardCard from './DashBoardCard';

export default class DashBoardList extends Component {
  constructor(props) {
    super(props);
    this.state={
      data:[]
    }
  }

  componentDidMount(){
    this.props.getDashBoardFormAction({})
  }

  componentDidUpdate(preProps){
    if(preProps.dataForm!==this.props.dataForm && this.props.dataForm!==null)
    {
      this.setState({
        data:this.props.dataForm
      })
    }
  }
  

  render() {
    return (
      <SafeAreaView style={{flex: 1,backgroundColor:"white"}}>
        <FlatList
          ref={'detailList'}
          data={this.state.data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => {
            return (
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  backgroundColor: 'white',
                  marginVertical:10
                }}>
                <DashBoardCard item={item} {...this.props}></DashBoardCard>
              </View>
            );
          }}></FlatList>
      </SafeAreaView>
    );
  }
}
