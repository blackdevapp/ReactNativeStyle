import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Animated }
    from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Card, CardItem, Right, Left, Button, Text } from 'native-base'

export default class Accordion extends Component {
    constructor(props) {
        super(props);
        this.icons = {
            'open': 'angle-down',
            'close': 'angle-up'
        };

        this.state = { expanded1: true };
    }

    toggle1() {
        this.setState({
            expanded1: !this.state.expanded1
        });
    }
    render() {
        let icon = this.icons['open'];
        if (this.state.expanded1) {
            icon = this.icons['close'];
        }
        return (
            <View style={[styles.container, { backgroundColor: this.props.backgroundColor ? this.props.backgroundColor : '#f4f4f4' }]}>
                <Button block rounded onPress={this.toggle1.bind(this)}
                    style={{ backgroundColor: '#d9d9d9', width: '100%', height: 35 }}>
                    <Left>
                        <Text style={styles.Header}>{this.props.title}</Text>
                    </Left>
                    <Right>

                        <Icon
                            style={[styles.FAIcon, { fontSize: 25 }]}
                            name={icon}
                        />

                    </Right>
                </Button>
                {
                    this.state.expanded1 && (
                        <View style={styles.body}>
                            <Card style={styles.body}>
                                <CardItem style={styles.body}>

                                    {this.props.children}

                                </CardItem>
                            </Card>
                        </View>
                    )
                }
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        // backgroundColor: '#f4f4f4',
        paddingHorizontal: 15,
        margin: 10,
        overflow: 'hidden'
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    Header: {
        flex: 1,
        padding: 7,
        color: 'black'
    },
    FAIcon: {
        height: 30,
        color: "black",
        marginRight: 5

    },
    body: {
        padding: 15,
        paddingTop: 0,

    }
});
