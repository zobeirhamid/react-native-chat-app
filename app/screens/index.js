import {Navigation} from 'react-native-navigation';
import Overview from 'ChatApp/app/screens/Overview';
import Chat from 'ChatApp/app/screens/Chat';
import Profile from 'ChatApp/app/screens/Profile';
import ProfileImage from 'ChatApp/app/screens/ProfileImage';
import UserProfileImage from 'ChatApp/app/screens/UserProfileImage';
import Register from 'ChatApp/app/screens/Register'; 
import Login from 'ChatApp/app/screens/Login';

export function registerScreens(){
    Navigation.registerComponent('chatapp.Overview', () => Overview);
    Navigation.registerComponent('chatapp.Chat', () => Chat);
    Navigation.registerComponent('chatapp.Profile', () => Profile);
    Navigation.registerComponent('chatapp.ProfileImage', () => ProfileImage);
    Navigation.registerComponent('chatapp.Register', () => Register);
    Navigation.registerComponent('chatapp.Login', () => Login);
    Navigation.registerComponent('chatapp.UserProfileImage', () => UserProfileImage);
}
