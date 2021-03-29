
import React from 'react';
import { Button, Image, View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import PersonalListContainer from './PersonalListContainer'

export default class UserInfo extends React.Component {
    render() {
        return (
            <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
                <View style={{ height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: "#eee" }}>
                    <PersonalListContainer {...this.props}></PersonalListContainer>
                </View>

            </SafeAreaView>
        );
    }
}