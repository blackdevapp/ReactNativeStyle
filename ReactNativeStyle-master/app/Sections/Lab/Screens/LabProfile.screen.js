import React, { Component } from 'react';
import {
    FlatList, StyleSheet, Image, Dimensions, Modal, TouchableOpacity, ListView, ScrollView,
    PixelRatio, ImageBackground, InteractionManager
} from 'react-native';
import { Row, Grid, Col } from 'react-native-easy-grid'
import { Container, View, Button, Icon, Text, Fab, Item, ListItem, Body } from 'native-base';
import { RNChipView } from 'react-native-chip-view'

import ParallaxScrollView from 'react-native-parallax-scroll-view';
import Accordion from '../../../Components/Accordeon.component'
import SvgUri from 'react-native-svg-uri';
import Video from 'react-native-video';
import { Rating } from 'react-native-elements'
import { CheckBox } from 'react-native-elements'
// import { getProvince } from '../../../Redux/Actions/User.Action'
import { drawerOpener, drawerCloser } from '../../../Redux/Actions/Global.Actions'; //Import your actions
import { DrawerActions } from 'react-navigation';
import {
    lab_profile_play,
    lab_profile_paues,
    lab_profile_share,
    auth_phone,
    auth_location,
    auth_mobile,
    auth_fax
} from './../../../assets/img/svg/SvgXml'
import colors from './../../../Config/Color'
import HeaderComponent from './../../../Components/Header.component'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getLab } from './../Redux/Actions/Lab.action'
import { dentistProfile } from './../../../Redux/Actions/User.Action'



const mediaCardData = [
    { id: 1, url: 'http://s8.picofile.com/file/8342161734/lab_images2.png' },
    { id: 2, url: 'http://s8.picofile.com/file/8342161792/lab_images3.png' },
    { id: 3, url: 'http://s8.picofile.com/file/8342162000/lab_images4.png' },
    { id: 4, url: 'http://s9.picofile.com/file/8342162084/lab_images5.png' },
    { id: 5, url: 'http://s8.picofile.com/file/8342162168/lab_images6.png' },
    { id: 6, url: 'http://s9.picofile.com/file/8342162234/lab_imges1.png' },
]
const imageSize = Dimensions.get('screen').width / 7

class LabProfileScreen extends Component {
    constructor(props) {
        super(props);
        // this.props.dentistProfile()
        this.props.getLab()
        // if (this.props.province.length < 1) {
        //     this.props.getProvince()
        // }

        this.state = {
            test: '',
            priceModal: false,
            playVideo: false,
            status: null,
            // status:this.props.navigation.getParam('status'),
            profileLab: {
                contact: {},
                address: {},
                specializations: [],
                user: {
                    profilePic: {}
                }
            },

        };
    }

    componentDidUpdate(){
        if (this.props.drawerOpen) {
            this.props.navigation.dispatch(DrawerActions.openDrawer());
            this.props.drawerCloser();
        }
    }

