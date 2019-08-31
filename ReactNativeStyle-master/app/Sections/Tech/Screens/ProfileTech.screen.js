import React, { PureComponent } from 'react';
import { StyleSheet, Image, Dimensions, Modal, ScrollView, ImageBackground, BackHandler } from 'react-native';
import { Row, Grid, Col } from 'react-native-easy-grid'
import { Container, View, Button, Card, CardItem, Item, Input, Icon, Text, Fab, Label, Textarea } from 'native-base';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import HeaderComponent from '../../../Components/Header.component'
import Accordion from '../../../Components/Accordeon.component'
import { getTechProfile } from '../Redux/Actions/Tech.action'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { drawerOpener, drawerCloser } from '../../../Redux/Actions/Global.Actions'; //Import your actions
import { DrawerActions } from 'react-navigation';

import { RNCamera } from 'react-native-camera';
class ProfileTechScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.props.getTechProfile();
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


  renderImage() {
    // console.log(1);
    // console.log(this.props.profile)
    // if (this.props.profile.user.profilePic) {
    //   return { uri: `http://89.32.249.208:8090${this.props.profile.user.profilePic.profilePicUrl}?date=${new Date().getTime()}` }
    // } else {
    //   return require('./../../../assets/img/png/user.png')
    // }

  }
  renderPage() {

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
              <Image style={styles1.avatar} source={{
                    uri: `https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg`,
                    width: AVATAR_SIZE,
                    height: AVATAR_SIZE
                }} />
              </View>
            )}

            renderStickyHeader={() => (
              <HeaderComponent title="پروفایل من" />
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
                      دکتر {this.props.profileTech.user.firstname} {this.props.profileTech.user.lastname}
                    </Text>
                  </Col>
                  <Col size={2} style={{ flex: 1, justifyContent: 'center' }}>
                    <View style={{ borderBottomColor: '#d9d9d9', borderBottomWidth: 0.5 }} />
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
                          <Text style={{ fontSize: 13 }}>{this.props.profileTech.user.username}</Text>
                        </Col>
                      </Row>
                      <View style={{ borderBottomColor: '#d9d9d9', borderBottomWidth: 0.5 }} />
                     
                    </Grid>

                  </Accordion>


                </ScrollView>
                {/* <Row >
                  <Col style={{ padding: 40 }}>
                    <Button block rounded style={{ backgroundColor: '#7fbbd2' }} onPress={() => this.setState({ mode: 'edit_profile' })}><Text>ویرایش پروفایل</Text></Button>
                  </Col>
                </Row> */}
              </View>
            </View>
          </ParallaxScrollView>
          <Fab
            style={{ backgroundColor: '#e7be00', position: 'absolute', bottom: 40, width: 40, height: 40, right: 3 }}
            position="bottomRight"
            onPress={() => this.props.navigation.navigate('tech')}>
            <Icon name="ios-home-outline" />
          </Fab>
        </Container>
      )
    
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
    profileTech: state.TechReducer.profileTech,
    drawerOpen: state.GlobalReducer.drawerOpen,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getTechProfile, drawerOpener, drawerCloser
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileTechScreen);