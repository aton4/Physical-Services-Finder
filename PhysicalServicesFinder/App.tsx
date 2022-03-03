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
import {StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import {ListItem} from 'react-native-elements/dist/list/ListItem';

import MapView, {Marker} from 'react-native-maps';
import DetailsView from './components/detailsView';
import Navbar from './components/Navbar';
import {decode} from "@mapbox/polyline";

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
let markers: string[] = [];
let markerObject: {
  locationName: string;
  coordinate: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: 0.006;
  };
  additionalDirections: string;
} | null = null;

const App = () => {
  const [renderDropDown, setRenderDropDown] = useState(false);
  const [displayedMarkers, setDisplayMarkers] = useState(markers);
  const [markerDetails, setMarkerDetails] = useState(markerObject);
  
  const closeDropDown = () => {
    setRenderDropDown(false);
  };

  const openDropDown = () => {
    setRenderDropDown(true);
  };

  const getDirections = async (startLoc: any, destinationLoc: any) => {
    try {
      const KEY = "YOUR GOOGLE API KEY"; //put your API key here.
      //otherwise, you'll have an 'unauthorized' error.
      let resp = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}&key=${KEY}`
      );
      let respJson = await resp.json();
      let points = decode(respJson.routes[0].overview_polyline.points);
      console.log(points);
      let coords = points.map((point: any, index: any) => {
        return {
          latitude: point[0],
          longitude: point[1]
        };
      });
      return coords;
    } catch (error) {
      return error;
    }
  };

  const changeDisplayedMarkers = (name: string) => {
    // temporary fix
    const newDisplayedMarkers = [...displayedMarkers];

    if (newDisplayedMarkers.includes(name))
      newDisplayedMarkers.splice(newDisplayedMarkers.indexOf(name), 1);
    else newDisplayedMarkers.push(name);

    setDisplayMarkers(newDisplayedMarkers);
  };

  const selectRenderDetails = (details: {
    locationName: string;
    coordinate: {
      latitude: number;
      longitude: number;
      latitudeDelta: number;
      longitudeDelta: 0.006;
    };
    additionalDirections: string;
  }) => {
    console.log('asdasdasasd');
    console.log(markerDetails, details);
    let locationName = null;
    if (markerDetails) locationName = markerDetails.locationName;

    if (details.locationName !== locationName) {
      console.log('asdasdasasd12345');
      setMarkerDetails(details);
    } else setMarkerDetails(null);
  };

  const removeMarkerDetails = () => {
    setMarkerDetails(null);
  };

  const selectMarkerIcon = (serviceName: string) => {
    switch (serviceName) {
      case 'waterStations':
        return require('./images/water.png');
      case 'restrooms':
        return require('./images/restroom.png');
      case 'studyRooms':
        return require('./images/book.png');
    }
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
            {displayedMarkers.map((serviceName: string) => {
              const markers: Marker[] = markerData
                .get(serviceName)
                .map((element: any) => {
                  return (
                    <Marker
                      coordinate={element.coordinate}
                      key={element.locationName}
                      onPress={() => selectRenderDetails(element)}
                      icon={selectMarkerIcon(serviceName)}></Marker>
                  );
                });

              return markers;
            })}
          </MapView>
        </View>
      </TouchableOpacity>
      {markerDetails && (
        <DetailsView
          details={markerDetails}
          removeMarkerDetails={removeMarkerDetails}
        />
      )}
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
