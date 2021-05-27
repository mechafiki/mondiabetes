import { TextInput, StyleSheet, View, ActivityIndicator } from 'react-native';
import * as React from 'react';
import { useEffect} from 'react';
import { Button} from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons'; 
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import RNPickerSelect from 'react-native-picker-select';
import { useFonts } from '@expo-google-fonts/inter';
import {auth, db} from '../firebase';



export function SignUpPage2({ navigation }){

 
  let [fontsLoaded] = useFonts({
      'Nexa-Bold': require('../assets/fonts/Nexa-Bold.otf'),
      'Nexa-Light': require('../assets/fonts/Nexa-Light.otf'),
  });

  if (!fontsLoaded) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  
    
    return (
      <ScrollView contentContainerStyle={styles.container}>
         
          <View style={styles.inputView} >
          <TextInput  
          style={styles.inputText}
          placeholder="votre e-mail"
          type="email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholderTextColor="#057dcd"
          />
          </View>

          <View style={styles.inputView} >
            <TextInput
          style={styles.inputText}
          placeholder="choisissez un mot de passe" 
          type="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
          placeholderTextColor="#057dcd"
          />
          </View>
          <View style={styles.inputView} >
          <TextInput  
          style={styles.inputText}
          placeholder="GSM ( optionel )"
          type="text"
          value={phone}
          onChangeText={(text) => setPhone(text)}
          placeholderTextColor="#057dcd"
          />
          </View>
          <View style={styles.inputView } >
          
            <View >
              <RNPickerSelect 
              style={pickerSelectStyles}
              useNativeAndroidPickerStyle={false}
              placeholder={{
                label: 'Type de diabètes',
                value: null,
                color:'grey'
              }}
              value={diabetes}
              onValueChange={(value) => setDiabetes(value)}
                items={[
                    { label: 'Type 1', value: 'type1' },
                    { label: 'Type 2', value: 'type2' },
                    { label: 'Diabète de grossesse', value: 'grossesse' },
                ]}
              />
            </View>
          </View>
          
          <Button title="S'inscrire" 
          containerStyle={[styles.Btn , {marginTop:30}]}
          titleStyle={{fontFamily:'Nexa-Bold'}} 
          onPress={signup}/>
          
        <Button  title="Retour" type='outline' 
        containerStyle={styles.Btn}
        titleStyle={{fontFamily:'Nexa-Bold' , color:"white"}}
        onPress={() => navigation.navigate('LogIn')} />
      </ScrollView>
  );
  }


  const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: '#f8faff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    avatarPlaceholder:{
      position:'relative',
      width:100,
      height:100,
      borderRadius:50,
      backgroundColor:'#bfe5fd',
      display:'flex',
      justifyContent:'center',
      alignItems:'center'
    },
    avatar:{
      position:'absolute',
      width:100,
      height:100,
      borderRadius:50,
    },
    inputView:{
      width:"80%",
      backgroundColor:"white",
      borderRadius:10,
      height:50,
      marginBottom:10,
      justifyContent:"center",
      paddingLeft:20,
    },
    inputText:{
      height:50,
      color:"black",
      fontFamily:'Nexa-Light',
      fontSize:16
    },
    Btn:{
      width:"50%",
      marginBottom:15,
      backgroundColor:'#000c66'
    },
    selectGender:{
      width:'80%',
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between'
    },
    genderInputView:{
      width:'100%',
      backgroundColor:"white",
      height:50,
      marginBottom:20,
      justifyContent:"center",
      paddingLeft:20,
    },

  });

  const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      fontFamily:'Nexa-Bold',
      fontSize:12,
      borderRadius: 8,
      color: '#145da0',
      justifyContent:'center',
      display:'flex',
      alignItems:'center',
      paddingRight: 30,
      height:50
    },
    inputAndroid: {
      fontFamily:'Nexa-Light',
      fontSize:16,
      borderRadius: 8,
      color: '#000c66',
      justifyContent:'center',
      display:'flex',
      alignItems:'center',
      paddingRight: 30,
      height:50
    },

  });