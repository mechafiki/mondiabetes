import { SafeAreaView,StyleSheet, Text,View, ActivityIndicator,TouchableOpacity, ScrollView} from 'react-native';
import * as React from 'react';
import {auth, db} from '../firebase';
import {  Title, Caption } from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts } from '@expo-google-fonts/inter';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { updateProfile} from '../screens/updateProfile';
import {Avatar} from 'react-native-elements';

import Icon from 'react-native-vector-icons/EvilIcons';
const profileStack = createStackNavigator();

export function ProfileScreen(){

      return (
          <profileStack.Navigator initialRouteName='profileScreen' screenOptions={{headerShown:false}}>
              <profileStack.Screen name='profile' component={Profile}/>
              <profileStack.Screen name='updateProfile' component={updateProfile} 
              options={{
                  headerShown:true,
                  title:"modifier votre profile",
                  headerStyle: {
                    backgroundColor: '#000c66',
                  },
                  headerTintColor: '#fff',
                  headerTitleStyle: {
                    fontFamily:'Nexa-Bold'
                  },
                }}/>
          </profileStack.Navigator>
      );
}

   export function Profile({navigation}){

    const user = auth.currentUser;
    const [userData, setUserData] = React.useState("");
    const getUser = async() => {
        db.collection('patients').doc(user.email).get()
        .then((documentSnapchot) => {
            if ( documentSnapchot.exists){
                setUserData(documentSnapchot.data());
            }
        })
    }

    React.useEffect(() => {
            getUser();
    }, [])

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
            <ScrollView contentContainerStyle={{justifyContent:'center', alignItems:'center',paddingBottom:30}}
             > 
            <View style={styles.header} >
            <TouchableOpacity style={styles.headerIcon} onPress={() => navigation.openDrawer()}>
                    <AntDesign name="bars" size={24} color="white" />
                </TouchableOpacity>                
               { 
                userData.profilePic?
                <Avatar 
                    rounded
                    size={80}
                    source={{
                   uri : userData.profilePic
                    }}
                />
                : 
                <Avatar
                    rounded
                    size={80}
                    source={require('../assets/logov2.png')} 
                />
                }
                    <Title style={{fontFamily:'Nexa-Bold',fontSize:26, color:'white'}}>
                         {userData.displayName}
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
                    <Entypo name="user" size={32} color="#0019d4" />
                    </View>
                    <View>
                    <Title style={styles.cardTitle}>Nom </Title>
                    <Caption style={{fontFamily:'Nexa-Light'}}>{userData.displayName}</Caption>
                    </View>
                </View>
                
                <View style={styles.userInfoSection}>
                    <View style={styles.icons}>
                        <Icon name="calendar" size={32} color="#0019d4" />
                    </View>
                    <View>
                    <Title style={styles.cardTitle}>Age </Title>
                    <Caption style={{fontFamily:'Nexa-Light'}}> {userData.age? userData.age : 'non défini'}</Caption>
                    </View>
                </View>
                <View style={styles.userInfoSection}>
                    <View style={styles.icons}>
                        <Entypo name="location" size={28} color="#0019d4" />
                    </View>
                    <View>
                    <Title style={styles.cardTitle}>Addresse </Title>
                    <Caption style={{fontFamily:'Nexa-Light'}}> {userData.address}</Caption>
                    </View>
                </View>
                <View style={styles.userInfoSection}>
                    <View style={styles.icons}>
                        <MaterialCommunityIcons name="gender-male-female" size={32} color="#0019d4" />
                    </View>
                    <View >
                    <Title style={styles.cardTitle}>Genre</Title>
                    <Caption style={{fontFamily:'Nexa-Light'}}>{userData.gender}</Caption>
                    </View>
                </View>
                <View style={styles.userInfoSection}>
                    <View style={styles.icons}>
                    <FontAwesome5 name="weight" size={32} color="#0019d4" />
                    </View>
                    <View >
                    <Title style={styles.cardTitle}>Poids actuel</Title>
                    <Caption style={{fontFamily:'Nexa-Light'}}>{userData.weight? userData.weight : 'pas défini'}</Caption>
                    </View>
                </View>
                <View style={styles.userInfoSection}>
                    <View style={styles.icons}>
                    <MaterialCommunityIcons name="human-male-height-variant" size={32} color="#0019d4" />
                    </View>
                    <View >
                    <Title style={styles.cardTitle}>Taille </Title>
                    <Caption style={{fontFamily:'Nexa-Light'}}>{userData.size? userData.size : 'pas défini'}</Caption>
                    </View>
                </View>
                
                <View style={styles.userInfoSection}>
                    <View style={styles.icons}>
                    <MaterialCommunityIcons name="diabetes" size={32} color="#0019d4" />
                    </View>
                    <View >
                    <Title style={styles.cardTitle}>Type de diabètes</Title>
                    <Caption style={{fontFamily:'Nexa-Light'}}>{userData.diabetesType}</Caption>
                    </View>
                </View>
                <View style={styles.userInfoSection}>
                    <View  style={styles.icons}>
                    <Feather name="phone" size={32} color="#0019d4" />
                    </View>
                    <View >
                    <Title style={styles.cardTitle}>GSM </Title>   
                    <Caption style={{fontFamily:'Nexa-Light'}}> {userData.GSM}</Caption>
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
        backgroundColor: '#f8faff',
        justifyContent:'center',
      },
    header:{
        backgroundColor:'#000c66',
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        height:200,
        width:'100%',       
    },
    headerIcon:{
        justifyContent:'center',
        alignItems:'center',
        position:'absolute',
        top:20,
        left:20,
      
      },
    modifier:{
        height:34,
        width:34,
        backgroundColor:"#0019d4",
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
       backgroundColor:'#fff',
       margin:"1%",
       borderRadius:10,
    },
    icons:{
        marginRight: 15,
        justifyContent:'center'
        
    },
    cardTitle:{
        fontFamily:'Marta-Bold',
        color:"#555",
    }
 

  });