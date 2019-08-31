import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
  Image, Modal
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import { Button, Icon, Row, Col, Spinner, Header, Left, Right, Body } from 'native-base';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { uploadData } from '../../Redux/Actions/Order.action'
import SvgUri from 'react-native-svg-uri';
import Video from 'react-native-video';


class TakeVideo extends Component {


  constructor(props) {
    super(props);
    this.state = {
      recording: false,
      processing: false,
      showVideo: false,
      uri: undefined,
      codec: '',
      cametaType: RNCamera.Constants.Type.back,
      playVideo: true
    }
  }

  async startRecording() {

    // default to mp4 for android as codec is not set
    this.setState({ recording: true });
    const options = { base64: false, quality: '4:3', codec: 'AppleProRes4444' };
    const { uri, codec = "mp4" } = await this.camera.recordAsync(options);
    // const {uri,codec='mp4'}= await this.camera.recordAsync();
    this.setState({ recording: false, processing: true, uri: uri, codec: codec });
    await this.setState({ showVideo: true })


    // try {
    //   await fetch('http://94.232.173.183:8080/net/upload',
    //    {
    //     method: "post",
    //     headers:{
    //       Authorization:'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtaWxhZCIsInBhc3N3b3JkIjoiJDJhJDEyJFExbHpxQVYvU2pKZTlaMHVEUjMvRk9sM3ZTeE5LVThOUHhxNEJJd3ltcXBIVk1FRlFYSjJPIiwib3JnYW5JZCI6MSwidXNlcklkIjoyLCJleHAiOjE1NDIwNzgzNDd9.nJ614pSOBfYNNtjH_b3ztHJbgmu8x4h32EoUhSdtz0MzPheH3Dj_A2BlbHy2QypHLSC4FokLfTXHvCtZ1ICXXg'
    //     },
    //     body: data
    //   });
    // } catch (e) {
    //   alert(e)
    // }

    this.setState({ processing: false });
  }

  changeCamera() {
    if (this.state.cametaType == RNCamera.Constants.Type.back) {
      this.setState({ cametaType: RNCamera.Constants.Type.front })
    } else {
      this.setState({ cametaType: RNCamera.Constants.Type.back })
    }
  }
  stopRecording() {
    this.camera.stopRecording();
    this.setState({ recording: false });
  }

