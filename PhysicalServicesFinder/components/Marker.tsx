import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from 'react-native';
import { Marker } from "react-native-maps";

const MapMarker = () => {

}

export default MapMarker;

// const tokyoRegion = {
//   latitude: 35.6762,
//   longitude: 139.6503,
//   latitudeDelta: 0.01,
//   longitudeDelta: 0.01,
// };
// return (
//   <View style={styles.container}>
//     <MapView
//       style={styles.map}
//       initialRegion={tokyoRegion} //your region data goes here.
//     >
//       {/*Make sure the Marker component is a child of MapView. Otherwise it won't render*/}
//       <Marker coordinate={tokyoRegion} />
//     </MapView>
//   </View>
// );