/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import { ListItem } from 'react-native-elements/dist/list/ListItem';

import MapView, {Marker} from 'react-native-maps';
import Navbar from './components/Navbar';

const serviceData = [
  {
    title: 'Restrooms',
    refTitle: 'restrooms',
  },
  {
    title: 'Water Stations',
    refTitle: 'waterStations',
  },
  {
    title: 'Study Rooms',
    refTitle: 'studyRooms',
  },
];

const markerData = new Map<string, any>();
markerData.set('restrooms', [
  {
    locationName: 'science library 573',
    coordinate: {
      latitude: 33.64598,
      longitude: -117.84629,
      latitudeDelta: 0.006,
      longitudeDelta: 0.006,
    },
    additionalDirections: 'Room 573, open during library hours',
  },
  {
    locationName: 'rowland hall B92',
    coordinate: {
      latitude: 33.64461,
      longitude: -117.84425,
      latitudeDelta: 0.006,
      longitudeDelta: 0.006,
    },
    additionalDirections: 'Room B92, mon-fri 6am-11pm',
  },
]);

markerData.set('waterStations', [
  {
    locationName: 'engineering lecture hall',
    coordinate: {
      latitude: 33.64459,
      longitude: -117.84069,
      latitudeDelta: 0.006,
      longitudeDelta: 0.006,
    },
    additionalDirections:
      'Bottle filling station located outside ELH near restrooms.',
  },
  {
    locationName: 'social science tower',
    coordinate: {
      latitude: 33.64654,
      longitude: -117.84008,
      latitudeDelta: 0.006,
      longitudeDelta: 0.006,
    },
    additionalDirections: 'Bottle filling station located near Room 175',
  },
]);
markerData.set('studyRooms', [
  {
    locationName: 'terrace lobby',
    coordinate: {
      latitude: 33.64941,
      longitude: -117.84238,
      latitudeDelta: 0.006,
      longitudeDelta: 0.006,
    },
    additionalDirections: 'level 2, inside near west food court',
  },
  {
    locationName: 'langson library',
    coordinate: {
      latitude: 33.64723,
      longitude: -117.84098,
      latitudeDelta: 0.006,
      longitudeDelta: 0.006,
    },
    additionalDirections:
      'Book online for a closed off room or find a spot inside',
  },
]);
let foo:string[] = []

const App = () => {
  const [renderDropDown, setRenderDropDown] = useState(false);
  const [displayedMarkers, setDisplayMarkers] = useState(foo);

  const closeDropDown = () => {
    setRenderDropDown(false);
  };

  const openDropDown = () => {
    setRenderDropDown(true);
  };

  const changeDisplayedMarkers = (name: string) => {
    // temporary fix 
    const newDisplayedMarkers = [...displayedMarkers];

    if (newDisplayedMarkers.includes(name)) newDisplayedMarkers.splice(newDisplayedMarkers.indexOf(name), 1)
    else newDisplayedMarkers.push(name);

    setDisplayMarkers(newDisplayedMarkers);
  };

  return (
    <View style={mapstyles.container}>
      <Navbar
        serviceData={serviceData}
        openDropDown={openDropDown}
        renderDropDown={renderDropDown}
        changeDisplayedMarkers={changeDisplayedMarkers}
      />
      <TouchableOpacity
        style={mapstyles.container}
        activeOpacity={1.0}
        onPress={() => closeDropDown()}>
        <View style={mapstyles.container}>
          {/* Render our MapView */}
          <MapView
            style={mapstyles.map}
            // specify our coordinates.
            mapType={'hybrid'}
            initialRegion={{
              latitude: 33.645949,
              longitude: -117.842753,
              latitudeDelta: 0.006,
              longitudeDelta: 0.006,
            }}>
            {
            displayedMarkers.map((serviceName: string) => {
              const markers: Marker[] = markerData.get(serviceName).map((element: any) => {
                return <Marker
                  coordinate={element.coordinate}
                  key={element.locationName}
                />;
              });

              return markers;
            })}
          </MapView>
        </View>
      </TouchableOpacity>
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
