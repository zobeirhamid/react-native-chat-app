import firebase from 'ChatApp/app/services/firebase';
import FirebaseStorage from 'ChatApp/app/helpers/FirebaseStorage';
class User {
    static getUserById(userID, callback){
        const ref = firebase.database().ref('users').child(userID);
        ref.once('value', snapshot => {
            let user = snapshot.val();
            user.key = snapshot.key;
            callback(user);
        });
    }

    static getImage(user){
        return FirebaseStorage.get(user.profilePicture, user.key);
    }
}

export default User;
