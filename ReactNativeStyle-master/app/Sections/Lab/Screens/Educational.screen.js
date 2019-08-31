import React, { PureComponent } from 'react';
import { StyleSheet, Dimensions, Image } from 'react-native'
import { Button, Text, Container, Grid, Row, Col, Fab, Icon } from 'native-base';
import SvgUri from 'react-native-svg-uri';
import HeaderComponent from '../../../Components/Header.component';

export default class EducationalScreen extends PureComponent {
  constructor(props) {
    super(props)
  }
  render() {
    let buttonSize = Dimensions.get('screen').width / 3;
    return (
      <Container style={styles.container}>
        <HeaderComponent title="نکات آموزشی" color='#7EDAD1' />
        <Grid>
          <Row style={{ flex: 1 }}><Image source={require('./../../../assets/img/png/header4.png')} style={{ height: '100%', width: '100%' }} /></Row>

          <Row style={{ flex: 2, flexDirection: 'row' }}>
            <Grid>
              <Row >
                <Grid style={{}}>
                  <Col size={1}></Col>
                  <Col size={7}>
                    <Row size={1}></Row>
                    <Row size={5}>
                      <Col style={{ padding: 5, flex: 1 }}>
                        <Button block style={{ height: buttonSize, width: buttonSize, backgroundColor: '#CACACA', borderRadius: 30 }}>
                          <SvgUri
                            style={{ justifyContent: 'center', alignSelf: 'center' }}
                            width="80"
                            height="80"
                            svgXmlData='<?xml version="1.0" encoding="iso-8859-1"?><svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"viewBox="0 0 57 57" style="enable-background:new 0 0 57 57;" xml:space="preserve"><g><path d="M5,53h47V19H5V53z M50,51H8.649l14.324-12.611l10.302,10.301c0.391,0.391,1.023,0.391,1.414,0s0.391-1.023,0-1.414l-4.807-4.807l9.181-10.054L50,42.44V51z M7,21h43v18.727l-10.324-9.464c-0.196-0.179-0.458-0.28-0.72-0.262c-0.265,0.012-0.515,0.129-0.694,0.325l-9.794,10.727l-4.743-4.743c-0.374-0.373-0.972-0.391-1.368-0.044L7,49.787V21z"/><path d="M15,24c-3.071,0-5.569,2.498-5.569,5.569c0,3.07,2.498,5.568,5.569,5.568s5.569-2.498,5.569-5.568C20.569,26.498,18.071,24,15,24z M15,33.138c-1.968,0-3.569-1.601-3.569-3.568S13.032,26,15,26s3.569,1.602,3.569,3.569S16.968,33.138,15,33.138z"/><path d="M49.38,15c-1.79-1.586-11.313-9.958-16.748-13.415C31.72,0.615,30.434,0,29,0s-2.72,0.615-3.632,1.585C19.933,5.042,10.41,13.414,8.62,15H1v42h55V15H49.38z M26.069,4.369c0.009-0.043,0.028-0.083,0.039-0.125c0.145-0.535,0.415-0.949,0.66-1.224c0.005-0.005,0.006-0.012,0.011-0.018C27.328,2.391,28.116,2,29,2s1.672,0.391,2.221,1.002c0.005,0.005,0.006,0.012,0.011,0.018c0.245,0.275,0.515,0.69,0.66,1.225c0.011,0.042,0.029,0.082,0.039,0.125C31.974,4.564,32,4.774,32,5c0,1.654-1.346,3-3,3s-3-1.346-3-3C26,4.774,26.026,4.564,26.069,4.369z M24,4.95c0,0.017,0,0.033,0,0.05c0,2.757,2.243,5,5,5s5-2.243,5-5c0-0.017,0-0.033,0-0.05c4.17,3.033,9.504,7.581,12.345,10.05H11.655C14.496,12.531,19.831,7.983,24,4.95z M54,55H3V17h6h40h5V55z"/></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>'
                            fill='#ff00ff'
                          />

                        </Button>
                        <Text style={{ justifyContent: 'flex-end', marginTop: 10, textAlign: 'center', color: '#696969', fontSize: 10 }} >عکس</Text>
                      </Col>
                      <Col style={{ padding: 5, flex: 1 }}>
                        <Button block style={{ height: buttonSize, width: buttonSize, backgroundColor: '#CACACA', borderRadius: 30 }}>
                          <SvgUri
                            style={{ justifyContent: 'center', alignSelf: 'center' }}
                            width="80"
                            height="80"
                            fill={'#ffffff'}
                            svgXmlData='<?xml version="1.0" encoding="iso-8859-1"?><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"viewBox="0 0 512.001 512.001" style="enable-background:new 0 0 512.001 512.001;" xml:space="preserve"><g><g><path d="M412.113,170.747c-6.637,0-12.02,5.381-12.02,12.02v75.104c0,79.452-64.639,144.09-144.092,144.09S111.91,337.321,111.91,257.87v-75.104c0-6.639-5.383-12.02-12.02-12.02c-6.639,0-12.02,5.381-12.02,12.02v75.104c0,88.666,68.993,161.512,156.111,167.696v62.395h-62.174c-6.637,0-12.02,5.381-12.02,12.02c0,6.639,5.382,12.02,12.02,12.02h148.386c6.637,0,12.02-5.381,12.02-12.02c0-6.639-5.382-12.02-12.02-12.02H268.02v-62.395c87.119-6.184,156.111-79.031,156.111-167.696v-75.104C424.133,176.128,418.75,170.747,412.113,170.747z"/></g></g><g><g><path d="M264.011,0h-16.02c-54.949,0-99.653,44.704-99.653,99.653V265.88c0,54.949,44.704,99.653,99.653,99.653h16.02c54.949,0,99.653-44.704,99.653-99.653V99.653C363.664,44.704,318.96,0,264.011,0z M339.625,130.853h-43.572c-6.639,0-12.02,5.381-12.02,12.02c0,6.639,5.381,12.02,12.02,12.02h43.572v33.458h-43.572c-6.639,0-12.02,5.381-12.02,12.02s5.381,12.02,12.02,12.02h43.572v33.46h-43.572c-6.639,0-12.02,5.381-12.02,12.02s5.381,12.02,12.02,12.02h43.464c-2.091,39.836-35.157,71.603-75.505,71.603h-16.02c-40.348,0-73.414-31.767-75.505-71.603h43.464c6.639,0,12.02-5.381,12.02-12.02s-5.381-12.02-12.02-12.02h-43.572v-33.46h43.572c6.639,0,12.02-5.381,12.02-12.02s-5.381-12.02-12.02-12.02h-43.572v-33.458h43.572c6.639,0,12.02-5.381,12.02-12.02c0-6.639-5.381-12.02-12.02-12.02h-43.572v-31.2c0-29.964,17.52-55.914,42.854-68.143v33.983c0,6.639,5.382,12.02,12.02,12.02s12.02-5.381,12.02-12.02V24.558c2.863-0.331,30.595-0.331,33.458,0v40.935c0,6.639,5.381,12.02,12.02,12.02c6.637,0,12.02-5.381,12.02-12.02V31.51c25.334,12.229,42.854,38.177,42.854,68.142V130.853z"/></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>                                '
                          // source={require('./../../../assets/img/svg/microphone.svg')}
                          />
                        </Button>
                        <Text style={{ justifyContent: 'flex-end', marginTop: 10, textAlign: 'center', color: '#696969', fontSize: 10 }} >صدا</Text>
                      </Col>
                    </Row>
                    <Row size={5} >

                      <Col style={{ padding: 5, flex: 1 }}>
                        <Button block style={{ height: buttonSize, width: buttonSize, backgroundColor: '#CACACA', borderRadius: 30 }}>
                          <SvgUri
                            style={{ justifyContent: 'center', alignSelf: 'center' }}
                            width="80"
                            height="80"
                            fill='#ffffff'
                            svgXmlData='<?xml version="1.0" encoding="iso-8859-1"?><svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"viewBox="0 0 58 58" style="enable-background:new 0 0 58 58;" xml:space="preserve"><g><path d="M36.537,28.156l-11-7c-0.308-0.195-0.698-0.208-1.019-0.033C24.199,21.299,24,21.635,24,22v14c0,0.365,0.199,0.701,0.519,0.877C24.669,36.959,24.834,37,25,37c0.187,0,0.374-0.053,0.537-0.156l11-7C36.825,29.66,37,29.342,37,29S36.825,28.34,36.537,28.156z M26,34.179V23.821L34.137,29L26,34.179z"/><path d="M57,6H47H11H1C0.448,6,0,6.447,0,7v11v11v11v11c0,0.553,0.448,1,1,1h10h36h10c0.552,0,1-0.447,1-1V40V29V18V7C58,6.447,57.552,6,57,6z M10,28H2v-9h8V28z M2,30h8v9H2V30z M12,40V29V18V8h34v10v11v11v10H12V40z M56,28h-8v-9h8V28z M48,30h8v9h-8V30z M56,8v9h-8V8H56z M2,8h8v9H2V8z M2,50v-9h8v9H2z M56,50h-8v-9h8V50z"/></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>                                '
                          // source={require('./../../../assets/img/svg/video-player.svg')}
                          />
                        </Button>
                        <Text style={{ justifyContent: 'flex-end', marginTop: 10, textAlign: 'center', color: '#696969', fontSize: 10 }} >ویدیو</Text>
                      </Col>
                      <Col style={{ padding: 5, flex: 1 }}>
                        <Button block style={{ height: buttonSize, width: buttonSize, backgroundColor: '#CACACA', borderRadius: 30 }}>
                          <SvgUri
                            style={{ justifyContent: 'center', alignSelf: 'center' }}
                            width="80"
                            height="80"
                            svgXmlData='<?xml version="1.0" encoding="iso-8859-1"?><svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"viewBox="0 0 60 60" style="enable-background:new 0 0 60 60;" xml:space="preserve"><path d="M13,0c-1.547,0-3.033,0.662-4.078,1.817C7.895,2.954,7.389,4.476,7.525,6H7.5v48.958C7.5,57.738,9.762,60,12.542,60H52.5V11V9V0H13z M9.5,54.958V9.998c0.836,0.629,1.875,1.002,3,1.002v46.996C10.842,57.973,9.5,56.621,9.5,54.958z M50.5,58h-36V11h3v25.201c0,0.682,0.441,1.262,1.099,1.444c0.137,0.037,0.273,0.056,0.408,0.056c0.015,0,0.029-0.005,0.044-0.006c0.045-0.001,0.088-0.012,0.133-0.017c0.103-0.012,0.202-0.033,0.299-0.066c0.048-0.016,0.093-0.035,0.138-0.056c0.094-0.043,0.18-0.097,0.263-0.159c0.036-0.027,0.073-0.05,0.106-0.08c0.111-0.099,0.212-0.211,0.292-0.346l4.217-7.028l4.217,7.029c0.327,0.545,0.939,0.801,1.55,0.687c0.045-0.008,0.089-0.002,0.134-0.014c0.657-0.183,1.099-0.763,1.099-1.444V11h19V58z M29.64,9.483l-0.003,0.007L29.5,9.764v0.042l-0.1,0.23l0.1,0.152v0.112V34.39l-5-8.333l-5,8.333V10.236L21.118,7h9.764L29.64,9.483z M32.118,9l2-4H19.882l-2,4h-4.67c-1.894,0-3.516-1.379-3.693-3.14c-0.101-0.998,0.214-1.957,0.887-2.701C11.071,2.422,12.017,2,13,2h37.5v1h-5c-0.553,0-1,0.447-1,1s0.447,1,1,1h5v1h-4c-0.553,0-1,0.447-1,1s0.447,1,1,1h4v1H32.118z"/><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>                                '
                            // source={require('./../../../assets/img/svg/book.svg')}
                            fill='#ffffff'
                          />
                        </Button>
                        <Text style={{ justifyContent: 'flex-end', marginTop: 10, textAlign: 'center', color: '#696969', fontSize: 10 }} >متن</Text>
                      </Col>
                    </Row>
                    <Row size={1}></Row>
                  </Col>

                  <Col size={1}></Col>

                </Grid>
              </Row>
            </Grid>
          </Row>
        </Grid>
        <Fab
          style={{ backgroundColor: '#e7be00', position: 'absolute', bottom: 20, width: 40, height: 40, right: 3 }}
          position="bottomRight"
          onPress={() => this.props.navigation.goBack()}>
          <Icon name="ios-home-outline" />
        </Fab>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: '#eee'
  }
});



