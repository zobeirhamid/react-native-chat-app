import React, {Component} from 'react';
import {TouchableNativeFeedback, TouchableOpacity, Platform} from 'react-native';

export default class TouchableGlobal extends Component{
    render(){
        if(Platform.OS === 'android') {
            return (
                <TouchableNativeFeedback background={TouchableNativeFeedback.SelectableBackground()} {...this.props}>
                    {this.props.children}
                </TouchableNativeFeedback>
            );
        } else{
            return(
                <TouchableOpacity {...this.props}>
                    {this.props.children}
                </TouchableOpacity>
            );
        }
    }
}
