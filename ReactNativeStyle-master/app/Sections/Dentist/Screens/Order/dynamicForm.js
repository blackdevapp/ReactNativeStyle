import React, { Component } from 'react';
import httpService from '../../../../Services/Http.service'
import { StyleSheet, ScrollView, Platform } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import {
    Container, Content, Item, Picker, Label, Input, Text, Button, ListItem, Card, CheckBox, Body,
    Header, Left, Right, Icon, Title
} from 'native-base';
import SvgUri from 'react-native-svg-uri';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import HeaderComponent from '../../../../Components/Header.component';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { setForm } from '../../Redux/Actions/Order.action'
class DynamicForm extends Component {
    constructor(props) {
        super(props);
        // console.log(this.props.form)
        

        this.state = {
            formTitle: '',
            formId: '',
            serviceId: '',
            form: {
                id: '',
                title: '',
                serviceId: '',
                properties: [
                    { id: '', key: '', propertyType: '', repository: [], data: [] }
                ]
            },
        };
    }
    componentDidMount(){
        if (this.props.form && this.props.form.serviceId == this.props.navigation.getParam('serviceId')) {
            console.log('omad')
            this.setState({
                loading: false,
                formId: this.props.form.id,
                formTitle: this.props.form.title,
                form: this.props.form,
                showForm: true
            })
        } else {
            httpService.httpGetJwt(`idandoon/admin/dynamicforms/services/${this.props.navigation.getParam('serviceId')}`)
                .then(res => {
                    for (let item of res.data.data.properties) {
                        if (item.propertyType == 'MULTIPLE_SELECT') {
                            item.data = []
                        } else {
                            item.data = ''
                        }
                    }
                    this.setState({
                        loading: false,
                        formId: res.data.data.id,
                        formTitle: res.data.data.title,
                        form: res.data.data,
                        showForm: true
                    })
                }).catch(err => {
                    alert(JSON.stringify(err, null, 4))
                })
        }
    }
    renderItem(item, index) {
        if (item.propertyType == 'SINGLE_SELECT') {
            return (
                <Row style={{ justifyContent: 'center' }}>

                    <Col size={1} style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Item style={[styles.itemInput1]}>
                            <Picker
                                placeholder={`لطفا ${item.key} را انتخاب کنید`}
                                selectedValue={this.state.form.properties[index].data}
                                onValueChange={(itemValue) =>
                                    this.setState(prevState => {
                                        const newItems = [...prevState.form.properties];
                                        newItems[index].data = itemValue;
                                        return {
                                            form: {
                                                id: this.state.form.id,
                                                serviceId: this.state.form.serviceId,
                                                title: this.state.form.title,
                                                properties: newItems
                                            }
                                        }
                                    })}
                                style={styles.Input}
                                renderHeader={backAction =>
                                    <Header style={{ backgroundColor: "#7fbbd2" }}>
                                        <Left />
                                        <Body style={{ flex: 3 }}>
                                            <Title style={{ color: "#fff" }}>{item.key} را انتخاب کنید</Title>
                                        </Body>
                                        <Right >
                                            <Button transparent onPress={backAction}>
                                                <Icon name="arrow-back" style={{ color: "#fff" }} />
                                            </Button>
                                        </Right>
                                    </Header>}>
                                <Picker.Item label={`لطفا ${item.key} را انتخاب کنید`} disabled />
                                {item.repository.map(sub => (
                                    <Picker.Item label={sub} value={sub} />
                                ))}
                            </Picker>
                            {Platform.OS === 'ios' && <Icon name='arrow-dropdown' style={{ position: 'absolute', right: 10 }} />}
                        </Item>


                    </Col>
                    {/* <Col size={1}>
                        <Text style={{ padding: 12 }}>{item.key} : {this.state.form.properties[index].data}</Text>
                    </Col> */}
                </Row>

            )
        } else if (item.propertyType == 'MULTIPLE_SELECT') {
            return (
                <Row style={{ justifyContent: 'center' }}>
                    <Col >
                        <Card noShadow style={{ borderRadius: 25, width: 150, height: 40, borderColor: 'white', marginBottom: -22, marginLeft: 40, alignItems: 'center', zIndex: 10 }}>
                            <Text style={{ padding: 7, zIndex: 10, fontSize: 12, color: 'grey' }}>{item.key}</Text>
                        </Card>
                        <Card style={{ borderColor: 'white' }}>
                            {item.repository.map((sub) => {
                                return (
                                    <ListItem onPress={() => {
                                        this.state.form.properties[index].data.indexOf(sub) == -1 ?
                                            this.setState(prevState => {
                                                const newItems = [...prevState.form.properties];
                                                newItems[index].data.push(sub);
                                                return {
                                                    form: {
                                                        id: this.state.form.id,
                                                        serviceId: this.state.form.serviceId,
                                                        title: this.state.form.title,
                                                        properties: newItems
                                                    }
                                                }
                                            }) :
                                            this.setState(prevState => {
                                                const newItems = [...prevState.form.properties];
                                                newItems[index].data.splice(this.state.form.properties[index].data.indexOf(sub), 1);
                                                return {
                                                    form: {
                                                        id: this.state.form.id,
                                                        serviceId: this.state.form.serviceId,
                                                        title: this.state.form.title,
                                                        properties: newItems
                                                    }
                                                }
                                            })
                                    }}>
                                        <Row>
                                            <Col size={20} style={{ justifyContent: 'center', alignItems: 'center' }}>
                                                <CheckBox checked={this.state.form.properties[index].data.indexOf(sub) > -1} color="#edb831" style={{ borderRadius: 50, width: 20, height: 20 }}
                                                    onPress={() => {
                                                        this.state.form.properties[index].data.indexOf(sub) == -1 ?
                                                            this.setState(prevState => {
                                                                const newItems = [...prevState.form.properties];
                                                                newItems[index].data.push(sub);
                                                                return {
                                                                    form: {
                                                                        id: this.state.form.id,
                                                                        serviceId: this.state.form.serviceId,
                                                                        title: this.state.form.title,
                                                                        properties: newItems
                                                                    }
                                                                }
                                                            })
                                                            :
                                                            this.setState(prevState => {
                                                                const newItems = [...prevState.form.properties];
                                                                newItems[index].data.splice(this.state.form.properties[index].data.indexOf(sub), 1);
                                                                return {
                                                                    form: {
                                                                        id: this.state.form.id,
                                                                        serviceId: this.state.form.serviceId,
                                                                        title: this.state.form.title,
                                                                        properties: newItems
                                                                    }
                                                                }
                                                            })
                                                    }}
                                                />
                                            </Col>
                                            <Col size={80} style={{ justifyContent: 'center', alignItems: 'center' }}>
                                                <Text style={[styles.Input, { color: 'grey' }]}>{sub}</Text>
                                            </Col>
                                        </Row>

                                    </ListItem>
                                )

                            })}

                        </Card>
                    </Col>
                </Row>

            )
        } else if(item.propertyType=='KEY_VALUE'){
            return (
                <Row style={{ justifyContent: 'center' }}>
                    <Col style={{ padding: 5 }}>
                        <Item floatingLabel style={[styles.itemInput1]}>
                            <Label>{item.key}</Label>
                            <Input style={styles.Input} value={this.state.form.properties[index].data} onChangeText={(text) =>
                                this.setState(prevState => {
                                    const newItems = [...prevState.form.properties];
                                    newItems[index].data = text;
                                    return {
                                        form: {
                                            id: this.state.form.id,
                                            serviceId: this.state.form.serviceId,
                                            title: this.state.form.title,
                                            properties: newItems
                                        }
                                    }
                                })} />
                        </Item>
                    </Col>
                </Row>

            )
        }

    }
    render() {
        return (
                <Container style={{ backgroundColor: '#f4f4f4' }}>
                    <HeaderComponent title="تنظیم جزییات سفارش" />
                    <KeyboardAwareScrollView>

                    <Content style={{ padding: 2 }}>
                        <ScrollView >
                            <Row style={{ padding: 3 }}>
                                <Text style={{ fontSize: 14 }}>جزییات {this.state.formTitle}</Text>
                            </Row>
                            <Grid style={{ margin: 2 }}>
                                {this.state.form.properties.map((item, index) => (
                                    this.renderItem(item, index)
                                ))}
                                <Row>
                                    <Col style={{ padding: 10 }}>
                                        <Button rounded block style={{ backgroundColor: '#80bcd3', height: 35 }}
                                            onPress={() => this.props.navigation.goBack()}>
                                            <Text style={{ fontSize: 11 }}>بازگشت</Text>
                                        </Button>
                                    </Col>
                                    <Col style={{ padding: 10 }}>
                                        <Button rounded block style={{ backgroundColor: '#7fbbd2', height: 35 }}
                                            onPress={() => {
                                                this.props.setForm(this.state.form)
                                                this.props.navigation.goBack()
                                            }}>
                                            <Text style={{ fontSize: 11 }}>ثبت</Text>
                                        </Button>
                                    </Col>
                                </Row>

                            </Grid>
                        </ScrollView>

                    </Content>
                    </KeyboardAwareScrollView>

                </Container>


        )
    }
}
const styles = StyleSheet.create({
    colContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5
    },
    picker: {
        width: '100%',
        fontSize: 10,
        borderRadius: 25,
        // backgroundColor: '#fff',
        marginVertical: 5
    },
    Input: {
        textAlign: 'right',
        padding: 2,
        fontSize: 15,
        borderColor: 'red',
        justifyContent: 'flex-start',
        margin: 10
    },
    buttonActive: {
        backgroundColor: 'orange',
        margin: 1,
        width: 25,
        height: 25,
        // borderWidth: 0.5,
        // borderColor: 'red',
        justifyContent: 'center',
        alignContent: 'center'
    },
    buttonInactive: {
        backgroundColor: 'cyan',
        margin: 1,
        width: 25,
        height: 25,
        padding: 0,
        // borderWidth: 0.5,
        // borderColor: 'red',
        justifyContent: 'center',
        // alignItems: 'center'
    },
    buttonText: {
        padding: 0,
        paddingHorizontal: 0,
        // borderWidth: 0.5,
        borderColor: 'red',
        fontSize: 10,
        zIndex: 1,
        height: 15,
        width: 30,

        textAlign: 'center',
        textAlignVertical: 'center'
    },
    itemInput1: {
        borderRadius: 25,
        // borderColor: 'red',
        backgroundColor: '#FFF',
        height: 45,
        width: '94%',
        padding: 5,
        margin: 10

    },
});

function mapStateToProps(state, props) {
    return {
        loading: state.OrderReducer.loading,
        form: state.OrderReducer.form,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        setForm
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DynamicForm);
