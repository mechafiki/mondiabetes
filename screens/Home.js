import {  StyleSheet, Text, View,Image, TouchableOpacity } from 'react-native';
import * as React from 'react';
import {auth, db} from '../firebase';
//import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { DashboardScreen} from '../screens/DashboardScreen';
import { ProfileScreen} from '../screens/ProfileScreen';
import { SettingsScreen} from '../screens/SettingsScreen';
import { SearchScreen} from '../screens/SearchScreen';

export function Home({ navigation}){

    //const Tab = createBottomTabNavigator();
    const Tab = createMaterialBottomTabNavigator();


    React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if(!authUser){
          navigation.replace('LogIn');
      }
    });

    return unsubscribe;

}, []);
  
   /* const logout = () => {
      auth
      .signOut()
      .then(() => console.log('User signed out!'));
    };*/

    return(
        <Tab.Navigator
          initialRouteName='Dashboard'
          tabBarOptions={{
            showLabel: false,
          // style:{ ...styles.tabStyle }
          }}

        >
          <Tab.Screen  name="Search" component={SearchScreen} 
          options={{
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
            tabBarIcon:({focused}) => (
              <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                  <Image source={require('../assets/dashboard.png')}
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
          <Tab.Screen  name="Profile" component={ProfileScreen} 
          options={{
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

  const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8faff',
        alignItems: 'center',
        justifyContent: 'center',
      },
      logout:{
          position:'absolute',
          top:30,
          right:15
      },
      tabStyle:{
        position:'absolute',
        bottom:5,
        left:5,
        right:5,
        elevation:0,
        backgroundColor:"#badaf8",
        borderRadius:5,
        height:50
      }
  });