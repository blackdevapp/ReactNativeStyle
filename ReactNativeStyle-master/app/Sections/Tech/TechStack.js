import React, { PureComponent } from 'react';
import { StackNavigator } from 'react-navigation';
import DashboardScreen from './Screens/Dashboard.screen'
import OrderManagementScreen from './Screens/OrderManagement.screen'
import OrderDetailScreen from './Screens/OrderDetail.screen'
import ReportScreen from './Screens/Report.screen'
import WorkStepsScreen from './Screens/WorkSteps.screen'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { drawerOpener, drawerCloser } from '../../Redux/Actions/Global.Actions'; //Import your actions
import { DrawerActions } from 'react-navigation';


const TechStackNav = StackNavigator({
    Dashboard: { screen: DashboardScreen },
    OrderManagement: { screen: OrderManagementScreen },
    OrderDetail: { screen: OrderDetailScreen },
    WorkSteps: { screen: WorkStepsScreen },
    Report: { screen: ReportScreen },

}, {
        navigationOptions: {
            header: null,
            gesturesEnabled: false,
        }
    });


class TechStack extends PureComponent {
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
            <TechStackNav />
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

export default connect(mapStateToProps, mapDispatchToProps)(TechStack);
