import React, { PureComponent } from 'react';
import { View, Button, Text, Container, Grid, Row, Col, Card, CardItem, Input, Item, Icon, Fab,Picker,Header,Left,Title,Body,Right } from 'native-base';
import { StyleSheet, Image, Dimensions, ScrollView } from 'react-native'
import SvgUri from 'react-native-svg-uri';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getAccount, getAccountingList } from '../../../Redux/Actions/User.Action'
import HeaderComponent from '../../../Components/Header.component'
import { drawerOpener, drawerCloser } from '../../../Redux/Actions/Global.Actions'; //Import your actions
import { DrawerActions } from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import httpService from '../../../Services/Http.service'
import {
    dashboard_report,
    dashboard_learning_points,
    dashboard_my_bills,
    drawer_profile,
} from '../../../assets/img/svg/SvgXml'
import Snackbar from 'react-native-snackbar';

import colors from './../../../Config/Color'


class AccountScreen extends PureComponent {
    constructor(props) {
        super(props);
        this.props.getAccount()
        this.props.getAccountingList()
        this.state = {
            account:undefined,
            amount:0
        };
    }

    componentDidUpdate() {
        if (this.props.drawerOpen) {
            this.props.navigation.dispatch(DrawerActions.openDrawer());
            this.props.drawerCloser();
        }
    }
    selectAccount(value) {
        this.setState({
            account:value
        })
    }
    exchange(){
        if(this.state.amount &&this.state.account){
            account={
                amount:this.state.amount,
                accounting:this.state.account
            }
            httpService.httpPostJwt('idandoon/laboratory-payed-request/create',account).then(res=>{
                this.setState({
                    amount:0,
                    account:undefined
                })
                Snackbar.show({
                    title: 'درخواست برداشت با موفقیت انجام شد.',
                    duration: 5000
                  });
            }).catch(err=>{
                Snackbar.show({
                    title: 'هنگام درخواست برداشت مشکلی پیش آمده است لطفا بعدا تلاش فرمایید!',
                    duration: 5000,
                    backgroundColor:'red'
                  });
            })
        }else{
            Snackbar.show({
                title: 'اطلاعات مربوطه را کامل فرمایید!',
                duration: 5000,
                backgroundColor:'red'
              });
        }
        

    }
    render() {
        let buttonSize = Dimensions.get('screen').height / 20;

        return (
            <Container style={styles.container}>
                <HeaderComponent title="وضعیت حساب" color="#7EDAD1" />
                


                    <Grid>
                        <Row  ><Image source={require('./../../../assets/img/png/accountHeader.png')} style={{ height: '100%', width: '100%' }} resizeMode='cover' /></Row>
                        <Row size={2}>
                            <ScrollView>
                                <Col>
                                <KeyboardAwareScrollView>
                                    <Card>

                                        <CardItem >
                                            <Col ></Col>
                                            <Row style={{ alignSelf: 'center' }} size={4}>
                                                <Grid style={{ alignSelf: 'flex-start', flexDirection: 'row-reverse' }}>

                                                    <Col>
                                                        <Button rounded block style={{ backgroundColor: '#ffffff', borderColor: colors.Gold, borderWidth: 1, flexDirection: 'column' }} >
                                                            <Text style={{ color: 'gray', alignSelf: 'flex-start', fontSize: 13 }}>موجودی کیف پول</Text>
                                                        </Button>
                                                    </Col>


                                                    <Col style={{ position: 'absolute' }}>
                                                        <Button rounded block style={{ backgroundColor: colors.Gold }}>
                                                            <Text >    {this.props.wallet?his.props.wallet.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","):0} ریال    </Text>
                                                        </Button>
                                                    </Col>

                                                </Grid>
                                            </Row>
                                            <Col ></Col>
                                        </CardItem>

                                        <CardItem>
                                            <Col size={1}></Col>
                                            <Col size={3} style={{ justifyContent: 'space-evenly' }}>
                                                {/* <Item rounded style={{ backgroundColor: '#ffffff', height: buttonSize }}>
                                                <Button transparent disabled='true' >
                                                    <Text style={{ alignSelf: 'center' }}>انتقال به حساب</Text>
                                                </Button>
                                            </Item> */}
                                                <Picker
                                                    placeholder='انتخاب حساب'
                                                    selectedValue={this.state.account}
                                                    onValueChange={this.selectAccount.bind(this)}
                                                    style={styles.picker}
                                                    renderHeader={backAction =>
                                                        <Header style={{ backgroundColor: "#7fbbd2" }}>
                                                            <Left />
                                                            <Body style={{ flex: 3 }}>
                                                                <Title style={{ color: "#fff" }}>حساب موردنظر خود را انتخاب کنید</Title>
                                                            </Body>
                                                            <Right >
                                                                <Button transparent onPress={backAction}>
                                                                    <Icon name="arrow-back" style={{ color: "#fff" }} />
                                                                </Button>
                                                            </Right>
                                                        </Header>}>
                                                    <Picker.Item label="حساب مورد نظر خود را انتخاب کنید"/>
                                                    {this.props.accountingList?this.props.accountingList.map(item => (
                                                        <Picker.Item label={item.bankName +' - ' + item.cartNumber } value={item} />
                                                    )):null}
                                                    
                                                </Picker>
                                            </Col>
                                        </CardItem>
                                        <CardItem>
                                            <Col size={1}></Col>
                                            <Col size={3}>
                                                <Item rounded style={{ backgroundColor: '#ffffff', height: buttonSize }}>
                                                    <Input value={this.state.amount} keyboardType="number-pad" placeholder="مقدار برداشت" onChangeText={(text)=>this.setState({amount:text})}/>
                                                </Item>
                                            </Col>
                                        </CardItem>
                                        <CardItem>
                                            <Col></Col>
                                            <Col>
                                                <Button rounded style={{ backgroundColor: colors.LabHeader, alignSelf: 'flex-end', padding: 20, height: buttonSize * 3 / 4 }}
                                                onPress={()=>this.exchange()} >
                                                    <Text style={{ alignSelf: 'center' }}>برداشت</Text>
                                                    <Icon name='ios-arrow-back' />
                                                </Button>
                                            </Col>

                                        </CardItem>
                                    </Card>
                                    </KeyboardAwareScrollView>
                                    <Card>
                                        <CardItem>
                                            <Col><Text style={{ textAlign: 'left' }}>وضعیت اعتبار</Text></Col>
                                            <Col>
                                                <Row style={{ flexDirection: 'row-reverse' }}>
                                                    <Text style={{ textAlign: 'right' }}>۱۳۹۷/۱۰/۱۵</Text>
                                                    <Text style={{ color: colors.LabHeader, textAlign: 'right' }}>تا تاریخ : </Text>
                                                </Row>
                                            </Col>
                                        </CardItem>
                                        <CardItem>
                                            <Col></Col>
                                            <Col>
                                                <Button rounded style={{ backgroundColor: colors.LabHeader, alignSelf: 'flex-end', padding: 20, height: buttonSize * 3 / 4 }} >
                                                    <Text style={{ alignSelf: 'center' }}>تمدید اعتبار</Text>
                                                    <Icon name='ios-arrow-back' />
                                                </Button>
                                            </Col>

                                        </CardItem>
                                    </Card>
                                    {/* <Card>
                                    <CardItem>
                                        <Col><Text style={{ textAlign: 'left' }}>شماره حساب</Text></Col>
                                        <Col size={1}>
                                            <Item rounded style={{ backgroundColor: '#ffffff', height: buttonSize }}>
                                                <Input placeholder='شماره کارت' style={{ fontSize: 13, textAlign: 'center' }} />
                                            </Item>
                                        </Col>

                                    </CardItem>
                                    <CardItem>
                                        <Col></Col>
                                        <Col>
                                            <Item rounded style={{ backgroundColor: '#ffffff', height: buttonSize }}>
                                                <Input placeholder='شماره شبا' style={{ fontSize: 13, textAlign: 'center' }} />
                                            </Item>
                                        </Col>
                                    </CardItem>
                                    <CardItem>
                                        <Col></Col>
                                        <Col>
                                            <Button rounded style={{ backgroundColor: colors.LabHeader, alignSelf: 'flex-end', padding: 20, height: buttonSize * 3 / 4 }} >
                                                <Text style={{ alignSelf: 'center' }}>تایید</Text>
                                                <Icon name='ios-arrow-back' />
                                            </Button>
                                        </Col>

                                    </CardItem>
                                </Card> */}
                                </Col>
                            </ScrollView>


                        </Row>
                    </Grid>

                    <Fab
                        position="bottomRight" style={{ backgroundColor: '#7EDAD1' }}
                        onPress={() => this.props.navigation.goBack()}>
                        <Icon name="ios-arrow-back" />
                    </Fab>
                
            </Container>
        );

    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        backgroundColor: '#eee'
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
        wallet: state.UserReducer.wallet,
        accountingList: state.UserReducer.accountingList,
        drawerOpen: state.GlobalReducer.drawerOpen,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getAccount,
        getAccountingList,
        drawerOpener, drawerCloser
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountScreen);