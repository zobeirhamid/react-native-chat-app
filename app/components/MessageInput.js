import React, {Component} from 'react';
import {Text, View, StyleSheet, Button, TextInput} from 'react-native';
import AutoExpandingTextInput from 'ChatApp/app/common/AutoExpandingTextInput';
import TouchableGlobal from 'ChatApp/app/common/TouchableGlobal';
import colors from 'ChatApp/app/assets/colors';
import MessageRepository from 'ChatApp/app/repositories/firebase/MessageRepository';

export default class MessageInput extends Component{
    constructor(props){
        super(props);
        this.state = {
            message: ''
        } 
    }
    render(){
        return(
            <View style={{flexDirection:'row', alignItems:'center', padding:5, margin:5, borderRadius:5, backgroundColor:colors.secondary}}>
                <AutoExpandingTextInput
                    ref={(component) => {this._message = component}}
                    onChangeText={(text) => {
                        this.setState({message: text});
                    }}
                    placeholder='just write another lovely message'
                    placeholderTextColor={colors.secondaryText}
                    underlineColorAndroid='transparent'
                    value={this.state.message}
                    returnKeyLabel='next'
                    blurOnSubmit={false}
                    style={styles.inputField}
                />
                <TouchableGlobal onPress={this.onSubmitEdit.bind(this)}>
                    <View>
                        <Text style={{color:colors.secondaryText, margin:5, fontSize:18}}>Send</Text>
                    </View>
                </TouchableGlobal>
            </View>
        );
    }

    onSubmitEdit(){
        if(this.state.message !== ''){
            const fromID = this.props._auth;
            const toID = this.props._key;
            if(MessageRepository.sendMessage(fromID, toID, this.state.message)){
                this._message.blur();
                this.setState({
                    message: ''
                });
            }
        }
    }
}

const styles = StyleSheet.create({
    inputField: {
        borderColor:'white',
        color:colors.secondaryText,
        height: 26,
        flex: 1,
        fontSize: 16,
        padding: 4,
    },
});
