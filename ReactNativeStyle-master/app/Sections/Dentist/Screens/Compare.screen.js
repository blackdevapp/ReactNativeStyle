import React, { Component } from 'react';
import { View, Button, Text, Container } from 'native-base';
import { Grid, Row, Col } from 'react-native-easy-grid'
import { StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native'

import HeaderComponent from '../../../Components/Header.component'

import httpService from '../../../Services/Http.service'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    getCompareList
} from '../Redux/Actions/Search.action'; //Import your actions
import { Rating } from 'react-native-elements'

class CompareScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: ''
        };
    }



    render() {

        const itemSize = this.props.navigation.getParam('itemSize', 'NO-ID');

        return (

            <Container style={styles.container}>
                <HeaderComponent title="مقایسه لابراتوار ها" />

                <Grid style={{ flex: 1 }}>
                    <Row>
                        {this.props.compareLabList.map((lab) => {
                            return (
                                <Col style={{ borderLeftWidth: 1, borderLeftColor: '#696969' }}>

                                    <Row size={2} style={styles.rowStyle}>
                                        <Col>
                                            {lab.user.profilePic?<Image activeOpacity={0.7} resizeMode="cover"
                                                style={{
                                                    borderRadius: 10,
                                                    width: itemSize,
                                                    height: itemSize,
                                                    borderWidth: 1,
                                                    borderColor: 'gray',
                                                    alignSelf: 'center'
                                                    // margin:15
                                                }}
                                                source={{ uri: `http://89.32.249.208:8090${lab.user.profilePic.profilePicUrl}` }} />:<Image activeOpacity={0.7} resizeMode="cover"
                                                style={{
                                                    borderRadius: 10,
                                                    width: itemSize,
                                                    height: itemSize,
                                                    borderWidth: 1,
                                                    borderColor: 'gray',
                                                    alignSelf: 'center'
                                                    // margin:15
                                                }}
                                                source={{ uri: `https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg` }} />}
                                            
                                        </Col>


                                    </Row>
                                    <Row style={styles.rowStyle1}>
                                        <Col>
                                            <Rating
                                                showRating
                                                type="star"
                                                fractions={1}
                                                startingValue={lab.rate.avgRate}
                                                readonly
                                                showRating={false}
                                                imageSize={12}
                                                showReadOnlyText={false}
                                                style={{ paddingVertical: 10 }}
                                            />
                                            {/* <Text  style={styles.textStyle}>
                                                {lab.rate.avgRate}</Text> */}

                                        </Col>

                                    </Row>
                                    <Row style={styles.rowStyle}>
                                        <Col><Text style={styles.textStyle}>{lab.labName}</Text>
                                        </Col>

                                    </Row>
                                    <Row style={styles.rowStyle1}>
                                        <Col>
                                            <Text style={styles.textStyle}>{lab.briefDescription}</Text>
                                        </Col>

                                    </Row>
                                    <Row style={styles.rowStyle}>
                                        <Col>
                                            <Text style={styles.textStyle}>{lab.contact.title}</Text>
                                        </Col>

                                    </Row>
                                    <Row style={styles.rowStyle1}>
                                        <Col>
                                            <Text style={styles.textStyle}>{lab.equipments.join(' ، ')}</Text>
                                        </Col>

                                    </Row>
                                    <Row style={styles.rowStyle}>
                                        <Col>
                                            <Text style={styles.textStyle}>{lab.materials.join(' ، ')}</Text>

                                        </Col>

                                    </Row>

                                    <Row style={styles.rowStyle1}>
                                        <Col>
                                            <Text style={styles.textStyle}>{lab.specializations.join(' ، ')}</Text>

                                        </Col>

                                    </Row>
                                    <Row style={styles.rowStyle}>
                                        <Col>
                                            <Text style={styles.textStyle}>{lab.user.username}</Text>

                                        </Col>

                                    </Row>
                                    {/* <Row style={styles.rowStyle}>
                                            <Col>
                                                <Text style={styles.textStyle}>{lab.labName}</Text>

                                            </Col>

                                        </Row>
                                        <Row style={styles.rowStyle}>
                                            <Col>
                                                <Text  style={styles.textStyle}>{lab.labName}</Text>

                                            </Col>

                                        </Row>
                                        <Row style={styles.rowStyle}>
                                            <Col>
                                                <Text style={styles.textStyle}>{lab.labName}</Text>

                                            </Col>

                                        </Row>
                                        <Row style={styles.rowStyle}>
                                            <Col>
                                                <Text  style={styles.textStyle}>{lab.labName}</Text>

                                            </Col>

                                        </Row> */}

                                </Col>
                            )
                        })
                        }
                    </Row>

                </Grid>

            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        backgroundColor: '#eee'
    },
    rowStyle: { justifyContent: 'center', backgroundColor: '#e3e4e5', width: '100%', alignItems: 'center' },
    rowStyle1: { justifyContent: 'center', width: '100%', alignItems: 'center' },
    textStyle: { width: '100%', textAlign: "center", fontSize: 12 }
});

function mapStateToProps(state, props) {
    return {
        loading: state.SearchReducer.loading,
        compareLabList: state.SearchReducer.compareLabList

    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getCompareList
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CompareScreen);

