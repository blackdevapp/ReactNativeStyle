import React, { Component } from 'react';

import { StyleProvider, Spinner, Container, Row, Text } from 'native-base';
import getTheme from './native-base-theme/components';
import material from './native-base-theme/variables/material';
import { Provider } from 'react-redux';
import store from './app/Redux';
import { I18nManager, View, Image, NetInfo, StyleSheet, Dimensions } from 'react-native';
import AppDrawerNav from './DrawerNav'
import Pushe from 'react-native-pushe'

const { width } = Dimensions.get('window');


function MiniOfflineSign() {
  return (
    <View style={styles.offlineContainer}>
      <Text style={styles.offlineText}>از اتصال خود به اینترنت مطمین شوید</Text>
    </View>
  );
}

class App extends Component {

  constructor(props) {
    super(props)
    Pushe.initialize(true);

    this.state = {
      mode: 'splash',
      isConnected: true

    }
  }

  componentDidMount() {
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
  }

  handleConnectivityChange = isConnected => {
    if (isConnected) {
      this.setState({ isConnected });
    } else {
      this.setState({ isConnected });
    }
  };

  componentWillMount() {
    I18nManager.forceRTL(true);
    console.disableYellowBox = true;
  }



  render() {
    let self = this;
    setTimeout(function () {
      self.setState({ mode: 'page' })
    }, 2000)

    if (this.state.mode == 'splash') {
      return (
        <View style={{ flex: 1, backgroundColor: '#f4f4f4' }}>
          <Image style={{ flex: 1, height: null, width: null, resizeMode: 'cover' }} source={require('./app/assets/img/png/splash.png')} />
          <Spinner style={{}} size='large' color='#7fbbd2' />
        </View>
      )
    } else {
      if (!this.state.isConnected) {
        return <MiniOfflineSign />;
      } else {
        return (

          <StyleProvider style={getTheme(material)}>
            <Provider store={store}>
              <AppDrawerNav />
            </Provider>
          </StyleProvider>
        );
      }

    }
  }
}
const styles = StyleSheet.create({
  offlineContainer: {
    backgroundColor: '#b52424',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width,
    position: 'absolute',
    top: 30
  },
  offlineText: { color: '#fff' }
});
export default App;
