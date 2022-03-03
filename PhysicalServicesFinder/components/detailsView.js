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
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

const config = {
  velocityThreshold: 0.1, // 0.3
  directionalOffsetThreshold: 10, // 80
};

const DetailsView = props => {
  const markerObject = props.details;
  const coords = `${markerObject.coordinate.latitude},${markerObject.coordinate.longitude}`;
  const getDirections = props.getDirections;
  const [openDetails, setOpenDetails] = useState(true);
  let currentPos = null;

  function onSwipeUp(gestureState) {
    setOpenDetails(true);
    console.log('A');
  }

  function onSwipeDown(gestureState) {
    setOpenDetails(false);
    console.log('B');
  }

  const selectMarkerIcon = serviceName => {
    switch (serviceName) {
      case 'waterStations':
        return require('../images/water.png');
      case 'restrooms':
        return require('../images/restroom.png');
      case 'studyRooms':
        return require('../images/book.png');
    }
  };

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

  return (
    <GestureRecognizer
      onSwipeUp={state => onSwipeUp(state)}
      onSwipeDown={state => onSwipeDown(state)}
      config={config}>
      <SafeAreaView
        style={openDetails ? styles.openedContainer : styles.closedContainer}>
        <Image
          style={styles.sliderline}
          source={require('../images/detailsline.png')}
        />
        <View style={styles.title}>
          <Image
            style={styles.icon}
            source={selectMarkerIcon(markerObject.type)}
          />
          <Text style={styles.locationName}>{markerObject.locationName}</Text>
        </View>
        <Text style={styles.desc}>
          Where exactly?{'\n\n'}
          {markerObject.additionalDirections}
        </Text>
        {/* <Button
          // style={styles.button}
          title="Directions"
          buttonStyle={styles.directionButton}
          onPress={() => {
            props.updateCoords(
              currentPos?.coords.latitude,
              currentPos?.coords.longitude,
            );
          }}></Button> */}
        <TouchableOpacity
          style={styles.directionButton}
          onPress={() => {
            props.updateCoords(
              currentPos?.coords.latitude,
              currentPos?.coords.longitude,
            );
          }}>
          <Image
            style={styles.directionsIcon}
            source={require('../images/directions.png')}
          />
          <Text style={styles.directionsText}>Directions</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </GestureRecognizer>
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
    backgroundColor: 'white',
    borderColor: 'grey',
    borderRightWidth: 3,
    borderBottomWidth: 3,
    padding: 15,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  openedContainer: {
    position: 'relative',
    // bottom: 0,
    top: '50%',
    display: 'flex',
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    borderColor: 'grey',
    borderRightWidth: 3,
    borderBottomWidth: 3,
    padding: 15,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
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
    flexGrow: 4,
  },
  desc: {
    fontSize: 20,
  },
  directionButton: {
    backgroundColor: 'white',
    display: 'flex',
    marginTop: '10%',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 5,
    // height: "100%",
    width: '50%',
    alignItems: 'center',
    color: 'black',
    flexDirection: 'row',
    shadowColor: 'black',
    shadowOffset: {
      width: 2,
      height: 2
    },
    shadowOpacity: 1,
    shadowRadius: 3,
    backgroundColor: '#fff',
    elevation: 10,
    borderRadius: 35,
  },
  title: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '10%',
  },
  icon: {
    width: 75,
    height: 75,
    marginRight: 5,
  },
  directionsIcon: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  directionsText: {
    fontSize: 20,
  },
});

export default DetailsView;
