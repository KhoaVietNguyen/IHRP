import * as React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  ScrollView,
  StatusBar,
  RefreshControl,
} from "react-native";
import { arrayIsEmpty, } from "@dungdang/react-native-basic/src/Functions";
import { Sizes } from "@dungdang/react-native-basic";
import getImage from "../../../res/values/strings/iconStrS";
import { colorPersonal } from "../../../res/values/strings/colorStr";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import CustomHeader from "../../custom/CustomHeader";
import Loading from "../../custom/Loading";
import FormDetail from "../../../components/custom/form/FormDetail";
import { textForm } from "../../../components/custom/form/FormTypeDetail";

const personalTab = (value) => {
  return (
    <ScrollView style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          backgroundColor: colorPersonal.tabBar,
          padding: Sizes.s30,
        }}
      >
        <FormDetail form={CreateFormTab(value)} onPressButton={() => { }} />
      </View>
    </ScrollView>
  );
};

const CreateForm = (DataList) => {
  let form = [];
  console.log("AAAAAAAAAA")
  for (let [key, value] of Object.entries(DataList[0])) {
    let StrArray = key.split("_");
    console.log("StrArray", StrArray[0], StrArray[1])
    form.push(
      textForm(
        StrArray[0],
        "I",
        "textForm",
        null,
        null,
        StrArray[1],
        "0",
        null,
        7,
        value,
        null,
        false,
        StrArray[1]
      )
    );
  }
  return form;
};

const CreateFormTab = (DataList) => {
  let form = [];
  for (let item of DataList) {
    form.push(
      textForm(
        item.value.id,
        "I",
        "textForm",
        null,
        null,
        item.value.key,
        "0",
        null,
        7,
        item.value.value,
        null,
        false,
        item.value.key
      )
    );
  }
  return form;
};

class PersonalPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      routes: [],
      reload: false,
      isTab: false,
    };
  }

  getHeader = (dataItem) => {
    let header = [];
    let i = 0;
    for (const [key, value] of Object.entries(dataItem[0])) {
      if (key.includes("#")) {
        header.push({ key: i + "", title: value });
        i++;
      }
    }
    return header;
  };

  getBody = (dataItem) => {
    // console.log('4444444444444444', dataItem)
    let mang1 = [];
    let mang2 = [];
    let i = 0;
    for (let [key, value] of Object.entries(dataItem[0])) {
      if (key.includes("#")) {
        mang1.push({
          id: key.split("_")[0],
          key: key.split("#")[1],
          value: value,
        });
        i++;
      } else {
        if (key.includes("$$")) {
          mang2.push({
            id: key.split("_")[0],
            key: key.split("$$")[1],
            value: value,
          });
          i++;
        } else {
          mang2.push({
            id: key.split("_")[0],
            key: key.split("_")[1],
            value: value,
          });
          i++;
        }
      }
    }
    let temp = [];
    for (let i = 0; i < mang1.length; i++) {
      for (let j = 0; j < mang2.length; j++) {
        if (i === mang1.length - 1) {
          if (mang2[j].id > mang1[i].id) {
            temp.push({ key: i, value: mang2[j] });
          }
        } else {
          if (mang2[j].id > mang1[i].id && mang2[j].id < mang1[i + 1].id) {
            temp.push({ key: i, value: mang2[j] });
          }
        }
      }
    }
    // console.log('mang1', mang1)
    // console.log('mang2', mang2)
    return temp;
  };

  mapTilteToScreen = (headerList, itemList) => {
    const { dataItem } = this.props;
    var map = {};
    let i = 0;
    for (i; i < headerList.length; i++) {
      Object.assign(map, {
        [i]: personalTab.bind(
          this,
          this.getDataItem(i, this.getBody(dataItem))
        ),
      });
    }
    return map;
  };

  getDataItem = (index, dataList) => {
    let temp = [];
    for (let item of dataList) {
      if (item.key === index) {
        temp.push(item);
      }
    }
    return temp;
  };
  onReload() {
    // console.log("On Reload")
    this.setState({
      reload: true,
    });
    this.props.getPrivateGenViewAction(
      this.props.navigation.getParam('id', 'No id'),
    );
  }
  componentDidUpdate(prevProps) {
    if (prevProps.dataItem !== this.props.dataItem && this.props.dataItem !== null) {
      this.setState({
        reload: false,
      });
    }
    if (prevProps.dataItem !== this.props.dataItem) {
      if (!arrayIsEmpty(this.props.dataItem)) {
        let checkTab = this.getHeader(this.props.dataItem)
        if (!arrayIsEmpty(checkTab)) {
          this.setState({
            isTab: true
          })
        }
      }
    }
  }
  componentDidMount() {

  }
  render() {
    const { dataItem, error, loading } = this.props;
    const { isTab } = this.state
    // console.log(this.props.id, this.props.allowEdit, this.props.desc);
    // console.log('Personal Page - dataItem: ', dataItem, this.props.allowEdit)
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, backgroundColor: colorPersonal.tabBar }}>
          <CustomHeader
            typeIconLeft={"back"}
            onPressLeft={() => {
              // this.props.Get_PrivateGeneral({});
              this.props.RemovePrivateGenViewAction({});
              this.props.navigation.goBack();
            }}
            title={this.props.desc}
            typeIconRight={this.props.allowEdit === "1" ? "edit" : ""}
            onPressRight={() => {
              this.props.navigation.navigate("PersonalFormContainer", {
                id: this.props.id,
                desc: this.props.desc,
                status: this.props.status,
              });
            }}
          />
          {(this.state.reload && loading) ? <></> : loading && <Loading />}
          {!arrayIsEmpty(dataItem) ? (
            isTab === true ? (
              <ScrollView
                style={{ flex: 1, }}
                refreshControl={
                  <RefreshControl
                    refreshing={this.state.reload}
                    onRefresh={this.onReload.bind(this)}
                  />
                }
              >
                <TabView
                  navigationState={{
                    index: this.state.index,
                    routes: this.getHeader(dataItem),
                  }}
                  renderScene={SceneMap(
                    this.mapTilteToScreen(
                      this.getHeader(dataItem),
                      this.getBody(dataItem)
                    )
                  )}
                  renderTabBar={(props) => (
                    <TabBar
                      horizontal
                      {...props}
                      indicatorStyle={styles.indicatorStyle}
                      style={{ backgroundColor: colorPersonal.tabBar }}
                      labelStyle={styles.labelStyle}
                      scrollEnabled={true}
                    />
                  )}
                  onIndexChange={(index) => this.setState({ index })}
                  initialLayout={{ width: Dimensions.get("window").width }}
                />
              </ScrollView>
            ) : (
                <ScrollView
                  style={{ flex: 1 }}
                  refreshControl={
                    <RefreshControl
                      refreshing={this.state.reload}
                      onRefresh={this.onReload.bind(this)}
                    />
                  }
                >
                  <View
                    style={{
                      flex: 1,
                      backgroundColor: colorPersonal.tabBar,
                      padding: Sizes.s30,
                    }}
                  >
                    <FormDetail
                      form={CreateForm(dataItem)}
                      onPressButton={() => { }}
                    />
                  </View>
                </ScrollView>
              )
          ) : (
              <View style={styles.styleError}>
                <Image
                  source={getImage("img_empty_data_2")}
                  style={{ resizeMode: "contain" }}
                />
                <Text
                  style={{
                    fontSize: Sizes.s40,
                    fontWeight: "bold",
                    color: colorPersonal.error,
                  }}
                >
                  {error}
                </Text>
              </View>
            )}
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  styleError: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  labelStyle: {
    width: Sizes.s340,
    color: colorPersonal.tabBarTextLine,
    fontSize: Sizes.s30,
    fontWeight: "bold",
    textAlign: "center",
  },
  indicatorStyle: {
    borderBottomColor: colorPersonal.tabBarTextLine,
    borderBottomWidth: Sizes.s10,
  },
});

export default PersonalPage;
