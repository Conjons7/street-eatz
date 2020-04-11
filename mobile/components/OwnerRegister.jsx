import axios from 'axios';
import React, { Component } from 'react';
import { Text, TouchableOpacity, StyleSheet, Image, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { HOST } from 'react-native-dotenv';
import AnimatedInput from 'react-native-animated-input-label';

class OwnerRegister extends Component {
    state = {
        name: '',
        businessName: '',
        phoneNumber: '',
        email: '',
        password: '',
        confirmedPassword: '',
        value: ''
    }

    handleName = text => this.setState({ name: text });
    handleBusinessName = text => this.setState({ businessName: text })
    handleNumber = text => this.setState({ phoneNumber: text });
    handleEmail = text => this.setState({ email: text });
    handlePassword = text => this.setState({ password: text });
    handleConfirmedPassword = text => this.setState({ confirmedPassword: text });
    handleTextChange = newText => this.setState({ value: newText });

    registerOwner = (name, businessName, phoneNumber, email, password) => {
        if(this.state.password != this.state.confirmedPassword) {
            alert('Your passwords do not match');
            return;
        } else {
        axios.post(`http://192.168.1.65:3000/api/Owners`, {
            name: name,
            business: [businessName],  
            number: phoneNumber,
            email: email,
            password: password
        })
        .then((response) =>
            axios.post(`http://192.168.1.65:3000/api/Owners/login`, {
                email: email,
                password: password
            })
            // .then(res => this.goToMap(res.data.id))
            .then(res => {
                axios.get(`http://192.168.1.65:3000/api/Owners/${res.data.userId}/businesses`)
                .then(response => this.goToOwnerMap(res.data.id, res.data.userId, response.data.map(business => business.id)))
                .catch(err => alert('You have no businesses associated with your account'));
            })
            .catch(errLogin => alert('Please enter a valid username and password.'))
        )
        .catch(errCreate => alert('Oops. Something went wrong.'));
        }
    }

    goToMap = token => Actions.map({token : token});
    goToLogin = () => Actions.login();
    goToOwnerMap = (token, userId, businessIds) => Actions.ownerMap({token: token, userId: userId, businessIds: businessIds});

    render() {    
        return (
            <KeyboardAvoidingView style={styles.container}>
                <Image style={styles.logo} source={require('../assets/logo.png')} />
                <ScrollView scrollEnabled={true}>
                    <AnimatedInput 
                        inputStyle={styles.input}
                        labelStyle={styles.labelInput}
                        underlineColorAndroid='transparent'
                        autoCapitalize='none'
                        onChangeText={this.handleName}>
                        Name
                        </AnimatedInput>
                    <AnimatedInput 
                        inputStyle={styles.input}
                        labelStyle={styles.labelInput}
                        underlineColorAndroid='transparent'
                        autoCapitalize='none'
                        onChangeText={this.handleBusinessName}>
                        Business Name
                        </AnimatedInput>    
                    <AnimatedInput
                        inputStyle={styles.input}
                        labelStyle={styles.labelInput}
                        underlineColorAndroid='transparent'
                        autoCapitalize='none'
                        keyboardType={'numeric'}
                        onChangeText={this.handleNumber}>
                        Phone Number
                        </AnimatedInput>
                    <AnimatedInput 
                        inputStyle={styles.input}
                        labelStyle={styles.labelInput}
                        underlineColorAndroid='transparent'
                        autoCapitalize='none'
                        keyboardType={'email-address'}
                        onChangeText={this.handleEmail}>Email
                    </AnimatedInput>
                    <AnimatedInput 
                        inputStyle={styles.input}
                        labelStyle={styles.labelInput}
                        underlineColorAndroid='transparent'
                        autoCapitalize='none'
                        secureTextEntry={true}
                        onChangeText={this.handlePassword}>Password
                    </AnimatedInput>
                    <AnimatedInput 
                        inputStyle={styles.input}
                        labelStyle={styles.labelInput}
                        underlineColorAndroid='transparent'
                        autoCapitalize='none'
                        secureTextEntry={true}
                        onChangeText={this.handleConfirmedPassword}>
                        Confirm Password
                    </AnimatedInput>
                    <TouchableOpacity
                        style={styles.loginButton}
                        onPress={() => this.registerOwner(this.state.name, this.state.businessName, this.state.phoneNumber, this.state.email, this.state.password)}>
                        <Text style={styles.registerButtonText}>Create Account</Text>
                    </TouchableOpacity>
                    <Text style={styles.registerButton} onPress={this.goToLogin} >Return to login page</Text>
                </ScrollView>
            </KeyboardAvoidingView>
        )
    }
}
export default OwnerRegister;

const styles = StyleSheet.create({
    container: {
        paddingTop: 23,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: '#ffe599'
    },
    labelInput: {
        color: 'black',
        fontSize: 14,
        marginLeft: 30,
        zIndex: 1,
        justifyContent: 'space-evenly',
      },
    input: {
        margin: 0,
        padding: 2,
        borderColor: 'black',
        backgroundColor: 'white',
        borderWidth: 1,
        marginLeft: 30,
        marginRight: 30,
        borderRadius: 0,
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
    registerButtonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    registerButton: {
        color: 'blue',
        textAlign: 'center'
    },
    logo: {
        width: 375,
        height: 350,
        marginTop: 35,
        marginLeft: 17,
        resizeMode: 'contain',
        justifyContent: 'center',
    }
});
