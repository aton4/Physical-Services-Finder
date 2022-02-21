import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  TouchableOpacity
} from 'react-native';

import {
  Colors,
  // DebugInstructions,
  // Header,
  // LearnMoreLinks,
  // ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const Navbar = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const showDropDown = () => {
    console.log("here")
  }

  return (
    <View style={navbarstyles.container}>
      <TouchableOpacity activeOpacity = { .5 } onPress={ showDropDown }>
        <Image
          style={navbarstyles.dropdown}
          source={{
            uri: 'https://reactnative.dev/img/tiny_logo.png',
          }}
        />
      </TouchableOpacity>
      {/* <Text>AMONG US SUS</Text> */}
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
  dropdown: {
    width: 66, // 66
    height: 58, // 58
  },
});

export default Navbar;
