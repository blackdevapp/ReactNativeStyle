import React, { PureComponent } from 'react';
import { StyleSheet, View, TouchableOpacity, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Card, CardItem, Right, Left, Button, Text, Body } from 'native-base'
import { Grid, Row, Col } from 'react-native-easy-grid';
import SvgUri from 'react-native-svg-uri';
import Accordion from './Accordeon.component';

export default class CollapseCard extends PureComponent {
    constructor(props) {
        super(props);
        this.icons = {
            'open': 'angle-down',
            'close': 'angle-up'
        };
        // alert(JSON.stringify(this.props.data,null,5))
        this.state = { expanded: false };
    }

    toggle() {
        this.setState({
            expanded: !this.state.expanded
        });
    }

    renderRow(data) {

        return (
            <View style={{ flexDirection: 'column', width: '100%' }}>
                {
                    data.map((item, index) => {
                        let rowColor = index % 2 == 0 ? '#F1F2F6' : '#FFFFFF'
                        return (
                            <View style={{ flexDirection: 'row',backgroundColor: rowColor, justifyContent: 'space-between' }}>
                                <Text style={[styles.tableRow, {
                                    // backgroundColor: rowColor,
                                    fontSize: 10
                                }]}>{item.productName}</Text>
                                <Text style={[styles.tableRow, {
                                    // backgroundColor: rowColor,
                                    fontSize: 10
                                }]}>{item.pricePlanMap[this.props.data.type].cost} ریال</Text>

                                <Text style={[styles.tableRow, {
                                    // backgroundColor: rowColor,
                                    fontSize: 10
                                }]}>{item.pricePlanMap[this.props.data.type].minDeliveryTime} الی {item.pricePlanMap[this.props.data.type].maxDeliveryTime} روز</Text>


                            </View>
                        )
                    })
                }
            </View>
        );
    }

    render() {
        let icon = this.icons['open'];
        if (this.state.expanded) {
            icon = this.icons['close'];
        }
        return (
            <View style={styles.container}>
                <Card>
                    <CardItem>
                        <TouchableOpacity onPress={this.toggle.bind(this)}
                            style={styles.row}>
                            <Body >
                                <Row style={{ height: 35 }}>
                                    <Col size={3} style={{ alignItems: 'flex-start', justifyContent: 'center' }}>
                                        <Text style={{ fontSize: 12 }}>{this.props.data.title}({this.props.data.type})</Text>
                                    </Col>
                                    <Col size={1} style={{ justifyContent: 'center', alignItems: 'flex-end' }}>
                                        <SvgUri height='22'
                                            width='22'
                                            svgXmlData='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width="512" height="512"><path d="M149.996 0C67.157 0 .001 67.161.001 149.997S67.157 300 149.996 300s150.003-67.163 150.003-150.003S232.835 0 149.996 0zm71.306 107.945l-14.247 14.247-29.001-28.999-11.002 11.002 29.001 29.001-71.132 71.126-28.999-28.996-11.002 11.002 28.999 28.999-7.088 7.088-.135-.135a5.612 5.612 0 0 1-3.582 2.575l-27.043 6.03a5.61 5.61 0 0 1-5.197-1.512 5.613 5.613 0 0 1-1.512-5.203l6.027-27.035a5.631 5.631 0 0 1 2.578-3.582l-.137-.137L192.3 78.941a4.304 4.304 0 0 1 6.082.005l22.922 22.917a4.302 4.302 0 0 1-.002 6.082z" fill="#FFDA44"/></svg>' />
                                    </Col>
                                    <Col size={1} style={{ justifyContent: 'center', alignItems: 'flex-end' }}>
                                        <SvgUri height='22'
                                            width='22'
                                            svgXmlData='<svg height="407pt" viewBox="-48 0 407 407" width="407pt" xmlns="http://www.w3.org/2000/svg"><path d="m89.199219 37c0-12.132812 9.46875-21 21.601562-21h88.800781c12.128907 0 21.597657 8.867188 21.597657 21v23h16v-23c0-20.953125-16.644531-37-37.597657-37h-88.800781c-20.953125 0-37.601562 16.046875-37.601562 37v23h16zm0 0"/><path d="m60.601562 407h189.199219c18.242188 0 32.398438-16.046875 32.398438-36v-247h-254v247c0 19.953125 14.15625 36 32.402343 36zm145.597657-244.800781c0-4.417969 3.582031-8 8-8s8 3.582031 8 8v189c0 4.417969-3.582031 8-8 8s-8-3.582031-8-8zm-59 0c0-4.417969 3.582031-8 8-8s8 3.582031 8 8v189c0 4.417969-3.582031 8-8 8s-8-3.582031-8-8zm-59 0c0-4.417969 3.582031-8 8-8s8 3.582031 8 8v189c0 4.417969-3.582031 8-8 8s-8-3.582031-8-8zm0 0"/><path d="m20 108h270.398438c11.046874 0 20-8.953125 20-20s-8.953126-20-20-20h-270.398438c-11.046875 0-20 8.953125-20 20s8.953125 20 20 20zm0 0"/></svg>' />
                                    </Col>
                                    <Col size={1} style={{ justifyContent: 'center', alignItems: 'flex-end' }}>
                                        <Icon name={icon} style={{ color: "black", fontSize: 20 }} />
                                    </Col>
                                </Row>
                            </Body>
                        </TouchableOpacity>
                    </CardItem>
                    {
                        this.state.expanded && (
                            <CardItem style={styles.body}>
                                <Row>
                                    <Col>
                                        <Accordion title="نوع کار ها" backgroundColor="#fff" disabled>
                                            {this.renderRow(this.props.data.productDescriptions)}

                                        </Accordion>
                                    </Col>
                                </Row>
                            </CardItem>
                        )
                    }
                </Card>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        // backgroundColor: '#f4f4f4',
        // paddingHorizontal: 15,
        // margin: 10,
        overflow: 'hidden'
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    Header: {
        flex: 1,
        padding: 10,
        color: 'black'
    },
    FAIcon: {
        height: 30,
        color: "black",
        marginRight: 5

    },
    body: {
        padding: 0,
        paddingTop: 0,

    },
    row: {
        flex: 1,
        //   padding: 5,
        paddingLeft: 6,
        paddingRight: 6,
        //   marginBottom: 5,
        //   backgroundColor: 'skyblue',
    },
});
