import React, { PureComponent } from 'react';
import HeaderComponent from '../../../Components/Header.component'
import {
    Text, Button,
    Container, Grid, Row, Col, Item, Icon,
    Input, Header, Card, Body, CardItem, Content, SwipeRow, Label, Fab
} from 'native-base';
import {
    StyleSheet, ImageBackground, Image, Dimensions, FlatList,
    TouchableOpacity, View,
} from 'react-native'
import SvgUri from 'react-native-svg-uri';
import {
    my_profile_whatsapp_color,
    my_profile_telegram_color,
    my_profile_call_color,
    auth_name,
    auth_pass,
    auth_phone,
} from '../../../assets/img/svg/SvgXml'
import { Dialog } from 'react-native-simple-dialogs';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { drawerOpener,drawerCloser } from '../../../Redux/Actions/Global.Actions'; //Import your actions

import { getAllTech, deleteTech, checkPhoneNumber, addExistTech } from '../Redux/Actions/Lab.action'
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


class MyAssistantScreen extends PureComponent {
    constructor(props) {
        super(props);
        this.props.getAllTech()
        this.state = {
            showAddModal: false,
            showCheckModal: false,
            phone: '',
            firstname: this.props.techDetail.user.firstname,
            lastname: this.props.techDetail.user.lastname
        };
    }

    componentDidUpdate() {
        if (this.props.drawerOpen) {
            this.props.navigation.dispatch(DrawerActions.openDrawer());
            this.props.drawerCloser();
        }
    }

    check() {
        this.props.checkPhoneNumber(this.state.phone)
    }
    addTech() {
        this.setState({
            showAddModal: false
        })
        this.props.addExistTech({
            firstName: this.state.firstname,
            lastName: this.state.lastname,
            username: this.state.phone
        })

    }
    componentDidUpdate() {
        if (this.props.phoneState == true && this.state.showCheckModal == true) {
            console.log('omad')
            this.setState({
                showAddModal: true,
                showCheckModal: false,
                firstname: this.props.techDetail.user.firstname,
                lastname: this.props.techDetail.user.lastname
            })
        }

    }


