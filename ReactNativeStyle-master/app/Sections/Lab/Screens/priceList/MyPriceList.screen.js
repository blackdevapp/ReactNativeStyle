import React, { PureComponent } from 'react';
import { View, FlatList, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Container, Text, Button, Card, CardItem, Body,Fab,Icon } from 'native-base';
import { Grid, Row, Col } from 'react-native-easy-grid';
import { myPriceClasses, myPriceClasseItem, getDentalServices } from '../../Redux/Actions/Lab.action'
import { bindActionCreators } from 'redux';
// import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import HeaderComponent from '../../../../Components/Header.component';
import CollapseCard from '../../../../Components/CollapseCard.component';
const extractKey = ({ id }) => id
import SvgUri from 'react-native-svg-uri';

import Snackbar from 'react-native-snackbar';

class MyPriceListScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount() {
  }

  componentDidUpdate() {
    // alert(JSON.stringify(this.props.classes,null,5))
  }
  comeSoon(){
    Snackbar.show({
        title: 'به زودی این سرویس فعال خواهد شد.',
        duration: 7000,
    })
}
  render() {
    // alert(JSON.stringify(this.props.classes))

    return (
      <Container style={{ backgroundColor: '#f4f4f4' }}>
        <HeaderComponent title="لیست قیمت ها" color="#7EDAD1" />
        <Grid style={{ flex: 1 }}>
          <Row size={85}>
            <FlatList
              style={styles.containerRow}
              data={this.props.classes}
              renderItem={this.renderPriceItem}
              keyExtractor={(item,i) => i.toString()}
              onRefresh={this.handleRefresh}
              onEndReached={this.onEndReached}
              refreshing={false}
              onEndReachedThreshold={0.5}
            />
          </Row>
          <Row size={15} style={{backgroundColor:'#f4f4f4'}}>
            <Col >
              <Button rounded onPress={()=>this.comeSoon()
              // this.props.navigation.navigate("AddPriceListScreen")
            }
              style={{ backgroundColor: '#e7be00', alignItems: 'center', justifyContent: 'center', alignSelf: 'center', width: '70%' }}>
                <Text >افزودن عنوان لیست جدید</Text>
              </Button>
            </Col>
          </Row>
        </Grid>
        <Fab
          style={{ backgroundColor: '#e7be00', position: 'absolute', bottom: 2, width: 40, height: 40, left: 3 }}
          position="bottomLeft"
          onPress={() => this.props.navigation.goBack()}>
          <Icon name="ios-arrow-back" />
        </Fab>
        
      </Container>
    );
  }
  renderPriceItem = ({ item }) => {
    return (
      <CollapseCard data={item} />
    )
  }

  handleRefresh = () => {


  }
  onEndReached = () => {

  }
}

const styles = StyleSheet.create({
  containerRow: {
    marginTop: 5,
    width: Dimensions.get('window').width,
  },
  row: {
    flex: 1,
    paddingLeft: 6,
    paddingRight: 6,
  },
})
function mapStateToProps(state, props) {
  return {
    loading: state.LabReducer.loading,
    priceClasses: state.LabReducer.priceClasses,
    classes: state.LabReducer.classes,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    myPriceClasses,
    myPriceClasseItem,
    getDentalServices
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MyPriceListScreen);

