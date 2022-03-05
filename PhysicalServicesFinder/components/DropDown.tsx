import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
  Text,
  TouchableOpacity,
} from 'react-native';

const DropDown = (props: any) => {
  const renderItem = ({item}: {item: any}) => {
    return (
      <TouchableOpacity
        style={dropdownstyles.button}
        onPress={() => props.changeDisplayedMarkers(item.refTitle)}>
        <Text style={dropdownstyles.item}>{item.title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={dropdownstyles.container}>
      <Text style={dropdownstyles.header}>Physical Services</Text>
      <FlatList
        contentContainerStyle={dropdownstyles.list}
        data={props.serviceData}
        renderItem={renderItem}
        keyExtractor={item => item.refTitle}
      />
    </SafeAreaView>
  );
};

const dropdownstyles = StyleSheet.create({
  container: {
    position: 'absolute',
    x: 0,
    width: '55%',
    backgroundColor: 'white',
    borderColor: 'grey',
    borderRightWidth: 3,
    borderBottomWidth: 3,
    borderRadius: 15,
  },
  header: {
    paddingLeft: 7,
    fontSize: 20,
    color: 'black',
    // textShadowColor: 'black',
    // textShadowRadius: 5,
    // textShadowOffset: {
    //   width: 1,
    //   height: 1,
    // },
    // textAlign: "center",
    alignSelf: "center",
    width: "90%",
    padding: 5,
    borderBottomWidth: 3,
    borderBottomColor: 'black',
    marginBottom: "5%",
  },
  list: {
    width: '100%',
    // margin: '5%',
  },
  button: {
    // margin: 5,
    // fontSize: 15,
    // color: 'black',
    width: '75%',
    borderColor: 'black',
    borderWidth: 3,
    borderRadius: 10,
    alignSelf: 'center',
    // padding: 5,
    // alignItems: 'center',
    backgroundColor: 'lightblue',
    marginBottom: "5%",
  },
  item: {
    margin: 5,
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
    // width: '100%',
    padding: 5,
    alignSelf: 'center',
  },
});

export default DropDown;
