import React, { PureComponent } from 'react';
import { Dimensions, StyleSheet, Image, FlatList, View } from 'react-native';
import {
  Button, Text, Container, Grid, Row, Col, Icon, Fab, Thumbnail, Card,
  Header, Title, Right, Left, Item, Input, Label, Picker, Body
} from 'native-base';
import SvgUri from 'react-native-svg-uri';
import HeaderComponent from './../../../Components/Header.component'
import { getAssistant, checkPhoneNumber, addAssistant } from '../../../Redux/Actions/User.Action'
import { getAddress } from '../Redux/Actions/Order.action'
import { getAccessList } from '../../../Redux/Actions/User.Action'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { drawerOpener, drawerCloser } from '../../../Redux/Actions/Global.Actions'; //Import your actions
import { DrawerActions } from 'react-navigation';

import {
  my_profile_whatsapp_color,
  my_profile_telegram_color,
  my_profile_call_color,
  auth_name,
  auth_pass,
  auth_phone,
} from '../../../assets/img/svg/SvgXml'
import { Dialog } from 'react-native-simple-dialogs';
const extractKey = ({ id }) => id

class AssociateScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.props.getAssistant();
    this.props.getAddress()

    this.state = {
      showAddModal: false,
      showCheckModal: false,
      address: undefined
    };
  }


  componentDidUpdate() {
    if (this.props.drawerOpen) {
      this.props.navigation.dispatch(DrawerActions.openDrawer());
      this.props.drawerCloser();
    }
    if (this.props.phoneState == true && this.state.showCheckModal == true) {
      this.setState({
        showAddModal: true,
        showCheckModal: false,
        firstname: this.props.assistantDetail.firstName,
        lastname: this.props.assistantDetail.lastName,
        addressId: this.props.assistantDetail.addressIdList ? this.props.assistantDetail.addressIdList[0] : ''
      })
    }

  }

  renderItem = ({ item }) => {
    let itemHeight = Dimensions.get('screen').height / 10;
    return (
      <Card>
        <View style={{ justifyContent: 'space-evenly', flexDirection: 'row', alignItems: 'center', height: itemHeight, width: Dimensions.get('screen').width }}>

          <View style={{ alignSelf: 'center', flexDirection: 'row-reverse' }}>
            <Thumbnail source={require('./../../../assets/img/png/user.png')} style={{ marginLeft: -10, marginTop: 8, borderWidth: 1, borderColor: '#d2d2d2', zIndex: 100 }} />
            <Icon name='ios-close-circle-outline' style={{
              color: '#fe6958',
              justifyContent: 'flex-start',
              flexDirection: 'row',
              marginLeft: -20,
            }} />
          </View>


          <Text style={{ fontSize: 10, textAlign: 'center', alignSelf: 'center' }}>{item.firstName} {item.lastName}</Text>

          <Button rounded transparent style={{ alignSelf: 'center' }}>
            <SvgUri svgXmlData='<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><path d="M256 32c123.5 0 224 100.5 224 224S379.5 480 256 480 32 379.5 32 256 132.5 32 256 32M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256 256-114.6 256-256S397.4 0 256 0L256 0zM398.7 341.6l-1.4-4.4c-3.4-10.1-14.5-20.6-24.7-23.4L334.7 303.5c-10.2-2.8-24.9 1-32.4 8.5l-13.7 13.7c-49.7-13.5-88.8-52.5-102.2-102.2l13.7-13.7c7.5-7.5 11.3-22.1 8.5-32.4L198.2 139.5c-2.8-10.2-13.3-21.4-23.4-24.7l-4.3-1.4c-10.1-3.4-24.5 0-32 7.6l-20.5 20.5c-3.7 3.6-6 14-6 14.1 -0.7 65.1 24.8 127.7 70.8 173.8 45.9 45.9 108.3 71.3 173.2 70.8 0.3 0 11.1-2.3 14.7-5.9l20.5-20.5C398.7 366.1 402.1 351.7 398.7 341.6z" fill="#FFF"/></svg>'
              width='30' height='30' fill="#d6d6d6"
            />
          </Button>



          <Button rounded style={{ height: 30, backgroundColor: '#7fbbd2', alignSelf: 'center' }}
            onPress={() => {this.props.getAccessList(item.workplaceId)
              this.props.navigation.navigate('accessScreen')}}>
            <Text style={{ fontSize: 12, textAlign: 'right' }}>دسترسی </Text>
            <Icon name='ios-arrow-back' style={{ fontSize: 20 }} />
          </Button>


        </View>
      </Card>

    )

  }
  check() {
    this.props.checkPhoneNumber(this.state.phone)
  }
  selectAddress(value) {
    if (value) {
      this.setState({
        address: value
      })
    }
  }
  addAssistant() {
    this.setState({
      showAddModal: false
    })
    this.props.addAssistant({
      address: this.state.address,
      firstName: this.state.firstname,
      lastName: this.state.lastname,
      username: this.state.phone
    })

  }

  handleRefresh = () => {
    this.props.getAssistant();
  }
  onEndReached = () => {

  }
  render() {
    return (
      <Container style={styles.container}>
        <HeaderComponent title='دستیار های من' />

        <Grid>
          <Row style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'space-evenly' }}>
            <Image resizeMode="cover" source={require('../../../assets/img/png/asistant.png')} style={{ height: '100%', width: '100%' }} />
          </Row>
          <Row style={{ flex: 2, flexDirection: 'row' }}>
            <FlatList
              style={styles.containerRow}
              data={this.props.assistants}
              onRefresh={this.handleRefresh}
              keyExtractor={(item,i) => i.toString()}
              renderItem={this.renderItem}
              onEndReached={this.onEndReached}
              refreshing={false}
              onEndReachedThreshold={0.5}
            />
          </Row>
          <Row style={{ justifyContent: 'center', marginVertical: 10, flex: 0 }}>
            <Button rounded style={{ backgroundColor: '#7fbbd2', height: 40, justifyContent: 'center' }}
              onPress={() => this.setState({
                showCheckModal: true
              })}>
              <Text>افزودن دستیار جدید</Text>
              <Icon name='ios-arrow-back' style={{ fontSize: 20 }} />
            </Button>
          </Row>

        </Grid>
        <Dialog
          visible={this.state.showAddModal}
          onTouchOutside={() => this.setState({ showAddModal: false })}
          title="اضافه کردن دستیار">
          <Row style={{ height: 300 }}>
            <Col size={4} >

              <Item style={[styles.itemInput1]}>
                <Picker
                  placeholder='آدرس مطب را انتخاب کنید'
                  selectedValue={this.state.address}
                  onValueChange={this.selectAddress.bind(this)}
                  style={styles.Input}
                  renderHeader={backAction =>
                    <Header style={{ backgroundColor: "#7fbbd2" }}>
                      <Left />
                      <Body style={{ flex: 3 }}>
                        <Title style={{ color: "#fff", fontSize: 15 }}>آدرس مطب را انتخاب کنید</Title>
                      </Body>
                      <Right >
                        <Button transparent onPress={backAction}>
                          <Icon name="arrow-back" style={{ color: "#fff" }} />
                        </Button>
                      </Right>
                    </Header>}>
                  <Picker.Item label="آدرس مطب را انتخاب کنید" disabled />
                  {this.props.address ? this.props.address.map(item => (
                    <Picker.Item label={`${item.province.title} ${item.city.title} ${item.region}`} value={item} />
                  )) : null}
                </Picker>
                <Icon name='arrow-dropdown' style={{ left: 20 }} />
              </Item>

              <Item fixedLabel style={[styles.itemInput1]}>
                <Label style={{ fontSize: 12, textAlign: 'left' }}>نام: </Label>
                <Input value={this.state.firstname} onChangeText={(text) => this.setState({
                  firstname: text
                })} />
                <SvgUri width="20" height="20"
                  svgXmlData={auth_name}
                />
              </Item>
              <Item fixedLabel style={[styles.itemInput1]} >
                <Label style={{ fontSize: 12, textAlign: 'left' }}>نام خانوادگی: </Label>
                <Input value={this.state.lastname} onChangeText={(text) => this.setState({
                  lastname: text
                })} />
                <SvgUri width="20" height="20"
                  svgXmlData={auth_name}
                />
              </Item>



              <Button rounded block info style={[{ marginTop: 20, zIndex: 1, backgroundColor: '#7EDAD1' }]}
                onPress={() => this.addAssistant()} >
                <Text>افزودن</Text>
                <Icon name='ios-arrow-back' />
              </Button>
            </Col>
          </Row>
        </Dialog>
        <Dialog
          visible={this.state.showCheckModal}
          onTouchOutside={() => this.setState({ showCheckModal: false })}
          title="بررسی کاربر"
        >
          <Row style={{ height: 200 }}>
            <Col size={4} >
              <Item fixedLabel style={[styles.itemInput1]}>
                <Label style={{ fontSize: 12, textAlign: 'left' }}>شماره موبایل: </Label>
                <Input keyboardType="number-pad" onChangeText={(text) => this.setState({ phone: text })} />
                <SvgUri width="20" height="40"
                  svgXmlData={auth_phone}
                />
              </Item>

              <Button rounded block info style={[{ marginTop: 20, zIndex: 1, backgroundColor: '#7EDAD1' }]}
                onPress={() => this.check()} >
                <Text>بررسی</Text>
                <Icon name='ios-arrow-back' />
              </Button>
            </Col>
          </Row>
        </Dialog>


        <Fab
          style={{ backgroundColor: '#e7be00', position: 'absolute', bottom: 20, width: 40, height: 40, right: 3 }}
          position="bottomRight"
          onPress={() => this.props.navigation.navigate('dentist')}>
          <Icon name="ios-home-outline" />
        </Fab>

      </Container>
    );
  }
}

const styles = StyleSheet.create({
  itemInput1: {
    borderRadius: 25,
    // borderColor: 'red',
    backgroundColor: '#FFF',
    height: 45,
    width: '94%',
    padding: 5

  },
  Input: {
    textAlign: 'right',
    height: '100%',
    padding: 30,
    height: 35,
    fontSize: 15,
    borderColor: 'red',
    justifyContent: 'flex-start'
  },
  containerRow: {
    marginTop: 5,
    width: Dimensions.get('window').width,
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: '#f4f4f4'
  }
});

function mapStateToProps(state, props) {
  return {
    assistants: state.UserReducer.assistants,
    phoneState: state.UserReducer.phoneState,
    assistantDetail: state.UserReducer.assistantDetail,
    address: state.OrderReducer.address,
    drawerOpen: state.GlobalReducer.drawerOpen,

  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getAssistant,
    getAddress,
    checkPhoneNumber,
    addAssistant,
    drawerOpener, drawerCloser,
    getAccessList
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AssociateScreen);
