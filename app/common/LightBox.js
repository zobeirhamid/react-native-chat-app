import React, {Component} from 'react';
import {Text, View, Platform, Image, Modal, Dimensions, TouchableOpacity} from 'react-native';
import StatusBarBackground from 'ChatApp/app/common/StatusBarBackground';
import colors from 'ChatApp/app/assets/colors';
import {CachedImage} from "react-native-img-cache";
let {width} = Dimensions.get('window');

export default class LightBox extends Component{
    state = {
        modalVisible: false,
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    render(){
        return(
            <View>
                <Modal 
                    animationType='slide'
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {this.setModalVisible(false)}}
                >
                    <View style={{backgroundColor:colors.background, flex:1, justifyContent:'center'}}>
                        {false && <StatusBarBackground />}
                        <TouchableOpacity onPress={() => {this.setModalVisible(false)}}>
                            <CachedImage source={this.props.image} style={{width, height:width, alignSelf:'center'}} />
                        </TouchableOpacity>
                    </View>
                </Modal>
                <TouchableOpacity onPress={() => {
                    this.setModalVisible(true);
                }}>
                    {this.props.children}
                </TouchableOpacity>
            </View>
        );
    }
}
