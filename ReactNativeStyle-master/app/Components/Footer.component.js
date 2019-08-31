import React, { PureComponent } from 'react';
import {  View, Text } from 'react-native';

class FooterComponent extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View>
        <Text> FooterComponent </Text>
      </View>
    );
  }
}

export default FooterComponent;
