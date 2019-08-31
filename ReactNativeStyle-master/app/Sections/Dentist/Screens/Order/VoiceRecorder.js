import React, { Component } from 'react';
import { View, StyleSheet, Platform, Image, PermissionsAndroid, TouchableOpacity, Modal } from 'react-native';
import { Header, Left, Right, Icon, Button, Container, Thumbnail, Text, Body, Title } from 'native-base'
import { Row, Col, Grid } from 'react-native-easy-grid'
import { AudioRecorder, AudioUtils } from 'react-native-audio';
import { default as Sound } from 'react-native-sound';
import SvgUri from 'react-native-svg-uri';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { uploadData } from '../../Redux/Actions/Order.action'
import storageService from '../../../../Services/Storage.service'
class VoiceRecorder extends Component {



  constructor(props) {
    super(props);
    this.state = {
      name: String,
      currentTime: 0.0,
      recording: false,
      paused: false,
      playing: false,
      granted: Boolean,
      stoppedRecording: false,
      finished: false,
      audioPath: AudioUtils.DocumentDirectoryPath + '/test.aac',
      hasPermission: undefined,
      d: [],
      sound: null,
      text: '',
      palySound: false

    };
  }



  prepareRecordingPath(audioPath) {
    AudioRecorder.prepareRecordingAtPath(audioPath, {
      SampleRate: 22050,
      Channels: 1,
      AudioQuality: "Low",
      AudioEncoding: "aac",
      AudioEncodingBitRate: 32000
    });
    try{
      AudioRecorder.startRecording()

    }catch(e){
      console.log(e)
    }

  }

  componentDidMount() {
    this.requestPermission();

    // AudioRecorder.requestAuthorization().then((isAuthorised) => {
    //   this.setState({ hasPermission: isAuthorised });

    //   if (!isAuthorised) return;

    //   this.prepareRecordingPath(this.state.audioPath);

    //   AudioRecorder.onProgress = (data) => {
    //     this.setState({ currentTime: Math.floor(data.currentTime) });
    //   };


    //   AudioRecorder.onFinished = (data) => {
    //     console.warn('data in on finish')
    //     console.warn(data)
    //     // Android callback comes in the form of a promise instead.
    //     if (Platform.OS === 'ios') {
    //       this._finishRecording(data.status === "OK", data.audioFileURL, data.audioFileSize);
    //     }
    //   };
    // })

  }

  componentDidUpdate(){
      AudioRecorder.onProgress = (data) => {
        this.setState({ currentTime: Math.floor(data.currentTime) });
      };
  }

  render() {

    return (

      <Container style={{ backgroundColor: '#F7F7F7' }}>

        <Header style={{ backgroundColor: "#7fbbd2" }}>
          <Left style={{ flex: 2 }}>
            <TouchableOpacity transparent style={{ justifyContent: 'flex-end' }} onPress={() => this.uploadAudio()}><Icon name='md-checkmark-circle-outline' size style={{ color: '#fff' }} /></TouchableOpacity>
          </Left>
          <Body style={{ flex: 3 }} >
            <Title style={{ alignSelf: 'center' }}>Recorder</Title>
          </Body>
          <Right style={{ flex: 2 }}>
            <TouchableOpacity transparent style={{ justifyContent: 'flex-start' }} onPress={() => this.props.navigation.goBack()} >
              <Icon name='ios-arrow-back' style={{ color: '#fff' }} />
            </TouchableOpacity>

          </Right>
        </Header>
        <Grid>
          <Row style={style.header}>
            <Image style={{ justifyContent: 'center', alignSelf: 'center', resizeMode: 'center', width: '80%' }} source={require('../../../../../app/assets/img/png/logo.png')} />
            <Text style={style.text}>{this.state.text}</Text>
            <Text style={style.timer} >{this._renderTimer()}</Text>
          </Row>

          <Row style={style.footer} >
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              {this.renderRecourdAgaine()}
              {this.renderRecordButton()}
            </View>
          </Row>
        </Grid>
      </Container>
    );
  }


