
import React, { Component } from 'react';
import { Text, Button, Container, Card, CardItem, Item, CheckBox, Title, Picker, Left, Body, Right, Header, Icon,Fab } from 'native-base';
import { Row, Col, Grid } from 'react-native-easy-grid';
import { StyleSheet, View, ScrollView, Platform } from 'react-native'
import HeaderComponent from '../../../../Components/Header.component';
import ToothShowScreen from '../../../../Components/toothShow.component';
import { createOrder, getAddress } from '../../Redux/Actions/Order.action'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
var moment = require('moment-jalaali')
import Snackbar from 'react-native-snackbar';

class OrderPreviewScreen extends Component {
    constructor(props) {
        super(props)

        this.state = {
            total: 0,
            time: '',
            today: '',
            address: undefined
        }
    }
    componentDidMount() {
        var today = new Date();
        var m = today.getMinutes()
        if (m < 10) {
            m = '0' + m
        }
        var time = today.getHours() + ':' + m
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();

        if (dd < 10) {
            dd = '0' + dd
        }

        if (mm < 10) {
            mm = '0' + mm
        }

        today = yyyy + '/' + mm + '/' + dd;
        m = moment(today, 'YYYY/M/D')
        today = m.format('jYYYY/jM/jD')
        this.setState({
            time: time,
            today: today
        })
        let total = 0
        for (let item of this.props.order.orderLineItems) {
            total = total + (item.chosenPricePlan.cost * item.quantity)
        }
        
        this.setState({ total: total })
        // alert(JSON.stringify(this.props.order,null,5))
    }
    selectAddress(value) {
        if (value) {
            this.setState({
                address: value
            })
        }
    }
    renderData(sub) {
        return (
            <CardItem>
                <Row style={{ flexDirection: 'row' }}>
                    <Text>{sub.key}</Text>
                    <Text style={style.boldText}>{sub.data}</Text>
                </Row>
            </CardItem>
        )

    }
    render() {
        return (
            <Container style={{ backgroundColor: '#e8e8e8' }}>
                <HeaderComponent title="جزییات سفارش" />
                <ScrollView>
                    <Row style={{ flexDirection: 'column', margin: 10 }}>
                        <Row style={{ borderColor: 'red' }}>
                            <Col style={{ paddingVertical: 5, alignItems: 'center' }}>
                                <Item style={[style.itemInput1]}>
                                    <Picker
                                        placeholder='آدرس مطب را انتخاب کنید'
                                        selectedValue={this.state.address}
                                        onValueChange={this.selectAddress.bind(this)}
                                        style={style.Input}
                                        renderHeader={backAction =>
                                            <Header style={{ backgroundColor: "#7fbbd2" }}>
                                                <Left />
                                                <Body style={{ flex: 3 }}>
                                                    <Title style={{ color: "#fff", fontSize: 15 }}>آدرس مطب را انتخاب کنید</Title>
                                                </Body>
                                                <Right >
                                                    <Button transparent onPress={backAction}>
                                                        <Icon name="arrow-back" style={{ color: "#fff" }} />
                                                    </Button>
                                                </Right>
                                            </Header>}>
                                        <Picker.Item label="آدرس مطب را انتخاب کنید" disabled />
                                        {this.props.address.length>0 ? this.props.address.map(item => (
                                            <Picker.Item label={`${item.province.title} ${item.city.title} ${item.region}`} value={item} />
                                        )) : null}
                                    </Picker>
                                    {Platform.OS === 'ios' && <Icon name='arrow-dropdown' style={{ left: 20 }} />}
                                </Item>
                            </Col>
                        </Row>


                        <Text style={{ textAlign: 'left', color: '#7fbbd2', fontSize: 20 }}>پیش نمایش سفارش : </Text>
                        <Card style={{ flexDirection: 'column', borderRadius: 3 }}>


                            <CardItem >
                                <Col size={2}><Text style={style.boldText}>{this.props.order.labName}</Text></Col>
                                <Col size={1} >
                                    <Row>
                                        <Icon name='time' />
                                        <Text style={{ fontSize: 13, margin: 5 }}>{this.state.time}</Text>
                                    </Row>
                                </Col>
                                <Col size={1}><Text style={{ fontSize: 13, margin: 5 }}>{this.state.today}</Text></Col>

                            </CardItem>
                            <CardItem>
                                <Row>
                                    <Text> نام بیمار:</Text>
                                    <Text style={style.boldText}>{this.props.order.patientInfo.fullName}</Text>
                                </Row>
                            </CardItem>

                            <CardItem >
                                <Row>
                                    <Text>توضیحات : </Text>
                                    <Text>{this.props.order.description}</Text>
                                </Row>
                            </CardItem>

                        </Card>
                        {this.props.order.orderLineItems.map(item => {
                            return (
                                <Grid>
                                    <Row style={{ flexDirection: 'column' }}>
                                        <Card style={{ flexDirection: 'column', borderRadius: 12 }}>
                                            <CardItem>
                                                <Row>
                                                    <Text>نوع کار : </Text>
                                                    <Text style={style.boldText}>{item.product.productName}</Text>
                                                </Row>
                                                
                                            </CardItem>
                                            <CardItem>
                                            <Row>
                                                    <Text>ناحیه درمان : </Text>
                                                    {/* {item.teethNumbers.map(teeth => {
                                                        return (
                                                            <Text style={{ paddingHorizontal: 5 }}>{teeth} </Text>
                                                        )
                                                    })} */}

                                                    <ToothShowScreen teeth={item.teethNumbers} />
                                                </Row>
                                            </CardItem>
                                            <CardItem>
                                                <Row>
                                                    <Text>قیمت : </Text>
                                                    <Text style={style.boldText}>{item.chosenPricePlan.cost} ریال</Text>
                                                </Row>
                                                {/* {item.buildOrders[0].properties.map(sub => {
                                                    return (
                                                        <Row style={{ flexDirection: 'row' }}>
                                                            <Text>{sub.key}</Text>
                                                            <Text style={style.boldText}>{sub.data}</Text>
                                                        </Row>
                                                    )

                                                    // this.renderData(sub)
                                                })} */}
                                            </CardItem>
                                            {/* <CardItem > */}
                                            {item.buildOrders[0].properties.map(sub => {
                                                if(sub.data){
                                                    return (
                                                        <CardItem>
                                                            <Row style={{ flexDirection: 'row' }}>
                                                                <Text>{sub.key}:  </Text>
                                                                <Text>  {sub.data}</Text>
                                                            </Row>
                                                        </CardItem>
                                                    )
                                                }
                                                

                                                // this.renderData(sub)
                                            })}
                                            {/* </CardItem> */}
                                        </Card>
                                    </Row>

                                </Grid>
                            )
                        })}
                        <View style={{ height: 30, width: '100%', backgroundColor: '#bdbbbf', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ marginLeft: 10, color: '#fff' }}>مبلغ نهایی</Text>
                            <Text style={{
                                marginRight: 10,
                                color: '#fff', fontWeight: 'bold'
                            }}>{this.state.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ریال</Text>
                        </View>
                        <Button style={{ borderRadius: 10, marginVertical: 5, marginVertical: 20, backgroundColor: '#7fbbd2', alignSelf: 'center' }}
                            onPress={() => {
                                if(this.state.address){
                                    this.props.createOrder(this.props.order.laboratoryId, this.props.order, this.state.address)
                                    this.props.navigation.goBack()
                                }else{
                                    Snackbar.show({
                                        title: 'لطفا ابتدا آدرس مطب را انتخاب کنید سپس اقدام به ثبت نهایی فرمایید.',
                                        duration: 4500,
                                        backgroundColor: 'red'
                                      });
                                }
                                
                            }}><Text style={{ fontSize: 10 }}>تایید و ارسال</Text></Button>
                    </Row>
                </ScrollView>
                <Fab
          style={{ backgroundColor: '#e7be00', position: 'absolute', bottom: 2, width: 40, height: 40, left: 3 }}
          position="bottomLeft"
          onPress={() => this.props.navigation.goBack()}>
          <Icon name="ios-arrow-back" />
        </Fab>
            </Container>
        );
    }
}
const style = StyleSheet.create({

    boldText: {
        fontWeight: 'bold'
    },
    itemInput1: {
        borderRadius: 25,
        // borderColor: 'red',
        backgroundColor: '#FFF',
        height: 45,
        width: '94%',
        padding: 5

    },
    Input: {
        textAlign: 'right',
        height: '100%',
        padding: 30,
        height: 35,
        fontSize: 15,
        borderColor: 'red',
        justifyContent: 'flex-start'
    }
});
function mapStateToProps(state, props) {
    return {
        order: state.OrderReducer.order,
        address: state.OrderReducer.address,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        createOrder,
        getAddress
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderPreviewScreen);