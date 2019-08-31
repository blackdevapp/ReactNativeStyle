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
import { startWorkStep, endWorkStep } from '../Redux/Actions/Tech.action'

const extractKey = ({ id }) => id

class WorkStepsScreen extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            lineItem: {}
        };
    }

    componentWillMount() {
        this.setState({
            lineItem: this.props.navigation.getParam('orderLineItem')
        })
    }
    render() {
        let order = this.props.orderLineItems;
        return (
            <Container style={{ backgroundColor: colors.backgroundColor }}>
                <HeaderComponent title={this.state.doctorName} color='#7EDAD1' />
                <Content contentContainerStyle={{}}>
                    <Grid>
                        <View style={{ flex: 1 }}>
                            <FlatList
                                style={styles.containerRow}
                                data={this.state.lineItem.product.workSteps}
                                renderItem={this.renderItem}
                                keyExtractor={(item,i) => i.toString()}
                                onRefresh={this.handleRefresh}
                                onEndReached={this.onEndReached}
                                refreshing={false}
                                extraData={this.state}
                                onEndReachedThreshold={0.5}
                            />
                        </View>
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



    async startWork(item, i) {
        console.log(new Date)
        work = {
            labName: this.props.navigation.getParam('labName'),
            laboratoryId: this.props.navigation.getParam('labId'),
            orderId: this.props.navigation.getParam('orderId'),
            orderLineItemId: this.state.lineItem.id,
            patientName: this.props.navigation.getParam('patientName'),
            technicianId: "",
            workStep: item
        }
        this.props.startWorkStep(work)
        let newItem = this.state.lineItem;
        newItem.product.workSteps[i].status = 'IN_PROGRESS'
        await this.setState({
            lineItem: newItem
        })
        this.setState({
            name: new Date().toString()
        })


    }
    async endWork(item, i) {
        let work = {}
        this.props.endWorkStep(this.props.navigation.getParam('orderId'), this.state.lineItem.id, item.id, work)
        let newItem = this.state.lineItem;
        newItem.product.workSteps[i].status = 'DONE'
        await this.setState({
            lineItem: newItem
        })
        this.setState({
            name: new Date().toString()
        })
    }

    renderStatus(status) {
        if (status == 'DONE') {
            return 'انجام شده'
        } else if (status == 'NOT_STARTED') {
            return 'آغاز نشده'
        } else if (status == 'IN_PROGRESS') {
            return 'درحال انجام'
        }
    }
    renderBackColor(status) {
        if (status === 'DONE') {
            return 'green'
        } else if (status === 'NOT_STARTED') {
            return 'white'
        } else if (status === 'IN_PROGRESS') {
            return '#e7be00'
        }
    }

    renderStatusColor(status) {
        if (status === 'DONE') {
            return 'green'
        } else if (status === 'NOT_STARTED') {
            return 'black'
        } else if (status === 'IN_PROGRESS') {
            return '#e7be00'
        }
    }

    renderItem = ({ item, index }) => {
        // console.log(item.status)
        return (
            // <TouchableOpacity>
            <Row >
                <Col>
                    <Card style={{ backgroundColor: this.renderBackColor(item.status) }}>
                        <CardItem>
                            <Row >
                                <Col style={styles.col}>
                                    <Row>
                                        <Col>
                                            <Text style={{ fontSize: 12, color: 'grey' }}>عنوان کار: </Text>
                                        </Col>
                                        <Col>
                                            <Text style={{ fontSize: 12 }}>{item.title}</Text>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Text style={{ fontSize: 12, color: 'grey' }}>وضعیت:</Text>
                                        </Col>
                                        <Col>
                                            <Text style={{ fontSize: 12, color: this.renderStatusColor(item.status) }}> {this.renderStatus(item.status)}</Text>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </CardItem>
                        <CardItem>
                            <Row >
                                <Col style={styles.col}>
                                    {item.status == 'NOT_STARTED' ?
                                        <Button block small style={{ backgroundColor: '#7EDAD1' }} rounded onPress={() => this.startWork(item, index)}>
                                            <Text>شروع به کار</Text>
                                        </Button> : null}
                                    {item.status == 'DONE' ?
                                        <Button rounded block small style={{ backgroundColor: 'grey' }}>
                                            <Text>اتمام یافته</Text>
                                        </Button> : null}
                                    {item.status == 'IN_PROGRESS' ?
                                        <Button rounded block small style={{ backgroundColor: 'red' }} onPress={() => this.endWork(item, index)}>
                                            <Text>پایان کار</Text>
                                        </Button> : null}

                                </Col>
                            </Row>
                        </CardItem>
                    </Card>
                </Col>
            </Row>
            // </TouchableOpacity>
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
        startWorkStep,
        endWorkStep
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkStepsScreen);
