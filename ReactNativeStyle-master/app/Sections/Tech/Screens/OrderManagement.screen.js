import React, { PureComponent } from 'react';
import { FlatList, StyleSheet, Image, Dimensions, TouchableOpacity, InteractionManager } from 'react-native';
import { Container, View, Card, CardItem, Item, Input, Icon, Body, Text, Button, Fab } from 'native-base';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import { getOrderByClinicId } from '../../Redux/Actions/Lab.action'
import { Grid, Row, Col } from 'react-native-easy-grid';
import HeaderComponent from '../../../Components/Header.component'
import { order_calender } from '../../../assets/img/svg/SvgXml'

import SvgUri from 'react-native-svg-uri';
import { CircularProgress } from 'react-native-svg-circular-progress'
import OrderManagementSearchScreen from './OrderManagementSearch.screen'

// import ProgressCircle from 'react-native-progress-circle'
const extractKey = ({ id }) => id

class OrderManagementScreen extends PureComponent {
  constructor(props) {
    super(props);
    // this.props.getOrderByClinicId(this.props.navigation.getParam('clinicId'))
    this.state = {
      doctorName: ''
    };
  }

  handleRefresh = () => {
    // this.props.getAssistant();
  }
  render() {
    console.log('milaaaaaaaaaaad' + this.props.techOrdersByLabId)
    return (
      <Container style={{ backgroundColor: '#f4f4f4' }}>
        <HeaderComponent title="لیست سفارشات" color="#7EDAD1" />
        <Grid style={{ flex: 1 }}>
          <OrderManagementSearchScreen labId={this.props.navigation.getParam('labId')} />

          <Row size={7} >

            <View style={{ flex: 1 }}>
              <FlatList
                style={styles.containerRow}
                data={this.props.techOrdersByLabId}
                renderItem={this.renderItem}
                keyExtractor={(item,i) => i.toString()}
                onRefresh={this.handleRefresh}
                onEndReached={this.onEndReached}
                refreshing={false}
                onEndReachedThreshold={0.5}
              />
            </View>
          </Row>
        </Grid>
        <Fab position="bottomRight"
          style={{ backgroundColor: '#7EDAD1' }}
          onPress={() => this.props.navigation.goBack()}>
          <Icon name='ios-arrow-back-outline' />
        </Fab>
      </Container>
    );
  }
  renderItem = ({ item }) => {
    //     0: {count: 1, orderLineItemsStatus: "DONE"}
    //     1: {count: 1, orderLineItemsStatus: "IN_PROGRESS"}
    //     2: {count: 1, orderLineItemsStatus: "ACCEPTED"}

    if (this.props.status == 'done') {
      return (
        // <TouchableOpacity
        //   key={item.clinicId}
        //   style={styles.row}
        //   onPress={() => { this.props.navigation.navigate('OrderDetail', { labId: this.props.navigation.getParam('labId'),orderId:item.orderId,
        //   labName:item.labName,patientName:item.patientInfo.fullName}) }}>
        <Card >
          <CardItem>
            <Body style={{ paddingVertical: 10 }}>
              <Row>
                <Col size={80} style={{ alignItems: 'flex-start', justifyContent: 'center' }}>
                  <Row >
                    <Col size={30}>
                      <Text style={{ fontSize: 15, color: '#7fbbd2', textAlign: 'left' }}>لابراتوار:</Text>
                    </Col>
                    <Col size={60} >
                      <Text style={{ fontSize: 13, textAlign: 'left' }}>{item.labName}</Text>
                    </Col>
                  </Row>
                  <Row >
                    <Col size={30}>
                      <Text style={{ fontSize: 13, color: '#7fbbd2', textAlign: 'left' }}>نام دکتر: </Text>
                    </Col>
                    <Col size={60}>
                      <Text style={{ fontSize: 13, textAlign: 'left' }}>{item.dentistName}</Text>
                    </Col>
                  </Row>
                  <Row >
                    <Col size={30}>
                      <Text style={{ fontSize: 13, color: '#7fbbd2', textAlign: 'left' }}>نام بیمار: </Text>
                    </Col>
                    <Col size={60}>
                      <Text style={{ fontSize: 13, textAlign: 'left' }}>{item.patientName}</Text>
                    </Col>
                  </Row>
                  <Row >
                    <Col size={30}>
                      <Text style={{ fontSize: 13, color: '#7fbbd2', textAlign: 'left' }}>نام تکنسین: </Text>
                    </Col>
                    <Col size={60}>
                      <Text style={{ fontSize: 13, textAlign: 'left' }}>{item.technicianName}</Text>
                    </Col>
                  </Row>
                  <Row >
                    <Col size={30}>
                      <Text style={{ fontSize: 13, color: '#7fbbd2', textAlign: 'left' }}>قالب: </Text>
                    </Col>
                    <Col size={60}>
                      <Text style={{ fontSize: 13, textAlign: 'left' }}>{item.workStep.title}</Text>
                    </Col>
                  </Row>
                </Col>

              </Row>
            </Body>
          </CardItem>
        </Card>
        // </TouchableOpacity>
      )
    } else {
      let total = 0;
      let current = 0;
      for (let sub of item.countList) {
        if (sub.orderLineItemsStatus == 'DONE') {
          current = sub.count;
        }
        total = total + sub.count;
      }
      return (
        <TouchableOpacity
          key={item.clinicId}
          style={styles.row}
          onPress={() => {
            this.props.navigation.navigate('OrderDetail', {
              labId: this.props.navigation.getParam('labId'), orderId: item.orderId,
              labName: item.labName, patientName: item.patientInfo.fullName
            })
          }}>
          <Card >
            <CardItem>
              <Body style={{ paddingVertical: 10 }}>
                <Row>
                  <Col size={50} style={{ alignItems: 'flex-start', justifyContent: 'center' }}>
                    <Row >
                      <Col size={40}>
                        <Text style={{ fontSize: 15, color: '#7fbbd2', textAlign: 'left' }}>لابراتوار:</Text>
                      </Col>
                      <Col size={60} style={{ padding: 0.4, alignItems: 'center', justifyContent: 'flex-end' }}>
                        <Text style={{ fontSize: 13, textAlign: 'left' }}>{item.labName}</Text>
                      </Col>
                    </Row>
                    <Row >
                      <Col>
                        <Text style={{ fontSize: 15, color: '#7fbbd2', textAlign: 'left' }}>نام دکتر: </Text>
                      </Col>
                      <Col>
                        <Text style={{ fontSize: 15 }}>{item.dentistName}</Text>
                      </Col>
                    </Row>
                    <Row >
                      <Col>
                        <Text style={{ fontSize: 15, color: '#7fbbd2', textAlign: 'left' }}>کدسفارش: </Text>
                      </Col>
                      <Col>
                        <Text style={{ fontSize: 15 }}>{item.orderNO}</Text>
                      </Col>
                    </Row>
                    <Row >
                      <Col>
                        <Text style={{ fontSize: 15, color: '#7fbbd2', textAlign: 'left' }}>نام بیمار: </Text>
                      </Col>
                      <Col>
                        <Text style={{ fontSize: 15 }}>{item.patientInfo.fullName}</Text>
                      </Col>
                    </Row>
                    {/* <Row >
                      <Col style={{ justifyContent: 'center', alignItems: 'center' }}>
                        {item.orderLineItem.product.productName ?
                          <Button small rounded block style={{ backgroundColor: '#f4f4f4' }}>
                            <Text style={{ fontSize: 12, color: 'black' }}>{item.orderLineItem.product.productName}</Text>
                          </Button> : null}
                      </Col>
                    </Row> */}
                  </Col>
                  <Col size={50} style={{ alignItems: 'flex-end', layout: 'ltr', textAlignment: 'left' }}>
                    <View>
                      <CircularProgress donutColor='#7EDAD1' percentage={total == 0 ? 0 : (current / total) * 100} size={80}>
                        <View>
                          <Text style={{ fontSize: 18 }}>{current}از{total}</Text>
                        </View>
                      </CircularProgress>
                    </View>
                  </Col>
                </Row>
              </Body>
            </CardItem>
          </Card>
        </TouchableOpacity>
      )
    }

  }

}
const styles = StyleSheet.create({
  containerRow: {
    marginTop: 5,
    width: Dimensions.get('window').width,
  },
  subtitleView: {
    flexDirection: 'column',
    paddingLeft: 10,
    paddingTop: 5
  },
  ratingImage: {
    height: 19.21,
    width: 100
  },
  ratingText: {
    paddingLeft: 10,
    color: 'grey'
  },
  container: {
    marginTop: 5,
    width: '100%'

  },
  row: {
    flex: 1,
    paddingLeft: 6,
    paddingRight: 6,

  },
  col: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'red'
  },
  row1: {
    height: 30
  }
})
function mapStateToProps(state, props) {
  return {
    techOrdersByLabId: state.TechReducer.techOrdersByLabId,
    status: state.TechReducer.status
    // clinicOrderLineItems: state.LabReducer.clinicOrderLineItems
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    // getOrderByClinicId
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderManagementScreen);