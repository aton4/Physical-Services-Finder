import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
  Text
} from 'react-native';

const DropDown = (props: any) => {

  const renderItem = ({ item }: { item: any }) => (
    // <Item title={item.title} />
    <Text style={dropdownstyles.item}>{item.title}</Text>
  );

  return (
    <SafeAreaView style={dropdownstyles.container}>
      <Text style={dropdownstyles.header}>Physical Services</Text>
      <FlatList
        contentContainerStyle={dropdownstyles.list}
        data={props.serviceData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
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
  },
  header: {
    marginLeft: 7,
    fontSize: 20,
    color: 'blue',
    textShadowColor: 'purple',
    textShadowRadius: 5,
    textShadowOffset: {
      width: 1,
      height: 1
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
      height: 1
    },
  }
});

export default DropDown;
