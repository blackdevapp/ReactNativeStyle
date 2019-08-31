import React, { PureComponent } from 'react';
import HeaderComponent from '../../../../Components/Header.component'
import {
    Text, Button, Container, Grid, Row, Col, Item, Icon, Label, View, Picker, Right, Left,
    Input, Header, Card, Body, CardItem,Title, Content, SwipeRow, Radio, List, ListItem,
} from 'native-base';
import { StyleSheet, ImageBackground, Image, Dimensions, FlatList, TouchableOpacity, ScrollView } from 'react-native'
import SvgUri from 'react-native-svg-uri';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { auth_fax, auth_ham_menu, auth_location, auth_mobile, auth_name, auth_pass, order_calender, } from '../../../../assets/img/svg/SvgXml'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getSubscribers, getClinicsOrder,getBillDetail } from '../../Redux/Actions/Lab.action'



class BillGenerateScreen extends PureComponent {
    constructor(props) {
        super(props);
        this.props.getSubscribers()
        this.state = {
            doctor:undefined,
            from:'',
            discount:0,
            to:''
        };
    }

    selectDoctor(value) {
        this.setState({
          doctor:value
        })
    }
    generate(){
        this.props.getBillDetail(this.state.doctor.subscriberId,this.state.from,this.state.to)
    }
    render() {
        return (

            <Container style={styles.container}>
                <HeaderComponent title="صدور صورتحساب" color="#7EDAD1" />
                <KeyboardAwareScrollView>

                    <Content contentContainerStyle={{ flex: 1 }}>
                        <Grid >
                            <Row size={40} style={{ borderColor: 'red', padding: 5 }}>
                                <Col>
                                    <Row style={{ borderColor: 'red', }} >
                                        <Col style={{ paddingVertical: 2, alignItems: 'center', justifyContent: 'center' }}>
                                            <Button rounded
                                                style={{ alignSelf: 'center', marginLeft: 30, zIndex: 10, backgroundColor: '#7BD8CF', width: 200 }}>
                                                <Text>صدور صورتحساب</Text>
                                                <Icon name='ios-arrow-back'></Icon>
                                            </Button>
                                        </Col>
                                        <Col style={{ paddingVertical: 2, alignItems: 'center', justifyContent: 'center' }}>
                                            <Button rounded style={{ alignSelf: 'center', marginLeft: -30, zIndex: -1, backgroundColor: '#9B9B9B', width: 200 }}
                                            onPress={()=>this.props.navigation.goBack()}>
                                                <Text>فاکتورهای ارسال شده</Text>
                                                <Icon name='ios-arrow-back'></Icon>
                                            </Button>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col style={{ paddingHorizontal: 2, alignItems: 'center', justifyContent: 'center' }}>
                                            <Picker
                                                placeholder='پزشکان'
                                                selectedValue={this.state.doctor}
                                                onValueChange={this.selectDoctor.bind(this)}
                                                style={styles.picker}
                                                renderHeader={backAction =>
                                                    <Header style={{ backgroundColor: "#fff" }}>
                                                        <Left />
                                                        <Body style={{ flex: 3 }}>
                                                            <Title style={{ color: "#fff" }}>پزشک مورد نظر را انتخاب کنید</Title>
                                                        </Body>
                                                        <Right >
                                                            <Button transparent onPress={backAction}>
                                                                <Icon name="arrow-back" style={{ color: "#fff" }} />
                                                            </Button>
                                                        </Right>
                                                    </Header>}>
                                                <Picker.Item label="پزشک مورد نظر را انتخاب کنید" />
                                                {this.props.subscribers.map(item => (
                                                    <Picker.Item label={' دکتر' + item.fullName} value={item} />
                                                ))}
                                            </Picker>
                                        </Col>
                                    </Row>
                                    <Row style={{ borderColor: 'red', }}>
                                        <Col
                                            style={{
                                                paddingHorizontal: 2,
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}>
                                            <Item fixedLabel rounded style={[styles.itemInput1]}>
                                                <Label style={{ fontSize: 12, marginLeft: 10 }}>از تاریخ</Label>
                                                <Input secureTextEntry={true} onChangeText={(text) => this.setState({ passwordConfirmation: text })} />
                                                <SvgUri width="20" height="40" style={{ marginRight: 15 }}
                                                    svgXmlData={auth_name}
                                                />
                                            </Item>
                                        </Col>
                                        <Col style={{
                                            paddingHorizontal: 2,
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            <Item fixedLabel rounded style={[styles.itemInput1]}>
                                                <Label style={{ fontSize: 12, marginLeft: 10 }}>تا تاریخ</Label>
                                                <Input secureTextEntry={true} onChangeText={(text) => this.setState({ passwordConfirmation: text })} />
                                                <SvgUri width="20" height="40" style={{ marginRight: 15 }}
                                                    svgXmlData={auth_name}
                                                />
                                            </Item>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col style={{
                                            paddingHorizontal: 2,
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            <Button rounded block onPress={()=>this.generate()}
                                                style={{
                                                    zIndex: 10,
                                                    backgroundColor: '#7BD8CF',
                                                }}>
                                                <Text>صدور فاکتور</Text>
                                                <Icon name='ios-arrow-back'></Icon>
                                            </Button>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            {this.props.doctorOrders.billItems.lentgh>0?<View>
                                <Row size={50} style={{ borderColor: 'red', }}>
                                <Col style={{ backgroundColor: 'white', height: '100%' }}>
                                    <Row size={30}>
                                        <Col>
                                            <List style={{}}>
                                                <ListItem>
                                                    <Row style={{ padding: 1 }}>
                                                        <Col size={20} style={{ padding: 1 }}>
                                                            <Image activeOpacity={0.7} resizeMode="cover" style={{ borderRadius: 15, width: '75%', height: 50, borderWidth: 1, borderColor: 'gray' }}
                                                            />
                                                        </Col>
                                                        <Col size={30} style={{ padding: 1 }}>
                                                            <Row><Col><Text style={{ color: '#7EDAD1', fontSize: 15, alignItems: 'center', justifyContent: 'center', }}>دکتر {this.props.doctorOrders.dentistName}</Text></Col></Row>
                                                            <Row><Col><Text style={{ fontSize: 12, alignItems: 'center', justifyContent: 'center', }}>شماره فاکتور ۱۶۰</Text></Col></Row>
                                                        </Col>
                                                        <Col size={50} style={{ padding: 1 }}>
                                                            <Row style={{ padding: 1 }}>
                                                                <Col size={80} style={{ padding: 1, alignItems: 'center', justifyContent: 'center', borderColor: 'red', }}>
                                                                    {/* <Text style={{ fontSize: 11 }}>از ۱۳۹۷/۳/۱۰ تا ۱۳۹۷/۷/۱۷</Text> */}
                                                                </Col>
                                                                <Col size={20} style={{ padding: 1, alignItems: 'center', justifyContent: 'center', borderColor: 'red', }}>
                                                                    <SvgUri svgXmlData={order_calender} width="20"
                                                                        height="20" />
                                                                </Col>
                                                            </Row>
                                                            <Row>
                                                                <Col style={{ padding: 1 }}>
                                                                    <Text style={{ fontSize: 12 }}>جمع کل :  {this.props.doctorOrders.totalCost} تومان</Text>
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                    </Row>
                                                </ListItem>
                                            </List>
                                        </Col>
                                    </Row>
                                    <Row size={70}>
                                        <Col>
                                            <Row size={40}>
                                                <Col>
                                                    <ScrollView>
                                                        {this.renderHeader()}
                                                        {this.renderRow(this.props.doctorOrders.billItems)}
                                                    </ScrollView>
                                                </Col>
                                            </Row>
                                            <Row size={30}>
                                                <Col>
                                                    <Row>
                                                        <Col size={70}><Text>جمع کل:</Text></Col>
                                                        <Col size={30} style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#F1F2F6' }}><Text>{this.props.doctorOrders.totalCost}</Text></Col>
                                                    </Row>
                                                    <Row style={{ backgroundColor: '#F1F2F6' }}>
                                                        <Col size={70} ><Text>تخقیف:</Text></Col>
                                                        <Col size={30}>
                                                            <Input keyboardType="number-pad" onValueChange={(text)=>this.setState({
                                                                discount:text
                                                            })}
                                                             style={{ textAlign: 'center', backgroundColor: '#FFFFFF', borderRadius: 15, padding: 0,height:30 }} placeholder='تخفیف' />

                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col size={70}><Text>قابل پرداخت</Text></Col>
                                                        <Col size={30} style={{ backgroundColor: '#7EDAD1', alignItems: 'center', justifyContent: 'center' }}><Text>{this.props.doctorOrders.totalCost - this.state.discount}</Text></Col>
                                                    </Row>

                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row size={10} style={{ borderColor: 'red',marginTop:10 }}>
                                <Col style={{
                                    alignItems: 'center',
                                    // borderWidth: 1,
                                    borderColor: 'red',
                                    justifyContent: 'center',
                                    paddingHorizontal: 10,
                                }}>
                                    <Button rounded block style={{
                                        backgroundColor: '#E8BC42',
                                    }}>
                                        <Text>ارسال</Text>
                                        <Icon name='ios-arrow-back'></Icon>
                                    </Button>
                                </Col>
                            </Row>
                            </View>:<View>
                                <Row>
                                    <Col style={{justifyContent:'center',flex:1,alignItems:'center'}}>
                                        <Text>موردی وجود ندارد!!!</Text>
                                    </Col>
                                </Row>
                            </View>}
                            </Grid>
                    </Content>
                </KeyboardAwareScrollView>

            </Container>
        );
    }

    renderHeader() {
        return (
            <View style={{ flexDirection: 'row', width: '100%' }}>
                <Text style={[styles.tableHeader, { borderRightWidth: 1 }]}>ردیف</Text>
                <Text style={styles.tableHeader}>تاریخ</Text>
                <Text style={styles.tableHeader}>نوع کار</Text>
                <Text style={styles.tableHeader}>نام بیمار</Text>
                <Text style={styles.tableHeader}>تعداد</Text>
                <Text style={styles.tableHeader}>کد سفارش</Text>
                <Text style={styles.tableHeader}>فی</Text>
                <Text style={styles.tableHeader}>قیمت</Text>
            </View>
        );
    }

    renderRow(data) {
        // alert(JSON.stringify(data,null,5))
        return (
            <View style={{ flexDirection: 'column', width: '100%' }}>
                {
                    data.map((item, index) => {
                        let rowColor = index % 2 == 0 ? '#F1F2F6' : '#FFFFFF'
                        return (
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={[styles.tableRow, { backgroundColor: rowColor, fontSize: 8 }]}>{index + 1}</Text>
                                <Text style={[styles.tableRow, { backgroundColor: rowColor, fontSize: 10 }]}>1396/2/3</Text>
                                <Text style={[styles.tableRow, { backgroundColor: rowColor, fontSize: 8 }]}>{item.orderLineItem.product.productName}</Text>
                                <Text style={[styles.tableRow, { backgroundColor: rowColor, fontSize: 8 }]}>{item.patientInfo.fullName}</Text>
                                <Text style={[styles.tableRow, { backgroundColor: rowColor, fontSize: 9 }]}>{item.orderLineItem.quantity}</Text>
                                <Text style={[styles.tableRow, { backgroundColor: rowColor, fontSize: 9 }]}>{item.orderLineItem.quantity}</Text>
                                <Text style={[styles.tableRow, { backgroundColor: rowColor, fontSize: 9 }]}>{item.orderLineItem.chosenPricePlan.cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                                <Text style={[styles.tableRow, { backgroundColor: rowColor, fontSize: 10 }]}>{item.orderLineItem.chosenPricePlan.cost * item.orderLineItem.quantity}</Text>
                            </View>
                        )
                    }
                    )
                }
            </View>
        );
    }



}

const styles = StyleSheet.create({
    tableHeader: {
        textAlign: 'center',
        color: '#6D6D6D',
        flex: 1,
        alignSelf: 'stretch',
        borderColor: '#6D6D6D',
        borderLeftWidth: 1,
        borderTopWidth: 1,
        fontSize: 10,
        justifyContent: 'center',
        alignSelf: 'center'
    },
    tableRow: {
        textAlign: 'center',
        color: '#6D6D6D',
        flex: 1,
        alignSelf: 'stretch',
        borderColor: '#6D6D6D',
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderTopWidth: 1,
        fontSize: 10
    },
    tdRow: { textAlign: 'center', color: '#000', borderRadius: 5, margin: 2, flex: 1, alignSelf: 'stretch' },
    tdHead: { textAlign: 'center', fontSize: 12, backgroundColor: '#252626', color: '#fff', borderRadius: 5, margin: 2, flex: 1, alignSelf: 'stretch' },
    containerRow: {
        marginTop: 5,
        width: Dimensions.get('window').width,
    },
    container: {
        flex: 1,
        justifyContent: "flex-start",
        backgroundColor: '#eee'
    },
    itemInput1: {
        backgroundColor: '#FFF',
        height: 45
    },
    picker: {
        width: '100%',
        fontSize: 10,
        borderRadius: 25,
        backgroundColor: '#fff',
        marginVertical: 5
    }
});

function mapStateToProps(state, props) {
    return {
        subscribers: state.LabReducer.subscribers,
        clinics: state.LabReducer.clinics,
        doctorOrders:state.LabReducer.doctorOrders
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getSubscribers,
        getBillDetail
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BillGenerateScreen);
