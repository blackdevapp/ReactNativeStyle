import React, { Component } from 'react';

import { StyleSheet, Dimensions, Image, FlatList } from 'react-native'
import { Button, Text, Container, Row, Col, Input, Icon, Item, View, Card, CardItem } from 'native-base';
import SvgUri from 'react-native-svg-uri'
import Video from 'react-native-video';

const data = [
  { id: 1, url: 'http://s8.picofile.com/file/8342161734/lab_images2.png' },
  { id: 2, url: 'http://s8.picofile.com/file/8342161792/lab_images3.png' },
  { id: 3, url: 'http://s8.picofile.com/file/8342162000/lab_images4.png' },
  { id: 4, url: 'http://s9.picofile.com/file/8342162084/lab_images5.png' },
  { id: 5, url: 'http://s8.picofile.com/file/8342162168/lab_images6.png' },
  { id: 6, url: 'http://s9.picofile.com/file/8342162234/lab_imges1.png' },
  { id: 7, url: 'https://www.car.ir/files/cache/xfiles_galleries_7564171,P5B66c0990885e4a9028564bd9220dbdea9,P5D.jpg.pagespeed.ic.TyevE4Y1gT.webp' }]


export default class Test extends Component {

  constructor(props) {
    super(props)
    this.state = {
      playVideo: false
    }
  }

  renderPlayPauseButton() {

    if (!this.state.playVideo) {
      return require('./../../../assets/img/svg/play.svg')
    } else {
      return require('./../../../assets/img/svg/pause.svg')
    }

  }



  renderButton() {
    if (!this.state.playVideo) {
      return (
        <View style={styles.buttonsContainer} >
          <Button transparent style={{}}>
            <SvgUri svgXmlData='<?xml version="1.0" encoding="iso-8859-1"?><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 612.074 612.074" style="enable-background:new 0 0 612.074 612.074;" xml:space="preserve" width="512px" height="512px"><g><path d="M306.037,0C136.997,0,0,136.997,0,306.037s136.997,306.037,306.037,306.037s306.037-136.997,306.037-306.037   S475.077,0,306.037,0z M306.037,582.405c-152.203,0-276.368-124.165-276.368-276.368S153.834,29.669,306.037,29.669   s276.368,124.165,276.368,276.368S458.24,582.405,306.037,582.405z M425.381,315.68c5.637,5.637,5.637,15.205,0,20.843   l-108.96,109.702c-0.816,0.816-1.632,1.632-2.374,1.632l-0.816,0.816c-0.816,0-0.816,0.816-1.632,0.816   c-0.816,0-0.816,0-1.632,0.816c-0.816,0-0.816,0-1.632,0c-0.816,0-1.632,0-3.189,0c-0.816,0-1.632,0-3.189,0   c-0.816,0-0.816,0-1.632,0c-0.816,0-0.816,0-1.632-0.816c-0.816,0-0.816-0.816-1.632-0.816c0,0-0.816,0-0.816-0.816   c-0.816-0.816-1.632-0.816-2.374-1.632L185.877,335.706c-5.637-5.637-5.637-15.205,0-20.843s15.205-5.637,20.843,0l84.928,84.928   V165.035c0-8.011,6.379-14.39,14.39-14.39s14.39,6.379,14.39,14.39v234.683l83.37-83.296   C410.176,310.042,419.818,310.042,425.381,315.68z" fill="#FFFFFF"/></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>'
             width="30" height="30" fill='#ffffff' />
          </Button>
          <Button transparent
            onPress={() => this.setState({ playVideo: !this.state.playVideo })}
          >
            <SvgUri
              source={this.renderPlayPauseButton()}
              width="30"
              height="30"
              fill={!this.state.playVideo ? '#ffffff' : '#939496'}
            />
          </Button>
          <Button transparent style={{}}>
            <SvgUri source={require('./../../../assets/img/svg/share.svg')} width="30" height="30" fill='#ffffff' />
          </Button>
        </View>
      )
    } else {
      return (
        <View style={styles.buttonsContainer} >
          <Button transparent
            onPress={() => this.setState({ playVideo: !this.state.playVideo })}
          >
            <SvgUri
              source={this.renderPlayPauseButton()}
              width="30"
              height="30"
              fill={!this.state.playVideo ? '#ffffff' : '#939496'}
            />
          </Button>
        </View>
      )
    }
  }

  render() {

    return (
      <Container style={{ padding: 20, backgroundColor: '#eee' }}>

        <View style={{ flex: 2 }}></View>
        <View style={{ flex: 3, borderRadius: 15, padding: 20, backgroundColor: '#ffffff' }}>
          <View style={{ alignItems: 'center', flexDirection: 'column', flex: 1, padding: 10 }}>
            <FlatList
              horizontal={false}
              numColumns={3}
              data={data}
              paused={this.state.playVideo}
              onEnd={() => this.setState({ playVideo: true })}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <View style={{ padding: 7, width: Dimensions.get('window').width / 4, height: Dimensions.get('window').width / 4 }}>
                <Image
                  resizeMode='cover'
                  style={styles.image}
                  source={{ uri: item.url }}
                  defaultSource={require('./../../../assets/img/png/image.png')}
                />
              </View>}
            />

          </View>
          <View style={styles.videoContainer}>
            <Video
              source={{ uri: 'https://hw19.cdn.asset.aparat.com/aparat-video/2d56b38917db1b5259448b8d465bd21012072853-720p__26630.mp4' }}
              style={styles.video}
              paused={true}
              repeat={true}
              paused={!this.state.playVideo}
              onEnd={() => this.setState({ playVideo: true })}
              resizeMode="cover"
              volume={1.0}
              rate={1.0}
            />
            {this.renderButton()}
          </View>
        </View>

      </Container >
    );
  }
}

const styles = StyleSheet.create({
  buttonsContainer: {
    width: '100%',
    position: 'absolute',
    justifyContent: 'space-evenly',
    alignSelf: 'center', alignItems: 'center',
    flexDirection: 'row'
  },
  video: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  videoContainer: {
    alignSelf: 'center',
    flexDirection: 'column',
    padding: 10,
    flex: 1,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#939496',
    backgroundColor: '#939496',
    width: '80%',
    height: Dimensions.get('screen').height / 3,
    padding: 1,
    justifyContent: 'center'
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#939496'
  }

});