  renderButton() {
    const { recording, processing } = this.state;


    if (processing) {
      return (
        <Spinner large color='#d2d2d2' />
      );
    }

    if (recording) {
      return (
        <Button transparent onPress={this.stopRecording.bind(this)} style={styles.button}>
          <SvgUri
            width="50"
            height="50"
            svgXmlData='<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" height="512px" version="1.1" viewBox="0 0 512.00002 512.00002" width="512px"><g id="surface1"><path d="M 437.019531 74.980469 C 388.667969 26.628906 324.378906 0 256 0 C 187.621094 0 123.332031 26.628906 74.980469 74.980469 C 26.628906 123.332031 0 187.621094 0 256 C 0 324.378906 26.628906 388.667969 74.980469 437.019531 C 123.332031 485.371094 187.621094 512 256 512 C 298.707031 512 341.09375 501.191406 378.585938 480.742188 C 383.433594 478.097656 385.21875 472.023438 382.574219 467.175781 C 379.929688 462.324219 373.855469 460.539062 369.007812 463.183594 C 334.445312 482.035156 295.367188 492 256 492 C 125.871094 492 20 386.128906 20 256 C 20 125.867188 125.871094 20 256 20 C 386.132812 20 492 125.867188 492 256 C 492 319.039062 467.453125 378.304688 422.878906 422.878906 C 418.972656 426.78125 418.972656 433.113281 422.878906 437.019531 C 426.78125 440.925781 433.113281 440.925781 437.019531 437.019531 C 460.910156 413.128906 479.582031 385.183594 492.511719 353.96875 C 505.445312 322.75 512 289.789062 512 256 C 512 187.621094 485.371094 123.332031 437.019531 74.980469 Z M 437.019531 74.980469 " style=" fill-rule:nonzero;fill-opacity:1;" stroke="#7fbbd2" fill="#7fbbd2"/><path d="M 111.75 97.609375 C 107.84375 93.703125 101.511719 93.703125 97.605469 97.609375 C 76.699219 118.515625 60.363281 142.964844 49.050781 170.277344 C 37.738281 197.59375 32 226.433594 32 256 C 32 315.832031 55.300781 372.082031 97.609375 414.390625 C 139.914062 456.699219 196.167969 480 256 480 C 315.832031 480 372.085938 456.699219 414.394531 414.390625 C 456.703125 372.085938 480 315.832031 480 256 C 480 196.167969 456.699219 139.914062 414.394531 97.605469 C 372.085938 55.296875 315.832031 32 256 32 C 221.414062 32 186.777344 40.175781 155.839844 55.640625 C 150.898438 58.109375 148.898438 64.117188 151.367188 69.054688 C 153.835938 73.996094 159.84375 75.996094 164.78125 73.527344 C 192.957031 59.445312 224.5 52 256 52 C 368.484375 52 460 143.515625 460 256 C 460 368.484375 368.484375 460 256 460 C 143.515625 460 52 368.484375 52 256 C 52 201.507812 73.21875 150.28125 111.75 111.75 C 115.65625 107.84375 115.65625 101.511719 111.75 97.609375 Z M 111.75 97.609375 " style=" fill-rule:nonzero;fill-opacity:1;" stroke="#7fbbd2" fill="#7fbbd2"/><path d="M 126.378906 95.730469 C 128.507812 95.730469 130.648438 95.050781 132.464844 93.65625 C 136.855469 90.371094 137.78125 84.15625 134.527344 79.730469 C 131.253906 75.277344 124.996094 74.324219 120.546875 77.597656 L 120.242188 77.828125 C 115.878906 81.214844 115.085938 87.496094 118.472656 91.859375 C 120.445312 94.398438 123.394531 95.730469 126.378906 95.730469 Z M 126.378906 95.730469 " style=" fill-rule:nonzero;fill-opacity:1;" stroke="#7fbbd2" fill="#7fbbd2"/><path d="M 402.230469 441.234375 L 402.109375 441.335938 C 397.796875 444.769531 397.113281 451.011719 400.539062 455.332031 C 402.503906 457.816406 405.425781 459.105469 408.378906 459.105469 C 410.5625 459.105469 412.761719 458.402344 414.601562 456.953125 L 414.726562 456.855469 C 419.039062 453.421875 419.71875 447.175781 416.296875 442.855469 C 412.875 438.535156 406.5625 437.828125 402.230469 441.234375 Z M 402.230469 441.234375 " style=" fill-rule:nonzero;fill-opacity:1;" stroke="#7fbbd2" fill="#7fbbd2"/><path d="M 324 346 C 336.128906 346 346 336.128906 346 324 L 346 188 C 346 175.867188 336.132812 166 324 166 L 188 166 C 175.871094 166 166 175.867188 166 188 L 166 324 C 166 336.128906 175.871094 346 188 346 Z M 186 324 L 186 188 C 186 186.914062 186.917969 186 188 186 L 324 186 C 325.085938 186 326 186.914062 326 188 L 326 324 C 326 325.082031 325.085938 326 324 326 L 188 326 C 186.917969 326 186 325.082031 186 324 Z M 186 324 " style=" fill-rule:nonzero;fill-opacity:1;" stroke="#7fbbd2" fill="#7fbbd2"/></g></svg>'
          // source={require('./../../../../assets/img/svg/stop.svg')}
          />
        </Button>
      );
    } else {

      return (
        <Button transparent onPress={this.startRecording.bind(this)} style={styles.button} >
          <SvgUri style={{ justifyContent: 'center', alignSelf: 'center' }} width="50" height="50"
            svgXmlData='<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve" width="512px" height="512px" class=""><g><g><g><path d="M256,0C114.841,0,0,114.841,0,256s114.841,256,256,256s256-114.841,256-256S397.159,0,256,0z M256,492    C125.87,492,20,386.131,20,256S125.87,20,256,20c130.131,0,236,105.869,236,236S386.131,492,256,492z" data-original="#000000" class="active-path" data-old_color="#7fbbd2" fill="#7fbbd2"/></g></g><g><g><path d="M440.015,142.896C409.802,93.745,362.256,59.3,306.136,45.909c-56.121-13.393-114.096-4.128-163.248,26.086    c-49.152,30.214-83.597,77.76-96.988,133.879c-13.392,56.12-4.127,114.097,26.086,163.249    c30.213,49.151,77.759,83.596,133.879,96.987c16.476,3.932,33.273,5.877,50.035,5.877c32.926-0.001,65.702-7.508,95.549-22.211    c4.955-2.44,6.992-8.435,4.552-13.39s-8.436-6.992-13.39-4.552c-40.871,20.134-87.786,25.397-132.104,14.822    C105.384,421.571,40.269,315.64,65.354,210.517c12.151-50.924,43.406-94.067,88.007-121.483    c44.601-27.416,97.211-35.821,148.132-23.671c105.123,25.084,170.238,131.017,145.154,236.14    c-8.39,35.16-26.314,67.277-51.836,92.881c-3.899,3.911-3.889,10.243,0.023,14.142c3.911,3.9,10.242,3.89,14.142-0.022    c28.125-28.216,47.879-63.61,57.125-102.357C479.493,250.025,470.228,192.049,440.015,142.896z" data-original="#000000" class="active-path" data-old_color="#7fbbd2" fill="#7fbbd2"/></g></g><g><g><path d="M379.883,420.997c-3.063-4.596-9.272-5.838-13.868-2.774l-0.404,0.273c-4.563,3.112-5.737,9.334-2.625,13.896    c1.937,2.838,5.075,4.365,8.27,4.365c1.941,0,3.903-0.564,5.627-1.74l0.227-0.153    C381.706,431.801,382.947,425.592,379.883,420.997z" data-original="#000000" class="active-path" data-old_color="#7fbbd2" fill="#7fbbd2"/></g></g><g><g><path d="M391.832,154.566v-7.636c0-14.293-11.627-25.921-25.92-25.921h-25.4c-14.293,0-25.92,11.628-25.92,25.921v15.92    c0,5.522,4.477,10,10,10h57.24c7.967,0,14.698,9.323,14.698,20.358V246h-71.715c-6.859-32.756-35.961-57.434-70.725-57.434    c-34.764,0-63.866,24.679-70.725,57.434H115.47v-52.791c0-11.035,6.731-20.358,14.698-20.358h127.948c5.523,0,10-4.478,10-10    c0-5.522-4.477-10-10-10H130.168c-19.133,0-34.698,18.104-34.698,40.358v125.583c0,22.253,15.565,40.358,34.698,40.358h251.663    c19.133,0,34.699-18.105,34.699-40.358V193.209C416.53,174.998,406.104,159.572,391.832,154.566z M371.831,152.851h-37.24v-5.92    c0-3.209,2.711-5.921,5.92-5.921h25.4c3.209,0,5.92,2.712,5.92,5.921V152.851z M254.089,208.566    c28.817,0,52.261,23.444,52.261,52.261c0,28.817-23.444,52.261-52.261,52.261c-28.817,0-52.261-23.444-52.261-52.261    C201.828,232.01,225.272,208.566,254.089,208.566z M396.529,318.792c0.001,11.035-6.73,20.358-14.697,20.358H130.168    c-7.967,0-14.698-9.322-14.698-20.358V266h66.564c2.664,37.437,33.952,67.087,72.055,67.087c38.103,0,69.391-29.65,72.055-67.087    h70.385V318.792z" data-original="#000000" class="active-path" data-old_color="#7fbbd2" fill="#7fbbd2"/></g></g><g><g><path d="M179.109,306.9h-0.511c-5.523,0-10,4.478-10,10c0,5.523,4.477,10,10,10h0.511c5.523,0,10-4.477,10-10    C189.109,311.378,184.632,306.9,179.109,306.9z" data-original="#000000" class="active-path" data-old_color="#7fbbd2" fill="#7fbbd2"/></g></g><g><g><path d="M371.169,193.333h-44.506c-5.523,0-10,4.477-10,10c0,5.522,4.477,10,10,10h44.506c5.523,0,10-4.478,10-10    C381.169,197.81,376.692,193.333,371.169,193.333z" data-original="#000000" class="active-path" data-old_color="#7fbbd2" fill="#7fbbd2"/></g></g><g><g><path d="M287.676,152.851h-0.475c-5.523,0-10,4.478-10,10c0,5.522,4.477,10,10,10h0.475c5.523,0,10-4.478,10-10    C297.676,157.329,293.199,152.851,287.676,152.851z" data-original="#000000" class="active-path" data-old_color="#7fbbd2" fill="#7fbbd2"/></g></g></g></svg>'
          // source={require('./../../../../assets/img/svg/camera.svg')}
          />

        </Button>
      );
    }

  }

