import React, { Component } from 'react';
import httpService from '../../../Services/Http.service'
import {
    FlatList, StyleSheet, Image, Dimensions, Modal, TouchableOpacity, ListView, ScrollView,
    PixelRatio, ImageBackground
} from 'react-native';
import { Row, Grid, Col } from 'react-native-easy-grid'
import { Container, View, Button, Icon, Text, Fab } from 'native-base';
import { RNChipView } from 'react-native-chip-view'

import ParallaxScrollView from 'react-native-parallax-scroll-view';
import Accordion from '../../../Components/Accordeon.component'
import SvgUri from 'react-native-svg-uri';
import Video from 'react-native-video';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { drawerOpener, drawerCloser } from '../../../Redux/Actions/Global.Actions'; //Import your actions
import { DrawerActions } from 'react-navigation';
import HeaderComponent from '../../../Components/Header.component';

import {
    lab_profile_play,
    lab_profile_paues,
    lab_profile_share
} from './../../../assets/img/svg/SvgXml'


const mediaCardData = [
    { id: 1, url: 'http://s8.picofile.com/file/8342161734/lab_images2.png' },
    { id: 2, url: 'http://s8.picofile.com/file/8342161792/lab_images3.png' },
    { id: 3, url: 'http://s8.picofile.com/file/8342162000/lab_images4.png' },
    { id: 4, url: 'http://s9.picofile.com/file/8342162084/lab_images5.png' },
    { id: 5, url: 'http://s8.picofile.com/file/8342162168/lab_images6.png' },
    { id: 6, url: 'http://s9.picofile.com/file/8342162234/lab_imges1.png' },
]


class LabProfileScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            priceModal: false,
            playVideo: false,
            status: this.props.navigation.getParam('status'),
            profileLab: {
                contact: {},
                address: {},
                specializations: [],
                user: {
                    profilePic: {}
                }

            },
            priceList: {
                id: '',
                title: '',
                productCatalog: {
                    productDescriptions: [{
                        pricePlanMap: {},
                        productName: ''
                    }],
                    productPricePlanTitles: []
                }
            }
        };
    }
    componentDidUpdate() {
        if (this.props.drawerOpen) {
            this.props.navigation.dispatch(DrawerActions.openDrawer());
            this.props.drawerCloser();
        }
    }

    componentWillMount() {
        httpService.httpGetJwt(`idandoon/laboratories/${this.props.navigation.getParam('labId')}`)
            .then(res => {
                console.log(res.data.data)
                this.setState({
                    profileLab: res.data.data
                })
            }).catch(err => {
                alert(JSON.stringify(err, null, 4))
            })
    }
    renderRow(data) {

        return (
            <View style={{ paddingHorizontal: 5, paddingVertical: 5, flexDirection: 'column', width: '100%' }}>
                {
                    data.productDescriptions.map((item, index) => {
                        let rowColor = index % 2 == 0 ? '#F1F2F6' : '#FFFFFF'
                        return (
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={[styles.tableRow, {
                                    backgroundColor: rowColor,
                                    fontSize: 11
                                }]}>{item.productName}</Text>
                                {data.productPricePlanTitles.map((sub) => {
                                    if (item.pricePlanMap[sub]) {
                                        return (
                                            <Text style={[styles.tableRow, {
                                                backgroundColor: rowColor,
                                                fontSize: 11
                                            }]}>{item.pricePlanMap[sub].cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ریال</Text>
                                        )
                                    } else {
                                        return (
                                            <Text style={[styles.tableRow, {
                                                backgroundColor: rowColor,
                                                fontSize: 10
                                            }]}>ندارد</Text>
                                        )
                                    }

                                })}

                            </View>
                        )
                    }
                    )
                }
            </View>
        );
    }

    getPriceList(labId, classId) {
        httpService.httpGetJwt(`idandoon/laboratories/${labId}/price-classes/${classId}`).then(res => {
            this.setState({
                priceModal: true,
                priceList: res.data.data
            });
        })
    }
    requestPricePlan(id) {
        httpService.httpPostJwt(`idandoon/laboratories/${id}/subscribers`, {}).then(res => {
            this.setState({
                status: 'REQUESTED'
            });
        })
    }
    renderSubTitle(item, id) {
        if (item == 'ACCEPTED') {
            return (
                <Row size={1}>
                    <Col size={2}></Col>
                    <Col size={3}>
                        <Button onPress={() => {
                            // this.props.showLoading()
                            this.getPriceList(id, this.props.navigation.getParam('classId'))
                        }} style={{
                            width: '100%',
                            height: 32,
                            justifyContent: 'center',
                            borderRadius: 25,
                            backgroundColor: '#7fbbd2'
                        }}>
                            {/* <Icon name='ios-arrow-back' color='#fff'/> */}
                            <Text style={{ flex: 0, fontSize: 11 }}>نمایش لیست قیمت</Text>
                            <Icon name='ios-arrow-back' color='#fff' />
                        </Button>
                    </Col>
                    <Col size={2}></Col>
                </Row>
            )
        } else if (item == 'REQUESTED') {
            return (
                <Row size={1}>
                    <Col size={2}></Col>
                    <Col size={3}>
                        <Button disabled style={{
                            width: '100%',
                            height: 32,
                            justifyContent: 'center',
                            borderRadius: 25,
                            backgroundColor: '#7fbbd2'
                        }}>
                            {/* <Icon name='ios-arrow-back' color='#fff'/> */}
                            <Text style={{ flex: 0, fontSize: 11 }}>در انتظار تایید</Text>
                            {/* <Icon name='ios-arrow-back' color='#fff' /> */}
                        </Button>
                    </Col>
                    <Col size={2}></Col>
                </Row>
            )
        } else if (item == 'NONE') {
            return (
                <Row size={1}>
                    <Col size={2}></Col>
                    <Col size={3}>
                        <Button onPress={() => {
                            this.requestPricePlan(id)
                        }} style={{
                            width: '100%',
                            height: 32,
                            justifyContent: 'center',
                            borderRadius: 25,
                            backgroundColor: '#7fbbd2'
                        }}>
                            {/* <Icon name='ios-arrow-back' color='#fff'/> */}
                            <Text style={{ flex: 0, fontSize: 11 }}>درخواست لیست قیمت</Text>
                            {/* <Icon name='ios-arrow-back' color='#fff' /> */}
                        </Button>
                    </Col>
                    <Col size={2}></Col>
                </Row>
            )
        }
    }

    renderHeader(data) {
        return (
            <View style={{ paddingHorizontal: 5, paddingVertical: 5, flexDirection: 'row', width: '100%' }}>
                <Text style={[styles.tableHeader, { borderRightWidth: 1 }]}>محصول</Text>
                {data.map((item) => {
                    return (
                        <Text style={[styles.tableHeader]}>{item}</Text>
                    )
                })}
            </View>
        );
    }
    renderMediaCardButton() {
        if (!this.state.playVideo) {
            return (
                <View style={styles.buttonsContainer}>
                    <Button transparent >
                        <SvgUri svgXmlData='<?xml version="1.0" encoding="iso-8859-1"?><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 612.074 612.074" style="enable-background:new 0 0 612.074 612.074;" xml:space="preserve" width="512px" height="512px"><g><path d="M306.037,0C136.997,0,0,136.997,0,306.037s136.997,306.037,306.037,306.037s306.037-136.997,306.037-306.037   S475.077,0,306.037,0z M306.037,582.405c-152.203,0-276.368-124.165-276.368-276.368S153.834,29.669,306.037,29.669   s276.368,124.165,276.368,276.368S458.24,582.405,306.037,582.405z M425.381,315.68c5.637,5.637,5.637,15.205,0,20.843   l-108.96,109.702c-0.816,0.816-1.632,1.632-2.374,1.632l-0.816,0.816c-0.816,0-0.816,0.816-1.632,0.816   c-0.816,0-0.816,0-1.632,0.816c-0.816,0-0.816,0-1.632,0c-0.816,0-1.632,0-3.189,0c-0.816,0-1.632,0-3.189,0   c-0.816,0-0.816,0-1.632,0c-0.816,0-0.816,0-1.632-0.816c-0.816,0-0.816-0.816-1.632-0.816c0,0-0.816,0-0.816-0.816   c-0.816-0.816-1.632-0.816-2.374-1.632L185.877,335.706c-5.637-5.637-5.637-15.205,0-20.843s15.205-5.637,20.843,0l84.928,84.928   V165.035c0-8.011,6.379-14.39,14.39-14.39s14.39,6.379,14.39,14.39v234.683l83.37-83.296   C410.176,310.042,419.818,310.042,425.381,315.68z" fill="#FFFFFF"/></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>'
                            //  source={require('./../../../assets/img/svg/circular-down-arrow-button.svg')} 
                            width="30"
                            height="30" fill='#ffffff' />
                    </Button>
                    <Button transparent
                        onPress={() => this.setState({ playVideo: !this.state.playVideo })}
                    >
                        <SvgUri
                            svgXmlData={(!this.state.playVideo) ? lab_profile_play : lab_profile_paues}
                            width="30"
                            height="30"
                            fill={!this.state.playVideo ? '#ffffff' : '#939496'}
                        />
                    </Button>
                    <Button transparent style={{}}>
                        <SvgUri svgXmlData={lab_profile_share} width="30" height="30"
                            fill='#ffffff' />
                    </Button>
                </View>
            )
        } else {
            return (
                <View style={styles.buttonsContainer}>
                    <Button transparent
                        onPress={() => this.setState({ playVideo: !this.state.playVideo })}
                    >
                        <SvgUri
                            svgXmlData={(!this.state.playVideo) ? lab_profile_play : lab_profile_paues}
                            width="30"
                            height="30"
                            fill={!this.state.playVideo ? '#ffffff' : '#7fbbd2'}
                        />
                    </Button>
                </View>
            )
        }
    }
    renderData() {
        return (
            <Container style={{ backgroundColor: '#f4f4f4' }}>
                <HeaderComponent title="لیست قیمت"/>
                {this.renderHeader(this.state.priceList.productCatalog.productPricePlanTitles)}
                {this.renderRow(this.state.priceList.productCatalog)}
            </Container>
        );
    }
    renderState(id) {
        for (let item of this.props.provine) {
            if (item.id == id) {
                return item.title
            }
        }

    }
    renderCity(id,cId) {
        for (let item of this.props.provine) {
            if (item.id == id) {
                for(let sub of item.cityList){
                    if(sub.id==cId){
                        return sub.title;
                    }
                }
            }
        }

    }
    render() {
        const {
            onScroll = () => {
            }
        } = this.props;
        if (this.state.priceModal) {
            return (
                <Container style={{ flex: 1, flexDirection: 'column' }}>
                    {this.renderData()}
                    <Fab
                        style={{ backgroundColor: '#e7be00', position: 'absolute', bottom: 3, width: 40, height: 40, left: 3 }}
                        position="bottomLeft"
                        onPress={() => this.setState({ priceModal: false })}>
                        <Icon name="ios-arrow-back" />
                    </Fab>
                </Container>
            )
        } else {
            return (
                <Container>
                    <ParallaxScrollView
                        onScroll={onScroll}
                        headerBackgroundColor="white"
                        stickyHeaderHeight={STICKY_HEADER_HEIGHT}
                        parallaxHeaderHeight={PARALLAX_HEADER_HEIGHT}
                        backgroundSpeed={10}
                        backgroundColor='#f4f4f4'
                        renderBackground={() => (
                            <View key="background" style={{ backgroundColor: '#f4f4f4' }}>
                                <ImageBackground style={{
                                    width: '100%', zIndex: 1,
                                    height: PARALLAX_HEADER_HEIGHT,
                                    backgroundColor: '#f4f4f4'
                                }} resizeMode="cover"
                                    source={require('../../../assets/img/png/lab-profile2.png')}>
                                    <View style={{
                                        position: 'absolute',
                                        top: 0,
                                        // width: window.width,
                                        height: PARALLAX_HEADER_HEIGHT, backgroundColor: '#f4f4f4'
                                    }} />
                                </ImageBackground>
                            </View>
                        )}
                        renderForeground={() => (
                            <View key="parallax-header" style={styles1.parallaxHeader}>
                                {this.state.profileLab.user.profilePic ? <Image style={styles1.avatar} source={{
                                    uri: `http://89.32.249.208:8090${this.state.profileLab.user.profilePic.profilePicUrl}`,
                                    width: AVATAR_SIZE,
                                    height: AVATAR_SIZE
                                }} /> : <Image style={styles1.avatar} source={{
                                    uri: `https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg`,
                                    width: AVATAR_SIZE,
                                    height: AVATAR_SIZE
                                }} />
                                }

                                <Text style={styles1.sectionSpeakerText}>
                                    لابراتور {this.state.profileLab.labName}
                                </Text>

                            </View>
                        )}

                        renderStickyHeader={() => (
                            <View key="sticky-header" style={{ backgroundColor: '#7fbbd2', height: 56 }}>
                                <Text style={styles1.stickySectionText}>لابراتور {this.state.profileLab.labName}</Text>
                            </View>
                        )}

                        renderFixedHeader={() => (
                            <View key="fixed-header" style={styles1.fixedSection}>

                            </View>
                        )}>
                        <View style={{ marginTop: 20, backgroundColor: '#f4f4f4' }}>
                            <View>

                                <Row style={{ flex: 0, marginTop: 20 }}>
                                    <Col size={2} style={{ flex: 1, justifyContent: 'center' }}>
                                        <View style={{ borderBottomColor: '#d9d9d9', borderBottomWidth: 0.5 }} />
                                    </Col>
                                    <Col size={3} style={{ flex: 1, justifyContent: 'center' }}>
                                        <Text style={{ fontSize: 11, textAlign: 'center', alignSelf: 'center' }}>
                                            مدیر مسئول
                                        : {this.state.profileLab.user.firstname} {this.state.profileLab.user.lastname}

                                        </Text>
                                    </Col>
                                    <Col size={2} style={{ flex: 1, justifyContent: 'center' }}>
                                        <View style={{ borderBottomColor: '#d9d9d9', borderBottomWidth: 0.5 }} />
                                    </Col>
                                </Row>
                                {this.renderSubTitle(this.state.status, this.props.navigation.getParam('labId'))}

                                <ScrollView>
                                    <Accordion title="اطلاعات تماس">
                                        <Grid>
                                            <Row>
                                                <Text
                                                    style={{ color: '#7fbbd2' }}>شماره تماس: </Text><Text>{this.state.profileLab.contact.title}</Text>

                                            </Row>
                                            <View style={{ borderBottomColor: '#d9d9d9', borderBottomWidth: 0.5 }} />

                                            <Row style={{ width: '60%' }}>
                                                <Text
                                                    style={{ color: '#7fbbd2' }}>آدرس: </Text><Text>{this.renderState(this.state.profileLab.address.state)} {this.renderCity(this.state.profileLab.address.state,this.state.profileLab.address.city)} {this.state.profileLab.address.area} {this.state.profileLab.address.street}</Text>

                                            </Row>
                                        </Grid>

                                    </Accordion>
                                    <Accordion title="مواد مصرفی">
                                        <Text>{this.state.profileLab.materials}</Text>

                                    </Accordion>
                                    <Accordion title="تخصص ها">
                                        {/* <Text>{this.props.profileLab.specializations}</Text> */}
                                        {this.state.profileLab.specializations.map((item, i) => (
                                            <View style={{ width: '33%', paddingVertical: 5, paddingHorizontal: 5 }}>
                                                <RNChipView maxWidth={100}
                                                    title={<Text style={{ fontSize: 12 }}>{item}</Text>}
                                                    cancelable={false}
                                                    avatar={false}
                                                />
                                            </View>

                                        ))}
                                    </Accordion>
                                    <Accordion title="تجهیزات لابراتور">
                                        <Text>{this.state.profileLab.equipment}</Text>

                                    </Accordion>

                                    <View
                                        style={{ borderRadius: 15, padding: 20, margin: 20, backgroundColor: '#ffffff' }}>
                                        <View style={{
                                            alignItems: 'center',
                                            flexDirection: 'column',
                                            flex: 1,
                                            padding: 10
                                        }}>
                                            <FlatList
                                                horizontal={false}
                                                numColumns={3}
                                                data={mediaCardData}
                                                paused={this.state.playVideo}
                                                onEnd={() => this.setState({ playVideo: true })}
                                                keyExtractor={(item) => item.id}
                                                renderItem={({ item }) =>
                                                    <View style={{
                                                        padding: 7,
                                                        width: Dimensions.get('window').width / 4,
                                                        height: Dimensions.get('window').width / 4
                                                    }}>
                                                        <Image
                                                            resizeMode='cover'
                                                            style={styles.image}
                                                            source={{ uri: item.url }}
                                                            defaultSource={require('./../../../assets/img/png/image.png')}
                                                        />
                                                    </View>
                                                }
                                            />

                                        </View>
                                        <View style={styles.videoContainer}>
                                            <Video
                                                source={{ uri: 'https://hw19.cdn.asset.aparat.com/aparat-video/2d56b38917db1b5259448b8d465bd21012072853-720p__26630.mp4' }}
                                                style={styles.video}
                                                paused={true}
                                                repeat={true}
                                                paused={!this.state.playVideo}
                                                onEnd={() => this.setState({ playVideo: true })}
                                                resizeMode="cover"
                                                volume={1.0}
                                                rate={1.0}
                                            />
                                            {this.renderMediaCardButton()}
                                        </View>
                                    </View>

                                </ScrollView>

                            </View>

                        </View>

                    </ParallaxScrollView>

                    <Fab
                        style={{ backgroundColor: '#e7be00', position: 'absolute', bottom: 3, width: 40, height: 40, left: 3 }}
                        position="bottomLeft"
                        onPress={() => this.props.navigation.getParam('type') == 'myLab' ? this.props.navigation.navigate('myLab') : this.props.navigation.goBack()}>
                        <Icon name="ios-arrow-back" />
                    </Fab>
                </Container>

            );
        }
    }
}

