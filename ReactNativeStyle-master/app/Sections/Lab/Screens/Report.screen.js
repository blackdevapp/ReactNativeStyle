import React, { PureComponent } from 'react';
import { StyleSheet, Dimensions, Image, View, FlatList, TouchableOpacity } from 'react-native'
import { Button, Text, Container, Icon, Row, Col, Card, Input, Item, CardItem, Grid, Content,Picker } from 'native-base';
import SvgUri from 'react-native-svg-uri';
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit'
import HeaderComponent from '../../../Components/Header.component'
import{InteractionManager} from 'react-native'
import{ProgressDialog}from 'react-native-simple-dialogs'
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {getAllTech,getBillPays} from '../Redux/Actions/Lab.action'
import { Dialog } from 'react-native-simple-dialogs';
import { report_time, report_profile, report_type } from '../../../assets/img/svg/SvgXml'
import Snackbar from 'react-native-snackbar';

const buttonSize = Dimensions.get('screen').width / 8;
const imageSize = Dimensions.get('screen').width / 7

const dataTime = {
  labels: [0, 1, 2, 3, 4, 5],
  datasets: [{
    data: [0, 20, 50, 40, 20, 60]
  }]
}

const dataLab = {
  labels: ['implant', 'orthodontics', 'removable', 'fixed'],
  datasets: [{
    data: [20, 45, 28, 80]
  }]
}

