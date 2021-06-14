import { SafeAreaView,StyleSheet, Text,View,Image,TextInput,TouchableOpacity, ScrollView} from 'react-native';
import { Button} from 'react-native-elements';
import * as React from 'react';
import {auth, db} from '../firebase';
import { useEffect} from 'react';
import {Avatar} from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import RNPickerSelect from 'react-native-picker-select';


export function updateProfile({ navigation }){
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

  useEffect(() => {
      getUser();
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
      setUserData({ ...userData, profilePic : result.uri});
    }
  };

  const submit = () => {
    const expression = /(\+212|0)(6|7)([ \-_/]*)(\d[ \-_/]*){8}/g;
    if ( !expression.test(String(userData.GSM))){
        alert('GSM incorrect')
    }
    else{
      db.collection('patients').doc(auth.currentUser.email).update({
        displayName:userData.displayName,
        email:userData.email,
        address:userData.address,
        age:userData.age,
        GSM:userData.GSM,
        diabetesType:userData.diabetesType,
        profilePic:userData.profilePic,
        size:userData.size,
        weight:userData.weight,
      })
      user.updateEmail(userData.email)
      .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        alert('E-mail déjà utilisé');
      }
  
      if (error.code === 'auth/invalid-email') {
        alert('E-mail invalide');
      }
    });
    navigation.goBack();
    }

  };

    return(
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={{justifyContent:'center', alignItems:'center',paddingBottom:30}}
             > 
            <View style={{height:30}}></View>
             <TouchableOpacity style={styles.avatarPlaceholder} onPress={pickImage}>
             <Avatar
                    title={userData.displayName? userData.displayName[0] : null } 
                    rounded
                    size={100}
                    source={{
                      uri : userData.profilePic? userData.profilePic : null 
                    }}
                />
             </TouchableOpacity>
             <TouchableOpacity  onPress={pickImage}>
               <Text style={{color:"#888", fontFamily:'Nexa-Bold', marginBottom:20}}>changer</Text>
             </TouchableOpacity>

            <View style={styles.userInfoSection}>
                <TextInput
                style={styles.inputText}
                placeholder={userData.displayName? userData.displayName : 'nom complet' }
                type="text"
                value={userData.displayName}
                onChangeText={(txt) => setUserData({ ...userData, displayName : txt})}
                placeholderTextColor="#057dcd"
                />

            </View>
            <View style={styles.userInfoSection}>
                <TextInput
                style={styles.inputText}
                placeholder={userData.email? userData.email : 'email'}
                type="text"
                value={userData.email}
                onChangeText={(txt) => setUserData({ ...userData, email : txt})}
                placeholderTextColor="#057dcd"
                />

            </View>
            <View style={styles.userInfoSection}>
                <TextInput
                style={styles.inputText}
                placeholder={userData.address? userData.address : 'Adresse'}
                type="text"
                value={userData.address}
                onChangeText={(txt) => setUserData({ ...userData, address : txt})}
                placeholderTextColor="#057dcd"
                />

            </View>
            <View style={styles.userInfoSection}>
                <TextInput
                style={styles.inputText}
                placeholder={userData.age? userData.age : 'Age'}
                keyboardType = 'numeric'
                type="number"
                value={userData.age}
                onChangeText={(txt) => setUserData({ ...userData, age : txt})}
                placeholderTextColor="#057dcd"
                />

            </View>
            <View style={styles.userInfoSection}>
                <TextInput
                style={styles.inputText}
                placeholder={userData.weight? userData.weight : 'Poids'}
                keyboardType = 'numeric'
                type="number"
                value={userData.weight}
                onChangeText={(txt) => setUserData({ ...userData, weight : txt})}
                placeholderTextColor="#057dcd"
                />

            </View>
            <View style={styles.userInfoSection}>
                <TextInput
                style={styles.inputText}
                placeholder={userData.size? userData.size : 'Taille'}
                keyboardType = 'numeric'
                type="number"
                value={userData.size}
                onChangeText={(txt) => setUserData({ ...userData, size : txt})}
                placeholderTextColor="#057dcd"
                />

            </View>
            <View style={styles.userInfoSection}>
                <TextInput
                style={styles.inputText}
                placeholder={userData.GSM? userData.GSM : 'GSM'}
                keyboardType = 'numeric'
                type="number"
                value={userData.GSM}
                onChangeText={(txt) => setUserData({ ...userData, GSM : txt})}
                placeholderTextColor="#057dcd"
                />

            </View>
            <View style={styles.userInfoSection}>
            <RNPickerSelect 
              style={pickerSelectStyles}
              useNativeAndroidPickerStyle={false}
              placeholder={{
                label: 'Type de diabètes',
                value: null,
                color:'#057dcd'
              }}
              value={userData.diabetesType}
              onValueChange={(txt) => setUserData({ ...userData, diabetesType : txt})}
                items={[
                    { label: 'Type 1', value: 'type1' },
                    { label: 'Type 2', value: 'type2' },
                    { label: 'Diabète de grossesse', value: 'grossesse' },
                ]}
              />
            </View>
            <Button title="valider"
            titleStyle={{color:'#fff',fontFamily:'Nexa-Bold'}}
            containerStyle={styles.Btn} 
            type='outline'
            onPress={submit} 
            />    
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
      avatarPlaceholder:{
        width:100,
        height:100,
        borderRadius:50,
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
      },
      avatar:{
        position:'absolute',
        width:100,
        height:100,
        borderRadius:50,
        backgroundColor:'grey'
      },
    userInfoSection:{
      width:"90%",
      backgroundColor:"white",
      borderRadius:10,
      height:50,
      marginBottom:10,
      justifyContent:"center",
      paddingLeft:20,
    },
    icons:{
        marginRight: 15,
        justifyContent:'center' 
    },
    cardTitle:{
        fontFamily:'Marta-Bold',
        color:"#555",
    },
    inputText:{
      height:50,
      color:"black",
      fontFamily:'Nexa-Light',
      fontSize:16
    },
    Btn:{
      width:"30%",
      marginTop:15,
      backgroundColor:'#000c66'
    }

  });
  const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      fontFamily:'Nexa-Light',
      fontSize:12,
      borderRadius: 8,
      color: '#000',
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
      color: '#000',
      justifyContent:'center',
      display:'flex',
      alignItems:'center',
      paddingRight: 30,
      height:50
    }

  });