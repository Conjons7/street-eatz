import React from 'react';
import { StyleSheet, View, ScrollView } from "react-native";
import { Header, Icon, Button, ListItem } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { HOST } from 'react-native-dotenv';
import axios from 'axios';

export default class OwnerManageReviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sideMenuView: false,
      reviews: []
    }
  }

  componentDidMount() {
    console.log(this.props.businessIds[0])
    axios.get(`http://192.168.1.65:3000/api/Businesses/${this.props.businessIds[0]}/reviews?access_token=${this.props.token}}`)
        .then(res => {
            console.log('RES: ', res.data)
            this.setState({ reviews: res.data })
        })
        // .catch(err => alert('Something went wrong.'))
        .catch(err => console.log(err))
  }

  logOut = () => {
    axios.post(`http://192.168.1.65:3000/api/Owners/logout?access_token=${this.props.token}`)
        .then(res => Actions.map())
        .catch(err => alert('Something went wrong.'))
  }

  render() { 
    const reviews = this.state.reviews
    const displayReviews = reviews.map((review, i) => {
        const date = review.timeStamp.slice(0, 10)
        const backgroundColor = review.rating < 3 ? 'red'
                                : review.rating == 3 ? 'yellow'
                                : 'green'
        return (
            <ListItem
                key={i}
                // onPress={() => Actions.ownerEditItem({ businessData: this.state.businessData, menu: menu, i: i, token: this.props.token, userId: this.props.userId, businessIds: this.props.businessIds })}
                title={review.text}
                subtitle={`${review.username} on ${date}`}
                subtitleStyle={{ color: 'gray', fontStyle: 'italic', fontWeight: 'bold', marginTop: 6 }}
                badge={{ value: review.rating, textStyle: { color: 'white', fontSize: 18 }, badgeStyle: { backgroundColor: backgroundColor, width: 30, height: 30, borderRadius: 3 }, containerStyle: { marginTop: 0 } }}
                bottomDivider
                chevron
            />
        )
    })
    return (
    <View style={styles.container}>
        <Header
            containerStyle={{
                backgroundColor: '#980000',
                justifyContent: 'space-around',
            }}
            leftComponent={<Icon
                name='menu'
                onPress={() => this.setState({ sideMenuView: !this.state.sideMenuView })}
            />}
            centerComponent={{ style: { color: '#fff', fontSize: 25, fontWeight: 'bold' }, text: "Manage Reviews" }}
            rightComponent={<Icon
                name='home'
                onPress={() => Actions.ownerMap({ token: this.props.token, userId: this.props.userId, businessIds: this.props.businessIds })}
            />}
        />
        {this.state.sideMenuView ?
            <View style={styles.menu}>
                <Button title="Broadcast" onPress={() => Actions.owner({ token: this.props.token, userId: this.props.userId, businessIds: this.props.businessIds })} buttonStyle={{ backgroundColor: '#980000', borderBottomWidth: .45, borderBottomColor: 'white'}} titleStyle={{ color: "white", fontSize: 22, fontWeight: 'bold'}} />
                <Button title="Settings" onPress={() => Actions.ownerSettings({ token: this.props.token, userId: this.props.userId, businessIds: this.props.businessIds })} buttonStyle={{ backgroundColor: '#980000', borderBottomWidth: .45, borderBottomColor: 'white'}} titleStyle={{ color: "white", fontSize: 22, fontWeight: 'bold'}} />
                <Button title="Logout" onPress={() => this.logOut()} buttonStyle={{ backgroundColor: '#980000', borderBottomWidth: .45, borderBottomColor: 'white'}} titleStyle={{ color: "white", fontSize: 22, fontWeight: 'bold'}} />
            </View>
        : <View></View>}
        <ScrollView scrollEnabled={true}>
            {displayReviews ? 
                <View styles={styles.menu}>
                    {displayReviews}
                </View>
            : null}
        </ScrollView>
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