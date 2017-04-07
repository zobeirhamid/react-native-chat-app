import FirebaseStorage from 'ChatApp/app/helpers/FirebaseStorage';
export default class Message{
    static getMessageById(messageID, callback){
        const ref = firebase.database().ref('users').child(userID);
        ref.once('value', snapshot => {
            let user = snapshot.val();
            user.key = snapshot.key;
            callback(user);
        });
    }
    static getImage(message){
        return FirebaseStorage.get(message.image, message._key);
    }
}
