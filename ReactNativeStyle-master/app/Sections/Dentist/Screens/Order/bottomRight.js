import React, { Component } from 'react';
import { View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Text, Icon } from 'native-base'
import SvgUri from 'react-native-svg-uri';
import { Col, Row, Grid } from "react-native-easy-grid";



class BottomRight extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bottomRight: [
        { number: 8, color: '#7EBBD1' },
        { number: 7, color: '#7EBBD1' },
        { number: 6, color: '#7EBBD1' },
        { number: 5, color: '#7EBBD1' },
        { number: 4, color: '#7EBBD1' },
        { number: 3, color: '#7EBBD1' },
        { number: 2, color: '#7EBBD1' },
        { number: 1, color: '#7EBBD1' },
      ],
      all: false
    };
  }
  componentWillReceiveProps(){
    if(this.props.teeth==true){
      this.setState({
        bottomRight: [
          { number: 8, color: '#7EBBD1' },
        { number: 7, color: '#7EBBD1' },
        { number: 6, color: '#7EBBD1' },
        { number: 5, color: '#7EBBD1' },
        { number: 4, color: '#7EBBD1' },
        { number: 3, color: '#7EBBD1' },
        { number: 2, color: '#7EBBD1' },
        { number: 1, color: '#7EBBD1' },
        ]
      })
    }
  }
  componentDidMount() {
    this.scroll.scrollToEnd({ animated: true })
  }
  renderSelect(item, index) {
    if (item.color == '#7EBBD1') {
      this.setState(prevState => {
        const newItems = [...prevState.bottomRight];
        newItems[index].color = '#f4b841';
        return { bottomRight: newItems };
      })
    } else {
      this.setState(prevState => {
        const newItems = [...prevState.bottomRight];
        newItems[index].color = '#7EBBD1';
        return { bottomRight: newItems };
      })
    }
    let teeth = []
    for (let item of this.state.bottomRight) {
      if (item.color == '#f4b841') {
        teeth.push(item.number)
      }
    }
    this.props.bottomRightCallBack(teeth);
  }

  async renderSelectAll() {
    if (!this.state.all) {
      let teeth1 = [
        { number: 8, color: '#f4b841' },
        { number: 7, color: '#f4b841' },
        { number: 6, color: '#f4b841' },
        { number: 5, color: '#f4b841' },
        { number: 4, color: '#f4b841' },
        { number: 3, color: '#f4b841' },
        { number: 2, color: '#f4b841' },
        { number: 1, color: '#f4b841' },
      ]
      await this.setState({ bottomRight: teeth1, all: !this.state.all })
      let teeth = []
      for (let item of this.state.bottomRight) {
        if (item.color == '#f4b841') {
          teeth.push(item.number)
        }
      }
      this.props.bottomRightCallBack(teeth);
    } else {
      let teeth1 = [
        { number: 8, color: '#7EBBD1' },
        { number: 7, color: '#7EBBD1' },
        { number: 6, color: '#7EBBD1' },
        { number: 5, color: '#7EBBD1' },
        { number: 4, color: '#7EBBD1' },
        { number: 3, color: '#7EBBD1' },
        { number: 2, color: '#7EBBD1' },
        { number: 1, color: '#7EBBD1' },
      ]
      await this.setState({ bottomRight: teeth1, all: !this.state.all })
      let teeth = []
      for (let item of this.state.bottomRight) {
        if (item.color == '#f4b841') {
          teeth.push(item.number)
        }
      }
      this.props.bottomRightCallBack(teeth);
    }


  }

  render() {
    return (
      <Col style={[styles.colContainer]}>

        <Row>
          <ScrollView ref={(scroll) => { this.scroll = scroll; }} horizontal={true}>
            {this.state.bottomRight.map((item, index) => (
              <TouchableOpacity onPress={() => this.renderSelect(item, index)}>
                <SvgUri fill={item.color} width="25" height="25"
                  svgXmlData='<?xml version="1.0" encoding="iso-8859-1"?><svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"viewBox="0 0 388.027 388.027" style="enable-background:new 0 0 388.027 388.027;" xml:space="preserve"><g><g id="Guides_For_Artboard_44_"></g><g id="Artwork_43_"></g><g id="Layer_2_43_"><g><path style="fill:#E0DCD3;" d="M321.245,33.388c-42.923-50.028-116.041-11.012-126.401-5.091C161.518,5.563,114.967-14.449,77.567,14.088C50.613,34.573,35.108,61.097,31.445,92.771c-5.521,47.721,18.17,94.018,30.476,108.997c6.276,7.578,8.414,44.462,10.021,71.4c3.367,57.37,6.336,106.926,35.635,113.142c7.518,1.599,14.683,0.297,20.714-3.731c15.808-10.537,20.78-36.944,26.523-67.492c7.416-39.372,14.218-69.331,31.742-68.146c5.275,0.356,7.52,2.311,8.88,3.966c8.882,10.776,5.033,42.807,2.191,66.251c-4.086,33.926-7.63,63.291,14.742,69.803c2.012,0.593,4.5,1.066,7.342,1.066c4.499,0,9.887-1.186,15.808-4.736c34.338-20.663,61.396-109.885,71.815-158.019c27.338-21.256,45.174-52.337,49.199-85.965C359.61,113.374,355.998,73.945,321.245,33.388L321.245,33.388z"/></g></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>'
                // source={require('../../../../assets/img/svg/tooth.svg')}
                />
                <Text style={styles.buttonText}>{item.number}</Text>
              </TouchableOpacity>
            ))
            }
          </ScrollView>
        </Row>
        <Row>
          <Col size={50}>
            <TouchableOpacity onPress={() => this.renderSelectAll()}>
              <Row>
                {this.state.all ? <Icon style={{ color: 'green',fontSize:12  }} name="ios-checkmark-outline" /> : null}
                <Text style={{ fontSize: 12 }}>فک پایین راست</Text>
                {this.state.all ? <Icon style={{ color: 'green',fontSize:12  }} name="ios-checkmark-outline" /> : null}
              </Row>
            </TouchableOpacity>
          </Col>
          <Col size={50} style={{ alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ borderBottomColor: 'black', borderWidth: 0.3, width: '100%' }} />
          </Col>
        </Row>
      </Col>
    );
  }
}
const styles = StyleSheet.create({
  colContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5
  },
  buttonText: {
    position: 'absolute', 
    bottom: 14, 
    right: -3 ,
    padding: 0,
    borderColor: 'red',
    fontSize: 15,
    zIndex: 1,
    height: 15,
    width: 30,
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center'
  },
});
export default BottomRight;
