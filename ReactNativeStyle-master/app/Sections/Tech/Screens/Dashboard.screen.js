import React, { PureComponent } from 'react';
import { StyleSheet, Dimensions, Image, View, FlatList, TouchableOpacity, ScrollView } from 'react-native'
import { Button, Text, Container, Icon, Card, Input, Item, CardItem, Body, Content } from 'native-base';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import { Row, Col, Grid } from 'react-native-easy-grid'
import { getConnectedLab } from '../Redux/Actions/Tech.action'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import HeaderComponent from '../../../Components/Header.component';
import { bell } from '../../../assets/img/svg/SvgXml'
import SvgUri from 'react-native-svg-uri';

const buttonSize = Dimensions.get('screen').width / 8;
const imageSize = Dimensions.get('screen').width / 7

class DashboardScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.props.getConnectedLab()
    this.state = {
    };
  }

  render() {
    return (
      <Container style={{ backgroundColor: '#f4f4f4' }}>
        <HeaderComponent color="#7EDAD1" title="لابراتوار های من" />
        <Grid style={{ flex: 1 }}>

          <Row size={3}>
            <Col>
              <Image source={require('../../../assets/img/png/firstPage.png')} style={{ height: '100%', width: '100%' }} />
            </Col>
          </Row>

          <Row size={5}>
            <Col>
              <ScrollView>
                <FlatList
                  data={this.props.connectedLab}
                  keyExtractor={(item) => item.id}
                  style={{}}
                  renderItem={
                    ({ item }) => (
                      this.renderItem(item)
                    )
                  }
                />
              </ScrollView>
            </Col>
          </Row>
          <Row size={1}>
            <Col>
              <Button rounded block style={{ backgroundColor: '#7EDAD1' }} onPress={()=>this.props.navigation.navigate('Report')}>
                <Text>گزارش گیری </Text>
              </Button>
            </Col>
          </Row>
        </Grid>
      </Container>
    )
  }
  renderItem(item) {
    return (
      <TouchableOpacity
        key={item.clinicId}
        style={styles.row}
        onPress={() => { this.props.navigation.navigate('OrderManagement', { labId: item.connectedWorkPlaceId }) }}>
        <Card>
          <CardItem>
            <Body>
              <Row style={{ paddingVertical: 10 }}>
                <Col size={20} style={{ alignItems: 'center', justifyContent: 'center' }}>
                  <Image activeOpacity={0.7} resizeMode="cover" style={{ borderRadius: 10, width: '65%', height: '100%', borderWidth: 1, borderColor: 'gray' }}
                    source={{ uri: `http://89.32.249.208:8090${item.profilePicUrl}` }}
                  />

                </Col>
                <Col size={60} style={{ alignItems: 'flex-start' }}>
                  <Text style={{ fontSize: 15, }}>{item.name}</Text>
                  <Text style={{ fontSize: 12, color: '#e7be00' }}>تعداد کل سفارشات : ۵</Text>

                </Col>
                <Col size={20} style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                  <Row>
                    <Col style={{ alignItems: 'flex-end' }}>
                      <SvgUri width="20" height="20"
                        svgXmlData={bell}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Text style={{ marginTop: 12, paddingBottom: 0, fontSize: 10, }}>در حال انجام :۳</Text>
                    </Col>
                  </Row>
                </Col>
              </Row>

            </Body>
          </CardItem>
        </Card>
      </TouchableOpacity>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: '#EFF2F6'
  },
  buttonStyle: {
    width: buttonSize,
    height: buttonSize,
    borderRadius: buttonSize / 2,
    borderWidth: 1,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonStyle2: {
    width: 6 * buttonSize / 5,
    height: 6 * buttonSize / 5,
    borderRadius: 3 * buttonSize / 5,
    borderWidth: 1,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textStyle: { textAlign: 'left', color: '#818384', paddingTop: 5, fontSize: 12 },
  textStyle2: { color: '#818384', paddingTop: 5, fontSize: 12, alignSelf: 'center' }
});

function mapStateToProps(state, props) {
  return {
    loading: state.TechReducer.loading,
    connectedLab: state.TechReducer.connectedLab
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getConnectedLab
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardScreen);