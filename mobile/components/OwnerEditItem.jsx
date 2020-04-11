import React from 'react';
import { StyleSheet, View } from "react-native";
import { Header, Icon, Button, ListItem } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { HOST } from 'react-native-dotenv';
import axios from 'axios';

export default class OwnerEditItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sideMenuView: false
    }
  }

  componentDidMount() {
      console.log('props: ', this.props)
    //   axios.get(`http://192.168.1.65:3000/api/Businesses/${this.props.businessIds[0]}`)
    //     .then(res => {
    //         menu = res.data.menu
    //         this.setState({ menu: res.data.menu })
    //     })
    //     .catch(err => alert('Something went wrong.'))
  }

  render() {
    return (
        <View style={styles.container}>
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
      )
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffe599',
    }
})