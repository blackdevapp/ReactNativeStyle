import React, { PureComponent } from 'react';
import { FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Card, CardItem, View, Text, Container, Body, Button, Icon, Fab } from 'native-base'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getAllConnectedLabs } from '../Redux/Actions/Order.action'; //Import your actions
import { Grid, Row, Col } from 'react-native-easy-grid';
import { ListItem, Avatar, Rating } from 'react-native-elements'
import HeaderComponent from '../../../Components/Header.component';

import { drawerOpener, drawerCloser } from '../../../Redux/Actions/Global.Actions'; //Import your actions
import { DrawerActions } from 'react-navigation';


const extractKey = ({ id }) => id

class MyLabScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidUpdate(){
    if (this.props.drawerOpen) {
      this.props.navigation.dispatch(DrawerActions.openDrawer());
      this.props.drawerCloser();
    }
  }

  componentDidMount() {
    
    this.props.getAllConnectedLabs()
  }
  renderItem = ({ item }) => {
    // alert(JSON.stringify(item,null,5))
    return (
      <TouchableOpacity
        key={item.labId}
        style={styles.row}
        onPress={() => {
          this.props.navigation.navigate('labProfileDent', {
            classId: item.subscribers[0].priceClassId,
            status: 'ACCEPTED', labId: item.id, type: 'myLab'
          })
        }}>
        {/* <Grid style={{flex:1}}> */}
        <Card>

          <CardItem>
            <Body>
              <Row>
                <Col size={2} style={{ flex: 1, flexDirection: 'row' }}><Image activeOpacity={0.7} resizeMode="cover" style={{ borderRadius: 10, width: '100%', height: '100%', borderWidth: 1, borderColor: 'gray' }}
                  source={{ uri: `https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg` }}
                />
                  {/* <SvgUri width="30" height="30" source={require("../../assets/images/recieve.svg")} /> */}
                </Col>
                <Col size={2} style={{ paddingHorizontal: 5 }}>
                  <Text style={{ fontSize: 13, color: '#80bcd3', flexDirection: 'column', paddingRight: 15 }}>لابراتور {item.labName}</Text>
                  {/* {this.renderSubTitle(item.subscribeStatus)} */}
                  {/* <Text style={{ fontSize: 12, flexDirection: 'column', paddingRight: 15 }}>مسئول:‌ میلاد احمدی</Text> */}

                </Col>
                <Col size={2} style={{ justifyContent: 'flex-end', alignItems: 'center' }}>
                  <Row style={{ paddingHorizontal: 0 }}>
                    <Rating
                      showRating
                      type="star"
                      fractions={1}
                      startingValue={3}
                      readonly
                      showRating={false}
                      imageSize={11}
                      showReadOnlyText={false}
                      style={{ paddingVertical: 10 }}
                    >

                    </Rating>
                    <Text style={{ fontSize: 8, paddingVertical: 10, paddingHorizontal: 5 }}>از 100 نظر</Text>
                  </Row>
                  <Button style={{ width: '75%', height: 25, justifyContent: 'center', borderRadius: 25, backgroundColor: '#7fbbd2' }}
                    onPress={() => {
                      this.props.navigation.navigate('labProfileDent', {
                        classId: item.subscribers[0].priceClassId,
                        status: 'ACCEPTED', labId: item.id, type: 'myLab'
                      })
                    }}>
                    <Text style={{ fontSize: 11 }}>لیست قیمت</Text>
                    <Icon name='ios-arrow-back' style={{ fontSize: 11 }} color='#fff' />
                  </Button>
                </Col>
              </Row>
            </Body>
          </CardItem>
        </Card>
        {/* </Grid> */}
      </TouchableOpacity>

    )
  }

  render() {
    return (
      <Container style={{ backgroundColor: '#f4f4f4' }}>
        <HeaderComponent title="لابراتوارهای من" />
        <Image source={require('./../../../assets/img/png/mylabheader.png')} style={{ height: '30%', width: '100%' }} resizeMethod='scale' />
        <Grid>
          {/* <Row size={3} style={{ flex: 1 }}></Row> */}
          <Row style={{ flex: 0 }}>
            <Col style={{ flex: 1, justifyContent: 'center' }}>
              <View style={{ borderBottomColor: '#b3b3b5', borderBottomWidth: 1 }} />
            </Col>
            <Col style={{ flex: 1, justifyContent: 'center' }}><Text style={{ fontSize: 15, color: '#7e7e7f', textAlign: 'center', alignSelf: 'center' }}>لابراتوار های من</Text></Col>
            <Col style={{ flex: 1, justifyContent: 'center' }}>
              <View style={{ borderBottomColor: '#b3b3b5', borderBottomWidth: 1 }} />
            </Col>
          </Row>
          <Row size={4} >
            <View style={{ flex: 1 }}>
              <FlatList
                style={styles.container}
                data={this.props.connectedLabs}
                renderItem={this.renderItem}
                keyExtractor={(item,i) => i.toString()}
              />
            </View>

          </Row>

          {/* <Row size={1} style={{ flex: 0, paddingBottom: 20,justifyContent:'center' }}> */}



          {/* </Row> */}
        </Grid>
        {/* <Button block rounded style={{ backgroundColor: '#7fbbd2', alignSelf: 'center', marginVertical: 15, width: '50%' }}>

          <Text style={{ textAlign: 'center', fontSize: 13 }}>

            افزودن لابراتوار های جدید
                </Text>
          <Icon style={{ color: '#ffffff' }} name="ios-arrow-back" />
        </Button> */}
        <Fab
          style={{ backgroundColor: '#e7be00', position: 'absolute', bottom: 3, width: 40, height: 40, right: 3 }}
          position="bottomRight"
          onPress={() => this.props.navigation.navigate('dentist')}>
          <Icon name="ios-arrow-back" />
        </Fab>
        {/* <Fab
          style={{ backgroundColor: '#e7be00',marginBottom:-10 }}
          position="bottomRight"
          onPress={() => this.props.navigation.navigate('dentist')}>
          <Icon name="ios-arrow-back" />
        </Fab> */}
      </Container>
    );
  }
}
const styles = StyleSheet.create({
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
  container1: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: '#eee'
  },
  container: {
    marginTop: 5,
    width: '100%'

  },
  row: {
    //   padding: 5,
    paddingLeft: 6,
    paddingRight: 6,
    //   marginBottom: 5,
    //   backgroundColor: 'skyblue',
  },
})
function mapStateToProps(state, props) {
  return {
    loading: state.OrderReducer.loading,
    connectedLabs: state.OrderReducer.connectedLabs,
    drawerOpen: state.GlobalReducer.drawerOpen,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getAllConnectedLabs,drawerOpener, drawerCloser
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MyLabScreen);
