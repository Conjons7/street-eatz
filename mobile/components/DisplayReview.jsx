import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image} from 'react-native';
import { Header, Icon, Rating, Button, AirbnbRating } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import ReviewModal from './ReviewModal';
import LoginRequiredModal from './LoginRequiredModal';
import { HOST } from 'react-native-dotenv';
import axios from 'axios';

export default class DisplayReview extends Component{
  constructor(props) {
      super(props);
      this.state={
        sideMenuView: false,
        showLoginRequiredModal: false,
        flagged: false   
      }
  }

  componentDidMount() {
    let averageReview = this.props.reviews.businessReviews.pop().averageReviewRating;
    this.setState({averageBusinessReviews: averageReview});
    if (this.props.submit === true) {
      alert('Your review has been posted')
    }
  }

  daysAgo(postDate, today) {
    let msPerDay = 24 * 60 * 60 * 1000;
    let days = Math.round(Math.abs((today.getTime() - postDate.getTime()) / (msPerDay)));
    if (days === 0) {
      return 'Posted today'
    } else if (days === 1) {
      return 'Posted 1 day ago'
    } else if (days > 1 && days < 31) {
      return `Posted ${days} days ago`
    } else if (days > 30 && days < 365) {
      days /= 30
      return days > 1 ? `Posted ${Math.round(days)} months ago` : `Posted ${Math.round(days)} month ago`
    } else {
      return `Posted over a year ago`
    }
  }

  displayReviews() {
    const reviews = this.props.reviews.businessReviews;

    return reviews.map((review, i) => {
      let date = new Date(review.timeStamp);
      let today = new Date();

      return (
        <View key={review.id} style={styles.reviewContainer}>
          <Header
            containerStyle={styles.reviewHeader}
            leftComponent={
              <View>
                <Image style={styles.profilePicture} source={require('../assets/blank-prof-pic.png')}/>
                <Text
                  style={styles.profileUsername}>
                   {review.username}
                </Text>
                <Text
                  style={styles.reviewPostDate}>
                  {this.daysAgo(date, today)}
                </Text>
                
              </View>
            }
            rightComponent={
              <View
                style={styles.ratingPosition}>
                <Rating
                  imageSize={25}
                  readonly
                  startingValue={review.rating}
                  fractions={1}
                  tintColor='#ffe599'
                />
              </View>
            }
          />
          <View>
            <Text style={styles.reviewText}> {review.text} </Text>
            <Icon
              name='flag'
              containerStyle={styles.flagIconPosition}
              size={25}
              color='tan'
              underlayColor='#ffe599'
              onPress={() => {
                this.setState({ flagged: true })
                alert('This review has been flagged')
              }}
            />
          </View>
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
          containerStyle={styles.header}
          leftComponent={ <Icon
            name='menu'
            onPress={() => this.toggleSideMenu(this.state.sideMenuView)}
          />}
          centerComponent={{ style: styles.reviewHeaderText, text: 'Reviews' }}
          rightComponent={<Icon
            name='home'
            onPress={() => this.goToMap(this.props.token)}/>}
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
        {/* {
          businessReviews.length > 0 ?
          <View style={styles.reviewHeader}>
            {
              this.state.averageBusinessReviews ? 
                <Rating
                  imageSize={20}
                  readonly
                  startingValue={this.state.averageBusinessReviews}
                  fractions={1}
                  tintColor='#980000'
                /> :
                <Text> No ratings available for this food truck.</Text>
            }
          </View>
          :
          <Text>No Reviews Available For This Truck</Text>
        } */}
        <ScrollView scrollEnabled={true}>
          <View style={styles.reviewScroll} >{this.displayReviews()}</View>
        </ScrollView>
        <View>
            <LoginRequiredModal
            isVisible = {this.state.showLoginRequiredModal}
            loginRequiredModal = {() => this.hideLoginRequiredModal()}
            businessId = { this.props.businessId }
            businessName = { this.props.businessName }
            reviews = { this.props.reviews }
            />
            <ReviewModal
            token = {this.props.token}
            loginRequiredModal = {() => this.showLoginRequiredModal()}
            isVisible = { this.state.showLoginRequiredModal }
            businessId = { this.props.businessId }
            businessName = { this.props.businessName }
            username = { this.props.username }
            userId = { this.props.userId }
            reviews = { this.props.reviews }
        />
        </View>
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
    header: {
      backgroundColor: '#980000',
      justifyContent: 'space-around'
    },
    menu: {
      backgroundColor: '#980000',
      alignSelf: 'stretch'
    },
    reviewContainer: {
      flex: 1,
      borderBottomColor: 'white',
      borderBottomWidth: .5,
      marginTop: 5
    }, 
    reviewHeader: {
      backgroundColor: '#ffe599',
      paddingBottom: 20,
      marginBottom: 10,
      paddingTop: 10,
      borderBottomColor: '#ffe599'
    },
    reviewHeaderText: {
      fontSize: 25,
      fontWeight: 'bold',
      color: 'white'
    },
    reviewText: {
      position: 'relative',
      top: -30,
      margin: 15,
      marginTop: 0,
      marginBottom: -5
    },
    profilePicture: {
      width: 34,
      height: 34,
      justifyContent: 'center',
      borderRadius: 30,
      position: 'relative',
      top: 3
    },
    profileUsername: {
      fontSize: 14,
      fontWeight: 'bold',
      position: 'relative',
      right: -38,
      top: -30,
      marginRight: -40
    },
    reviewPostDate: {
      fontSize: 10.5,
      marginRight: -40,
      position: 'relative',
      right: -38,
      top: -30
    },
    ratingPosition: {
      position: 'absolute',
      right: 15,
      top: -28
    },
    flagIconPosition: {
      position: 'absolute',
      right: 15,
      bottom: 8
    },
    reviewScroll: {
      paddingTop: 0,
      flex: 1
    }
})