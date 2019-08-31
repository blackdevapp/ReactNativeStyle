import React, { PureComponent } from 'react';
import { StyleSheet, Dimensions, Image, View, FlatList, TouchableOpacity, ScrollView } from 'react-native'
import { Button, Text, Container, Icon, Card, Input, Item, CardItem, Body, Content, Picker, Fab } from 'native-base';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import { Row, Col, Grid } from 'react-native-easy-grid'
import { getConnectedLab } from '../Redux/Actions/Tech.action'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import HeaderComponent from '../../../Components/Header.component';
import { bell } from '../../../assets/img/svg/SvgXml'
import SvgUri from 'react-native-svg-uri';
import { report_time, report_profile, report_type } from '../../../assets/img/svg/SvgXml'
import { Dialog } from 'react-native-simple-dialogs';


const buttonSize = Dimensions.get('screen').width / 8;


class ReportScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showTimeSelect: false,
      showLabNameSelect: false,
      showTypeSelect: false
    };
  }

  render() {
    return (
      <Container style={{ backgroundColor: '#f4f4f4' }}>
        <HeaderComponent color="#7EDAD1" title="لابراتوار های من" />
        <Grid style={{ flex: 1 }}>

          <Row size={3}>
            <Col>
              <Image source={require('../../../assets/img/png/firstPage.png')} style={{ height: '100%', width: '100%' }} />
            </Col>
          </Row>

          <Row size={2} style={{ alignItems: 'center' }}>
            <Col size={5} style={{ padding: 10 }}><Text style={{ alignSelf: 'center', fontSize: 12 }}>گزارش گیری براساس:</Text></Col>
            <Col size={3}>
              <Button
                style={[styles.buttonStyle, { borderWidth: 0 }, (this.state.time) ? { backgroundColor: '#edb831', borderWidth: 0 } : { backgroundColor: '#eee' }]}
                onPress={() => this.setState({ showTimeSelect: true })}>
                <SvgUri
                  svgXmlData={report_time}
                  // source={require('./../../../assets/img/svg/time.svg')} 
                  width="25" height="25" fill={(this.state.time) ? '#ffffff' : '#818384'} />
              </Button>
              <Text style={styles.textStyle}>بازه زمانی</Text>
            </Col>

            <Col size={3}>
              <Button
                style={[styles.buttonStyle, (this.state.lab) ? { backgroundColor: '#edb831', borderWidth: 0 } : { backgroundColor: '#eee' }]}
                onPress={() => this.setState({ showLabNameSelect: true })}
              >
                <SvgUri svgXmlData={report_profile}
                  // source={require('./../../../assets/img/svg/mylabs.svg')} 
                  width="30" height="30" fill={(this.state.lab) ? '#ffffff' : '#818384'} />
              </Button>
              <Text style={styles.textStyle}>نام لابراتوار</Text>
            </Col>

            <Col size={3}>
              <Button
                style={[styles.buttonStyle, (this.state.work) ? { backgroundColor: '#edb831', borderWidth: 0 } : { backgroundColor: '#eee' }]}
                onPress={() => this.setState({ showTypeSelect: true })}>
                <SvgUri svgXmlData={report_type}
                  // source={require('./../../../assets/img/svg/tooth.svg')} 
                  width="30" height="30" fill={(this.state.work) ? '#ffffff' : '#818384'} />
              </Button>
              <Text style={styles.textStyle}>نوع کار</Text>
            </Col>
          </Row>
          <Row size={5} style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Col style={{ width: '70%', height: '80%', }}>

              <Row style={{ backgroundColor: 'white' }}>
                <Col style={styles.tableCol}><Text style={{ fontSize: 8 }}>نوع کار</Text></Col>
                <Col style={styles.tableCol}><Text style={{ fontSize: 8 }}>نوع کار</Text></Col>
                <Col style={styles.tableCol}><Text style={{ fontSize: 8 }}>نوع کار</Text></Col>
                <Col style={styles.tableCol}><Text style={{ fontSize: 8 }}>نوع کار</Text></Col>
                <Col style={styles.tableCol}><Text style={{ fontSize: 8 }}>نوع کار</Text></Col>
                <Col style={styles.tableCol}><Text style={{ fontSize: 8 }}>نوع کار</Text></Col>
                <Col style={styles.tableCol}><Text style={{ fontSize: 8 }}>نوع کار</Text></Col>
              </Row>
              <Row >
                <Col style={styles.tableCol}><Text style={{ fontSize: 8 }}>نوع کار</Text></Col>
                <Col style={styles.tableCol}><Text style={{ fontSize: 8 }}>نوع کار</Text></Col>
                <Col style={styles.tableCol}><Text style={{ fontSize: 8 }}>نوع کار</Text></Col>
                <Col style={styles.tableCol}><Text style={{ fontSize: 8 }}>نوع کار</Text></Col>
                <Col style={styles.tableCol}><Text style={{ fontSize: 8 }}>نوع کار</Text></Col>
                <Col style={styles.tableCol}><Text style={{ fontSize: 8 }}>نوع کار</Text></Col>
                <Col style={styles.tableCol}><Text style={{ fontSize: 8 }}>نوع کار</Text></Col>
              </Row>
              <Row >
                <Col style={styles.tableCol}><Text style={{ fontSize: 8 }}>نوع کار</Text></Col>
                <Col style={styles.tableCol}><Text style={{ fontSize: 8 }}>نوع کار</Text></Col>
                <Col style={styles.tableCol}><Text style={{ fontSize: 8 }}>نوع کار</Text></Col>
                <Col style={styles.tableCol}><Text style={{ fontSize: 8 }}>نوع کار</Text></Col>
                <Col style={styles.tableCol}><Text style={{ fontSize: 8 }}>نوع کار</Text></Col>
                <Col style={styles.tableCol}><Text style={{ fontSize: 8 }}>نوع کار</Text></Col>
                <Col style={styles.tableCol}><Text style={{ fontSize: 8 }}>نوع کار</Text></Col>
              </Row>
              <Row >
                <Col style={styles.tableCol}><Text style={{ fontSize: 8 }}>نوع کار</Text></Col>
                <Col style={styles.tableCol}><Text style={{ fontSize: 8 }}>نوع کار</Text></Col>
                <Col style={styles.tableCol}><Text style={{ fontSize: 8 }}>نوع کار</Text></Col>
                <Col style={styles.tableCol}><Text style={{ fontSize: 8 }}>نوع کار</Text></Col>
                <Col style={styles.tableCol}><Text style={{ fontSize: 8 }}>نوع کار</Text></Col>
                <Col style={styles.tableCol}><Text style={{ fontSize: 8 }}>نوع کار</Text></Col>
                <Col style={styles.tableCol}><Text style={{ fontSize: 8 }}>نوع کار</Text></Col>
              </Row>
              <Row >
                <Col style={styles.tableCol}><Text style={{ fontSize: 8 }}>نوع کار</Text></Col>
                <Col style={styles.tableCol}><Text style={{ fontSize: 8 }}>نوع کار</Text></Col>
                <Col style={styles.tableCol}><Text style={{ fontSize: 8 }}>نوع کار</Text></Col>
                <Col style={styles.tableCol}><Text style={{ fontSize: 8 }}>نوع کار</Text></Col>
                <Col style={styles.tableCol}><Text style={{ fontSize: 8 }}>نوع کار</Text></Col>
                <Col style={styles.tableCol}><Text style={{ fontSize: 8 }}>نوع کار</Text></Col>
                <Col style={styles.tableCol}><Text style={{ fontSize: 8 }}>نوع کار</Text></Col>
              </Row>
              <Row >
                <Col style={styles.tableCol}><Text style={{ fontSize: 8 }}>نوع کار</Text></Col>
                <Col style={styles.tableCol}><Text style={{ fontSize: 8 }}>نوع کار</Text></Col>
                <Col style={styles.tableCol}><Text style={{ fontSize: 8 }}>نوع کار</Text></Col>
                <Col style={styles.tableCol}><Text style={{ fontSize: 8 }}>نوع کار</Text></Col>
                <Col style={styles.tableCol}><Text style={{ fontSize: 8 }}>نوع کار</Text></Col>
                <Col style={styles.tableCol}><Text style={{ fontSize: 8 }}>نوع کار</Text></Col>
                <Col style={styles.tableCol}><Text style={{ fontSize: 8 }}>نوع کار</Text></Col>
              </Row>
              <Row >
                <Col style={styles.tableCol}><Text style={{ fontSize: 8 }}>نوع کار</Text></Col>
                <Col style={styles.tableCol}><Text style={{ fontSize: 8 }}>نوع کار</Text></Col>
                <Col style={styles.tableCol}><Text style={{ fontSize: 8 }}>نوع کار</Text></Col>
                <Col style={styles.tableCol}><Text style={{ fontSize: 8 }}>نوع کار</Text></Col>
                <Col style={styles.tableCol}><Text style={{ fontSize: 8 }}>نوع کار</Text></Col>
                <Col style={styles.tableCol}><Text style={{ fontSize: 8 }}>نوع کار</Text></Col>
                <Col style={styles.tableCol}><Text style={{ fontSize: 8 }}>نوع کار</Text></Col>
              </Row>

            </Col>
          </Row>

        </Grid>

        <Fab position="bottomRight"
          style={{ backgroundColor: '#7EDAD1' }}
          onPress={() => this.props.navigation.goBack()}>
          <Icon name='ios-arrow-back-outline' />
        </Fab>


        <Dialog visible={this.state.showTimeSelect} >
          <Row style={{ height: 250 }}>

            <Col style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Row>
                <Col size={20} style={{ alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ textAlign: 'center' }}>از</Text>
                </Col>
                <Col size={80} style={{ alignItems: 'center', justifyContent: 'center' }}>
                  <Item rounded style={{ backgroundColor: 'white' }}>
                    <Input style={{ textAlign: 'center' }} placeholder='تاریخ' />
                  </Item>
                </Col>
              </Row>
              <Row>
                <Col size={20} style={{ alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ textAlign: 'center' }}>تا</Text>
                </Col>
                <Col size={80} style={{ alignItems: 'center', justifyContent: 'center' }}>
                  <Item rounded style={{ backgroundColor: 'white' }}>
                    <Input style={{ textAlign: 'center' }} placeholder='تاریخ' />
                  </Item>
                </Col>
              </Row>
              <Row>
                <Col style={{ alignItems: 'center', justifyContent: 'center' }}>
                  <Button rounded style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#7EDAD1', width: 100 }}>
                    <Text style={{ textAlign: 'center' }}>تایید</Text>
                  </Button>
                </Col>
                <Col style={{ alignItems: 'center', justifyContent: 'center' }}>
                  <Button rounded style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#e7be00', width: 100 }} onPress={() => this.setState({ showTimeSelect: false })}>
                    <Text style={{ textAlign: 'center' }}>بازگشت</Text>
                  </Button>
                </Col>
              </Row>
            </Col>

          </Row>
        </Dialog>

        <Dialog visible={this.state.showLabNameSelect} >
          <Row style={{ height: 250 }}>

            <Col style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Row>
                <Col size={30} style={{ alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ textAlign: 'center' }}>نام لابراتوار</Text>
                </Col>
                <Col size={70} style={{ alignItems: 'center', justifyContent: 'center' }}>
                  <Item rounded style={{ backgroundColor: 'white', width: '100%' }}>
                    <Picker style={styles.picker} />
                    {/* <Input style={{ textAlign: 'center' }} placeholder='نام لابراتوار' /> */}
                  </Item>
                </Col>
              </Row>

              <Row>
                <Col style={{ alignItems: 'center', justifyContent: 'center' }}>
                  <Button rounded style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#7EDAD1', width: 100 }}>
                    <Text style={{ textAlign: 'center' }}>تایید</Text>
                  </Button>
                </Col>
                <Col style={{ alignItems: 'center', justifyContent: 'center' }}>
                  <Button rounded style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#e7be00', width: 100 }} onPress={() => this.setState({ showLabNameSelect: false })}>
                    <Text style={{ textAlign: 'center' }}>بازگشت</Text>
                  </Button>
                </Col>
              </Row>
            </Col>

          </Row>
        </Dialog>

        <Dialog visible={this.state.showTypeSelect} >
          <Row style={{ height: 250 }}>

            <Col style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Row>
                <Col size={30} style={{ alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ textAlign: 'center' }}>نوع کار </Text>
                </Col>
                <Col size={70} style={{ alignItems: 'center', justifyContent: 'center' }}>
                  <Item rounded style={{ backgroundColor: 'white', width: '100%' }}>
                    <Picker style={styles.picker} />
                    {/* <Input style={{ textAlign: 'center' }} placeholder='نام لابراتوار' /> */}
                  </Item>
                </Col>
              </Row>

              <Row>
                <Col style={{ alignItems: 'center', justifyContent: 'center' }}>
                  <Button rounded style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#7EDAD1', width: 100 }}>
                    <Text style={{ textAlign: 'center' }}>تایید</Text>
                  </Button>
                </Col>
                <Col style={{ alignItems: 'center', justifyContent: 'center' }}>
                  <Button rounded style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#e7be00', width: 100 }} onPress={() => this.setState({ showTypeSelect: false })}>
                    <Text style={{ textAlign: 'center' }}>بازگشت</Text>
                  </Button>
                </Col>
              </Row>
            </Col>

          </Row>
        </Dialog>




      </Container>
    );
  }
}

const styles = StyleSheet.create({
  picker: {
    width: '100%',
    fontSize: 10,
    borderRadius: 25,
    backgroundColor: '#fff',
    marginVertical: 5
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: '#EFF2F6'
  },
  buttonStyle: {
    width: buttonSize,
    height: buttonSize,
    borderRadius: buttonSize / 2,
    borderWidth: 1,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textStyle: {
    textAlign: 'left',
    color: '#818384',
    paddingTop: 5,
    fontSize: 12
  },
  tableCol: {
    borderWidth: 0.4,
    borderColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center'
  },
  tableText: {

  }
});

function mapStateToProps(state, props) {
  return {
    loading: state.TechReducer.loading,
    connectedLab: state.TechReducer.connectedLab
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getConnectedLab
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportScreen);
