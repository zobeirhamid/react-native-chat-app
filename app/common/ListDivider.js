import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import colors from 'ChatApp/app/assets/colors';

export default class ListDivider extends Component{
    render(){
        return(
            <View {...this.props} style={{backgroundColor:colors.background}}>
                <View
                    style={styles.itemSeparator}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    itemSeparator:{
        height:2,
        backgroundColor:colors.divider,
        borderTopColor:colors.dividerDark,
        borderTopWidth:1
    }
});
