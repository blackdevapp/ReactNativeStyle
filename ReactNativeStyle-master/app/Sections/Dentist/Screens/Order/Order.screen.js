import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import {
  Container, Content, Textarea, Item, Label, Input, Text, Button, Card,
  Badge, Picker, Spinner, Header, Left, Right, Body, Icon, Title
} from 'native-base';
import SvgUri from 'react-native-svg-uri';
import HeaderComponent from '../../../../Components/Header.component'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getAllConnectedLabs, getAllProductLabOrder, getAddress,getPricePlan, addOrderLineItem, addOrderLineItemAndOrder, showLoading } from '../../Redux/Actions/Order.action'; //Import your actions

// import { ProgressDialog } from 'react-native-simple-dialogs'
import TopRight from './topRight';
import TopLeft from './topLeft';
import BottomRight from './bottomRight';
import BottomLeft from './bottomLeft';
import { order_time, order_calender } from '../../../../assets/img/svg/SvgXml'
import Snackbar from 'react-native-snackbar';

var moment = require('moment-jalaali')

const initialState = {

}
class OrderScreen extends Component {
  constructor(props) {
    let brTeeth = [];
    let blTeeth = [];
    let trTeeth = [];
    let tlTeeth = [];
    super(props)
    this.state = {
      reset:false,
      loading: false,
      labName: '',
      serviceId: '',
      labSelected: {
        id: '',
        labName: ''
      },
      fullName: '',
      today: '',
      time: '',
      description: '',
      laboratoryId: '',
      chosenPricePlan: undefined,
      chosenSelected: {
        key: '',
        value: {}
      },
      product: undefined,
      classId: '',
      labId: '',
    }
  }
  componentWillMount() {
    // alert('omad')
  }
  componentDidMount() {
    var today = new Date();
    var m = today.getMinutes()
    if (m < 10) {
      m = '0' + m
    }
    var time = today.getHours() + ':' + m
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();

    if (dd < 10) {
      dd = '0' + dd
    }

    if (mm < 10) {
      mm = '0' + mm
    }
    this.props.getAddress()

    today = yyyy + '/' + mm + '/' + dd;
    m = moment(today, 'YYYY/M/D')
    today = m.format('jYYYY/jM/jD')
    this.setState({
      time: time,
      today: today
    })
    this.props.getAllConnectedLabs()

  }

  selectLab(value) {
    if (value) {
      this.props.getAllProductLabOrder(value.id, value.subscribers[0].priceClassId)
      this.setState({
        labSelected: value,
        classId: value.subscribers[0].priceClassId,
        laboratoryId: value.id,
        labName: value.labName
      });
    }
  }
  onValueChange(value) {
    if (value) {
      this.setState({
        classId: value.subscribers[0].priceClassId,
        labId: value.id
      });
    }
  }
  selectPricePlan(value) {
    if (value) {
      this.setState({
        chosenPricePlan: value.value,
        chosenSelected: value
      })
    }
  }
  selectProduct(value) {
    if (value) {
      this.props.navigation.navigate('DynamicForm', { serviceId: value.serviceId })
      this.props.getPricePlan(this.state.laboratoryId, this.state.classId, value.id)
      this.setState({
        product: value,
        serviceId: value.serviceId
      });
    }
  }
  onSelectedItemsChange = (selectedItems) => {
    this.setState({ selectedItems });
  }

  topRightCall = (teeth) => {
    this.trTeeth = teeth
  }
  topLeftCall = (teeth) => {
    this.tlTeeth = teeth
  }
  bottomRightCall = (teeth) => {
    this.brTeeth = teeth

  }
  bottomLeftCall = (teeth) => {
    this.blTeeth = teeth
  }

