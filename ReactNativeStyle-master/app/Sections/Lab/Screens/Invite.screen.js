import React, { PureComponent } from 'react';
import HeaderComponent from '../../../Components/Header.component'
import {
    Text, Button,
    Container, Grid, Row, Col, Item, Icon, Label,
    Input, Header, Card, Body, CardItem, Content, SwipeRow, Radio, Fab
} from 'native-base';
import {
    StyleSheet, ImageBackground, Image, Dimensions, FlatList,
    TouchableOpacity
} from 'react-native'
import SvgUri from 'react-native-svg-uri';
import {
    auth_mobile,
    auth_name,
    my_profile_call_color
} from '../../../assets/img/svg/SvgXml'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { invite } from '../Redux/Actions/Lab.action'
import { drawerOpener, drawerCloser } from '../../../Redux/Actions/Global.Actions'; //Import your actions
import { DrawerActions } from 'react-navigation';

class InviteScreen extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            type: '',
            phone: ''
        };
    }

    componentDidUpdate() {
        if (this.props.drawerOpen) {
            this.props.navigation.dispatch(DrawerActions.openDrawer());
            this.props.drawerCloser();
        }
    }

    invite() {
        this.props.invite(this.state.phone)
        this.props.navigation.navigate('lab')
    }

    render() {
        return (
            <Container style={styles.container}>
                <HeaderComponent title="دعوت از همکاران" color="#7EDAD1" />
                <Content contentContainerStyle={{ flex: 1 }}>
                    <Grid>
                        <Row size={30} style={{ borderColor: 'red' }}>
                            <Col style={{ justifyContent: 'flex-start' }}>
                                <ImageBackground

                                    style={{ width: Dimensions.get('screen').width, height: '100%' }}
                                    source={require('../../../assets/img/png/invite.png')}>
                                </ImageBackground>
                            </Col>
                        </Row>
                        <Row size={40} style={{ borderColor: 'red', paddingVertical: 50 }}>
                            <Col size={1}></Col>
                            <Col size={3} >
                                <Item fixedLabel style={[styles.itemInput1]}>
                                    <Label style={{ fontSize: 10 }}>نام: </Label>
                                    <Input />
                                    <SvgUri width="20" height="20"
                                        svgXmlData={auth_name}
                                    />
                                </Item>
                                <Item fixedLabel style={[styles.itemInput1]} >
                                    <Label style={{ fontSize: 10 }}>نام خانوادگی: </Label>
                                    <Input />
                                    <SvgUri width="20" height="20"
                                        svgXmlData={auth_name}
                                    />
                                </Item>
                                <Item fixedLabel style={[styles.itemInput1]}>
                                    <Label style={{ fontSize: 10 }}>شماره موبایل: </Label>
                                    <Input keyboardType="number-pad" onChangeText={(text) => this.setState({ phone: text })} />
                                    <SvgUri width="20" height="20"
                                        svgXmlData={auth_mobile}
                                    />
                                </Item>

                                {/* <Row style={{
                                    borderColor: 'red',
                                    height: 50,
                                    // borderWidth: 1,
                                }}>
                                    <Col>
                                        <Row>
                                            <Col size={4} style={{
                                                justifyContent: 'center',
                                                borderColor: 'red',
                                                // borderWidth: 1,
                                                alignItems: 'center'
                                            }}>
                                                <Label style={{ fontSize: 10 }}>دندان پزشک </Label>
                                            </Col>
                                            <Col size={1} style={{ justifyContent: 'center', alignItems: 'center' }}>
                                                <TouchableOpacity onPress={()=>this.setState({type:'lab'})}>
                                                <Radio selected={this.state.type=='dentist'} style={{
                                                    width: 10, 
                                                    borderColor: 'red',
                                                    // borderWidth: 1,
                                                }}
                                                    color={"#f0ad4e"}
                                                    selectedColor={"#5cb85c"}
                                                />
                                                </TouchableOpacity>
                                                
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col>
                                        <Row>
                                            <Col size={4} style={{
                                                justifyContent: 'center',
                                                borderColor: 'red',
                                                // borderWidth: 1,
                                                alignItems: 'center'
                                            }}>
                                                <Label style={{ fontSize: 10 }}>لابراتوار</Label>
                                            </Col>
                                            <Col size={1} style={{ justifyContent: 'center', alignItems: 'center' }}>
                                            <TouchableOpacity onPress={()=>this.setState({type:'lab'})}>
                                            <Radio selected={this.state.type=='lab'} style={{ width: 10 }}
                                                    color={"#f0ad4e"}
                                                    selectedColor={"#5cb85c"}
                                                />
                                            </TouchableOpacity>
                                                
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
 */}

                            </Col>
                            <Col size={1}></Col>
                        </Row>
                        <Row size={30} style={{ borderColor: 'red' }}>
                            <Col style={{ alignItems: 'center', justifyContent: 'center' }}>
                                <Button rounded style={{
                                    alignSelf: 'center',
                                    backgroundColor: '#E8BC42', width: 200
                                }}
                                    onPress={() => this.invite()}>
                                    <Text>ارسال لینک دعوت</Text>
                                    <Icon name='ios-arrow-back'></Icon>
                                </Button>
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
                style={{ paddingVertical: 10 }}
                key={item.id}
                style={{}}
            >
                <SwipeRow
                    style={{ height: 80, }}
                    leftOpenValue={85}
                    rightOpenValue={-85}
                    left={
                        <Button danger onPress={() => alert('Trash')}>
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
                                    source={{ uri: item.url }} />
                            </Col>
                            <Col size={30} style={{ justifyContent: 'center' }}>
                                <Text style={{ fontSize: 12 }}>دکتر حامد خرسندی</Text>
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
        myCoWorker: state.LabReducer.myCoWorker,
        drawerOpen: state.GlobalReducer.drawerOpen,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        invite, drawerOpener, drawerCloser
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(InviteScreen);