const window = Dimensions.get('window');

const AVATAR_SIZE = 100;
const ROW_HEIGHT = 60;
const PARALLAX_HEADER_HEIGHT = 200;
const STICKY_HEADER_HEIGHT = 56;

const styles1 = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'red'
    },
    background: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: window.width,
        height: PARALLAX_HEADER_HEIGHT
    },
    stickySection: {
        // flex:1,
        height: STICKY_HEADER_HEIGHT,
        justifyContent: 'center'
    },
    stickySectionText: {
        color: 'white',
        fontSize: 16,
        margin: 10
    },
    fixedSection: {
        position: 'absolute',
        bottom: 0,
        right: 0, backgroundColor: '#f4f4f4'
    },
    fixedSectionText: {
        color: '#fff',
        fontSize: 20
    },
    parallaxHeader: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'column',
        paddingTop: 40,
    },
    avatar: {
        marginBottom: 10,
        borderRadius: AVATAR_SIZE / 2,
        borderWidth: 1,
        borderColor: 'black'

    },
    sectionSpeakerText: {
        color: 'white',
        fontSize: 20,
        paddingVertical: 5
    },
    sectionTitleText: {
        color: 'black',
        fontSize: 15,
        paddingVertical: 5
    },
    row: {
        overflow: 'hidden',
        paddingHorizontal: 10,
        height: ROW_HEIGHT,
        backgroundColor: 'white',
        borderColor: '#ccc',
        borderBottomWidth: 1,
        justifyContent: 'center'
    },
    rowText: {
        fontSize: 20
    }
});

