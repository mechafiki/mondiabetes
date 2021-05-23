import { SafeAreaView, StyleSheet, Text,View, ActivityIndicator, Image, TouchableOpacity, ScrollView} from 'react-native';
import * as React from 'react';
import {auth, db, firestore} from '../firebase';
import { Avatar, Title, Caption } from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts } from '@expo-google-fonts/inter';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons'; 
import { updateProfile} from '../screens/updateProfile';

import Icon from 'react-native-vector-icons/EvilIcons';
const profileStack = createStackNavigator();

export function ProfileScreen({  }){


      return (
          <profileStack.Navigator initialRouteName='profileScreen' screenOptions={{headerShown:false}}>
              <profileStack.Screen name='profile' component={Profile}/>
              <profileStack.Screen name='updateProfile' component={updateProfile}/>
          </profileStack.Navigator>
      );
}

   export function Profile({navigation}){

    const user = auth.currentUser;
  


    let [fontsLoaded] = useFonts({
        'Nexa-Bold': require('../assets/fonts/Nexa-Bold.otf'),
        'Nexa-Light': require('../assets/fonts/Nexa-Light.otf'),

      });
      if (!fontsLoaded) {
        return (
          <View style={styles.container}>
            <ActivityIndicator size="large" color="#057dcd" />
          </View>
        );
      } 

      


    return(
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={{justifyContent:'center', alignItems:'center'}}
             > 
            <View style={styles.header} >
 
                    <Icon  name="user" size={120} color="#32a0ed"  />
                    <Title style={{fontFamily:'Nexa-Bold',fontSize:26, color:'white'}}>
                         {user.displayName}
                       </Title> 
                    <Caption style={{fontFamily:'Nexa-Light', fontSize:14 , color:'white'}}>{user.email}</Caption>       
            </View>
                    <TouchableOpacity  style={styles.modifier} onPress={() => navigation.push('updateProfile')}>
                    <MaterialCommunityIcons name="pencil" size={20} color="white" />
                    </TouchableOpacity>
            <View style={styles.title }>
                <Text style={{textAlign:'left', fontFamily:'Nexa-Bold', fontSize:25}}>Vos informations:</Text>
            </View>
                <View style={styles.userInfoSection}>
                    <View style={styles.icons} >
                    <Entypo name="user" size={32} color="#32a0ed" />
                    </View>
                    <View>
                    <Title style={{fontFamily:'Marta-Bold'}}>Nom </Title>
                    <Caption style={{fontFamily:'Nexa-Light'}}>{user.displayName}</Caption>
                    </View>
                </View>
                
                <View style={styles.userInfoSection}>
                    <View style={styles.icons}>
                        <Icon name="calendar" size={32} color="#32a0ed" />
                    </View>
                    <View>
                    <Title style={{fontFamily:'Marta-Bold'}}>Date de naissance </Title>
                    <Caption style={{fontFamily:'Nexa-Light'}}> 01/01/1970</Caption>
                    </View>
                </View>
                <View style={styles.userInfoSection}>
                    <View style={styles.icons}>
                        <Entypo name="location" size={28} color="#32a0ed" />
                    </View>
                    <View>
                    <Title style={{fontFamily:'Marta-Bold'}}>Addresse </Title>
                    <Caption style={{fontFamily:'Nexa-Light'}}> Cite Dakhla, 80060, Agadir</Caption>
                    </View>
                </View>
                <View style={styles.userInfoSection}>
                    <View style={styles.icons}>
                        <MaterialCommunityIcons name="gender-male-female" size={32} color="#32a0ed" />
                    </View>
                    <View >
                    <Title style={{fontFamily:'Marta-Bold'}}>Genre</Title>
                    <Caption style={{fontFamily:'Nexa-Light'}}> Homme</Caption>
                    </View>
                </View>
                <View style={styles.userInfoSection}>
                    <View style={styles.icons}>
                    <FontAwesome5 name="weight" size={32} color="#32a0ed" />
                    </View>
                    <View >
                    <Title style={{fontFamily:'Marta-Bold'}}>Poids </Title>
                    <Caption style={{fontFamily:'Nexa-Light'}}>70 Kg</Caption>
                    </View>
                </View>
                <View style={styles.userInfoSection}>
                    <View style={styles.icons}>
                    <MaterialCommunityIcons name="human-male-height-variant" size={32} color="#32a0ed" />
                    </View>
                    <View >
                    <Title style={{fontFamily:'Marta-Bold'}}>Taille </Title>
                    <Caption style={{fontFamily:'Nexa-Light'}}> 170 cm</Caption>
                    </View>
                </View>
                
                <View style={styles.userInfoSection}>
                    <View style={styles.icons}>
                    <MaterialCommunityIcons name="diabetes" size={32} color="#32a0ed" />
                    </View>
                    <View >
                    <Title style={{fontFamily:'Marta-Bold'}}>Type de diabètes</Title>
                    <Caption style={{fontFamily:'Nexa-Light'}}>Type 1</Caption>
                    </View>
                </View>
                <View style={styles.userInfoSection}>
                    <View  style={styles.icons}>
                    <Feather name="phone" size={32} color="#32a0ed" />
                    </View>
                    <View >
                    <Title style={{fontFamily:'Marta-Bold'}}>GSM </Title>   
                    <Caption style={{fontFamily:'Nexa-Light'}}> 0677777777</Caption>
                    </View>
                </View>
        </ScrollView>
        </SafeAreaView>
    );
}

  


const styles = StyleSheet.create({
    defaultFontFamily:{
        fontFamily:'Nexa-Bold'
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent:'center',
      },
    header:{
        backgroundColor:'#145da0',
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        height:200,
        width:'100%',       
    },
    modifier:{
        height:34,
        width:34,
        backgroundColor:"#0c2d48",
        borderRadius:17,
        justifyContent:'center',
        alignItems:'center',
        marginTop: -17
    },
    title:{
        width:"90%",
        height:50,
        marginTop:20
    },
    userInfoSection:{
       flexDirection:'row',
       padding:5,
       //justifyContent:'center',
       width:"90%",
       backgroundColor:'#e7eefb',
       margin:"1%",
       borderRadius:10,
    },
    icons:{
        marginRight: 15,
        justifyContent:'center'
        
    },
 

  });