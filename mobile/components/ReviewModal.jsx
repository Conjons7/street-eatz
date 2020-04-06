import React, { Component } from 'react';
import { View, Button, StyleSheet, Modal, TextInput, KeyboardAvoidingView, ScrollView} from 'react-native';
import { Header, Icon, Rating, AirbnbRating } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';


export default class ReviewModal extends Component{
    constructor(props) {
        super(props);
        this.state={
            modalVisible: false,
            reviewText: '',
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
                    <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                    <ScrollView scrollEnabled={true}>
                  <Modal style={styles.modal}
                         visible={this.state.modalVisible}
                         onRequestClose={() => this.closeModal()}>
                        
                        <View 
                            style={{ 
                            flex: 1, 
                            flexDirection: 'column', 
                            justifyContent: 'center', 
                            alignItems: 'center'}}
                        >
                        <AirbnbRating
                            onFinishRating={this.ratingCompleted}
                        />

                        <TextInput
                            style={styles.TextInputStyleClass}
                            underlineColorAndroid="transparent"
                            placeholder={" Come on... Tell us about your experience!"}
                            placeholderTextColor={"#9E9E9E"}
                            numberOfLines={10}
                            multiline={true}
                        />

                        <Button 
                            style={styles.ButtonStyle} 
                            title='Submit Your Thoughts!' 
                            color="blue"

                        />

                    </View>
                    <Button onPress={() => this.closeModal(this.props.token)} title='Back To Menu' color="blue"/>
                  </Modal>
                  </ScrollView>
                    </KeyboardAvoidingView>
                  <Button 
                    onPress ={ this.props.token ? ()=>this.openModal(this.props.token) : () => this.props.loginRequiredModal()} 
                    title='Leave A Rating/Review!'/>
                     
                </View>
       

            )
        }   
    }
    const styles = StyleSheet.create({
        container: {
          justifyContent: 'center',
          paddingTop: 0,
          paddingBottom: 0,
          backgroundColor: '#fff',
        },
        TextInputStyleClass:{
            // textAlign: 'center',
            marginTop: 20,
            marginLeft: 0,
            width: 350,
            height: 50,
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
            }
    })