import React, { PureComponent } from 'react';
import { StackNavigator } from 'react-navigation';
import OrderManagementScreen from './OrderManagement.screen';
import OrderItem from './OrderItem';



const OrderManagementStackNav = StackNavigator({
    OrderManagement: { screen: OrderManagementScreen },
  OrderItem: { screen: OrderItem },
 
  
}, {
      navigationOptions: {
          header: null,
          gesturesEnabled: false,
      }
  });


class OrderManagementStack extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <OrderManagementStackNav/>
    );
  }
}

export default OrderManagementStack;
