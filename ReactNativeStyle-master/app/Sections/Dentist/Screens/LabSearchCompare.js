import React, { Component } from 'react';
import {
    Image, TouchableOpacity
} from 'react-native';
import { Row, Col } from 'react-native-easy-grid'
import {
    View, Card,
    Icon, Text, Button
} from 'native-base';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    deleteFromCompareList,
    cleanCompareList
} from '../Redux/Actions/Search.action';

class LabSearchCompare extends Component {



    constructor(props) {
        super(props);
        this.state = {

        };
    }



    renderItem() {
    
        return (
            this.props.compareList.reverse().map((item,i) => {
                return (
                    <Col key={i} style={{ alignItems: 'center', justifyContent: 'center' ,flex:0}}>
                        <Row
                            size={1}
                            style={{ alignItems: 'flex-end' }}>

                            <TouchableOpacity 
                            style={{ marginBottom: -15 }}
                            onPress={()=>this.props.deleteFromCompareList(item.labId)}>
                                <Icon name='ios-close-circle-outline'
                                    style={{
                                        color: item.pic != '' ? '#fe6958' : '#ffffff',
                                        fontSize: 20
                                    }}
                                />
                            </TouchableOpacity>


                            {item.pic != '' ?
                                <Image activeOpacity={0.7} resizeMode="cover"
                                    style={{
                                        borderRadius: 10,
                                        width: this.props.itemSize,
                                        height: this.props.itemSize,
                                        borderWidth: 1,
                                        borderColor: 'gray',
                                        // margin:15
                                    }}
                                     source={{ uri: `http://89.32.249.208:8090${item.profilePicUrl}` }} />
                                :
                                <View
                                    style={{
                                        borderRadius: 10,
                                        width: this.props.itemSize,
                                        height: this.props.itemSize,
                                        borderWidth: 1,
                                        borderColor: 'gray',
                                    }}></View>
                            }



                        </Row>
                        < Text style={{ fontSize: 10, alignSelf: 'flex-end' }}>{item.labName}</Text>
                        

                    </Col>
                )
            })
        )
    }

    render() {

        // if (this.state.showComponent === initialState) {

        
        return (

            <View>
                 {this.props.compareList.length !==0? 
                <Card style={{ borderRadius: 25, height: 110, paddingTop: 10, paddingHorizontal: 5 }}>
                    <TouchableOpacity
                        onPress={()=>this.props.cleanCompareList()}
                        style={{
                            justifyContent: 'flex-start',
                            flexDirection: 'row',
                            marginTop: -15,
                            marginLeft: -12

                        }}>
                        
                        <Icon name='md-close-circle' style={{ color: '#fe6958' }} />
                        <Text style={{ color: '#696969', textAlign: 'left', fontSize: 12, padding: 10 }}>امکان مقایسه حداکثر 3 لابراتوار:</Text>
                    </TouchableOpacity>

                    <Row>
                        <Col size={3} >
                            <Row>
                                {
                                    this.renderItem()
                                }
                            </Row>
                        </Col>

                        <Col size={2} style={{ alignSelf: 'center' }}>
                            <Row>
                                <Col size={1}></Col>
                                <Col size={2}>
                                    <TouchableOpacity 
                                    onPress={this.props.goCompareScreen}
                                    style={{ backgroundColor: '#b8b8b8', flexDirection: 'row', height: 30, borderRadius: 15, justifyContent: 'center' }}>
                                        <Text style={{ fontSize: 13, alignSelf: 'center', color: '#ffffff' }}>
                                            مقایسه
                                        </Text>
                                        <Icon name='ios-arrow-back' style={{ alignSelf: 'center', fontSize: 15, color: '#ffffff' }} />

                                    </TouchableOpacity>
                                </Col>
                                <Col size={1}></Col>
                            </Row>
                        </Col>
                    </Row>
                </Card>
             :null} 
            </View>

        )
        // }else{
        //     return(<View></View>)
        // }
    }
}

function mapStateToProps(state, props) {
    return {
        compareList: state.SearchReducer.compareList
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        deleteFromCompareList,
        cleanCompareList
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LabSearchCompare);