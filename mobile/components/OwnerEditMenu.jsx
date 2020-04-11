import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Header, Icon, Button, ListItem } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { HOST } from 'react-native-dotenv';
import axios from 'axios';

export default class OwnerEditMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: []
    }
  }

  componentWillMount() {
      axios.get(`http://192.168.1.65:3000/api/Businesses/${this.props.businessIds[0]}`)
        .then(res => {
            menu = res.data.menu
            this.setState({ menu: res.data.menu })
        })
        .catch(err => alert('Something went wrong.'))
  }

  goToEditItem = (item) => { console.log(`menu item ${item} selected`) }

  render() {
      const menu = this.state.menu
      console.log('menu: ', menu)
      displayMenu = menu.map((item, i) => (
        <ListItem
            key={i}
            onPress={() => this.goToEditItem(menu[i]) }
            leftAvatar={{ source: { uri: item.image } }}
            title={item.item}
            subtitle={item.price}
            bottomDivider
            chevron
        />
      ))
      return (
        <View style={styles.container}>
            <Header
                containerStyle={{
                    backgroundColor: '#980000',
                    justifyContent: 'space-around',
                }}
                leftComponent={<Icon
                    name='menu'
                    onPress={() => this.toggleSideMenu(this.state.sideMenuView)}
                />}
                centerComponent={{ style: { color: '#fff', fontSize: 25, fontWeight: 'bold' }, text: "Edit Menu" }}
                rightComponent={<Icon
                    name='home'
                    onPress={() => this.goToOwnerMap(this.props.token, this.props.userId, this.props.businessIds)}
                />}
            />
            <View styles={styles.menu}>
                {displayMenu ? displayMenu : null}
            </View>
        </View>
      )
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffe599',
    },
    menu: {
        backgroundColor: '#980000',
        alignSelf: 'stretch',
    },
    editMenuButton: {
        backgroundColor: '#980000',
        width: 300,
        padding: 10,
        marginTop: 15,
        marginLeft: 100,
        marginRight: 100,
        marginBottom: 15,
        height: 40,
        borderRadius: 20,
    },
    editMenuButtonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize:17,
    }
});