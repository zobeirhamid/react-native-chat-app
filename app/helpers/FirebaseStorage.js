import firebase from 'ChatApp/app/services/firebase';
import FileStorage from 'ChatApp/app/helpers/FileStorage';
class FirebaseStorage extends FileStorage{
    upload(target, file){
        return new Promise((resolve, reject) => {
            const ref = firebase.storage().ref(target + Date.now() + '.' + file.fileType);
            this.createBlob(file.uri, file.mime + ';')
                .then(blob => {
                    ref.put(blob, {contentType: file.mime})
                        .then(() => {
                            resolve(ref.getDownloadURL());
                        });
                })
        });
    }
}

export default new FirebaseStorage;