  renderRecordButton() {
    const { recording, paused } = this.state

    if (!recording) {
      if (!paused) {
        return (

          <TouchableOpacity style={{ paddingLeft: 10 }} onPress={() => {
            this.setState({ paused: false, recording: true, text: 'در حال ضبط' })
            this._record()
          }}>
            <SvgUri
              width="80"
              height="80"
              svgXmlData='<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 496.158 496.158" style="enable-background:new 0 0 496.158 496.158;" xml:space="preserve" width="512px" height="512px" class=""><g><path style="fill:#7FBBD2" d="M496.158,248.085c0-137.022-111.07-248.082-248.076-248.082C111.07,0.003,0,111.063,0,248.085  c0,137.001,111.07,248.07,248.082,248.07C385.088,496.155,496.158,385.086,496.158,248.085z" data-original="#337180" class="" data-old_color="#7fbbd2"/><path style="fill:#FFFFFF" d="M303.303,239.168c0,30.498-24.722,55.224-55.225,55.224l0,0c-30.501,0-55.226-24.726-55.226-55.224  v-82.836c0-30.497,24.725-55.222,55.226-55.222l0,0c30.503,0,55.225,24.725,55.225,55.222V239.168z" data-original="#B5E3EA" class="active-path" data-old_color="#FBFDFD"/><path style="fill:#7FBBD2" d="M285.229,190.05h-74.3v-31.669c0-20.516,16.632-37.15,37.149-37.15l0,0  c20.521,0,37.151,16.634,37.151,37.15L285.229,190.05L285.229,190.05z" data-original="#337180" class="" data-old_color="#7fbbd2"/><path style="fill:#FFFFFF" d="M337.034,198.308c-6.456,0-11.689,5.232-11.689,11.687v31.184c0,42.606-34.66,77.266-77.267,77.266  c-42.604,0-77.266-34.66-77.266-77.266v-31.184c0-6.455-5.232-11.687-11.688-11.687c-6.454,0-11.688,5.232-11.688,11.687v31.184  c0,51.54,38.949,94.129,88.956,99.941v30.554h-27.137c-6.454,0-11.686,5.234-11.686,11.688c0,6.455,5.231,11.687,11.686,11.687  h77.648c6.454,0,11.686-5.231,11.686-11.687c0-6.454-5.231-11.688-11.686-11.688h-27.137v-30.555  c50.007-5.812,88.956-48.401,88.956-99.941v-31.184C348.723,203.54,343.488,198.308,337.034,198.308z" data-original="#B5E3EA" class="active-path" data-old_color="#FBFDFD"/></g> </svg>                  '
            />
          </TouchableOpacity>
        )

      } else {


        return (

          <TouchableOpacity style={{ paddingLeft: 10 }} onPress={() => {
            this.setState({ paused: true, recording: true, text: 'در حال پخش' })
            this._play()
          }
          }>
            <SvgUri
              width="80"
              height="80"
              svgXmlData='<?xml version="1.0" encoding="iso-8859-1"?><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 612.074 612.074" style="enable-background:new 0 0 612.074 612.074;" xml:space="preserve" width="512px" height="512px"><g><path d="M306.037,0.037C136.997,0.037,0,137.034,0,306.074s136.997,305.963,306.037,305.963S612.074,475.04,612.074,306   S475.077,0.037,306.037,0.037z M306.037,582.442c-152.203,0-276.368-124.165-276.368-276.368S153.834,29.706,306.037,29.706   s276.368,124.165,276.368,276.368S459.056,582.442,306.037,582.442z M425.381,285.232c-0.816,0-0.816-0.816-1.632-0.816   l-169.856-97.76c-5.637-3.189-10.384-4.821-16.021-4.821c-11.2,0-23.216,8.827-23.216,28.037v192.256   c0.816,19.211,12.016,28.037,24.032,28.037c5.637,0,11.2-1.632,16.837-4.821l162.587-93.754   c12.016-6.379,17.653-15.205,18.395-24.848C437.397,302.885,435.84,293.242,425.381,285.232z M244.325,398.197V215.509   l157.84,91.307L244.325,398.197z" fill="#7fbbd2"/></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>                      '
            // source={require('../../../../assets/img/svg/mic.svg')}
            />
          </TouchableOpacity>
        )

      }
    } else {
      if (!paused) {

        return (
          <TouchableOpacity style={{ paddingLeft: 10 }} onPress={() => {
            this.setState({ paused: true, recording: false, text: '' })
            this._stop()
          }}>
            <SvgUri
              width="80"
              height="80"
              svgXmlData='<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" height="512px" version="1.1" viewBox="0 0 512.00002 512.00002" width="512px"><g id="surface1"><path d="M 437.019531 74.980469 C 388.667969 26.628906 324.378906 0 256 0 C 187.621094 0 123.332031 26.628906 74.980469 74.980469 C 26.628906 123.332031 0 187.621094 0 256 C 0 324.378906 26.628906 388.667969 74.980469 437.019531 C 123.332031 485.371094 187.621094 512 256 512 C 298.707031 512 341.09375 501.191406 378.585938 480.742188 C 383.433594 478.097656 385.21875 472.023438 382.574219 467.175781 C 379.929688 462.324219 373.855469 460.539062 369.007812 463.183594 C 334.445312 482.035156 295.367188 492 256 492 C 125.871094 492 20 386.128906 20 256 C 20 125.867188 125.871094 20 256 20 C 386.132812 20 492 125.867188 492 256 C 492 319.039062 467.453125 378.304688 422.878906 422.878906 C 418.972656 426.78125 418.972656 433.113281 422.878906 437.019531 C 426.78125 440.925781 433.113281 440.925781 437.019531 437.019531 C 460.910156 413.128906 479.582031 385.183594 492.511719 353.96875 C 505.445312 322.75 512 289.789062 512 256 C 512 187.621094 485.371094 123.332031 437.019531 74.980469 Z M 437.019531 74.980469 " style=" fill-rule:nonzero;fill-opacity:1;" stroke="#7fbbd2" fill="#7fbbd2"/><path d="M 111.75 97.609375 C 107.84375 93.703125 101.511719 93.703125 97.605469 97.609375 C 76.699219 118.515625 60.363281 142.964844 49.050781 170.277344 C 37.738281 197.59375 32 226.433594 32 256 C 32 315.832031 55.300781 372.082031 97.609375 414.390625 C 139.914062 456.699219 196.167969 480 256 480 C 315.832031 480 372.085938 456.699219 414.394531 414.390625 C 456.703125 372.085938 480 315.832031 480 256 C 480 196.167969 456.699219 139.914062 414.394531 97.605469 C 372.085938 55.296875 315.832031 32 256 32 C 221.414062 32 186.777344 40.175781 155.839844 55.640625 C 150.898438 58.109375 148.898438 64.117188 151.367188 69.054688 C 153.835938 73.996094 159.84375 75.996094 164.78125 73.527344 C 192.957031 59.445312 224.5 52 256 52 C 368.484375 52 460 143.515625 460 256 C 460 368.484375 368.484375 460 256 460 C 143.515625 460 52 368.484375 52 256 C 52 201.507812 73.21875 150.28125 111.75 111.75 C 115.65625 107.84375 115.65625 101.511719 111.75 97.609375 Z M 111.75 97.609375 " style=" fill-rule:nonzero;fill-opacity:1;" stroke="#7fbbd2" fill="#7fbbd2"/><path d="M 126.378906 95.730469 C 128.507812 95.730469 130.648438 95.050781 132.464844 93.65625 C 136.855469 90.371094 137.78125 84.15625 134.527344 79.730469 C 131.253906 75.277344 124.996094 74.324219 120.546875 77.597656 L 120.242188 77.828125 C 115.878906 81.214844 115.085938 87.496094 118.472656 91.859375 C 120.445312 94.398438 123.394531 95.730469 126.378906 95.730469 Z M 126.378906 95.730469 " style=" fill-rule:nonzero;fill-opacity:1;" stroke="#7fbbd2" fill="#7fbbd2"/><path d="M 402.230469 441.234375 L 402.109375 441.335938 C 397.796875 444.769531 397.113281 451.011719 400.539062 455.332031 C 402.503906 457.816406 405.425781 459.105469 408.378906 459.105469 C 410.5625 459.105469 412.761719 458.402344 414.601562 456.953125 L 414.726562 456.855469 C 419.039062 453.421875 419.71875 447.175781 416.296875 442.855469 C 412.875 438.535156 406.5625 437.828125 402.230469 441.234375 Z M 402.230469 441.234375 " style=" fill-rule:nonzero;fill-opacity:1;" stroke="#7fbbd2" fill="#7fbbd2"/><path d="M 324 346 C 336.128906 346 346 336.128906 346 324 L 346 188 C 346 175.867188 336.132812 166 324 166 L 188 166 C 175.871094 166 166 175.867188 166 188 L 166 324 C 166 336.128906 175.871094 346 188 346 Z M 186 324 L 186 188 C 186 186.914062 186.917969 186 188 186 L 324 186 C 325.085938 186 326 186.914062 326 188 L 326 324 C 326 325.082031 325.085938 326 324 326 L 188 326 C 186.917969 326 186 325.082031 186 324 Z M 186 324 " style=" fill-rule:nonzero;fill-opacity:1;" stroke="#7fbbd2" fill="#7fbbd2"/></g></svg>'
            />
          </TouchableOpacity>
        )
      } else {

        return (
          <TouchableOpacity style={{ paddingLeft: 10 }} onPress={() => {
            this.setState({ paused: true, recording: false, text: '' })
            this._pause()
          }}>
            <SvgUri
              width="80"
              height="80"

              svgXmlData='<?xml version="1.0" encoding="utf-8"?><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 129 129" enable-background="new 0 0 129 129" width="512px" height="512px"><g><g><path d="m64.5,122.6c32.1,0 58.1-26.1 58.1-58.1s-26-58.1-58.1-58.1-58.1,26-58.1,58.1 26,58.1 58.1,58.1zm0-108.1c27.5,0 50,22.4 50,50s-22.4,50-50,50-50-22.4-50-50 22.5-50 50-50z" fill="#7fbbd2"/><path d="m53.8,94.7c2.3,0 4.1-1.8 4.1-4.1v-53.1c0-2.3-1.8-4.1-4.1-4.1-2.3,0-4.1,1.8-4.1,4.1v53.1c7.10543e-15,2.3 1.8,4.1 4.1,4.1z" fill="#7fbbd2"/><path d="m75.2,94.7c2.3,0 4.1-1.8 4.1-4.1v-53.1c0-2.3-1.8-4.1-4.1-4.1-2.3,0-4.1,1.8-4.1,4.1v53.1c-1.42109e-14,2.3 1.8,4.1 4.1,4.1z" fill="#7fbbd2"/></g></g></svg>                      '
            // source={require('../../../../assets/img/svg/mic.svg')}
            />
          </TouchableOpacity>
        )

      }
    }

  }

