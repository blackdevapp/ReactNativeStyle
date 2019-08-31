import React, { PureComponent } from 'react';
import { Modal } from 'react-native'
import { TouchableOpacity } from 'react-native'
import {
    Container, Content, Tab, Tabs, TabHeading, Text, Header, Form, Item, Input, Label, Button,
    List, ListItem, Left, Body, Right, Thumbnail, Fab, Icon, Card,
} from 'native-base';
import { Grid, Row, Col } from 'react-native-easy-grid';
//N246965h#z

class TechnitionListScreen extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            showTechAddModal: false
        };
    }

    render() {
        return (
            <Container>
                <List>
                    <ListItem avatar onPress={() => this.props.navigation.navigate('DoctorOrderScreen')}>
                        <Left>
                            <Thumbnail source={{ uri: 'https://picsum.photos/200/300/?random&blur' }} />
                        </Left>
                        <Body>
                            <Text>Kumar Pratik</Text>
                            <Text note>Doing what you like will always keep you happy . .</Text>
                        </Body>
                        <Right />
                    </ListItem>
                    <ListItem avatar>
                        <Left>
                            <Thumbnail source={{ uri: 'https://picsum.photos/200/300/?random&blur' }} />
                        </Left>
                        <Body>
                            <Text>Kumar Pratik</Text>
                            <Text note>Doing what you like will always keep you happy . .</Text>
                        </Body>
                        <Right />
                    </ListItem>
                    <ListItem avatar>
                        <Left>
                            <Thumbnail source={{ uri: 'https://picsum.photos/200/300/?random&blur' }} />
                        </Left>
                        <Body>
                            <Text>Kumar Pratik</Text>
                            <Text note>Doing what you like will always keep you happy . .</Text>
                        </Body>
                        <Right />
                    </ListItem>

                </List>
                <Fab
                    position="bottomRight"
                    style={{ backgroundColor: '#3F51B5' }}
                    onPress={() => this.setState({ showTechAddModal: true })}
                >
                    <Icon name="add" />
                </Fab>


                <Modal

                    visible={this.state.showTechAddModal}
                    animationType="slide"
                >
                    <Container>
                        <Header style={{ height: 85, padding: 5 }}>
                            <Left />
                            <Body style={{ flex: 3, justifyContent: 'center', paddingHorizontal: 20 }}>
                                <Text style={{ color: 'white', fontSize: 18, }}>افزودن تکنسین</Text>
                            </Body>
                            <Right >
                                <Button transparent onPress={() => this.setState({ showTechAddModal: false })}>
                                    <Icon name='arrow-back' style={{ fontSize: 25, color: 'white' }}></Icon>
                                </Button>
                            </Right>
                        </Header>
                        <Content contentContainerStyle={{ flex: 1 }}>
                            <Card style={{ justifyContent: 'center' }}>
                                <Form>
                                    <Item floatingLabel style={{ alignItems: 'center', justifyContent: 'center' }}>
                                        <Label>  شماره همراه تکنسین را وارد کنید: </Label>
                                        <Input />
                                    </Item>
                                    <Item style={{ alignItems: 'center', justifyContent: 'center', padding: 20 }}>
                                        <Button style={{ paddingHorizontal: 10 }}>
                                            <Text>افزودن</Text>
                                        </Button>
                                        <Button style={{ paddingHorizontal: 10 }}>
                                            <Text>انصراف</Text>
                                        </Button>
                                    </Item>
                                </Form>
                            </Card>
                        </Content>
                    </Container>
                </Modal>
            </Container>


        );
    }
}

export default TechnitionListScreen;
