import {  ActivityIndicator, ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import * as React from 'react';
import { Button} from 'react-native-elements';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons'; 
import { useFonts } from '@expo-google-fonts/inter';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons'; 
import {auth, db} from '../firebase';
import { SafeAreaView } from 'react-native-safe-area-context';


export function DashboardScreen({ navigation }){
    
    const user = auth.currentUser;
    const [userData, setUserData] = React.useState(null);
    const getUser = async() => {
        db.collection('users').doc(user.uid).get()
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
        'Marta-Bold': require('../assets/fonts/Marta-Bold.otf'),
        'Marta-Regular': require('../assets/fonts/Marta-Regular.otf'),

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
           

            <View style={styles.header}>
                <TouchableOpacity style={styles.headerIcon} onPress={() => navigation.openDrawer()}>
                    <AntDesign name="bars" size={24} color="white" />
                </TouchableOpacity>
                <View style={styles.title}>
                    <Text style={{color:'white', fontFamily:'Nexa-Light', fontSize:20}}>Tableau de bord</Text>
                </View>
            </View>
            
            <ScrollView contentContainerStyle={{justifyContent:'center', alignItems:'center', padding:10}}>
                <View style={styles.cards}>
                    <Text style={styles.cardTitle}>Glucose Sanguin</Text>
                    <TouchableOpacity style={{justifyContent:'center',alignItems:'center' , marginBottom:30}}>
                        <Ionicons name="add-circle-outline" size={30} color="#000c66" />
                        <Text style={styles.cardText}>Ajouter la mesure du glucose</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{justifyContent:'center',alignItems:'center'}}>
                        <MaterialCommunityIcons name="history" size={30} color="#000c66" />
                        <Text style={styles.cardText}>Consulter l'historique</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.cards}>
                    <Text style={styles.cardTitle}> Nutrition</Text>
                    <TouchableOpacity style={{justifyContent:'center',alignItems:'center' , marginBottom:30}}>
                    <MaterialCommunityIcons name="food" size={30} color="#000c66" />
                        <Text style={styles.cardText}>Ajouter un repas</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{justifyContent:'center',alignItems:'center'}}>
                        <MaterialCommunityIcons name="water-outline" size={30} color="#000c66" />
                        <Text style={styles.cardText}>Hydratation</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.cards}>
                    <Text style={styles.cardTitle}>Activités physiques</Text>
                    <TouchableOpacity style={{justifyContent:'center',alignItems:'center' , marginBottom:30}}>
                        <MaterialIcons name="directions-run"  size={30} color="#000c66" />
                        <Text style={styles.cardText}>Ajouter une activité</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{justifyContent:'center',alignItems:'center'}}>
                        <MaterialCommunityIcons name="history" size={30} color="#000c66" />
                        <Text style={styles.cardText}>Consulter l'historique</Text>
                    </TouchableOpacity>
                </View>
                <View style={[styles.cards, {height:150}]}>
                    <Text style={styles.cardTitle}>Poids</Text>
                        <Text style={[styles.cardText, {position:'absolute', top:50, left:20}]}>Poids actuel : 70 Kg</Text>
                    <TouchableOpacity style={{justifyContent:'center',alignItems:'center', position:'absolute', bottom:30, right:30}}>
                        <Button  type="outline" 
                                title='changer' 
                                containerStyle={{backgroundColor:'#000c66'}}
                                titleStyle={{fontFamily:'Nexa-Light', color:"white", fontSize:16}}
                                 />
                    </TouchableOpacity>
                </View>
                
                

                <ActivityIndicator size='large' color='black'/>
            
            </ScrollView>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8faff',
        justifyContent: 'center',

      },
      header:{
          flexDirection:'row',
          width:'100%',
          display:'flex',
          alignItems:'flex-start',
          justifyContent:'flex-start',
          backgroundColor:'#000c66',
          height:60,
          
      },
      title:{
        flexGrow:1, 
        height:"100%", 
        justifyContent:'center', 
        alignItems:'flex-start',
        marginLeft:"5%"
      },
      headerIcon:{
        height:"100%",
        width:"15%",
        marginLeft:'2%', 
        justifyContent:'center',
        alignItems:'center'
      },
      cards:{
          width:"90%",
          padding:10,
          height:200,
          margin:5,
          borderRadius:20,
          backgroundColor:'white',
          justifyContent:'center',
          alignItems:'center',
         // backgroundColor:'#7ec8e3',
          shadowColor: '#000c66',
          shadowOffset: {
            width: 0,
            height: 3
           },
          shadowRadius: 3,
          shadowOpacity: .4
      },
      cardTitle:{
          position:'absolute', 
          top:15,
          left:15, 
          fontFamily:'Marta-Regular', 
          color:'#666'
        },
      cardText:{
          fontFamily:'Nexa-Light', 
          fontSize:14, color:"#0000ff", 
          marginTop:10
       }
    
    });
