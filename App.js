import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, globalStyles } from './src/utils/globalStyles';
import { LoginScreen } from './src/screens/loginScreen';
import { RideBookingScreen } from './src/screens/rideBookingScreen';
import "./global.css";
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from './firebase.config';
import { ProfileScreen } from './src/screens/profileScreen';
import { TripHistoryScreen } from './src/screens/tripHistoryScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { backendUrl } from './src/utils/constants';


const Drawer = createDrawerNavigator();

// use colors.adobe.com and come up with the color palette properly
// Add a logo 
// add branding in home screen
// make the cab type selection part draggable
// store user data in local fetch it from mongo db
// store cab booking status on firestore for realtime
// implement apis
// then go to profile screen
// then password reset function

export default function App() {
  function CustomDrawerContent(props) {
    return (
      <>
        <DrawerContentScrollView {...props}>
          <DrawerItemList {...props} />
        </DrawerContentScrollView>
        <DrawerItem label={() => <Text style={{ color: colors.red, textAlign: "center" }}>Logout</Text>}
          onPress={() => { props.navigation.closeDrawer(); signOut(auth).then(() => { setIsLoggedIn(false) }) }}
        />
      </>
    );
  }
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });
  }, []);

  return (


    <NavigationContainer>
      {!isLoggedIn ? <LoginScreen /> : <Drawer.Navigator


        drawerContent={props => <CustomDrawerContent {...props}
        />}

        initialRouteName="Book a Ride">
        <Drawer.Screen name="Book a Ride" component={RideBookingScreen} />
        <Drawer.Screen name="Profile" component={ProfileScreen} />
        <Drawer.Screen name="Trip History" component={TripHistoryScreen} />
      </Drawer.Navigator>}
    </NavigationContainer>

  );
}