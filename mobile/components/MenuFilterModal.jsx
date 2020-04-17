import React, { Component } from 'react';
import { View, Modal } from 'react-native';

export default class MenuFilterModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false
    }
  }

  openModal() {
    this.setState({
      modalVisible: true
    })
  }

  closeModal() {
    this.setState({
      modalVisible: false
    })
  }

  return() {
    return (
      <View>
        <Modal></Modal>
      </View>
    )
  }
}