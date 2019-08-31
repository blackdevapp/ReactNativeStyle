import React, { PureComponent } from 'react';
import { View, Button, Text, Container, Grid, Row, Col, Card, CardItem, Input, Item, Icon, Fab } from 'native-base';
import { StyleSheet, Image, Dimensions, ScrollView, Switch, TouchableOpacity } from 'react-native'
import SvgUri from 'react-native-svg-uri';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { changePass } from '../../../Redux/Actions/User.Action'
import { drawerOpener, drawerCloser } from '../../../Redux/Actions/Global.Actions'; //Import your actions
import { DrawerActions } from 'react-navigation';
import HeaderComponent from '../../../Components/Header.component'




class SettingsScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showChangePassword: false,
      password: '',
      newPassword: ''
    };
  }

  componentDidUpdate() {
    if (this.props.drawerOpen) {
      this.props.navigation.dispatch(DrawerActions.openDrawer());
      this.props.drawerCloser();
    }
  }

  changePassword() {
    pass = {
      newPassword: this.state.newPassword,
      newPasswordConfirmation: this.state.newPassword,
      password: this.state.password
    }
    this.props.changePass(pass)
    this.setState({
      password: '',
      newPassword: ''
    })
  }

  render() {
    let buttonSize = Dimensions.get('screen').height / 20;

    return (
      <Container style={styles.container}>
        <HeaderComponent title="وضعیت حساب" color="#7EDAD1" />
        <Grid>
          <Row ><Image source={require('./../../../assets/img/png/accountHeader.png')} style={{ height: '100%', width: '100%' }} resizeMode='cover' /></Row>
          <Row size={2}>
            <Col>

              <TouchableOpacity onPress={() => this.setState({ showChangePassword: !this.state.showChangePassword })}>
                <Card style={{ margin: 2, padding: 3 }} >
                  <CardItem >
                    <Row >
                      <Col size={20}>
                        <Icon name='ios-lock-outline' style={{ alignSelf: 'center', color: 'white', borderRadius: 20, backgroundColor: '#7EDAD1' }}></Icon>
                      </Col>
                      <Col size={60} style={{ alignItems: 'flex-start' }}>
                        <Text style={{ textAlign: 'right' }}>تغییر رمز</Text>
                      </Col>
                      <Col size={20}></Col>
                    </Row>
                  </CardItem>
                  {this.state.showChangePassword ?
                    <CardItem >
                      <Row>
                        <Col>
                          <Item>
                            <Input style={{ textAlign: 'right' }} value={this.state.password}
                              onChangeText={(text) => this.setState({
                                password: text
                              })}
                              secureTextEntry={true}
                              placeholder='رمز عبور فعلی'></Input>
                          </Item>
                          <Item>
                            <Input style={{ textAlign: 'right' }} value={this.state.newPassword}
                              onChangeText={(text) => this.setState({
                                newPassword: text
                              })}
                              secureTextEntry={true}
                              placeholder='رمز عبور جدید'></Input>
                          </Item>
                          {/* <Item> */}
                          <Button rounded block style={{ backgroundColor: '#e7be00' }}
                            onPress={() => this.changePassword()}
                          ><Text>تغییر</Text></Button>
                          {/* </Item> */}
                        </Col>
                      </Row>
                    </CardItem>
                    : null}
                </Card>
              </TouchableOpacity>


              <Card style={{ margin: 2, padding: 3 }}>
                <CardItem >
                  <Row >
                    <Col size={20}>
                      <Icon name='ios-lock-outline' style={{ alignSelf: 'center', color: 'white', borderRadius: 20, backgroundColor: '#7EDAD1' }}></Icon>
                    </Col>
                    <Col size={60} style={{ alignItems: 'flex-start' }}>
                      <Text style={{ textAlign: 'right', fontSize: 13 }}>دریافت نوتیفیکیشن</Text>
                    </Col>
                    <Col size={20}><Switch selected={true} /></Col>
                  </Row>
                </CardItem>
              </Card>
              <Card style={{ margin: 2, padding: 3 }}>
                <CardItem >
                  <Row >
                    <Col size={20}>
                      <Icon name='ios-lock-outline' style={{ alignSelf: 'center', color: 'white', borderRadius: 20, backgroundColor: '#7EDAD1' }}></Icon>
                    </Col>
                    <Col size={60} style={{ alignItems: 'flex-start' }}>
                      <Text style={{ textAlign: 'right', fontSize: 13 }}>صدا در هنگام دریافت نوتیفیکیشن</Text>
                    </Col>
                    <Col size={20}><Switch selected={true} /></Col>
                  </Row>
                </CardItem>
              </Card>
              <Card style={{ margin: 2, padding: 3 }}>
                <CardItem >
                  <Row >
                    <Col size={20}>
                      <Icon name='ios-lock-outline' style={{ alignSelf: 'center', color: 'white', borderRadius: 20, backgroundColor: '#7EDAD1' }}></Icon>
                    </Col>
                    <Col size={60} style={{ alignItems: 'flex-start' }}>
                      <Text style={{ textAlign: 'right', fontSize: 13 }}>لرزش در هنگام دریافت نوتیفیکیشن</Text>
                    </Col>
                    <Col size={20}><Switch selected={true} /></Col>
                  </Row>
                </CardItem>
              </Card>



            </Col>
          </Row>
        </Grid>
        <Fab
          position="bottomRight" style={{ backgroundColor: '#7EDAD1' }}
          onPress={() => this.props.navigation.goBack()}>
          <Icon name="ios-arrow-back" />
        </Fab>
      </Container >
    );

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: '#eee'
  }
});
function mapStateToProps(state, props) {
  return {
    drawerOpen: state.GlobalReducer.drawerOpen,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    changePass,drawerOpener, drawerCloser
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);