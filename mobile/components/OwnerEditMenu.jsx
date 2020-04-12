import React from 'react';
import { StyleSheet, View } from "react-native";
import { Header, Icon, Button, ListItem } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { HOST } from 'react-native-dotenv';
import axios from 'axios';

export default class OwnerEditMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: [],
      sideMenuView: false,
      businessData: {}
    }
  }

  componentDidMount() {
      axios.get(`http://192.168.1.65:3000/api/Businesses/${this.props.businessIds[0]}`)
        .then(res => {
            console.log('RES.DATA: ', res.data)
            businessData = res.data
            menu = res.data.menu
            this.setState({ menu: res.data.menu, businessData: res.data })
        })
        .catch(err => alert('Something went wrong.'))
  }

  goToMap = () => Actions.map()
  toggleSideMenu = sideMenuView => this.setState({ sideMenuView: !sideMenuView })
  goToOwnerMap = (token, userId, businessIds) => Actions.ownerMap({ token: token, userId: userId, businessIds: businessIds })
  goToOwner = (token, userId, businessIds) => Actions.owner({ token: token, userId: userId, businessIds: businessIds })
  goToSettings = (token, userId, businessIds) => Actions.ownerSettings({ token: token, userId: userId, businessIds: businessIds })
  logOut = () => {
    axios.post(`http://192.168.1.65:3000/api/Owners/logout?access_token=${this.props.token}`)
        .then(res => this.goToMap())
        .catch(err => alert('Something went wrong.'))
  }

  render() {
      const menu = this.state.menu
      const menuWithNewItem = [...menu, {
        item: '',
        price: '',
        category: '',
        image: '',
        desc: '',
        popular: false
      }] 
      const displayMenu = menu.map((item, i) => (
        <ListItem
            key={i}
            onPress={() => Actions.ownerEditItem({ businessData: this.state.businessData, menu: menu, i: i, token: this.props.token, userId: this.props.userId, businessId: this.props.businessIds })}
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
            {this.state.sideMenuView ?
                <View style={styles.menu}>
                    <Button title="Broadcast" onPress={() => this.goToOwner(this.props.token, this.props.userId, this.props.businessIds)} buttonStyle={{ backgroundColor: '#980000', borderBottomWidth: .45, borderBottomColor: 'white'}} titleStyle={{ color: "white", fontSize: 22, fontWeight: 'bold'}} />
                    <Button title="Settings" onPress={() => this.goToSettings(this.props.token, this.props.userId, this.props.businessIds)} buttonStyle={{ backgroundColor: '#980000', borderBottomWidth: .45, borderBottomColor: 'white'}} titleStyle={{ color: "white", fontSize: 22, fontWeight: 'bold'}} />
                    <Button title="Logout" onPress={() => this.logOut()} buttonStyle={{ backgroundColor: '#980000', borderBottomWidth: .45, borderBottomColor: 'white'}} titleStyle={{ color: "white", fontSize: 22, fontWeight: 'bold'}} />
                </View>
            : <View></View>}
            <ListItem
                onPress={() => Actions.ownerAddItem({ businessData: this.state.businessData, menu: this.state.menu, token: this.props.token, userId: this.props.userId, businessId: this.props.businessIds })}
                leftIcon={<Icon raised name='add' type='material'/>}
                title="Add A New Menu Item"
                titleStyle={styles.listAddItem}
                bottomDivider
                chevron
            />
            {displayMenu ? 
                <View styles={styles.menu}>
                    {displayMenu}
                </View>
            : null}
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
    listAddItem: {
        justifyContent: 'center',
        color: 'gray',
        textAlign: 'center',
    }
});