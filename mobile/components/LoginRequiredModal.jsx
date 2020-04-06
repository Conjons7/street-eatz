import React, { Component } from 'react';
import { View, StyleSheet, Text, Modal, TextInput, KeyboardAvoidingView, ScrollView} from 'react-native';
import { Header, Icon, Rating, AirbnbRating, Button } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';


export default class LoginRequiredModal extends Component{
    constructor(props) {
        super(props);
        this.state={
            
        }
    }

    openModal() {
        this.setState({
            modalVisible: true
        })}

    closeModal() {
        this.setState({
            modalVisible: false
        })}
    
    submitReview() {

    }

        render() {
            return (
                

                <View style={styles.container}>
                 <KeyboardAvoidingView  behavior="padding" enabled>
                  <ScrollView scrollEnabled={true}>
                   <Modal
                     raised
                     visible={this.props.isVisible}
                     animationType="slide"
                     transparent={true}
                     onRequestClose={() => this.closeModal()}>   
                      <View style={styles.container}>
                      <View style={styles.modalView}>
                       <Text style={styles.text}>
                        Sorry! You will need to be logged in to Street Eatz to use this feature. Would you like to Register/Login?
                       </Text>
                        <Button 
                         raised
                         title="outline button"
                         type="outline"
                         style={styles.ButtonStyle}
                         onPress={() => this.props.loginRequiredModal()} title='No Thanks! Take Me Back.' color="blue"
                         />
                      </View>
                      </View>
                   </Modal>
                  </ScrollView>
                 </KeyboardAvoidingView>         
                </View>
       

            )
        }   
    }
    const styles = StyleSheet.create({
        container: {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 10
        },
        text:{
            justifyContent: 'center',
            fontWeight: 'bold',
            fontSize: 18,
            color: 'white',
            textAlign: 'center',
            marginTop: 10,
            marginLeft: 0,
            marginBottom: 10,
            width: 275,
            height: 800,
            borderWidth: 3,
            borderColor: 'black',
            borderRadius: 2,
            backgroundColor : '#980000',
            textAlignVertical: 'auto',
            height: 125
            },
        ButtonStyle: {
            // backgroundColor: "white",
            width: 275,
            borderWidth: 0,
            marginTop: 0,
            paddingTop: 0,

            },
        ModalView: {
            margin: 20,
            backgroundColor: "black",
            borderRadius: 20,
            padding: 35,
            alignItems: "center",
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5
        }
    })