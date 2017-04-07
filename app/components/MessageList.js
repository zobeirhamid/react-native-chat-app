import React, {Component} from 'react';
import {Text, View, StyleSheet, FlatList, ScrollView, Image, Dimensions} from 'react-native';
import colors from 'ChatApp/app/assets/colors';
import InvertibleScrollView from 'react-native-invertible-scroll-view';
import MessageRepository from 'ChatApp/app/repositories/firebase/MessageRepository';
import LightBox from 'ChatApp/app/common/LightBox';
import {CachedImage} from "react-native-img-cache";
let {width} = Dimensions.get('window');
let imageDimensions = {
    width: width-150,
    height: (width-150)/(16/9)
};

export default class MessageList extends Component{
    constructor(props){
        super(props);
        this.state = {
            messages : [],
            dataSource: []
        }
    }

    componentDidMount(){
        MessageRepository.getAllMessages(this.props._auth, this.props._key, this);
    }

    componentWillUnmount(){
        MessageRepository.detachListeners();
    }

    render(){
        return(
            <FlatList data={this.state.dataSource} renderItem={this._renderRow.bind(this)} {...this.props} 
                enableEmptySections={true}
                renderScrollComponent={props => <InvertibleScrollView {...props} inverted />}
            />
        );
    }

    _renderRow({item}){
        let userID = this.props._auth;
        let body = item.body ? <Text style={item.fromID == userID ? ([styles.messageBody, styles.myMessageBody]) : (styles.messageBody)}>{item.body}</Text> : null;
        let image = item.image ? 
            <View style={styles.messageImageContainer}>
                <LightBox image={{uri: item.image}}>
                    <CachedImage source={{ uri: item.image }} style={styles.messageImage} />
                </LightBox>
            </View>
        : null;
        return(
            <View style={styles.messageContainer}>
                <View style={item.fromID == userID ? ([styles.message, styles.myMessage]) : (styles.message)}>
                    {image}
                    {body}
                    <Text style={item.fromID == userID ? ([styles.messageTime, styles.myMessageTime]) : (styles.messageTime)}>
                        {item.timestamp}
                    </Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    messageContainer: {
        transform: [{scaleY: -1}]
    },

    message: {
        padding:15,
        marginTop:10,
        marginRight:80,
        marginLeft:10,
        borderRadius:10,
        backgroundColor:'white',
        flex:1,
    },

    myMessage: {
        backgroundColor:colors.secondary,
        marginRight:10,
        marginLeft:80,
    },

    myMessageBody: {
        color:colors.secondaryText
    },

    messageBody: {
        fontSize:16,
        color:colors.text
    },

    messageTime: {
        fontSize:13,
        color:colors.primaryText,
        textAlign:'right'
    },

    myMessageTime: {
        color:colors.secondaryText,
    },

    messageImageContainer: {
        flex:1,
        justifyContent: 'center',
        alignItems:'center',
        height: imageDimensions.height + 10
    },

    messageImage: {
        width: imageDimensions.width,
        height: imageDimensions.height,
    }
});