  renderRecourdAgaine() {
    return (
      <TouchableOpacity style={{ justifyContent: 'flex-end', paddingLeft: 10 }} onPress={() => {
        this.setState({ recording: false, paused: false,currentTime:0.0 })
        if(this.state.recording){
          this._stop()
        }
        }}>
        <SvgUri
          width="50"
          height="50"
          svgXmlData='<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 400 400"><path d="M361.8 209.7c-7.9 0-14.3 6.4-14.3 14.3 0 81.3-66.2 147.5-147.5 147.5 -81.3 0-147.5-66.2-147.5-147.5 0-76.5 58.6-139.6 133.2-146.8v32.9c0 5.1 2.7 9.8 7.1 12.4 2.2 1.3 4.7 1.9 7.1 1.9 2.5 0 4.9-0.6 7.1-1.9l82.9-47.9c4.4-2.5 7.1-7.3 7.1-12.4 0-5.1-2.7-9.8-7.1-12.4L207.1 1.9c-4.4-2.6-9.9-2.6-14.3 0 -4.4 2.5-7.1 7.3-7.1 12.4v34.2c-90.4 7.3-161.8 83.2-161.8 175.4 0 97.1 79 176.1 176.1 176.1 97.1 0 176.1-79 176.1-176.1C376.1 216 369.7 209.7 361.8 209.7z" fill="#7fbbd2"/></svg>'
        />
      </TouchableOpacity>
    )
  }
  _renderTimer() {
    let { currentTime } = this.state;
    let hour = Math.floor(currentTime / (60 * 60));
    let min = Math.floor(currentTime / 60);
    let sec = Math.floor(currentTime % 60)

    if (min == 0 && hour == 0 && sec == 0) {
      return '00 : 00 : 00'
    }


    let horst = hour < 10 ? '0' + hour : '' + hour
    let minst = min < 10 ? '0' + min : '' + min
    let secst = sec < 10 ? '0' + sec : '' + sec


    return horst + ' : ' + minst + ' : ' + secst;
  }




