import React, { PureComponent } from 'react';
import { StackNavigator } from 'react-navigation';
import LabSearchScreen from './LabSearch.screen';
import LabProfileScreen from './labProfile.screen';
import CompareScreen from './Compare.screen';
import{InteractionManager} from 'react-native'
import{ProgressDialog}from 'react-native-simple-dialogs'


const LabSearchStackNav = StackNavigator({
    labSearch: { screen: LabSearchScreen },
  labProfile: { screen: LabProfileScreen },
  compare: { screen: CompareScreen }
}, {
      navigationOptions: {
          header: null,
          gesturesEnabled: false,
      }
  });


class LabSearchStack extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading:true,
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
      <LabSearchStackNav/>
    );
    }
  }
}

export default LabSearchStack;
