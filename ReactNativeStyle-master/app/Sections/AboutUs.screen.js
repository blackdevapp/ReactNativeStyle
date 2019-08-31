import React, { Component } from 'react';
import { FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Card, CardItem, View, Text, Container, Body, Button, Icon, Fab } from 'native-base'
import { Grid, Row, Col } from 'react-native-easy-grid';
import HeaderComponent from '../Components/Header.component';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { drawerOpener, drawerCloser } from '../Redux/Actions/Global.Actions'; //Import your actions
import { DrawerActions } from 'react-navigation';

class AboutUsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidUpdate(){
    if (this.props.drawerOpen) {
      this.props.navigation.dispatch(DrawerActions.openDrawer());
      this.props.drawerCloser();
    }
  }
  render() {
    return (
        <Container style={{ backgroundColor: '#f4f4f4' }}>
          <HeaderComponent title="درباره دنتریس" />
          <Image source={require('./../assets/img/png/mylabheader.png')} style={{ height: '30%', width: '100%' }} resizeMethod='scale' />
          <Grid>
            <Row style={{ flex: 0 }}>
              <Col style={{ flex: 1, justifyContent: 'center' }}>
                <View style={{ borderBottomColor: '#b3b3b5', borderBottomWidth: 1 }} />
              </Col>
              <Col style={{ flex: 1, justifyContent: 'center' }}><Text style={{ fontSize: 15, color: '#7e7e7f', textAlign: 'center', alignSelf: 'center' }}>درباره دنتریس</Text></Col>
              <Col style={{ flex: 1, justifyContent: 'center' }}>
                <View style={{ borderBottomColor: '#b3b3b5', borderBottomWidth: 1 }} />
              </Col>
            </Row>
            <Row size={4} >
              <View style={{ flex: 1 }}>
                <Text>دنتریس یک سامانه اینترنتی است ، که دندان پزشکان و لابراتوار ها از طریق آن میتوانند تعاملات بین خود را دریک بستر آنلاین به سادگی و سرعت انجام دهند.</Text>
                <Text>با ارسال دیجیتالی سفارش کار پروتز های دندانی، این امکان فراهم میشود تا اطلاعات جامع تری در مورد هر کیس از طریق عکس، فیلم و پیام صوتی، به لابراتوار منتقل شود. در این سامانه پیگیـری کار ها بدون نیاز به تمـاس تلفنی و به صورت اینترنتی قابل انجام است، فاکتـور ها به صورت خودکـار صادر شده و ارسال میشود، پرداخت آن ها نیز به صـورت آنلاین صورت مـی پذیرد. همچنین از طــریق گزارش گیری از عملکرد به صورت دوره ای، دنتریس به دندان پزشکان و لابراتــوار ها دید بهتـری در مورد عملکرد گذشته و تصمیمات آینده می دهد.</Text>
              </View>
  
            </Row>
          </Grid>
        </Container>
      );
    }
  }
  const styles = StyleSheet.create({
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
    container1: {
      flex: 1,
      justifyContent: "flex-start",
      backgroundColor: '#eee'
    },
    container: {
      marginTop: 5,
      width: '100%'
  
    },
    row: {
      //   padding: 5,
      paddingLeft: 6,
      paddingRight: 6,
      //   marginBottom: 5,
      //   backgroundColor: 'skyblue',
    },
  })


  function mapStateToProps(state, props) {
    return {
      
      drawerOpen: state.GlobalReducer.drawerOpen,
    }
  }
  
  function mapDispatchToProps(dispatch) {
    return bindActionCreators({
      drawerOpener, drawerCloser
    }, dispatch);
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(AboutUsScreen);