const dataWork = [
  { name: 'implant', population: 21500000, color: 'rgba(131, 167, 234, 1)', legendFontColor: '#7F7F7F', legendFontSize: 15 },
  { name: 'orthodontics', population: 2800000, color: '#995a5a', legendFontColor: '#7F7F7F', legendFontSize: 15 },
  { name: 'removable', population: 527612, color: '#e85c5c', legendFontColor: '#7F7F7F', legendFontSize: 15 },
  { name: 'fixed', population: 8538000, color: '#85b4f7', legendFontColor: '#7F7F7F', legendFontSize: 15 }

]
class ReportScreen extends PureComponent {
  constructor(props) {

    super(props)
    this.props.getAllTech()
    this.props.getBillPays()
    // alert(JSON.stringify(props.navigation.state,null,5)) 
    this.state = {
      loading:true,
      mode: 'order',
      time: true,
      lab: false,
      work: false,
      chart: false,
      table: false,
      showTimeSelect: false,
      showLabNameSelect: false,
      showTypeSelect: false
    }
  }
  comeSoon(){
    Snackbar.show({
        title: 'به زودی این سرویس فعال خواهد شد.',
        duration: 7000,
    })
}
  componentDidMount(){
    InteractionManager.runAfterInteractions(() => {
      this.setState({
        loading:false
      })
    });
  }
  componentWillMount() {
    this.props.navigation.navigate(this.props.screenProps)
}
  renderChart() {
    // if (this.state.time) {
      return (
        <LineChart
          data={dataTime}
          width={Dimensions.get('screen').width}
          height={Dimensions.get('screen').height / 4}
          chartConfig={chartConfig}

        />
      )
    // }

    // if (this.state.work) {
    //   return (
    //     <BarChart
    //       data={dataLab}
    //       width={Dimensions.get('screen').width}
    //       height={Dimensions.get('screen').height / 3}
    //       chartConfig={chartConfig}

    //     />
    //   )
    // }

    // if (this.state.lab) {
    //   return (
    //     <PieChart
    //       data={dataWork}
    //       width={Dimensions.get('screen').width}
    //       height={Dimensions.get('screen').height / 3}
    //       chartConfig={chartConfig}
    //       accessor="population"
    //       backgroundColor="transparent"
    //       paddingLeft="30"

    //     />
    //   )
    // }
  }
  renderItem(item) {

    return (
      <Card style={{ height: Dimensions.get('screen').height / 7 }}>
        <CardItem style={{ justifyContent: 'space-between' }}>
          <Text style={{ fontWeight: 'bold', color: '#7EDAD1', fontSize: 12 }}> بیمار: {item.name}</Text>
          <View style={{ flexDirection: 'row' }}>
            <Icon name='md-calendar' style={{ fontSize: 10 }} />
            <Text style={{ paddingRight: 5, fontSize: 10 }}>{item.date}</Text>
          </View>
        </CardItem>
        <CardItem style={{ justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 10 }}> پزشک : {item.labName} </Text>
          <Text style={{ fontSize: 10 }}>نوع کار : {item.workType} </Text>
        </CardItem>
        <CardItem style={{ justifyContent: 'space-between' }}>
          <Button rounded style={{ justifyContent: 'center', height: 25, backgroundColor: '#ffffff', borderWidth: 1, borderColor: 'black', width: Dimensions.get('screen').width / 3 }}>
            <SvgUri
              style={{ justifyContent: 'center', alignSelf: 'center' }}
              width="20"
              height="20"
              svgXmlData='<?xml version="1.0" encoding="iso-8859-1"?><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><g><g><path d="M494.479,138.557L364.04,3.018C362.183,1.09,359.621,0,356.945,0h-194.41c-21.757,0-39.458,17.694-39.458,39.442v137.789H44.29c-16.278,0-29.521,13.239-29.521,29.513v147.744C14.769,370.761,28.012,384,44.29,384h78.787v88.627c0,21.71,17.701,39.373,39.458,39.373h295.238c21.757,0,39.458-17.653,39.458-39.351V145.385C497.231,142.839,496.244,140.392,494.479,138.557z M359.385,26.581l107.079,111.265H359.385V26.581z M44.29,364.308c-5.42,0-9.828-4.405-9.828-9.82V206.744c0-5.415,4.409-9.821,9.828-9.821h265.882c5.42,0,9.828,4.406,9.828,9.821v147.744c0,5.415-4.409,9.82-9.828,9.82H44.29z M477.538,472.649c0,10.84-8.867,19.659-19.766,19.659H162.535c-10.899,0-19.766-8.828-19.766-19.68V384h167.403c16.278,0,29.521-13.239,29.521-29.512V206.744c0-16.274-13.243-29.513-29.521-29.513H142.769V39.442c0-10.891,8.867-19.75,19.766-19.75h177.157v128c0,5.438,4.409,9.846,9.846,9.846h128V472.649z"/></g></g><g><g><path d="M132.481,249.894c-3.269-4.25-7.327-7.01-12.173-8.279c-3.154-0.846-9.923-1.269-20.308-1.269H72.596v84.577h17.077v-31.904h11.135c7.731,0,13.635-0.404,17.712-1.212c3-0.654,5.952-1.99,8.856-4.01c2.904-2.019,5.298-4.798,7.183-8.336c1.885-3.538,2.827-7.904,2.827-13.096C137.385,259.634,135.75,254.144,132.481,249.894z M117.856,273.173c-1.288,1.885-3.067,3.269-5.337,4.154s-6.769,1.327-13.5,1.327h-9.346v-24h8.25c6.154,0,10.25,0.192,12.288,0.577c2.769,0.5,5.058,1.75,6.865,3.75c1.808,2,2.712,4.539,2.712,7.615C119.789,269.096,119.144,271.288,117.856,273.173z"/></g></g><g><g><path d="M219.481,263.452c-1.846-5.404-4.539-9.971-8.077-13.702s-7.789-6.327-12.75-7.789c-3.692-1.077-9.058-1.615-16.096-1.615h-31.212v84.577h32.135c6.308,0,11.346-0.596,15.115-1.789c5.039-1.615,9.039-3.865,12-6.75c3.923-3.808,6.942-8.788,9.058-14.942c1.731-5.039,2.596-11.039,2.596-18C222.25,275.519,221.327,268.856,219.481,263.452z M202.865,298.183c-1.154,3.789-2.644,6.51-4.471,8.163c-1.827,1.654-4.125,2.827-6.894,3.519c-2.115,0.539-5.558,0.808-10.327,0.808h-12.75v0v-56.019h7.673c6.961,0,11.635,0.269,14.019,0.808c3.192,0.692,5.827,2.019,7.904,3.981c2.077,1.962,3.692,4.692,4.846,8.192c1.154,3.5,1.731,8.519,1.731,15.058C204.596,289.231,204.019,294.394,202.865,298.183z"/></g></g><g><g><polygon points="294.827,254.654 294.827,240.346 236.846,240.346 236.846,324.923 253.923,324.923 253.923,288.981 289.231,288.981 289.231,274.673 253.923,274.673 253.923,254.654 		"/></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>'
              // source={require('./../../../assets/img/svg/pdf.svg')}
              fill='#000000'
            />
            {/* <Icon name="ios-arrow-back" style={{ fontSize: 6 }} color='#000000' /> */}
            <Text style={{ color: 'black', fontSize: 10 }}>دریافت فایل</Text>

          </Button>
          <Button rounded style={{ height: 25, backgroundColor: '#7EDAD1', width: Dimensions.get('screen').width / 3 }}
          onPress={()=>this.comeSoon()}>
            <Text style={{ color: 'black', fontSize: 10, justifyContent: 'center', color: '#ffffff' }}>مشاهده جزئیات</Text>
            <Icon name="ios-arrow-back" style={{ fontSize: 10 }} color='#000000' />
          </Button>
        </CardItem>
      </Card>
    )

  }

