import { TextInput  , StyleSheet, Image, Text, View, ActivityIndicator, NativeModules } from 'react-native';
import * as React from 'react';
import { useEffect} from 'react';
import { Button} from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons'; 
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import RNPickerSelect from 'react-native-picker-select';
import { useFonts } from '@expo-google-fonts/inter';
import {auth, firebase} from '../firebase';
import * as ImagePicker from 'expo-image-picker';

export function SignUpScreen({ navigation }){
  const [avatar , setAvatar] = React.useState(null);
  const [gender , setGender] = React.useState("");
  const [name, setName] = React.useState("");
  const [email , setEmail] = React.useState("");
  const [ phone, setPhone] = React.useState("");
  const [password , setPassword] = React.useState("");

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


  const signup = () => {

  
    auth
    .createUserWithEmailAndPassword(email, password)
    .then((authUser) => {
          authUser.user.updateProfile({
            displayName: name,
            userImg: avatar
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
                    { label: 'Mr.', value: 'male' },
                    { label: 'Mme.', value: 'female' },
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
          placeholder="GSM"
          type="text"
          value={phone}
          onChangeText={(text) => setPhone(text)}
          placeholderTextColor="#057dcd"
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
      marginBottom:20,
      justifyContent:"center",
      paddingLeft:20,
    },
    inputText:{
      height:50,
      color:"black",
      fontFamily:'Nexa-Light',
      fontSize:16
      
  
    },
    pickerInputText:{
      color:"#057dcd",
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
      backgroundColor:'#145da0'
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
      borderRadius:10,
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
      fontFamily:'Nexa-Bold',
      fontSize:16,
      borderRadius: 8,
      color: '#145da0',
      justifyContent:'center',
      display:'flex',
      alignItems:'center',
      paddingRight: 30,
      height:50
    },

  });