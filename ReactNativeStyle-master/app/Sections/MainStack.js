import React, { PureComponent } from 'react';
import { StackNavigator } from 'react-navigation';
import AuthScreen from '../Screens/Auth.screen'
import DentistStack from './Dentist/DentistStack'
import LabStack from './Lab/LabStack'
import TechStack from './Tech/TechStack'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { drawerOpener,drawerCloser } from '../Redux/Actions/Global.Actions'; //Import your actions
import { DrawerActions } from 'react-navigation';

const MainStackNav = StackNavigator({
    DentistStack: { screen: DentistStack },
    LabStack: { screen: LabStack },
    TechStack: { screen: TechStack },
}, {
        navigationOptions: {
            header: null,
            gesturesEnabled: false,
        }
    });


class MainStack extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentDidUpdate(){
        // alert(this.props.drawerOpen);
        if(this.props.drawerOpen){
            this.props.navigation.dispatch(DrawerActions.openDrawer());
            this.props.drawerCloser();
        }
    }
    render() {
        return (
            <MainStackNav />
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
        drawerOpener,drawerCloser
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MainStack);