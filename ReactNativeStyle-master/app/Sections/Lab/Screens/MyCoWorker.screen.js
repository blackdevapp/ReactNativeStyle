import React, { PureComponent } from 'react';
import HeaderComponent from '../../../Components/Header.component'
import {
    Text, Button,
    Container, Grid, Row, Col, Item, Icon,
    Input, Header, Card, Body, CardItem, Content, Fab
} from 'native-base';
import { StyleSheet, Image, Dimensions, FlatList, TouchableOpacity } from 'react-native'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getCoWorkers } from '../Redux/Actions/Lab.action'
import { drawerOpener,drawerCloser } from '../../../Redux/Actions/Global.Actions'; //Import your actions
import { DrawerActions } from 'react-navigation';

const extractKey = ({ id }) => id
const mediaCardData = [
    { id: 1, url: 'http://s8.picofile.com/file/8342161734/lab_images2.png' },
    { id: 2, url: 'http://s8.picofile.com/file/8342161792/lab_images3.png' },
    { id: 3, url: 'http://s8.picofile.com/file/8342162000/lab_images4.png' },
    { id: 4, url: 'http://s9.picofile.com/file/8342162084/lab_images5.png' },
    { id: 5, url: 'http://s8.picofile.com/file/8342162168/lab_images6.png' },
    { id: 6, url: 'http://s9.picofile.com/file/8342162234/lab_imges1.png' },
    { id: 7, url: 'http://s9.picofile.com/file/8342162234/lab_imges1.png' },
    { id: 8, url: 'http://s9.picofile.com/file/8342162234/lab_imges1.png' },
    { id: 9, url: 'http://s9.picofile.com/file/8342162234/lab_imges1.png' },
    { id: 10, url: 'http://s9.picofile.com/file/8342162234/lab_imges1.png' },
    { id: 11, url: 'http://s9.picofile.com/file/8342162234/lab_imges1.png' },
    { id: 12, url: 'http://s9.picofile.com/file/8342162234/lab_imges1.png' },
    { id: 13, url: 'http://s9.picofile.com/file/8342162234/lab_imges1.png' },
    { id: 14, url: 'http://s9.picofile.com/file/8342162234/lab_imges1.png' },
]
const imageSize = Dimensions.get('screen').width / 7

class MyCoWorkerScreen extends PureComponent {
    constructor(props) {
        super(props);
        this.props.getCoWorkers()
        this.state = {
        };
    }

    componentDidUpdate() {
        if (this.props.drawerOpen) {
            this.props.navigation.dispatch(DrawerActions.openDrawer());
            this.props.drawerCloser();
        }
    }

    render() {
        return (
            <Container style={styles.container}>
                <HeaderComponent title="همکاران من" color="#7EDAD1" />
                <Content contentContainerStyle={{ flex: 1 }}>
                    <Grid>
                        <Row size={15}>
                            <Col>
                                <Header searchBar rounded style={{ backgroundColor: '#eee', padding: 10 }}>
                                    <Item rounded style={{ height: 40 }}>
                                        <Icon name="ios-search" />
                                        <Input rounded placeholder="نام پزشک" />
                                    </Item>
                                </Header>
                                <FlatList
                                    style={{ flex: 1 }}
                                    data={this.props.myCoWorker}
                                    renderItem={this.renderItem}
                                    keyExtractor={(item,i) => i.toString()}
                                    onRefresh={this.handleRefresh}
                                    onEndReached={this.onEndReached}
                                    refreshing={false}
                                    onEndReachedThreshold={0.5}
                                />
                            </Col>
                        </Row>

                    </Grid>
                </Content>
                <Fab
                    position="bottomRight" style={{ backgroundColor: '#7EDAD1' }}
                    onPress={() => this.props.navigation.goBack()}>
                    <Icon name="ios-arrow-back" />
                </Fab>
            </Container>
        );
    }

    renderItem = ({ item }) => {
        return (
            <TouchableOpacity
                key={item.id}
                style={{}}
            >
                <Card >
                    <CardItem style={{ height: 80, }}>
                        <Body>
                            <Row>
                                <Col size={20} style={{ justifyContent: 'center' }}>
                                    <Image activeOpacity={0.7} resizeMode="cover" style={{
                                        alignSelf: 'center',
                                        borderRadius: 10,
                                        width: imageSize,
                                        height: imageSize,
                                        borderWidth: 1,
                                        borderColor: 'gray',
                                    }}
                                        source={{ uri: 'http://89.32.249.208:8090' + item.profilePicUrl }} />
                                </Col>
                                <Col size={30} style={{ justifyContent: 'center' }}>
                                    <Text style={{ fontSize: 12 }}>دکتر {item.dentistName}</Text>
                                </Col>
                                <Col size={50} style={{ justifyContent: 'center' }}>
                                    <Row><Col style={{ justifyContent: 'center' }}>
                                        <Text style={{ fontSize: 12 }}>{item.orderCount} کار در حال انجام</Text>
                                    </Col>
                                    </Row>
                                    <Row>
                                        <Col style={{ justifyContent: 'center' }}>
                                            <Text style={{ fontSize: 12, color: '#ECBF39' }}>{item.totalCost} ریال نسویه نشده</Text>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Body>
                    </CardItem>
                </Card>


            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        backgroundColor: '#eee'
    }
});
function mapStateToProps(state, props) {
    return {
        myCoWorker: state.LabReducer.myCoWorker,
        drawerOpen: state.GlobalReducer.drawerOpen,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getCoWorkers,
        drawerOpener,
        drawerCloser
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MyCoWorkerScreen);