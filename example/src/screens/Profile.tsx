/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity
} from 'react-native';

import Navigator from 'react-native-screen-navigator';

function Profile(): JSX.Element {
  
  return (
    <View style={{
      backgroundColor: 'yellow',
      height: Dimensions.get("window").height
    }}>
      <Text style={{fontSize: 30, padding: 15}}>Profile</Text>
      <TouchableOpacity style={{backgroundColor: 'green', padding: 15, borderRadius: 5}}
        onPress={() => {
          Navigator.navigate("Home");
        }}>
        <Text style={{color: 'white', fontSize: 16}}>Go Home</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Profile;
