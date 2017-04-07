import RNFetchBlob from 'react-native-fetch-blob';
const fs = RNFetchBlob.fs
const Blob = RNFetchBlob.polyfill.Blob

window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob
const prefix = 'file://';
class FileStorage{
    createBlob(uri, mime = 'application/octet-stream'){
        return new Promise((resolve, reject) => {
            let rnfbURI = RNFetchBlob.wrap(uri);
            Blob
                .build(rnfbURI, {type: mime })
                .then(blob => {
                    resolve(blob);
                })
                .catch(error => {
                    reject(error);
                })
        });
    }
}
export default FileStorage;
