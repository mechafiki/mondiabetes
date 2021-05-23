import {  StyleSheet, Text, View,Image, TouchableOpacity } from 'react-native';
import * as React from 'react';
import {auth, db} from '../firebase';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { DashboardScreen} from '../screens/DashboardScreen';
import { ProfileScreen} from '../screens/ProfileScreen';
import { SettingsScreen} from '../screens/SettingsScreen';
import { SearchScreen} from '../screens/SearchScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export function Home({ navigation}){

    const Tab = createMaterialBottomTabNavigator();

    React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if(!authUser){
          navigation.replace('LogIn');
      }
    });

    return unsubscribe;

}, []);

    return(
        <Tab.Navigator
          initialRouteName='Dashboard'
          labeled={false}
        >
          <Tab.Screen  name="Search" component={SearchScreen}
          options={{
            tabBarColor:"#145da0",
            tabBarIcon:({focused}) => (
              <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                  <Image source={require('../assets/search.png')}
                  resizeMode='contain'
                  style={{
                    width:30,
                    height:30
                  }}
                  />
              </View>

            ),
          }}
          backBehavior='none'
          />
          <Tab.Screen  name="Dashboard" component={DashboardScreen} 
                  options={{
                    tabBarColor:"#1769b5",
                    tabBarLabel: 'Accueil',
                    tabBarIcon: ({ color }) => (
                      <MaterialCommunityIcons name="home" color={color} size={26} />
                    ),}}
          />
          <Tab.Screen  name="Profile" component={ProfileScreen} 
          options={{
            tabBarColor:"#1974c8",
            tabBarIcon:({focused}) => (
              <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                  <Image source={require('../assets/profile.png')}
                  resizeMode='contain'
                  style={{
                    width:30,
                    height:30
                  }}
                  />
              </View>

            ),
          }}
          />
          <Tab.Screen  name="Settings" component={SettingsScreen}
          options={{
            tabBarColor:"#1c84e3",
            tabBarIcon:({focused}) => (
              <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                  <Image source={require('../assets/settings.png')}
                  resizeMode='contain'
                  style={{
                    width:30,
                    height:30
                  }}
                  />
              </View>

            ),
          }}
          />
        </Tab.Navigator>
      
    );
  }

 