import React, {useState, useRef, useEffect} from 'react';
import {StyleSheet, View, SafeAreaView, FlatList, Text} from 'react-native';

const DropDown = (props: any) => {
  const renderItem = ({item}: {item: any}) => {
    return (
      <Text
        style={dropdownstyles.item}
        onPress={() => props.changeDisplayedMarkers(item.refTitle)}>
        {item.title}
      </Text>
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
    display: 'flex',
    width: '55%',
    backgroundColor: 'white',
    borderColor: 'grey',
    borderRightWidth: 3,
    borderBottomWidth: 3,
    paddingBottom: 15,
  },
  header: {
    marginLeft: 7,
    fontSize: 20,
    color: 'blue',
    textShadowColor: 'purple',
    textShadowRadius: 5,
    textShadowOffset: {
      width: 1,
      height: 1,
    },
  },
  list: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  item: {
    display: 'flex',
    margin: 5,
    fontSize: 15,
    color: 'blue',
    textShadowColor: 'black',
    textShadowRadius: 5,
    textShadowOffset: {
      width: 1,
      height: 1,
    },
  },
});

export default DropDown;
