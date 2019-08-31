import React, { PureComponent } from 'react';
import { FlatList, StyleSheet, Image, Dimensions, TouchableOpacity, InteractionManager } from 'react-native';
import { Container, View, Card, CardItem, Item, Input, Icon, Body, Text } from 'native-base';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getClinicsOrder } from '../../Redux/Actions/Lab.action'
import { Grid, Row, Col } from 'react-native-easy-grid';
import HeaderComponent from '../../../../Components/Header.component'
import SvgUri from 'react-native-svg-uri';

import {

  bell,
} from '../../../../assets/img/svg/SvgXml'

const extractKey = ({ id }) => id

class DoctorOrderScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.props.getClinicsOrder()
    this.state = {

    };
  }

  render() {
    return (
      <Container style={{ backgroundColor: '#f4f4f4' }}>
        <HeaderComponent title="لیست سفارش های دکتر ها" color="#7EDAD1" />
        <Grid style={{ flex: 1 }}>
          <Row size={1}>
            <Col>
              <View style={{ paddingHorizontal: 5, paddingTop: 10 }}>
                <Item rounded style={{ backgroundColor: 'white' }}>
                  <Input style={{ height: 35, fontSize: 11, textAlign: 'right' }} placeholder="نام دکتر مورد نظر را جستجو کنید" />
                  <TouchableOpacity onPress={() => alert('salam')}>
                    <Icon name="ios-search" style={{color:"#7EDAD1"}}/>
                  </TouchableOpacity>
                </Item>
              </View>
            </Col>
          </Row>
          <Row size={9} >

            <View style={{ flex: 1 }}>
              <FlatList
                style={styles.containerRow}
                data={this.props.clinics}
                renderItem={this.renderItem}
                keyExtractor={(item,i) => i.toString()}
                onRefresh={this.handleRefresh}
                onEndReached={this.onEndReached}
                refreshing={false}
                onEndReachedThreshold={0.5}
              />
            </View>
          </Row>
        </Grid>
      </Container>
    );
  }
  renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        key={item.clinicId}
        style={styles.row}
        onPress={() => { this.props.navigation.navigate('OrderList', { clinicId: item.clinicId, clinicName: item.firstname + ' ' + item.lastname }) }}>
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
                  <Text style={{ fontSize: 15, }}>دکتر {item.firstname} {item.lastname}</Text>
                  <Text style={{ fontSize: 12,color:'#e7be00' }}>8 سفارش در حال انجام</Text>

                </Col>
                <Col size={20} style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                  <Row>
                    <Col style={{alignItems:'flex-end'}}>
                      <SvgUri width="20" height="20"
                        svgXmlData={bell}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Text style={{ marginTop: 12, paddingBottom: 0, fontSize: 10, }}>{item.allOrders}  سفارش</Text>
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
  containerRow: {
    marginTop: 5,
    width: Dimensions.get('window').width,
  },
  subtitleView: {
    flexDirection: 'column',
    paddingLeft: 10,
    paddingTop: 5
  },
  ratingImage: {
    height: 19.21,
    width: 100
  },
  ratingText: {
    paddingLeft: 10,
    color: 'grey'
  },
  container: {
    marginTop: 5,
    width: '100%'

  },
  row: {
    flex: 1,
    //   padding: 5,
    paddingLeft: 6,
    paddingRight: 6,
    //   marginBottom: 5,
    //   backgroundColor: 'skyblue',
  },
  col: {
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 0.5,
    borderColor: 'red'
  },
  row1: {
    height: 30
  }
})
function mapStateToProps(state, props) {
  return {
    clinics: state.LabReducer.clinics
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getClinicsOrder
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DoctorOrderScreen);