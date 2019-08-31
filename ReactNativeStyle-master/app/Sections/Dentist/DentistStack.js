import React, { PureComponent } from 'react';
import { StackNavigator } from 'react-navigation';
import DentistHomeScreen from './DentistHome.screen'
import OrderStack from './Screens/Order/OrderStack'
import BillScreen from './Screens/Bill.screen'
import DashboardScreen from './Screens/Dashboard.screen'
import EducationalScreen from './Screens/Educational.screen'
import LabSearchScreen from './Screens/LabSearch.screen'
import MyLabScreen from './Screens/MyLab.screen'
import ReportScreen from './Screens/Report.screen'
import OrderManagementScreen from './Screens/OrderManagement.screen'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { drawerOpener, drawerCloser } from '../../Redux/Actions/Global.Actions'; //Import your actions
import { DrawerActions } from 'react-navigation';

const DentistStackNav = StackNavigator({
    DashboardScreen: { screen: DashboardScreen },
    DentistHomeScreen: { screen: DentistHomeScreen },
    EducationalScreen: { screen: EducationalScreen },

}, {
        navigationOptions: {
            header: null,
            gesturesEnabled: false,
        }
    });


class DentistStack extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidUpdate() {
        if (this.props.drawerOpen) {
            this.props.navigation.dispatch(DrawerActions.openDrawer());
            this.props.drawerCloser();
        }
    }

    render() {
        return (
            <DentistStackNav />
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

export default connect(mapStateToProps, mapDispatchToProps)(DentistStack);
