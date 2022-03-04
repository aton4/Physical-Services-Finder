/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useState, useEffect} from 'react';
import {StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import {ListItem} from 'react-native-elements/dist/list/ListItem';

import MapView, {Marker} from 'react-native-maps';
import DetailsView from './components/detailsView';
import Navbar from './components/Navbar';
import {decode} from '@mapbox/polyline';
import {requestMultiple, PERMISSIONS} from 'react-native-permissions';
import MapViewDirections from 'react-native-maps-directions';

requestMultiple([PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION]).then(statuses => {
  console.log(
    'fine location',
    statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION],
  );
});

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

const restrooms = require('./serviceData/restrooms.json');
markerData.set('restrooms', restrooms);

const waterStations = require('./serviceData/waterStations.json');
markerData.set('waterStations', waterStations);

const studyRooms = require('./serviceData/studyRooms.json');
markerData.set('studyRooms', studyRooms);

let markers: string[] = [];
let markerObject: {
  type: string;
  locationName: string;
  coordinate: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: 0.006;
  };
  additionalDirections: string;
} | null = null;
let coordsList: {latitude: number; longitude: number}[] = [];

const App = () => {
  const [renderDropDown, setRenderDropDown] = useState(false);
  const [displayedMarkers, setDisplayMarkers] = useState(markers);
  const [markerDetails, setMarkerDetails] = useState(markerObject);
  const [coords, setCoords] = useState(coordsList);

  const closeDropDown = () => {
    setRenderDropDown(false);
  };

  const openDropDown = () => {
    setRenderDropDown(true);
  };

  const changeDisplayedMarkers = (name: string) => {
    // temporary fix
    const newDisplayedMarkers = [...displayedMarkers];

    if (newDisplayedMarkers.includes(name)) {
      newDisplayedMarkers.splice(newDisplayedMarkers.indexOf(name), 1);
      if (newDisplayedMarkers.length == 0) removeMarkerDetails();
    } else newDisplayedMarkers.push(name);

    setDisplayMarkers(newDisplayedMarkers);
    closeDropDown();
  };

  const selectRenderDetails = (details: {
    type: string;
    locationName: string;
    coordinate: {
      latitude: number;
      longitude: number;
      latitudeDelta: number;
      longitudeDelta: 0.006;
    };
    additionalDirections: string;
  }) => {
    let locationName = null;
    if (markerDetails) locationName = markerDetails.locationName;

    if (details.locationName !== locationName) {
      setMarkerDetails(details);
    }
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
      case 'origin':
        return require('./images/water.png');
    }
  };

  const updateCoords = (
    source: {latitude: number; longitude: number},
    destination: {latitude: number; longitude: number},
  ) => {
    setCoords([source, destination]);
  };

  return (
    // <SomeComponent/>
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
            initialRegion={
              coords.length === 2
                ? {
                    latitude: coords[0].latitude,
                    longitude: coords[0].longitude,
                    latitudeDelta: 0.006,
                    longitudeDelta: 0.006,
                  }
                : {
                    latitude: 33.645949,
                    longitude: -117.842753,
                    latitudeDelta: 0.006,
                    longitudeDelta: 0.006,
                  }
            }>
            {coords.length === 2 && (
              <MapViewDirections
                origin={coords[0]}
                destination={coords[1]}
                apikey={'AIzaSyArDc1CbIpCm-w_3lFXHY8hWmzjX5DpLJs'}
                strokeWidth={10}
                strokeColor="#ffa836" // #36bfff blue
                mode="WALKING"
              />
            )}
            {coords.length === 2 && (
              <Marker
                coordinate={coords[0]}
                key={'origin'}
                icon={selectMarkerIcon('origin')}
              />
            )}
            {displayedMarkers.map((serviceName: string) => {
              const markers: Marker[] = markerData
                .get(serviceName)
                .map((element: any) => {
                  return (
                    <Marker
                      coordinate={element.coordinate}
                      key={element.type + element.locationName}
                      onPress={() => selectRenderDetails(element)}
                      icon={selectMarkerIcon(serviceName)}
                    />
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
          updateCoords={updateCoords}
          selectMarkerIcon={selectMarkerIcon}
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
// import React, {Component} from 'react';
// import {Text, Image, View, StyleSheet, ScrollView} from 'react-native';

// class App extends Component {
//   state = {
//     names: [
//       {name: 'Ben', id: 1},
//       {name: 'Susan', id: 2},
//       {name: 'Robert', id: 3},
//       {name: 'Mary', id: 4},
//       {name: 'Daniel', id: 5},
//       {name: 'Laura', id: 6},
//       {name: 'John', id: 7},
//       {name: 'Debra', id: 8},
//       {name: 'Aron', id: 9},
//       {name: 'Ann', id: 10},
//       {name: 'Steve', id: 11},
//       {name: 'Olivia', id: 12},
//     ],
//   };
//   render() {
//     return (
//       <View>
//         <ScrollView>
//           {this.state.names.map((item, index) => (
//             <View key={item.id} style={styles.item}>
//               <Text>{item.name}</Text>
//             </View>
//           ))}
//         </ScrollView>
//       </View>
//     );
//   }
// }
// export default App;

// const styles = StyleSheet.create({
//   item: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: 30,
//     margin: 2,
//     borderColor: '#2a4944',
//     borderWidth: 1,
//     backgroundColor: '#d2f7f1',
//   },
// });
