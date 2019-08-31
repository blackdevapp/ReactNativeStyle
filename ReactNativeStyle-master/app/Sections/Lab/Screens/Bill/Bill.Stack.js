import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { StackNavigator } from 'react-navigation';
import BillListScreen from './BillList.screen'
import BillGenerateScreen from './BillGenerate.screen'
import{InteractionManager} from 'react-native'
import{ProgressDialog}from 'react-native-simple-dialogs'

const BillStackNav = StackNavigator({
  BillListScreen: { screen: BillListScreen },
  BillGenerateScreen: { screen: BillGenerateScreen },
}, {
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    }
  });


class BillStack extends Component {
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
      <BillStackNav />
    );
    }
  }
}

export default BillStack;
