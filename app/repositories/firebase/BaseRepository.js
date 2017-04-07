import firebase from 'ChatApp/app/services/firebase';
export default class BaseRepository {
    constructor(){
        this.firebase = firebase;
        this.database = this.firebase.database();
        this.storage = this.firebase.storage();
        this.refs = [];
    }

    detachListeners(){
        for(ref in this.refs){
            this.refs[ref].off();
        }
    }

    updateDatasource(array, component){
        component.setState({
            dataSource: component.state.dataSource.cloneWithRows(array),
        });
    }

    sortArrayByTimestamp(array){
        let sortedArray = array.map(function(el, i) {
            return {index: i, value: el.timestamp};
        })

        sortedArray.sort(function(a, b) {
            return b.value - a.value;
        });
        
        return sortedArray.map(function(el){
            return array[el.index];
        });
    }

}
