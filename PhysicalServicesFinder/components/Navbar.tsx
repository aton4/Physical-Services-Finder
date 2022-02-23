import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  FlatList
} from 'react-native';
import DropDown from './DropDown'

const Navbar = (props:any) => {
  console.log("asd")
  const [renderDropDown, setRenderDropDown] = useState(false);
  const showDropDown = () => {
    console.log("here");
    setRenderDropDown(!renderDropDown);
  }

  return (
    <View style={navbarstyles.container}>
      <TouchableOpacity style={navbarstyles.dropDownIcon} activeOpacity = { .5 } onPress={ showDropDown }>
        <Image
          style={navbarstyles.dropDownIcon}
          source={{
            uri: 'https://reactnative.dev/img/tiny_logo.png',
          }}
        />
      </TouchableOpacity>
      {renderDropDown && <DropDown serviceData={props.serviceData}/>}
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
