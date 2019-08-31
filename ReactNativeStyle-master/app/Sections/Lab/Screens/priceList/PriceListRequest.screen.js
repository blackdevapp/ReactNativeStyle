import React, { PureComponent } from 'react';
import { View, StyleSheet, FlatList, Dimensions, TouchableOpacity, Image } from 'react-native';
import { Container, Text, Button, Card, CardItem, Body, Icon } from 'native-base';
import HeaderComponent from '../../../../Components/Header.component'
import { Grid, Row, Col } from 'react-native-easy-grid';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Dialog } from 'react-native-simple-dialogs'
import { getRequestedSubscribers, getSubscribers, myPriceClasses, sendPriceClass } from '../../Redux/Actions/Lab.action'
const extractKey = ({ id }) => id

class PriceListRequestScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      mode: 'accepted',
      sendClass: false,
      dentId: ''
    };
  }

  componentDidMount() {
    this.props.getRequestedSubscribers();
    this.props.getSubscribers();
    // this.props.myPriceClasses()
  }
  renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        // key={item.subscriberId}
        style={styles.row}>
        <Card>
          <CardItem>
            <Body>
              <Row>
                <Col size={2} style={{ alignItems: 'center', justifyContent: 'center' }}>
                  {item.profilePicUrl ? <Image activeOpacity={0.7} resizeMode="cover" style={{ borderRadius: 20, width: '85%', height: 56, borderWidth: 1, borderColor: 'gray' }}
                    source={{ uri: `http://89.32.249.208:8090${item.profilePicUrl}` }}
                  /> : <Image activeOpacity={0.7} resizeMode="cover" style={{ borderRadius: 20, width: '85%', height: 56, borderWidth: 1, borderColor: 'gray' }}
                    source={require('../../../../assets/img/png/user.png')}
                    />}
                </Col>
                <Col size={4} style={{ alignItems: 'flex-start', justifyContent: 'center' }}>
                  <Text style={{ fontSize: 15, color: '#80bcd3' }}>دکتر {item.fullName}</Text>
                </Col>
                <Col size={3} style={{ justifyContent: 'center', alignItems: 'flex-end' }}>
                  <Button rounded style={{ backgroundColor: '#7EDAD1' }}
                    onPress={() => this.setState({
                      dentId: item.subscriberId,
                      sendClass: true
                    })}>
                    <Text style={{ color: 'white' }}>ارسال</Text>
                    <Icon name="arrow-back" style={{ color: 'white', fontSize: 12 }} />
                  </Button>
                </Col>
              </Row>

            </Body>
          </CardItem>
        </Card>
      </TouchableOpacity>

    )
  }


  renderClassTitle(sub) {

    for (let item of this.props.priceClasses) {
      if (item.id == sub.priceClassId) {
        return item.title
      }
    }

  }
  renderItemAccepted = ({ item }) => {
    return (
      <TouchableOpacity
        // key={item.subscriberId}
        style={styles.row}>
        <Card>
          <CardItem>
            <Body>
              <Row>
                <Col size={2} style={{ alignItems: 'center', justifyContent: 'center' }}>
                  {item.profilePicUrl ? <Image activeOpacity={0.7} resizeMode="cover" style={{ borderRadius: 20, width: '85%', height: 56, borderWidth: 1, borderColor: 'gray' }}
                    source={{ uri: `http://89.32.249.208:8090${item.profilePicUrl}` }}
                  /> : <Image activeOpacity={0.7} resizeMode="cover" style={{ borderRadius: 20, width: '85%', height: 56, borderWidth: 1, borderColor: 'gray' }}
                    source={require('../../../../assets/img/png/user.png')}
                    />}
                </Col>
                <Col size={4} style={{ alignItems: 'flex-start', justifyContent: 'center' }}>
                  <Text style={{ fontSize: 15, color: '#80bcd3' }}>دکتر {item.fullName}</Text>
                </Col>
                <Col size={3} style={{ justifyContent: 'center', alignItems: 'flex-end' }}>
                  <Button rounded bordered success block small>
                    {this.props.priceClasses.length > 0 ? <Text style={{ fontSize: 10, color: 'green' }}>{this.renderClassTitle(item)}</Text>
                      : null}

                  </Button>
                </Col>
              </Row>

            </Body>
          </CardItem>
        </Card>
      </TouchableOpacity>

    )
  }

  handleRefresh = () => {


  }
  onEndReached = () => {

  }
  renderSub() {
    if (this.state.mode == 'accepted') {
      return (
        <Grid style={{ flex: 1 }}>
          <Row style={{ flex: 1 }}>
            <FlatList
              style={styles.containerRow}
              data={this.props.subscribers}
              renderItem={this.renderItemAccepted}
              keyExtractor={(item,i) => i.toString()}
              onRefresh={this.handleRefresh}
              onEndReached={this.onEndReached}
              refreshing={false}
              onEndReachedThreshold={0.5}
            />
          </Row>

        </Grid>

      )
    } else if (this.state.mode == 'requested') {
      return (
        <Grid style={{ flex: 1 }}>
          <Row style={{ flex: 1 }}>
            <FlatList
              style={styles.containerRow}
              data={this.props.requestedSubscribers}
              renderItem={this.renderItem}
              keyExtractor={(item,i) => i.toString()}
              onRefresh={this.handleRefresh}
              onEndReached={this.onEndReached}
              refreshing={false}
              onEndReachedThreshold={0.5}
            />
          </Row>

        </Grid>
      )
    }
  }

  sendPriceClass(id) {
    priceClass = {
      priceClassId: id,
      status: 'ACCEPTED'
    }
    this.props.sendPriceClass(priceClass, this.state.dentId)
    this.setState({ sendClass: false })
  }

  render() {
    return (
      <Container style={{ backgroundColor: '#f4f4f4' }}>
        <HeaderComponent title="مدیریت لیست قیمت ها" color="#7EDAD1" />
        <Dialog
          visible={this.state.sendClass}
          title={<Text>ارسال لیست قیمت به پزشک</Text>}
          onTouchOutside={() => this.setState({ sendClass: false })} >
          <View style={{ height: Dimensions.get('window').height / 3 }}>
            <Row >
              <Col></Col>
              <Col size={3}>
                {this.props.priceClasses.map((sub) => {
                  return (


                    <Button style={{ marginTop: 10 }} block bordered rounded small onPress={() => this.sendPriceClass(sub.id)}>
                      <Text>{sub.title}</Text>
                      {/* <Icon name="arrow-back" style={{ color: 'white', fontSize: 12 }} /> */}

                    </Button>

                  )


                })}
              </Col>
              <Col></Col>
            </Row>
          </View>

        </Dialog>
        {/* <Grid style={{ flex: 1 }}> */}
        <Row size={1} style={{ zIndex: 10 }}>
          <Col>
            <Button style={[(this.state.mode == 'accepted') ? { backgroundColor: '#818384' } : { backgroundColor: '#ffffff' }, { width: '100%', borderRadius: 0, justifyContent: 'center', height: 56 }]}
              onPress={() => this.setState({ mode: 'accepted' })}>
              <Text style={[(this.state.mode !== 'accepted') ? { color: '#818384' } : { color: '#ffffff' }, { fontSize: 12 }]}>لیست قیمت های ارسال شده</Text>
            </Button>
          </Col>
          <Col>
            <Button style={[(this.state.mode == 'requested') ? { backgroundColor: '#818384' } : { backgroundColor: '#ffffff' }, { width: '100%', borderRadius: 0, justifyContent: 'center', height: 56 }]}
              onPress={() => this.setState({ mode: 'requested' })}>
              <Text style={[(this.state.mode == 'requested') ? { color: '#ffffff' } : { color: '#818384' }, { fontSize: 12 }]}>درخواست های لیست قیمت</Text>
            </Button>
          </Col>
        </Row>
        <Row size={7}>
          {this.renderSub()}
        </Row>
        <Row size={2}>
          <Col>
            <Button onPress={() => this.props.navigation.navigate('MyPriceList')}
              rounded block style={{ backgroundColor: '#7EDAD1' }}><Text>لیست قیمتهای من</Text></Button>
          </Col>
        </Row>
        {/* </Grid> */}
      </Container>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    loading: state.LabReducer.loading,
    subscribers: state.LabReducer.subscribers,
    requestedSubscribers: state.LabReducer.requestedSubscribers,
    priceClasses: state.LabReducer.priceClasses


  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getRequestedSubscribers,
    getSubscribers,
    myPriceClasses,
    sendPriceClass
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PriceListRequestScreen);

const styles = StyleSheet.create({
  containerRow: {
    marginTop: 5,
    width: Dimensions.get('window').width,
  },
  row: {
    flex: 1,
    //   padding: 5,
    paddingLeft: 6,
    paddingRight: 6,
    //   marginBottom: 5,
    //   backgroundColor: 'skyblue',
  },
})