import React, { PureComponent } from 'react';
import { NavigationActions } from 'react-navigation';
import { View, TouchableOpacity, Image, StyleSheet, ImageBackground ,Linking} from 'react-native'
import { ListItem } from 'react-native-elements'
import { Content } from 'native-base';
import { white } from 'ansi-colors';
import PropTypes from 'prop-types';
import { Icon, Drawer } from 'native-base'
import { Grid, Row, Col } from "react-native-easy-grid";
import { Button, Text } from 'native-base'
import SvgUri from 'react-native-svg-uri';
import { ConfirmDialog } from 'react-native-simple-dialogs'
import storageService from '../Services/Storage.service'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { logout } from '../Redux/Actions/User.Action'; //Import your actions
import {
    drawer_about_dentrace,
    drawer_assistant,
    drawer_exit,
    drawer_home,
    drawer_instagram,
    drawer_my_lab,
    drawer_profile,
    drawer_setting,
    drawer_website
} from '../assets/img/svg/SvgXml'
class DrawerComponent extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            logoutDialog: false
        };
    }
    goTo(item) {
        if (item.link != 'logout') {
            this.props.navigation.navigate(item.link)

        } else {
            this.setState({ logoutDialog: true })
        }
    }
    render() {
        const uri = "https://facebook.github.io/react-native/docs/assets/favicon.png";
        const { navigation } = this.props
        return (
            <View style={{ flex: 1 }}>
                {!this.props.items ?
                    <View>
                        <Grid>
                            <Row>
                                <Col style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 12, color: 'blue' }}>به دنتریس خوش آمدید</Text></Col>
                            </Row>
                        </Grid>
                    </View>
                    :
                    <View>
                        {
                            this.props.items.map((item, i) => (
                                <TouchableOpacity key={i} onPress={() => {this.goTo(item)
                                }}>
                                    <ListItem
                                        key={i}
                                        title={<Text style={{ fontSize: 13 }}>{item.title}</Text>}
                                        bottomDivider={true}
                                        leftIcon={
                                            <SvgUri
                                                style={{ justifyContent: 'center', alignSelf: 'center' }}
                                                width="20"
                                                height="20"
                                                fill="#7fbbd2"
                                                svgXmlData={item.icon}
                                            // source={require('../assets/img/svg/home.svg')}
                                            />
                                        }
                                    />
                                </TouchableOpacity>

                            ))
                        }
                    </View>
                }

                <Row style={styles.bottomRow}>
                    <Col >
                        <Button block info style={{ borderRadius: 0, height: 50, backgroundColor: '#7fbbd2' }}
                        onPress={()=>Linking.openURL('https://www.dentrace.com')}>
                            <Text style={{ fontSize: 10 }}>مشاهده وبسایت</Text>
                            <SvgUri svgXmlData={drawer_website} width='20' height='20' />
                        </Button>
                    </Col>
                    <Col>
                        <Button block info style={{ borderRadius: 0, height: 50, backgroundColor: '#e7be00' }}>
                            <Text style={{ fontSize: 10 }}>صفحه اینستاگرام</Text>
                            <SvgUri svgXmlData={drawer_instagram} width='20' height='20' />
                        </Button>
                    </Col>

                </Row>
                <ConfirmDialog
                    title="خروج"
                    message="آیا از خروج اطمینان دارید؟"
                    visible={this.state.logoutDialog}
                    onTouchOutside={() => this.setState({ dialogVisible: false })}
                    positiveButton={{
                        title: "بله",
                        onPress: () => {
                            storageService.clearAll().then(res => {
                                this.props.logout()
                                this.props.navigation.navigate('auth')
                                this.setState({ logoutDialog: false })
                            })
                        }
                    }}
                    negativeButton={{
                        title: "خیر",
                        onPress: () => this.setState({ logoutDialog: false })
                    }}
                />
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        // borderWidth: 0.4,
        // borderColor: 'red',
        padding: 0,
    },
    headerContainer: {
        height: 150,
    },
    headerText: {
        color: '#fff8f8',
    },
    screenContainer: {
        paddingTop: 20
    },
    screenStyle: {
        height: 30,
        marginTop: 2,
        flexDirection: 'row',
        alignItems: 'center'
    },
    screenTextStyle: {
        fontSize: 20,
        marginLeft: 20
    },


    sideMenuContainer: {

        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingTop: 20
    },

    sideMenuProfileIcon:
    {
        resizeMode: 'center',
        width: 150,
        height: 150,
        borderRadius: 150 / 2
    },

    sideMenuIcon:
    {
        resizeMode: 'center',
        width: 28,
        height: 28,
        marginRight: 10,
        marginLeft: 20

    },

    menuText: {

        fontSize: 15,
        color: '#222222',

    },
    avatar: {
        width: 70,
        height: 70,
        borderRadius: 63,
        borderWidth: 2,
        borderColor: "white",
        marginBottom: 10,
    },
    userInfo: {
        fontSize: 16,
        color: "white",
        fontWeight: '600',
    },
    bottomRow: {

        width: '100%',
        height: 50,
        // backgroundColor: '#FF9800',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0
    }

});
function mapStateToProps(state, props) {
    return {
        items: state.GlobalReducer.items
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        logout
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawerComponent);
