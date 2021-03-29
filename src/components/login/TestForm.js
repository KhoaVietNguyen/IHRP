import * as React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { leaveApplication } from '../custom/form/FormTypes'
import Form from '../custom/form/Form'
import { objectIsNull } from '@dungdang/react-native-basic/src/Functions'

export default class TestForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            _leaveApplication: leaveApplication()
        }
    }
    onPressButton = () => {

        // let form = this.state._leaveApplication
        // for (let item of form) {
        //     if (item.id === '1') {
        //         item.label = item.label + '000'
        //     }
        // }
        // this.setState({
        //     _leaveApplication: form
        // })
    }
    onPressSummit = () => {
        let isEmpty = false
        if (!objectIsNull(this.refs.form.checkEmpty)) {
            isEmpty = this.refs.form.checkEmpty()
        }
        if (!isEmpty) {

        } else {

        }
    }
    render() {

        return (
            <View style={{ flex: 1, }}>
                <Form
                    ref={'form'}
                    form={this.state._leaveApplication}
                    onPressButton={this.onPressSummit}
                />
                <TouchableOpacity onPress={() => { 
                    // console.log('formmmmmmmmmm: ', this.state._leaveApplication) 
                    }}>
                    <View style={{ width: 100, height: 30, backgroundColor: 'red' }}></View>
                </TouchableOpacity>
            </View>
        )
    }
}