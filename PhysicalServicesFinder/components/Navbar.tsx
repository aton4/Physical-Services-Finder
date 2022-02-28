import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from 'react-native';
import DropDown from './DropDown';
// import {reactlogo} from "../images/reactlogo.png";

const Navbar = (props: any) => {
  console.log('asd');
  const showDropDown = () => {
    console.log('here');
    props.setRenderDropDown(true);
  };

  return (
    <View style={navbarstyles.container}>
      <TouchableOpacity
        style={navbarstyles.dropDownIcon}
        activeOpacity={0.5}
        onPress={showDropDown}>
        <Image
          style={navbarstyles.dropDownIcon}
          source={{
            uri: 'https://reactnative.dev/img/tiny_logo.png',
            // uri: reactlogo,
            // require("../images/reactlogo.png")
          }}
        />
      </TouchableOpacity>
      {props.renderDropDown && (
        <DropDown
          serviceData={props.serviceData}
          changeDisplayedMarkers={props.changeDisplayedMarkers}
        />
      )}
    </View>
  );
};

const navbarstyles = StyleSheet.create({
  container: {
    position: 'absolute',
    x: 0,
    fontSize: 30,
    zIndex: 1,
    width: '100%',
    backgroundColor: 'transparent',
    // opacity: 0,
  },
  dropDownIcon: {
    width: 66,
    height: 58,
  },
  dropDown: {
    position: 'absolute',
    x: 0,
    display: 'flex',
    backgroundColor: 'white',
  },
});

export default Navbar;
