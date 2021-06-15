import { ScrollView, TouchableOpacity, TextInput ,StyleSheet, Image, View, ActivityIndicator } from 'react-native';
import * as React from 'react';
import { useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button} from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons'; 
import RNPickerSelect from 'react-native-picker-select';
import { useFonts } from '@expo-google-fonts/inter';
import {auth, db} from '../firebase';
import * as ImagePicker from 'expo-image-picker';


export function PatientSignUp({ navigation }){
  const [avatar , setAvatar] = React.useState(null);
  const [gender , setGender] = React.useState(null);
  const [name, setName] = React.useState(null);
  const [email , setEmail] = React.useState(null);
  const [password , setPassword] = React.useState(null);
  const [confirmPassword, setConfirmPassword] = React.useState(null);
  const [phone, setPhone] = React.useState(null);
  const [diabetes, setDiabetes] = React.useState(null);

  useEffect(() => {
 
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert("monDiabète a besion d'utiliser votre caméra");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setAvatar(result.uri);
    }
  };


  const signup = async() => {

    const expression = /(\+212|0)(6|7)([ \-_/]*)(\d[ \-_/]*){8}/g;

      if ( !gender){
        alert("Veuiller spécifier votre genre");
      }
      else if( !name ){
        alert("Le champ nom complet est obligatoire");
      }
      else if( !email){
        alert("Le champ email complet est obligatoire");
      }
      else if( !password){
        alert("Veuiller choisir un mot de passe");
      }
      else if (!confirmPassword){
        alert("Une confiration du mot de passe est demandée");
      }
      else if( confirmPassword !== password ){
        alert("Les mots de passes ne correspondent pas");
      }
      else if( !diabetes){
        alert("Veuiller spécifier votre type de diabètes");
      }
      else if ( diabetes === 'grossesse' && gender === 'homme'){
        alert("Veuiller vérifier vos informations");
      }
      else if( !expression.test(String(phone)) && phone ){
        alert("GSM incorrect");
      }
      else{

        auth.createUserWithEmailAndPassword(email, password)
        .then((authUser) => {
            authUser.user.updateProfile({
                displayName: name,
            })
          db.collection('patients').doc(auth.currentUser.email).set({
                accountType: 'patient',
                displayName: name,
                email: email,
                GSM: phone,
                gender:gender,
                diabetesType: diabetes,
                profilePic: avatar,
                address:'',
                age:'',
                weight:'',
                size:'',
                activityUnity:'Km',
                weightUnity:'Kg',
                weightGoal:'',
                glycemicUnity:'g/l',
                minGlycemieBeforeMeal:'',
                maxGlycemieBeforeMeal:'',
                minGlycemieAfterMeal:'',
                maxGlycemieAfterMeal:'',      
              });
            }
            )
            .catch(error => {
              if (error.code === 'auth/email-already-in-use') {
                alert('E-mail déjà utilisé');
              }
              
              if (error.code === 'auth/invalid-email') {
                alert('E-mail invalide');
              }
              if (error.code === 'auth/weak-password') {
                alert('mot de passe faible');
              }
            });
          }  
      }

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
             <TouchableOpacity style={styles.avatarPlaceholder} onPress={pickImage}>
               <Ionicons name="ios-add" size={40} color="white" />
             <Image source={{ uri: avatar }} style={styles.avatar} />
             </TouchableOpacity>
          <View style={[styles.inputView , {marginTop:30}]} >
          
            <View style={styles.selectGender}>
              <RNPickerSelect 
              style={pickerSelectStyles}
              useNativeAndroidPickerStyle={false}
              placeholder={{
                label: 'genre',
                value: null,
                color:'grey'
              }}
              value={gender}
              onValueChange={(value) => setGender(value)}
                items={[
                    { label: 'Mr.', value: 'homme' },
                    { label: 'Mme.', value: 'femme' },
                ]}
              />
            
              <View style={styles.genderInputView } >
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
            </View>
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
          placeholder="confirmez votre mot de passe" 
          type="password"
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
          secureTextEntry={true}
          placeholderTextColor="#057dcd"
          />
          </View> 
          <View style={styles.inputView} >
          <TextInput  
          style={styles.inputText}
          placeholder="GSM "
          keyboardType="numeric"
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
          containerStyle={[styles.Btn , {marginTop:10}]}
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
    selectGender:{
      width:'75%',
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
    inputView:{
      width:"80%",
      backgroundColor:"white",
      borderRadius:10,
      height:50,
      marginBottom:7,
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
      marginBottom:10,
      backgroundColor:'#000c66'
    }   
  });

  const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      fontFamily:'Nexa-Light',
      fontSize:12,
      borderRadius: 8,
      color: '#000c66',
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