import React, {Component} from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import colors from 'ChatApp/app/assets/colors';
import ListDivider from 'ChatApp/app/common/ListDivider';
import TouchableGlobal from 'ChatApp/app/common/TouchableGlobal';
import firebase from 'ChatApp/app/services/firebase';

export default class Profile extends Component{
    static navigatorStyle = {
        collapsingToolBarImage: require('ChatApp/app/assets/images/background.jpg'),
        collapsingToolBarCollapsedColor: colors.primaryDark,
    }

    render(){
        return(
            <ScrollView style={{flex:1, backgroundColor: colors.background}}>
                <TouchableGlobal onPress={this.logOut}>
                    <View style={{backgroundColor: colors.listBackground, padding:15}}>
                        <Text style={{color: colors.primaryText, fontSize:16}}>Logout</Text>
                    </View>
                </TouchableGlobal>
                <ListDivider />
                <TouchableGlobal onPress={() => {this.props.navigator.push({screen: 'chatapp.UserProfileImage', title: 'User Profile Image'})}}>
                    <View style={{backgroundColor: colors.listBackground, padding:15}}>
                        <Text style={{color: colors.primaryText, fontSize:16}}>Profile Image</Text>
                    </View>
                </TouchableGlobal>
            </ScrollView>
        );
    }

    logOut(){
        firebase.auth().signOut().then(function() {
        }, function(error){
        });
    }
}

const styles = StyleSheet.create({
    item: {

    }
});
