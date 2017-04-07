import React, {Component} from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import StatusBarBackground from 'ChatApp/app/common/StatusBarBackground';
import colors from 'ChatApp/app/assets/colors';

export default class AuthLayout extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <Image source={this.props.background} style={styles.imageContainer}>
                <StatusBarBackground />
                <View style={styles.container}>
                    <View style={styles.headingContainer}>
                        <Text style={styles.heading}>{this.props.heading}</Text>
                    </View>
                    <View>
                        {this.props.body}
                    </View>
                    <View style={styles.footerContainer}>
                        {this.props.footer}
                    </View>
                </View>
            </Image>
        );
    }
}

const styles = StyleSheet.create({
    imageContainer: {
        flex:1, 
        width: undefined, 
        height: undefined
    },
    container: {
        flex:1, 
        justifyContent:'center', 
        backgroundColor:'transparent'
    },
    headingContainer: {
        flex:1, 
        justifyContent: 'center', 
        alignItems:'center'
    },
    heading: {
        fontSize:43, 
        paddingHorizontal: 10, 
        margin: 5,  
        fontWeight:'100', 
        color:'white', 
        textShadowColor: 'black', 
        textShadowRadius:5, 
        textShadowOffset:{width: 0, height:1}, 
        backgroundColor:'rgba(0, 0, 0, 0.5)',
        textAlign:'center'
    },
    footerContainer: {
        flex:1, 
        justifyContent: 'center', 
        alignItems:'center'
    },
});