    componentDidMount() {
        // storageService.getItem('decoded').then(info=>{
        //     alert(info)
        // })
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

    renderState() {
        for (let item of this.props.provine) {
            if (item.id == this.props.laboratory.address.state) {

            }
        }

    }


    render() {

        let laboratory = this.props.laboratory
        return (
            <Container style={{ backgroundColor: '#f4f4f4' }}>
                <ParallaxScrollView
                    // onScroll={onScroll}
                    headerBackgroundColor="white"
                    stickyHeaderHeight={STICKY_HEADER_HEIGHT}
                    parallaxHeaderHeight={PARALLAX_HEADER_HEIGHT}
                    backgroundSpeed={10}
                    backgroundColor='#f4f4f4'
                    renderBackground={() => (
                        <View key="background"
                            style={{
                                backgroundColor: '#f4f4f4'
                            }
                            }>
                            <HeaderComponent color={colors.LabHeader} title='پروفایل من' />
                            <ImageBackground style={{
                                width: '100%', zIndex: 1,
                                height: PARALLAX_HEADER_HEIGHT,
                                backgroundColor: '#f4f4f4',

                            }}
                                resizeMode="cover"
                                source={{ uri: `http://89.32.249.208:8090/idandoon/users/${laboratory.id}/profile-picture?date=${new Date().getTime()}` }}>
                                <View style={{
                                    position: 'absolute',
                                    top: 0,
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

                            <Text style={[styles1.sectionSpeakerText, { alignSelf: 'flex-end', textAlign: 'auto' }]}>
                                لابراتور {this.props.laboratory.labName}
                            </Text>

                        </View>
                    )}

                    renderStickyHeader={() => (
                        <View>

                            <HeaderComponent color={colors.LabHeader} title='پروفایل من' />
                            <View style={[styles.header, { padding: 10, flexDirection: 'row', flex: 0 }]}>
                                <Col>
                                    <Image activeOpacity={0.7} resizeMode="cover" style={{
                                        borderRadius: 10,
                                        width: imageSize,
                                        height: imageSize,
                                        borderWidth: 1,
                                        borderColor: 'gray'
                                    }}
                                        source={{ uri: `http://89.32.249.208:8090/idandoon/users/${laboratory.id}/profile-picture` }}
                                    /></Col>
                                <Col size={2}>
                                    <Text style={{ fontSize: 15, color: colors.LabHeader, textAlign: 'left' }}>{this.props.laboratory.labName}</Text>
                                    <Rating
                                        showRating
                                        type="star"
                                        fractions={1}
                                        startingValue={this.props.laboratory.rate.avgRate}
                                        readonly
                                        showRating={false}
                                        imageSize={12}
                                        showReadOnlyText={false}
                                        style={{ paddingVertical: 10, alignSelf: 'flex-start' }}
                                    />
                                </Col>
                                <Col size={2}></Col>
                            </View>
                        </View>
                    )}

                    renderFixedHeader={() => (
                        <HeaderComponent color={colors.LabHeader} title='پروفایل من' />
                    )}>

                    <View style={{ flexDirection: 'row', backgroundColor: '#f4f4f4' }}>

                        <Col>

                            <Row style={{ flex: 0 }}>
                                <Col size={2} style={{ justifyContent: 'center' }}>
                                    <View style={{ borderBottomColor: '#b3b3b5', borderBottomWidth: 1 }} />
                                </Col>
                                <Col size={4} style={{ justifyContent: 'center' }}>
                                    <Text
                                        style={{ fontSize: 15, color: '#7e7e7f', textAlign: 'center', alignSelf: 'center' }}
                                    >مدیر لابراتوار :{laboratory.user.firstname} {laboratory.user.lastname}</Text>
                                </Col>
                                <Col size={2} style={{ justifyContent: 'center' }}>
                                    <View style={{ borderBottomColor: '#b3b3b5', borderBottomWidth: 1 }} />
                                </Col>
                            </Row>

                            <Button rounded style={{ alignSelf: 'center', backgroundColor: colors.LabHeader }}
                                onPress={() => this.props.navigation.navigate('labProfileEdit')}>
                                <Text>ویرایش پروفایل</Text>
                                <Icon name='ios-arrow-back' />
                            </Button>
                            <Accordion title="اطلاعات تماس">
                                <Col>

                                    <Item style={{ justifyContent: 'space-between' }}>
                                        <Row>
                                            <Text style={{ color: colors.LabHeader, fontSize: 12 }}> شماره تماس : </Text>
                                            <Text > {laboratory.contact.title}</Text>

                                        </Row>
                                        <SvgUri width="15" height="50"
                                            svgXmlData={auth_phone}
                                        />
                                    </Item>

                                    <Item style={{ justifyContent: 'space-between' }}>

                                        {/* <Row> */}
                                        <Text style={{ color: colors.LabHeader, fontSize: 12 }}>آدرس :</Text>
                                        <Text numberOfLines={4} style={{ fontSize: 10 }}> {laboratory.address.stateTitle} {laboratory.address.cityTitle} {laboratory.address.area} {laboratory.address.street}</Text>
                                        {/* </Row> */}
                                        <SvgUri width="15" height="50"
                                            svgXmlData={auth_location}
                                        />
                                    </Item>

                                    <Item style={{ justifyContent: 'space-between' }}>
                                        <Row>
                                            <Text style={{ color: colors.LabHeader, fontSize: 12 }}> شماره تلفن همراه :</Text>
                                            <Text > {laboratory.contact.title}</Text>

                                        </Row>
                                        <SvgUri width="15" height="50"
                                            svgXmlData={auth_mobile}
                                        />
                                    </Item>

                                    <Item style={{ justifyContent: 'space-between' }}>
                                        <Row>
                                            <Text style={{ color: colors.LabHeader, fontSize: 12 }}> شماره فکس :</Text>
                                            <Text > {laboratory.contact.title}</Text>

                                        </Row>
                                        <SvgUri width="15" height="50"
                                            svgXmlData={auth_fax}
                                        />
                                    </Item>



                                </Col>


                            </Accordion>

                            <Accordion title="مواد مصرفی">
                                <Col>
                                    {
                                        (this.props.laboratory.materials != null) ?
                                            this.props.laboratory.materials.map((item, index) => {
                                                return (
                                                    <Row style={{ justifyContent: index % 2 == 0 ? 'flex-start' : 'flex-end' }}>
                                                        <CheckBox
                                                            checked={true}
                                                            style={{ marginRight: 10, borderWidth: 1, borderColor: 'black' }}
                                                            checkedColor={colors.LabHeader}
                                                            uncheckedColor={colors.LabHeader}
                                                            checkedIcon='md-radio-button-on'
                                                            uncheckedIcon='md-radio-button-off'
                                                            iconType='ionicon' />

                                                        <Text style={{ marginLeft: 10, alignSelf: 'center' }}>{item}</Text>

                                                    </Row>
                                                )
                                            }
                                            ) : null
                                    }
                                </Col>
                            </Accordion>
                            <Accordion title="مشخصات لابراتوار">

                                <Col>
                                    <Item style={{ justifyContent: 'space-between', padding: 10 }}>
                                        <Text style={{ color: colors.LabHeader }}> میزان سابقه : {this.props.laboratory.yearsActive} </Text>
                                    </Item>
                                    <Row  >
                                        <CheckBox
                                            checked={laboratory.specializations.includes('ثابت')}
                                            style={{ marginRight: 10 }}
                                            checkedColor={colors.LabHeader}
                                            uncheckedColor={colors.LabHeader}
                                            checkedIcon='md-radio-button-on'
                                            uncheckedIcon='md-radio-button-off'
                                            iconType='ionicon' />

                                        <Text style={{ marginLeft: 10, alignSelf: 'center' }}>ثابت</Text>

                                    </Row>
                                    <Row  >
                                        <CheckBox
                                            checked={laboratory.specializations.includes('متحرک')}
                                            style={{ marginRight: 10 }}
                                            checkedColor={colors.LabHeader}
                                            uncheckedColor={colors.LabHeader}
                                            checkedIcon='md-radio-button-on'
                                            uncheckedIcon='md-radio-button-off'
                                            iconType='ionicon' />

                                        <Text style={{ marginLeft: 10, alignSelf: 'center' }}>متحرک</Text>

                                    </Row>
                                    <Row  >
                                        <CheckBox
                                            checked={laboratory.specializations.includes('ارتودنسی')}
                                            style={{ marginRight: 10 }}
                                            checkedColor={colors.LabHeader}
                                            uncheckedColor={colors.LabHeader}
                                            checkedIcon='md-radio-button-on'
                                            uncheckedIcon='md-radio-button-off'
                                            iconType='ionicon' />
                                        <Text style={{ marginLeft: 10, alignSelf: 'center' }}>ارتودنسی</Text>
                                    </Row>


                                </Col>

                            </Accordion>
                            {/* <Accordion title="تخصص ها">
                                
                                {this.state.profileLab.specializations.map((item, i) => (
                                    <View style={{ width: '33%', paddingVertical: 5, paddingHorizontal: 5 }}>
                                        <RNChipView maxWidth={100}
                                            title={<Text style={{ fontSize: 12 }}>{item}</Text>}
                                            cancelable={false}
                                            avatar={false}
                                        />
                                    </View>

                                ))}
                            </Accordion> */}
                            <Accordion title="تجهیزات لابراتور">
                                <Col>
                                    {
                                        (this.props.laboratory.equipments != null) ?
                                            this.props.laboratory.equipments.map((item) => {
                                                return (
                                                    <Row  >
                                                        <CheckBox
                                                            checked={true}
                                                            style={{ marginRight: 10, borderWidth: 1, borderColor: 'black' }}
                                                            checkedColor={colors.LabHeader}
                                                            uncheckedColor={colors.LabHeader}
                                                            checkedIcon='md-radio-button-on'
                                                            uncheckedIcon='md-radio-button-off'
                                                            iconType='ionicon' />

                                                        <Text style={{ marginLeft: 10, alignSelf: 'center' }}>{item}</Text>

                                                    </Row>
                                                )
                                            }
                                            ) : null
                                    }
                                </Col>
                            </Accordion>
                        </Col>
                    </View>

                    <Row style={{ flex: 0 }}>
                        <Col size={2} style={{ justifyContent: 'center' }}>
                            <View style={{ borderBottomColor: '#b3b3b5', borderBottomWidth: 1 }} />
                        </Col>
                        <Col size={4} style={{ justifyContent: 'center' }}><Text style={{ fontSize: 15, color: '#7e7e7f', textAlign: 'center', alignSelf: 'center' }}>گالری فیلم وتصاویر</Text></Col>
                        <Col size={2} style={{ justifyContent: 'center' }}>
                            <View style={{ borderBottomColor: '#b3b3b5', borderBottomWidth: 1 }} />
                        </Col>
                    </Row>

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
                </ParallaxScrollView>






                <Fab
                    style={{ backgroundColor: '#e7be00', position: 'absolute', bottom: 3, width: 40, height: 40, left: 3 }}
                    position="bottomRight"
                    onPress={() => this.props.navigation.goBack()}>
                    <Icon name="ios-arrow-back" />
                </Fab>
            </Container>

        );

    }
}

const AVATAR_SIZE = 100;
const ROW_HEIGHT = 60;
const PARALLAX_HEADER_HEIGHT = 300;
const STICKY_HEADER_HEIGHT = 170;

const styles = StyleSheet.create({
    header: {
        backgroundColor: 'white',
        padding: 10,
        shadowColor: 'gray',
        shadowOpacity: 0.8,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 2
    }
    ,
    tableHeader: {
        textAlign: 'center',
        color: '#6D6D6D',
        flex: 1,
        alignSelf: 'stretch',
        borderColor: '#6D6D6D',
        borderLeftWidth: 1,
        borderTopWidth: 1,
        fontSize: 10,
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
        flexDirection: 'row',
        paddingTop: 40,
    },
    avatar: {
        marginBottom: 10,
        borderRadius: AVATAR_SIZE / 2,
        // borderWidth: 1,
        // borderColor: 'black'

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
function mapStateToProps(state, props) {
    return {
        laboratory: state.LabReducer.laboratory,
        drawerOpen: state.GlobalReducer.drawerOpen,
        // profile: state.UserReducer.profile,
        province: state.UserReducer.province,

    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        // dentistProfile,
        getLab,drawerOpener, drawerCloser
        // getProvince,

    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LabProfileScreen);

