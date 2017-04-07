import React, {Component} from 'react';
import RNFetchBlob from 'react-native-fetch-blob';
import {Image, Platform} from 'react-native';
import BaseRepository from './BaseRepository';
import Moment from 'moment';
import FirebaseStorage from 'ChatApp/app/helpers/FirebaseStorage';
import ImagePickerHelper from 'ChatApp/app/helpers/ImagePickerHelper';
import Message from 'ChatApp/app/models/Message';

class MessageRepository extends BaseRepository{
    getAllMessages(userID, partnerID, component){
        this.refs.messagesRef = this.database.ref('user-messages').child(userID).child(partnerID);
        this.refs.messagesRef.on('value', (snapshot) => {
            this.messages = [];
            let message;
            snapshot.forEach((child) => {
                message = {
                    key: child.key,
                    fromID: child.val().fromID,
                    body: child.val().body,
                    image: child.val().image,
                    timestamp: Moment(child.val().timestamp).fromNow()
                }
                this.messages.unshift(message);
            });
            component.setState({
                dataSource: this.messages
            });
        });
    }

    sendMessage(fromID, toID, body = null, image = null){
        const messagesRef = this.database.ref('messages/').push();
        const fromRef = this.database.ref('user-messages/').child(fromID).child(toID).child(messagesRef.key);
        const toRef = this.database.ref('user-messages/').child(toID).child(fromID).child(messagesRef.key);
        let message = {
            fromID: fromID,
            toID: toID,
            body,
            image,
            timestamp: Date.now()
        }
        messagesRef.set(message);
        fromRef.set(message);
        toRef.set(message);
        return true;
    }

    sendImage(fromID, toID){
        const currentTime = Date.now();
        const target = 'message-images/' + fromID + '-' + toID + '-' + currentTime;
        ImagePickerHelper.showImagePicker()
            .then(file => {
                return FirebaseStorage.upload(target, file);
            })
            .then(url => {
                this.sendMessage(fromID, toID, null, url);
            });
    }
}

export default new MessageRepository;
