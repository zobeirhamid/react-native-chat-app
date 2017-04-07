import React, {Component} from 'react';
import {View, Text, ListView} from 'react-native';
import UserList from 'ChatApp/app/components/UserList';
import UserListItem from 'ChatApp/app/components/UserListItem';
import colors from 'ChatApp/app/assets/colors';
import Moment from 'moment';
import ChatRepository from 'ChatApp/app/repositories/firebase/ChatRepository';

export default class ChatList extends Component{
    constructor(props){
        super(props);
        this.state = {
            dataSource: []
        }
    }

    render(){
        return(
            <UserList {...this.props} dataSource={this.state.dataSource} renderItem={this._renderRow.bind(this)} />
        );
    }

    componentDidMount(){
        ChatRepository.getAllChats(this.props._auth, this);
    }

    componentWillUnmount(){
        ChatRepository.detachListeners();
    }

    _renderRow({item}){
        return (
            <UserListItem {...item} _key={item.key} navigator={this.props.navigator}>
                <View>
                    <Text style={{color: colors.primaryText}}>{Moment(item.timestamp).fromNow()}</Text>
                </View>
            </UserListItem>
        )
    }
}
