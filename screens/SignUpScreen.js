import { TextInput  , StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import * as React from 'react';
import { Button} from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { useFonts } from '@expo-google-fonts/inter';
import {auth} from '../firebase';


export function SignUpScreen({ navigation }){

  const [name, setName] = React.useState("");
  const [email , setEmail] = React.useState("");
  const [password , setPassword] = React.useState("");
  const [confirmPassword , setConfirmPassword] = React.useState("");

  const signup = () => {
    auth
    .createUserWithEmailAndPassword(email, password)
    .then((authUser) => {
        authUser.user.updateProfile({
            displayName: name
        });
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        alert('E-mail déjà utilisé');
      }
  
      if (error.code === 'auth/invalid-email') {
        alert('E-mail invalide');
      }

    });
  };

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
          <View style={{height:30}}></View>
          <Text style={styles.title}>Créer un compte</Text>
          <View style={[styles.inputView , {marginTop:30}]} >
          <TextInput  
          style={styles.inputText}
          placeholder="nom complet "
          autoFocus
          type="text"
          value={name}
          onChangeText={(text) => setName(text)}
          placeholderTextColor="#057dcd"
          />
          </View>
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
          placeholder="confirmer votre mot de passe" 
          type="password"
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
          secureTextEntry={true}
          placeholderTextColor="#057dcd"
          onSubmitEditing={signup}
          />
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
    title:{
      fontFamily:'Nexa-Bold',
      fontSize:30,
      color:'#24a0ed'
    },
    inputView:{
      width:"80%",
      backgroundColor:"white",
      borderRadius:10,
      height:50,
      marginBottom:20,
      justifyContent:"center",
      paddingLeft:20,
    },
    inputText:{
      height:50,
      color:"black",
      fontFamily:'Nexa-Light'
  
    },
    forgot:{
      color:"#123175",
      fontSize:13,
      marginBottom: 20
    },
    Btn:{
      width:"50%",
      marginBottom:15,
      backgroundColor:'#E1341E'
    },
  });