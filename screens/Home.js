import * as React from 'react';
import { SafeAreaView, ActivityIndicator , StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DashboardScreen} from '../screens/DashboardScreen';
import { ProfileScreen} from '../screens/ProfileScreen';
import { SettingsScreen} from '../screens/SettingsScreen';
import { SearchScreen} from '../screens/SearchScreen';
import { DrawerContent } from '../screens/DrawerContent';
import {GlycemieScreen} from '../screens/goals/glycemie';
import { Meals } from '../screens/Meals';
import { Hydratation } from './Hydratation';
import {StatsScreen} from '../screens/StatsScreen';
import {DoctorDashboard} from '../screens/doctor/DoctorDashboard';
import { ChatScreen } from './Chat/ChatScreen';
import { ChatScreen_patient } from './Chat/ChatScreen_patient';
import {AddChat} from './Chat/AddChat';
import { AddChat_patient } from './Chat/AddChat_patient';
import { Chat } from './Chat/Chat';
import { Chat_patient } from './Chat/Chat_patient';
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


  if ( userData ){
  return(
    <Drawer.Navigator initialRouteName='DoctorDashboard'  drawerContent={props => <DrawerContent {...props} />} >
      <Drawer.Screen name='DoctorDashboard' component={DoctorDashboard} />
      <Drawer.Screen name='ChatScreen' component={ChatScreen} />
      <Drawer.Screen name='AddChat' component={AddChat} />
      <Drawer.Screen name="Chat" component={Chat} />
  </Drawer.Navigator>
  );
}
  else {
    return(
        <Drawer.Navigator initialRouteName='Dashboard'  drawerContent={props => <DrawerContent {...props} />} >
          <Drawer.Screen  name="Search" component={SearchScreen} />
          <Drawer.Screen  name="Dashboard" component={DashboardScreen} />
          <Drawer.Screen  name="Profile" component={ProfileScreen}  />
          <Drawer.Screen  name="Settings" component={SettingsScreen} />
          <Drawer.Screen name="Glycemie" component={GlycemieScreen}  />
          <Drawer.Screen name="Meals" component={Meals} />
          <Drawer.Screen name="Hydratation" component={Hydratation} />
          <Drawer.Screen name="Stats" component={StatsScreen} />
          <Drawer.Screen name='ChatScreen_patient' component={ChatScreen_patient} />
          <Drawer.Screen name='Chat_patient' component={Chat_patient} />
          <Drawer.Screen name="AddChat_patient" component={AddChat_patient} />

          
        </Drawer.Navigator>
      
    );
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