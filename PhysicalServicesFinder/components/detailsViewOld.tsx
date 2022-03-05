import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
  Text,
  Animated,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Button} from 'react-native-elements/dist/buttons/Button';
import Geolocation from 'react-native-geolocation-service';
import {check, PERMISSIONS, RESULTS} from 'react-native-permissions';

const DetailsView = (props: any) => {
  const markerObject = props.details;
  const coords = `${markerObject.coordinate.latitude},${markerObject.coordinate.longitude}`;
  const getDirections = props.getDirections;
  const [openDetails, setOpenDetails] = useState(true);
  let currentPos: Geolocation.GeoPosition | null = null;

  const checkPerm = async () => {
    const perm = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);

    let hasLocationPermission = null;
    if (perm === RESULTS.GRANTED) hasLocationPermission = true;
    else hasLocationPermission = false;

    if (hasLocationPermission) {
      Geolocation.getCurrentPosition(
        position => {
          currentPos = position;
          console.log(
            `current location: ${position.coords.latitude},${position.coords.longitude}`,
          );
        },
        error => {
          // See error code charts below.
          console.log(error.code, error.message);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    }
  };

  useEffect(() => {
    // You need to restrict it at some point
    // This is just dummy code and should be replaced by actual
    checkPerm();
  }, []);

  const text = (
    <>
      <Image
        style={styles.sliderline}
        source={require('../images/detailsline.png')}
      />
      <Text style={styles.locationName}>{markerObject.locationName}</Text>
      <Text style={styles.desc}>
        Where exactly?{'\n\n'}
        {markerObject.additionalDirections}
      </Text>
    </>
  );

  return (
    <SafeAreaView
      style={openDetails ? styles.openedContainer : styles.closedContainer}>
      {text}
      <Button
        // style={styles.button}
        title="Get Directions"
        onPress={() => {
          props.updateCoords(
            currentPos?.coords.latitude,
            currentPos?.coords.longitude,
          );
        }}>
        Get Directions
      </Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  closedContainer: {
    position: 'relative',
    // bottom: 0,
    top: '95%',
    display: 'flex',
    width: '100%',
    height: '100%',
    backgroundColor: 'grey',
    borderColor: 'grey',
    borderRightWidth: 3,
    borderBottomWidth: 3,
    paddingBottom: 15,
  },
  openedContainer: {
    position: 'relative',
    // bottom: 0,
    top: '70%',
    display: 'flex',
    width: '100%',
    height: '100%',
    backgroundColor: 'grey',
    borderColor: 'grey',
    borderRightWidth: 3,
    borderBottomWidth: 3,
    paddingBottom: 15,
  },
  sliderline: {
    display: 'flex',
    marginTop: '3%',
    marginBottom: '5%',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '50%',
  },
  locationName: {
    fontWeight: 'bold',
    fontSize: 30,
  },
  desc: {
    fontSize: 20,
  },
});

export default DetailsView;
