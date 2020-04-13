import axios from 'axios';
import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Text, TouchableOpacity, View, StyleSheet, Image, KeyboardAvoidingView, ScrollView } from 'react-native';
import { Header, Icon } from 'react-native-elements';
import { HOST } from 'react-native-dotenv';
import AnimatedInput from 'react-native-animated-input-label';

class Login extends Component {
  state = {
    email: '',
    password: ''
  }

  handleEmail = text => this.setState({ email: text })
  handlePassword = text => this.setState({ password: text })

  login = (email, pass) => {
    axios.post(`${HOST}/api/Customers/login`, {
        email: email,
        password: pass
    })
    .then(res => {
      axios.get(`${HOST}/api/Customers/${res.data.userId}`)
      .then(response => {
        this.props.fromLoginModal === true ? this.goToDisplayReview(res.data.id, res.data.userId, response.data.name) : this.goToMap(res.data.id, res.data.userId, response.data.name)}) 
      .catch(err => console.log(err))
    })
    .catch(err => alert('Login attempt failed. Wrong username or password.'));
  }

  loginOwner = (email, pass) => {
    axios.post(`${HOST}/api/Owners/login`, {
        email: email,
        password: pass
    })
    .then(res => {
        axios.get(`${HOST}/api/Owners/${res.data.userId}/businesses`)
        .then(response => this.goToOwnerMap(res.data.id, res.data.userId, response.data.map(business => business.id)))
        .catch(err => alert('You have no businesses associated with your account'));
    })
    .catch(err => alert('Login attempt failed. Wrong username or password.'));
  }

  goToOwnerMap = (token, userId, businessIds) => Actions.ownerMap({token: token, userId: userId, businessIds: businessIds});
  goToMap = (token, userId, username) => Actions.map({token: token, userId: userId, username: username});
  goToRegister = () => Actions.register({ businessId: this.props.businessId, businessName: this.props.businessName, reviews: this.props.reviews, fromLoginModal: this.props.fromLoginModal });
  goToOwnerRegister = () => Actions.ownerRegister();
  goToDisplayReview = (token, userId, username) => {
    axios.get(`${HOST}/api/Reviews/getreview?id=${this.props.businessId}`)
      .then(response => {
        Actions.displayReview({token: token, reviews: response.data, businessName: this.state.businessName, businessId: this.props.businessId, username: username, userId: userId})
      });
  }
  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <View>
          <Header
              containerStyle={{
                  backgroundColor: '#ffe599',
                  justifyContent: 'space-around',
                  borderBottomWidth: 0, 
              }}
              rightComponent={<Icon
                name='close'
                color= '#980000'
                onPress={() => this.props.fromLoginModal === true ? this.goToDisplayReview() : this.goToMap()}
              />}
          />
        </View>
        <Image style={styles.logo} source={require('../assets/logo.png')}/>
        <ScrollView scrollEnabled={true}>
          <AnimatedInput 
            inputStyle={styles.input}
            labelStyle={styles.labelInput}
            underlineColorAndroid='transparent'
            autoCapitalize='none'
            keyboardType={'email-address'}
            onChangeText={this.handleEmail}>
            Email</AnimatedInput>
          <AnimatedInput 
            inputStyle={styles.input}
            labelStyle={styles.labelInput}
            underlineColorAndroid='transparent'
            autoCapitalize='none'
            keyboardType={'email-address'}
            secureTextEntry={true}
            onChangeText={this.handlePassword}>
            Password</AnimatedInput>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => this.login(this.state.email, this.state.password)}>
            <Text style={styles.loginButtonText}> Login </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.ownerLoginButton}
            onPress={() => this.loginOwner(this.state.email, this.state.password)}>
            <Text style={styles.loginButtonText}> Login As Owner </Text>
          </TouchableOpacity>
          <Text style={styles.registerButton} onPress={this.goToRegister}>Click Here To Register!</Text>
          <Text style={styles.registerButton} onPress = {this.goToOwnerRegister}>Click Here To Register As Owner</Text>
        </ScrollView>
      </KeyboardAvoidingView>
    )
  }
}
export default Login

const styles = StyleSheet.create({
  container: {
    paddingTop: 23,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#ffe599',
  },
  labelInput: {
    color: 'black',
    fontSize: 14,
    marginLeft: 30,
    zIndex: 1,
    justifyContent: 'space-evenly', 
  },
  input: {
    padding: 2,
    borderColor: 'black',
    backgroundColor: 'white',
    borderWidth: 1,
    marginLeft: 30,
    marginRight: 30,
    fontSize: 17,
  },
  loginButton: {
    backgroundColor: '#980000',
    padding: 10,
    marginTop: 25,
    marginLeft: 100,
    marginRight: 100,
    marginBottom: 15,
    height: 40,
    borderRadius: 20,
  },
  ownerLoginButton: {
    backgroundColor: '#980000',
    padding: 10,
    marginLeft: 100,
    marginRight: 100,
    marginBottom: 15,
    height: 40,
    borderRadius: 20,
  },
  loginButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize:17,
  },
  registerButton: {
    color: 'blue',
    textAlign: 'center',
    fontSize:18,
  },
  logo: {
    width: 340,
    height: 325,
    marginBottom: 30,
    marginTop: 35,
    marginLeft: 17,
    resizeMode: 'contain',
    justifyContent: 'center',
  }
})
