
import React, { PureComponent } from 'react';
import { StyleSheet, Image, Dimensions, Modal, TouchableOpacity } from 'react-native';
import { Row, Grid, Col } from 'react-native-easy-grid'
import { Container, View, Button, Card, CardItem, Item, Input, Icon, Text, Fab, Label, Picker, Form, Header, Left, Right, Body, Title } from 'native-base';
import { getProvince, editProfile,profilePic } from '../../../Redux/Actions/User.Action'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SvgUri from 'react-native-svg-uri'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { RNCamera } from 'react-native-camera';
class EditProfileScreen extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            openCamera: false,
            uri: '',
            cametaType: RNCamera.Constants.Type.back,
            address: [],
            openAddress: false,
            firstname: '',
            lastname: '',
            contact: {
                info: ''
            },
            addressList: [{
                city: {},
                details: '',
                province: {},
                region: '',
                tell: ''
            }],
            addressItem: {
                city: {},
                details: '',
                province: {},
                region: '',
                tell: ''
            },
            cityList: []
        };

    }
    async componentDidMount() {
        await this.setState({
            firstname: this.props.profile.user.firstname,
            lastname: this.props.profile.user.lastname,
            addressList: this.props.profile.addressList ? this.props.profile.addressList : [],
            contact: {
                info: this.props.profile.contact.info
            },
        })
        if (this.props.province.length < 1) {
            await this.props.getProvince()
        }
    }
    cameraPreview() {
        return (
            <RNCamera
                ref={ref => {
                    this.camera = ref;
                }}
                orienta
                style={styles.preview}
                type={this.state.cametaType}
                flashMode={RNCamera.Constants.FlashMode.off}
                permissionDialogTitle={'Permission to use camera'}
                permissionDialogMessage={'We need your permission to use your camera phone'}
                mirrorImage={true}>

                <Row>
                    <Col size={1}>
                        <Button transparent onPress={() => this.changeCamera()}><Icon name="ios-reverse-camera" style={{ color: '#fff', justifyContent: 'flex-end', flexDirection: 'row' }} /></Button>
                    </Col>
                    <Col size={5}></Col>
                    <Col size={1}>
                        <Button transparent
                            onPress={() => this.setState({ openCamera: false })}>
                            <Icon name="ios-arrow-back" style={{ color: '#fff' }} />
                        </Button>
                    </Col>

                </Row>

                <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>

                    <Button transparent onPress={this.takePicture.bind(this)} style={styles.button} >
                        <SvgUri width="50" height="50"
                            svgXmlData='<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve" width="512px" height="512px" class=""><g><g><g><path d="M256,0C114.841,0,0,114.841,0,256s114.841,256,256,256s256-114.841,256-256S397.159,0,256,0z M256,492    C125.87,492,20,386.131,20,256S125.87,20,256,20c130.131,0,236,105.869,236,236S386.131,492,256,492z" data-original="#000000" class="active-path" data-old_color="#7fbbd2" fill="#7fbbd2"/></g></g><g><g><path d="M440.015,142.896C409.802,93.745,362.256,59.3,306.136,45.909c-56.121-13.393-114.096-4.128-163.248,26.086    c-49.152,30.214-83.597,77.76-96.988,133.879c-13.392,56.12-4.127,114.097,26.086,163.249    c30.213,49.151,77.759,83.596,133.879,96.987c16.476,3.932,33.273,5.877,50.035,5.877c32.926-0.001,65.702-7.508,95.549-22.211    c4.955-2.44,6.992-8.435,4.552-13.39s-8.436-6.992-13.39-4.552c-40.871,20.134-87.786,25.397-132.104,14.822    C105.384,421.571,40.269,315.64,65.354,210.517c12.151-50.924,43.406-94.067,88.007-121.483    c44.601-27.416,97.211-35.821,148.132-23.671c105.123,25.084,170.238,131.017,145.154,236.14    c-8.39,35.16-26.314,67.277-51.836,92.881c-3.899,3.911-3.889,10.243,0.023,14.142c3.911,3.9,10.242,3.89,14.142-0.022    c28.125-28.216,47.879-63.61,57.125-102.357C479.493,250.025,470.228,192.049,440.015,142.896z" data-original="#000000" class="active-path" data-old_color="#7fbbd2" fill="#7fbbd2"/></g></g><g><g><path d="M379.883,420.997c-3.063-4.596-9.272-5.838-13.868-2.774l-0.404,0.273c-4.563,3.112-5.737,9.334-2.625,13.896    c1.937,2.838,5.075,4.365,8.27,4.365c1.941,0,3.903-0.564,5.627-1.74l0.227-0.153    C381.706,431.801,382.947,425.592,379.883,420.997z" data-original="#000000" class="active-path" data-old_color="#7fbbd2" fill="#7fbbd2"/></g></g><g><g><path d="M391.832,154.566v-7.636c0-14.293-11.627-25.921-25.92-25.921h-25.4c-14.293,0-25.92,11.628-25.92,25.921v15.92    c0,5.522,4.477,10,10,10h57.24c7.967,0,14.698,9.323,14.698,20.358V246h-71.715c-6.859-32.756-35.961-57.434-70.725-57.434    c-34.764,0-63.866,24.679-70.725,57.434H115.47v-52.791c0-11.035,6.731-20.358,14.698-20.358h127.948c5.523,0,10-4.478,10-10    c0-5.522-4.477-10-10-10H130.168c-19.133,0-34.698,18.104-34.698,40.358v125.583c0,22.253,15.565,40.358,34.698,40.358h251.663    c19.133,0,34.699-18.105,34.699-40.358V193.209C416.53,174.998,406.104,159.572,391.832,154.566z M371.831,152.851h-37.24v-5.92    c0-3.209,2.711-5.921,5.92-5.921h25.4c3.209,0,5.92,2.712,5.92,5.921V152.851z M254.089,208.566    c28.817,0,52.261,23.444,52.261,52.261c0,28.817-23.444,52.261-52.261,52.261c-28.817,0-52.261-23.444-52.261-52.261    C201.828,232.01,225.272,208.566,254.089,208.566z M396.529,318.792c0.001,11.035-6.73,20.358-14.697,20.358H130.168    c-7.967,0-14.698-9.322-14.698-20.358V266h66.564c2.664,37.437,33.952,67.087,72.055,67.087c38.103,0,69.391-29.65,72.055-67.087    h70.385V318.792z" data-original="#000000" class="active-path" data-old_color="#7fbbd2" fill="#7fbbd2"/></g></g><g><g><path d="M179.109,306.9h-0.511c-5.523,0-10,4.478-10,10c0,5.523,4.477,10,10,10h0.511c5.523,0,10-4.477,10-10    C189.109,311.378,184.632,306.9,179.109,306.9z" data-original="#000000" class="active-path" data-old_color="#7fbbd2" fill="#7fbbd2"/></g></g><g><g><path d="M371.169,193.333h-44.506c-5.523,0-10,4.477-10,10c0,5.522,4.477,10,10,10h44.506c5.523,0,10-4.478,10-10    C381.169,197.81,376.692,193.333,371.169,193.333z" data-original="#000000" class="active-path" data-old_color="#7fbbd2" fill="#7fbbd2"/></g></g><g><g><path d="M287.676,152.851h-0.475c-5.523,0-10,4.478-10,10c0,5.522,4.477,10,10,10h0.475c5.523,0,10-4.478,10-10    C297.676,157.329,293.199,152.851,287.676,152.851z" data-original="#000000" class="active-path" data-old_color="#7fbbd2" fill="#7fbbd2"/></g></g></g></svg>'
                        />
                    </Button>

                </View>
            </RNCamera>
        );
    }

    takePicture = async function () {

        if (this.camera) {

            const options = { quality: 0.5, fixOrientation: true, base64: true };
            this.setState({ showPicrure: true })
            const data = await this.camera.takePictureAsync(options)

            this.setState({ uri: data.uri, openCamera: false })



            // this.uploadImage(data.uri)
        }


    };

    changeCamera() {
        if (this.state.cametaType == RNCamera.Constants.Type.back) {
            this.setState({ cametaType: RNCamera.Constants.Type.front })
        } else {
            this.setState({ cametaType: RNCamera.Constants.Type.back })
        }
    }

    deleteItem(index) {
        let items = this.state.addressList
        items.splice(index, 1)
        this.setState({
            addraddressListess: items
        })
    }


    renderImage() {
        if (this.state.uri !== '') {
            return { uri: this.state.uri }
        }else{
            if(this.props.profile.user.profilePic){
                return { uri: `http://89.32.249.208:8090${this.props.profile.user.profilePic.profilePicUrl}?date=${new Date().getTime()}` }
            }else{
                return require('./../../../assets/img/png/user.png')
            }
        }
    }

    renderAddress(address) {
        return (
            address.map((item, index) => {
                return (
                    <CardItem>
                        <Row style={{}}>
                            <Col size={5}>
                                <Row>
                                    <Text style={{ textAlign: 'left', fontSize: 10 }}>{item.province.titla} {item.city.title}  {item.region} {item.details} {item.tell}</Text>
                                </Row>
                            </Col>
                            <Col size={1}>
                                <Icon name='ios-trash-outline' onPress={() => this.deleteItem(index)}></Icon>
                            </Col>
                        </Row>
                    </CardItem>
                )
            })
        )
    }

    selectProvince(value) {
        this.setState(prevState => ({
            addressItem: {
                ...prevState.addressItem,
                province: value
            },
            cityList: value.cityList
        }))
    }
    selectCity(value) {
        this.setState(prevState => ({
            addressItem: {
                ...prevState.addressItem,
                city: value
            }
        }))

    }
    edit() {
        user = {
            addressList: this.state.addressList,
            contact: this.state.contact,
            firstname: this.state.firstname,
            lastname: this.state.lastname
        }
        this.props.editProfile(user)
        if (this.state.uri!=='') {
            let name = new Date().getTime()
            let file = { uri: this.state.uri, type: 'image/png', name: `${name}.png` };
            const uploaddata = new FormData();
            uploaddata.append('pic', file);
            try {
                this.props.profilePic(uploaddata, 'multipart/form-data;boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW')
            } catch (e) {
                console.log(e)

            }
        }
        this.props.onClose()
    }
    render() {
        return (
            <KeyboardAwareScrollView>
                <Container style={{ backgroundColor: '#eee' }}>
                    <Header style={{ backgroundColor: "#7fbbd2" }}>
                        <Left>
                            <TouchableOpacity transparent onPress={() => this.edit()}>
                                <Icon name="md-checkmark-circle-outline" style={{ color: '#fff', justifyContent: 'flex-end', flexDirection: 'row' }} />
                            </TouchableOpacity>
                        </Left>
                        <Body style={{ flex: 3 }} />
                        <Right >
                            <Button transparent onPress={() => {
                                this.props.onClose()
                            }}>
                                <Icon name="ios-arrow-back" style={{ color: '#fff' }} />
                            </Button>
                        </Right>
                    </Header>
                    <Image
                        source={this.renderImage()}
                        style={{
                            height: Dimensions.get('screen').height / 5
                            , width: Dimensions.get('screen').height / 5,
                            borderRadius: Dimensions.get('screen').height / 10,
                            justifyContent: 'center', borderWidth: 2, borderColor: '#80bcd3', alignSelf: 'center'
                        }}
                    />
                    <Row style={{ justifyContent: 'space-evenly', paddingTop: 10, flex: 0 }}>
                        <Button
                            style={{ height: 30, borderRadius: 15, backgroundColor: '#80bcd3' }}
                            onPress={() => this.setState({ openCamera: true })}><Text>تغییر عکس</Text></Button>
                        <Button
                            style={{ height: 30, borderRadius: 15, backgroundColor: '#b0b0b0' }}
                            onPress={() => this.setState({ uri: '' })}><Text>حذف عکس</Text></Button>
                    </Row>
                    <Card style={{ padding: 10, paddingBottom: 15 }} >
                        <CardItem>
                            <Col style={{ padding: 10 }}>
                                <Item style={{ height: 40 }}  >
                                    <Label style={[styles.label, { fontSize: 10 }]}>نام</Label>
                                    <Input style={{ fontSize: 10 }} value={this.state.firstname} onChangeText={(text) => this.setState({ firstname: text })} />
                                </Item>
                            </Col>
                            <Col style={{ padding: 5 }}>
                                <Item style={{ height: 40 }} >
                                    <Label style={[styles.label, { fontSize: 10 }]}>نام خانوادگی</Label>
                                    <Input style={{ fontSize: 10 }} value={this.state.lastname} onChangeText={(text) => this.setState({ lastname: text })} />
                                </Item>
                            </Col>
                            <Col style={{ padding: 10 }}>
                                <Item style={{ height: 40 }} >
                                    <Label style={[styles.label, { fontSize: 10 }]}>شماره تماس</Label>
                                    <Input style={{ fontSize: 10 }} value={this.state.contact.info} onChangeText={(text) => this.setState({
                                        contact: {
                                            info: text
                                        }
                                    })} />
                                </Item>
                            </Col>
                        </CardItem>



                    </Card>
                    <Card>
                        <CardItem>
                            <Col style={{ alignItems: 'center' }}>
                                <Text>آدرس مطب ها</Text>
                            </Col>

                        </CardItem>



                        {this.state.addressList ? this.renderAddress(this.state.addressList) : null}


                        <CardItem>
                            <Row>
                                <Col>
                                    <Button transparent block style={{ backgroundColor: '#5BC0DE' }}
                                        onPress={() => {
                                            this.setState({ openAddress: true, addressItem: { id: this.state.address.length } })
                                        }} >
                                        <Icon name='ios-add-outline' />
                                    </Button>
                                </Col>

                            </Row>
                        </CardItem>
                    </Card>

                    <Modal
                        animationType="slide"
                        transparent={false}
                        visible={this.state.openCamera}
                        onRequestClose={() => {
                            this.setState({ openCamera: false, uri: '' })
                        }}>
                        {this.cameraPreview()}
                    </Modal>

                    <Modal
                        animationType="slide"
                        transparent={false}
                        visible={this.state.openAddress}
                        onRequestClose={() => {
                            this.setState({ openAddress: false })
                        }}>
                        <KeyboardAwareScrollView style={{ backgroundColor: '#f4f4f4' }}>
                            <Grid style={{ flex: 1, justifyContent: 'center', backgroundColor: '#f4f4f4' }}>
                                <Row style={{ flexDirection: 'row', flex: 1 }}>
                                    <Col>
                                        <Header style={{ backgroundColor: "#7fbbd2", width: '100%' }}>
                                            <Left>
                                                <Button transparent onPress={() => {
                                                    this.setState({
                                                        addressList: this.state.addressList.concat([this.state.addressItem]),
                                                        openAddress: false,
                                                        addressItem: {
                                                            city: {},
                                                            details: '',
                                                            province: {},
                                                            region: '',
                                                            tell: ''
                                                        }
                                                    })
                                                }
                                                    // alert(JSON.stringify(this.state.address))}
                                                }><Icon name="md-checkmark-circle-outline" style={{ color: '#fff', justifyContent: 'flex-end', flexDirection: 'row' }} /></Button>
                                            </Left>
                                            <Body style={{ flex: 3 }} />
                                            <Right >
                                                <Button transparent onPress={() => { this.setState({ openAddress: false }) }}>
                                                    <Icon name="ios-arrow-back" style={{ color: '#fff' }} />
                                                </Button>
                                            </Right>
                                        </Header>
                                    </Col>

                                </Row>


                                <Row style={{ padding: 10 }}>
                                    <Col>
                                        <Picker

                                            placeholder='استان'
                                            placeholderStyle={{ color: '#ffffff' }}
                                            // note
                                            selectedValue={this.state.addressItem.province}
                                            onValueChange={this.selectProvince.bind(this)}
                                            // mode="dropdown"
                                            style={styles.picker}
                                            renderHeader={backAction =>
                                                <Header style={{ backgroundColor: "#fff" }}>
                                                    <Left />
                                                    <Body style={{ flex: 3 }}>
                                                        <Title style={{ color: "#fff" }}>استان خود را انتخاب کنید</Title>
                                                    </Body>
                                                    <Right >
                                                        <Button transparent onPress={backAction}>
                                                            <Icon name="arrow-back" style={{ color: "#fff" }} />
                                                        </Button>
                                                    </Right>
                                                </Header>}>
                                            <Picker.Item label="استان را انتخاب کنید" value="key0" />
                                            {this.props.province.map(item => (
                                                <Picker.Item label={item.title} value={item} />
                                            ))}
                                        </Picker></Col>

                                </Row>
                                <Row style={{ padding: 10 }}>
                                    <Col>
                                        <Picker
                                            placeholder='شهر'
                                            placeholderStyle={{ color: '#ffffff' }}
                                            // note
                                            // mode="dropdown"
                                            style={styles.picker}
                                            selectedValue={this.state.addressItem.city}
                                            onValueChange={this.selectCity.bind(this)}
                                            renderHeader={backAction =>
                                                <Header style={{ backgroundColor: "#7fbbd2" }}>
                                                    <Left>
                                                        <Button transparent onPress={backAction}>
                                                            <Icon name="arrow-back" style={{ color: "#fff" }} />
                                                        </Button>
                                                    </Left>
                                                    <Body style={{ flex: 3 }}>
                                                        <Title style={{ color: "#fff" }}>شهر خود را انتخاب کنید</Title>
                                                    </Body>
                                                    <Right />
                                                </Header>}
                                        // selectedValue={this.state.selected}
                                        // onValueChange={this.onValueChange.bind(this)}
                                        >
                                            <Picker.Item label="شهر را انتخاب کنید" value="key0" />
                                            {this.state.cityList.map(item => (
                                                <Picker.Item label={item.title} value={item} />
                                            ))}
                                        </Picker>
                                    </Col>


                                </Row>
                                <Row style={{ padding: 10 }}>
                                    <Col>
                                        <Item style={styles.input}>
                                            <Label style={styles.label}>نام منطقه</Label>
                                            <Input style={{ fontSize: 14 }}
                                                onChangeText={(val) => this.setState(prevState => ({
                                                    addressItem: {
                                                        ...prevState.addressItem,
                                                        region: val
                                                    }
                                                }))} />

                                        </Item>
                                    </Col>

                                </Row>
                                <Row style={{ padding: 10 }}>
                                    <Col>
                                        <Item style={styles.input}>
                                            <Label style={styles.label}>ادامه آدرس</Label>
                                            <Input style={{ fontSize: 14 }}
                                                onChangeText={(val) => this.setState(prevState => ({
                                                    addressItem: {
                                                        ...prevState.addressItem,
                                                        details: val
                                                    }
                                                }))} />
                                        </Item>
                                    </Col>
                                </Row>
                                <Row style={{ padding: 10 }}>
                                    <Col>
                                        <Item style={styles.input}>
                                            <Label style={styles.label}>شماره تماس</Label>
                                            <Input style={{ fontSize: 14 }} keyboardType="number-pad"
                                                onChangeText={(val) => this.setState(prevState => ({
                                                    addressItem: {
                                                        ...prevState.addressItem,
                                                        tell: val
                                                    }
                                                }))} />

                                        </Item>
                                    </Col>


                                </Row>

                                <Row size={3}>

                                </Row>
                            </Grid>
                        </KeyboardAwareScrollView>
                    </Modal>

                </Container >
            </KeyboardAwareScrollView>

        )
    }
}


const styles = StyleSheet.create({
    subtitleView: {
        flexDirection: 'column',
        paddingLeft: 10,
        paddingTop: 5
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    button: {
        justifyContent: 'center',
        alignSelf: 'center',
        paddingBottom: 20,
        height: 70,
        width: 60
    },
    input: {
        padding: 10
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
    picker: { width: '100%', fontSize: 10, borderRadius: 25, backgroundColor: '#fff', marginVertical: 5 },
    label: { fontSize: 13, textAlign: 'left', color: 'black', height: 40 }

})

function mapStateToProps(state, props) {
    return {
        loading: state.UserReducer.loading,
        profile: state.UserReducer.profile,
        province: state.UserReducer.province
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        //   dentistProfile
        getProvince,
        editProfile,
        profilePic
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileScreen);