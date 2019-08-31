import React, { PureComponent } from 'react';
import { FlatList, StyleSheet, Image, Dimensions, TouchableOpacity, Modal, InteractionManager, Linking } from 'react-native';
import { Row, Grid, Col } from 'react-native-easy-grid'
import {
  Container, View, Header, Textarea, Content, Footer, FooterTab,
  Button, Card, CardItem, Item, Input, Label,
  Left, Body, Right, Icon, Text, Badge
} from 'native-base';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getAllBill } from '../Redux/Actions/Bill.action'; //Import your actions
import { ListItem, Avatar } from 'react-native-elements'
import { Dialog, ProgressDialog } from 'react-native-simple-dialogs';
import HeaderComponent from '../../../Components/Header.component'
var moment = require('moment-jalaali')

const extractKey = ({ id }) => id

class BillScreen extends PureComponent {
  constructor(props) {
    super(props);
    // alert(JSON.stringify(this.props.navigation))
    this.state = {
      loading: true,
      payModal: false,
      payDialog: false,
      description:'',
      phoneNumber:'',
      bill: {
        totalCost: '',
        billItems: [
          {
            patientInfo: {
              fullName: ''
            },
            orderLineItem: {
              product: {},
              chosenPricePlan: {
                cost: ''
              },
            }
          }
        ]
      }
    };
  }
  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({
        loading: false
      })
    });
    // if(this.props.focused){
    this.props.getAllBill('')
    // }
  }
  renderItem = ({ item }) => {

    return (
      <TouchableOpacity
        key={item.id}
        style={styles.row}>
        {/* <Grid style={{flex:1}}> */}
        <Card>
          <CardItem>
            <Body>
              <Row>
                <Col size={2} style={{ alignItems: 'center', justifyContent: 'center' }}>
                  {/* <Avatar
                    size="medium"
                    rounded
                    source={{ uri: `http://89.32.249.208:8090${item.laboratory.user.profilePic.profilePicUrl}` }}
                    onPress={() => console.log("Works!")}
                    activeOpacity={0.7}
                  /> */}
                  {item.laboratory.user.profilePic?<Image activeOpacity={0.7} resizeMode="cover" style={{ borderRadius: 20, width: '85%', height: '85%', borderWidth: 1, borderColor: 'gray' }}
                    source={{ uri: `http://89.32.249.208:8090${item.laboratory.user.profilePic.profilePicUrl}` }}
                  />:<Image activeOpacity={0.7} resizeMode="cover" style={{ borderRadius: 20, width: '85%', height: '85%', borderWidth: 1, borderColor: 'gray' }}
                  source={{ uri: `http://s8.picofile.com/file/8342161734/lab_images2.png` }}
                  defaultSource={require('./../../../assets/img/png/image.png')}
                />}
                  {/* <Image activeOpacity={0.7} resizeMode="cover" style={{ borderRadius: 20, width: '85%', height: '85%', borderWidth: 1, borderColor: 'gray' }}
                    source={{ uri: `http://89.32.249.208:8090${item.laboratory.user.profilePic.profilePicUrl}` }}
                  /> */}

                  {/* <SvgUri width="30" height="30" source={require("../../assets/images/recieve.svg")} /> */}
                </Col>
                <Col size={4} style={{ alignItems: 'flex-start' }}>
                  <Text style={{ fontSize: 15, color: '#80bcd3' }}>{item.labName}</Text>
                  <Text style={{ fontSize: 12 }}>شماره فاکتور:{item.billNo}</Text>
                  <Text style={{ fontSize: 13 }}>لابراتوار: {item.laboratory.user.firstname} {item.laboratory.user.lastname} </Text>
                </Col>
                <Col size={3} style={{}}>
                  <Row style={{ paddingBottom: 0 }}>
                    {item.from ? <Text style={{ fontSize: 9 }}>از {item.from}</Text> : null}
                    {item.to ? <Text style={{ fontSize: 9 }}>تا {item.to} </Text> : null}
                  </Row>
                  {item.totalCost ? <Text style={{ fontSize: 10 }}>جمع کل:     {item.totalCost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} تومان</Text> :
                    null}

                  <Button onPress={() => {this.openPayModal(item)}}
                    style={{ width: '100%', justifyContent: 'center', borderRadius: 25, backgroundColor: '#7fbbd2', height: 25 }}>
                    <Text style={{ fontSize: 10 }}>مشاهده جزییات</Text>
                    <Icon style={{ fontSize: 10 }} name='ios-arrow-back' color='#fff' />
                  </Button>

                </Col>
              </Row>

            </Body>
          </CardItem>
        </Card>
        {/* </Grid> */}
      </TouchableOpacity>

    )
  }
  openPayModal(bill){
    for(let item of bill.billItems){
      m = moment(item.orderedDate.substring(0.10), 'YYYY/M/D')
      item.orderedDate = m.format('jYYYY/jM/jD')
    }
    this.setState({ payModal: true, bill: bill })
  }

  handleRefresh = () => {

    this.props.getAllBill('')

  }
  onEndReached = () => {

  }

  renderHeader() {
    return (
      <View style={{ flexDirection: 'row', width: '100%' }}>
        <Text style={[styles.tableHeader, { borderRightWidth: 1 }]}>ردیف</Text>
        <Text style={styles.tableHeader}>تاریخ</Text>
        <Text style={styles.tableHeader}>نوع کار</Text>
        <Text style={styles.tableHeader}>نام بیمار</Text>
        <Text style={styles.tableHeader}>تعداد</Text>
        <Text style={styles.tableHeader}>کد سفارش</Text>
        <Text style={styles.tableHeader}>فی</Text>
        <Text style={styles.tableHeader}>قیمت</Text>
      </View>
    );
  }


  renderRow(data) {

    return (
      <View style={{ flexDirection: 'column', width: '100%' }}>
        {
          data.map((item, index) => {
            let rowColor = index % 2 == 0 ? '#F1F2F6' : '#FFFFFF'
            return (
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} key={index.toString()}>
                <Text style={[styles.tableRow, { backgroundColor: rowColor, fontSize: 8 }]}>{index + 1}</Text>
                <Text style={[styles.tableRow, { backgroundColor: rowColor, fontSize: 9 }]}>{item.orderedDate}</Text>
                <Text style={[styles.tableRow, { backgroundColor: rowColor, fontSize: 10 }]}>{item.orderLineItem.product.productName}</Text>
                <Text style={[styles.tableRow, { backgroundColor: rowColor, fontSize: 8 }]}>{item.patientInfo.fullName}</Text>
                <Text style={[styles.tableRow, { backgroundColor: rowColor, fontSize: 9 }]}>{item.orderLineItem.quantity}</Text>
                <Text style={[styles.tableRow, { backgroundColor: rowColor, fontSize: 9 }]}>{item.orderLineItem.quantity}</Text>
                <Text style={[styles.tableRow, { backgroundColor: rowColor, fontSize: 9 }]}>{item.orderLineItem.quantity}</Text>
                <Text style={[styles.tableRow, { backgroundColor: rowColor, fontSize: 10 }]}>{item.orderLineItem.chosenPricePlan.cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
              </View>
            )
          }
          )
        }
      </View>
    );
  }
  renderPayModal() {
    // alert(JSON.stringify(this.state.bill,null,5))

    return (
      <Container style={{ paddingHorizontal: 5, paddingVertical: 5, backgroundColor: '#f4f4f4' }}>
        {this.renderHeader()}
        {this.renderRow(this.state.bill.billItems)}

        {/* <Grid > */}
        <Row style={{ flex: 0 }}>
          <Col style={{ backgroundColor: '#9C9C9C' }} size={4}><Text style={{ color: '#fff', fontSize: 15, textAlign: 'right' }}>جمع کل  </Text></Col>
          <Col style={{ backgroundColor: '#e7be00' }} size={1}><Text style={{ fontSize: 12 }}>{this.state.bill.totalCost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text></Col>
        </Row>
        <Row style={{ flex: 0 }}>
          <Col >
            <Button block
              style={{
                borderRadius: 20,
                marginVertical: 5,
                marginHorizontal: 10,
                height: 30,
                backgroundColor: '#7fbbd2'
              }}
              onPress={() => this.setState({ payDialog: true })}>
              <Text>پرداخت</Text>
            </Button>
          </Col>
          <Col ><Button block style={{ borderRadius: 20, marginVertical: 5, marginHorizontal: 10, height: 30, backgroundColor: '#868889' }} onPress={() => this.setState({ payModal: false })}><Text>بستن جزئیات</Text><Icon name="ios-arrow-back" /></Button></Col>
        </Row>
        {/* </Grid> */}

      </Container>
    );
  }

//   billId: "5c0904095694d5073dcb957f"
// callback: "http://dentrace.com/#/dentistPanel/financial/dentistFinancial"
// desc: "sddsfdsf"
// phone: "09121213456"

  render() {

    let faktorLabel = `پرداخت فاکتور لابراتوار (${this.state.bill.labName})`

    if (this.state.loading) {
      return (
        <ProgressDialog
          visible={this.state.loading}
          title=""
          message="در حال بارگزاری ..."
        />
      )
    } else {
      return (
        <Container style={{ backgroundColor: '#f4f4f4' }}>
          <HeaderComponent title="صورت حساب های من" />
          <Grid style={{ flex: 1 }}>
            <Row style={{ flex: 1 }}>

              <View style={{ flex: 1 }}>
              {this.props.bills.length>0?<FlatList
                  style={styles.containerRow}
                  data={this.props.bills}
                  renderItem={this.renderItem}
                  keyExtractor={(item,i) => i.toString()}
                  onRefresh={this.handleRefresh}
                  onEndReached={this.onEndReached}
                  refreshing={false}
                  onEndReachedThreshold={0.5}
                />:<View style={{flex:1,flexDirection:'row',justifyContent:'center'}}>
<Text>موردی وجود ندارد</Text>
                </View>}
                
              </View>
            </Row>
          </Grid>
          <Modal animationType="slide"
            transparent={false}
            visible={this.state.payModal}
            onRequestClose={() => {
              this.setState({ payModal: false })
            }}>
            <HeaderComponent title='جزئیات سفارش' />
            {this.renderPayModal()}

            <Dialog
              visible={this.state.payDialog}
              title={faktorLabel}

              contentStyle={{ height: 380 }}
              onTouchOutside={() => this.setState({ payDialog: false })} >
              <View style={{ flex: 1 }}>


                <Row>
                  <Col>
                    <Item floatingLabel >
                      {/* <Label style={{backgroundColor:'red'}}>شماره تلفن همراه</Label> */}
                      <Input keyboardType="number-pad" style={{ textAlign: 'right' }} placeholder='شماره تلفن همراه' onChangeText={(text) => this.setState({ phoneNumber: text })} />
                    </Item>
                  </Col>
                </Row>
                <Row size={2}>
                  <Col style={{ padding: 5 ,justifyContent:'space-between'}}>
                    <Textarea rowSpan={3} bordered 
                    onChangeText={(text)=>this.setState({
                      description:text
                    })}
                    style={{ textAlign: 'right', fontSize: 15 }} placeholder="توضیحات تراکنش" />
                    <Text style={{ fontSize: 15,textAlign:'left' }}>
                      مبلغ قابل پرداخت: {this.state.bill.totalCost}(ریال)
                  </Text>
                  </Col>

                </Row>

                <Row style={{flex:0}}>
                  <Col >
                    <Button block
                      style={{
                        borderRadius: 20,
                        marginVertical: 5,
                        marginHorizontal: 10,
                        height: 30,
                        backgroundColor: '#7fbbd2'
                      }}
                      onPress={() => Linking.openURL('https://www.dentrace.com')}>
                      <Text>تایید</Text>
                    </Button>
                  </Col>
                  <Col >
                    <Button
                      block
                      style={{
                        borderRadius: 20,
                        marginVertical: 5,
                        marginHorizontal: 10,
                        height: 30,
                        backgroundColor: '#868889'
                      }}
                      onPress={() => this.setState({ payDialog: false })}>
                      <Text>انصراف</Text>
                      <Icon name="ios-arrow-back" />
                    </Button>
                  </Col>
                </Row>

              </View>
            </Dialog>
          </Modal>

        </Container>

      );
    }

  }
}

