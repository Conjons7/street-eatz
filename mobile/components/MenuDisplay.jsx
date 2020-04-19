import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default class MenuDisplay extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <View style={{ flex: 1 }}>
          {this.props.menu[this.props.index - 1] !== undefined && this.props.category !== this.props.menu[this.props.index - 1].category ?
            <View style={{ flex: 1, alignItems: 'center' }}>
              <Text style={styles.menuLabel}>{this.props.category}</Text>
            </View>
            :
            <View></View>
          }
          <TouchableOpacity
            onPress={() => this.goToDescriptionMenu(this.props.image, this.props.description, this.props.price, this.props.item, this.props.token, this.props.businessId, this.props.category)}
            style={styles.containerFoodItem}
            key={this.props.key}>
            {this.props.image ?
              <View>
                <Image style={styles.photo}
                  source={{ uri: this.props.image }}
                />
              </View>
              :
              <View></View>
            }
            <View style={styles.containerItemInfo}>
              <Text style={styles.title}>{this.props.item}</Text>
              <Text style={styles.desc}>{this.props.description && this.props.description.length > 55 ? this.props.description.slice(0, 55) + '...' : this.props.description}</Text>
              <Text style={styles.price}>${this.props.price}</Text>
            </View>
          </TouchableOpacity>
        </View>
    )
  }
}

const styles = StyleSheet.create ({
  menuLabel: {
    fontSize: 30,
    fontWeight: 'bold',
    width: '100%',
    backgroundColor: '#980000',
    color: 'white',
    textAlign: 'center'
  },
  containerFoodItem: {
    flexWrap: 'wrap',
    paddingLeft: 10,
    paddingBottom: 10,
    paddingTop: 10,
    borderColor: 'darkgrey',
    borderBottomWidth: 1,
    height: 140,
    width: '100%',
    flex: 1
  },
  containerItemInfo: {
    marginLeft: 0,
    flexDirection: 'column',
    paddingLeft: 10,
    width: '75%',
  },
  photo: {
    width: 100,
    height: 100,
    marginRight: 0,
    marginLeft: 0,
    flex: 0,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 28,
    paddingBottom: 5,
  },
  desc: {
    fontSize: 18,
    flexDirection: 'row',
  },
  price: {
    fontWeight: 'bold',
    fontSize: 20,
    paddingTop: 5,
  }
})