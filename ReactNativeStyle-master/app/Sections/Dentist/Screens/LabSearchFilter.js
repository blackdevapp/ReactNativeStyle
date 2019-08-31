import React, { PureComponent } from 'react';
import {
    TouchableOpacity, StyleSheet, Platform
} from 'react-native';
import { Row, Col } from 'react-native-easy-grid'

import { Container, View, Button, Card, CardItem, Item, Input, Content, Icon, Text, Fab, Label, Picker, Form, Header, Left, Right, Body, Title } from 'native-base';

import SvgUri from 'react-native-svg-uri';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getProvince, editProfile } from '../../../Redux/Actions/User.Action'
import { getAllLabsSearch } from '../../Dentist/Redux/Actions/Search.action'
import { lab_filter_city_W, lab_filter_field, lab_filter_location, lab_filter_rate, lab_filter_setting, } from './../../../assets/img/svg/SvgXml'

import { Dialog } from 'react-native-simple-dialogs';
import { SearchBar } from 'react-native-elements';

import Snackbar from 'react-native-snackbar';

class LabSearchFilter extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            // city: false,
            // area: false,
            // expertise: false,
            // score: false,
            // equipment: false,
            showDialoge: false,
            mode: '',
            filter: {
                province: {
                    "id": '',
                    "title": '',
                    "cityList": []
                },
                city: {
                    "id": '',
                    "title": '',
                },
                expertise: '',
                area: '',
                score: 0,
                equipment: ''
            },
            cityList: []

            // data:[{id:1,value:'1'},{id:2,value:'2'},{id:3,value:'3'}]

        };
    }

    async componentDidMount() {

        if (this.props.province.length < 1) {
            await this.props.getProvince()
        }
    }

    selectProvince(value) {
        this.setState(prevState => ({
            filter: {
                ...prevState.filter,
                province: value,
                city: {
                    id:'',
                    title:''
                },
            },
            cityList: value.cityList
        }))
    }

    selectCity(value) {
        this.setState(prevState => ({
            filter: {
                ...prevState.filter,
                city: value
            }
        }))
    }

    selectExpertise(value) {
        this.setState(prevState => ({
            filter: {
                ...prevState.filter,
                expertise: value
            },
        }))
    }
    selectScore(value) {
        this.setState(prevState => ({
            filter: {
                ...prevState.filter,
                score: value
            },
        }))
    }

    search() {
        this.setState({ showDialoge: false })
        let query = ''
        if (this.state.filter.province.title) {
            query = query + `&state=${this.state.filter.province.title}`
        }
        if (this.state.filter.expertise) {
            query = query + `&specialization=${this.state.filter.expertise}`
        }
        if (this.state.filter.city.title) {
            query = query + `&city=${this.state.filter.city.title}`
        }
        query = query.replace('&', '')
        this.props.getAllLabsSearch(query)
    }
    clearFilter() {
        this.setState({
            filter: {
                province: {
                    "id": '',
                    "title": '',
                    "cityList": []
                },
                city: {
                    "id": '',
                    "title": '',
                },
                expertise: '',
                area: '',
                score: 0,
                equipment: ''
            }
        })
        this.props.getAllLabsSearch('')
    }
    render() {
        return (
            <View>
                <Row style={{ height: 85, justifyContent: 'space-evenly', backgroundColor: 'white' }}>
                    <Col style={{ padding: 5 }}>
                        <Row size={3} onPress={() => this.setState({
                            showDialoge: true,
                            mode: 'city'
                        })} >
                            <Card noShadow
                                style={{
                                    backgroundColor: 'white',
                                    width: 55,
                                    height: 55,
                                    borderRadius: 27,
                                    alignItems: 'center',
                                    borderWidth: 2,
                                    borderColor: ( this.state.filter.province.title != '') ? '#fe6958' : '#b8b8b8',
                                }}>
                                <SvgUri style={{ marginTop: 10 }} fill='#b8b8b8' width="20" height="20"
                                    svgXmlData={lab_filter_city_W}
                                />

                                <Text style={{ fontSize: 10 }}>شهر</Text>

                                {( this.state.filter.province.title != '') ?
                                    <TouchableOpacity style={{ justifyContent: 'flex-start', flexDirection: 'row' }}
                                        onPress={() => {
                                            alert(1)
                                            this.setState(prevState => ({
                                                filter: {
                                                    ...prevState.filter,
                                                    city: {
                                                        title: ''
                                                    },
                                                    province: {
                                                        title: ''
                                                    }
                                                },
                                            }))
                                            let self = this;
                                            setTimeout(function () {
                                                self.search()
                                            }, 100)
                                        }}>
                                        <Icon name='ios-close-circle-outline' style={{ color: '#fe6958' }} />
                                        <Text
                                            style={{ fontSize: 10, paddingTop: 5 }}
                                            numberOfLines={1}>
                                            {this.state.filter.province.title} {this.state.filter.city&&this.state.filter.city.title}</Text>
                                    </TouchableOpacity>
                                    : null
                                }


                            </Card>

                        </Row>


                    </Col>
                    <Col style={{ padding: 5 }}>
                        <Row size={3} onPress={() => Snackbar.show({
                            title: 'به زودی این بخش افزوده می شود.',
                            duration: 4000,
                        })}>
                            <Card noShadow style={{
                                backgroundColor: 'white',
                                width: 55,
                                height: 55,
                                borderRadius: 27,
                                alignItems: 'center',
                                borderWidth: 2,
                                borderColor: this.state.filter.area != '' ? '#fe6958' : '#b8b8b8'
                            }}>
                                <SvgUri style={{ marginTop: 10 }} fill='#b8b8b8' width="20" height="20"
                                    svgXmlData={lab_filter_location}
                                />

                                <Text style={{ fontSize: 10 }}>منطقه</Text>
                                {this.state.filter.area != '' ?
                                    <TouchableOpacity style={{ justifyContent: 'flex-start', flexDirection: 'row', width: '100%' }}
                                        onPress={() => {
                                            this.setState(prevState => ({
                                                filter: {
                                                    ...prevState.filter,
                                                    area: ''
                                                },
                                            }))
                                            let self = this;
                                            setTimeout(function () {
                                                self.search()
                                            }, 100)
                                        }}>
                                        <Icon name='ios-close-circle-outline' style={{ color: '#fe6958' }} />
                                        <Text style={{ fontSize: 10, paddingTop: 5 }}>{this.state.filter.area}</Text>
                                    </TouchableOpacity>
                                    : null
                                }

                            </Card>
                        </Row>
                    </Col>
                    <Col style={{ padding: 5 }}>
                        <Row size={3} onPress={() => this.setState({
                            showDialoge: true,
                            mode: 'expertise'
                        })}>
                            <Card noShadow style={{
                                backgroundColor: 'white',
                                width: 55,
                                height: 55,
                                borderRadius: 27,
                                alignItems: 'center',
                                borderWidth: 2,
                                borderColor: this.state.filter.expertise != '' ? '#fe6958' : '#b8b8b8'
                            }}>
                                <SvgUri style={{ marginTop: 10 }} fill='#b8b8b8' width="20" height="20"
                                    svgXmlData={lab_filter_field}
                                />
                                <Text style={{ fontSize: 10 }}>تخصص</Text>
                                {this.state.filter.expertise != '' ?
                                    <TouchableOpacity style={{ justifyContent: 'flex-start', flexDirection: 'row', width: '100%' }}
                                        onPress={() => {
                                            this.setState(prevState => ({
                                                filter: {
                                                    ...prevState.filter,
                                                    expertise: ''
                                                },
                                            }))
                                            let self = this;
                                            setTimeout(function () {
                                                self.search()
                                            }, 100)
                                        }}>
                                        <Icon name='ios-close-circle-outline' style={{ color: '#fe6958' }} />
                                        <Text style={{ fontSize: 10, paddingTop: 5 }}>{this.state.filter.expertise}</Text>
                                    </TouchableOpacity>
                                    : null
                                }
                            </Card>
                        </Row>

                    </Col>
                    <Col style={{ padding: 5 }}>
                        <Row size={3} onPress={() => this.setState({
                            showDialoge: true,
                            mode: 'score'
                        })}>
                            <Card noShadow style={{
                                backgroundColor: 'white',
                                width: 55,
                                height: 55,
                                borderRadius: 27,
                                alignItems: 'center',
                                borderWidth: 2,
                                borderColor: this.state.filter.score != 0 ? '#fe6958' : '#b8b8b8'
                            }}>
                                <SvgUri style={{ marginTop: 10 }} fill='#b8b8b8' width="20" height="20"
                                    svgXmlData={lab_filter_rate}
                                />
                                <Text style={{ fontSize: 10 }}>امتیاز</Text>
                                {this.state.filter.score != 0 ?
                                    <TouchableOpacity style={{ justifyContent: 'flex-start', flexDirection: 'row', width: '100%' }}
                                        onPress={() => {
                                            this.setState(prevState => ({
                                                filter: {
                                                    ...prevState.filter,
                                                    score: 0
                                                },
                                            }))
                                            let self = this;
                                            setTimeout(function () {
                                                self.search()
                                            }, 100)
                                        }}>
                                        <Icon name='ios-close-circle-outline' style={{ color: '#fe6958' }} />
                                        <Text style={{ fontSize: 10, paddingTop: 5 }}>{this.state.filter.score}</Text>
                                    </TouchableOpacity>
                                    : null
                                }
                            </Card>
                        </Row>
                        {/* <Row size={1}
                            style={{ marginVertical: 10, marginTop: 30, marginLeft: 10, alignItems: 'center' }}>
                            <Icon name="close-circle" style={{ fontSize: 15 }} />
                            <Text style={{ fontSize: 10 }}>تهران</Text>
                        </Row> */}
                    </Col>
                    <Col style={{ padding: 5 }}>
                        <Row size={3} onPress={() => Snackbar.show({
                            title: 'به زودی این بخش افزوده می شود.',
                            duration: 4000,
                        })}>
                            <Card noShadow style={{
                                backgroundColor: 'white',
                                width: 55,
                                height: 55,
                                borderRadius: 27,
                                alignItems: 'center',
                                borderWidth: 2,
                                borderColor: this.state.filter.equipment != '' ? '#fe6958' : '#b8b8b8'
                            }}>
                                <SvgUri style={{ marginTop: 10 }} fill='#b8b8b8' width="20" height="20"
                                    svgXmlData={lab_filter_setting}
                                />
                                <Text style={{ fontSize: 10 }}>تجهیزات</Text>
                                {this.state.filter.equipment != '' ?
                                    <TouchableOpacity style={{ justifyContent: 'flex-start', flexDirection: 'row', width: '100%' }}
                                        onPress={() => {
                                            this.setState(prevState => ({
                                                filter: {
                                                    ...prevState.filter,
                                                    equipment: ''
                                                },
                                            }))
                                            let self = this;
                                            setTimeout(function () {
                                                self.search()
                                            }, 100)
                                        }}>
                                        <Icon name='ios-close-circle-outline' style={{ color: '#fe6958' }} />
                                        <Text style={{ fontSize: 10, paddingTop: 5 }}>{this.state.filter.equipment}</Text>
                                    </TouchableOpacity>
                                    : null
                                }
                            </Card>
                        </Row>
                    </Col>
                    <TouchableOpacity onPress={
                        () => this.clearFilter()} style={{ marginRight: -15 }}>
                        <Card noShadow style={{
                            backgroundColor: '#fe6958',
                            width: 45,
                            flex: 1,
                            borderTopLeftRadius: 100,
                            borderBottomLeftRadius: 100,
                            justifyContent: 'center'
                        }}>
                            <Text style={{ fontSize: 8, color: '#ffffff', transform: [{ rotate: '-90deg' }], alignSelf: 'center' }}>حذف فیلترها</Text>
                        </Card>
                    </TouchableOpacity>
                </Row>

                <Dialog
                    visible={this.state.showDialoge}
                    onTouchOutside={() => this.setState({ showDialoge: false })}
                    title="">
                    <View >
                        {this.renderDialog()}

                        <Button
                            style={{ borderRadius: 15, backgroundColor: '#7fbbd2', height: 30 }}
                            onPress={() => this.search()}>
                            <Text>تایید</Text>
                        </Button>

                    </View>

                </Dialog>
            </View>
        )
    }
    renderDialog() {
        if (this.state.mode == 'city') {
            return (
                <View>
                    <Picker
                        placeholder='استان'
                        selectedValue={this.state.filter.province}
                        onValueChange={this.selectProvince.bind(this)}
                        style={styles.picker}
                        renderHeader={backAction =>
                            <Header style={{ backgroundColor: "#7fbbd2" }}>
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
                        <Picker.Item label="استان را انتخاب کنید"  />
                        {this.props.province.map((item, i) => (
                            <Picker.Item key={i} label={item.title} value={item} />
                        ))}
                    </Picker>

                    <Picker
                        eanable={this.state.province}
                        placeholder='شهر'
                        // placeholderStyle={{ color: '#ffffff' }}
                        // note
                        selectedValue={this.state.filter.city}
                        onValueChange={this.selectCity.bind(this)}

                        style={styles.picker}
                        renderHeader={backAction =>
                            <Header style={{ backgroundColor: "#7fbbd2" }}>
                                <Left />
                                <Body style={{ flex: 3 }}>
                                    <Title style={{ color: "#fff" }}>شهر خود را انتخاب کنید</Title>
                                </Body>
                                <Right >
                                    <Button transparent onPress={backAction}>
                                        <Icon name="arrow-back" style={{ color: "#fff" }} />
                                    </Button>
                                </Right>
                            </Header>}>
                        <Picker.Item label="شهر را انتخاب کنید"  />
                        {this.state.cityList.map((item, i) => (
                            <Picker.Item key={i} label={item.title} value={item} />
                        ))}
                    </Picker>

                </View>



            )
        } else if (this.state.mode == 'expertise') {
            return (
                <Picker
                    placeholder='نوع کار'
                    selectedValue={this.state.filter.expertise}
                    onValueChange={this.selectExpertise.bind(this)}
                    style={styles.picker}
                    renderHeader={backAction =>
                        <Header style={{ backgroundColor: "#7fbbd2" }}>
                            <Left />
                            <Body style={{ flex: 3 }}>
                                <Title style={{ color: '#000000' }}>نوع کار خود را انتخاب کنید</Title>
                            </Body>
                            <Right >
                                <Button transparent onPress={backAction}>
                                    <Icon name="arrow-back" style={{ color: "#fff" }} />
                                </Button>
                            </Right>
                        </Header>}>

                    <Picker.Item label="نوع کار را انتخاب کنید"  />
                    <Picker.Item label="متحرک" value="متحرک" />
                    <Picker.Item label="ارتودنسی" value="ارتودنسی" />
                    <Picker.Item label="ثابت" value="ثابت" />


                </Picker>
            )
        } else if (this.state.mode == 'score') {
            return (
                <Picker
                    placeholder='امتیاز'
                    selectedValue={this.state.filter.score}
                    onValueChange={this.selectScore.bind(this)}
                    style={styles.picker}
                    renderHeader={backAction =>
                        <Header style={{ backgroundColor: "#7fbbd2" }}>
                            <Left />
                            <Body style={{ flex: 3 }}>
                                <Title style={{ color: '#000000' }}>نوع کار خود را انتخاب کنید</Title>
                            </Body>
                            <Right >
                                <Button transparent onPress={backAction}>
                                    <Icon name="arrow-back" style={{ color: "#fff" }} />
                                </Button>
                            </Right>
                        </Header>}>

                    <Picker.Item label="امتیاز را انتخاب کنید" />
                    <Picker.Item label="۱" value={1} />
                    <Picker.Item label="۲" value={2} />
                    <Picker.Item label="۳" value={3} />
                    <Picker.Item label="۴" value={4} />
                    <Picker.Item label="۵" value={5} />


                </Picker>
            )
        } else if (this.state.mode == 'equipment') {
            return null
        } else if (this.state.mode == 'area') {
            return null
        }

    }
}

const styles = StyleSheet.create({
    picker: {
        width: '100%',
        // fontSize: 10,
        borderRadius: 25,
        backgroundColor: '#fff',
        marginVertical: 5
    }

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
        getAllLabsSearch,
        getProvince,
        editProfile
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LabSearchFilter);