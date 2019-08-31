import { DrawerNavigator } from 'react-navigation';
import DrawerComponents from './app/Components/Drawer.component'
import ProfileScreen from './app/Sections/Dentist/Screens/Profile.screen';
import AssociateScreen from './app/Sections/Dentist/Screens/Associate.Screen';
import AccessSceen from './app/Sections/Dentist/Screens/AccessSceen'
import MyLabScreen from './app/Sections/Dentist/Screens/MyLab.screen';
import AuthScreen from './app/Screens/Auth.screen';
import DentistStack from './app/Sections/Dentist/DentistStack';
import LabStack from './app/Sections/Lab/LabStack';
import TechStack from './app/Sections/Tech/TechStack';
import LabProfileScreen from './app/Sections/Dentist/Screens/labProfile.screen';
import LabProfileScreen1 from './app/Sections/Lab/Screens/LabProfile.screen';
import LabProfileScreenEdit from './app/Sections/Lab/Screens/EditProfile.screen';
import MyCoWorkerScreen from './app/Sections/Lab/Screens/MyCoWorker.screen';
import MyAssistantScreen from './app/Sections/Lab/Screens/MyAssistant.screen';
import InviteScreen from './app/Sections/Lab/Screens/Invite.screen';
import SettingsScreen from './app/Sections/Lab/Screens/Setings.screen';
import SettingsScreen1 from './app/Sections/Dentist/Screens/Setings.screen';
import AccountScreen from './app/Sections/Lab/Screens/Account.screen';
import ProfileTechScreen from './app/Sections/Tech/Screens/ProfileTech.screen';


import React, { PureComponent } from 'react';
import AboutUsScreen from './app/Sections/AboutUs.screen';

const DrawerNav = DrawerNavigator({
    'auth': { screen: AuthScreen },
    'profile': { screen: ProfileScreen },
    'myAssociate': { screen: AssociateScreen },
    'myAssistant': { screen: MyAssistantScreen },
    'myCoWorker': { screen: MyCoWorkerScreen },
    'invite': { screen: InviteScreen },
    'accessScreen': { screen: AccessSceen },
    'myLab': { screen: MyLabScreen },
    'accountingLab': { screen: AccountScreen },
    'setting': { screen: SettingsScreen },
    'setting1': { screen: SettingsScreen1 },
    'profileTech': { screen: ProfileTechScreen },
    'labProfileDent': { screen: LabProfileScreen },
    'labProfile': { screen: LabProfileScreen1 },
    'labProfileEdit': { screen: LabProfileScreenEdit },
    'dentist': { screen: DentistStack },
    'lab': { screen: LabStack },
    'tech': { screen: TechStack },
    'about': { screen: AboutUsScreen },

}, {
        initialRouteName: 'auth',
        contentComponent: DrawerComponents,
        DrawerOptions: {

        },
        drawerPosition: 'right'
    });

class AppDrawerNav extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <DrawerNav />
        );
    }
}



export default AppDrawerNav;

