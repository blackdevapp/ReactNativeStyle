import React, { PureComponent } from 'react';
import {
    FlatList, StyleSheet, Image, Dimensions, TouchableOpacity
} from 'react-native';
import { Row, Grid, Col } from 'react-native-easy-grid'
import {
    Container, View, Card,
    CardItem, Item, Input,
    Body,
    Icon, Text
} from 'native-base';


import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    getAllLabsSearch,
    showLoading,
    getCompareList,
    addToCompareList,
    searchByName
} from '../Redux/Actions/Search.action'; //Import your actions

import { Rating } from 'react-native-elements'
import SvgUri from 'react-native-svg-uri';
import HeaderComponent from '../../../Components/Header.component'
import {

    lab_filter_law
} from './../../../assets/img/svg/SvgXml'

import LabSearchFilte from './LabSearchFilter'
import LabSearchCompare from './LabSearchCompare'


const extractKey = ({ id }) => id
const mediaCardData = [
    { id: 1, url: 'http://s8.picofile.com/file/8342161734/lab_images2.png' },
    { id: 2, url: 'http://s8.picofile.com/file/8342161792/lab_images3.png' },
    { id: 3, url: 'http://s8.picofile.com/file/8342162000/lab_images4.png' },
    { id: 4, url: 'http://s9.picofile.com/file/8342162084/lab_images5.png' },
    { id: 5, url: 'http://s8.picofile.com/file/8342162168/lab_images6.png' },
    { id: 6, url: 'http://s9.picofile.com/file/8342162234/lab_imges1.png' },
]


const imageSize = Dimensions.get('screen').width / 7
class LabSearchScreen extends PureComponent {

    constructor(props) {
        super(props);
        // this.props.navigation.navigate('bill')

        this.state = {
            page: 0,
            limit: 10,
            playVideo: false,
            term:''
        };


    }
    componentDidMount() {
        this.props.getAllLabsSearch(`page=${this.state.page}&limit=10`)
    }

    // 80bcd3

    renderItem = ({ item }) => {

        return (
            <TouchableOpacity
                key={item.labId}
                style={styles.row}
                onPress={() => {
                    this.props.navigation.navigate('labProfile', {
                        classId: item.priceClassId,
                        status: item.subscribeStatus, labId: item.labId
                    })
                }}>
                {/* <Grid style={{flex:1}}> */}
                <Card>

                    <CardItem>
                        <Body>


                            <Row>

                                <Col size={2} style={{ flex: 1, alignSelf: 'center' }}>
                                    {item.profilePicUrl ? <Image activeOpacity={0.7} resizeMode="cover" style={{
                                        borderRadius: 10,
                                        width: imageSize,
                                        height: imageSize,
                                        borderWidth: 1,
                                        borderColor: 'gray'
                                    }}
                                        source={{ uri: `http://89.32.249.208:8090${item.profilePicUrl}` }}
                                    /> : <Image activeOpacity={0.7} resizeMode="cover" style={{
                                        borderRadius: 10,
                                        width: imageSize,
                                        height: imageSize,
                                        borderWidth: 1,
                                        borderColor: 'gray'
                                    }}
                                        source={{ uri: `https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg` }}
                                        />}


                                    {/* <SvgUri width="30" height="30" source={require("../../assets/images/recieve.svg")} /> */}
                                </Col>
                                <Col size={3} style={{ paddingHorizontal: 20 }}>
                                    <Text style={{
                                        fontSize: 15,
                                        color: '#80bcd3',
                                        flexDirection: 'column',
                                        paddingRight: 15
                                    }}>{item.labName} </Text>
                                    {/* {this.renderSubTitle(item.subscribeStatus)} */}
                                    <Text style={{
                                        fontSize: 12,
                                        flexDirection: 'column',
                                        paddingRight: 15
                                    }}>{item.user.firstname} {item.user.lastname}</Text>

                                </Col>

                                <Col size={2} style={{ justifyContent: 'flex-end', alignItems: 'center' }}>
                                    <TouchableOpacity
                                        style={{
                                            width: 25,
                                            height: 25,
                                            borderRadius: 15,
                                            backgroundColor: '#80bcd3'
                                        }}
                                        onPress={() => {
                                            this.props.addToCompareList(item)
                                        }}
                                    >
                                        <SvgUri
                                            width="17"
                                            height="17"
                                            fill='white'
                                            style={{ alignSelf: 'center' }}
                                            svgXmlData={lab_filter_law} />
                                    </TouchableOpacity>
                                    <Rating
                                        showRating
                                        type="star"
                                        fractions={1}
                                        startingValue={3}
                                        readonly
                                        showRating={false}
                                        imageSize={12}
                                        showReadOnlyText={false}
                                        style={{ paddingVertical: 10 }}
                                    />
                                    <Text style={{ fontSize: 9 }}>از 100 نظر</Text>
                                </Col>
                            </Row>
                        </Body>
                    </CardItem>
                </Card>
                {/* </Grid> */}
            </TouchableOpacity>

        )
    }


    handleRefresh = () => {
        this.props.getAllLabsSearch(`page=0&limit=10`)
        this.setState({
            page:0
          })
    }
    onEndReached = () => {
        // this.props.getAllLabsSearch(this.state.page+1, 10)
        // this.setState({
        //   page:this.state.page+1
        // })
    }


    searchLabTerm(){
        if(this.state.term.length>0){
            this.props.searchByName(this.state.term)
        }else{
            this.props.getAllLabsSearch(`page=${this.state.page}&limit=10`)
        }
    }
    compare(){
        let query=''
        for(let item of this.props.compareList){
            query=query+`&lab_id=${item.labId}`
        }
        query=query.replace('&','')
        this.props.getCompareList(query)
        // console.log(this.props.compareList)
        this.props.navigation.navigate('compare', {
            compareList: this.props.compareList,
            itemSize:imageSize
        })
    }
    render() {
        return (
            <Container>
                <HeaderComponent title="جستجوی لابراتوار" />

                <Grid style={{ flex: 1, backgroundColor: '#f4f4f4' }}>

                    <LabSearchFilte />

                    {/* <Header style={{ backgroundColor: 'white', borderWidth: 0, height: 45, marginTop: 5 }} searchBar rounded> */}
                    <View style={{ paddingHorizontal: 5, paddingTop: 10 }}>
                        <Item rounded>
                            <Input style={{ height: 35, fontSize: 11 }}
                             placeholder="نام لابراتوار مورد نظر را جستجو کنید" 
                             onChangeText={(text)=>this.setState({
                                 term:text
                             })}/>
                            <TouchableOpacity onPress={() => this.searchLabTerm()}>
                                <Icon name="ios-search" />
                            </TouchableOpacity>
                        </Item>
                    </View>
                    <View style={{ paddingHorizontal: 6 }}>
                        <LabSearchCompare itemSize={imageSize}
                            goCompareScreen={() => {this.compare()}} />

                    </View>

                    {/* </Header> */}
                    <Row size={5}>

                        <View style={{ flex: 1 }}>
                            <FlatList
                                style={styles.container}
                                data={this.props.labs}
                                renderItem={this.renderItem}
                                keyExtractor={(item,i) => i.toString()}
                                onRefresh={this.handleRefresh}
                                onEndReached={this.onEndReached}
                                refreshing={false}
                                onEndReachedThreshold={0.5}
                            />
                        </View>
                    </Row>
                </Grid>

            </Container>

        );
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
        loading: state.SearchReducer.loading,
        labs: state.SearchReducer.labs,
        compareList: state.SearchReducer.compareList

    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getAllLabsSearch,
        showLoading,
        addToCompareList,
        getCompareList,
        searchByName
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LabSearchScreen);
