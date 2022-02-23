/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import MapView from 'react-native-maps';
import Navbar from './components/Navbar';

const data = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Restrooms',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Water Stations',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Study Rooms',
  },
];

const App = () => {
  return (
    <View style={mapstyles.container}>
      <Navbar serviceData={data}/>
      <View style={mapstyles.container}>
        {/* Render our MapView */}
        <MapView
          style={mapstyles.map}
          // specify our coordinates.
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      </View>
    </View>
  );
};

const mapstyles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default App;
