import React, {Component} from 'react';
import {ListView} from 'react-native';

export default class PureListView extends Component{
    constructor(props){
        super(props);
        if(this.props.data){
            this.state = {
                dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
            };
        }
    }

    componentDidMount(){
        if(this.props.data){
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.props.data)
            })
        }
    }

    render(){
        if(this.props.data){
            return (
                <ListView
                    dataSource={this.state.dataSource}
                    {...this.props}
                />
            )
        }
        return (
            <ListView
                {...this.props}
                enableEmptySections={true}
            />
        )
    }
}

