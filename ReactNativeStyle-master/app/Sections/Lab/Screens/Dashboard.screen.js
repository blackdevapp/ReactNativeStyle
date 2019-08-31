import React, { PureComponent } from 'react';
import { View, Button, Text, Container, Grid, Row, Col } from 'native-base';
import { StyleSheet, Image, Dimensions } from 'react-native'
import SvgUri from 'react-native-svg-uri';

import HeaderComponent from '../../../Components/Header.component'

import {
  dashboard_report,
  dashboard_learning_points,
  dashboard_my_bills,
  drawer_profile,
} from '../../../assets/img/svg/SvgXml'

import colors from './../../../Config/Color'


class DashboardScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    };
  }


  render() {
    let buttonSize = Dimensions.get('screen').width / 4;
    return (
      <Container style={styles.container}>
        <HeaderComponent title="داشبورد" color="#7EDAD1" />
        <Grid>
          <Row style={{ flex: 1 }}><Image source={require('../../../assets/img/png/firstPage.png')} style={{ height: '100%', width: '100%' }} /></Row>

          <Row style={{ flex: 2, flexDirection: 'row' }}>

            <Grid>
              <Row style={{ flex: 0 }}>
                <Col size={2} style={{ justifyContent: 'center' }}>
                  <View style={{ borderBottomColor: '#b3b3b5', borderBottomWidth: 1 }} />
                </Col>
                <Col size={4} style={{ justifyContent: 'center' }}><Text style={{ fontSize: 15, color: '#7e7e7f', textAlign: 'center', alignSelf: 'center' }}>چطور میتونم کمکتون کنم ؟</Text></Col>
                <Col size={2} style={{ justifyContent: 'center' }}>
                  <View style={{ borderBottomColor: '#b3b3b5', borderBottomWidth: 1 }} />
                </Col>
              </Row>

              <Row >
                <Grid style={{}}>
                  <Col size={1}></Col>
                  <Col size={7}>
                    <Row size={1}></Row>
                    <Row size={7} >
                      <Col style={{ flex: 1, justifyContent: 'flex-end' }}>
                        <Button onPress={() => {
                          this.props.navigation.navigate('LabHomeScreen', { index: 'bill' })
                        }} block style={{ height: buttonSize, width: buttonSize, backgroundColor: '#e1e1e1', borderRadius: 15 }}>
                          <SvgUri
                            fill={colors.LabHeader}
                            style={{ justifyContent: 'center', alignSelf: 'center' }}
                            width="35"
                            height="30"
                            svgXmlData={dashboard_my_bills}
                          />
                        </Button>
                        <Text style={{ justifyContent: 'flex-end', marginTop: 10, textAlign: 'center', color: '#696969', fontSize: 9 }} >صورت حساب‌های من</Text>
                      </Col>
                      <Col style={{ paddingHorizontal: 10, flex: 1, justifyContent: 'flex-end' }}>
                        <Button onPress={() => {
                          this.props.navigation.navigate('LabHomeScreen', { index: 'report' })
                        }} block style={{ height: buttonSize, width: buttonSize, backgroundColor: '#e1e1e1', borderRadius: 15 }}>
                          <SvgUri
                            style={{ justifyContent: 'center', alignSelf: 'center' }}
                            width="35"
                            height="30"
                            fill={colors.LabHeader}
                            svgXmlData={dashboard_report}

                          />

                        </Button>
                        <Text style={{ justifyContent: 'flex-end', marginTop: 10, textAlign: 'center', color: '#696969', fontSize: 9 }} >گزارش گیری</Text>
                      </Col>
                      <Col style={{ flex: 1, justifyContent: 'flex-end' }}>
                        <Button
                          onPress={() => {
                            this.props.navigation.navigate('LabHomeScreen', { index: 'orderManagement' })
                          }}
                          block
                          style={{
                            height: buttonSize, width: buttonSize, backgroundColor: '#e1e1e1',
                            borderRadius: 15
                          }}>
                          <SvgUri
                            style={{ justifyContent: 'center', alignSelf: 'center' }}
                            width="35"
                            height="30"
                            fill={'#ffffff'}
                            svgXmlData={dashboard_my_bills}
                          />
                        </Button>
                        <Text style={{ justifyContent: 'flex-end', marginTop: 10, textAlign: 'center', color: '#696969', fontSize: 9 }} >سفارش های من</Text>
                      </Col>
                    </Row>
                    <Row size={7} >

                      <Grid>
                        <Col size={1} ></Col>
                        <Col style={{ padding: 5 }} size={2}>
                          <Button
                            style={{ justifyContent: 'center' }}
                            onPress={() => {
                              this.props.navigation.navigate('LabHomeScreen', { index: 'priceList' })
                            }} block style={{ height: buttonSize, width: buttonSize, backgroundColor: '#e1e1e1', borderRadius: 15 }}>
                            <SvgUri
                              style={{ justifyContent: 'center', alignSelf: 'center' }}
                              width="35"
                              height="30"
                              fill={colors.LabHeader}
                              svgXmlData={drawer_profile}
                            />
                          </Button>
                          <Text style={{ justifyContent: 'flex-end', marginTop: 10, textAlign: 'center', color: '#696969', fontSize: 9 }} >لیست قیمتها</Text>
                        </Col>
                        <Col style={{ padding: 5 }} size={2}>
                          <Button block onPress={() => { this.props.navigation.navigate('EducationalScreen') }}
                            style={{ height: buttonSize, width: buttonSize, backgroundColor: '#e1e1e1', borderRadius: 15 }}>
                            <SvgUri
                              style={{ justifyContent: 'center', alignSelf: 'center' }}
                              width="35"
                              height="30"
                              svgXmlData={dashboard_learning_points}
                              fill={colors.LabHeader}
                            />
                          </Button>
                          <Text style={{ justifyContent: 'flex-end', marginTop: 10, textAlign: 'center', color: '#696969', fontSize: 9 }} >نکات آموزشی</Text>
                        </Col>
                        <Col size={1}></Col>

                      </Grid>
                    </Row>
                    <Row size={1}></Row>
                  </Col>

                  <Col size={1}></Col>
                </Grid>
              </Row>
            </Grid>
          </Row>
        </Grid>

      </Container>
    );

  }
}

export default DashboardScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: '#eee'
  }
});