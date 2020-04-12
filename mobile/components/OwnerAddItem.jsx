import React from 'react';
import { StyleSheet, View, Text, TextInput, KeyboardAvoidingView, ScrollView, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from "react-native";
import { Header, Icon, Button, ListItem, Input, CheckBox } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { HOST } from 'react-native-dotenv';
import axios from 'axios';

export default class OwnerAddItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sideMenuView: false,
      item: '',
      price: '',
      category: '',
      image: '',
      desc: '',
      popular: false
    }
  }

  submit = () => {
      const saveItem = {
        item: this.state.item,
        price: this.state.price,
        category: this.state.category,
        image: this.state.image,
        desc: this.state.desc,
        popular: this.state.popular
      }
      const menu = this.props.menu
      console.log('menu: ', menu)
    //   const updateMenu = menu.map((item, i) => {
    //       console.log('ITEM: ', item)
    //       console.log('I: ', i)
    //       console.log('this.props.i: ', this.props.i)
    //       console.log('saveItem: ', saveItem)
    //     //   i == this.props.i ? updateItem : item
    //       if(i == this.props.i) {
    //           return saveItem
    //       } else { return item }
    //   })
    //   console.log('updateMenu: ', updateMenu)
      console.log('saveItem: ', saveItem)
      const addToMenu = [...menu, saveItem]
      console.log('addToMenu: ', addToMenu)
    //   const dataToPost = this.state.existingItem ? updateMenu : addToMenu
    //   console.log('dataToPost: ', dataToPost)
      axios.put(`http://192.168.1.65:3000/api/Businesses/${this.props.businessId[0]}`, {
          ...this.props.businessData,
          menu: addToMenu
      })
        .then(res => console.log(res))
        .catch(err => console.log(err))
  }

  render() {
      console.log('ALL THIS:  ', this.state.item, this.state.desc)
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
                    centerComponent={{ style: { color: '#fff', fontSize: 25, fontWeight: 'bold' }, text: "Add Item" }}
                    rightComponent={<Icon
                        name='home'
                        //onPress={() => this.goToOwnerMap(this.props.token, this.props.userId, this.props.businessIds)}
                    />}
                />
            </View>
            <ScrollView scrollEnabled={true}>
                <Text style={styles.label}>Item Name</Text>
                <TextInput 
                    style={styles.input}
                    onChangeText={item => this.setState({ item: item })}
                    placeholder='Pommes Frites'/>
                <Text style={styles.label}>Price</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={price => this.setState({ price: price })}
                    placeholder='9.99'/>
                <Text style={styles.label}>Category</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={category => this.setState({ category: category })}
                    placeholder='Entree, Side Dish, Beverage, etc.'/>
                <Text style={styles.label}>Image</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={image => this.setState({ image: image })}
                    placeholder='https://link-to-your-image.com...'/>
                <Text style={styles.label}>Description</Text> 
                <TextInput
                    style={styles.textarea}
                    onChangeText={desc => this.setState({ desc: desc })}
                    placeholder="Here is your dish's chance to shine. Give all the details!" multiline={true}/>
                <CheckBox
                    containerStyle={styles.checkbox}
                    center
                    title='Mark As Popular Item'
                    checked={this.state.popular}
                    onPress={() => this.setState({popular: !this.state.popular})}/>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.login(this.state.email, this.state.password)}>
                    <Text style={styles.buttonText}> Cancel </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.submit()}>
                    <Text style={styles.buttonText}> Submit </Text>
                </TouchableOpacity>
            </ScrollView>
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