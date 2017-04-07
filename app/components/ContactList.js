import React, {Component} from 'react';
import {ListView} from 'react-native';
import UserList from 'ChatApp/app/components/UserList';
import ContactRepository from 'ChatApp/app/repositories/firebase/ContactRepository';

export default class ContactList extends Component{
    constructor(props){
        super(props);
        this.state = {
            dataSource: []
        }
    }

    componentDidMount(){
        ContactRepository.getAllContacts(this);
    }

    render(){
        return(
            <UserList {...this.props} dataSource={this.state.dataSource} />
        );
    }
}
