import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from 'ChatApp/app/assets/colors';
import { iconsMap } from 'ChatApp/app/helpers/Icons';
import firebase from 'ChatApp/app/services/firebase';
import TouchableGlobal from 'ChatApp/app/common/TouchableGlobal';
import AuthLayout from 'ChatApp/app/components/AuthLayout';
import CustomButton from 'ChatApp/app/common/CustomButton';
import {Kohana} from 'react-native-textinput-effects';

export default class Login extends Component{
    constructor(props){
        super(props);

        this.state = {
            email: '',
            password: '',
            inputColor: colors.accent,
            error: ' '
        }
    }

    render(){
        return(
            <AuthLayout
                background={require('ChatApp/app/assets/images/background.jpg')}
                heading='chat application'
                body={
                    <View>
                        <Text style={styles.error}>{this.state.error}</Text>
                        <View style={styles.inputContainer}>
                            <Kohana
                                iconClass={Ionicons}
                                iconName={(Platform.OS === 'android') ? 'md-mail' : 'ios-mail'}
                                style={styles.inputControl}
                                iconColor={this.state.inputColor}
                                labelStyle={styles.input}
                                inputStyle={[styles.input, {color: this.state.inputColor}]}
                                ref={component => this.emailInput = component}
                                label='email'
                                value={this.state.email}
                                onChangeText={text => {this._handleChange(text, 'email')}}
                                onSubmitEditing={event => this.passwordInput.focus()}
                            />
                            <View style={styles.inputDivider} />
                            <Kohana
                                iconClass={Ionicons}
                                iconName={(Platform.OS === 'android') ? 'md-key' : 'ios-key'}
                                style={styles.inputControl}
                                iconColor={this.state.inputColor}
                                labelStyle={styles.input}
                                inputStyle={[styles.input, {color: this.state.inputColor}]}
                                ref={component => this.passwordInput = component}
                                label='password'
                                value={this.state.password}
                                onChangeText={text => {this._handleChange(text, 'password')}}
                                secureTextEntry={true}
                            />
                        </View>
                        <CustomButton style={styles.submitButton} onPress={this._handleSubmit.bind(this)} label='login' />
                    </View>
                }
                footer={
                    <TouchableOpacity onPress={() => {this.props.navigator.push({screen: 'chatapp.Register'})}}>
                        <Text style={styles.footerText}>don't have an account yet? just create one!</Text>
                    </TouchableOpacity>
                }
            />
        );
    }

    _handleSubmit(){
        if(!this.state.password || !this.state.email) return false;
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch(function(error) {
            this.setState({error: error.message, inputColor: colors.error});
        }.bind(this));
    }

    _handleChange(text, field){
        let state = {};
        state[field] = text;
        if(this.state.error !== ' '){
            state['error'] = ' ';
            state['inputColor'] = colors.accent;
        }

        this.setState(state);
    };
}

const styles = StyleSheet.create({
    headingContainer: {
        flex:1, 
        justifyContent: 'center', 
        alignItems:'center'
    },
    inputContainer: {
        margin:10, 
        padding:10, 
        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
        flexBasis:124
    },
    inputDivider: {
        height:1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    inputControl: {
        backgroundColor: 'transparent', 
        marginVertical:1 
    },

    input: {
        color: colors.primaryText, 
        fontSize:16, 
        fontWeight:'normal' 
    },
    submitButton: {
        marginHorizontal:10, 
    },
    error:{
        textAlign:'center', 
        color: colors.error,
        textShadowColor: 'black', 
        textShadowRadius:1, 
        textShadowOffset:{width: 0, height:1},
    },

    footerText: {
        fontSize:15, 
        color:'white', 
        textShadowColor: 'black', 
        textShadowRadius:5, 
        textShadowOffset:{width: 0, height:1},
    }
});
