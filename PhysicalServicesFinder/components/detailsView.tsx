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

const DetailsView = (props: any) => {
  const markerObject = props.details;
  const [openDetails, setOpenDetails] = useState(false);

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
      <TouchableOpacity
        style={styles.touchableArea}
        onPress={() => {
          if (openDetails) setOpenDetails(false);
          else setOpenDetails(true);
        }}>
        {text}
      </TouchableOpacity>
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
    backgroundColor: 'white',
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
    backgroundColor: 'white',
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
  touchableArea: {
    width: '100%',
    height: '100%',
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
