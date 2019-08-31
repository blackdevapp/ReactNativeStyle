import React, { PureComponent } from 'react';
import { StyleSheet, Image, Dimensions, Modal, ScrollView, ImageBackground, BackHandler } from 'react-native';
import { Row, Grid, Col } from 'react-native-easy-grid'
import { Container, View, Button, Card, CardItem, Item, Input, Icon, Text, Fab, Label, Textarea } from 'native-base';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import HeaderComponent from '../../../Components/Header.component'
import Accordion from '../../../Components/Accordeon.component'
import { dentistProfile } from '../../../Redux/Actions/User.Action'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { drawerOpener, drawerCloser } from '../../../Redux/Actions/Global.Actions'; //Import your actions
import { DrawerActions } from 'react-navigation';

import SvgUri from 'react-native-svg-uri'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import EditProfile from './EditProfile'

import { RNCamera } from 'react-native-camera';
class ProfileScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.props.dentistProfile()
    this.state = {
      mode: 'profile',
      openCamera: false,
      uri: '',
      cametaType: RNCamera.Constants.Type.back,
      address: [{ id: 0, value: 'a' }, { id: 1, value: 'b' }],
    };
  }

  componentDidUpdate() {
    if (this.props.drawerOpen) {
      this.props.navigation.dispatch(DrawerActions.openDrawer());
      this.props.drawerCloser();
    }
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }
  handleBackPress = () => {
    this.props.navigation.navigate('dentist')
    return true;
  }

  deleteItem(index) {

    const { address } = this.state;
    // alert(JSON.stringify(address))

    this.setState({
      address:

        address.filter(function (item) {

          return item.id !== index
        })
    })
    // alert(JSON.stringify(this.state.address))
    // alert(JSON.stringify(address))
  }
  renderImage() {
    console.log(1);
    console.log(this.props.profile)
    if (this.props.profile.user.profilePic) {
      return { uri: `http://89.32.249.208:8090${this.props.profile.user.profilePic.profilePicUrl}?date=${new Date().getTime()}` }
    } else {
      return require('./../../../assets/img/png/user.png')
    }

  }
  renderPage() {

    if (this.state.mode === 'profile') {
      return (
        <Container>
          {/* <HeaderComponent title="پروفایل من" /> */}

          <ParallaxScrollView
            headerBackgroundColor="white"
            stickyHeaderHeight={STICKY_HEADER_HEIGHT}
            parallaxHeaderHeight={PARALLAX_HEADER_HEIGHT}
            backgroundSpeed={10}
            backgroundColor='#f4f4f4'
            renderBackground={() => (
              <View key="background" style={{ backgroundColor: '#f4f4f4' }}>
                <ImageBackground style={{
                  width: '100%', zIndex: 1,
                  height: PARALLAX_HEADER_HEIGHT,
                  backgroundColor: '#f4f4f4'
                }} resizeMode="cover"
                  source={require('../../../assets/img/png/profileBack3.png')}>
                  <View style={{
                    position: 'absolute',
                    top: 0,
                    height: PARALLAX_HEADER_HEIGHT, backgroundColor: '#f4f4f4'
                  }} />
                </ImageBackground>
              </View>
            )}
            renderForeground={() => (
              <View key="parallax-header" style={styles1.parallaxHeader}>
              {this.props.profile.user.profilePic?<Image style={styles1.avatar} source={{ uri: `http://89.32.249.208:8090${this.props.profile.user.profilePic.profilePicUrl}?date=${new Date().getTime()}` }}
                  style={{
                    height: Dimensions.get('screen').height / 8
                            , width: Dimensions.get('screen').height / 8,
                            borderRadius: Dimensions.get('screen').height / 16,
                            justifyContent: 'center', borderWidth: 2, borderColor: '#80bcd3', alignSelf: 'center'
                  }} />:<Image style={styles1.avatar} source={{
                    uri: `https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg`,
                    width: AVATAR_SIZE,
                    height: AVATAR_SIZE
                }} />}
                {/* <Image style={styles1.avatar} source={{ uri: `http://89.32.249.208:8090${this.props.profile.user.profilePic.profilePicUrl}?date=${new Date().getTime()}` }}
                  style={{
                    height: Dimensions.get('screen').height / 8
                            , width: Dimensions.get('screen').height / 8,
                            borderRadius: Dimensions.get('screen').height / 16,
                            justifyContent: 'center', borderWidth: 2, borderColor: '#80bcd3', alignSelf: 'center'
                  }} /> */}
              </View>
            )}

            renderStickyHeader={() => (
              <HeaderComponent title="پروفایل من" />
              // <View key="sticky-header" style={{ backgroundColor: '#7fbbd2', height: 56 }}>
              //   <Text style={styles1.stickySectionText}>پروفایل من </Text>
              // </View>
            )}

            renderFixedHeader={() => (
              <View key="fixed-header" style={styles1.fixedSection}>

              </View>
            )}>
            <View style={{ marginTop: 20, backgroundColor: '#f4f4f4' }}>
              <View>

                <Row style={{ flex: 0, marginTop: 20 }}>
                  <Col size={2} style={{ flex: 1, justifyContent: 'center' }}>
                    <View style={{ borderBottomColor: '#d9d9d9', borderBottomWidth: 0.5 }} />
                  </Col>
                  <Col size={3} style={{ flex: 1, justifyContent: 'center' }}>
                    <Text style={{ fontSize: 11, textAlign: 'center', alignSelf: 'center' }}>
                      دکتر {this.props.profile.user.firstname} {this.props.profile.user.lastname}

                    </Text>
                  </Col>
                  <Col size={2} style={{ flex: 1, justifyContent: 'center' }}>
                    <View style={{ borderBottomColor: '#d9d9d9', borderBottomWidth: 0.5 }} />
                  </Col>
                </Row>
                <Row>
                  <Col style={{ alignItems: 'center' }}>
                    <Text style={{ fontWeight: '400', fontSize: 15 }}>{this.props.profile.user.expertise}</Text>
                  </Col>
                </Row>

                <Row>
                  <Col style={{ alignItems: 'center' }}>
                    <Card noShadow style={{ backgroundColor: 'white', width: 55, height: 55, borderRadius: 27, alignItems: 'center', justifyContent: 'center' }}>
                      <SvgUri
                        style={{ justifyContent: 'center', alignSelf: 'center' }}
                        width="25"
                        height="30"
                        svgXmlData='<?xml version="1.0" encoding="iso-8859-1"?><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><g><g><path d="M490.626,153.442c-13.697-31.292-33.236-59.158-58.073-82.819c-3.207-3.055-8.28-2.933-11.335,0.275 c-3.054,3.206-2.931,8.28,0.275,11.333c48.024,45.751,74.473,107.464,74.473,173.769c0,132.318-107.648,239.967-239.967,239.967 S16.033,388.318,16.033,256S123.682,16.033,256,16.033c48.336,0,94.93,14.306,134.742,41.369 c3.661,2.489,8.647,1.538,11.137-2.122c2.489-3.662,1.538-8.648-2.123-11.137C357.274,15.265,307.565,0,256,0 C187.62,0,123.333,26.628,74.981,74.981C26.629,123.333,0,187.62,0,256s26.629,132.667,74.981,181.019 C123.333,485.372,187.62,512,256,512s132.667-26.628,181.019-74.981C485.371,388.667,512,324.38,512,256 C512,220.348,504.808,185.842,490.626,153.442z"/></g></g><g><g><path d="M372.333,108.552l-154.176,71.771c-4.014,1.868-5.753,6.638-3.884,10.652s6.638,5.755,10.65,3.885l95.106-44.274 l-46.237,37.431l-106.107,85.896l-58.036-25.392l81.326-37.858c4.014-1.87,5.753-6.638,3.884-10.652 c-1.868-4.014-6.639-5.755-10.65-3.885l-87.54,40.752c-4.654,2.166-7.592,6.905-7.474,12.035c0.115,5.02,3.149,9.538,7.748,11.55 l64.802,28.35l18.979,113.873c1.168,7.041,10.702,9.046,14.613,3.075l53.836-82.171l101.811,47.512 c8.157,3.81,17.864-2.012,18.39-10.966l14.344-243.849c0.015-0.226,0.014-0.458,0.009-0.685 C383.567,109.927,377.471,106.176,372.333,108.552z M190.018,360.931l-12.404-74.428l126.369-102.299l-96.718,108.441 c-0.87,0.976-1.516,2.204-1.816,3.479L190.018,360.931z M207.049,358.631l11.72-49.228l15.724,7.338L207.049,358.631z  M243.371,303.191l-16.967-7.917l83.469-93.586L297.8,220.116L243.371,303.191z M353.637,354.649l-95.586-44.607l107.897-164.684 L353.637,354.649z"/></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>'
                        fill='#000000'
                      />
                    </Card>
                  </Col>
                  <Col style={{ alignItems: 'center' }}>
                    <Card noShadow style={{ backgroundColor: 'white', width: 55, height: 55, borderRadius: 27, alignItems: 'center', justifyContent: 'center' }}>
                      <SvgUri
                        style={{ justifyContent: 'center', alignSelf: 'center' }}
                        width="25"
                        height="30"
                        svgXmlData='<?xml version="1.0" encoding="iso-8859-1"?><svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"viewBox="0 0 52 52" style="enable-background:new 0 0 52 52;" xml:space="preserve"><g><g><path d="M26,0C11.663,0,0,11.663,0,26c0,4.891,1.359,9.639,3.937,13.762C2.91,43.36,1.055,50.166,1.035,50.237c-0.096,0.352,0.007,0.728,0.27,0.981c0.263,0.253,0.643,0.343,0.989,0.237L12.6,48.285C16.637,50.717,21.26,52,26,52c14.337,0,26-11.663,26-26S40.337,0,26,0z M26,50c-4.519,0-8.921-1.263-12.731-3.651c-0.161-0.101-0.346-0.152-0.531-0.152c-0.099,0-0.198,0.015-0.294,0.044l-8.999,2.77c0.661-2.413,1.849-6.729,2.538-9.13c0.08-0.278,0.035-0.578-0.122-0.821C3.335,35.173,2,30.657,2,26C2,12.767,12.767,2,26,2s24,10.767,24,24S39.233,50,26,50z"/><path d="M42.985,32.126c-1.846-1.025-3.418-2.053-4.565-2.803c-0.876-0.572-1.509-0.985-1.973-1.218c-1.297-0.647-2.28-0.19-2.654,0.188c-0.047,0.047-0.089,0.098-0.125,0.152c-1.347,2.021-3.106,3.954-3.621,4.058c-0.595-0.093-3.38-1.676-6.148-3.981c-2.826-2.355-4.604-4.61-4.865-6.146C20.847,20.51,21.5,19.336,21.5,18c0-1.377-3.212-7.126-3.793-7.707c-0.583-0.582-1.896-0.673-3.903-0.273c-0.193,0.039-0.371,0.134-0.511,0.273c-0.243,0.243-5.929,6.04-3.227,13.066c2.966,7.711,10.579,16.674,20.285,18.13c1.103,0.165,2.137,0.247,3.105,0.247c5.71,0,9.08-2.873,10.029-8.572C43.556,32.747,43.355,32.331,42.985,32.126z M30.648,39.511c-10.264-1.539-16.729-11.708-18.715-16.87c-1.97-5.12,1.663-9.685,2.575-10.717c0.742-0.126,1.523-0.179,1.849-0.128c0.681,0.947,3.039,5.402,3.143,6.204c0,0.525-0.171,1.256-2.207,3.293C17.105,21.48,17,21.734,17,22c0,5.236,11.044,12.5,13,12.5c1.701,0,3.919-2.859,5.182-4.722c0.073,0.003,0.196,0.028,0.371,0.116c0.36,0.181,0.984,0.588,1.773,1.104c1.042,0.681,2.426,1.585,4.06,2.522C40.644,37.09,38.57,40.701,30.648,39.511z"/></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>'
                        fill='#000000'
                      />
                    </Card>
                  </Col>
                  <Col style={{ alignItems: 'center' }}>
                    <Card noShadow style={{ backgroundColor: 'white', width: 55, height: 55, borderRadius: 27, alignItems: 'center', justifyContent: 'center' }}>
                      <SvgUri
                        style={{ justifyContent: 'center', alignSelf: 'center' }}
                        width="25"
                        height="30"
                        svgXmlData='<svg viewBox="0 0 512.00096 512.00096" xmlns="http://www.w3.org/2000/svg"><path d="m373.40625 0h-234.8125c-76.421875 0-138.59375 62.171875-138.59375 138.59375v234.816406c0 76.417969 62.171875 138.589844 138.59375 138.589844h234.816406c76.417969 0 138.589844-62.171875 138.589844-138.589844v-234.816406c0-76.421875-62.171875-138.59375-138.59375-138.59375zm108.578125 373.410156c0 59.867188-48.707031 108.574219-108.578125 108.574219h-234.8125c-59.871094 0-108.578125-48.707031-108.578125-108.574219v-234.816406c0-59.871094 48.707031-108.578125 108.578125-108.578125h234.816406c59.867188 0 108.574219 48.707031 108.574219 108.578125zm0 0"/><path d="m256 116.003906c-77.195312 0-139.996094 62.800782-139.996094 139.996094s62.800782 139.996094 139.996094 139.996094 139.996094-62.800782 139.996094-139.996094-62.800782-139.996094-139.996094-139.996094zm0 249.976563c-60.640625 0-109.980469-49.335938-109.980469-109.980469 0-60.640625 49.339844-109.980469 109.980469-109.980469 60.644531 0 109.980469 49.339844 109.980469 109.980469 0 60.644531-49.335938 109.980469-109.980469 109.980469zm0 0"/><path d="m399.34375 66.285156c-22.8125 0-41.367188 18.558594-41.367188 41.367188 0 22.8125 18.554688 41.371094 41.367188 41.371094s41.371094-18.558594 41.371094-41.371094-18.558594-41.367188-41.371094-41.367188zm0 52.71875c-6.257812 0-11.351562-5.09375-11.351562-11.351562 0-6.261719 5.09375-11.351563 11.351562-11.351563 6.261719 0 11.355469 5.089844 11.355469 11.351563 0 6.257812-5.09375 11.351562-11.355469 11.351562zm0 0"/></svg>'
                        fill='#000000'
                      />
                    </Card>
                  </Col>
                  <Col style={{ alignItems: 'center' }}>
                    <Card noShadow style={{ backgroundColor: 'white', width: 55, height: 55, borderRadius: 27, alignItems: 'center', justifyContent: 'center' }}>
                      <SvgUri
                        style={{ justifyContent: 'center', alignSelf: 'center' }}
                        width="25"
                        height="30"
                        svgXmlData='<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19.08 18.84"><defs><style>.cls-1{fill:#6b6b6b;}</style></defs><title>phone</title><path class="cls-1" d="M14.1,15.6l.7-.7.8-.8a2,2,0,0,1,2.9,0l2.4,2.4a1.89,1.89,0,0,1,0,2.9,5.55,5.55,0,0,1-.8.6c-.1.1-.2.1-.3.2-.3.2-.5.3-.8.5s-.3.2-.4.2a4.55,4.55,0,0,1-3.6.3,1.69,1.69,0,0,1-.5-.2c-.4-.2-.9-.4-1.4-.6a21.34,21.34,0,0,1-4.2-2.7,19.2,19.2,0,0,1-1.5-1.4A6.89,6.89,0,0,1,6.3,15a19.69,19.69,0,0,1-2.8-4.5,5.34,5.34,0,0,1-.6-1.4,3.93,3.93,0,0,1-.2-.6,4.2,4.2,0,0,1,.5-3.6c0-.1.1-.2.2-.3s.3-.5.5-.7a.22.22,0,0,1,.2-.2c.2-.2.3-.4.5-.5a2.05,2.05,0,0,1,2.9,0A24.73,24.73,0,0,0,9.8,5.5a1.89,1.89,0,0,1,0,2.9,5.06,5.06,0,0,1-.8.9,1.7,1.7,0,0,0-.6.6l-.2.2c.1.1.1.4.3.6a11.94,11.94,0,0,0,.8,1.6,7.55,7.55,0,0,0,1.1,1.4,6.23,6.23,0,0,0,1.2.9,5.56,5.56,0,0,0,1.7.9,4.88,4.88,0,0,1,.7.3C13.9,15.9,13.9,15.8,14.1,15.6Zm-6-5.5Zm12,7.2-2.4-2.4a.94.94,0,0,0-1.5,0l-.8.8-.7.7-.3.3a1.16,1.16,0,0,1-1,.2,5.9,5.9,0,0,1-.8-.4,16.18,16.18,0,0,1-1.8-1,6.89,6.89,0,0,1-1.3-1.1,9.83,9.83,0,0,1-1.2-1.5c-.3-.5-.6-1.1-.9-1.7a1.6,1.6,0,0,1-.3-.8,1.23,1.23,0,0,1,.2-1l.3-.3.6-.6a4.55,4.55,0,0,0,.9-.7.94.94,0,0,0,0-1.5C8.5,5.7,7,4.2,6.7,3.8a.94.94,0,0,0-1.5,0c-.1.1-.2.3-.4.5,0,.1-.1.1-.1.2a1.79,1.79,0,0,0-.5.7c-.1.1-.2.2-.2.3a3.9,3.9,0,0,0-.4,2.8,1.69,1.69,0,0,0,.2.5c.2.4.3.8.6,1.4A19.72,19.72,0,0,0,7,14.5a12,12,0,0,0,1.1,1.2A8.64,8.64,0,0,0,9.5,17a19.52,19.52,0,0,0,4,2.6c.5.2.9.4,1.3.6.2.1.4.1.5.2a3.86,3.86,0,0,0,2.8-.2c.1,0,.2-.1.3-.2a3.51,3.51,0,0,0,.8-.5c.1-.1.2-.1.3-.2a6.82,6.82,0,0,0,.7-.5A1,1,0,0,0,20.1,17.3Z" transform="translate(-2.5 -2.6)"/></svg>'
                        fill='#000000'
                      />
                    </Card>
                  </Col>
                  <Col style={{ alignItems: 'center' }}>
                    <Card noShadow style={{ backgroundColor: 'white', width: 55, height: 55, borderRadius: 27, alignItems: 'center', justifyContent: 'center' }}>
                      <SvgUri
                        style={{ justifyContent: 'center', alignSelf: 'center' }}
                        width="25"
                        height="30"
                        svgXmlData='<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19.08 18.84"><defs><style>.cls-1{fill:#6b6b6b;}</style></defs><title>phone</title><path class="cls-1" d="M14.1,15.6l.7-.7.8-.8a2,2,0,0,1,2.9,0l2.4,2.4a1.89,1.89,0,0,1,0,2.9,5.55,5.55,0,0,1-.8.6c-.1.1-.2.1-.3.2-.3.2-.5.3-.8.5s-.3.2-.4.2a4.55,4.55,0,0,1-3.6.3,1.69,1.69,0,0,1-.5-.2c-.4-.2-.9-.4-1.4-.6a21.34,21.34,0,0,1-4.2-2.7,19.2,19.2,0,0,1-1.5-1.4A6.89,6.89,0,0,1,6.3,15a19.69,19.69,0,0,1-2.8-4.5,5.34,5.34,0,0,1-.6-1.4,3.93,3.93,0,0,1-.2-.6,4.2,4.2,0,0,1,.5-3.6c0-.1.1-.2.2-.3s.3-.5.5-.7a.22.22,0,0,1,.2-.2c.2-.2.3-.4.5-.5a2.05,2.05,0,0,1,2.9,0A24.73,24.73,0,0,0,9.8,5.5a1.89,1.89,0,0,1,0,2.9,5.06,5.06,0,0,1-.8.9,1.7,1.7,0,0,0-.6.6l-.2.2c.1.1.1.4.3.6a11.94,11.94,0,0,0,.8,1.6,7.55,7.55,0,0,0,1.1,1.4,6.23,6.23,0,0,0,1.2.9,5.56,5.56,0,0,0,1.7.9,4.88,4.88,0,0,1,.7.3C13.9,15.9,13.9,15.8,14.1,15.6Zm-6-5.5Zm12,7.2-2.4-2.4a.94.94,0,0,0-1.5,0l-.8.8-.7.7-.3.3a1.16,1.16,0,0,1-1,.2,5.9,5.9,0,0,1-.8-.4,16.18,16.18,0,0,1-1.8-1,6.89,6.89,0,0,1-1.3-1.1,9.83,9.83,0,0,1-1.2-1.5c-.3-.5-.6-1.1-.9-1.7a1.6,1.6,0,0,1-.3-.8,1.23,1.23,0,0,1,.2-1l.3-.3.6-.6a4.55,4.55,0,0,0,.9-.7.94.94,0,0,0,0-1.5C8.5,5.7,7,4.2,6.7,3.8a.94.94,0,0,0-1.5,0c-.1.1-.2.3-.4.5,0,.1-.1.1-.1.2a1.79,1.79,0,0,0-.5.7c-.1.1-.2.2-.2.3a3.9,3.9,0,0,0-.4,2.8,1.69,1.69,0,0,0,.2.5c.2.4.3.8.6,1.4A19.72,19.72,0,0,0,7,14.5a12,12,0,0,0,1.1,1.2A8.64,8.64,0,0,0,9.5,17a19.52,19.52,0,0,0,4,2.6c.5.2.9.4,1.3.6.2.1.4.1.5.2a3.86,3.86,0,0,0,2.8-.2c.1,0,.2-.1.3-.2a3.51,3.51,0,0,0,.8-.5c.1-.1.2-.1.3-.2a6.82,6.82,0,0,0,.7-.5A1,1,0,0,0,20.1,17.3Z" transform="translate(-2.5 -2.6)"/></svg>'
                        fill='#000000'
                      />
                    </Card>
                  </Col>

                </Row>

                <ScrollView>
                  <Accordion title="اطلاعات تماس">
                    <Grid style={{ paddingVertical: 10 }}>
                      <Row>
                        <Col size={1}>
                          <Text style={{ color: '#7fbbd2', fontSize: 13 }}>شماره تماس</Text>
                        </Col>
                        <Col size={2} style={{ alignItems: 'flex-start' }}>
                          <Text style={{ fontSize: 13 }}>{this.props.profile.contact.info}</Text>
                        </Col>
                      </Row>
                      {/* <Row> */}
                      <View style={{ borderBottomColor: '#d9d9d9', borderBottomWidth: 0.5 }} />
                      {/* </Row> */}
                      <Row >
                        <Col size={1}>
                          <Text style={{ color: '#7fbbd2' }}>آدرس</Text>
                        </Col>
                        <Col size={3} style={{ alignItems: 'flex-start' }}>
                          {this.props.profile.addressList ? this.props.profile.addressList.map(item => {
                            return (
                              <Row style={{ borderBottomWidth: 1, borderBottomColor: '#7fbbd2' }}>
                                <Text style={{ textAlign: 'left', fontSize: 12 }}>{item.province.titla} {item.city.title}  {item.region} {item.details} {item.tell}</Text>
                              </Row>
                            )
                          }) : null}


                        </Col>
                      </Row>
                      <Row style={{ marginTop: 8 }}>
                        <Button rounded bordered info block onPress={() => this.setState({ mode: 'edit_profile' })}>
                          <Text>افزودن آدرس های بیشتر</Text><Icon name="ios-arrow-back" style={{ color: '#5BC0DE' }} /></Button>
                      </Row>

                    </Grid>

                  </Accordion>


                </ScrollView>
                <Row >
                  <Col style={{ padding: 40 }}>
                    <Button block rounded style={{ backgroundColor: '#7fbbd2' }} onPress={() => this.setState({ mode: 'edit_profile' })}><Text>ویرایش پروفایل</Text></Button>
                  </Col>
                </Row>
              </View>
            </View>
          </ParallaxScrollView>
          <Fab
            style={{ backgroundColor: '#e7be00', position: 'absolute', bottom: 40, width: 40, height: 40, right: 3 }}
            position="bottomRight"
            onPress={() => this.props.navigation.navigate('dentist')}>
            <Icon name="ios-home-outline" />
          </Fab>
        </Container>
      )
    } else {

      return (<EditProfile onClose={() => {
        this.setState({
          mode: 'profile'
        })
        this.props.dentistProfile()
      }
      } />)
    }
  }
  changeCamera() {
    if (this.state.cametaType == RNCamera.Constants.Type.back) {
      this.setState({ cametaType: RNCamera.Constants.Type.front })
    } else {
      this.setState({ cametaType: RNCamera.Constants.Type.back })
    }
  }

  renderModal() {
    if (this.state.uri == '') {
      return (
        <View style={{ justifyContent: 'center', alignSelf: 'center' }}>
          <Image source={require('./../../../assets/img/png/logo.png')} resizeMode='center' style={{ flex: 1 }} />
          <Spinner style={{ flex: 1 }} large color='#7fdbb2' />
        </View>);
    } else {
      return (<Image defaultSource={require('./../../../assets/img/png/logo.png')} source={{ uri: this.state.uri }} style={{ flex: 1 }} />)
    }
  }

  cameraPreview() {
    return (
      <RNCamera
        ref={ref => {
          this.camera = ref;
        }}
        style={styles.preview}
        type={this.state.cametaType}
        flashMode={RNCamera.Constants.FlashMode.off}
        permissionDialogTitle={'Permission to use camera'}
        permissionDialogMessage={'We need your permission to use your camera phone'}
        mirrorImage={true}>

        <Row>
          <Col size={1}>
            <Button transparent onPress={() => this.changeCamera()}><Icon name="ios-reverse-camera" style={{ color: '#fff', justifyContent: 'flex-end', flexDirection: 'row' }} /></Button>
          </Col>
          <Col size={5}></Col>
          <Col size={1}>
            <Button transparent
              onPress={() => this.setState({ openCamera: false })}>
              <Icon name="ios-arrow-back" style={{ color: '#fff' }} />
            </Button>
          </Col>

        </Row>

        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>

          <Button transparent onPress={this.takePicture.bind(this)} style={styles.button} >
            <SvgUri width="50" height="50"
              svgXmlData='<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve" width="512px" height="512px" class=""><g><g><g><path d="M256,0C114.841,0,0,114.841,0,256s114.841,256,256,256s256-114.841,256-256S397.159,0,256,0z M256,492    C125.87,492,20,386.131,20,256S125.87,20,256,20c130.131,0,236,105.869,236,236S386.131,492,256,492z" data-original="#000000" class="active-path" data-old_color="#7fbbd2" fill="#7fbbd2"/></g></g><g><g><path d="M440.015,142.896C409.802,93.745,362.256,59.3,306.136,45.909c-56.121-13.393-114.096-4.128-163.248,26.086    c-49.152,30.214-83.597,77.76-96.988,133.879c-13.392,56.12-4.127,114.097,26.086,163.249    c30.213,49.151,77.759,83.596,133.879,96.987c16.476,3.932,33.273,5.877,50.035,5.877c32.926-0.001,65.702-7.508,95.549-22.211    c4.955-2.44,6.992-8.435,4.552-13.39s-8.436-6.992-13.39-4.552c-40.871,20.134-87.786,25.397-132.104,14.822    C105.384,421.571,40.269,315.64,65.354,210.517c12.151-50.924,43.406-94.067,88.007-121.483    c44.601-27.416,97.211-35.821,148.132-23.671c105.123,25.084,170.238,131.017,145.154,236.14    c-8.39,35.16-26.314,67.277-51.836,92.881c-3.899,3.911-3.889,10.243,0.023,14.142c3.911,3.9,10.242,3.89,14.142-0.022    c28.125-28.216,47.879-63.61,57.125-102.357C479.493,250.025,470.228,192.049,440.015,142.896z" data-original="#000000" class="active-path" data-old_color="#7fbbd2" fill="#7fbbd2"/></g></g><g><g><path d="M379.883,420.997c-3.063-4.596-9.272-5.838-13.868-2.774l-0.404,0.273c-4.563,3.112-5.737,9.334-2.625,13.896    c1.937,2.838,5.075,4.365,8.27,4.365c1.941,0,3.903-0.564,5.627-1.74l0.227-0.153    C381.706,431.801,382.947,425.592,379.883,420.997z" data-original="#000000" class="active-path" data-old_color="#7fbbd2" fill="#7fbbd2"/></g></g><g><g><path d="M391.832,154.566v-7.636c0-14.293-11.627-25.921-25.92-25.921h-25.4c-14.293,0-25.92,11.628-25.92,25.921v15.92    c0,5.522,4.477,10,10,10h57.24c7.967,0,14.698,9.323,14.698,20.358V246h-71.715c-6.859-32.756-35.961-57.434-70.725-57.434    c-34.764,0-63.866,24.679-70.725,57.434H115.47v-52.791c0-11.035,6.731-20.358,14.698-20.358h127.948c5.523,0,10-4.478,10-10    c0-5.522-4.477-10-10-10H130.168c-19.133,0-34.698,18.104-34.698,40.358v125.583c0,22.253,15.565,40.358,34.698,40.358h251.663    c19.133,0,34.699-18.105,34.699-40.358V193.209C416.53,174.998,406.104,159.572,391.832,154.566z M371.831,152.851h-37.24v-5.92    c0-3.209,2.711-5.921,5.92-5.921h25.4c3.209,0,5.92,2.712,5.92,5.921V152.851z M254.089,208.566    c28.817,0,52.261,23.444,52.261,52.261c0,28.817-23.444,52.261-52.261,52.261c-28.817,0-52.261-23.444-52.261-52.261    C201.828,232.01,225.272,208.566,254.089,208.566z M396.529,318.792c0.001,11.035-6.73,20.358-14.697,20.358H130.168    c-7.967,0-14.698-9.322-14.698-20.358V266h66.564c2.664,37.437,33.952,67.087,72.055,67.087c38.103,0,69.391-29.65,72.055-67.087    h70.385V318.792z" data-original="#000000" class="active-path" data-old_color="#7fbbd2" fill="#7fbbd2"/></g></g><g><g><path d="M179.109,306.9h-0.511c-5.523,0-10,4.478-10,10c0,5.523,4.477,10,10,10h0.511c5.523,0,10-4.477,10-10    C189.109,311.378,184.632,306.9,179.109,306.9z" data-original="#000000" class="active-path" data-old_color="#7fbbd2" fill="#7fbbd2"/></g></g><g><g><path d="M371.169,193.333h-44.506c-5.523,0-10,4.477-10,10c0,5.522,4.477,10,10,10h44.506c5.523,0,10-4.478,10-10    C381.169,197.81,376.692,193.333,371.169,193.333z" data-original="#000000" class="active-path" data-old_color="#7fbbd2" fill="#7fbbd2"/></g></g><g><g><path d="M287.676,152.851h-0.475c-5.523,0-10,4.478-10,10c0,5.522,4.477,10,10,10h0.475c5.523,0,10-4.478,10-10    C297.676,157.329,293.199,152.851,287.676,152.851z" data-original="#000000" class="active-path" data-old_color="#7fbbd2" fill="#7fbbd2"/></g></g></g></svg>'
            />
          </Button>

        </View>
      </RNCamera>
    );
  }

  takePicture = async function () {


    if (this.camera) {

      const options = { quality: 0.5, fixOrientation: true, base64: true };
      this.setState({ showPicrure: true })
      const data = await this.camera.takePictureAsync(options)

      this.setState({ uri: data.uri, openCamera: false })



      // this.uploadImage(data.uri)
    }


  };

  renderImage() {
    if (this.state.uri === '') {
      return require('./../../../assets/img/png/user.png')
    } else {
      return { uri: this.state.uri }
    }
  }

  render() {
    return (
      this.renderPage()
    );
  }
}
const window = Dimensions.get('window');

