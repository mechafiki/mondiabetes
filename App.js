import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LogInScreen} from './screens/LogInScreen';
import { SignUpScreen } from './screens/SignUpScreen';
import {Home} from './screens/Home';
import {OnboardingScreen} from './screens/Onboarding';
const Stack = createStackNavigator();

const globalScreenOptions = {
  headerShown: false
};

export default function App({}) {


  return (
    <NavigationContainer>{
      
      <Stack.Navigator screenOptions={globalScreenOptions} initialRouteName="OnboardingScreen">
        <Stack.Screen name='OnboardingScreen' component={OnboardingScreen } />
        <Stack.Screen  name='LogIn' component={LogInScreen} />
        <Stack.Screen name='SignUp' component={SignUpScreen}/>
        <Stack.Screen name='Home' component={Home}/>
      </Stack.Navigator>
    }</NavigationContainer>
  );
}
