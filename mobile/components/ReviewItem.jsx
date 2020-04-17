import React, { Component } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { Header, Icon, Rating } from 'react-native-elements';
import LoginRequiredModal from './LoginRequiredModal';

export default class ReviewItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flagged: false,
      showLoginRequiredModal: false
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

  handleFlagClick = () => {
    this.props.token ? this.setState({ flagged: !this.state.flagged }) : this.showLoginRequiredModal()
    this.state.flagged ? alert('This review has been unflagged') : alert('This review has been flagged')
  }

  hideLoginRequiredModal = () => this.setState({ showLoginRequiredModal: false})
  showLoginRequiredModal = () => this.setState({ showLoginRequiredModal: true})

  render() {
    return (
      <View key={this.props.review.id} style={styles.reviewContainer}>
          <Header
            containerStyle={styles.reviewHeader}
            leftComponent={
              <View>
                <Image style={styles.profilePicture} source={require('../assets/blank-prof-pic.png')}/>
                <Text
                  style={styles.profileUsername}>
                   {this.props.review.username}
                </Text>
                <Text
                  style={styles.reviewPostDate}>
                  {this.daysAgo(this.props.date, this.props.today)}
                </Text>
              </View>
            }
            rightComponent={
              <View
                style={styles.ratingPosition}>
                <Rating
                  imageSize={25}
                  readonly
                  startingValue={this.props.review.rating}
                  fractions={1}
                  tintColor='#ffe599'
                />
              </View>
            }
          />
          <View>
            <LoginRequiredModal
              isVisible = {this.state.showLoginRequiredModal}
              loginRequiredModal = {() => this.hideLoginRequiredModal()}
              businessId = { this.props.businessId }
              businessName = { this.props.businessName }
              reviews = { this.props.review }
            />
            <Text style={styles.reviewText}> {this.props.review.text} </Text>
            <Icon
              name='flag'
              containerStyle={styles.flagIconPosition}
              size={25}
              color={this.state.flagged ? 'gray' : 'tan'}
              underlayColor='#ffe599'
              onPress={() => {this.handleFlagClick()}}
            />
          </View>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  reviewHeader: {
    backgroundColor: '#ffe599',
    paddingBottom: 20,
    marginBottom: 10,
    paddingTop: 10,
    borderBottomColor: '#ffe599'
  },
  profileUsername: {
    fontSize: 14,
    fontWeight: 'bold',
    position: 'relative',
    right: -38,
    top: -30,
    marginRight: -40
  },
  profilePicture: {
    width: 34,
    height: 34,
    justifyContent: 'center',
    borderRadius: 30,
    position: 'relative',
    top: 3
  },
  reviewPostDate: {
    fontSize: 10.5,
    marginRight: -40,
    position: 'relative',
    right: -38,
    top: -30
  },
  flagIconPosition: {
    position: 'absolute',
    right: 15,
    bottom: 8
  },
  ratingPosition: {
    position: 'absolute',
    right: 15,
    top: -28
  },
  reviewContainer: {
    flex: 1,
    borderBottomColor: 'white',
    borderBottomWidth: .5,
    marginTop: 5
  },
  reviewText: {
    position: 'relative',
    top: -30,
    margin: 15,
    marginTop: 0,
    marginBottom: -5
  }
})