  pausedCameraPreview() {
    this.setState({ showVideo: false, uri: '' })
    this.camera.resumePreview()
    this.props.navigation.goBack()
  }
  send() {
    const videoType = `video/${this.state.codec}`;
    const data = new FormData();
    let name = new Date().getTime()
    data.append("file", {
      name: `${name}.${this.state.codec}`,
      type: videoType,
      uri: this.state.uri
    });
    this.props.uploadData(data, '')
    this.props.navigation.goBack()
  }

  renderPlayPauseButton() {

    if (this.state.playVideo) {
      return (
        <Button transparent style={styles.playPauseButton} onPress={() => this.setState({ playVideo: !this.state.playVideo })}>
          <SvgUri width="50" height="50"
            svgXmlData='<?xml version="1.0" encoding="iso-8859-1"?><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 612.074 612.074" style="enable-background:new 0 0 612.074 612.074;" xml:space="preserve" width="512px" height="512px"><g><path d="M306.037,0.037C136.997,0.037,0,137.034,0,306.074s136.997,305.963,306.037,305.963S612.074,475.04,612.074,306   S475.077,0.037,306.037,0.037z M306.037,582.442c-152.203,0-276.368-124.165-276.368-276.368S153.834,29.706,306.037,29.706   s276.368,124.165,276.368,276.368S459.056,582.442,306.037,582.442z M425.381,285.232c-0.816,0-0.816-0.816-1.632-0.816   l-169.856-97.76c-5.637-3.189-10.384-4.821-16.021-4.821c-11.2,0-23.216,8.827-23.216,28.037v192.256   c0.816,19.211,12.016,28.037,24.032,28.037c5.637,0,11.2-1.632,16.837-4.821l162.587-93.754   c12.016-6.379,17.653-15.205,18.395-24.848C437.397,302.885,435.84,293.242,425.381,285.232z M244.325,398.197V215.509   l157.84,91.307L244.325,398.197z" fill="#7fbbd2"/></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>            '
          //  source={require('./../../../../assets/img/svg/play.svg')}
          />
        </Button>
      )
    } else {
      return (
        <Button transparent style={styles.playPauseButton} onPress={() => this.setState({ playVideo: !this.state.playVideo })}>
          <SvgUri width="50" height="50"
            svgXmlData='<?xml version="1.0" encoding="utf-8"?><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 129 129" enable-background="new 0 0 129 129" width="512px" height="512px"><g><g><path d="m64.5,122.6c32.1,0 58.1-26.1 58.1-58.1s-26-58.1-58.1-58.1-58.1,26-58.1,58.1 26,58.1 58.1,58.1zm0-108.1c27.5,0 50,22.4 50,50s-22.4,50-50,50-50-22.4-50-50 22.5-50 50-50z" fill="#7fbbd2"/><path d="m53.8,94.7c2.3,0 4.1-1.8 4.1-4.1v-53.1c0-2.3-1.8-4.1-4.1-4.1-2.3,0-4.1,1.8-4.1,4.1v53.1c7.10543e-15,2.3 1.8,4.1 4.1,4.1z" fill="#7fbbd2"/><path d="m75.2,94.7c2.3,0 4.1-1.8 4.1-4.1v-53.1c0-2.3-1.8-4.1-4.1-4.1-2.3,0-4.1,1.8-4.1,4.1v53.1c-1.42109e-14,2.3 1.8,4.1 4.1,4.1z" fill="#7fbbd2"/></g></g></svg>'
          // source={require('./../../../../assets/img/svg/pause.svg')} 
          />
        </Button>
      )
    }
  }


