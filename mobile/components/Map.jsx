import React from 'react';
import { StyleSheet, Dimensions, View, Text, YellowBox, Image } from "react-native";
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import io from 'socket.io-client';
import { Actions } from 'react-native-router-flux';
import { HOST } from 'react-native-dotenv';
import { Header, Icon, Button } from 'react-native-elements';
import axios from 'axios';
import FilterModal from './FilterModal';

export default class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            location: null,
            sideMenuView: false,
            distanceFilter: '',
            priceFilter: '',
            foodStyleFilter: ''
        };
        this.mounted = false;
        
        YellowBox.ignoreWarnings([
            'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
        ])

        this.socket = io.connect(`http://192.168.1.65:3000`, { transports: ['websocket'] });
    }

    componentDidMount() {
        this.mounted = true;

        navigator.geolocation.getCurrentPosition(
            position => {
                if(this.mounted){
                this.setState({
                    location: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    }
                })};
            },
            error => console.log(error),
            { enableHighAccuracy: true, timeout: 20000, distanceFilter: 10 }
        );

        this.socket.on('mapPositions', locations => {
            if(this.mounted){
            this.setState({ foodTruck: locations });
            }
        });
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    logOut() {
        axios.post(`http://192.168.1.65:3000/api/Customers/logout?access_token=${this.props.token}`)
        .then(res => {
          this.socket.emit('disconnectUser');
          this.goToMap();
        })
      }
    
    goToLogin = () => Actions.login();
    goToSettings = token => Actions.customerSettings({token: token});
    toggleSideMenu = sideMenuView => this.setState({ sideMenuView: !sideMenuView });
    goToMenu = (token, businessId) => Actions.menu({businessId: businessId, token: token});
    goToMap = () => Actions.map();
    distance(lat1, lon1, lat2, lon2, unit) {
        if ((lat1 == lat2) && (lon1 == lon2)) {
            return 0;
        }
        else {
            var radlat1 = Math.PI * lat1/180;
            var radlat2 = Math.PI * lat2/180;
            var theta = lon1-lon2;
            var radtheta = Math.PI * theta/180;
            var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
            if (dist > 1) {
                dist = 1;
            }
            dist = Math.acos(dist);
            dist = dist * 180/Math.PI;
            dist = dist * 60 * 1.1515;
            if (unit=="K") { dist = dist * 1.609344 }
            if (unit=="N") { dist = dist * 0.8684 }
            return dist;
        }
    }

    updateDistanceFilter = (filter) => this.setState({distanceFilter: filter});
    updatePriceFilter = filter => this.setState({priceFilter: filter});
    updateFoodStyleFilter = filter => this.setState({foodStyleFilter: filter})
    
    filterTrucks = (userLat, userLong, foodTrucks, distanceFilter, priceFilter, foodStyleFilter) => {
        let distanceFilteredTrucks = [];
        let priceFilteredTrucks = [];
        let foodStyleFilteredTrucks = [];
        
        if (distanceFilter != '') {
            distanceFilteredTrucks = foodTrucks.filter(truck => this.distance(userLat, userLong, truck.latitude, truck.longitude) < distanceFilter);
        } else {
            distanceFilteredTrucks = foodTrucks.filter(truck => this.distance(userLat, userLong, truck.latitude, truck.longitude) < 20);
        };

        if (priceFilter === '$') {
            priceFilteredTrucks = distanceFilteredTrucks.filter(truck => truck.priceRange == priceFilter);
        } else if (priceFilter === '$$') {
            priceFilteredTrucks = distanceFilteredTrucks.filter(truck => truck.priceRange === '$$' || truck.priceRange === '$');
        } else {
            priceFilteredTrucks = distanceFilteredTrucks
        };

        if (foodStyleFilter != '') {
            return foodStyleFilteredTrucks = priceFilteredTrucks.filter(truck => truck.foodStyle == foodStyleFilter)
        } else {
            return foodStyleFilteredTrucks = priceFilteredTrucks
        }
    }
        
    render() {
        let count = 0;
        let loginButton = <Button title="Login" onPress={() => this.goToLogin()} buttonStyle={{ backgroundColor: '#980000', borderBottomWidth: .45, borderBottomColor: 'white' }} titleStyle={{ color: "white", fontSize: 22, fontWeight: 'bold'}} />;
        let logoutButton = <Button title="Logout" onPress={() => this.logOut()} buttonStyle={{ backgroundColor: '#980000', borderBottomWidth: .45, borderBottomColor: 'white' }} titleStyle={{ color: "white", fontSize: 22, fontWeight: 'bold'}} />;
        return (
            <View style={styles.container}>
                <Header
                    containerStyle={{
                        backgroundColor: '#980000',
                        justifyContent: 'space-around',
                    }}
                    leftComponent={<Icon
                        name='menu'
                        onPress={() => this.toggleSideMenu(this.state.sideMenuView)}
                    />}
                    rightComponent={{ icon: 'home', color: '#fff' }}
                    />
                    {this.state.sideMenuView ?
                    <View style={styles.menu}>
                        <Button title="Settings" onPress={() => this.goToSettings(this.props.token)} buttonStyle={{ backgroundColor: '#980000', borderBottomWidth: .45, borderBottomColor: 'white' }} titleStyle={{ color: "white", fontSize: 22, fontWeight: 'bold'}} />
                        {
                            this.props.token ? logoutButton : loginButton
                        }
                    </View>
                    : <View></View>}
                    <View></View>
                    <FilterModal
                    updateDistanceFilter={this.updateDistanceFilter}
                    updatePriceFilter={this.updatePriceFilter}
                    updateFoodStyleFilter={this.updateFoodStyleFilter}
                    distanceFilter={this.state.distanceFilter}
                    priceFilter={this.state.priceFilter}
                    foodStyleFilter={this.state.foodStyleFilter}
                    />
                    {this.state.location ?
                    <MapView style={styles.mapStyle}
                        initialRegion={{
                            latitude: this.state.location.latitude,
                            longitude: this.state.location.longitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}>
                        {this.state.foodTruck && this.state.location ?
                            this.filterTrucks(this.state.location.latitude, this.state.location.longitude, this.state.foodTruck, this.state.distanceFilter, this.state.priceFilter, this.state.foodStyleFilter).map(location => {
                                { count++ }
                                return (
                                    <Marker
                                        title={location.businessName}
                                        onPress={() => this.goToMenu(this.props.token, location.businessId)}
                                        businessId={location.businessId}
                                        key={count}
                                        coordinate={{
                                            latitude: location.latitude,
                                            longitude: location.longitude
                                        }}
                                    >
                                        <Image style={styles.marker} source={require('../assets/food-truck.png')} />
                                    </Marker>
                                );
                            })
                            :
                            <View></View>
                        }
                    </MapView>
                    :
                    <Text>Loading...</Text>}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    menu: {
        backgroundColor: '#980000',
        alignSelf: 'stretch',
      },
    marker: {
        width: 40,
        height: 40,
        backgroundColor: 'white',
        borderRadius: 10,
        borderColor: 'blue',
        borderWidth: 2,
    }
});
