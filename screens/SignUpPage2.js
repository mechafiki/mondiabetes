import { TextInput, StyleSheet,Text, View, ActivityIndicator } from 'react-native';
import * as React from 'react';
import { useEffect} from 'react';
import { Button} from 'react-native-elements';
import { useFonts } from '@expo-google-fonts/inter';
import {auth, db} from '../firebase';


export function SignUpPage2({ navigation }){
  const user = auth.currentUser;
  const [userData, setUserData] = React.useState("");

  const getUser = async() => {
      db.collection('users').doc(user.uid).get()
      .then((documentSnapchot) => {
          if ( documentSnapchot.exists){
              setUserData(documentSnapchot.data());
          }
      })
  }
  useEffect(() => {
    getUser();
  }, []);

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
  
  const submit = async() => {
    if ( userData.address === '' ){
      alert('Veuillze spécifier votre adresse');
    }
    else{
      if ( userData.age < 0 || userData.age === '' ){
        alert('Veuillze spécifier votre age');
      }
      else{
        if(userData.weight < 5 || userData.age === '' ){
          alert('Veuillez spécifier votre poids');
        }
        else{
          if ( userData.size === '' || userData.size < 46 ){
              alert('Veuillze spécifier votre taille')
          }
          else{
            db.collection('users').doc(user.uid).update({
              address: userData.address,
              age: userData.age,
              size: userData.size,
              weight: userData.weight
        
            });
          }
        }
      }
    }
    


  }
    
    return (
      <View style={styles.container}>
           <Text style={styles.title}>Compléter votre profil</Text>
         <View style={styles.inputView} >
          <TextInput  
          style={styles.inputText}
          placeholder="Adresse"
          type="text"
          value={userData.address}
          onChangeText={(text) => setUserData({...userData, address : text })}
          placeholderTextColor="#057dcd"
          />
          </View>
          <View style={styles.inputView} >
          <TextInput  
          style={styles.inputText}
          placeholder="Age"
          keyboardType = 'numeric'
          type="number"
          value={userData.age}
          onChangeText={(text) => setUserData({...userData, age : text })}
          placeholderTextColor="#057dcd"
          />
          </View>
          <View style={styles.inputView} >
          <TextInput  
          style={styles.inputText}
          placeholder="Poids (en Kg)"
          keyboardType = 'numeric'
          type="number"
          value={userData.weight}
          onChangeText={(text) => setUserData({...userData, weight : text })}
          placeholderTextColor="#057dcd"
          />
          </View>
          <View style={styles.inputView} >
          <TextInput  
          style={styles.inputText}
          placeholder="Taille (en cm)"
          keyboardType = 'numeric'
          type="number"
          value={userData.size}
          onChangeText={(text) => setUserData({...userData, size : text })}
          placeholderTextColor="#057dcd"
          />
          </View>
         
          <Button title="Valider et continuer" 
          containerStyle={[{width:"50%",marginTop:30}]}
          titleStyle={{fontFamily:'Nexa-Bold'}} 
          onPress={submit}
          />
      </View>
  );
  }


  const styles = StyleSheet.create({
    container: {
      flex:1,
      backgroundColor: '#f8faff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    title:{
      color:"#000c66",
      fontFamily:'Nexa-Bold',
      fontSize:30,
      margin:30,
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
    }
    
  });
