import React, { PureComponent } from 'react';
import { Platform, Image } from 'react-native'
import { Header, Left, Right, Body, Text, Button, Icon } from 'native-base';
import { drawerOpener } from '../Redux/Actions/Global.Actions'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
class HeaderComponent extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    openDrawer() {
        this.props.drawerOpener();
    }
    render() {
        return (
            <Header style={{ height: Platform.OS == 'ios' ? 65 : 56, backgroundColor: this.props.color ? this.props.color : '#7fbbd2' }}>
                <Left>
                    {(this.props.title === 'تنظیم جزییات سفارش' || this.props.title === 'جزئیات سفارش') ? null :
                        <Button transparent onPress={() => this.openDrawer()}>
                            <Icon style={{ fontSize: 30 }} name='menu' />
                        </Button>
                    }
                </Left>
                <Body style={{ flex: 3, justifyContent: 'center' }}>
                    <Text style={{ color: 'white', fontSize: 15 }}>{this.props.title}</Text>
                </Body>
                <Right>
                    <Image style={{ width: 100, height: 50, resizeMode: 'contain' }}
                        source={require('../assets/img/png/logo.png')} />
                </Right>
            </Header>
        );
    }
}
function mapStateToProps(state, props) {
    return {

    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        drawerOpener,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderComponent);