const AVATAR_SIZE = 100;
const ROW_HEIGHT = 60;
const PARALLAX_HEADER_HEIGHT = 150;
const STICKY_HEADER_HEIGHT = 56;


const styles1 = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red'
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: window.width,
    height: PARALLAX_HEADER_HEIGHT
  },
  stickySection: {
    // flex:1,
    height: STICKY_HEADER_HEIGHT,
    justifyContent: 'center'
  },
  stickySectionText: {
    color: 'white',
    fontSize: 16,
    margin: 10
  },
  fixedSection: {
    position: 'absolute',
    bottom: 0,
    right: 0, backgroundColor: '#f4f4f4'
  },
  fixedSectionText: {
    color: '#fff',
    fontSize: 20
  },
  parallaxHeader: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    paddingTop: 40,
  },
  avatar: {
    marginBottom: 10,
    borderRadius: AVATAR_SIZE / 2,
    borderWidth: 1,
    borderColor: 'black'

  },
  sectionSpeakerText: {
    color: 'white',
    fontSize: 20,
    paddingVertical: 5
  },
  sectionTitleText: {
    color: 'black',
    fontSize: 15,
    paddingVertical: 5
  },
  row: {
    overflow: 'hidden',
    paddingHorizontal: 10,
    height: ROW_HEIGHT,
    backgroundColor: 'white',
    borderColor: '#ccc',
    borderBottomWidth: 1,
    justifyContent: 'center'
  },
  rowText: {
    fontSize: 20
  }
});

const styles = StyleSheet.create({
  subtitleView: {
    flexDirection: 'column',
    paddingLeft: 10,
    paddingTop: 5
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  button: {
    justifyContent: 'center',
    alignSelf: 'center',
    paddingBottom: 20,
    height: 70,
    width: 60
  },
  input: {
    paddingHorizontal: 10
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
    loading: state.UserReducer.loading,
    profile: state.UserReducer.profile,
    drawerOpen: state.GlobalReducer.drawerOpen,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    dentistProfile, drawerOpener, drawerCloser
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);