const styles = StyleSheet.create({
  tableHeader: {
    textAlign: 'center',
    color: '#6D6D6D',
    flex: 1,
    alignSelf: 'stretch',
    borderColor: '#6D6D6D',
    borderLeftWidth: 1,
    borderTopWidth: 1,
    fontSize: 10,
    justifyContent: 'center',
    alignSelf: 'center'
  },
  tableRow: {
    textAlign: 'center',
    color: '#6D6D6D',
    flex: 1,
    alignSelf: 'stretch',
    borderColor: '#6D6D6D',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    fontSize: 10
  },
  tdRow: { textAlign: 'center', color: '#000', borderRadius: 5, margin: 2, flex: 1, alignSelf: 'stretch' },
  tdHead: { textAlign: 'center', fontSize: 12, backgroundColor: '#252626', color: '#fff', borderRadius: 5, margin: 2, flex: 1, alignSelf: 'stretch' },
  containerRow: {
    marginTop: 5,
    width: Dimensions.get('window').width,
  },
  subtitleView: {
    flexDirection: 'column',
    paddingLeft: 10,
    paddingTop: 5
  },
  ratingImage: {
    height: 19.21,
    width: 100
  },
  ratingText: {
    paddingLeft: 10,
    color: 'grey'
  },
  container: {
    marginTop: 5,
    width: '100%'

  },
  row: {
    flex: 1,
    //   padding: 5,
    paddingLeft: 6,
    paddingRight: 6,
    //   marginBottom: 5,
    //   backgroundColor: 'skyblue',
  },
})
function mapStateToProps(state, props) {
  return {
    loading: state.BillReducer.loading,
    bills: state.BillReducer.bills,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getAllBill
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BillScreen);
