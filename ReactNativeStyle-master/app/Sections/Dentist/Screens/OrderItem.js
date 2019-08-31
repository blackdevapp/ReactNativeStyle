import React, { PureComponent } from 'react';
import { FlatList, StyleSheet, Image, Dimensions, TouchableOpacity, Modal,ScrollView } from 'react-native';
import { Rating } from 'react-native-elements'
import { Row, Grid, Col } from 'react-native-easy-grid'
import { Container, View, Card, Fab, Icon, Text, Button, Textarea } from 'native-base';
import StepIndicator from 'react-native-step-indicator';
import HeaderComponent from '../../../Components/Header.component'
import httpService from '../../../Services/Http.service'
import ToothShowScreen from '../../../Components/toothShow.component'
import { Dialog } from 'react-native-simple-dialogs';
import storageService from '../../../Services/Storage.service'
import SvgUri from 'react-native-svg-uri';
import { default as Sound } from 'react-native-sound';

const customStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize: 30,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: '#7fbbd2',
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: '#7fbbd2',
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: '#7fbbd2',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: '#7fbbd2',
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: '#7fbbd2',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#999999',
  labelSize: 13,
  currentStepLabelColor: '#7fbbd2'
}
const extractKey = ({ id }) => id
class OrderItem extends PureComponent {
  constructor(props) {
    super(props);
    this.getOrderLineItemsById(this.props.navigation.getParam('orderId'))
    this.state = {
      rate: 0,
      description: '',
      lineItemId: '',
      token: '',
      currentOrder: {
        labels: [],
        dialogType: '',
        finishDialog: false,
        dialogLabel: '',
        currentStep: '',
        attachedFiles: [],
        patientInfo: {
          fullName: ''
        },
        orderLineItems: [
          {
            labels: [],
            currentStep: 0,
            teethNumbers: [],
            buildOrders: [{
              properties: []
            }],
            chosenPricePlan: {},
            product: {
              productName: '',
              workSteps: []
            }

          }
        ],

      }
    };
  }
  async getOrderLineItemsById(id) {
    const token = await storageService.getItem('token');
    httpService.httpGetJwt(`idandoon/clinics/${id}/get-order-line-items-by-order-id`).then(res => {
      console.log(res);
      let current = []
      current = res.data.data;
      for (let item of current.orderLineItems) {
        item.labels = [];
        item.currentStep = 0
        let go = true;
        for (let sub of item.product.workSteps) {
          item.labels.push(sub.title)
          if (go && sub.status == 'DONE') {
            item.currentStep = item.currentStep + 1;
          }
        }
      }
      this.setState({
        currentOrder: current,
        token, token
      })
    })

  }

  changeStatus() {
    let entity = {
      comment: "",
      checkingType: "",
      rate: 0,
    }
    entity.comment = this.state.description;
    entity.rate = this.state.rate;
    if (this.state.dialogType == 'accept') {
      entity.checkingType = 'ACCEPTED'
    } else if (this.state.dialogType == 'refrence') {
      entity.checkingType = 'REVISION'
    } else if (this.state.dialogType == 'reject') {
      entity.checkingType = 'REJECTED'
    }
    storageService.getItem('decoded').then(info => {
      httpService.httpPutJwt(`idandoon/laboratories/${this.state.currentOrder.laboratoryId}/clinics/${JSON.parse(info).context.id}/orders/${this.state.currentOrder.orderId}/orderLineItems/${this.state.lineItemId}/checking`, entity)
        .then(res => {
          this.setState({
            finishDialog: false,
          })
          this.props.navigation.goBack()
        }).catch(err => {
          console.log(err);
        })
    })
  }

  renderLineItem = ({ item }) => {
    return (
      <View>
        <Card style={{ backgroundColor: '#eee' }}>
          {/* <Grid > */}
          <Row style={styles.row1}>
            <Col style={styles.col}>
              <Text>
                نوع کار:
              </Text>
            </Col>
            <Col style={styles.col}>

              <Text style={{ fontSize: 12 }}>
                {item.product.productName}
              </Text>
            </Col>
          </Row>
          <Row style={styles.row1}>
            <Col style={styles.col}>
              <Text>
                ناحیه درمان :
              </Text>
            </Col>
            <Col style={styles.col}>
              <Row>
                {/* {item.teethNumbers.map(i => {
                return (
                  <Text style={{ fontSize: 12 }}>{i} </Text>
                )

              })} */}
                <ToothShowScreen teeth={item.teethNumbers} />
              </Row>


            </Col>
          </Row>
          <Row style={styles.row1}>
            <Col style={styles.col}>
              <Text>
                توضیحات :
              </Text>
            </Col>
            <Col style={styles.col}>
            <Text style={{ fontSize: 12 }}>
                {this.state.currentOrder.description}
              </Text>
            </Col>
          </Row>
          <Row style={styles.row1}>
            <Col style={styles.col}>
              <Text>
                نام بیمار:
              </Text>
            </Col>
            <Col style={styles.col}>
              <Text>
                {this.state.currentOrder.patientInfo.fullName}
              </Text>
            </Col>
          </Row>
          {item.buildOrders[0].properties.map(sub => {
            if (sub.data) {
              return (
                <Row>
                  <Col style={styles.col}>
                    <Text>{sub.key}</Text>
                  </Col>
                  <Col style={styles.col}>
                    {Array.isArray(sub.data) ? <Text style={{ fontSize: 12 }}>{sub.data.join(' , ')}</Text> : <Text>{sub.data}</Text>}
                  </Col>
                </Row>
              )
            }

          })}


          <StepIndicator
            customStyles={customStyles}
            currentPosition={item.currentStep}
            labels={item.labels}
            stepCount={item.labels.length}
          />
          {(item.currentStep == item.labels.length && item.lineItemStatus == 'DONE') ? <Row>
            <Col style={{ paddingHorizontal: 2 }}>
              <Button rounded success small block
                onPress={() => this.setState({
                  dialogType: 'accept',
                  finishDialog: true,
                  lineItemId: item.id,
                  dialogLabel: 'امتیاز دهی به عملکرد لابراتور',
                })}
              ><Text>تایید کار</Text></Button>
            </Col>
            <Col style={{ paddingHorizontal: 2 }}>
              <Button rounded info small block
                onPress={() => this.setState({
                  dialogType: 'refrence',
                  lineItemId: item.id,
                  finishDialog: true,
                  dialogLabel: 'دلیل ارجاع کار',
                })}
              ><Text>ارجاع کار</Text></Button>
            </Col>
            <Col style={{ paddingHorizontal: 2 }}>
              <Button rounded danger small block
                onPress={() => this.setState({
                  dialogType: 'reject',
                  lineItemId: item.id,
                  finishDialog: true,
                  dialogLabel: 'دلیل رد کار'
                })}><Text>رد کار</Text></Button>
            </Col>
          </Row> : null}
          {item.lineItemStatus == 'ACCEPTED' ? <Row>
            <Col style={{ paddingHorizontal: 2 }}>
              <Button rounded success small block><Text>وضعیت: تایید شده</Text></Button>
            </Col>
          </Row> : null}
          {item.lineItemStatus == 'REJECTED' ? <Row>
            <Col style={{ paddingHorizontal: 2 }}>
              <Button rounded danger small block><Text>وضعیت: رد شده</Text></Button>
            </Col>
          </Row> : null}
          {item.lineItemStatus == 'REVISION' ? <Row>
            <Col style={{ paddingHorizontal: 2 }}>
              <Button rounded info small block><Text>وضعیت: ارجاع شده</Text></Button>
            </Col>
          </Row> : null}
          <Row></Row>


        </Card>

      </View>
    )


  }
  attachFile(file) {
    if (file.contentType == "image/jpeg") {
      return (
        <Image style={{
          borderRadius: 10,
          width: Dimensions.get('screen').width / 7,
          height: Dimensions.get('screen').width / 7,
          borderWidth: 1,
          borderColor: 'gray'
        }}
          source={{ uri: `http://192.168.3.173:9090/idandoon/files/${file.uniqueName}?Authorization=${this.state.token}` }} />
      )
    }

  }
  render() {
    return (
      <Container style={{ backgroundColor: '#f4f4f4' }}>
        <HeaderComponent title="جزییات سفارش" />
        <Grid style={{ flex: 1 }}>
          <Row size={8} >
            <View style={{ flex: 1 }}>
              <FlatList
                style={styles.containerRow}
                data={this.state.currentOrder.orderLineItems}
                renderItem={this.renderLineItem}
                keyExtractor={(item, i) => i.toString()}
              />

            </View>

          </Row>
          <Row size={3}>
            <Col>
              <ScrollView style={{ flex: 1 }}>

                {this.state.currentOrder.attachedFiles ? this.state.currentOrder.attachedFiles.map(sub => {
                  if (sub.contentType == "image/jpeg") {
                    return (
                      <Image style={{
                        borderRadius: 10,
                        width:Dimensions.get('screen').width / 4,
                        height: Dimensions.get('screen').width / 4,
                        borderWidth: 1,
                        borderColor: 'gray'
                      }}
                        source={{ uri: `http://192.168.3.173:9090/idandoon/files/${sub.uniqueName}?Authorization=${this.state.token}` }} />
                    )
                  }
                }) : null}
              </ScrollView>
            </Col>
            <Col>
              <ScrollView style={{ flex: 1 }}>

                {this.state.currentOrder.attachedFiles ? this.state.currentOrder.attachedFiles.map(sub => {
                  if (sub.contentType == 'audio/aac') {
                    return (
                      <TouchableOpacity onPress={() => {
                        this.play(`${sub.uniqueName}?Authorization=${this.state.token}`)
                      }
                      }>
                        <SvgUri
                          width="60"
                          height="60"
                          svgXmlData='<?xml version="1.0" encoding="iso-8859-1"?><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 612.074 612.074" style="enable-background:new 0 0 612.074 612.074;" xml:space="preserve" width="512px" height="512px"><g><path d="M306.037,0.037C136.997,0.037,0,137.034,0,306.074s136.997,305.963,306.037,305.963S612.074,475.04,612.074,306   S475.077,0.037,306.037,0.037z M306.037,582.442c-152.203,0-276.368-124.165-276.368-276.368S153.834,29.706,306.037,29.706   s276.368,124.165,276.368,276.368S459.056,582.442,306.037,582.442z M425.381,285.232c-0.816,0-0.816-0.816-1.632-0.816   l-169.856-97.76c-5.637-3.189-10.384-4.821-16.021-4.821c-11.2,0-23.216,8.827-23.216,28.037v192.256   c0.816,19.211,12.016,28.037,24.032,28.037c5.637,0,11.2-1.632,16.837-4.821l162.587-93.754   c12.016-6.379,17.653-15.205,18.395-24.848C437.397,302.885,435.84,293.242,425.381,285.232z M244.325,398.197V215.509   l157.84,91.307L244.325,398.197z" fill="#7fbbd2"/></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>                      '
                        />
                        {/* <Text>{sub.name}</Text> */}
                      </TouchableOpacity>
                    )
                  }
                }) : null}
              </ScrollView>
            </Col>
            <Col></Col>

          </Row>

        </Grid>
        <Fab
          style={{ backgroundColor: '#e7be00', position: 'absolute', bottom: 3, width: 40, height: 40, left: 3 }}
          position="bottomLeft"
          onPress={() => this.props.navigation.goBack()}>
          <Icon name="ios-arrow-back" />
        </Fab>
        <Dialog
          visible={this.state.finishDialog}
          title={this.state.dialogLabel}
          contentStyle={{ height: 250 }}
          onTouchOutside={() => this.setState({ finishDialog: false })} >
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {this.state.dialogType == 'accept' ? <Row>
              <Rating
                showRating
                type="star"
                fractions={1}
                onFinishRating={(rating) => this.setState({ rate: rating })}
                startingValue={this.state.rate}
                showRating={false}
                imageSize={35}
                style={{ paddingVertical: 10 }}
              />
            </Row> : <Row size={2}>
                <Col style={{ padding: 5, justifyContent: 'space-between' }}>
                  <Textarea rowSpan={3} bordered style={{ textAlign: 'right', fontSize: 15 }}
                    onChangeText={(text) => { this.setState({ description: text }) }} placeholder="توضیحات" />
                </Col>
              </Row>}

            <Row style={{ justifyContent: 'center', }}>
              <Col style={{ justifyContent: 'center', padding: 10 }}>
                <Button block rounded
                  onPress={() => this.changeStatus()}
                  style={{ backgroundColor: '#7fbbd2' }}>
                  <Text>تایید</Text>
                </Button>
              </Col>
              <Col style={{ justifyContent: 'center', padding: 10 }}>
                <Button block rounded warning onPress={() => this.setState({ finishDialog: false })}>
                  <Text>انصراف</Text>
                </Button>
              </Col>
            </Row>

          </View>
        </Dialog>
      </Container>
    );
  }
  play(sound) {
    // sound = new Sound(sound, null, (error) => {
    //   if (error) {
    //     alert('failed to load the sound');
    //   }
    // });
    // if (sound.isLoaded()) {
    //   sound.play()
    // }
    const track = new Sound(`http://192.168.3.173:9090/idandoon/files/${sound}`, null, (e) => {
      if (e) {
        console.log('error loading track:', e)
      } else {
        track.play()
      }
    })
  }
}

const styles = StyleSheet.create({
  containerRow: {
    marginTop: 5,
    width: Dimensions.get('window').width,
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
  col: {
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 0.5,
    borderColor: 'red'
  },
  row1: {
    height: 30
  }
})
export default OrderItem;
