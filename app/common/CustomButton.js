import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import colors from 'ChatApp/app/assets/colors';
import TouchableGlobal from 'ChatApp/app/common/TouchableGlobal';

export default class CustomButton extends Component{
    render(){
        return(
            <TouchableGlobal {...this.props}>
                <View style={[styles.button, this.props.style || {}]}>
                    <Text style={[styles.buttonText, this.props.styleText || {}]}>{this.props.label}</Text>
                </View>
            </TouchableGlobal>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        justifyContent: 'center', 
        alignItems:'center', 
        padding:10, 
        backgroundColor:colors.accent
    },
    buttonText: {
        color:'white',
        fontSize:16
    }
});