  async _pause() {
    sound.pause()
  }

  async _resume() {
    if (!this.state.paused) {
      console.warn('Can\'t resume, not paused!');
      return;
    }

    try {
      await AudioRecorder.resumeRecording();
      this.setState({ paused: false });
    } catch (error) {
      console.error(error);
    }
  }

  async _stop() {
    if (!this.state.recording) {
      console.warn('Can\'t stop, not recording!');
      return;
    }
    try {
      const filePath = await AudioRecorder.stopRecording();
      if (Platform.OS === 'ios') {
        AudioRecorder.onFinished = (data) => {
          this._finishRecording(data.status === "OK");
        }
      }
      if (Platform.OS === 'android') {
        this._finishRecording(true);
      }
      return filePath;
    } catch (error) {
      console.error(error);
    }
  }

  async _play() {
    if (this.state.recording) {
      await this._stop();
    }
    sound = new Sound(this.state.audioPath, '', (error) => {
      if (error) {
        alert('failed to load the sound');
      }
    });
    if (sound.isLoaded()) {
      sound.play()
    } else {
      // alert(1);
      setTimeout(() => {
        setTimeout(() => {
          sound.play((success) => {
            if (success) {
              this.setState({
                paused: true, recording: false, text: ''
              })
              console.log('successfully finished playing');
            } else {
              console.log('playback failed due to audio decoding errors');
            }
          })
        }, 100);
      }, 100);
    }
  }