const styles = StyleSheet.create({
    subtitleView: {
        flexDirection: 'column',
        paddingLeft: 10,
        paddingTop: 5
    },
    tableHeader: {
        textAlign: 'center',
        color: '#6D6D6D',
        flex: 1,
        alignSelf: 'stretch',
        borderColor: '#6D6D6D',
        borderLeftWidth: 1,
        borderTopWidth: 1,
        fontSize: 14,
        justifyContent: 'center',
        alignSelf: 'center'
    },
    tableRow: {
        textAlign: 'center',
        color: '#6D6D6D',
        flex: 1,
        alignSelf: 'stretch',
        borderColor: '#6D6D6D',
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderTopWidth: 1,
        fontSize: 10
    },
    ratingImage: {
        height: 19.21,
        width: 100
    },
    ratingText: {
        paddingLeft: 10,
        color: 'grey'
    },
    container1: {
        flex: 1,
        justifyContent: "flex-start",
        backgroundColor: '#eee'
    },
    container: {
        marginTop: 5,
        width: '100%'

    },
    row: {
        //   padding: 5,
        paddingLeft: 6,
        paddingRight: 6,
        //   marginBottom: 5,
        //   backgroundColor: 'skyblue',
    },
    buttonsContainer: {
        width: '100%',
        position: 'absolute',
        justifyContent: 'space-evenly',
        alignSelf: 'center', alignItems: 'center',
        flexDirection: 'row'
    },
    video: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    videoContainer: {
        alignSelf: 'center',
        flexDirection: 'column',
        padding: 10,
        flex: 1,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#939496',
        backgroundColor: '#939496',
        width: '80%',
        height: Dimensions.get('screen').height / 3,
        padding: 1,
        justifyContent: 'center'
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#939496'
    }
})


function mapStateToProps(state, props) {
    return {
        drawerOpen: state.GlobalReducer.drawerOpen,
        provine:state.UserReducer.province
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        drawerOpener, drawerCloser
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LabProfileScreen);
