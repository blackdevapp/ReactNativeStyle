import React, { PureComponent } from 'react';
import { Col, Row } from "react-native-easy-grid";
import { StyleSheet } from 'react-native'
import { Container, Content, Text, Header } from 'native-base';


class ToothShowScreen extends PureComponent {
    constructor(props) {
        super(props);
        
        this.state = {
            topLeft : [],
            topRight : [],
            bottomRight : [],
            bottomLeft : [],
        };
        
    }

    componentDidMount(){
        let topLeft=[]
        let topRight=[]
        let bottomRight=[]
        let bottomLeft=[]
        if(this.props.teeth){
            for(let item of this.props.teeth){
                if(item>0 &&item<9){
                    topLeft.push(item)
                }else if(item>8&&item<17){
                    topRight.push(item-8)
                }else if(item>16&&item<25){
                    bottomRight.push(item-16)
                }else if(item>24&&item<33){
                    bottomLeft.push(item-24)
                }
            }
        }
        this.setState({
            topLeft:topLeft,
            topRight:topRight,
            bottomLeft:bottomLeft,
            bottomRight:bottomRight
        })
        
    }

    render() {
        let self=this;
        setTimeout(function(){
            self.componentDidMount()
        },500)
        if(this.props.teeth.length>0){
            return (
                <Row>
                    <Col>
                        {(this.state.topRight.length == 8 && this.state.topLeft.length == 8 && this.state.bottomRight.length == 8 && this.state.bottomLeft.length == 8) ?
                            <Row>
                                <Col>
                                    <Text style={{ alignSelf: 'center' }}>کل فک</Text>
                                </Col>
                            </Row>
                            :
                            <Row>
                                <Col>
                                    <Row>
                                        {(this.state.topRight.length == 8 && this.state.topLeft.length == 8) ?
                                            <Col>
                                                <Text style={{ alignSelf: 'center' }}> کل فک بالا</Text>
                                            </Col>
                                            :
    
                                            <Col>
                                                <Row>
                                                    <Col style={styles.topRightContainer}>
                                                        <Text style={styles.toothNumbers}>{this.state.topRight.join(" , ")}</Text>
                                                    </Col>
                                                    <Col style={styles.topLeftContainer}>
                                                        <Text style={styles.toothNumbers}>{this.state.topLeft.join(" , ")}</Text>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        }
                                    </Row>
                                    <Row>
                                        {(this.state.bottomRight.length == 8 && this.state.bottomLeft.length == 8) ?
                                            <Col>
                                                <Text style={{ alignSelf: 'center' }}> کل فک پایین</Text>
                                            </Col>
                                            :
                                            <Col>
                                                <Row>
                                                    <Col style={styles.bottomRightContainer}>
                                                        <Text style={styles.toothNumbers}>{this.state.bottomRight.join(" , ")}</Text>
                                                    </Col>
                                                    <Col style={styles.botomLeftContainer}>
                                                        <Text style={styles.toothNumbers}>{this.state.bottomLeft.join(" , ")}</Text>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        }
                                    </Row>
                                </Col>
                            </Row>
                        }
                    </Col>
                </Row>
            );
        }else{
            return(
                <Text>دندانی انتخاب نشده است</Text>
            )
        }
       
    }
}

const styles = StyleSheet.create({
    topLeftContainer: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: '#d3d3d3',
        alignItems: 'center',
        borderLeftWidth: 0.3,
        borderBottomWidth: 0.3,
        borderRightColor: 'black'
    },
    topRightContainer: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: '#d3d3d3',
        alignItems: 'center',
        borderRightWidth: 0.3,
        borderBottomWidth: 0.3,
        borderRightColor: 'black'
    },
    bottomRightContainer: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: '#d3d3d3',
        alignItems: 'center',
        borderRightWidth: 0.3,
        // borderBottomWidth: 0.3,
        borderRightColor: 'black'
    },
    botomLeftContainer: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: '#d3d3d3',
        alignItems: 'center',
        borderLeftWidth: 0.3,
        // borderBottomWidth: 0.3,
        borderRightColor: 'black'
    },
    toothNumbers: {
        fontSize: 10
    }
});

export default ToothShowScreen;
