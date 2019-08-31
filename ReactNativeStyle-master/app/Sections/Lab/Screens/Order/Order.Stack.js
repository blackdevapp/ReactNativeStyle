import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { StackNavigator } from 'react-navigation';
import OrderList from './OrderList.screen'
import DoctorOrderScreen from './DoctorOrder.screen'
import OrderDetailScreen from './OrderDetail.screen';
import{InteractionManager} from 'react-native'
import{ProgressDialog}from 'react-native-simple-dialogs'

const OrderStackNav = StackNavigator({
    DoctorOrder: { screen: DoctorOrderScreen },
    OrderList: { screen: OrderList },
    OrderDetail:{screen:OrderDetailScreen},
  }, {
        navigationOptions: {
            header: null,
            gesturesEnabled: false,
        }
    });
  
  
class OrderStack extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading:true
    };
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
      <OrderStackNav/>
    );
    }
  }
}

export default OrderStack;