  renderTeeth() {
    return (
      <Grid>
        <Row style={{ borderBottomColor: 'black' }}>
          <TopRight topRightCallBack={this.topRightCall} teeth={this.state.reset} />
          <TopLeft topLeftCallBack={this.topLeftCall} teeth={this.state.reset}/>
        </Row>
        <Row style={{ borderTopColor: 'black' }}>
          <BottomRight bottomRightCallBack={this.bottomRightCall} teeth={this.state.reset}/>
          <BottomLeft bottomLeftCallBack={this.bottomLeftCall} teeth={this.state.reset}/>
        </Row>
      </Grid>
    )
  }

  newOrderLineItem() {
    
    let teethNumbers = [];
    if (this.tlTeeth) {
      for (let item of this.tlTeeth) {
        teethNumbers.push(item)
      }
    }
    if (this.trTeeth) {
      for (let item of this.trTeeth) {
        teethNumbers.push(item + 8)
      }
    }
    if (this.brTeeth) {
      for (let item of this.brTeeth) {
        teethNumbers.push(item + 16)
      }
    }
    if (this.blTeeth) {
      for (let item of this.blTeeth) {
        teethNumbers.push(item + 24)
      }
    }
    if (this.state.chosenPricePlan && this.state.product && teethNumbers.length > 0) {
      if (this.props.form) {
        orderLineItem = {
          listOfWorkstepDentistCheck: [],
          workstepDentistCheckHistory: [],
          chosenPricePlan: this.state.chosenPricePlan,
          teethNumbers: teethNumbers,
          quantity: teethNumbers.length,
          product: this.state.product,
          buildOrders: [this.props.form]
        }
        this.props.addOrderLineItem(orderLineItem)
        this.setState({
          chosenPricePlan: {},
          product: undefined,
          reset:true
        })
        let self=this;
        setTimeout(function(){
          self.setState({
            reset:false
          })
        },1500)
      } else {
        Snackbar.show({
          title: 'لطفا جزییات سفارش خود را ثبت نمایید!',
          duration: 4500,
          backgroundColor: 'red'
        });
        this.props.navigation.navigate('DynamicForm', { serviceId: this.state.serviceId })
      }
    } else {
      Snackbar.show({
        title: 'پس از تکمیل اطلاعات سفارش اقدام به ثبت آن نمایید',
        duration: 4500,
        backgroundColor: 'red'
      });
    }
  }