  render() {
    return (

      <View style={styles.container}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={this.state.cametaType}
          flashMode={RNCamera.Constants.FlashMode.on}
          permissionDialogTitle={"Permission to use camera"}
          permissionDialogMessage={
            "We need your permission to use your camera phone"
          }
          captureAudio={true}
          quality='4:3'
          codec='AppleProRes4444'

        >
          <Row>
            <Col size={1}>
              <Button transparent onPress={() => this.changeCamera()}><Icon name="ios-reverse-camera" style={{ color: '#fff', justifyContent: 'flex-end', flexDirection: 'row' }} /></Button>
            </Col>
            <Col size={5}></Col>
            <Col size={1}>
              <Button transparent onPress={() => this.props.navigation.goBack()}><Icon name="md-arrow-back" style={{ color: '#fff' }} /></Button>
            </Col>

          </Row>

          {this.renderButton()}
        </RNCamera>


        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.showVideo}
          onRequestClose={() => {
            this.setState({ showPicrure: false, uri: '' })
          }}>
          <View style={{ flex: 1, backgroundColor: '#d2d2d2', alignContent: 'center' }}>
            <Video
              source={{ uri: this.state.uri }}
              style={{ flex: 1 }}
              paused={this.state.playVideo}
              onEnd={() => this.setState({ playVideo: true })}
              repeat={true}
              style={styles.backgroundVideo}
              resizeMode="cover"
              volume={1.0}
              rate={1.0}
            />
            <Header style={{ backgroundColor: "#7fbbd2" }}>

              <Right style={{ flex: 0 }}>
                <Button transparent onPress={() => this.send()}><Icon name="md-checkmark-circle-outline" style={{ color: '#fff', justifyContent: 'flex-end', flexDirection: 'row' }} /></Button>
              </Right>

              <Body style={{ flex: 3 }} >
                <Image source={require('./../../../../assets/img/png/logo.png')} resizeMode='center' style={{ height: 56, width: 100 ,alignSelf:'center'}} />
              </Body>

              <Left style={{ flex: 0 }}>
                <Button transparent onPress={() => this.pausedCameraPreview()}><Icon name="ios-arrow-back" style={{ color: '#fff' }} /></Button>
              </Left>

            </Header>


            {this.renderPlayPauseButton()}
          </View>
        </Modal>

      </View>
    );
  }

}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    flexDirection: 'column'
  },
  headline: {
    alignSelf: "center",
    fontSize: 18,
    marginTop: 10,
    marginBottom: 30
  },
  videoTile: {
    alignSelf: "center",
    fontSize: 16,
    marginTop: 15
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  button: {
    justifyContent: 'center',
    alignSelf: 'center',
    paddingBottom: 20,
    height: 70,
    width: 60
  },
  backgroundVideo: {
    position: 'absolute',
    // top: 0,
    // left: 0,
    // bottom: 0,
    // right: 0,
    alignContent: 'center',
    height: '100%',
    width: '100%'
  },
  playPauseButton: {
    justifyContent: 'center',
    alignSelf: 'center',
    alignContent: 'center',
    marginTop: 300
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

export default connect(mapStateToProps, mapDispatchToProps)(TakeVideo);