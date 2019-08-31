import React, { PureComponent } from 'react';
import { Container, Tabs, Tab, TabHeading, Content, Text, Item, Label, Icon, Input, Button, View, Segment, Right, Fab } from 'native-base'
import HeaderComponent from '../Components/Header.component'
import { Grid, Row, Col } from 'react-native-easy-grid'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SvgUri from 'react-native-svg-uri';
import {
  login, signup, verify, checkLogin, forgetPass, setNewPass, showLoading
} from '../Redux/Actions/User.Action'; //Import your actions
import { setDrawerItems } from '../Redux/Actions/Global.Actions'
import { StyleSheet, Image, Dimensions, ScrollView } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { ProgressDialog } from 'react-native-simple-dialogs'
import {
  auth_fax,
  auth_ham_menu,
  auth_location,
  auth_mobile,
  auth_name,
  auth_pass,
  auth_phone,

} from '../assets/img/svg/SvgXml'
import Snackbar from 'react-native-snackbar';

class AuthScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.props.showLoading();
    this.props.checkLogin();

    this.state = {
      pageMode: 'splash',
      mode: 'selectType',
      userType: '',
      newDentist: false,
      newLab: false,
      username: '',
      labName: '',
      password: '',
      newPass: '',
      firstName: '',
      lastName: '',
      password: '',
      passwordConfirmation: '',
      code: '',
      signupModeState: '' // for test
    };
  }


  componentWillMount() {
    // this.props.navigation.navigate('LabStack');
  }

  goToDentist() {
    this.props.navigation.navigate('DentistStack');
  }
  goToLab() {
    this.props.navigation.navigate('LabStack');
  }
  componentDidUpdate() {
    if (this.props.loggedIn && this.props.userType == 'DENTIST') {
      this.props.setDrawerItems('dentist')
      this.props.navigation.navigate('dentist')
    } else if (this.props.loggedIn && this.props.userType == 'LABORATORY_ADMIN') {
      this.props.setDrawerItems('lab')
      this.props.navigation.navigate('lab')
    } else if (this.props.loggedIn && this.props.userType == 'LABORATORY_TECHNICIAN') {
      this.props.setDrawerItems('tech')
      this.props.navigation.navigate('tech')
    }
  }

  componentDidMount() {


  }

  loginDentist() {
    if(this.state.username&&this.state.password){
      user = {
        username: this.state.username,
        password: this.state.password,
      }
      this.props.showLoading()
      this.props.login(user)
    }else{
      Snackbar.show({
        title: 'اطلاعات مربوطه را کامل فرمایید!',
        duration: 5000,
        backgroundColor:'red'
      });
    }
    
  }
  loginLab() {
    if(this.state.username&&this.state.password){
      user = {
        username: this.state.username,
        password: this.state.password,
      }
      this.props.showLoading()
      this.props.login(user)
    }else{
      Snackbar.show({
        title: 'اطلاعات مربوطه را کامل فرمایید!',
        duration: 5000,
        backgroundColor:'red'
      });
    }
  }

  signupDentist() {
    if(this.state.username&&this.state.firstName&&this.state.lastName){

    }else{
      Snackbar.show({
        title: 'اطلاعات مربوطه را کامل فرمایید!',
        duration: 5000,
        backgroundColor:'red'
      });
    }
    if (this.state.password == this.state.passwordConfirmation) {
      user = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        password: this.state.password,
        passwordConfirmation: this.state.passwordConfirmation,
        userType: 'DENTIST', // LABORATORY_ADMIN, DENTIST, LABORATORY_TECHNICIAN, SYS_ADMIN, DENTIST_ASSISTANT
        username: this.state.username
      }
      this.props.showLoading()
      this.props.signup(user)
    } else {
      Snackbar.show({
        title: 'رمز عبور و تکرار رمز عبور برابر نیستند',
        duration: 5000,
        backgroundColor: 'red'
      });
    }
  }

  signupLab() {
    if(this.state.username&&this.state.firstName&&this.state.lastName){
      if (this.state.password == this.state.passwordConfirmation) {
        user = {
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          labName: this.state.labName,
          password: this.state.password,
          passwordConfirmation: this.state.passwordConfirmation,
          userType: 'LABORATORY_ADMIN', // LABORATORY_ADMIN, DENTIST, LABORATORY_TECHNICIAN, SYS_ADMIN, DENTIST_ASSISTANT
          username: this.state.username
        }
        this.props.showLoading()
        this.props.signup(user)
      } else {
        Snackbar.show({
          title: 'رمز عبور و تکرار رمز عبور برابر نیستند',
          duration: 5000,
          backgroundColor: 'red'
        });
      }
    }else{
      Snackbar.show({
        title: 'اطلاعات مربوطه را کامل فرمایید!',
        duration: 5000,
        backgroundColor:'red'
      });
    }
    

  }

  confirmDentist() {
    if(this.state.code){
      user = {
        mobileNumber: this.state.username,
        verificationToken: this.state.code,
        password: this.state.password
      }
      this.props.showLoading()
      this.props.verify(user)
      this.setState({
        mode: 'dentist',
        newDentist: false
      })
    }else{
      Snackbar.show({
        title: 'کدفعال سازی را وارد نمایید',
        duration: 5000,
        backgroundColor:'red'
      });
    }
    
  }
  confirmLab() {
    if(this.state.code){
      user = {
        mobileNumber: this.state.username,
        verificationToken: this.state.code,
        password: this.state.password
      }
      this.props.showLoading()
      this.props.verify(user)
      this.setState({
        mode: 'lab',
        newLab: false
      })
    }else{
      Snackbar.show({
        title: 'کد فعال سازی را وارد نمایید',
        duration: 5000,
        backgroundColor:'red'
      });
    }
    
  }

  forgetPass() {
    if(this.state.username){
      this.props.forgetPass(this.state.username)
      this.setState({
        mode: 'changePass'
      })
    }else{
      Snackbar.show({
        title: 'شماره موبال خود را وارد نمایید!',
        duration: 5000,
        backgroundColor:'red'
      });
    }
    
  }
  setNewPassword() {
    if(this.state.code){
      if (this.state.newPass == this.state.passwordConfirmation) {
        user = {
          newPassword: this.state.newPass,
          newPasswordConfirmation: this.state.passwordConfirmation
        }
        this.props.setNewPass(this.state.code, this.state.username, user)
        this.setState({
          mode: 'selectType'
        })
      } else {
        Snackbar.show({
          title: 'رمز عبور و تکرار رمز عبور برابر نیستند',
          duration: 5000,
          backgroundColor: 'red'
        });
      }
    }else{
      Snackbar.show({
        title: 'کد فعال سازی را وارد نمایید',
        duration: 5000,
        backgroundColor:'red'
      });
    }
    

  }

  render() {
    if (this.state.mode == 'selectType') {
      return (

        <Grid style={{ backgroundColor: '#f4f4f4' }}>
          <ProgressDialog
            visible={this.props.loading}
            title=""
            message="در حال بارگزاری ..."
          />
          <Row size={6}>
            <Image style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height / 3 }} resizeMode="cover" source={require('../assets/img/png/image.png')} />
          </Row>
          <Row size={5} style={{ justifyContent: 'center', flexDirection: 'row' }}>

            <Grid >
              <Row size={1} >
                <Col size={1}></Col>
                <Col size={5}>
                  <Button style={{ width: '100%', justifyContent: 'center', borderRadius: 25, backgroundColor: '#7fbbd2' }} onPress={() => this.setState({ mode: 'dentist' })}>
                    <SvgUri
                      width='40'
                      height='40'
                      fill='#ffffff'
                      svgXmlData='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 125"><title>  Tavola disegno 28</title><path d="M50 48.7c9.5 0 17.2-7.7 17.2-17.2S59.5 14.3 50 14.3 32.8 22 32.8 31.5c0 0 0 0 0 0C32.8 41 40.5 48.7 50 48.7zM50 17.3c7.8 0 14.2 6.4 14.2 14.2S57.8 45.7 50 45.7s-14.2-6.4-14.2-14.2l0 0C35.8 23.7 42.2 17.3 50 17.3L50 17.3z"/><path d="M50 49.5c-14.6 0-26.5 11.9-26.5 26.5 0 0.8 0.7 1.5 1.5 1.5s1.5-0.7 1.5-1.5c0-8.7 4.9-16.7 12.6-20.8 1.9 3.4 5.2 5.7 9 6.5v4.6c0 3.4-0.1 9.7 3.7 13.5 2 1.9 4.7 3 7.5 3 0.7 2.4 3.2 3.7 5.6 3 2.4-0.7 3.7-3.2 3-5.6 -0.7-2.4-3.2-3.7-5.6-3 -1.3 0.4-2.3 1.3-2.8 2.6 -2 0-4-0.8-5.5-2.2 -2.9-2.9-2.9-8.1-2.8-11.3V62c0.3 0 0.6 0 0.9 0 4.1-0.4 7.9-2.6 10.1-6.1 7.1 4.2 11.4 11.8 11.4 20.1 0 0.8 0.7 1.5 1.5 1.5s1.5-0.7 1.5-1.5C76.5 61.4 64.6 49.5 50 49.5zM63.5 80c0.8 0 1.5 0.7 1.5 1.5S64.3 83 63.5 83c-0.8 0-1.4-0.6-1.5-1.3 0-0.1 0.1-0.3 0-0.4 0-0.1 0-0.1 0-0.2C62.2 80.5 62.8 80 63.5 80zM51.7 58.9c-4 0.3-7.8-1.6-9.8-5 5.7-2.1 12-1.9 17.5 0.5C57.6 57 54.8 58.6 51.7 58.9z"/><path d="M41 70c-0.6 0-1.2 0-1.8 0 0-0.7 0-1.3 0-1.9 0-0.8-0.6-1.5-1.4-1.5 0 0 0 0-0.1 0 -0.8 0-1.5 0.7-1.4 1.6 0 0 0 0 0 0 0 0.6 0 1.2 0 1.8h-1.8c-0.8 0-1.5 0.7-1.5 1.5s0.7 1.5 1.5 1.5c0.6 0 1.1 0 1.8 0 0 0.6 0 1.1 0 1.6 0 1.1 0.6 1.8 1.5 1.8s1.5-0.7 1.5-1.8c0-0.5 0-1.1 0-1.7h1c0.3 0 0.6 0 0.9 0 0.8 0 1.5-0.7 1.5-1.5C42.6 70.7 41.9 70 41 70 41 70 41 70 41 70z"/></svg>'
                    />
                    <Text>دندانپزشک هستم</Text>
                    <Icon name='ios-arrow-back' color='#fff' />
                  </Button>
                </Col>
                <Col size={1}></Col>
              </Row>
              <Row size={4}>
                <Col size={1}></Col>
                <Col size={5}>
                  <Button style={{ width: '100%', justifyContent: 'center', borderRadius: 25, backgroundColor: '#92cea5' }} onPress={() => this.setState({ mode: 'lab' })}>

                    <SvgUri
                      width='40'
                      height='40'
                      fill='#ffffff'
                      svgXmlData='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 125"><title>  Tavola disegno 27</title><path d="M51.1 50.1C60.2 50 69.5 56.5 73 66.2c0.9 2.5 1.4 5.2 1.5 7.9 0 1.3-0.2 1.6-1.3 2.1l-14.3 6.5c-2.1 0.9-4.1 1.9-6.2 2.8 -0.6 0.3-1.2 0.3-1.8 0.1C43 82.8 35 80 27.1 77.3c-1.4-0.5-1.5-0.7-1.6-2.2 -0.1-3.2 0.4-6.4 1.6-9.4 1.5-4 4.1-7.6 7.5-10.2C39.1 51.9 44.2 50.2 51.1 50.1zM49.1 81.8V61.7c-4-0.6-7-2.9-9.6-5.8 -6.9 3.8-11.1 11-11 18.8L49.1 81.8zM60.7 55.9c-2.2 3-4.8 5.2-8.5 5.8v20.7c0.3-0.1 0.5-0.2 0.7-0.3l17.6-8c1.2-0.6 1.2-0.6 1.1-1.9 -0.5-4.2-2.1-8.1-4.8-11.4C65 58.9 63 57.2 60.7 55.9zM42.2 54.5c1.2 1.3 2.5 2.4 4.1 3.3 4.3 2.3 8.8 0.9 11.6-3.2C52.9 52.6 47.3 52.5 42.2 54.5z"/><path d="M50 17.3c7.8 0 14.2 6.4 14.2 14.2S57.8 45.7 50 45.7c-7.8 0-14.2-6.3-14.2-14.2C35.8 23.7 42.2 17.3 50 17.3M50 14.3c-9.5 0-17.2 7.7-17.2 17.2 0 9.5 7.7 17.2 17.2 17.2 9.5 0 17.2-7.7 17.2-17.2C67.2 22 59.5 14.3 50 14.3 50 14.3 50 14.3 50 14.3z"/></svg>'
                    />
                    <Text >مسئول لابراتور هستم</Text>
                    <Icon name='ios-arrow-back' color='#fff' />
                  </Button>
                </Col>
                <Col size={1}></Col>

              </Row>
            </Grid>

          </Row>
        </Grid>


      )
    } else if (this.state.mode == 'dentist' && this.props.signupMode !== 'verify') {
      return (
        <KeyboardAwareScrollView>
          <Container style={styles.container}>
            <ProgressDialog
              visible={this.props.loading}
              title=""
              message="در حال بارگزاری ..."
            />
            <Row size={1} style={{ zIndex: 10 }}>
              <Col>
                <Button style={[(this.state.newDentist) ? { backgroundColor: '#7fbbd2' } : { backgroundColor: '#f4f4f4' }, { width: '100%', borderRadius: 0, justifyContent: 'center', height: 56 }]}
                  onPress={() => this.setState({ newDentist: true })}>
                  <Text style={[!(this.state.newDentist) ? { color: '#7fbbd2' } : { color: '#f4f4f4' }]}>ثبت نام</Text>
                </Button>
              </Col>
              <Col>
                <Button style={[!(this.state.newDentist) ? { backgroundColor: '#7fbbd2' } : { backgroundColor: '#f4f4f4' }, { width: '100%', borderRadius: 0, justifyContent: 'center', height: 56 }]}
                  onPress={() => this.setState({ newDentist: false })}>
                  <Text style={[!(this.state.newDentist) ? { color: '#f4f4f4' } : { color: '#7fbbd2' }]}>ورود</Text>
                </Button>
              </Col>
            </Row>
            <Row size={4}  >
              <Image style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height / 3 }} resizeMode="cover" source={require('../assets/img/png/image.png')} />
            </Row>
            {!this.state.newDentist ? <Row size={3}></Row> : null}
            {!this.state.newDentist ?

              <Row size={7}>
                <Col size={1}></Col>
                <Col size={4} style={{ justifyContent: 'center' }}>
                  <Item fixedLabel style={[styles.itemInput1]}>
                    <Label style={{ fontSize: 12 }}>شماره موبایل: </Label>
                    <Input keyboardType="number-pad" onChangeText={(text) => this.setState({ username: text })} />
                    <SvgUri width="15" height="50"
                      svgXmlData={auth_phone}
                    //  source={require('../assets/img/svg/phone.svg')}
                    />
                  </Item>
                  <Item fixedLabel style={[styles.itemInput1]}>
                    <Label style={{ fontSize: 12 }}>رمز عبور:</Label>
                    <Input secureTextEntry={true}
                      onChangeText={(text) => this.setState({ password: text })} />
                    <SvgUri width="20" height="40"
                      svgXmlData={auth_pass}
                    // source={require('../assets/img/svg/lock.svg')}
                    />

                  </Item>
                  <Row>
                    <Text style={{ fontSize: 10, color: '#696969' }}></Text>
                    <Text style={{ fontSize: 10, color: '#7fbbd2' }}
                      onPress={() => {
                        this.setState({ mode: 'retrieve' })

                      }}>رمز عبور خود را فراموش کرده اید؟</Text>
                  </Row>
                  <Button rounded block info style={[{ marginTop: 10, backgroundColor: '#7fbbd2' }]} onPress={() => this.loginDentist()}>
                    <Text>ورود</Text>
                    <Icon name="ios-arrow-back" />
                  </Button>
                  <Row></Row>
                </Col>
                <Col size={1}></Col>

              </Row>
              :
              <Row size={8} style={{ marginTop: 30 }}>
                <Col size={1}></Col>
                <Col size={4} >
                  <Item fixedLabel style={[styles.itemInput1]}>
                    <Label style={{ fontSize: 12 }}>نام: </Label>
                    <Input onChangeText={(text) => this.setState({ firstName: text })} />
                    <SvgUri width="20" height="20"
                      svgXmlData={auth_name}
                    />
                  </Item>
                  <Item fixedLabel style={[styles.itemInput1]} >
                    <Label style={{ fontSize: 12 }}>نام خانوادگی: </Label>
                    <Input onChangeText={(text) => this.setState({ lastName: text })} />
                    <SvgUri width="20" height="20"
                      svgXmlData={auth_name}
                    />
                  </Item>
                  <Item fixedLabel style={[styles.itemInput1]}>
                    <Label style={{ fontSize: 12 }}>شماره موبایل: </Label>
                    <Input keyboardType="number-pad" onChangeText={(text) => this.setState({ username: text })} />
                    <SvgUri width="20" height="40"
                      svgXmlData={auth_phone}
                    />
                  </Item>
                  <Item fixedLabel style={[styles.itemInput1]}>
                    <Label style={{ fontSize: 12 }}>رمز عبور:</Label>
                    <Input secureTextEntry={true}
                      onChangeText={(text) => this.setState({ password: text })} />
                    <SvgUri width="20" height="40"
                      svgXmlData={auth_pass}
                    />
                  </Item>
                  <Item fixedLabel style={[styles.itemInput1]}>
                    <Label style={{ fontSize: 12 }}>تکرار رمزعبور: </Label>
                    <Input secureTextEntry={true} onChangeText={(text) => this.setState({ passwordConfirmation: text })} />
                    <SvgUri width="20" height="40"
                      svgXmlData={auth_pass}
                    />
                  </Item>
                  <Button rounded block info style={[{ marginTop: 20, zIndex: 1, backgroundColor: '#7fbbd2' }]} onPress={() => this.signupDentist()}>
                    <Text>ثبت نام</Text>
                  </Button>
                </Col>
                <Col size={1}></Col>

              </Row>
            }
            <Content contentContainerStyle={{ flex: 1 }}>
            </Content>
            <Fab position="bottomRight"
              style={{ backgroundColor: '#7fbbd2' }}
              onPress={() => this.setState({ mode: 'selectType' })}>
              <Icon name='ios-arrow-back-outline' />
            </Fab>
          </Container>
        </KeyboardAwareScrollView>


      )
    } else if (this.state.mode == 'dentist' && this.props.signupMode == 'verify') {
      return (
        <KeyboardAwareScrollView>
          <Container style={styles.container}>
            <ProgressDialog
              visible={this.props.loading}
              title=""
              message="در حال بارگزاری ..."
            />
            {/* <HeaderComponent /> */}
            <Row size={1}>
              <Image style={{ width: '100%' }} source={require('../assets/img/png/image.png')} />
            </Row>

            <Content>
              <Grid >
                <Row size={1}>

                </Row>
                <Row size={3}>
                  <Col size={1}></Col>
                  <Col size={3} >
                    <Item fixedLabel style={[styles.itemInput1]}>
                      <Label style={{ fontSize: 12 }}>کد فعال سازی: </Label>
                      <Input keyboardType="number-pad" onChangeText={(text) => this.setState({ code: text })} />
                      <SvgUri width="20" height="20"

                        svgXmlData={auth_pass}
                      />
                    </Item>

                    <Button rounded block info style={[{ marginTop: 10, zIndex: 1 }]} onPress={() => this.confirmDentist()}>
                      <Text>فعال سازی</Text>
                    </Button>
                  </Col>
                  <Col size={1}></Col>
                </Row>
              </Grid>
            </Content>
            <Fab position="bottomRight"
              style={{ backgroundColor: '#7EDAD1' }}
              onPress={() => this.setState({ mode: 'selectType' })}>
              <Icon name='ios-arrow-back-outline' />
            </Fab>
          </Container>
        </KeyboardAwareScrollView>
      );

    } else if (this.state.mode == 'lab' && this.props.signupMode == 'verify') {

      return (
        <KeyboardAwareScrollView>
          <Container style={styles.container}>
            <ProgressDialog
              visible={this.props.loading}
              title=""
              message="در حال بارگزاری ..."
            />
            {/* <HeaderComponent /> */}
            <Row size={1}>
              <Image style={{ width: '100%' }} source={require('../assets/img/png/image.png')} />
            </Row>

            <Content>
              <Grid >
                <Row size={1}>

                </Row>
                <Row size={3}>
                  <Col size={1}></Col>
                  <Col size={3} >
                    <Item fixedLabel style={[styles.itemInput1]}>
                      <Label style={{ fontSize: 12 }}>کد فعال سازی: </Label>
                      <Input keyboardType="number-pad" onChangeText={(text) => this.setState({ code: text })} />
                      <SvgUri width="20" height="20"
                        svgXmlData={auth_pass}
                      // source={require('../assets/img/svg/tooth-color.svg')}
                      />
                    </Item>

                    <Button rounded block info style={[{ marginTop: 10, zIndex: 1 }]} onPress={() => this.confirmLab()}>
                      <Text>فعال سازی</Text>
                    </Button>
                  </Col>
                  <Col size={1}></Col>
                </Row>
              </Grid>
            </Content>
            <Fab position="bottomRight"
              style={{ backgroundColor: '#7EDAD1' }}
              onPress={() => this.setState({ mode: 'selectType' })}>
              <Icon name='ios-arrow-back-outline' />
            </Fab>
          </Container>
        </KeyboardAwareScrollView>
      );
    } else if (this.state.mode == 'lab' && this.props.signupMode != 'verify') {

      return (
        // <ScrollView >

        <KeyboardAwareScrollView>
          <Container style={styles.container}>
            <ProgressDialog
              visible={this.props.loading}
              title=""
              message="در حال بارگزاری ..."
            />
            <Row size={1} style={{ zIndex: 10 }}>
              <Col>
                <Button style={[(this.state.newLab) ? { backgroundColor: '#7EDAD1' } : { backgroundColor: '#f4f4f4' }, { width: '100%', borderRadius: 0, justifyContent: 'center', height: 56 }]}
                  onPress={() => this.setState({ newLab: true })}>
                  <Text style={[(!this.state.newLab) ? { color: '#7EDAD1' } : { color: '#f4f4f4' }]}>ثبت نام</Text>
                </Button>
              </Col>
              <Col>
                <Button style={[(!this.state.newLab) ? { backgroundColor: '#7EDAD1' } : { backgroundColor: '#f4f4f4' }, { width: '100%', borderRadius: 0, justifyContent: 'center', height: 56 }]}
                  onPress={() => this.setState({ newLab: false })}>
                  <Text style={[(!this.state.newLab) ? { color: '#f4f4f4' } : { color: '#7EDAD1' }]}>ورود</Text>
                </Button>
              </Col>
            </Row>
            <Row size={3}  >
              <Image style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height / 3 }} resizeMode="cover" source={require('../assets/img/png/image.png')} />
            </Row>
            {!this.state.newLab ? <Row size={3}></Row> : null}
            {!this.state.newLab ?
              <Row size={7}  >
                <Col size={1}></Col>
                <Col size={4} style={{ justifyContent: 'center' }}>
                  <Item fixedLabel style={[styles.itemInput1]}>
                    <Label style={{ fontSize: 12 }}>شماره موبایل: </Label>
                    <Input keyboardType="number-pad" onChangeText={(text) => this.setState({ username: text })} />
                    <SvgUri width="15" height="50"
                      svgXmlData={auth_phone}
                    //  source={require('../assets/img/svg/phone.svg')}
                    />
                  </Item>
                  <Item fixedLabel style={[styles.itemInput1]}>
                    <Label style={{ fontSize: 12 }}>رمز عبور:</Label>
                    <Input secureTextEntry={true}
                      onChangeText={(text) => this.setState({ password: text })} />
                    <SvgUri width="20" height="40"
                      svgXmlData={auth_pass}
                    // source={require('../assets/img/svg/lock.svg')}
                    />
                  </Item>

                  <Row>
                    <Text style={{ fontSize: 10, color: '#696969' }}>رمز عبور خود را فراموش کرده ام</Text>
                    <Text style={{ fontSize: 10, color: '#7fbbd2' }}
                      onPress={() => {
                        this.setState({ mode: 'retrieve' })

                      }}>(بازیابی رمز عبور)</Text>
                  </Row>

                  <Button rounded block info style={[{ marginTop: 10, backgroundColor: '#7EDAD1' }]} onPress={() => {
                    this.loginLab()
                  }}>
                    <Text>ورود</Text>
                    <Icon name="ios-arrow-back" />
                  </Button>
                  <Row></Row>
                </Col>
                <Col size={1}></Col>

              </Row>
              :
              <Row size={8}>
                <Row>
                  <Col size={1}></Col>
                  <Col size={4} >
                    <Item fixedLabel style={[styles.itemInput1]}>
                      <Label style={{ fontSize: 12 }}>نام: </Label>
                      <Input onChangeText={(text) => this.setState({ firstName: text })} />
                      <SvgUri width="20" height="20"
                        svgXmlData={auth_name}
                      />
                    </Item>
                    <Item fixedLabel style={[styles.itemInput1]} >
                      <Label style={{ fontSize: 12 }}>نام خانوادگی: </Label>
                      <Input onChangeText={(text) => this.setState({ labName: text })} />
                      <SvgUri width="20" height="20"
                        svgXmlData={auth_name}
                      />
                    </Item>
                    <Item fixedLabel style={[styles.itemInput1]} >
                      <Label style={{ fontSize: 12 }}>نام لابراتوار: </Label>
                      <Input onChangeText={(text) => this.setState({ lastName: text })} />
                      <SvgUri width="20" height="20"
                        svgXmlData={auth_name}
                      />
                    </Item>
                    <Item fixedLabel style={[styles.itemInput1]}>
                      <Label style={{ fontSize: 12 }}>شماره موبایل: </Label>
                      <Input keyboardType="number-pad" onChangeText={(text) => this.setState({ username: text })} />
                      <SvgUri width="20" height="40"
                        svgXmlData={auth_phone}
                      />
                    </Item>
                    <Item fixedLabel style={[styles.itemInput1]}>
                      <Label style={{ fontSize: 12 }}>رمز عبور:</Label>
                      <Input secureTextEntry={true}
                        onChangeText={(text) => this.setState({ password: text })} />
                      <SvgUri width="20" height="40"
                        svgXmlData={auth_pass}
                      />
                    </Item>
                    <Item fixedLabel style={[styles.itemInput1]}>
                      <Label style={{ fontSize: 12 }}>تکرار رمزعبور: </Label>
                      <Input secureTextEntry={true} onChangeText={(text) => this.setState({ passwordConfirmation: text })} />
                      <SvgUri width="20" height="40"
                        svgXmlData={auth_pass}
                      />
                    </Item>
                    <Button rounded block info style={[{ marginTop: 20, zIndex: 1, backgroundColor: '#7EDAD1' }]} onPress={() =>
                      this.signupLab()}>
                      <Text>ثبت نام</Text>
                      <Icon name='ios-arrow-back' />
                    </Button>
                  </Col>
                  <Col size={1}></Col>
                </Row>


              </Row>
            }
            <Fab position="bottomRight"
              style={{ backgroundColor: '#7EDAD1' }}
              onPress={() => this.setState({ mode: 'selectType' })}>
              <Icon name='ios-arrow-back-outline' />
            </Fab>
          </Container>
        </KeyboardAwareScrollView>
        // </ScrollView>
      )

    } else if (this.state.mode == 'retrieve') {

      return (
        <KeyboardAwareScrollView>
          <Container style={styles.container}>
            <Row   >
              <Image style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height / 3 }} resizeMode="cover" source={require('../assets/img/png/image.png')} />
            </Row>

            <Row size={4}></Row>
            <Row size={7}>
              <Col size={1}></Col>
              <Col size={4} style={{ justifyContent: 'center' }}>

                <Item fixedLabel style={[styles.itemInput1]}>
                  <Label style={{ fontSize: 12 }}>شماره موبایل : </Label>
                  <Input onChangeText={(text) => this.setState({ username: text })} />
                  <SvgUri width="20" height="40"
                    svgXmlData={auth_phone}

                  />

                </Item>
                <Button rounded block info style={[{ marginTop: 10, backgroundColor: '#7fbbd2' }]} onPress={() => this.forgetPass()}>
                  <Text>بازیابی رمز</Text>
                  <Icon name='ios-arrow-back' />
                </Button>
              </Col>
              <Col size={1}></Col>

            </Row>
            <Row size={2}></Row>

            <Fab position="bottomRight"
              style={{ backgroundColor: '#7EDAD1' }}
              onPress={() => this.setState({ mode: 'selectType' })}>
              <Icon name='ios-arrow-back-outline' />
            </Fab>

          </Container>
        </KeyboardAwareScrollView>

      );
    } else if (this.state.mode == 'changePass') {
      return (
        <KeyboardAwareScrollView>
          <Container style={styles.container}>
            <Row   >
              <Image style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height / 3 }} resizeMode="cover" source={require('../assets/img/png/image.png')} />
            </Row>

            <Row size={4}></Row>
            <Row size={7}>
              <Col size={1}></Col>
              <Col size={4} style={{ justifyContent: 'center' }}>

                <Item fixedLabel style={[styles.itemInput1]}>
                  <Label style={{ fontSize: 12 }}>شماره موبایل : </Label>
                  <Input value={this.state.username} disabled
                    onChangeText={(text) => this.setState({ username: text })} />
                  <SvgUri width="20" height="40"
                    svgXmlData={auth_phone} />
                </Item>
                <Item fixedLabel style={[styles.itemInput1]}>
                  <Label style={{ fontSize: 12 }}>کد فعال سازی : </Label>
                  <Input
                    onChangeText={(text) => this.setState({ code: text })} />
                  <SvgUri width="20" height="40"
                    svgXmlData={auth_fax} />
                </Item>
                <Item fixedLabel style={[styles.itemInput1]}>
                  <Label style={{ fontSize: 12 }}>رمز جدید : </Label>
                  <Input secureTextEntry={true}
                    onChangeText={(text) => this.setState({ newPass: text })}/>
                  <SvgUri width="20" height="40"
                    svgXmlData={auth_pass} />
                </Item>
                <Item fixedLabel style={[styles.itemInput1]}>
                  <Label style={{ fontSize: 12 }}>تکرار رمز : </Label>
                  <Input secureTextEntry={true}
                    onChangeText={(text) => this.setState({ passwordConfirmation: text })} secureTextEntry={true} />
                  <SvgUri width="20" height="40"
                    svgXmlData={auth_pass} />
                </Item>
                <Button rounded block info style={[{ marginTop: 10, backgroundColor: '#7fbbd2' }]} onPress={() => this.setNewPassword()}>
                  <Text>بازیابی رمز</Text>
                  <Icon name='ios-arrow-back' />
                </Button>
              </Col>
              <Col size={1}></Col>

            </Row>
            <Row size={2}></Row>

            <Fab position="bottomRight"
              style={{ backgroundColor: '#7EDAD1' }}
              onPress={() => this.setState({ mode: 'selectType' })}>
              <Icon name='ios-arrow-back-outline' />
            </Fab>

          </Container>
        </KeyboardAwareScrollView>

      );
    }
  }
}
function mapStateToProps(state, props) {
  return {
    loading: state.UserReducer.loading,
    loggedIn: state.UserReducer.loggedIn,
    signupMode: state.UserReducer.signupMode,
    userType: state.UserReducer.userType,
    token: state.UserReducer.token,
    refreshToken: state.UserReducer.refreshToken,
    mobileNumber: state.UserReducer.mobileNumber,
    verificationToken: state.UserReducer.verificationToken,

  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    login,
    signup,
    verify,
    checkLogin,
    showLoading,
    setDrawerItems,
    setNewPass,
    forgetPass
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f4f4f4'
  },
  colContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5
  },

  buttonActive: {
    backgroundColor: 'orange',
    margin: 1,
    width: 25,
    height: 25,
    // borderWidth: 0.5,
    // borderColor: 'red',
    justifyContent: 'center',
    alignContent: 'center'
  },
  buttonInactive: {
    backgroundColor: 'cyan',
    margin: 1,
    width: 25,
    height: 25,
    padding: 0,
    // borderWidth: 0.5,
    // borderColor: 'red',
    justifyContent: 'center',
    // alignItems: 'center'
  },
  buttonText: {
    padding: 0,
    paddingHorizontal: 0,
    borderWidth: 0.5,
    borderColor: 'red',
    fontSize: 10,
    zIndex: 1,
    height: 40,
    width: 40,

    textAlign: 'center',
    textAlignVertical: 'center'
  },
  itemInput1: {
    marginTop: 5,
    borderRadius: 10

  }
});
