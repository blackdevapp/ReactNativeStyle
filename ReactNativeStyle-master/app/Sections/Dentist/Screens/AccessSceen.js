import React, { Component } from 'react';
import { View, Button, Text, Container, Grid, Row, Col, Icon, Thumbnail, Fab, Radio } from 'native-base';
import { StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native'
import SvgUri from 'react-native-svg-uri';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { drawerOpener, drawerCloser } from '../../../Redux/Actions/Global.Actions'; //Import your actions
import { getAccessList } from '../../../Redux/Actions/User.Action'; //Import your actions
import { DrawerActions } from 'react-navigation';
import {
    dashboard_neworder,
    dashboard_report,
    dashboard_lab_search,
    dashboard_learning_points,
    dashboard_my_bills,
    dashboard_my_orders
} from '../../../assets/img/svg/SvgXml'
import HeaderComponent from '../../../Components/Header.component'
import Snackbar from 'react-native-snackbar';

class AccessScreen extends Component {
    constructor(props){
        super(props);
        this.state={
            associate:this.props.associate
        }
    }
    comeSoon(){
        Snackbar.show({
            title: 'به زودی این سرویس فعال خواهد شد.',
            duration: 7000,
        })
    }
    componentDidMount(){
        this.comeSoon();
    }
    componentDidUpdate() {
        if (this.props.drawerOpen) {
            this.props.navigation.dispatch(DrawerActions.openDrawer());
            this.props.drawerCloser();
        }
    }

    // NEW_ORDER, REPORT, BILL, LAB_SEARCH, ORDER_MANAGEMENT
    render() {
        let buttonSize = Dimensions.get('screen').width / 4;

        return (
            <Container style={styles.container}>
                <HeaderComponent title="دسترسی های دستیار" />
                <Grid>
                    <Row style={{ flex: 4, alignItems: 'flex-end', justifyContent: 'space-evenly' }}>
                        <Image source={require('../../../assets/img/png/head_pic.png')} style={{ height: '100%', width: '100%' }} />
                    </Row>

                    <Row style={{ flex: 5, flexDirection: 'row' }}>

                        <Grid>
                            <Row style={{ flex: 0 }}>
                                <Col style={{ flex: 1, justifyContent: 'center' }}>
                                    <View style={{ borderBottomColor: 'black', borderBottomWidth: 1 }} />
                                </Col>
                                <Col style={{ flex: 1, justifyContent: 'center' }}><Text style={{ fontSize: 15, textAlign: 'center', alignSelf: 'center' }}>سلام دکتر مهدی ژاله</Text></Col>
                                <Col style={{ flex: 1, justifyContent: 'center' }}>
                                    <View style={{ borderBottomColor: 'black', borderBottomWidth: 1 }} />
                                </Col>
                            </Row>
                            <Row >
                                <Grid style={{ paddingHorizontal: 20 }}>
                                    {/* <Col size={1}></Col> */}
                                    {/* <Col size={7}> */}
                                    <Row size={1}></Row>
                                    <Row size={7} >
                                        <Col style={{ padding: 5, flex: 1, justifyContent: 'flex-end' }}>
                                            {/* <View
                                                    // onPress={}
                                                    style={{
                                                        justifyContent: 'flex-start',
                                                        flexDirection: 'row',
                                                        marginBottom: -16,
                                                        marginLeft: -5,
                                                        zIndex: 100
                                                    }}>
                                                    <Icon name='md-checkmark-circle' style={{ color: '#e7be00' }} />
                                                </View> */}
                                            <Button block style={{ width: buttonSize, height: buttonSize, backgroundColor: '#e1e1e1', borderRadius: 15 }}
                                            >
                                                <SvgUri
                                                    style={{ justifyContent: 'center', alignSelf: 'center' }}
                                                    width="35"
                                                    height="30"
                                                    svgXmlData={dashboard_my_bills}
                                                />
                                            </Button>

                                            <Text style={{ justifyContent: 'flex-end', marginTop: 10, textAlign: 'center', color: '#696969', fontSize: 10 }} >صورت حساب‌های من</Text>
                                        </Col>
                                        <Col style={{ padding: 5, flex: 1, justifyContent: 'flex-end' }}>
                                            {/* <TouchableOpacity
                                                    // onPress={}
                                                    style={{
                                                        justifyContent: 'flex-start',
                                                        flexDirection: 'row',
                                                        marginBottom: -16,
                                                        marginLeft: -5,
                                                        zIndex: 100

                                                    }}>
                                                    <Icon name='radio-button-off' style={{ color: '#e7be00' }} />
                                                </TouchableOpacity> */}
                                            <Button block style={{ width: buttonSize, height: buttonSize, backgroundColor: '#e1e1e1', borderRadius: 15 }}>
                                                <SvgUri
                                                    style={{ justifyContent: 'center', alignSelf: 'center' }}
                                                    width="35"
                                                    height="30"
                                                    svgXmlData={dashboard_report}
                                                />
                                            </Button>
                                            <Text style={{ justifyContent: 'flex-end', marginTop: 10, textAlign: 'center', color: '#696969', fontSize: 10 }} >گزارش گیری</Text>
                                        </Col>
                                        <Col style={{ padding: 5, flex: 1, justifyContent: 'flex-end' }}>
                                            {/* <TouchableOpacity
                                                    // onPress={}
                                                    style={{
                                                        justifyContent: 'flex-start',
                                                        flexDirection: 'row',
                                                        marginBottom: -16,
                                                        marginLeft: -5,
                                                        zIndex: 100

                                                    }}>
                                                    <Icon name='radio-button-off' style={{ color: '#e7be00' }} />
                                                </TouchableOpacity> */}
                                            <Button block style={{ width: buttonSize, height: buttonSize, backgroundColor: '#e7be00', borderRadius: 15 }}>
                                                <SvgUri
                                                    style={{ justifyContent: 'center', alignSelf: 'center' }}
                                                    width="35"
                                                    height="30"
                                                    fill={'#ffffff'}
                                                    svgXmlData={dashboard_neworder}
                                                />
                                            </Button>
                                            <Text style={{ justifyContent: 'flex-end', marginTop: 10, textAlign: 'center', color: '#696969', fontSize: 10 }} >ثبت سفارش جدید</Text>
                                        </Col>
                                    </Row>
                                    <Row size={7} >
                                        <Grid>
                                            <Col size={1} ></Col>
                                            <Col size={2} style={{ padding: 5 }}>
                                                {/* <TouchableOpacity
                                                        // onPress={}
                                                        style={{
                                                            justifyContent: 'flex-start',
                                                            flexDirection: 'row',
                                                            marginBottom: -16,
                                                            marginLeft: -5,
                                                            zIndex: 100

                                                        }}>
                                                        <Icon name='radio-button-off' style={{ color: '#e7be00' }} />
                                                    </TouchableOpacity> */}
                                                <Button block style={{ width: buttonSize, height: buttonSize, backgroundColor: '#e1e1e1', borderRadius: 15 }}>
                                                    <SvgUri
                                                        style={{ justifyContent: 'center', alignSelf: 'center' }}
                                                        width="40"
                                                        height="25"
                                                        fill='#7fbbd2'
                                                        svgXmlData={dashboard_my_orders}
                                                    />
                                                </Button>
                                                <Text style={{ justifyContent: 'flex-end', marginTop: 10, textAlign: 'center', color: '#696969', fontSize: 10 }} >سفارش های من</Text>
                                            </Col>
                                            <Col size={2} style={{ padding: 5 }}>
                                                {/* <TouchableOpacity
                                                        // onPress={}
                                                        style={{
                                                            justifyContent: 'flex-start',
                                                            flexDirection: 'row',
                                                            marginBottom: -16,
                                                            marginLeft: -5,
                                                            zIndex: 100

                                                        }}>
                                                        <Icon name='radio-button-off' style={{ color: '#e7be00' }} />
                                                    </TouchableOpacity> */}
                                                <Button block style={{ width: buttonSize, height: buttonSize, backgroundColor: '#e1e1e1', borderRadius: 15 }}>
                                                    <SvgUri
                                                        style={{ justifyContent: 'center', alignSelf: 'center' }}
                                                        width="35"
                                                        height="30"
                                                        fill='#7fbbd2'
                                                        svgXmlData={dashboard_lab_search}
                                                    />
                                                </Button>
                                                <Text style={{ justifyContent: 'flex-end', marginTop: 10, textAlign: 'center', color: '#696969', fontSize: 10 }} >جستجوی لابراتوار</Text>
                                            </Col>
                                            <Col size={1} ></Col>
                                        </Grid>

                                    </Row>
                                    <Row size={1}></Row>
                                    {/* </Col> */}

                                    {/* <Col size={1}></Col> */}

                                </Grid>
                            </Row>
                        </Grid>
                    </Row>
                </Grid>
                <Fab
                    style={{ backgroundColor: '#e7be00', position: 'absolute', bottom: 40, width: 40, height: 40, right: 3 }}
                    position="bottomRight"
                    onPress={() => this.props.navigation.navigate('dentist')}>
                    <Icon name="ios-home-outline" />
                </Fab>
                <Button onPress={() => this.props.navigation.navigate('myAssociate')}
                    style={{ alignSelf: 'center', borderRadius: 15, marginVertical: 15, backgroundColor: '#7fbbd2', height: 30 }}><Text>ثبت تغییرات دسترسی‌</Text></Button>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        //   backgroundColor: '#eee'
    }
});

function mapStateToProps(state, props) {
    return {
        drawerOpen: state.GlobalReducer.drawerOpen,
        associate:state.UserReducer.associate
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        drawerOpener, drawerCloser,
        getAccessList
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AccessScreen)