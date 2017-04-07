import BaseRepository from './BaseRepository';
import User from 'ChatApp/app/models/User';
class ContactRepository extends BaseRepository{
    getAllContacts(component){
        let contactsRef = this.database.ref('users');
        contactsRef.on('value', (snapshot) => {
            this.contacts = [];
            snapshot.forEach((child) => {
                if(child.key !== this.firebase.auth().currentUser.uid){
                    User.getUserById(child.key, user => {
                        user.text = user.status;
                        this.contacts.push(user);
                    });
                }
            });
            component.setState({
                dataSource: this.contacts
            });
        });
    }
}

export default new ContactRepository;
