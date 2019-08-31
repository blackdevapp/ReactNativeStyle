import React, { PureComponent } from 'react';
import {  View } from 'react-native';
import Accordion from '../../../../Components/Accordeon.component'
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import { Container, Button, Card, CardItem, Item, Input, Icon, Text, Fab, Label, Textarea } from 'native-base';
import { StyleSheet, Image, Dimensions, Modal, ScrollView, ImageBackground, BackHandler } from 'react-native';

const AVATAR_SIZE = 100;
const ROW_HEIGHT = 60;
const PARALLAX_HEADER_HEIGHT = 150;
const STICKY_HEADER_HEIGHT = 56;

class MyBillScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Container>
       <ParallaxScrollView>
            headerBackgroundColor="white"
            stickyHeaderHeight={STICKY_HEADER_HEIGHT}
            parallaxHeaderHeight={PARALLAX_HEADER_HEIGHT}
            backgroundSpeed={10}
            backgroundColor='#f4f4f4'
            renderBackground={() => (
              <View key="background" style={{ backgroundColor: '#f4f4f4' }}>
                <ImageBackground style={{
                  width: '100%', zIndex: 1,
                  height: PARALLAX_HEADER_HEIGHT,
                  backgroundColor: '#f4f4f4'
                }} resizeMode="cover"
                  source={require('../../../../assets/img/png/profileBack3.png')}>
                  <View style={{
                    position: 'absolute',
                    top: 0,
                    height: PARALLAX_HEADER_HEIGHT, backgroundColor: '#f4f4f4'
                  }} />
                </ImageBackground>
              </View>
            )}
            renderForeground={() => (
              <View key="parallax-header" style={styles1.parallaxHeader}>
                <Image style={styles1.avatar} source={{
                  uri: '../../../../assets/img/png/user.png',
                  width: AVATAR_SIZE,
                  height: AVATAR_SIZE

                }} />
              </View>
            )}

            renderStickyHeader={() => (
              <HeaderComponent title="پروفایل من" />
              // <View key="sticky-header" style={{ backgroundColor: '#7fbbd2', height: 56 }}>
              //   <Text style={styles1.stickySectionText}>پروفایل من </Text>
              // </View>
            )}

            renderFixedHeader={() => (
              <View key="fixed-header" style={styles1.fixedSection}>

              </View>
            )}>

              {/* <View style={{flex}}></View> */}
            </ParallaxScrollView>
      </Container>
    );
  }
}

export default MyBillScreen;