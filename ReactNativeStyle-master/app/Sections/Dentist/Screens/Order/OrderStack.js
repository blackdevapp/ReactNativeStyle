import React, { PureComponent } from 'react';
import { StackNavigator } from 'react-navigation';
import OrderScreen from './Order.screen'
import OrderPreviewScreen from './OrderPreview'
import VoiceRecorder from './VoiceRecorder'
import TakeVideo from './TakeVideo'
import TakePicture from './TakePicture'
import DynamicForm from './dynamicForm';
import{InteractionManager} from 'react-native'
import{ProgressDialog}from 'react-native-simple-dialogs'


const OrderStackNav = StackNavigator({
  OrderScreen: { screen: OrderScreen },
  OrderPreviewScreen: { screen: OrderPreviewScreen },
  VoiceRecorder:{screen:VoiceRecorder},
  TakeVideo:{screen:TakeVideo},
  TakePicture:{screen:TakePicture},
  DynamicForm:{screen:DynamicForm}
  
}, {
      navigationOptions: {
          header: null,
          gesturesEnabled: false,
      }
  });


class OrderStack extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading:true
    };
  }
  componentDidMount(){
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
