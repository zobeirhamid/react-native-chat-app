import React, {Component} from 'react';
import {View, Platform, Text} from 'react-native';
import MessageList from 'ChatApp/app/components/MessageList';
import MessageInput from 'ChatApp/app/components/MessageInput';
import { iconsMap } from 'ChatApp/app/helpers/Icons';
import colors from 'ChatApp/app/assets/colors';
import KeyBoardSpacer from 'react-native-keyboard-spacer';
import firebase from 'ChatApp/app/services/firebase';
import MessageRepository from 'ChatApp/app/repositories/firebase/MessageRepository';

export default class  extends Component{
    static navigatorStyle = {
        navBarHideOnScroll: false,
        tabBarHidden: true,
    };

    constructor(props){
        super(props);
        this.state = {
            auth: false
        }
        this._auth = firebase.auth().currentUser.uid;
        this.props.navigator.setButtons({
            rightButtons:[
                {
                    id: 'add-image',
                    icon: (Platform.OS == 'ios') ? iconsMap['ios-add'] : iconsMap['md-add']
                }

            ]
        });
        this.props.navigator.setOnNavigatorEvent(this._onNavigatorEvent.bind(this));
    }

    _onNavigatorEvent(event){
        if(event.type == 'NavBarButtonPress'){
            if(event.id == 'add-image'){
                MessageRepository.sendImage(this._auth, this.props._key);
            }
        }
    }

    componentDidMount(){
        this.setState({
            auth: firebase.auth().currentUser.uid
        });
    }

    render(){
        return(
            <View style={{flex:1, backgroundColor:colors.background}}>
                <MessageList _key={this.props._key} _auth={this._auth} />
                <MessageInput _key={this.props._key} _auth={this._auth} />
                {Platform.OS === 'ios' && <KeyBoardSpacer/>}
            </View>
        );
    }
}
