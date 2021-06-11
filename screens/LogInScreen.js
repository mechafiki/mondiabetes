import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import {  TouchableOpacity ,TextInput , StyleSheet, Text, View , ActivityIndicator, ScrollView} from 'react-native';
import { Button} from 'react-native-elements';
import { useFonts } from '@expo-google-fonts/inter';
import {auth} from '../firebase';


export function LogInScreen({ navigation }) {

 

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    React.useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
          if(authUser){
            
              navigation.replace('Home');
          }
        });

        return unsubscribe;

    }, []);

    const signin = () => {
      auth
      .signInWithEmailAndPassword(email, password)
      .catch(error => {
        alert(error);
        if (error.code === 'auth/email-already-in-use') {
          alert('E-mail déjà utilisé');
        }
        if (error.code === 'auth/invalid-email') {
          alert('E-mail invalide');
        }
        if ( error.code === 'auth/invalid-password'){
            alert('mot de passe invalide');
        }
       
      });
      

    };

    let [fontsLoaded] = useFonts({
      'Nexa-Bold': require('../assets/fonts/Nexa-Bold.otf'),
      'Nexa-Light': require('../assets/fonts/Nexa-Light.otf'),
      'Marta-Bold': require('../assets/fonts/Marta-Bold.otf'),
      'Marta-Regular': require('../assets/fonts/Marta-Regular.otf'),
      
      


    });
  
    if (!fontsLoaded) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    } 



    return (  
        <ScrollView contentContainerStyle={styles.container} >
          <Text style={styles.title}>MonDiabètes</Text>
          <View style={[styles.inputView, {marginTop:30}]}  >
            <TextInput  
                style={styles.inputText}
                placeholder="e-mail"
                type="email"
                placeholderTextColor="#057dcd"
                value={email}
                onChangeText={text => setEmail(text)}
                />
          </View>
            <View style={styles.inputView} >
            <TextInput
                style={styles.inputText}
                placeholder="mot de passe"
                type="password" 
                secureTextEntry
                placeholderTextColor="#057dcd"
                value={password}
                onChangeText={text => setPassword(text)}
                />
            </View>
            <TouchableOpacity> 
              <Text style={styles.forgot}>Mot de passe oublié?</Text>
            </TouchableOpacity>
            <Button containerStyle={styles.Btn} 
            titleStyle={{fontFamily:'Nexa-Bold'}}
            onPress={signin} title="Connexion" />
            <Text style={styles.noaccount}>Vous n'avez pas de compte?</Text>
            <Button containerStyle={styles.Btn}
            type='outline' title="Créer un compte"
            titleStyle={{fontFamily:'Nexa-Bold', color:"white"}}
            onPress={() => navigation.navigate('AccountType')} />
            <StatusBar style="light" backgroundColor="#145da0" />
        </ScrollView>
      );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f8faff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    title:{
      fontFamily:'Nexa-Bold',
      fontSize:40,
      color:'#000c66',
      marginBottom:20
    },
    inputView:{
      width:"80%",
      backgroundColor:"white",
      height:50,
      borderRadius:10,
      marginBottom:20,
      paddingLeft:20,
      borderStyle:'solid',
      justifyContent:"center",
    },
    inputText:{
      height:50,
      color:"black",
      fontFamily:'Nexa-Light'
    },
    forgot:{
      color:"#123175",
      fontSize:13,
      margin: 20,
      fontFamily:'Nexa-Bold'
    },
    noaccount:{
      color:"#000",
      fontSize:13,
      marginBottom: 10,
      fontFamily:'Nexa-Bold'
    },
    Btn:{
      width:"50%",
      marginBottom:20,
      backgroundColor:'#000c66'
      
    }
  
  });