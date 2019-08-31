import React, { PureComponent } from 'react';
import { TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Row, Col } from 'react-native-easy-grid'

import { Container, View, Button, Card, CardItem, Item, Input, Icon, Text, Label, Picker, Form, Header, Left, Right, Body, Title, Fab } from 'native-base';

import SvgUri from 'react-native-svg-uri';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { lab_filter_city_W, lab_filter_field, lab_filter_location } from './../../../assets/img/svg/SvgXml'
import { getOrderListByLabId } from '../Redux/Actions/Tech.action'
class OrderManagementSearchScreen extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            status: 'technician-comming-order' //technician-active-order,idandoon/technicians/5bbb03c65694d535834d9bec/tasks?status=DONE
        };
    }
    componentDidMount() {
        this.props.getOrderListByLabId(this.props.labId, this.state.status)
    }
    async setFilter(status) {
        await this.setState({ status: status });
        this.props.getOrderListByLabId(this.props.labId, this.state.status)
    }
    render() {
        return (
            <View>
                <Row style={{ height: 85, justifyContent: 'space-around', backgroundColor: 'white' }}>
                    <Col style={{ padding: 5 }}>
                        <Row size={3} style={{ alignItems: 'center', justifyContent: 'center' }} onPress={() => { this.setFilter('technician-comming-order') }} >
                            <Card noShadow
                                style={{
                                    backgroundColor: this.state.status == 'technician-comming-order' ? '#f4f4f4' : 'white',
                                    width: 55,
                                    height: 55,
                                    borderRadius: 27,
                                    alignItems: 'center',
                                    borderWidth: 2,
                                    borderColor: this.state.status == 'technician-comming-order' ? 'black' : '#b8b8b8',
                                }}>
                                <SvgUri style={{ marginTop: 10 }} fill='#b8b8b8' width="20" height="20"
                                    svgXmlData={lab_filter_city_W}
                                />
                                <Text style={{ fontSize: 10 }}>جدید</Text>
                            </Card>

                        </Row>


                    </Col>
                    <Col style={{ padding: 5 }}>
                        <Row size={3} style={{ alignItems: 'center', justifyContent: 'center' }} onPress={() => { this.setFilter('technician-active-order') }}>
                            <Card noShadow style={{
                                backgroundColor: this.state.status == 'technician-active-order' ? '#f4f4f4' : 'white',
                                width: 55,
                                height: 55,
                                borderRadius: 27,
                                alignItems: 'center',
                                borderWidth: 2,
                                borderColor: this.state.status == 'technician-active-order' ? 'black' : '#b8b8b8'
                            }}>
                                <SvgUri style={{ marginTop: 10 }} fill='#b8b8b8' width="20" height="20"
                                    svgXmlData={lab_filter_location}
                                />

                                <Text style={{ fontSize: 10 }}>فعال</Text>
                            </Card>
                        </Row>
                    </Col>
                    <Col style={{ padding: 5 }}>
                        <Row size={3} style={{ alignItems: 'center', justifyContent: 'center' }} onPress={() => { this.setFilter('done') }}>
                            <Card noShadow style={{
                                backgroundColor: this.state.status == 'done' ? '#f4f4f4' : 'white',
                                width: 55,
                                height: 55,
                                borderRadius: 27,
                                alignItems: 'center',
                                borderWidth: 2,
                                borderColor: this.state.status == 'done' ? 'black' : '#b8b8b8'
                            }}>
                                <SvgUri style={{ marginTop: 10 }} fill='#b8b8b8' width="20" height="20"
                                    svgXmlData={lab_filter_field}
                                />
                                <Text style={{ fontSize: 10 }}>انجام شده</Text>
                            </Card>
                        </Row>

                    </Col>
                </Row>

            </View>
        )
    }
}

function mapStateToProps(state, props) {
    return {

    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getOrderListByLabId
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderManagementSearchScreen);