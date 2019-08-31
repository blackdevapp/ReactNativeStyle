import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Modal, Image, Text
} from 'react-native';
import { Container, Button, Icon, Row, Col, Spinner, Right, Left, Header, Body } from 'native-base'
import { RNCamera } from 'react-native-camera';
import { Grid } from 'react-native-easy-grid';
import SvgUri from 'react-native-svg-uri'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { uploadData } from '../../Redux/Actions/Order.action'
class TakePicture extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showPicrure: false,
      uri: '',
      cametaType: RNCamera.Constants.Type.back,
    }
  }

  changeCamera() {
    if (this.state.cametaType == RNCamera.Constants.Type.back) {
      this.setState({ cametaType: RNCamera.Constants.Type.front })
    } else {
      this.setState({ cametaType: RNCamera.Constants.Type.back })
    }
  }
  cameraPreview() {
    // if( !this.state.showPicrure){
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
        mirrorImage={false}>
        <Row>
          <Col size={1}>
            <Button transparent onPress={() => this.changeCamera()}><Icon name="ios-reverse-camera" style={{ color: '#fff', justifyContent: 'flex-end', flexDirection: 'row' }} /></Button>
          </Col>
          <Col size={5}></Col>
          <Col size={1}>
            <Button transparent onPress={() => this.props.navigation.goBack()}><Icon name="ios-arrow-back" style={{ color: '#fff' }} /></Button>
          </Col>

        </Row>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>

          <Button transparent onPress={this.takePicture.bind(this)} style={styles.button} >
            <SvgUri width="50" height="50"
              svgXmlData='<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve" width="512px" height="512px" class=""><g><g><g><path d="M256,0C114.841,0,0,114.841,0,256s114.841,256,256,256s256-114.841,256-256S397.159,0,256,0z M256,492    C125.87,492,20,386.131,20,256S125.87,20,256,20c130.131,0,236,105.869,236,236S386.131,492,256,492z" data-original="#000000" class="active-path" data-old_color="#7fbbd2" fill="#7fbbd2"/></g></g><g><g><path d="M440.015,142.896C409.802,93.745,362.256,59.3,306.136,45.909c-56.121-13.393-114.096-4.128-163.248,26.086    c-49.152,30.214-83.597,77.76-96.988,133.879c-13.392,56.12-4.127,114.097,26.086,163.249    c30.213,49.151,77.759,83.596,133.879,96.987c16.476,3.932,33.273,5.877,50.035,5.877c32.926-0.001,65.702-7.508,95.549-22.211    c4.955-2.44,6.992-8.435,4.552-13.39s-8.436-6.992-13.39-4.552c-40.871,20.134-87.786,25.397-132.104,14.822    C105.384,421.571,40.269,315.64,65.354,210.517c12.151-50.924,43.406-94.067,88.007-121.483    c44.601-27.416,97.211-35.821,148.132-23.671c105.123,25.084,170.238,131.017,145.154,236.14    c-8.39,35.16-26.314,67.277-51.836,92.881c-3.899,3.911-3.889,10.243,0.023,14.142c3.911,3.9,10.242,3.89,14.142-0.022    c28.125-28.216,47.879-63.61,57.125-102.357C479.493,250.025,470.228,192.049,440.015,142.896z" data-original="#000000" class="active-path" data-old_color="#7fbbd2" fill="#7fbbd2"/></g></g><g><g><path d="M379.883,420.997c-3.063-4.596-9.272-5.838-13.868-2.774l-0.404,0.273c-4.563,3.112-5.737,9.334-2.625,13.896    c1.937,2.838,5.075,4.365,8.27,4.365c1.941,0,3.903-0.564,5.627-1.74l0.227-0.153    C381.706,431.801,382.947,425.592,379.883,420.997z" data-original="#000000" class="active-path" data-old_color="#7fbbd2" fill="#7fbbd2"/></g></g><g><g><path d="M391.832,154.566v-7.636c0-14.293-11.627-25.921-25.92-25.921h-25.4c-14.293,0-25.92,11.628-25.92,25.921v15.92    c0,5.522,4.477,10,10,10h57.24c7.967,0,14.698,9.323,14.698,20.358V246h-71.715c-6.859-32.756-35.961-57.434-70.725-57.434    c-34.764,0-63.866,24.679-70.725,57.434H115.47v-52.791c0-11.035,6.731-20.358,14.698-20.358h127.948c5.523,0,10-4.478,10-10    c0-5.522-4.477-10-10-10H130.168c-19.133,0-34.698,18.104-34.698,40.358v125.583c0,22.253,15.565,40.358,34.698,40.358h251.663    c19.133,0,34.699-18.105,34.699-40.358V193.209C416.53,174.998,406.104,159.572,391.832,154.566z M371.831,152.851h-37.24v-5.92    c0-3.209,2.711-5.921,5.92-5.921h25.4c3.209,0,5.92,2.712,5.92,5.921V152.851z M254.089,208.566    c28.817,0,52.261,23.444,52.261,52.261c0,28.817-23.444,52.261-52.261,52.261c-28.817,0-52.261-23.444-52.261-52.261    C201.828,232.01,225.272,208.566,254.089,208.566z M396.529,318.792c0.001,11.035-6.73,20.358-14.697,20.358H130.168    c-7.967,0-14.698-9.322-14.698-20.358V266h66.564c2.664,37.437,33.952,67.087,72.055,67.087c38.103,0,69.391-29.65,72.055-67.087    h70.385V318.792z" data-original="#000000" class="active-path" data-old_color="#7fbbd2" fill="#7fbbd2"/></g></g><g><g><path d="M179.109,306.9h-0.511c-5.523,0-10,4.478-10,10c0,5.523,4.477,10,10,10h0.511c5.523,0,10-4.477,10-10    C189.109,311.378,184.632,306.9,179.109,306.9z" data-original="#000000" class="active-path" data-old_color="#7fbbd2" fill="#7fbbd2"/></g></g><g><g><path d="M371.169,193.333h-44.506c-5.523,0-10,4.477-10,10c0,5.522,4.477,10,10,10h44.506c5.523,0,10-4.478,10-10    C381.169,197.81,376.692,193.333,371.169,193.333z" data-original="#000000" class="active-path" data-old_color="#7fbbd2" fill="#7fbbd2"/></g></g><g><g><path d="M287.676,152.851h-0.475c-5.523,0-10,4.478-10,10c0,5.522,4.477,10,10,10h0.475c5.523,0,10-4.478,10-10    C297.676,157.329,293.199,152.851,287.676,152.851z" data-original="#000000" class="active-path" data-old_color="#7fbbd2" fill="#7fbbd2"/></g></g></g></svg>'
            // source={require('./../../../../assets/img/svg/camera.svg')}
            />
          </Button>

        </View>
      </RNCamera>
    );
  }



  renderModal() {
    if (this.state.uri == '') {
      return (
        <View style={{ justifyContent: 'center', alignSelf: 'center' }}>

          <Image source={require('./../../../../assets/img/png/logo.png')} resizeMode='center' style={{ flex: 1 }} />
          <Spinner style={{ flex: 1 }} large color='#7fdbb2' />
        </View>);
    } else {
      return (<Image defaultSource={require('./../../../../assets/img/png/logo.png')} source={{ uri: this.state.uri }} style={{ flex: 1 }} />)
    }
  }

  render() {
    return (
      <Container style={styles.container}>
        {this.cameraPreview()}
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.showPicrure}
          onRequestClose={() => {
            this.setState({ showPicrure: false, uri: '' })
          }}>

          <View style={{ flex: 1, backgroundColor: '#d2d2d2' }}>
            <Header style={{ backgroundColor: "#7fbbd2" }}>
              <Right style={{ flex: 0 }}>
                <Button transparent onPress={() => this.uploadImage()}><Icon name="md-checkmark-circle-outline" style={{ color: '#fff', justifyContent: 'flex-end', flexDirection: 'row' }} /></Button>
              </Right>

              <Body style={{ flex: 3 }} >
                <Image source={require('./../../../../assets/img/png/logo.png')} resizeMode='center' style={{ height: 56, width: 100 ,alignSelf:'center'}} />
              </Body>

              <Left style={{ flex: 0 }}>
                <Button transparent onPress={() => {
                  this.setState({ showPicrure: false, uri: '' })
                  this.props.navigation.goBack()
                }}>
                  <Icon name="ios-arrow-back" style={{ color: '#fff' }} />
                </Button>
              </Left>

            </Header>

            {this.renderModal()}
          </View>
        </Modal>
      </Container>

    );
  }

  takePicture = async function () {
    if (this.camera) {
      const options = { quality: 0.5,fixOrientation: true, base64: true };
      this.setState({ showPicrure: true })
      try{
        const data = await this.camera.takePictureAsync(options)
        this.setState({ uri: data.uri })
      }catch(e){
        alert(e)
      }
      
    }
  };

  uploadImage() {
    let name = new Date().getTime()
    let file = { uri: this.state.uri, type: 'image/png', name: `${name}.png` };
    const uploaddata = new FormData();
    uploaddata.append('file', file);
    try {
      this.props.uploadData(uploaddata, 'multipart/form-data;boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW')
      this.props.navigation.goBack()
    } catch (e) {
      alert(e)
      this.props.navigation.goBack()
    }

  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black'
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
  }
});
function mapStateToProps(state, props) {
  return {
    loading: state.OrderReducer.loading,

  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    uploadData
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TakePicture);