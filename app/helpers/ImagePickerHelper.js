import {Platform} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import File from 'ChatApp/app/helpers/File';
class ImagePickerHelper{
    showImagePicker(){
        return new Promise((resolve, reject) => {
            ImagePicker.showImagePicker({}, response => {
                if (response.didCancel) {
                    reject('User cancelled image picker');
                }
                else if (response.error) {
                    reject('ImagePicker Error: ', response.error);
                }
                else if (response.customButton) {
                    reject('User tapped custom button: ', response.customButton);
                }
                else {
                    const source = Platform.OS === 'ios' ? response.uri.replace('file://', '') : response.path;
                    const file = File(source, this.getMimeType(source), this.getFileType(source));

                    resolve(file);
                }
            });
        });
    }

    getFileType(file){
        return file.split('.').pop().toLowerCase();
    }

    getMimeType(file){
        let fileType = this.getFileType(file);
        switch(fileType){
            case 'jpg':
                return 'image/jpeg';
            case 'png':
                return 'image/png';
            case 'gif':
                return 'image/gif';
        };
        return null;
    }
}
export default new ImagePickerHelper;
