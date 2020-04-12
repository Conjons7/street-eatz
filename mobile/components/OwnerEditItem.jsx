import React from 'react';
import { StyleSheet, View, Text, TextInput, KeyboardAvoidingView, ScrollView, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from "react-native";
import { Header, Icon, Button, ListItem, Input, CheckBox } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { HOST } from 'react-native-dotenv';
import axios from 'axios';

export default class OwnerEditItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sideMenuView: false,
      existingItem: false,
      popularItem: false
    }
  }

  componentDidMount() {
      console.log('props: ', this.props.itemData)
      this.props.itemData ? this.setState({ existingItem: true }) : null
    //   axios.get(`http://192.168.1.65:3000/api/Businesses/${this.props.businessIds[0]}`)
    //     .then(res => {
    //         menu = res.data.menu
    //         this.setState({ menu: res.data.menu })
    //     })
    //     .catch(err => alert('Something went wrong.'))
  }

  render() {
    return (
        <KeyboardAvoidingView  style={styles.container} behavior="padding">
            <View>
                <Header
                    containerStyle={{
                        backgroundColor: '#980000',
                        justifyContent: 'space-around',
                    }}
                    leftComponent={<Icon
                        name='menu'
                        //onPress={() => this.toggleSideMenu(this.state.sideMenuView)}
                    />}
                    centerComponent={{ style: { color: '#fff', fontSize: 25, fontWeight: 'bold' }, text: "Edit Menu" }}
                    rightComponent={<Icon
                        name='home'
                        //onPress={() => this.goToOwnerMap(this.props.token, this.props.userId, this.props.businessIds)}
                    />}
                />
            </View>
                    {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
                        <ScrollView scrollEnabled={true}>
                            <Text style={styles.label}>Item Name</Text>
                            <TextInput 
                                style={styles.input}
                                defaultValue={this.state.existingItem ? this.props.itemData.item : ''}
                                placeholder={this.state.existingItem ? '' : 'Pommes Frites'}/>
                            <Text style={styles.label}>Price</Text>
                            <TextInput
                                style={styles.input}
                                defaultValue={this.state.existingItem ? this.props.itemData.price : ''}
                                placeholder={this.state.existingItem ? '' : '9.99'}/>
                            <Text style={styles.label}>Category</Text>
                            <TextInput
                                style={styles.input}
                                defaultValue={this.state.existingItem ? this.props.itemData.category : ''}
                                placeholder={this.state.existingItem ? '' : 'American, Chicken, Gourmet, etc.'}/>
                            <Text style={styles.label}>Image</Text>
                            <TextInput
                                style={styles.input}
                                defaultValue={this.state.existingItem ? this.props.itemData.image : ''}
                                placeholder={this.state.existingItem ? '' : 'https://link-to-your-image.com...'}/>
                            <Text style={styles.label}>Description</Text> 
                            <TextInput
                                style={styles.textarea}
                                defaultValue={this.state.existingItem ? this.props.itemData.desc : ''}
                                placeholder={this.state.existingItem ? '' : 'Here is your dish"s chance to shine. Give all the details!'} multiline={true}/>
                            <CheckBox
                                containerStyle={styles.checkbox}
                                center
                                title='Mark As Popular Item'
                                checked={this.state.popularItem}
                                onPress={() => this.setState({popularItem: !this.state.popularItem})}/>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => this.login(this.state.email, this.state.password)}>
                                <Text style={styles.buttonText}> Cancel </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => this.login(this.state.email, this.state.password)}>
                                <Text style={styles.buttonText}> Submit </Text>
                            </TouchableOpacity>
                        </ScrollView>
                    {/* </TouchableWithoutFeedback> */}
        </KeyboardAvoidingView>
      )
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffe599',
    },
    label: {
        margin: 5,
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold'
    },
    input: {
        backgroundColor: 'white',
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
        height: 40,
        padding: 5,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        fontSize: 18
    },
    textarea: {
        backgroundColor: 'white',
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
        height: 120,
        padding: 5,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        fontSize: 18
    },
    button: {
        backgroundColor: '#980000',
        padding: 10,
        marginTop: 20,
        marginLeft: 100,
        marginRight: 100,
        height: 40,
        borderRadius: 20,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize:17,
    },
    checkbox: {
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
    }
})