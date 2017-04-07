import React, {Component} from 'react';
import {Text, View, StyleSheet, Platform} from 'react-native';
import ChatList from 'ChatApp/app/components/ChatList';
import ContactList from 'ChatApp/app/components/ContactList';
import SwipeableViews from 'react-swipeable-views-native';
import { iconsMap } from 'ChatApp/app/helpers/Icons';
import TouchableGlobal from 'ChatApp/app/common/TouchableGlobal';
import colors from 'ChatApp/app/assets/colors';
import firebase from 'ChatApp/app/services/firebase';


export default class Overview extends Component{
    constructor(props){
        super(props);
        this._auth = firebase.auth().currentUser.uid;
    }

    state = {
        index: 0,
    };

    handleChangeTabs = (value) => () => {
        this.setState({
            index: value,
        });
    }

    handleChangeIndex(index){
        this.setState({
            index,
        });
    };

    render(){
        const {
            index,
        } = this.state;
        return (
            <View style={{flex:1, backgroundColor: colors.background}}>
                <View style={{flexDirection:'row'}}>
                    <View style={{flex:1}}>
                        <TouchableGlobal onPress={this.handleChangeTabs(0)}>
                            <View style={index == 0 ? ([styles.tab, styles.tabSelected]) : (styles.tab)}>
                                <Text style={styles.tabText}>CHATS</Text>
                            </View>
                        </TouchableGlobal>
                    </View>
                    <View style={{flex:1}}>
                        <TouchableGlobal onPress={this.handleChangeTabs(1)}>
                            <View style={index == 1 ? ([styles.tab, styles.tabSelected]) : (styles.tab)}>
                                <Text style={styles.tabText}>CONTACTS</Text>
                            </View>
                        </TouchableGlobal>
                    </View>
                </View>
                <SwipeableViews style={{flex:1}} index={index} onChangeIndex={this.handleChangeIndex.bind(this)}>
                    <ChatList navigator={this.props.navigator} _auth={this._auth} />
                    <ContactList navigator={this.props.navigator} _auth={this._auth} />
                </SwipeableViews>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    tab: {
        backgroundColor:colors.primary, 
        alignItems:'center',
        borderBottomColor:'transparent', 
        borderBottomWidth:5,
        padding:15
    },

    tabSelected: {
        borderBottomColor:colors.accent, 
    },

    tabText: {
        fontWeight: 'bold',
        color:colors.icons,
        textShadowColor:'rgba(0, 0, 0, 0.5)',
        textShadowOffset: {width:0, height:1},
        textShadowRadius:5,
    }
    
});
