import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView} from 'react-native';
import { Header, Icon, Rating, Button, AirbnbRating } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import ReviewModal from './ReviewModal';
import LoginRequiredModal from './LoginRequiredModal'

export default class DisplayReview extends Component{
  constructor(props) {
      super(props);
      this.state={
        sideMenuView: false,
        showLoginRequiredModal: false   
      }
  }

  componentDidMount() {
    let averageReview = this.props.reviews.businessReviews.pop().averageReviewRating;
    this.setState({averageBusinessReviews: averageReview});
  }

  displayReviews() {
    const reviews = this.props.reviews.businessReviews;

    return reviews.map((review, i) => {
      key: {review.id};
      let date = new Date(review.timeStamp)
      return (
        <View style={{ flex: 1 }}>
          <Header
            containerStyle={{
              backgroundColor: '#980000',
            }}
            leftComponent={
              <Text>{date.toDateString()}</Text>
            }
            centerComponent={
              <Rating
                imageSize={20}
                readonly
                startingValue={review.rating}
                fractions={1}
                style={styles.rating}
              />
            }
            rightComponent={
              <Icon
              name='flag'
              color='tan'
            />}
          />
          <Text>{`${review.username} said : \n ${review.text}`}</Text>
        </View>
      )
    })
  }

  logOut() {
    axios.post(`${HOST}/api/Customers/logout?access_token=${this.props.token}`)
      .then(res => this.goToLogin())
  }
  goToLogin = () => Actions.login();

  goToMap = (token) => Actions.map({token: token});
  goToSettings = (token) => Actions.customerSettings({ token: token });

  showLoginRequiredModal = () => this.setState({ showLoginRequiredModal: true});
  hideLoginRequiredModal = () => this.setState({ showLoginRequiredModal: false});
  toggleSideMenu = sideMenuView => this.setState({ sideMenuView: !sideMenuView });

  ratingCompleted(rating) {
      console.log("Rating is: " + rating)
    }

  render() {
    let loginButton = <Button title="Login" onPress={() => this.goToLogin()} buttonStyle={{ backgroundColor: '#980000', borderBottomWidth: .45, borderBottomColor: 'white' }} titleStyle={{ color: "white", fontSize: 22, fontWeight: 'bold'}}/>;
    let logoutButton = <Button title="Logout" onPress={() => this.logOut()} buttonStyle={{ backgroundColor: '#980000', borderBottomWidth: .45, borderBottomColor: 'white' }} titleStyle={{ color: "white", fontSize: 22, fontWeight: 'bold'}}/>;
    const { businessReviews } = this.props.reviews;
    return (
      <View style={styles.container}>
        <Header
        containerStyle={{
          backgroundColor: '#980000',
          // justifyContent: 'space-around',
        }}
        leftComponent={ <Icon
          name='menu'
          onPress={() => this.toggleSideMenu(this.state.sideMenuView)}
        />}
        centerComponent={{ style: { color: '#fff', fontSize: 25, fontWeight: 'bold' }, text: 'Rate & Review:' }}
        rightComponent={<Icon
          name='home'
          onPress={() => this.goToMap(this.props.token)}
        />}
        />
        {this.state.sideMenuView ?
          <View style={styles.menu}>
            <Button title="Settings" onPress={() => this.goToSettings(this.props.token)} buttonStyle={{ backgroundColor: '#980000', borderBottomWidth: .45, borderBottomColor: 'white' }} titleStyle={{ color: "white", fontSize: 22, fontWeight: 'bold'}} />
            {
              this.props.token ? logoutButton : loginButton
            }
          </View>
          : <View></View>
        }
        <View style={styles.headerContainer}>
            <ReviewModal
            token = {this.props.token}
            loginRequiredModal = {() => this.showLoginRequiredModal()}
            isVisible = {this.state.showLoginRequiredModal}
            />
            <LoginRequiredModal
            isVisible = {this.state.showLoginRequiredModal}
            loginRequiredModal = {() => this.hideLoginRequiredModal()}
            />
            <Text>{this.props.businessName}</Text>
            {
              this.state.averageBusinessReviews ? 
                <Rating
                imageSize={20}
                readonly
                startingValue={this.state.averageBusinessReviews}
                fractions={1}
                style={styles.rating}
                /> :
                <Text> No ratings available for this food truck.</Text>
            }
        </View>
        <ScrollView scrollEnabled={true}>
          { businessReviews.length > 0 ?
            <Text style={styles.reviewHeader}>Reviews</Text>
            :
            <Text>No Reviews Available For This Truck</Text>
          }
          <View style={{ paddingTop: 40, flex: 1 }} >{this.displayReviews()}</View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#ffe599',
      flex: 1,
      flexDirection: 'column',
    },
    TextInputStyleClass:{
        textAlign: 'center',
        marginTop: 0,
        marginLeft: 11,
        width: 0,
        height: 0,
        borderWidth: 2,
        borderColor: '#9E9E9E',
        borderRadius: 3 ,
        backgroundColor : "#FFFFFF",
        height: 150
        },
    ButtonStyle: {
        backgroundColor: "#fff",
        borderWidth: 3,
        paddingTop: 10,
        },
    menu: {
      backgroundColor: '#980000',
      alignSelf: 'stretch'
    },
    headerContainer: {
      flexDirection: 'column',
      flex: 0,
      height: 250,
      resizeMode: 'stretch',
      justifyContent: 'center',
      backgroundColor: '#980000',
      paddingBottom: 10,
      borderBottomColor: 'white',
      borderWidth: .45
    },
    reviewHeader: {
      fontSize: 30,
      fontWeight: 'bold',
      width: '100%',
      backgroundColor: '#980000',
      color: 'white',
      textAlign: 'center',
      marginBottom: -30
    },
    rating: {
      color: 'black'
    }
})