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
  ScrollView,
} from 'react-native';
import {Button} from 'react-native-elements/dist/buttons/Button';
import Geolocation from 'react-native-geolocation-service';
import {check, PERMISSIONS, RESULTS} from 'react-native-permissions';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

const config = {
  velocityThreshold: 0.2, // 0.3
  directionalOffsetThreshold: 40, // 80
};

const DetailsView = props => {
  const markerObject = props.details;
  const coords = `${markerObject.coordinate.latitude},${markerObject.coordinate.longitude}`;
  const [openDetails, setOpenDetails] = useState(true);
  const [source, setSource] = useState(null);

  // used to open the details view if the details view is closed and the user
  // clicks on a different marker - displays the new marker information
  const d = useRef(markerObject);
  if (d.current !== markerObject) {
    d.current = markerObject;
    setOpenDetails(true);
  }

  const scrollRef = useRef();
  const scrollToTop = () => {
    scrollRef.current?.scrollTo({y: 0, animated: false});
  };

  function onSwipeUp(gestureState) {
    setOpenDetails(true);
  }

  function onSwipeDown(gestureState) {
    setOpenDetails(false);
    scrollToTop();
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
      await Geolocation.getCurrentPosition(
        position => {
          // currentPos = position;
          setSource(position);
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
  console.log(openDetails);
  return (
    <GestureRecognizer
      onSwipeUp={state => onSwipeUp(state)}
      onSwipeDown={state => onSwipeDown(state)}
      config={config}>
      <SafeAreaView
        style={openDetails ? styles.openedContainer : styles.closedContainer}>
        <ScrollView ref={scrollRef} scrollEnabled={openDetails}>
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
          {!source ? (
            <Text style={styles.loadingButton}>Loading Directions...</Text>
          ) : null}
          {source && (
            <TouchableOpacity
              style={styles.directionButton}
              onPress={() => {
                props.updateCoords(
                  {
                    latitude: source.coords.latitude,
                    longitude: source.coords.longitude,
                  },
                  {
                    latitude: markerObject.coordinate.latitude,
                    longitude: markerObject.coordinate.longitude,
                  },
                );
                setOpenDetails(false);
                props.centerMap();
              }}>
              <Image
                style={styles.directionsIcon}
                source={require('../images/directions.png')}
              />
              <Text style={styles.directionsText}>Directions</Text>
            </TouchableOpacity>
          )}
          <Image
            style={styles.locationimage}
            source={require('../images/ics.jpg')}
          />
          <Text style={styles.desc}>
            Where exactly?{'\n\n'}
            {markerObject.additionalDirections}
          </Text>
          {/* need an empty view with some height to register scrollview to scroll */}
          <View style={{height: 500}}></View>
        </ScrollView>
      </SafeAreaView>
    </GestureRecognizer>
  );
};

const styles = StyleSheet.create({
  closedContainer: {
    position: 'relative',
    // bottom: 0,
    top: '95%',
    // display: 'flex',
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    borderColor: 'grey',
    borderRightWidth: 3,
    borderBottomWidth: 3,
    padding: 15,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    // flexGrow: 1,
    // flex: 1
  },
  openedContainer: {
    position: 'relative',
    // bottom: 0,
    top: '50%',
    // display: 'flex',
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    borderColor: 'grey',
    borderRightWidth: 3,
    borderBottomWidth: 3,
    padding: 15,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    // flexGrow: 1,
    // flex: 1,
  },
  sliderline: {
    marginTop: '3%',
    marginBottom: '5%',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '50%',
    // position: "sticky"
  },
  locationName: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 30,
    flex: 1,
    flexWrap: 'wrap',
  },
  locationimage: {
    width: '50%',
    height: 0,
    paddingBottom: '50%',
  },
  desc: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  loadingButton: {
    backgroundColor: 'white',
    // display: 'flex',
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
    fontSize: 20,
  },
  directionButton: {
    backgroundColor: 'white',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: '5%',
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
      height: 2,
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
    marginBottom: '5%',
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
    color: 'black',
  },
});

export default DetailsView;
