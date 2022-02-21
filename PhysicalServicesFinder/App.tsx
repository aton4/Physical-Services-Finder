/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

 import React from 'react';
 import {
   SafeAreaView,
   ScrollView,
   StatusBar,
   StyleSheet,
   Text,
   useColorScheme,
   View,
 } from 'react-native';
 
 import {
   Colors,
   // DebugInstructions,
   // Header,
   // LearnMoreLinks,
   // ReloadInstructions,
 } from 'react-native/Libraries/NewAppScreen';
 
 import MapView from 'react-native-maps';
 
 const App = () => {
   const isDarkMode = useColorScheme() === 'dark';
 
   const backgroundStyle = {
     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
   };
 
   return (
     <SafeAreaView style={backgroundStyle}>
       <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
       <ScrollView
         contentInsetAdjustmentBehavior="automatic"
         style={backgroundStyle}>
         <Text>Google Maps</Text>
         <View style={mapstyles.container}>
           {/* Render our MapView */}
           <MapView
             style={mapstyles.map}
             // specify our coordinates.
             initialRegion={{
               latitude: 37.78825,
               longitude: -122.4324,
               latitudeDelta: 0.0922,
               longitudeDelta: 0.0421,
             }}
           />
         </View>
       </ScrollView>
     </SafeAreaView>
   );
 };
 
 // const styles = StyleSheet.create({
 //   sectionContainer: {
 //     marginTop: 32,
 //     paddingHorizontal: 24,
 //   },
 //   sectionTitle: {
 //     fontSize: 24,
 //     fontWeight: '600',
 //   },
 //   sectionDescription: {
 //     marginTop: 8,
 //     fontSize: 18,
 //     fontWeight: '400',
 //   },
 //   highlight: {
 //     fontWeight: '700',
 //   },
 // });
 
 const mapstyles = StyleSheet.create({
   container: {
     ...StyleSheet.absoluteFillObject,
     flex: 1, //the container will fill the whole screen.
     justifyContent: 'flex-end',
     alignItems: 'center',
   },
   map: {
     ...StyleSheet.absoluteFillObject,
   },
 });
 
 export default App;
 