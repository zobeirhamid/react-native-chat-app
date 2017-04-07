import React, {Component} from 'react';
import BaseRepository from './BaseRepository';
import Moment from 'moment';
import User from 'ChatApp/app/models/User';

class ChatRepository extends BaseRepository{
    getAllChats(userID, component){
        this.refs.chatsRef = this.database.ref('user-messages').child(userID);
        this.refs.chatsRef.on('value', snapshot => {
            this.chats = [];
            snapshot.forEach(child => {
                User.getUserById(child.key, user => {
                    this.chats.push(user);
                    this.getLatestMessage(user.key);
                    component.setState({
                        dataSource: this.sortArrayByTimestamp(this.chats)
                    });
                });
            });
        });
    }

    getLatestMessage(userID){
        this.refs.chatsRef.child(userID).limitToLast(1).on('value', messageSnapshot => {
            messageSnapshot.forEach(message => {
                this.chats[this.chats.length-1].text = message.val().body ? message.val().body : 'Image';
                this.chats[this.chats.length-1].timestamp = message.val().timestamp;
            });
        });
    }
}

export default new ChatRepository;
