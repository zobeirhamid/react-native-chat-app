import React, {Component} from 'react';
import {TextInput, StyleSheet} from 'react-native';

export default class AutoExpandingTextInput extends Component{
    constructor(props){
        super(props);
        this.state = {
            height: 0
        }
    }

    render(){
        return(
            <TextInput
                {...this.props}
                ref={(component) => {this.component = component}}
                multiline
                numberOfLines={4}
                onContentSizeChange={(event) => {
                    if(event.nativeEvent.contentSize.height < 100){
                        this.setState({height: event.nativeEvent.contentSize.height});
                    }
                }}
                style={[this.props.style, {height: Math.max(35, this.state.height)}]}
            />
        );
    }

    blur(){
        this.component.blur();
    }
}

