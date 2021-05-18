import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet} from 'react-native';
import { LogInScreen} from './screens/LogInScreen';
import { SignUpScreen } from './screens/SignUpScreen';
import {Home} from './screens/Home';

const Stack = createStackNavigator();

const globalScreenOptions = {
  headerShown: false
};

export default function App() {
  return (
    <NavigationContainer>{
      <Stack.Navigator screenOptions={globalScreenOptions} initialRouteName="LogIn">
        <Stack.Screen  name='LogIn' component={LogInScreen} />
        <Stack.Screen name='SignUp' component={SignUpScreen}/>
        <Stack.Screen name='Home' component={Home}/>
      </Stack.Navigator>
    }</NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