  async stopPlaying() {
    const { sound } = this.state
    sound.stop()
    this.setState({ playing: false })
  }

  _record() {
    if (this.state.granted) {
      if (this.state.recording) {
        console.warn('Already recording!');
        return;
      }

      if (this.state.stoppedRecording) {
        this.prepareRecordingPath(this.state.audioPath);
      }
      try {
        this.prepareRecordingPath(this.state.audioPath)
      } catch (error) {
        console.error(error);
      }
    } else {
      
    }

  }

  _finishRecording(didSucceed) {
    this.setState({ finished: didSucceed ,
    recording:false});
  }

  requestPermission() {
    try {
      PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO).then(data => {
        if (!data) {
          this.setState({
            granted: PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
              {
                'title': 'Dentrace want to access to record audio',
                'message': 'we want location for get your current location for notify to you some offer.'
              }
            )
          })
        } else {
          this.setState({
            granted: data
          })
        }
      })
    } catch{

    }
  }

  async uploadAudio() {
    const path = 'file://' + this.state.audioPath;
    let name = new Date().getTime()
    let file = { uri: path, type: 'audio/aac', name: `${name}.aac` };
    const formData = new FormData();
    formData.append('file', file);
    try {
      this.props.uploadData(formData, 'multipart/form-data;boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW')
      this.setState({ showRecorder: false })
      this.props.navigation.goBack()
    } catch (e) {
      alert('Network issue')
      this.props.navigation.goBack()
    }
  }
}


const style = StyleSheet.create({
  container: {
    // height:'100%',
    flex: 1,
    backgroundColor: '#000'
  },
  header: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#7fbbd2',
    justifyContent: 'center'
  },
  footer: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    flexDirection: 'row'


  },
  timer: {
    alignSelf: 'center',
    textAlign: 'center',
    color: '#fff',
    fontSize: 50,
    paddingTop: 30
  },
  text: {
    alignSelf: 'center',
    textAlign: 'center',
    color: '#fff',
    fontSize: 15
  },
  button: {
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 100,
    padding: 10
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

export default connect(mapStateToProps, mapDispatchToProps)(VoiceRecorder);