  renderItemTechList(item) {
    if (item.id != 0)
      return (
        <Card style={{ height: Dimensions.get('screen').height / 8 }}>
          <Row style={{ alignItems: 'center' }}>
            <Col>
              <Image activeOpacity={0.7} resizeMode="cover" style={{
                borderRadius: 10,
                width: imageSize,
                height: imageSize,
                borderWidth: 1,
                borderColor: 'gray'
              }}
                source={{ uri: 'http://89.32.249.208:8090'+item.profilePicUrl }}
              />
            </Col>
            <Col>
              <Text style={{ textAlign: 'left' }}>{item.name}</Text>
            </Col>
            <Col>
              <Button rounded style={{ height: 25, backgroundColor: '#7EDAD1', width: Dimensions.get('screen').width / 4 }}>
                <Text style={{ color: 'black', fontSize: 10, justifyContent: 'center', color: '#ffffff' }}>مشاهده جزئیات</Text>
                <Icon name="ios-arrow-back" style={{ fontSize: 10 }} color='#000000' />
              </Button>
            </Col>
          </Row>
        </Card>
      )
    else
      return (
        <View style={{ height: Dimensions.get('screen').height / 3, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Image source={require('./../../../assets/img/png/header8.png')} style={{ height: '100%', width: '100%' }} resizeMode='cover' />
        </View>)
  }

  renderPage() {
    if (this.state.mode == 'order') {
      return (
        <Grid >
            <Row size={2} ><Image source={require('./../../../assets/img/png/header2.png')} style={{ height: '100%', width: '100%' }} resizeMode='cover' /></Row>
            <Row size={1} >
                <Col size={5} style={{ padding: 10 }}><Text style={{ alignSelf: 'center', fontSize: 12 }}>گزارش گیری براساس:</Text></Col>
                <Col size={3}>
                    <Button
                        style={[styles.buttonStyle, (this.state.time) ? { backgroundColor: '#edb831', borderWidth: 0 } : { backgroundColor: '#eee' }]}
                        onPress={() => this.comeSoon()
                        // this.setState({ showTimeSelect: true })
                        }>
                        <SvgUri svgXmlData={report_time} width="25" height="25" fill={(this.state.time) ? '#ffffff' : '#818384'} />
                    </Button>
                    <Text style={styles.textStyle}>بازه زمانی</Text>
                </Col>

                <Col size={3}>
                    <Button
                        style={[styles.buttonStyle, (this.state.lab) ? { backgroundColor: '#edb831', borderWidth: 0 } : { backgroundColor: '#eee' }]}
                        onPress={() => this.comeSoon()
                          // this.setState({ showLabNameSelect: true })
                        }
                    >
                        <SvgUri svgXmlData={report_profile} width="30" height="30" fill={(this.state.lab) ? '#ffffff' : '#818384'} />
                    </Button>
                    <Text style={styles.textStyle}>نام پزشک</Text>
                </Col>

                <Col size={3}>
                    <Button
                        style={[styles.buttonStyle, (this.state.work) ? { backgroundColor: '#edb831', borderWidth: 0 } : { backgroundColor: '#eee' }]}
                        onPress={() => this.comeSoon()
                        // this.setState({ showTypeSelect: true })
                        }>
                        <SvgUri svgXmlData={report_type} width="30" height="30" fill={(this.state.work) ? '#ffffff' : '#818384'} />
                    </Button>
                    <Text style={styles.textStyle}>نوع کار</Text>
                </Col>
            </Row>


            <Row size={2} >
                {/* <Card > */}
                {this.renderChart()}
                {/* </Card> */}
            </Row>




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
                                <Button rounded style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#7EDAD1', width: 100 }}
                                    onPress={() => this.setState({
                                        time: true,
                                        showTimeSelect: false
                                    })}>
                                    <Text style={{ textAlign: 'center' }}>تایید</Text>
                                </Button>
                            </Col>
                            <Col style={{ alignItems: 'center', justifyContent: 'center' }}>
                                <Button rounded style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#e7be00', width: 100 }}
                                    onPress={() => this.setState({ showTimeSelect: false, time: false })}>
                                    <Text style={{ textAlign: 'center' }}>انصراف</Text>
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
                                <Text style={{ textAlign: 'center' }}>نام پزشک</Text>
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
                                <Button rounded style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#7EDAD1', width: 100 }}
                                    onPress={() => this.setState({
                                        lab: true,
                                        showLabNameSelect: false
                                    })}>
                                    <Text style={{ textAlign: 'center' }}>تایید</Text>
                                </Button>
                            </Col>
                            <Col style={{ alignItems: 'center', justifyContent: 'center' }}>
                                <Button rounded style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#e7be00', width: 100 }} onPress={() => this.setState({ showLabNameSelect: false, lab: false })}>
                                    <Text style={{ textAlign: 'center' }}>انصراف</Text>
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
                                <Button rounded onPress={() => this.setState({
                                    work: true,
                                    showTypeSelect: false
                                })}
                                    style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#7EDAD1', width: 100 }}>
                                    <Text style={{ textAlign: 'center' }}>تایید</Text>
                                </Button>
                            </Col>
                            <Col style={{ alignItems: 'center', justifyContent: 'center' }}>
                                <Button rounded style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#e7be00', width: 100 }} onPress={() => this.setState({ showTypeSelect: false, work: false })}>
                                    <Text style={{ textAlign: 'center' }}>انصراف</Text>
                                </Button>
                            </Col>
                        </Row>
                    </Col>

                </Row>
            </Dialog>


        </Grid>
    )
    } else if (this.state.mode == 'factor') {
      return (

        <View style={{ flex: 13 ,backgroundColor:'#ffffff'}}>
          <ParallaxScrollView
            backgroundColor="#7EDAD1"
            contentBackGroundColor='#EFF2F6'
            renderFixedHeader={() => <View></View>}
            parallaxHeaderHeight={Dimensions.get('screen').height / 3}

            renderForeground={() => (
              <View style={{ height: Dimensions.get('screen').height / 3, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Image source={require('./../../../assets/img/png/header7.png')} style={{ height: '100%', width: '100%' }} resizeMode='cover' />
              </View>
            )}
          >
            <Col>
              <Col>
                <Item rounded style={{ backgroundColor: '#ffffff' }}>
                  <Input
                    style={{ height: 35, borderRadius: 20, fontSize: 11, textAlign: 'right' }} placeholder="عبارت مورد نظر خود را وارد کنید(نام بیمار)" />
                  <Icon name="ios-search" style={{ fontSize: 20 }} />
                </Item>
                <FlatList
                  data={[{ id: 0 }, { id: 1, name: 'نیما اسکندری', date: '1397/11/26', labName: 'باران', workType: 'PFM' },
                  { id: 2, name: 'نیما اسکندری', date: '1397/11/26', labName: 'باران', workType: 'PFM' },
                  { id: 3, name: 'نیما اسکندری', date: '1397/11/26', labName: 'باران', workType: 'PFM' }]}
                  keyExtractor={(item) => item.id}
                  style={{}}
                  renderItem={
                    ({ item }) => (
                      this.renderItem(item)
                    )
                  }
                />
              </Col>

            </Col>


          </ParallaxScrollView>
          <Button rounded style={{ alignSelf: 'center', marginBottom: 5, height: 40, backgroundColor: '#e7be00' }}>
            <Text style={{ fontSize: 15 }}>دانلود بک آپ سفارش کارهاوفاکتورها</Text>
            <Icon name="ios-arrow-back" color='#ffffff' />
          </Button>

        </View>

        // <KeyboardAwareScrollView>





      )
    } else if (this.state.mode == 'technician') {
      return (
        <Content>
          <ParallaxScrollView
            backgroundColor="#7fbbd2"
            contentBackGroundColor='#EFF2F6'
            parallaxHeaderHeight={Dimensions.get('screen').height / 3}
            renderForeground={() => (
              <View style={{ height: Dimensions.get('screen').height / 3, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Image source={require('./../../../assets/img/png/header8.png')} style={{ height: '100%', width: '100%' }} resizeMode='cover' />
              </View>
            )}
          >
          
            <FlatList
              data={this.props.techs}
              keyExtractor={(item) => item.id}
              style={{}}
              renderItem={
                ({ item }) => (
                  this.renderItemTechList(item)
                )
              }
            />

          </ParallaxScrollView>
        </Content>
      )
    }

  }
  render() {
    if(this.state.loading){
      return(
        <ProgressDialog
              visible={this.state.loading}
              title=""
              message="در حال بارگزاری ..."
            />
      )
    }else{
    return (
      <Container style={styles.container}>

        <HeaderComponent title="گزارش گیری" color="#7EDAD1" />
        <Row style={{ zIndex: 10, flex: 0 }}>
          <Col>
            <Button onPress={() => this.setState({ mode: 'order' })} style={[(this.state.mode == 'order') ? { backgroundColor: '#ffffff' } : { backgroundColor: '#818384' }, { width: '100%', borderRadius: 0, justifyContent: 'center', height: 40 }]}>
              <Text style={[(this.state.mode === 'order') ? { color: '#818384' } : { color: '#ffffff' }, { fontSize: 10 }]}>سفارش کار ها</Text>
            </Button>
          </Col>
          <Col>
            <Button onPress={() => this.setState({ mode: 'factor' })} style={[(this.state.mode == 'factor') ? { backgroundColor: '#ffffff' } : { backgroundColor: '#818384' }, { width: '100%', borderRadius: 0, justifyContent: 'center', height: 40, fontSize: 10 }]}>
              <Text style={[(this.state.mode === 'factor') ? { color: '#818384' } : { color: '#ffffff' }, { fontSize: 10 }]}>فاکتورهای‌پرداخت‌‌ شده</Text>
            </Button>
          </Col>
          <Col>
            <Button onPress={() => this.setState({ mode: 'technician' })} style={[(this.state.mode == 'technician') ? { backgroundColor: '#ffffff' } : { backgroundColor: '#818384' }, { width: '100%', borderRadius: 0, justifyContent: 'center', height: 40, fontSize: 12 }]}>
              <Text style={[(this.state.mode === 'technician') ? { color: '#818384' } : { color: '#ffffff' }, { fontSize: 10 }]}>عملکرد تکنسین ها</Text>
            </Button>
          </Col>
        </Row>
        {this.renderPage()}

      </Container>
    );
    }
  }
}


const chartConfig = {
  backgroundGradientFrom: '#eee',
  backgroundGradientTo: '#eee',
  color: (opacity = 1) => `rgba(127, 187, 210, ${opacity})`
}



const styles = StyleSheet.create({
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
  buttonStyle2: {
    width: 6 * buttonSize / 5,
    height: 6 * buttonSize / 5,
    borderRadius: 3 * buttonSize / 5,
    borderWidth: 1,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textStyle: { textAlign: 'left', color: '#818384', paddingTop: 5, fontSize: 12 },
  textStyle2: { color: '#818384', paddingTop: 5, fontSize: 12, alignSelf: 'center' }
});


function mapStateToProps(state, props) {
  return {
    loading: state.LabReducer.loading,
    billPay: state.LabReducer.billPay,
    techs:state.LabReducer.techs
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
      getAllTech,
      getBillPays
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportScreen);