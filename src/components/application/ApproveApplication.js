import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Modal,
  Text,
  TouchableOpacity,
} from 'react-native'
import { Sizes } from '@dungdang/react-native-basic'
import ItemApprove from '../application/ItemApprove'
import CustomMultiHeader from '../custom/CustomMultiHeader'
import { CustomControlTab } from '../custom/CustomControlTab'
import { CustomButton } from '../custom/CustomButton'
import getImage from '../../res/values/strings/iconStrS'
import { colorApprove } from '../../res/values/strings/colorStr'
import { arrayIsEmpty } from '@dungdang/react-native-basic/src/Functions';
import { userProfile } from '../../config/settings'
import { appStrS } from '../../res/values/strings/appStrS'

class ApproveApplication extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: false,
      menu_right: false,
      allow: false,
    };
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <CustomMultiHeader
            title={userProfile.LangID === 'VN' ? appStrS.vn.approveApplication.title : appStrS.en.approveApplication.title}
            arrayLeft={[{ onPress: () => { } }, { onPress: () => { } }]}
            arrayRight={(this.state.selectedIndex) ?
              [{
                onPress: () => {
                  this.props.navigation.navigate(
                    'ApproverApplicationSearchContainer',
                  );
                  // console.log(this.props.loading);
                },
                icon: getImage('ic_search_empty'),
              }]
              :
              [{
                onPress: () => {
                  this.setState({
                    menu_right: !this.state.menu_right,
                    allow: !this.state.allow,
                  });
                },
                icon: getImage('ic_private_edit'),
              }]
            }
          />
          <CustomControlTab
            titleLeft={userProfile.LangID === 'VN' ? appStrS.vn.approveApplication.not_approved : appStrS.en.approveApplication.not_approved}
            titleRight={userProfile.LangID === 'VN' ? appStrS.vn.approveApplication.approved : appStrS.en.approveApplication.approved}
            backgroundColorLeft={
              this.state.selectedIndex
                ? colorApprove.bg_right
                : colorApprove.bg_left
            }
            backgroundColorRight={
              this.state.selectedIndex
                ? colorApprove.bg_left
                : colorApprove.bg_right
            }
            onPressLeft={(value) => {
              this.setState({ selectedIndex: value }, () => {
                let input = [{ ID: "1" }, { ID: "3" }, { ID: "11" }, { ID: "75" }, { ID: "87" }];
                // let input = [{ ID: "1" }, { ID: "3" }, { ID: "11" }, { ID: "75" }];
                this.props.waitingListForApprovalAction(input);

              });
            }}
            onPressRight={(value) => {
              this.setState({ selectedIndex: value }, () => {
                let input = [{ ID: "1" }, { ID: "3" }, { ID: "11" }, { ID: "75" }, { ID: "87" }];
                // let input = [{ ID: "1" }, { ID: "3" }, { ID: "11" }, { ID: "75" }];
                this.props.getHistoryOfApprovalMenuListAction(input);

              });
            }}
          />
          <ItemApprove
            select={this.state.selectedIndex}
            menu_right={this.state.menu_right}
            allow={this.state.allow}
            changeAllow={() => {
              this.setState({
                allow: !this.state.allow,
              })
            }}
            {...this.props}
          />
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorApprove.styleContainer,
    alignItems: 'center',
  },
  modalBackground: {
    backgroundColor: '#000',
    width: '100%',
    height: '100%',
    opacity: 0.3,
    position: 'absolute',
  },
  centeredView: {
    flex: 1,
    alignItems: 'flex-end',
    marginTop: Sizes.s75,
    padding: Sizes.s30,
  },
  menu: {
    width: '50%',
    backgroundColor: '#FFF',
    alignItems: 'center',
    borderRadius: Sizes.h48,
    borderWidth: Sizes.s2,
  },
});

export default ApproveApplication