    render() {
        return (
            <Container style={styles.container}>
                <HeaderComponent title="همکاران من" color="#7EDAD1" />
                <Content contentContainerStyle={{ flex: 1 }}>
                    <Grid>
                        <Row size={30} style={{ borderColor: 'red' }}>
                            <Col style={{ justifyContent: 'flex-start' }}>
                                <ImageBackground

                                    style={{ width: Dimensions.get('screen').width, height: '100%' }}
                                    source={require('../../../assets/img/png/my-asistant.png')}>
                                </ImageBackground>
                            </Col>
                        </Row>
                        <Row size={55} style={{ borderColor: 'red' }}>
                            <Col>
                                <FlatList
                                    style={{ flex: 1 }}
                                    data={this.props.techs}
                                    renderItem={this.renderItem}
                                    keyExtractor={(item,i) => i.toString()}
                                    onRefresh={this.handleRefresh}
                                    onEndReached={this.onEndReached}
                                    refreshing={false}
                                    onEndReachedThreshold={0.5}
                                />
                            </Col>
                        </Row>
                        <Row size={15} style={{ borderColor: 'red' }}>
                            <Col style={{ alignItems: 'center', justifyContent: 'center' }}>
                                <Button rounded style={{ alignSelf: 'center', backgroundColor: '#7EDAD1' }}
                                    onPress={() => this.setState({ showCheckModal: true })}
                                >
                                    <Text>افزودن تکنسین جدید</Text>
                                    <Icon name='ios-arrow-back'></Icon>
                                </Button>
                            </Col>
                        </Row>
                    </Grid>
                    <Dialog
                        visible={this.state.showAddModal}
                        onTouchOutside={() => this.setState({ showAddModal: false })}
                        title="اضافه کردن همکار">
                        <Row style={{ height: 300 }}>
                            <Col size={4} >
                                <Item fixedLabel style={[styles.itemInput1]}>
                                    <Label style={{ fontSize: 12, textAlign: 'left' }}>نام: </Label>
                                    <Input value={this.state.firstname} onChangeText={(text) => this.setState({
                                        firstname: text
                                    })} />
                                    <SvgUri width="20" height="20"
                                        svgXmlData={auth_name}
                                    />
                                </Item>
                                <Item fixedLabel style={[styles.itemInput1]} >
                                    <Label style={{ fontSize: 12, textAlign: 'left' }}>نام خانوادگی: </Label>
                                    <Input value={this.state.lastname} onChangeText={(text) => this.setState({
                                        lastname: text
                                    })} />
                                    <SvgUri width="20" height="20"
                                        svgXmlData={auth_name}
                                    />
                                </Item>



                                <Button rounded block info style={[{ marginTop: 20, zIndex: 1, backgroundColor: '#7EDAD1' }]}
                                    onPress={() => this.addTech()} >
                                    <Text>افزودن</Text>
                                    <Icon name='ios-arrow-back' />
                                </Button>
                            </Col>
                        </Row>
                    </Dialog>
                    <Dialog
                        visible={this.state.showCheckModal}
                        onTouchOutside={() => this.setState({ showCheckModal: false })}
                        title="بررسی کاربر"
                    >
                        <Row style={{ height: 200 }}>
                            <Col size={4} >
                                <Item fixedLabel style={[styles.itemInput1]}>
                                    <Label style={{ fontSize: 12, textAlign: 'left' }}>شماره موبایل: </Label>
                                    <Input keyboardType="number-pad" onChangeText={(text) => this.setState({ phone: text })} />
                                    <SvgUri width="20" height="40"
                                        svgXmlData={auth_phone}
                                    />
                                </Item>

                                <Button rounded block info style={[{ marginTop: 20, zIndex: 1, backgroundColor: '#7EDAD1' }]}
                                    onPress={() => this.check()} >
                                    <Text>بررسی</Text>
                                    <Icon name='ios-arrow-back' />
                                </Button>
                            </Col>
                        </Row>
                    </Dialog>
                    <Fab style={{ backgroundColor: '#7EDAD1' }} onPress={() => this.props.navigation.goBack()} position='bottomRight'>
                        <Icon name='ios-arrow-back-outline' />
                    </Fab>
                </Content>

            </Container>
        );
    }
    deleteTech(id) {
        this.props.deleteTech(id)
    }

    renderItem = ({ item }) => {
        return (
            <TouchableOpacity
                style={{ paddingVertical: 10 }}
                key={item.id}
                style={{}}
            >
                <SwipeRow
                    style={{ height: 80, }}
                    leftOpenValue={85}
                    rightOpenValue={-85}
                    left={
                        <Button danger onPress={() => this.deleteTech(item.id)}>
                            <Icon active name="trash" />
                        </Button>
                    }
                    body={
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
                                <Text style={{ fontSize: 12, textAlign: 'left' }}>دکتر {item.name}</Text>
                            </Col>
                            <Col size={50} style={{ justifyContent: 'center' }}>
                                <Row>
                                    <Col style={{ justifyContent: 'center', alignItems: 'center' }}>
                                        <SvgUri svgXmlData={my_profile_whatsapp_color} width="30"
                                            height="30" fill='#ffffff' />
                                    </Col>
                                    <Col style={{ justifyContent: 'center', alignItems: 'center' }}>
                                        <SvgUri svgXmlData={my_profile_telegram_color} width="30"
                                            height="30" fill='#ffffff' />
                                    </Col>
                                    <Col style={{ justifyContent: 'center', alignItems: 'center' }}>
                                        <SvgUri svgXmlData={my_profile_call_color} width="30"
                                            height="30" fill='#ffffff' />
                                    </Col>
                                </Row>
                            </Col>

                        </Row>

                    }
                />

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
        loading: state.LabReducer.loading,
        phoneState: state.LabReducer.phoneState,
        techs: state.LabReducer.techs,
        techDetail: state.LabReducer.techDetail,
        drawerOpen: state.GlobalReducer.drawerOpen,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getAllTech,
        deleteTech,
        checkPhoneNumber,
        addExistTech,
        drawerOpener,drawerCloser
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAssistantScreen);