import React, { PureComponent } from 'react';
import { View, FlatList, StyleSheet, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import { Container, Text, Button, Card, CardItem, Body, Item, Content, Input,Fab,Icon, Radio } from 'native-base';
import { Grid, Row, Col } from 'react-native-easy-grid';
import { myPriceClasses, myPriceClasseItem, getDentalServices } from '../../Redux/Actions/Lab.action'
import { bindActionCreators } from 'redux';
// import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import HeaderComponent from '../../../../Components/Header.component';

const extractKey = ({ id }) => id
import SvgUri from 'react-native-svg-uri';


class AddPriceListScreen extends PureComponent {
    constructor(props) {
        super(props);
        this.props.getDentalServices()
        this.state = {
            selected: false
        };
    }
    componentDidMount() {
        this.props.getDentalServices()
    }

    componentDidUpdate() {

    }
    render() {
        // alert(JSON.stringify(this.props.classes))

        return (
            <Container style={{ backgroundColor: '#f4f4f4' }}>
                <HeaderComponent title="ثبت قیمت ها" color="#7EDAD1" />
                <Content contentContainerStyle={{ flex: 1 }}>
                    <Grid>
                        <Row size={85}>
                            <Col style={{ padding: 10, flex: 1 }}>
                                <Button rounded style={{ backgroundColor: '#d9d9d9', width: '100%', height: 30 }}>
                                    <Input style={{ backgroundColor: '#d9d9d9', borderRadius: 10, fontSize: 10, height: 10 }} placeholder="عنوان لیست قیمت" />
                                </Button>
                                <Card>
                                    <ScrollView>
                                        {this.props.products.map(item=>{
                                            return(
                                                <TouchableOpacity onPress={() => this.setState({ selected: !this.state.selected })}>
                                            <CardItem style={{ padding: 10, borderBottomWidth: 1, borderColor: '#d9d9d9' }}>
                                                <Row >
                                                    <Col size={5} style={{ alignItems: 'center' }}>
                                                        <Radio selected={this.state.selected} onPress={() => this.setState({ selected: !this.state.selected })} />
                                                    </Col>
                                                    <Col size={20} style={{ alignItems: 'center' }}>
                                                        <Text style={{ fontSize: 9 }}>{item.productName}</Text>
                                                    </Col>
                                                    <Col size={20}>
                                                        <Input style={{ backgroundColor: '#d9d9d9', borderRadius: 10, fontSize: 10, height: 10 }} />
                                                    </Col>
                                                    <Col size={8} style={{ alignItems: 'center', borderRightWidth: 1, borderColor: '#d9d9d9' }}>
                                                        <Text style={{ fontSize: 10 }}>تومان</Text>
                                                    </Col>
                                                    <Col size={20}>
                                                        <Input style={{ backgroundColor: '#d9d9d9', borderRadius: 10, fontSize: 10, height: 10 }} />
                                                    </Col>
                                                    <Col size={5} style={{ alignItems: 'center' }}>
                                                        <Text style={{ fontSize: 10 }}>الی</Text>
                                                    </Col>
                                                    <Col size={20}>
                                                        <Input style={{ backgroundColor: '#d9d9d9', borderRadius: 10, fontSize: 10, height: 10 }} />
                                                    </Col>
                                                    <Col size={5} style={{ alignItems: 'center' }}>
                                                        <Text style={{ fontSize: 10 }}>روز</Text>
                                                    </Col>
                                                </Row>
                                            </CardItem>

                                        </TouchableOpacity>
                                    
                                            )
                                        })}
                                        </ScrollView>
                                </Card>
                            </Col>
                        </Row>
                        <Row size={15}>
                            <Col>
                                <Button rounded
                                    onPress={() => this.props.navigation.navigate('MyPriceList')}
                                    style={{ backgroundColor: '#7EDAD1', width: 150, height: 30, alignSelf: 'center' }}>
                                    <Text>ثبت و مشاهده</Text>
                                </Button>
                            </Col>
                        </Row>
                    </Grid>
                </Content>
                <Fab
          style={{ backgroundColor: '#e7be00', position: 'absolute', bottom: 2, width: 40, height: 40, left: 3 }}
          position="bottomLeft"
          onPress={() => this.props.navigation.goBack()}>
          <Icon name="ios-arrow-back" />
        </Fab>
            </Container>
        );
    }


}

const styles = StyleSheet.create({
    containerRow: {
        marginTop: 5,
        width: Dimensions.get('window').width,
    },
    row: {
        flex: 1,
        paddingLeft: 6,
        paddingRight: 6,
    },
})
function mapStateToProps(state, props) {
    return {
        loading: state.LabReducer.loading,
        dentalService: state.LabReducer.dentalService,
        products: state.LabReducer.products,

    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        myPriceClasses,
        myPriceClasseItem,
        getDentalServices
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPriceListScreen);
