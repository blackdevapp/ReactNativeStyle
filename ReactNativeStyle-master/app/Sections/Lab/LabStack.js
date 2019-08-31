import React, { PureComponent } from 'react';
import { StackNavigator } from 'react-navigation';
import LabHomeScreen from './LabHome.screen'
import DoctorOrderScreen from './Screens/Order/DoctorOrder.screen'
import DashboardScreen from './Screens/Dashboard.screen';
import InviteScreen from './Screens/Invite.screen';
import MyAssistantScreen from './Screens/MyAssistant.screen';
import EducationalScreen from './Screens/Educational.screen';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { drawerOpener, drawerCloser } from '../../Redux/Actions/Global.Actions'; //Import your actions
import { DrawerActions } from 'react-navigation';



const LabStackNav = StackNavigator({
    DashboardLab: { screen: DashboardScreen },
    Invite: { screen: InviteScreen },
    MyAssistant: { screen: MyAssistantScreen },
    LabHomeScreen: { screen: LabHomeScreen },
    DoctorOrderScreen: { screen: DoctorOrderScreen },
    EducationalScreen: { screen: EducationalScreen },

}, {
        navigationOptions: {
            header: null,
            gesturesEnabled: false,
        }
    });


class LabStack extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentDidUpdate() {
        // alert(this.props.drawerOpen);
        if (this.props.drawerOpen) {
            this.props.navigation.dispatch(DrawerActions.openDrawer());
            this.props.drawerCloser();
        }
    }
    render() {
        return (
            <LabStackNav />
        );
    }
}
function mapStateToProps(state, props) {
    return {
        drawerOpen: state.GlobalReducer.drawerOpen,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        drawerOpener, drawerCloser
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LabStack);