import React, { Component } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { Header, Icon, Rating } from 'react-native-elements';
import { HOST } from 'react-native-dotenv';
import LoginRequiredModal from './LoginRequiredModal';
import moment from 'moment';
import axios from 'axios';

export default class ReviewItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flagged: this.props.review.isHidden,
      showLoginRequiredModal: false
    }
  }

  daysAgo(postDate, today) {
    let days = moment(postDate).from(today)
    return `Posted ${days}`
  }

  handleFlagClick = () => {
    if (this.props.token && this.props.review.isHidden === true) {
      this.setState({ flagged: !this.state.flagged })
      alert('This review has been unflagged')
    } else if (this.props.token && this.props.review.isHidden === false) {
      this.setState({ flagged: !this.state.flagged })
      alert('This review has been flagged')
    } else {
      this.showLoginRequiredModal()
    }
    if (this.props.token) {
      axios.put(`${HOST}/api/Reviews/${this.props.review.id}`, {
        ...this.props.review,
        isHidden: !this.state.flagged
      }) 
    }
      
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
                  {this.daysAgo(this.props.date, moment().format())}
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
              color={this.props.token && this.state.flagged ? 'gray' : 'tan'}
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
    marginTop: -25,
    marginBottom: -5
  }
})