import React, { Component } from 'react';
import { View, Button, Text, Container, Grid, Row, Col } from 'native-base';
import { StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native'
import SvgUri from 'react-native-svg-uri';
import * as images from '../../../assets/images';
import { navigateTabs, showLoading } from '../Redux/Actions/Dashboard.action'; //Import your actions
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import HeaderComponent from '../../../Components/Header.component'
import { ProgressDialog } from 'react-native-simple-dialogs'
import {
  dashboard_neworder,
  dashboard_report,
  dashboard_lab_search,
  dashboard_learning_points,
  dashboard_my_bills,
  dashboard_my_orders
} from '../../../assets/img/svg/SvgXml'
import httpService from '../../../Services/Http.service'
class DashboardScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: ''
    };
  }
  componentWillMount() {
    httpService.httpGetJwt('me-fullname').then(res => {
      // alert(JSON.stringify(res));
      this.setState({
        name: res.data.firstname + ' ' + res.data.lastname
      })
    })
  }
  componentDidMount() {
    // alert(JSON.stringify(this.props,null,5))

  }
  render() {

    let buttonSize = Dimensions.get('screen').width / 4;

    return (


      <Container style={styles.container}>
        <HeaderComponent title="داشبورد" />
        {/* <ProgressDialog
              visible={this.props.loading}
              title=""
              message="در حال بارگزاری ..."
            /> */}
        <Grid>
          <Row style={{ flex: 1 }}><Image source={require('../../../assets/img/png/firstPage.png')} style={{ height: '100%', width: '100%' }} /></Row>

          <Row style={{ flex: 2, flexDirection: 'row' }}>

            <Grid>
              <Row style={{ flex: 0 }}>
                <Col size={2} style={{ justifyContent: 'center' }}>
                  <View style={{ borderBottomColor: '#b3b3b5', borderBottomWidth: 1 }} />
                </Col>
                <Col size={4} style={{ justifyContent: 'center' }}><Text style={{ fontSize: 15, color: '#7e7e7f', textAlign: 'center', alignSelf: 'center' }}>سلام دکتر {this.state.name}</Text></Col>
                <Col size={2} style={{ justifyContent: 'center' }}>
                  <View style={{ borderBottomColor: '#b3b3b5', borderBottomWidth: 1 }} />
                </Col>
              </Row>

              <Row >
                <Grid style={{}}>
                  <Col size={1}></Col>
                  <Col size={7}>
                    <Row size={1}></Row>
                    <Row size={5}>
                      <Col style={{ flex: 1, justifyContent: 'flex-end' }}>
                        <TouchableOpacity onPress={() => {
                          this.props.navigation.navigate('DentistHomeScreen', { index: 'bill' })
                        }} block style={{ height: buttonSize, justifyContent: 'center', width: buttonSize, backgroundColor: '#e1e1e1', borderRadius: 15 }}>
                          <SvgUri
                            style={{ justifyContent: 'center', alignSelf: 'center' }}
                            width="40"
                            height="40"

                            svgXmlData={dashboard_my_bills}
                          />
                        </TouchableOpacity>
                        <Text style={{ justifyContent: 'flex-end', marginTop: 10, textAlign: 'center', color: '#696969', fontSize: 10 }} >صورت حساب‌های من</Text>
                      </Col>
                      <Col style={{ paddingHorizontal: 10, flex: 1, justifyContent: 'flex-end' }}>
                        <TouchableOpacity onPress={() => {
                          this.props.navigation.navigate('DentistHomeScreen', { index: 'report' })
                        }} block style={{ height: buttonSize, justifyContent: 'center', width: buttonSize, backgroundColor: '#e1e1e1', borderRadius: 15 }}>
                          <SvgUri
                            style={{ justifyContent: 'center', alignSelf: 'center' }}
                            width="40"
                            height="40"
                            svgXmlData={dashboard_report}
                          />

                        </TouchableOpacity>
                        <Text style={{ justifyContent: 'flex-end', marginTop: 10, textAlign: 'center', color: '#696969', fontSize: 10 }} >گزارش گیری</Text>
                      </Col>
                      <Col style={{ flex: 1, justifyContent: 'flex-end' }}>
                        <TouchableOpacity
                          onPress={() => {
                            this.props.navigation.navigate('DentistHomeScreen', { index: 'order' })
                          }}
                          block
                          style={{
                            height: buttonSize, justifyContent: 'center', width: buttonSize, backgroundColor: '#e7be00',
                            borderRadius: 15
                          }}>
                          <SvgUri
                            style={{ justifyContent: 'center', alignSelf: 'center' }}
                            width="40"
                            height="40"
                            fill="#ffffff"
                            svgXmlData={dashboard_neworder}
                          />
                        </TouchableOpacity>
                        <Text style={{ justifyContent: 'flex-end', marginTop: 10, textAlign: 'center', color: '#696969', fontSize: 10 }} >ثبت سفارش جدید</Text>
                      </Col>
                    </Row>
                    <Row size={5} >
                      <Col style={{ flex: 1 }}>
                        <TouchableOpacity onPress={() => {
                          // this.props.showLoading()
                          // this.props.navigateTabs(3)
                          this.props.navigation.navigate('DentistHomeScreen', { index: 'orderManagement' })
                        }} block style={{ height: buttonSize, justifyContent: 'center', width: buttonSize, backgroundColor: '#e1e1e1', borderRadius: 15 }}>
                          <SvgUri
                            style={{ justifyContent: 'center', alignSelf: 'center' }}
                            width="40"
                            height="40"
                            fill='#7fbbd2'
                            svgXmlData={dashboard_my_orders}
                          />
                        </TouchableOpacity>
                        <Text style={{ justifyContent: 'flex-end', marginTop: 10, textAlign: 'center', color: '#696969', fontSize: 10 }} >سفارش های من</Text>
                      </Col>
                      <Col style={{ paddingHorizontal: 10, flex: 1 }}>
                        <TouchableOpacity onPress={() => {
                          // this.props.showLoading()
                          // this.props.navigateTabs(1)
                          this.props.navigation.navigate('DentistHomeScreen', { index: 'labSearch' })
                        }} block style={{ height: buttonSize, justifyContent: 'center', width: buttonSize, backgroundColor: '#e1e1e1', borderRadius: 15 }}>
                          <SvgUri
                            style={{ justifyContent: 'center', alignSelf: 'center' }}
                            width="40"
                            height="40"
                            svgXmlData={dashboard_lab_search}
                          />
                        </TouchableOpacity>
                        <Text style={{ justifyContent: 'flex-end', marginTop: 10, textAlign: 'center', color: '#696969', fontSize: 10 }} >جستجوی لابراتوار</Text>
                      </Col>
                      <Col style={{ flex: 1 }}>
                        <TouchableOpacity block onPress={() => {
                          this.props.navigation.navigate('EducationalScreen')
                        }}
                          style={{ height: buttonSize, justifyContent: 'center', width: buttonSize, backgroundColor: '#e1e1e1', borderRadius: 15 }}>
                          <SvgUri
                            style={{ justifyContent: 'center', alignSelf: 'center' }}
                            width="40"
                            height="40"
                            svgXmlData={dashboard_learning_points}
                          />
                        </TouchableOpacity>
                        <Text style={{ justifyContent: 'flex-end', marginTop: 10, textAlign: 'center', color: '#696969', fontSize: 10 }} >نکات آموزشی</Text>
                      </Col>
                    </Row>
                    <Row size={1}></Row>
                  </Col>
                  <Col size={1}>
                  </Col>
                </Grid>
              </Row>
            </Grid>
          </Row>
        </Grid>

      </Container>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    // activeIndex: state.DashboardReducer.activeIndex,
    // loading: state.DashboardReducer.loading,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    navigateTabs,
    showLoading
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardScreen);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: '#eee'
  }
});

