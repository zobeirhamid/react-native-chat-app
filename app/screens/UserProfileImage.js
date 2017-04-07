import React, {Component} from 'react';
import {Text, View, StyleSheet, Image, Dimensions} from 'react-native';
import CustomButton from 'ChatApp/app/common/CustomButton';
import UserRepository from 'ChatApp/app/repositories/firebase/UserRepository';
import firebase from 'ChatApp/app/services/firebase';
import colors from 'ChatApp/app/assets/colors';
let {width} = Dimensions.get('window');

export default class UserProfileImage extends Component{
    constructor(props){
        super(props);
        this.state = {
            profilePicture: null,
        }
        this.auth = firebase.auth().currentUser.uid;

    }
    componentDidMount(){
        UserRepository.getUserInformation(this.auth, this);
    }
    componentWillUnmount(){
        UserRepository.detachListeners();
    }

    _uploadImage(){
        UserRepository.uploadProfilePicture(this.auth);
    }

    render(){
        return(
            <View style={{flex:1, justifyContent:'center'}}>
                <View style={{backgroundColor:colors.primary}}>
                    <Image source={this.state.profilePicture} style={{width:width/1.5, height:width/1.5, margin:50, alignSelf:'center'}} />
                    <CustomButton onPress={() => {this._uploadImage()}} label='upload' />
                </View>
            </View>
            
        );
    }
}
