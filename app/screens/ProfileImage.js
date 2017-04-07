import React, {Component} from 'react';
import {Text, View, StyleSheet, Dimensions, Image} from 'react-native';
import colors from 'ChatApp/app/assets/colors';
let {width} = Dimensions.get('window');

export default class ProfileImage extends Component{
    render(){
        return(
            <View style={{flex: 1, justifyContent:'center', alignItems:'center', backgroundColor: colors.background}}>
                <Image source={this.props.image} style={{width:width, height:width}} />
            </View>
        );
    }
}
