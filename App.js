import React from 'react';
import { LogBox } from 'react-native';
import _ from 'lodash';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LogInScreen} from './screens/LogInScreen';
import {AccountType} from './screens/AccountType';
import {PatientSignUp } from './screens/PatientSignUp';
import {DoctorSignUp} from './screens/doctor/DoctorSignUp';
import {LoadingScreen} from './screens/LoadingScreen';
import {Home} from './screens/Home';
import {OnboardingScreen} from './screens/Onboarding';
const Stack = createStackNavigator();

const globalScreenOptions = {
  headerShown: false
};

export default function App({}) {
  LogBox.ignoreLogs(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};

  return (
    <NavigationContainer>{
      
      <Stack.Navigator screenOptions={globalScreenOptions} initialRouteName="OnboardingScreen">
        <Stack.Screen name='OnboardingScreen' component={OnboardingScreen } />
        <Stack.Screen name='LoadingScreen' component={LoadingScreen} />
        <Stack.Screen name='LogIn' component={LogInScreen} />
        <Stack.Screen name='AccountType' component={AccountType} />
        <Stack.Screen name='PatientSignUp' component={PatientSignUp}/>
        <Stack.Screen name='DoctorSignUp' component={DoctorSignUp} />
        <Stack.Screen name='Home' component={Home}/>
      </Stack.Navigator>
    }</NavigationContainer>
  );
}
