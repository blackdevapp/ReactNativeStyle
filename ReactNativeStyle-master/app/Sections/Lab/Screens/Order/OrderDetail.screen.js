import React, { PureComponent } from 'react';
import { StyleSheet, Image } from 'react-native'
import StepIndicator from 'react-native-step-indicator';
import { Container, Card, Text, CardItem, Item, Input, Icon, Button, Content,Fab } from 'native-base';
import { Grid, Row, Col } from 'react-native-easy-grid';
import colors from '../../../../Config/Color';
import HeaderComponent from '../../../../Components/Header.component';
import { CircularProgress } from 'react-native-svg-circular-progress'
import SvgUri from 'react-native-svg-uri';
import ToothShowScreen from '../../../../Components/toothShow.component'

import {
    order_calender,
} from '../../../../assets/img/svg/SvgXml'

const labels = ["Cart", "Delivery Address", "Order Summary", "Payment Method", "Track"];
const customStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize: 30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: '#fe7013',
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: '#fe7013',
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: '#fe7013',
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: '#fe7013',
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: '#fe7013',
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: '#aaaaaa',
    labelColor: '#999999',
    labelSize: 13,
    currentStepLabelColor: '#fe7013'
}

class OrderDetailScreen extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            doctorName: ''
        };
    }


    componentWillMount() {
        this.setState({
            doctorName: `سفارش دکتر ${this.props.navigation.getParam('name')}`
        })
    }

    render() {
        const item = this.props.navigation.getParam('item')
        return (
            <Container style={{ backgroundColor: colors.backgroundColor }}>
                <HeaderComponent title={this.state.doctorName} color='#7EDAD1' />
                <Content contentContainerStyle={{}}>
                    <Grid>
                        <Card >
                            <CardItem>
                                <Row >
                                    <Col style={styles.col}>
                                        <Text>نام بیمار:</Text>
                                        <Text>کد سفارش:</Text>
                                        <Text>نوع کار:</Text>
                                        <Text>قیمت:</Text>
                                    </Col>
                                    <Col style={styles.col}>
                                        <Text>{item.patient}</Text>
                                        <Text>{item.orderNo}</Text>
                                        <Text>{item.orderLineItem.product.productName}</Text>
                                        <Text>{item.orderLineItem.chosenPricePlan.cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ریال</Text>
                                    </Col>
                                </Row>
                            </CardItem>
                            <CardItem>
                                <Row >
                                    <Col size={35} style={styles.col}>
                                        <Text>ناحیه درمان:</Text>
                                    </Col>
                                    <Col size={65} style={styles.col}>
                                        <ToothShowScreen teeth={item.orderLineItem.teethNumbers} />
                                    </Col>
                                </Row>
                            </CardItem>
                            {item.orderLineItem.buildOrders[0].properties.map(item => {
                                return (
                                    <CardItem>
                                        <Row>
                                            <Col style={styles.col}>
                                                <Text>{item.key}</Text>
                                            </Col>
                                            <Col style={styles.col}>
                                                <Text>{item.data}</Text>
                                            </Col>
                                        </Row>
                                    </CardItem>
                                )
                            })}
                            <CardItem>
                                <Row>
                                    <Col style={styles.col}>
                                        <Text>توضیحات:</Text>
                                    </Col>
                                </Row>
                                <Row>
                                    {/* <Col style={styles.col}> */}
                                    <Text>توضیحات:</Text>
                                    {/* </Col> */}
                                </Row>
                            </CardItem>
                            <CardItem>
                                <Row>
                                    <Col style={styles.col}>
                                        <Text>روزهای کارکرد</Text>
                                    </Col>
                                    <Col style={styles.col}>
                                        <CircularProgress donutColor='#7EDAD1' percentage={20} size={80}>
                                            <Text style={{ fontSize: 13 }}>۲۰ از ۱۰۰</Text>
                                        </CircularProgress>
                                    </Col>
                                </Row>
                            </CardItem>
                            <CardItem>
                                <Row>
                                    <Col>
                                        <StepIndicator
                                            customStyles={customStyles}
                                            currentPosition={item.orderLineItem.currentStep}
                                            labels={item.orderLineItem.labels}
                                            stepCount={item.orderLineItem.labels.length}
                                        />
                                    </Col>
                                </Row>
                            </CardItem>
                        </Card>
                        <Row style={{ padding: 5 }}>
                            <Col>
                                <Item rounded style={{ padding: 5, backgroundColor: 'white', height: 58 }}>
                                    <Input placeholder="افزودن نظر" style={{ textAlign: 'right' }} />
                                    <Button transparent><Icon name='ios-attach-outline' style={{ fontSize: 30 }}></Icon></Button>
                                    <Button transparent><Icon name='ios-mic-outline' style={{ fontSize: 30 }}></Icon></Button>
                                    <Button rounded style={{ backgroundColor: '#7EDAD1', width: 60, alignItems: 'center', justifyContent: 'center' }}><Icon name='ios-arrow-back' style={{ fontSize: 30, }}></Icon></Button>
                                </Item>
                            </Col>
                        </Row>


                        <Card>
                            <CardItem>
                                <Row style={{ padding: 5 }}>
                                    <Col size={20}>
                                        <Image style={{ borderRadius: 10, borderColor: 'black', borderWidth: 0.5, width: 60, height: 60 }} />
                                    </Col>
                                    <Col size={50}><Text style={{ fontSize: 15, color: '#7EDAD1' }}>دکتر حامد خرسندی</Text></Col>
                                    <Col size={40}><Text style={{ fontSize: 12 }}>۱۳۹۷/۷/۷  ۱۷:۰۷</Text></Col>
                                    <Col size={10} style={{ alignItems: 'center' }}>
                                        <SvgUri width="20" height="20"
                                            svgXmlData={order_calender}
                                        />
                                    </Col>
                                </Row>
                            </CardItem>
                            <CardItem>
                                <Row>
                                    <Col>
                                        <Text style={{ fontSize: 12, textAlign: 'left' }}> توضیحات  توضیحات  توضیحات  توضیحات  توضیحات  توضیحات  توضیحات  توضیحات  توضیحات </Text>
                                    </Col>
                                </Row>
                            </CardItem>
                        </Card>

                    </Grid>
                </Content>
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

const styles = StyleSheet.create({
    col: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        // borderWidth: 0.5,
        borderColor: 'red'
    },

});

export default OrderDetailScreen;
