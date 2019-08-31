import React, { PureComponent } from 'react';
import { FlatList, StyleSheet, Image, Dimensions, TouchableOpacity, InteractionManager } from 'react-native';
import { Container, View, Card, CardItem, Item, Input, Icon, Fab ,Body, Text, Button } from 'native-base';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getOrderByClinicId } from '../../Redux/Actions/Lab.action'
import { Grid, Row, Col } from 'react-native-easy-grid';
import HeaderComponent from '../../../../Components/Header.component'
import {
  order_calender,
} from '../../../../assets/img/svg/SvgXml'

import SvgUri from 'react-native-svg-uri';
import { CircularProgress } from 'react-native-svg-circular-progress'


// import ProgressCircle from 'react-native-progress-circle'
const extractKey = ({ id }) => id

class OrderListScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.props.getOrderByClinicId(this.props.navigation.getParam('clinicId'))
    this.state = {
      doctorName: ''
    };
  }

  componentWillMount() {
    this.setState({
      doctorName: `لیست سفارشات دکتر ${this.props.navigation.getParam('clinicName')}`
    })
  }
  render() {
    return (
      <Container style={{ backgroundColor: '#f4f4f4' }}>
        <HeaderComponent title={this.state.doctorName} color="#7EDAD1" />
        <Grid style={{ flex: 1 }}>
          <Row size={1}>
            <Col>
              <View style={{ paddingHorizontal: 5, paddingTop: 10 }}>
                <Item rounded style={{ backgroundColor: 'white' }}>
                  <Input style={{ height: 35, fontSize: 11, textAlign: 'right', }} placeholder="نام دکتر مورد نظر را جستجو کنید" />
                  <TouchableOpacity onPress={() => alert('salam')}>
                    <Icon name="ios-search" style={{ color: '#7EDAD1' }} />
                  </TouchableOpacity>
                </Item>
              </View>
            </Col>
          </Row>
          <Row size={9} >

            <View style={{ flex: 1 }}>
              <FlatList
                style={styles.containerRow}
                data={this.props.clinicOrderLineItems}
                renderItem={this.renderItem}
                keyExtractor={(item,i) => i.toString()}
                onRefresh={this.handleRefresh}
                onEndReached={this.onEndReached}
                refreshing={false}
                onEndReachedThreshold={0.5}
              />
            </View>
          </Row>
          <Fab
          style={{ backgroundColor: '#e7be00', position: 'absolute', bottom: 2, width: 40, height: 40, left: 3 }}
          position="bottomLeft"
          onPress={() => this.props.navigation.goBack()}>
          <Icon name="ios-arrow-back" />
        </Fab>
        </Grid>
        
      </Container>
    );
  }
  renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        key={item.clinicId}
        style={styles.row}
        onPress={() => { this.props.navigation.navigate('OrderDetail', { item: item, name: this.props.navigation.getParam('clinicName') }) }}>
        <Card >
          <CardItem>
            <Body style={{ paddingVertical: 10 }}>
              <Row>
                <Col size={50} style={{ alignItems: 'flex-start', justifyContent: 'center' }}>
                  <Row >
                    <Col size={70}>
                      <Text style={{ fontSize: 13, textAlign: 'left' }}>{item.time}</Text>
                    </Col>
                    <Col size={30} style={{ padding: 0.4, alignItems: 'center', justifyContent: 'flex-end' }}>
                      <SvgUri width="20" height="20"
                        svgXmlData={order_calender}
                      />
                    </Col>
                  </Row>
                  <Row >
                    <Col>
                      <Text style={{ fontSize: 15, color: '#7fbbd2', textAlign: 'left' }}>نام بیمار: </Text>
                    </Col>
                    <Col>
                      <Text style={{ fontSize: 15 }}>{item.patient}</Text>
                    </Col>
                  </Row>
                  <Row >
                    <Col style={{ justifyContent: 'center', alignItems: 'center' }}>
                      {item.orderLineItem.product.productName ?
                        <Button small rounded block style={{ backgroundColor: '#f4f4f4' }}>
                          <Text style={{ fontSize: 12, color: 'black' }}>{item.orderLineItem.product.productName}</Text>
                        </Button> : null}
                    </Col>
                  </Row>
                </Col>
                <Col size={50} style={{ alignItems: 'flex-end', layout: 'ltr', textAlignment: 'left' }}>
                  <View>
                    <CircularProgress donutColor='#7EDAD1' percentage={item.orderLineItem.labels.length == 0 ? 0 : (item.orderLineItem.currentStep / item.orderLineItem.labels.length) * 100} size={80}>
                      <View>
                        <Text style={{ fontSize: 18 }}>{item.orderLineItem.currentStep}از{item.orderLineItem.labels.length}</Text>
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
    clinicOrderLineItems: state.LabReducer.clinicOrderLineItems
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getOrderByClinicId
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderListScreen);