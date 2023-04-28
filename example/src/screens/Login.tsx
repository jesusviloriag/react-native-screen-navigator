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
  TouchableOpacity,
  Image
} from 'react-native';

import Navigator from 'react-native-screen-navigator';

function Login(): JSX.Element {
  
  return (
    <View style={{
      backgroundColor: 'red',
      height: Dimensions.get("window").height
    }}>

      <Text style={{fontSize: 30, padding: 15}}>Login</Text>

      <TouchableOpacity style={{backgroundColor: 'green', padding: 15, borderRadius: 5}}
        onPress={() => {
          Navigator.navigate("Home");
        }}>
        <Text style={{color: 'white', fontSize: 16}}>Go Home</Text>
      </TouchableOpacity>

      <TouchableOpacity style={{backgroundColor: 'yellow', padding: 15, borderRadius: 5}}
        onPress={() => {
          Navigator.navigate("Profile");
        }}>
        <Text style={{color: 'black', fontSize: 16}}>Go to Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={{backgroundColor: 'blue', padding: 15, borderRadius: 5}}
        onPress={() => {
          Navigator.openModal({
            title: "Modal title",  //title of the window
            text: "This is a test text, it can be very long, but try to be brief :)", //text inside of the window
            component: <Image style={{width: 300, height: 300}} source={require('../assets/do_not.jpg')}></Image>,  //component to render inside of the window
            buttons: [  //buttons at the bottom of the window 
              {
                text: "Cancel"   //Cancel button always closes the window
              },
              {
                text: "OK",  //text inside the button
                onPress: () => console.log("ok pressed")  //onPress function inside of the button
              }
            ]
          })
        }}>
        <Text style={{color: 'white', fontSize: 16}}>Open modal window</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Login;
