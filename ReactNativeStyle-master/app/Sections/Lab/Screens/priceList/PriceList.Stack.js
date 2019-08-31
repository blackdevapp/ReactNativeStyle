import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { StackNavigator } from 'react-navigation';
import MyPriceListScreen from './MyPriceList.screen'
import PriceListRequestScreen from './PriceListRequest.screen'
import AddPriceListScreen from './AddPriceList.screen'
import { myPriceClasses, myPriceClasseItem, getDentalServices } from '../../Redux/Actions/Lab.action'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import{InteractionManager} from 'react-native'
import{ProgressDialog}from 'react-native-simple-dialogs'

const PriceListStackNav = StackNavigator({
  PriceListRequest: { screen: PriceListRequestScreen },
  MyPriceList: { screen: MyPriceListScreen },
  AddPriceListScreen: { screen: AddPriceListScreen },
}, {
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    }
  });

class PriceListStack extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // loading:true
    };
    this.props.myPriceClasseItem();
    this.props.getDentalServices()
  }
  
 componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({
        loading:false
      })
    });
    
  }

  render() {
    if(this.state.loading){
      return(
        <ProgressDialog
              visible={this.state.loading}
              title=""
              message="در حال بارگزاری ..."
            />
      )
    }else{
    return (
      <PriceListStackNav />
    );
    }
  }
}
function mapStateToProps(state, props) {
  return {
    priceClasses: state.LabReducer.priceClasses
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    myPriceClasses,
    myPriceClasseItem,
    getDentalServices
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PriceListStack);

