import React, {Component} from 'react';
import {Text, View, StyleSheet, ProgressBarAndroid, ProgressViewIOS, Platform} from 'react-native';
import reactMixin from 'react-mixin';
import TimerMixin from 'react-timer-mixin';

export default class LoadingComponent extends Component{
    constructor(props){
        super(props);
        this.state = {
            progress: 0,
        }
    }

    componentDidMount(){
        this.updateProgress();
    }

    updateProgress(){
        let progress = this.state.progress + 0.01;
        this.setState({progress});
        this.requestAnimationFrame(() => this.updateProgress());
    }

    getProgress(offset){
        let progress = this.state.progress + offset;
        return Math.sin(progress % Math.PI) % 1;
    }

    render(){
        if(this.props.loading){
            return(
                <View style={{flex:1, justifyContent: 'center'}}>
                    {Platform.OS === 'ios' && <ProgressViewIOS progress={this.getProgress(0)} style={{margin:10}}/>}
                    {Platform.OS === 'android' && <ProgressBarAndroid />}
                </View>
            );
        } else{
            return this.props.component;

        }
    }
}
reactMixin(LoadingComponent.prototype, TimerMixin);
