import React, {Component} from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import TouchableGlobal from 'ChatApp/app/common/TouchableGlobal';
import colors from 'ChatApp/app/assets/colors';
import LightBox from 'ChatApp/app/common/LightBox';
import {CachedImage} from "react-native-img-cache";
import FileStorage from 'ChatApp/app/helpers/FileStorage';

export default class UserListItem extends Component{
    constructor(props){
        super(props);
    }

    render(){
        this.profileImage = <Image source={require("ChatApp/app/assets/images/profile/default.jpg")} style={styles.itemImage} />;
        if(this.props.profilePicture){
            this.profileImage = 
            <TouchableOpacity onPress={() => {this.showUserProfileImage()}}>
                <CachedImage source={{ uri: this.props.profilePicture }} style={styles.itemImage} />
            </TouchableOpacity>;
        }
        return(
            <TouchableGlobal style={{flex:1}} onPress={() => {this.showChat()}}>
                <View style={styles.itemContainer}>
                    <View style={styles.itemImageContainer}>
                        {this.profileImage}
                    </View>
                    <View style={styles.itemInformationContainer}>
                        <View style={styles.itemInformation}>
                            <View>
                                <Text style={styles.itemName}>{this.props.name}</Text>
                                <Text style={styles.itemText}>{this.props.text}</Text>
                            </View>
                            {this.props.children}
                        </View>
                    </View>
                </View>
            </TouchableGlobal>
        );
    }

    showChat(){
        this.props.navigator.push({
            screen: 'chatapp.Chat', 
            title: this.props.name,
            passProps: {
                _key: this.props._key,
            }
        });
    }

    showUserProfileImage(){
        this.props.navigator.push({
            screen: "chatapp.ProfileImage",
            passProps: {image: {uri: this.props.profilePicture}},
            title: this.props.name,
        });

    }
}

const styles = StyleSheet.create({
    itemContainer: {
        flex:1,
        flexDirection:'row',
        alignItems: 'center',
        backgroundColor: colors.listBackground,
    },

    itemImageContainer: {
        width:80,
        height:80,
    },

    itemImage: {
        margin:10,
        width: 60,
        height:60,
        borderRadius:30,
    },

    itemInformationContainer:{
        flex:1,
        flexDirection:'row',
        alignItems: 'center',
        marginRight:10
    },

    itemInformation:{
        flex:1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    itemName: {
        fontSize: 17,
        color:colors.primaryText,
        paddingBottom:2,
    },

    itemText: {
        color: colors.primaryText
    }
});
