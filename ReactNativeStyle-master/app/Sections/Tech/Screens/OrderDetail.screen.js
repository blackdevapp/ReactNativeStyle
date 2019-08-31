import React, { PureComponent } from 'react';
import { StyleSheet, Image, TouchableOpacity, View, FlatList, Dimensions } from 'react-native'
import StepIndicator from 'react-native-step-indicator';
import { Container, Card, Text, CardItem, Item, Input, Icon, Button, Content, Fab } from 'native-base';
import { Grid, Row, Col } from 'react-native-easy-grid';
import colors from '../../../Config/Color';
import HeaderComponent from '../../../Components/Header.component';
import ToothShowScreen from '../../../Components/toothShow.component';
import { CircularProgress } from 'react-native-svg-circular-progress'
import SvgUri from 'react-native-svg-uri';
import { order_calender } from '../../../assets/img/svg/SvgXml'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getItemsByOrderId } from '../Redux/Actions/Tech.action'
import { order_time } from '../../../assets/img/svg/SvgXml'


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
    labelSize: 11,
    currentStepLabelColor: '#fe7013'
}
const extractKey = ({ id }) => id

class OrderDetailScreen extends PureComponent {
    constructor(props) {
        super(props);
        this.props.getItemsByOrderId(this.props.navigation.getParam('orderId'))
        this.state = {
            doctorName: ''
        };
    }


    componentWillMount() {

    }

