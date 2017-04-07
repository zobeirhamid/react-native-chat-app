import React, {Component} from 'react';
import {Platform, View, StyleSheet} from 'react-native';
import colors from 'ChatApp/app/assets/colors';

export default class StatusBarBackground extends Component{
    render(){
        if(Platform.OS === 'ios'){
            return(
                <View style={[styles.statusBarBackground, this.props.style || {}]}></View>
            );
        }
        return <View></View>;
    }
}

const styles = StyleSheet.create({
    statusBarBackground: {
        height: 20,
        backgroundColor: colors.background,
    }
});
