import * as React from 'react';
import * as Animatable from 'react-native-animatable';
import { Text,SafeAreaView,StyleSheet, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export function AccountType({navigation}){
    return(
      <SafeAreaView style={{flexGrow:1, backgroundColor:"#fff", padding:20,justifyContent:'center',backgroundColor:"#f8faff"}}>
        <StatusBar style="light" backgroundColor="#000c66" />
        <Animatable.View animation="fadeInLeft"  >
          <Text style={{fontFamily:'Nexa-Bold', fontSize:26, color:"#000c66", marginBottom:30 }} >
            Choisissez le type du compte
          </Text>
        <TouchableOpacity  style={styles.type} onPress={() => navigation.navigate('PatientSignUp')} >
            <Text style={styles.accountType}>Patient</Text>
        </TouchableOpacity>
        <TouchableOpacity  style={styles.type} onPress={() => navigation.navigate('DoctorSignUp')}>
            <Text style={styles.accountType} >Médecin</Text>
        </TouchableOpacity>
        </Animatable.View>
        
    
      </SafeAreaView>
    );
    }

    const styles = StyleSheet.create({
        container: {
          flexGrow: 1,
          backgroundColor: '#f8faff',
          alignItems: 'center',
          justifyContent: 'center',
        },
        type:{
          width:"90%",
          height:100,
          borderRadius:10,
          marginTop:10,
          justifyContent:'center',
          backgroundColor:"#057dcd",
          padding:5
        },
        accountType:{
          fontFamily:'Nexa-Light',
          color:"#fff",
          fontSize:20
        }
      });