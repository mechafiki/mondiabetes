import * as React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DashboardScreen} from '../screens/DashboardScreen';
import { ProfileScreen} from '../screens/ProfileScreen';
import { SettingsScreen} from '../screens/SettingsScreen';
import { SearchScreen} from '../screens/SearchScreen';
import { DrawerContent } from '../screens/DrawerContent';
import {GlycemieScreen} from '../screens/goals/glycemie';
import {StatsScreen} from '../screens/StatsScreen';
import {DoctorDashboard} from '../screens/doctor/DoctorDashboard';
import {auth, db} from '../firebase';


export function Home({navigation}){
  const Drawer = createDrawerNavigator();
  const user = auth.currentUser;
  const [userData, setUserData] =  React.useState(null);
  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if(!authUser){
          navigation.replace('LogIn');
      }
    });
    return unsubscribe;
  }, []);
  
  const getUser = async() => {
    db.collection('doctors').doc(user.email).get()
    .then((documentSnapchot) => {
        if ( documentSnapchot.exists){
            setUserData(documentSnapchot.data());
        }
    });
  }

  React.useEffect(() => {
    getUser();

  }, [])


  if ( !userData ){
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
  else {
    return(
      <Drawer.Navigator initialRouteName='DoctorDashboard'  drawerContent={props => <DrawerContent {...props} />} >
        <Drawer.Screen name='DoctorDashboard' component={DoctorDashboard} />
    </Drawer.Navigator>
    )
  }
  }

  const styles = StyleSheet.create({
      container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:"#faf8ff"

      }
  });