import React, { PureComponent } from 'react';
import { FlatList, StyleSheet, Image, Dimensions, TouchableOpacity, InteractionManager } from 'react-native';
import { Row, Grid, Col } from 'react-native-easy-grid'
import { Container, View, Card, CardItem, Body, Text } from 'native-base';
import { getOrderManagement, getOrderLineItemsById } from '../Redux/Actions/Order.action'; //Import your actions
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ProgressDialog } from 'react-native-simple-dialogs'
import { CircularProgress } from 'react-native-svg-circular-progress'

import HeaderComponent from '../../../Components/Header.component'


const extractKey = ({ id }) => id

class OrderManagementScreen extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      page: 0,
      loading: true,
      currentPosition: 2,
      showDetails: false,

    };
  }
  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.props.getOrderManagement(this.state.page, 10, 'NEW,IN_PROGRESS,DONE,ACCEPTED,REVISION,REJECTED')

      this.setState({
        loading: false
      })
    });
  }
  componentWillMount() {

  }
  renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        key={item.orderId}
        style={styles.row}
        onPress={() => {
          this.props.navigation.navigate('OrderItem', { orderId: item.orderId })
          // this.props.getOrderLineItemsById(item.orderId)
        }}>
        <Card>
          <CardItem>
            <Body>
              <Row>
                <Col size={2} style={{ alignItems: 'center', paddingVertical: 15, justifyContent: 'center' }}>
                  {item.laboratoryForClient.user.profilePic ? <Image activeOpacity={0.7} resizeMode="cover" style={{ borderRadius: 20, width: '85%', height: '100%', borderWidth: 1, borderColor: 'gray' }}
                    source={{ uri: `http://89.32.249.208:8090${item.laboratoryForClient.user.profilePic.profilePicUrl}` }}
                  /> : <Image activeOpacity={0.7} resizeMode="cover" style={{ borderRadius: 20, width: '85%', height: '100%', borderWidth: 1, borderColor: 'gray' }}
                    source={{ uri: `http://s8.picofile.com/file/8342161734/lab_images2.png` }}
                    defaultSource={require('./../../../assets/img/png/image.png')}
                    />}
                </Col>
                <Col size={4} style={{ paddingVertical: 15, alignItems: 'flex-start' }}>
                  <Text style={{ fontSize: 15, color: '#80bcd3' }}>{item.labName}</Text>
                  <Text style={{ fontSize: 12 }} numberOfLines={1}>نام بیمار:{item.patientInfo.fullName}</Text>
                  <Text style={{ fontSize: 12 }}>شماره سفارش:{item.orderNO}</Text>
                  <Text style={{ fontSize: 12 }}>نوع کار:{item.productName && item.productName[0]}</Text>

                </Col>
                <Col size={3} style={{ justifyContent: 'flex-end', alignItems: 'center' }}>
                  <Text style={{ fontSize: 11 }}>{item.orderedDate}</Text>

                  <CircularProgress percentage={(item.doneNumber >= 0 && item.all > 0) ? (item.doneNumber / item.all) * 100 : 0} size={80}>
                    <View>
                      <Text style={{ fontSize: 12 }}>{item.doneNumber && item.all ? (item.doneNumber / item.all) * 100 : 0}%</Text>
                    </View>
                  </CircularProgress>
                </Col>
              </Row>

            </Body>
          </CardItem>
        </Card>
      </TouchableOpacity>

    )
  }

  handleRefresh = () => {
    this.props.getOrderManagement(0, 10, 'NEW,IN_PROGRESS,DONE,ACCEPTED,REVISION,REJECTED')
    this.setState({
      page: 0
    })
  }
  onEndReached = () => {
    if (this.props.orders.length >= 10) {
      this.props.getOrderManagement(this.state.page + 1, 10, 'NEW,IN_PROGRESS,DONE,ACCEPTED,REVISION,REJECTED')
      this.setState({
        page: this.state.page + 1
      })
    }

  }
  render() {
    if (this.state.loading) {
      return (
        <ProgressDialog
          visible={this.state.loading}
          title=""
          message="در حال بارگزاری ..."
        />
      )
    } else {
      return (
        <Container style={{ backgroundColor: '#f4f4f4' }}>
          <HeaderComponent title="سفارش های کار" />

          <Grid style={{ flex: 1 }}>
            <Row style={{ flex: 1 }}>

              <View style={{ flex: 1 }}>
                {this.props.orders ? <FlatList
                  style={styles.containerRow}
                  data={this.props.orders}
                  renderItem={this.renderItem}
                  keyExtractor={(item, i) => i.toString()}
                  onRefresh={this.handleRefresh}
                  onEndReached={this.onEndReached}
                  refreshing={false}
                  onEndReachedThreshold={0.5}
                /> : <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                    <Text>موردی وجود ندارد</Text>
                  </View>}

              </View>
            </Row>
          </Grid>

        </Container>

      );
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
    //   padding: 5,
    paddingLeft: 6,
    paddingRight: 6,
    //   marginBottom: 5,
    //   backgroundColor: 'skyblue',
  },
  col: {
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 0.5,
    borderColor: 'red'
  },
  row1: {
    height: 30
  }
})
function mapStateToProps(state, props) {
  return {
    loading: state.OrderReducer.loading,
    orders: state.OrderReducer.orders,
    currentOrder: state.OrderReducer.currentOrder,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getOrderManagement,
    getOrderLineItemsById
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderManagementScreen);

