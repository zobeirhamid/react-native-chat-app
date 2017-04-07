import { Navigation } from 'react-native-navigation';
import { registerScreens } from 'ChatApp/app/screens';
import { iconsMap, iconsLoaded } from 'ChatApp/app/helpers/Icons';
import colors from 'ChatApp/app/assets/colors';
import firebase from 'ChatApp/app/services/firebase';

registerScreens(); 
class App{
    constructor(auth){
        iconsLoaded.then(() => {
            if(auth){
                this.authenticatedNavigator();
            } else{
                this.unautheticatedNavigator();
            }
        });
    }

    authenticatedNavigator(){
        let tabs = [
            {
                label: 'Chats',
                screen: 'chatapp.Overview',
                icon: iconsMap['ios-people'],
                title: 'Chats',
                navigatorStyle:{
                    navBarBackgroundColor: colors.primaryDark,
                    navBarTextColor: colors.icons,
                    navBarButtonColor: colors.icons,
                    topBarElevationShadowEnabled: false,
                    screenBackgroundColor: colors.background
                },
            },
            {
                label: 'Profile',
                screen: 'chatapp.Profile',
                icon: iconsMap['ios-person'],
                title: 'Profile',
                navigatorStyle:{
                    navBarBackgroundColor: colors.primaryDark,
                    navBarTextColor: colors.icons,
                    navBarButtonColor: colors.icons,
                    topBarElevationShadowEnabled: false,
                    screenBackgroundColor: colors.background
                },
            },
        ];

        Navigation.startTabBasedApp({
            tabs,
            tabsStyle: {
                tabBarBackgroundColor: colors.background
            },
            appStyle: {
                statusBarTextColorScheme: 'dark',
                tabBarBackgroundColor: colors.primary,
                tabBarButtonColor: colors.primaryText,
                tabBarSelectedButtonColor: colors.accent,
                navBarBackgroundColor: colors.primaryDark,
                navBarTextColor: colors.icons,
                navBarButtonColor: colors.icons,
                screenBackgroundColor: colors.background
            },
            animationType: 'fade'
        });
    }

    unautheticatedNavigator(){
        Navigation.startSingleScreenApp({
            screen: {
                screen: 'chatapp.Login',
                title: 'Login',
                navigatorStyle: {
                    navBarHidden: true,
                    screenBackgroundColor: colors.background,
                    statusBarTextColorScheme: 'dark',
                    statusBarTextColorSchemeSingleScreen: 'light'
                },
            },
            animationType: 'fade'
        });
    }
}

let application;
firebase.auth().onAuthStateChanged(user => {
    if(user){
        application = new App(true)
    } else{
        application = new App(false)
    }
});

export default application;