  goToPreview() {
    if(this.props.address.length>0){
      if(this.props.order.orderLineItems.length>0){
        if ( this.state.fullName && this.state.description && this.state.laboratoryId,this.state.labName) {
          this.props.addOrderLineItemAndOrder(this.state.fullName, this.state.description, this.state.laboratoryId, this.state.labName)
          this.props.navigation.navigate('OrderPreviewScreen')
          this.setState({
            chosenPricePlan: undefined,
            product: undefined,
          })
        }else{
  Snackbar.show({
        title: 'پس از تکمیل اطلاعات سفارش اقدام به پیش روی نمایید',
        duration: 4500,
        backgroundColor: 'red'
      });
      
        }
      }else{
        Snackbar.show({
          title: 'ابتدا سفارشی را به لیست سفارشات خود اضافه کنید!',
          duration: 4500,
          backgroundColor: 'red'
        });
      }
    }else{
      Snackbar.show({
        title: 'ابتدا از قسمت ویرایش پروفایل آدرس مطب خود را وارد کنید!',
        duration: 4500,
        backgroundColor: 'red'
      });
    }
    
  }
  render() {
    return (
      <Container style={{ backgroundColor: '#e8e8e8' }}>
        <HeaderComponent title="سفارش جدید" />
        <Content>
          <Grid style={{ margin: 2 }}>
            <Row style={{ borderColor: 'red' }}>
              <Col style={{ alignItems: 'flex-start' }}>
                <Row>
                  <Col style={{ alignItems: 'flex-end', padding: 5,fontSize:13 }} size={30}><Text>{this.state.time}</Text></Col>
                  <Col style={{ alignItems: 'flex-start', padding: 5 }} size={70}><SvgUri height='15' width='15' svgXmlData={order_time} fill='black' /></Col>
                </Row>
              </Col>
              <Col style={{ alignItems: 'flex-end' }}>
                <Row>
                  <Col size={70} style={{ padding: 5, alignItems: 'flex-end', }}><Text>{this.state.today}</Text></Col>
                  <Col size={30} style={{ padding: 5, alignItems: 'flex-start' }}><SvgUri height='15' width='15' svgXmlData={order_calender} fill='black' /></Col>
                </Row>
              </Col>
            </Row>

            <Row style={{ justifyContent: 'center', borderColor: 'red' }}>
              <Col style={{ padding: 5, alignItems: 'center' }}>
                <Item style={[styles.itemInput1]}>
                  <Input
                    style={[styles.Input]}
                    placeholder='نام بیمار را تایپ کنید'
                    onChangeText={(text) => this.setState({
                      fullName: text
                    })} />
                </Item>
              </Col>
            </Row>




            <Row style={{ borderColor: 'red' }}>
              <Col style={{ paddingVertical: 5, alignItems: 'center' }}>
                <Item style={[styles.itemInput1]}>
                  <Picker
                    enabled={this.props.order.orderLineItems.length == 0}
                    placeholder='نام لابراتوار را انتخاب کنید'
                    selectedValue={this.state.labSelected}
                    onValueChange={this.selectLab.bind(this)}
                    style={styles.Input}
                    renderHeader={backAction =>
                      <Header style={{ backgroundColor: "#7fbbd2" }}>
                        <Left />
                        <Body style={{ flex: 3 }}>
                          <Title style={{ color: "#fff", fontSize: 15 }}>لطفا لابراتور مورد نظر را انتخاب کنید</Title>
                        </Body>
                        <Right >
                          <Button transparent onPress={backAction}>
                            <Icon name="arrow-back" style={{ color: "#fff" }} />
                          </Button>
                        </Right>
                      </Header>}>
                    <Picker.Item label="لابراتور مورد نظر را انتخاب کنید" disabled />
                    {this.props.connectedLabs.map(item => (
                      <Picker.Item label={item.labName} value={item} />
                    ))}
                  </Picker>
                  {Platform.OS === 'ios' && <Icon name='arrow-dropdown' style={{ position: 'absolute', right: 10 }} />}
                </Item>
              </Col>
            </Row>
          </Grid>





          <Card style={{ paddingVertical: 20 }}>
            {this.renderTeeth()}
          </Card>





          {this.props.products.length > 0 ?
            <Row style={{ justifyContent: 'center' }}>
              <Col style={{ paddingVertical: 5, alignItems: 'center' }}>
                <Item style={[styles.itemInput1]}>
                  <Picker
                    placeholder='نوع کار را انتخاب کنید'
                    selectedValue={this.state.product}
                    onValueChange={this.selectProduct.bind(this)}
                    style={styles.Input}
                    renderHeader={backAction =>
                      <Header style={{ backgroundColor: "#7fbbd2" }}>
                        <Left />
                        <Body style={{ flex: 3 }}>
                          <Title style={{ color: "#fff", fontSize: 15 }}>لطفا نوع کار مورد نظر را انتخاب کنید</Title>
                        </Body>
                        <Right >
                          <Button transparent onPress={backAction}>
                            <Icon name="arrow-back" style={{ color: "#fff" }} />
                          </Button>
                        </Right>
                      </Header>}>
                    <Picker.Item label="نوع کار را انتخاب کنید" disabled />
                    {this.props.products.map(item => (
                      <Picker.Item label={item.productName} value={item} />
                    ))}
                  </Picker>
                  {Platform.OS === 'ios' && <Icon name='arrow-dropdown' style={{ position: 'absolute', right: 10 }} />}
                </Item>
              </Col>
              {this.state.product?<Col style={{ paddingHorizontal: 15, paddingVertical: 10 }}>
              <Button rounded warning block style={{ height: 30 }}
                onPress={() => this.props.navigation.navigate('DynamicForm', { serviceId: this.state.serviceId })}>
                <Text style={{ fontSize: 11 }}>جزییات سفارش</Text>
              </Button>
            </Col>:null}
            </Row> : null}




          {this.props.pricePlan.length > 0 && this.state.classId.length > 0 ?
            <Row style={{ justifyContent: 'center' }}>
              <Col style={{ paddingVertical: 5, alignItems: 'center' }}>
                <Item style={[styles.itemInput1]}>
                  <Picker
                    placeholder='تعرفه'
                    selectedValue={this.state.chosenSelected}
                    onValueChange={this.selectPricePlan.bind(this)}
                    style={styles.Input}
                    renderHeader={backAction =>
                      <Header style={{ backgroundColor: "#7fbbd2" }}>
                        <Left />
                        <Body style={{ flex: 3 }}>
                          <Title style={{ color: "#fff" }}>لطفا تعرفه مورد نظر را انتخاب کنید</Title>
                        </Body>
                        <Right>
                          <Button transparent onPress={backAction}>
                            <Icon name="arrow-back" style={{ color: "#fff" }} />
                          </Button>
                        </Right>
                      </Header>}>
                    <Picker.Item label="تعرفه مورد نظر را انتخاب کنید" disabled />
                    {this.props.pricePlan.map(item => (
                      <Picker.Item label={`${item.key}-${item.value.cost} ریال`} value={item} />
                    ))}
                  </Picker>
                  {Platform.OS === 'ios' && <Icon name='arrow-dropdown' style={{ position: 'absolute', right: 10 }} />}
                </Item>
              </Col>
            </Row> : null
          }


          <Row style={{ marginTop: 5 }}>
            <Col >
              <Row style={{ flexDirection: 'column', alignItems: 'center' }}>
                <TouchableOpacity block transparent onPress={() => this.props.navigation.navigate('TakeVideo')}>
                  <SvgUri
                    height='50'
                    width='50'
                    svgXmlData='<?xml version="1.0" encoding="iso-8859-1"?><svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"viewBox="0 0 58 58" style="enable-background:new 0 0 58 58;" xml:space="preserve"><g><path d="M36.537,28.156l-11-7c-0.308-0.195-0.698-0.208-1.019-0.033C24.199,21.299,24,21.635,24,22v14c0,0.365,0.199,0.701,0.519,0.877C24.669,36.959,24.834,37,25,37c0.187,0,0.374-0.053,0.537-0.156l11-7C36.825,29.66,37,29.342,37,29S36.825,28.34,36.537,28.156z M26,34.179V23.821L34.137,29L26,34.179z"/><path d="M57,6H47H11H1C0.448,6,0,6.447,0,7v11v11v11v11c0,0.553,0.448,1,1,1h10h36h10c0.552,0,1-0.447,1-1V40V29V18V7C58,6.447,57.552,6,57,6z M10,28H2v-9h8V28z M2,30h8v9H2V30z M12,40V29V18V8h34v10v11v11v10H12V40z M56,28h-8v-9h8V28z M48,30h8v9h-8V30z M56,8v9h-8V8H56z M2,8h8v9H2V8z M2,50v-9h8v9H2z M56,50h-8v-9h8V50z"/></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>                    '
                  // source={require('./../../../../assets/img/svg/video-player.svg')}
                  />
                </TouchableOpacity>
                <Text style={{ fontSize: 10 }}> توضیح ویدئویی</Text>
              </Row>

            </Col>

            <Col >
              <Row style={{ flexDirection: 'column', alignItems: 'center' }}>
                <TouchableOpacity block transparent onPress={() => this.props.navigation.navigate('VoiceRecorder')}>
                  <SvgUri
                    height='50'
                    width='50'
                    svgXmlData='<?xml version="1.0" encoding="iso-8859-1"?><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"viewBox="0 0 512.001 512.001" style="enable-background:new 0 0 512.001 512.001;" xml:space="preserve"><g><g><path d="M412.113,170.747c-6.637,0-12.02,5.381-12.02,12.02v75.104c0,79.452-64.639,144.09-144.092,144.09S111.91,337.321,111.91,257.87v-75.104c0-6.639-5.383-12.02-12.02-12.02c-6.639,0-12.02,5.381-12.02,12.02v75.104c0,88.666,68.993,161.512,156.111,167.696v62.395h-62.174c-6.637,0-12.02,5.381-12.02,12.02c0,6.639,5.382,12.02,12.02,12.02h148.386c6.637,0,12.02-5.381,12.02-12.02c0-6.639-5.382-12.02-12.02-12.02H268.02v-62.395c87.119-6.184,156.111-79.031,156.111-167.696v-75.104C424.133,176.128,418.75,170.747,412.113,170.747z"/></g></g><g><g><path d="M264.011,0h-16.02c-54.949,0-99.653,44.704-99.653,99.653V265.88c0,54.949,44.704,99.653,99.653,99.653h16.02c54.949,0,99.653-44.704,99.653-99.653V99.653C363.664,44.704,318.96,0,264.011,0z M339.625,130.853h-43.572c-6.639,0-12.02,5.381-12.02,12.02c0,6.639,5.381,12.02,12.02,12.02h43.572v33.458h-43.572c-6.639,0-12.02,5.381-12.02,12.02s5.381,12.02,12.02,12.02h43.572v33.46h-43.572c-6.639,0-12.02,5.381-12.02,12.02s5.381,12.02,12.02,12.02h43.464c-2.091,39.836-35.157,71.603-75.505,71.603h-16.02c-40.348,0-73.414-31.767-75.505-71.603h43.464c6.639,0,12.02-5.381,12.02-12.02s-5.381-12.02-12.02-12.02h-43.572v-33.46h43.572c6.639,0,12.02-5.381,12.02-12.02s-5.381-12.02-12.02-12.02h-43.572v-33.458h43.572c6.639,0,12.02-5.381,12.02-12.02c0-6.639-5.381-12.02-12.02-12.02h-43.572v-31.2c0-29.964,17.52-55.914,42.854-68.143v33.983c0,6.639,5.382,12.02,12.02,12.02s12.02-5.381,12.02-12.02V24.558c2.863-0.331,30.595-0.331,33.458,0v40.935c0,6.639,5.381,12.02,12.02,12.02c6.637,0,12.02-5.381,12.02-12.02V31.51c25.334,12.229,42.854,38.177,42.854,68.142V130.853z"/></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>                    '
                  // source={require('./../../../../assets/img/svg/microphone.svg')}
                  />
                </TouchableOpacity>
                <Text style={{ fontSize: 10 }}>توضیح صوتی</Text>
              </Row>
            </Col>

            <Col >
              <Row style={{ flexDirection: 'column', alignItems: 'center' }}>
                <TouchableOpacity block transparent onPress={() => this.props.navigation.navigate('TakePicture')}>
                  <SvgUri
                    height='50'
                    width='50'
                    svgXmlData='<?xml version="1.0" encoding="iso-8859-1"?><svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"viewBox="0 0 60 60" style="enable-background:new 0 0 60 60;" xml:space="preserve"><g><path d="M55.201,15.5h-8.524l-4-10H17.323l-4,10H12v-5H6v5H4.799C2.152,15.5,0,17.652,0,20.299v29.368C0,52.332,2.168,54.5,4.833,54.5h50.334c2.665,0,4.833-2.168,4.833-4.833V20.299C60,17.652,57.848,15.5,55.201,15.5z M8,12.5h2v3H8V12.5z M58,49.667c0,1.563-1.271,2.833-2.833,2.833H4.833C3.271,52.5,2,51.229,2,49.667V20.299C2,18.756,3.256,17.5,4.799,17.5H6h6h2.677l4-10h22.646l4,10h9.878c1.543,0,2.799,1.256,2.799,2.799V49.667z"/><path d="M30,14.5c-9.925,0-18,8.075-18,18s8.075,18,18,18s18-8.075,18-18S39.925,14.5,30,14.5z M30,48.5c-8.822,0-16-7.178-16-16s7.178-16,16-16s16,7.178,16,16S38.822,48.5,30,48.5z"/><path d="M30,20.5c-6.617,0-12,5.383-12,12s5.383,12,12,12s12-5.383,12-12S36.617,20.5,30,20.5z M30,42.5c-5.514,0-10-4.486-10-10s4.486-10,10-10s10,4.486,10,10S35.514,42.5,30,42.5z"/><path d="M52,19.5c-2.206,0-4,1.794-4,4s1.794,4,4,4s4-1.794,4-4S54.206,19.5,52,19.5z M52,25.5c-1.103,0-2-0.897-2-2s0.897-2,2-2s2,0.897,2,2S53.103,25.5,52,25.5z"/></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>                    '
                  // source={require('./../../../../assets/img/svg/photo-camera.svg')}
                  />
                </TouchableOpacity>
                <Text style={{ fontSize: 10 }}>توضیح تصویری</Text>
              </Row>
            </Col>
          </Row>



          <Row>
            <Col style={{ padding: 5, alignItems: 'center' }}>
              <Textarea rowSpan={3} bordered placeholder="توضیحات"
                style={{ borderRadius: 10, backgroundColor: 'white', textAlign: 'right', padding: 10, width: '94%' }}
                onChangeText={(text) => this.setState({
                  description: text
                })} />
            </Col>
          </Row>



          <Row>
            <Col style={{ paddingHorizontal: 15, paddingVertical: 10 }}>
              <Button rounded warning block style={{ height: 30 }}
                onPress={() => this.newOrderLineItem()}>
                <Text style={{ fontSize: 11 }}>افزودن به سفارشات</Text>
              </Button>
            </Col>
            {this.props.order.orderLineItems.length > 0 ?
            <Col style={{ paddingHorizontal: 15, paddingVertical: 10 }}>
              <Button rounded info block
                style={{ backgroundColor: '#7fbbd2', height: 30 }} onPress={() => {
                  this.goToPreview()
                }}>
                {this.props.order.orderLineItems.length > 0 ?
                  <Badge style={{ justifyContent: 'center' }}>
                    <Text>{this.props.order.orderLineItems.length}</Text>
                  </Badge> : null}
                <Text style={{ fontSize: 11 }}>نمایش و ثبت نهایی</Text>
              </Button>
            </Col>:null}
          </Row>
          <Row>
            <Col></Col>
          </Row>

        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  colContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5
  },
  picker: {
    width: '100%',
    fontSize: 10,
    borderRadius: 25,
    backgroundColor: 'white'
  },
  buttonActive: {
    backgroundColor: 'orange',
    margin: 1,
    width: 25,
    height: 25,
    borderColor: 'red',
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
    borderColor: 'red',
    fontSize: 10,
    zIndex: 1,
    height: 15,
    width: 30,

    textAlign: 'center',
    textAlignVertical: 'center'
  },
  itemInput1: {
    borderRadius: 25,
    // borderColor: 'red',
    backgroundColor: '#FFF',
    height: 45,
    width: '94%',
    padding: 2

  },
  Input: {
    textAlign: 'right',
    padding: 2,
    fontSize: 15,
    borderColor: 'red',
    justifyContent: 'flex-start'
  }
});

function mapStateToProps(state, props) {
  return {
    loading: state.OrderReducer.loading,
    connectedLabs: state.OrderReducer.connectedLabs,
    products: state.OrderReducer.products,
    form: state.OrderReducer.form,
    pricePlan: state.OrderReducer.pricePlan,
    order: state.OrderReducer.order,
    address: state.OrderReducer.address,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getAllConnectedLabs,
    getAllProductLabOrder,
    getPricePlan,
    addOrderLineItem,
    getAddress,
    addOrderLineItemAndOrder,
    showLoading
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderScreen);