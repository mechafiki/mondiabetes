import {  StyleSheet, Text, View,Image, TouchableOpacity } from 'react-native';
import * as React from 'react';
import {auth, db} from '../firebase';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DashboardScreen} from '../screens/DashboardScreen';
import { ProfileScreen} from '../screens/ProfileScreen';
import { SettingsScreen} from '../screens/SettingsScreen';
import { SearchScreen} from '../screens/SearchScreen';
import { DrawerContent } from '../screens/DrawerContent';
export function Home({ navigation}){

    const Drawer = createDrawerNavigator();

    React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if(!authUser){
          navigation.replace('LogIn');
      }
    });

    return unsubscribe;

}, []);

    return(
        <Drawer.Navigator initialRouteName='Dashboard'  drawerContent={props => <DrawerContent {...props} />} >
          <Drawer.Screen  name="Search" component={SearchScreen} />
          <Drawer.Screen  name="Dashboard" component={DashboardScreen} />
          <Drawer.Screen  name="Profile" component={ProfileScreen}  />
          <Drawer.Screen  name="Settings" component={SettingsScreen} />
        </Drawer.Navigator>
      
    );
  }

 