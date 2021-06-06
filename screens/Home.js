import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DashboardScreen} from '../screens/DashboardScreen';
import { ProfileScreen} from '../screens/ProfileScreen';
import { SettingsScreen} from '../screens/SettingsScreen';
import { SearchScreen} from '../screens/SearchScreen';
import { DrawerContent } from '../screens/DrawerContent';
import {GlycemieScreen} from '../screens/goals/glycemie';
import {StatsScreen} from '../screens/StatsScreen';
import {auth} from '../firebase';


export function Home({navigation}){
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
          <Drawer.Screen name="Glycemie" component={GlycemieScreen}  />
          <Drawer.Screen name="Stats" component={StatsScreen} />
        </Drawer.Navigator>
      
    );
  }