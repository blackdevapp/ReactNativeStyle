import React, { PureComponent } from 'react';
import {
  FlatList, StyleSheet, Image, Dimensions, ScrollView,
  TouchableOpacity, Modal, InteractionManager, Linking
} from 'react-native';
import { Row, Grid, Col } from 'react-native-easy-grid'
import {
  Container, View, Header, Textarea, Content, Footer, FooterTab,
  Button, Card, CardItem, Item, Input, Label,
  Left, Body, Right, Icon, Text, Badge, Fab,
} from 'native-base';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {getAllLabBills} from '../../Redux/Actions/Lab.action'
import { ListItem, Avatar } from 'react-native-elements'
import { Dialog, ProgressDialog } from 'react-native-simple-dialogs';
import HeaderComponent from '../../../../Components/Header.component'

const extractKey = ({ id }) => id

class BillListScreen extends PureComponent {
  constructor(props) {
    super(props);
    // alert(JSON.stringify(this.props.navigation))
    this.state = {
      loading: true,
      payModal: false,
      payDialog: false,
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
      this.props.getAllLabBills()
      this.setState({
        loading: false
      })
    });
    // if(this.props.focused){
    // this.props.getAllBill('')
    // }
  }
  alertItemName(id) {

  }
  renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        key={item.id}
        style={styles.row}
        onPress={() => this.alertItemName(item.id)}>
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
                  {item.clinic.user.profilePic?<Image activeOpacity={0.7} resizeMode="cover" style={{ borderRadius: 20, width: '85%', height: '100%', borderWidth: 1, borderColor: 'gray' }}
                    source={{ uri: `http://89.32.249.208:8090${item.clinic.user.profilePic.profilePicUrl}` }}
                  />:<Image activeOpacity={0.7} resizeMode="cover" style={{ borderRadius: 20, width: '85%', height: '100%', borderWidth: 1, borderColor: 'gray' }}
                  source={{ uri: `http://s8.picofile.com/file/8342161734/lab_images2.png` }}
                  defaultSource={require('../../../../assets/img/png/image.png')}
                />}
                  {/* <Image activeOpacity={0.7} resizeMode="cover" style={{ borderRadius: 20, width: '85%', height: '85%', borderWidth: 1, borderColor: 'gray' }}
                    source={{ uri: 'http://89.32.249.208:8090'+item.clinic.user.profilePic.profilePicUrl }}
                  /> */}

                  {/* <SvgUri width="30" height="30" source={require("../../assets/images/recieve.svg")} /> */}
                </Col>
                <Col size={4} style={{ alignItems: 'flex-start' }}>
                  <Text style={{ fontSize: 15, color: '#80bcd3' }}>{item.labName}</Text>
                  <Text style={{ fontSize: 12 }}>فاکتور شماره ۲۰ </Text>
                  <Text style={{ fontSize: 13 }}>دکتر: {item.dentistName}</Text>
                </Col>
                <Col size={3} style={{}}>
                  <Row style={{ paddingBottom: 0 }}>
                    {item.from ? <Text style={{ fontSize: 9 }}>از {item.from}</Text> : null}
                    {item.to ? <Text style={{ fontSize: 9 }}>تا {item.to} </Text> : null}
                  </Row>
                  {item.totalCost ? <Text style={{ fontSize: 10 }}>جمع کل:     {item.totalCost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} تومان</Text> :
                    null}

                  <Button onPress={() => this.setState({ payModal: true, bill: item })}
                    style={{ width: '100%', justifyContent: 'center', borderRadius: 25, backgroundColor: '#7EDAD1', height: 25 }}>
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

  handleRefresh = () => {


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
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={[styles.tableRow, { backgroundColor: rowColor, fontSize: 8 }]}>{index + 1}</Text>
                <Text style={[styles.tableRow, { backgroundColor: rowColor, fontSize: 10 }]}>1396/2/3</Text>
                <Text style={[styles.tableRow, { backgroundColor: rowColor, fontSize: 8 }]}>{item.orderLineItem.product.productName}</Text>
                <Text style={[styles.tableRow, { backgroundColor: rowColor, fontSize: 8 }]}>{item.patientInfo.fullName}</Text>
                <Text style={[styles.tableRow, { backgroundColor: rowColor, fontSize: 9 }]}>{item.orderLineItem.quantity}</Text>
                <Text style={[styles.tableRow, { backgroundColor: rowColor, fontSize: 9 }]}>50</Text>
                <Text style={[styles.tableRow, { backgroundColor: rowColor, fontSize: 9 }]}>{item.orderLineItem.chosenPricePlan.cost}</Text>
                <Text style={[styles.tableRow, { backgroundColor: rowColor, fontSize: 10 }]}>{item.orderLineItem.chosenPricePlan.cost * item.orderLineItem.quantity}</Text>
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
    // console.log(this.state.bill)
    return (
      <Container style={{ paddingHorizontal: 5, paddingVertical: 5, backgroundColor: '#f4f4f4' }}>
        <Grid>
          <Row size={85}>
            <Col>
              {this.renderHeader()}
              <ScrollView>
                {this.renderRow(this.state.bill.billItems)}
              </ScrollView>
            </Col>
          </Row>
          <Row size={15}>
            <Col>
              <Row style={{ flex: 0 }}>
                <Col style={{ backgroundColor: '#9C9C9C' }} size={4}><Text style={{ color: '#fff', fontSize: 15, textAlign: 'right' }}>جمع کل  </Text></Col>
                <Col style={{ backgroundColor: '#e7be00' }} size={1}><Text style={{ fontSize: 12 }}>{this.state.bill.totalCost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} تومان</Text></Col>
              </Row>
              <Row style={{ flex: 0 }}>
                <Col >
                  <Button block
                    style={{
                      borderRadius: 20,
                      marginVertical: 5,
                      marginHorizontal: 10,
                      height: 30,
                      backgroundColor: '#7EDAD1'
                    }} disabled>
                    {this.state.bill.state=='NOT_PAYED'?<Text>وضعیت:پرداخت نشده</Text>:
                  <Text>وضعیت: تسویه شده</Text>}
                  </Button>
                </Col>
                <Col ><Button block style={{ borderRadius: 20, marginVertical: 5, marginHorizontal: 10, height: 30, backgroundColor: '#868889' }} onPress={() => this.setState({ payModal: false })}><Text>بستن جزئیات</Text><Icon name="ios-arrow-back" /></Button></Col>
              </Row>

            </Col>
          </Row>
        </Grid>



      </Container>
    );
  }

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

          <HeaderComponent title="صورت حساب های من" color="#7EDAD1" />
          <Header searchBar rounded style={{ backgroundColor: "#7EDAD1",height:56 }}>
            <Item rounded>
              <Icon name="ios-search" />
              <Input placeholder="Search" />
              <Icon name="ios-people" />
            </Item>
            <Button transparent>
              <Text>جستجو</Text>
            </Button>
          </Header>
          <Grid style={{ flex: 1 }}>
            <Row style={{ flex: 1 }}>

              <View style={{ flex: 1 }}>
                <FlatList
                  style={styles.containerRow}
                  data={this.props.bills}
                  renderItem={this.renderItem}
                  keyExtractor={(item,i) => i.toString()}
                  onRefresh={this.handleRefresh}
                  onEndReached={this.onEndReached}
                  refreshing={false}
                  onEndReachedThreshold={0.5}
                />
              </View>
            </Row>
          </Grid>
          <Modal animationType="slide"
            transparent={false}
            visible={this.state.payModal}
            onRequestClose={() => {
              this.setState({ payModal: false })
            }}>
            <HeaderComponent title='جزئیات سفارش' color="#7EDAD1" />
            {this.renderPayModal()}

            </Modal>
          <Fab
            style={{ backgroundColor: '#e7be00', width: 40, height: 40 }}
            position="bottomLeft"
            onPress={() => this.props.navigation.navigate('BillGenerateScreen')}>
            <Icon name="ios-add-outline" />
          </Fab>
        </Container >

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
    loading: state.LabReducer.loading,
    bills: state.LabReducer.bills,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    // getAllBill
    getAllLabBills
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BillListScreen);
