import BaseRepository from './BaseRepository';
import FirebaseStorage from 'ChatApp/app/helpers/FirebaseStorage';
import ImagePickerHelper from 'ChatApp/app/helpers/ImagePickerHelper';

class UserRepository extends BaseRepository{
    getUserInformation(userID, component){
        this.refs.user = this.database.ref('users').child(userID);

        this.refs.user.on('value', snapshot => {
            let profilePicture = snapshot.val().profilePicture ? {uri: snapshot.val().profilePicture} : require("ChatApp/app/assets/images/profile/default.jpg");
            component.setState({
                name: snapshot.val().name,
                email: snapshot.val().email,
                status: snapshot.val().status,
                profilePicture
            });
        });
    }


    uploadProfilePicture(userID){
        const target = 'profile_pictures/' + userID;
        ImagePickerHelper.showImagePicker()
            .then(file => {
                return FirebaseStorage.upload(target, file);
            })
            .then(url => {
                this.refs.userUpload = this.database.ref('users').child(userID);
                this.refs.userUpload.once('value', snapshot => {
                    this.refs.userUpload.set({
                        name: snapshot.val().name,
                        email: snapshot.val().email,
                        status: snapshot.val().status,
                        profilePicture: url
                    });
                });
            });
    }
}

export default new UserRepository;
