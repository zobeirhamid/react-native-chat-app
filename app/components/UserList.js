import React, {Component} from 'react';
import {FlatList} from 'react-native';
import UserListItem from 'ChatApp/app/components/UserListItem';
import ListDivider from 'ChatApp/app/common/ListDivider';

export default class UserList extends Component{
    render(){
        return (
            <FlatList 
                data={this.props.dataSource} 
                renderItem={this._renderRow.bind(this)} 
                enableEmptySections={true}
                ItemSeparatorComponent={this._renderSeparator}
                {...this.props} 
            />
        )
    }

    _renderSeparator(sectionID: number, rowID: number){
        return (
            <ListDivider key={`${sectionID}-${rowID}`} />
        )
    }

    _renderRow({item}){
        return (
            <UserListItem {...item} _key={item.key} navigator={this.props.navigator} />
        )
    }
}