    render() {
        let order = this.props.orderLineItems;
        return (
            <Container style={{ backgroundColor: colors.backgroundColor }}>
                <HeaderComponent title='جزییات سفارش' color='#7EDAD1' />
                <Content contentContainerStyle={{}}>
                    <Grid>
                        <Row>
                            <Col>
                                <Card >
                                    <CardItem>
                                        <Row>
                                            {/* <Col></Col> */}
                                            <Col >
                                                <Text style={{ fontSize: 12 }}>{order.orderedDate}</Text>
                                                {/* <SvgUri svgXmlData={order_time} width='15' height='15' /> */}
                                            </Col>
                                        </Row>
                                    </CardItem>
                                    <CardItem>

                                        <Row >
                                            <Col size={3} style={styles.col}>
                                                <Text style={{ fontSize: 12, color: 'grey' }}>کد سفارش:</Text>
                                                <Text style={{ fontSize: 12, color: 'grey' }}>لابراتوار:</Text>
                                                <Text style={{ fontSize: 12, color: 'grey' }}>پزشک:</Text>
                                                <Text style={{ fontSize: 12, color: 'grey' }}>آدرس سفارش:</Text>
                                                <Text style={{ fontSize: 12, color: 'grey' }}>نام بیمار:</Text>
                                                <Text style={{ fontSize: 12, color: 'grey' }}>تاریخ:</Text>
                                            </Col>
                                            <Col size={7} style={styles.col}>
                                                <Text style={{ fontSize: 12 }}>{order.orderNO}</Text>
                                                <Text style={{ fontSize: 12 }}>{order.labName}</Text>
                                                <Text style={{ fontSize: 12 }}>{order.dentistName}</Text>
                                                <Text style={{ fontSize: 12 }}>{order.address.province.title}-{order.address.city.title}-{order.address.region}-{order.address.ditails}</Text>
                                                <Text style={{ fontSize: 12 }}>{order.patientInfo.fullName}</Text>
                                                <Text style={{ fontSize: 12 }}>{order.orderedDate}</Text>
                                            </Col>
                                        </Row>
                                    </CardItem>

                                </Card>
                            </Col>
                        </Row>
                        <View style={{ flex: 1 }}>
                            <FlatList
                                style={styles.containerRow}
                                data={order.orderLineItems}
                                renderItem={this.renderItem}
                                keyExtractor={(item,i) => i.toString()}
                                onRefresh={this.handleRefresh}
                                onEndReached={this.onEndReached}
                                refreshing={false}
                                onEndReachedThreshold={0.5}
                            />
                        </View>
                        {/* <Row style={{ padding: 5 }}>
                            <Col>
                                <Item rounded style={{ padding: 5, backgroundColor: 'white', height: 58 }}>
                                    <Input placeholder="افزودن نظر" style={{ textAlign: 'right' }} />
                                    <Button transparent><Icon name='ios-attach-outline' style={{ fontSize: 30 }}></Icon></Button>
                                    <Button transparent><Icon name='ios-mic-outline' style={{ fontSize: 30 }}></Icon></Button>
                                    <Button rounded style={{ backgroundColor: '#7EDAD1', width: 60, alignItems: 'center', justifyContent: 'center' }}><Icon name='ios-arrow-back' style={{ fontSize: 30, }}></Icon></Button>
                                </Item>
                            </Col>
                        </Row> */}
                    </Grid>
                </Content>
                <Fab position="bottomRight"
                    style={{ backgroundColor: '#7EDAD1' }}
                    onPress={() => this.props.navigation.goBack()}>
                    <Icon name='ios-arrow-back-outline' />
                </Fab>
            </Container>
        );
    }
    renderItem = ({ item }) => {
        let order = this.props.orderLineItems;
        item.currentStep = 0;
        item.labels = [];
        let go = true;
        for (let sub of item.product.workSteps) {
            if (go == true) {
                if (sub.status == 'DONE') {
                    item.currentStep += 1;
                } else {
                    go == false;
                }
            }
            item.labels.push(sub.title)
        }

        return (
            <TouchableOpacity onPress={() => this.props.navigation.navigate('WorkSteps', {
                orderLineItem: item, orderId: this.props.navigation.getParam('orderId'),
                labName: this.props.navigation.getParam('labName'), labId: this.props.navigation.getParam('labId'),
                patientName: this.props.navigation.getParam('patientName')
            })}>
                <Row>
                    <Col>
                        <Card>
                            <CardItem>
                                <Row >
                                    <Col style={styles.col}>
                                        <Row>
                                            <Col><Text style={{ fontSize: 12, color: 'grey' }}>نام محصول:</Text></Col>
                                            <Col><Text style={{ fontSize: 12 }}>{item.product.productName}</Text></Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row >
                                    <Col >
                                        <ToothShowScreen teeth={item.teethNumbers} />
                                    </Col>
                                </Row>
                            </CardItem>
                            {item.buildOrders[0].properties.map(item => {
                                return (
                                    <CardItem>
                                        <Row>
                                            <Col style={styles.col}>
                                                <Row>
                                                    <Col>
                                                        <Text style={{ fontSize: 12, color: 'grey' }}>{item.key} :</Text>
                                                    </Col>
                                                    <Col>
                                                        <Text style={{ fontSize: 12 }}>{item.data}</Text>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </CardItem>
                                )
                            })}
                            <CardItem>
                                <Row>
                                    <Col size={6} style={styles.col}>
                                        <Text style={{ fontSize: 12, color: 'grey' }}>درخواست تست در مطب:</Text>
                                    </Col>
                                    <Col size={7} style={styles.col}>
                                        {item.listOfWorkstepDentistCheck.length > 0 ? <Row>
                                            {item.listOfWorkstepDentistCheck.map(sub => {
                                                return (
                                                    <Text style={{ fontSize: 12 }}>  {sub.workstep.title}   </Text>
                                                )
                                            })}
                                        </Row> : <Text style={{ fontSize: 12 }}>ندارد</Text>}
                                    </Col>
                                </Row>
                            </CardItem>
                            <CardItem>
                                <Row>
                                    <Col>
                                        <StepIndicator
                                            customStyles={customStyles}
                                            currentPosition={item.currentStep}
                                            labels={item.labels}
                                            stepCount={item.labels.length}
                                        />
                                    </Col>
                                </Row>
                            </CardItem>
                        </Card>
                    </Col>
                </Row>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    containerRow: {
        marginTop: 5,
        width: Dimensions.get('window').width,
    },
    col: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        // borderWidth: 0.5,
        borderColor: 'red'
    },

});
function mapStateToProps(state, props) {
    return {
        orderLineItems: state.TechReducer.orderLineItems
        // clinicOrderLineItems: state.LabReducer.clinicOrderLineItems
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getItemsByOrderId
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetailScreen);
