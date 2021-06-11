import { ScrollView, StyleSheet, Text,TextInput, View, TouchableOpacity, SafeAreaView } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import {Button } from 'react-native-elements';
import * as React from 'react'; 
import { AntDesign } from '@expo/vector-icons';
import {auth, db} from '../firebase';


export function SettingsScreen({ navigation }){
    
    const [userData, setUserData] = React.useState("");

    const user = auth.currentUser;
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

    const change = async() => {
        alert('ici')
        db.collection('patients').doc(user.email).update({
            weightGoal: userData.weightGoal, 
            
        });

    };

    const submitGlycemie = async(value) => {
        if ( value !== "null" ){
            setUserData({...userData, glycemicUnity:value})
        db.collection('patients').doc(user.email).update({
            glycemicUnity:userData.glycemicUnity, 
            
        });
        }
        else{
            db.collection('patients').doc(user.email).update({
                glycemicUnity:'g/l', 
                
            });
        }
        
    }
    const submitWeight = async(value) => {
        if ( value !== "null" ){
            setUserData({...userData, weightUnity:value})
        db.collection('patients').doc(user.email).update({
            weightUnity:userData.weightUnity,     
        });
        }
        else{
            db.collection('patients').doc(user.email).update({
                weightUnity:'Kg',   
            });
        }
        
    }

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.headerIcon} onPress={() => navigation.openDrawer()}>
                    <AntDesign name="bars" size={24} color="white" />
                </TouchableOpacity>
                <View style={styles.title}>
                    <Text style={{color:'white', fontFamily:'Nexa-Light', fontSize:20}}>Paramètres</Text>
                </View>
            </View>

            <ScrollView contentContainerStyle={{justifyContent:'center', alignItems:'center'}}>
                <View style={styles.cards}>
                    <View style={styles.titleContainer}> 
                        <Text style={styles.cardTitle}>Objectifs </Text>
                    </View> 
                    <TouchableOpacity style={[styles.upperCard, styles.cardsItem]} onPress={() => navigation.navigate('Glycemie')} >
                        <View style={styles.cardText}><Text style={styles.defaultFontFamily}>Glycémie</Text></View>
                    </TouchableOpacity>
                    <View style={[styles.cardsItem, {flexDirection:'row' , flexGrow:1}]} >
                        <View style={{width:"30%",justifyContent:'center'}}>
                            <Text style={styles.defaultFontFamily}>Poids</Text>
                        </View>
                        <View style={{width:"70%",alignItems:'center',flexDirection:'row'}}>
                        <TextInput  
                            style={{width:"100%",height:"100%", backgroundColor:'#f8f8ff', padding :5}}
                            placeholder="Objectif"
                            keyboardType='numeric'
                            autoFocus
                            type="text"
                            value={userData.weightGoal}
                            onChangeText={(text) => setUserData( {...userData, weightGoal: text })}
                            placeholderTextColor="#057dcd"
                            />
                        <Button  type='outline'  
                            containerStyle={{width:"30%",position:'absolute', bottom:2,right:2}}
                            title="changer"
                            onPress={change}
                            />
                        </View>
                    </View>
                    </View>
                    
                    <View style={styles.cards}>
                        <View style={styles.titleContainer}> 
                            <Text style={styles.cardTitle}>Unités </Text>
                        </View> 
                        <View  style={[styles.pickerItem, styles.upperCard]}>
                            <View style={styles.pickerText}><Text style={styles.defaultFontFamily}>Glycémie</Text></View>
                            <View >
                                <RNPickerSelect  onValueChange={(value) => submitGlycemie(value)} 
                                placeholder={{
                                    label: 'par défaut (g/l)',
                                    value: 'null',
                                    color:'grey'
                                }}
                                style={pickerSelectStyles}
                                useNativeAndroidPickerStyle={false}
                                items={[
                                    { label: 'g/l', value: 'g/l' },
                                    { label: 'mmol/l', value: 'mmol/l'  },
                                ]} />
                            </View>
                        </View>
                        <View  style={styles.pickerItem}>
                            <View style={styles.pickerText}><Text style={styles.defaultFontFamily}>Poids</Text></View>
                            <View >
                                <RNPickerSelect   onValueChange={(value) => submitWeight(value)} 
                                style={pickerSelectStyles}
                                useNativeAndroidPickerStyle={false}
                                placeholder={{
                                    label: 'par défaut (Kg)',
                                    value: 'null',
                                    color:'grey'
                                }}
                                items={[
                                    { label: 'Kg', value: 'Kg' },
                                    { label: 'lbs', value: 'lbs' },
                                    ]} />
                            </View>
                        </View>
                    </View> 

                    <View style={[styles.cards , {height:120}]}>
                        <View style={styles.titleContainer}> 
                            <Text style={styles.cardTitle}>Notifications </Text>
                        </View> 
                        <TouchableOpacity style={styles.cardsItem}>
                            <View style={styles.cardText}><Text style={styles.defaultFontFamily}>Rappel</Text></View>
                        </TouchableOpacity>
                    </View>     
                    <View style={styles.cards}>
                        <View style={styles.titleContainer}> 
                            <Text style={styles.cardTitle}>Autres </Text>
                        </View> 
                        <TouchableOpacity style={[styles.cardsItem, styles.upperCard]}>
                            <View style={styles.cardText}><Text style={styles.defaultFontFamily}>Contacter</Text></View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.cardsItem}>
                            <View style={styles.cardText}><Text style={styles.defaultFontFamily}>A propos</Text></View>
                        </TouchableOpacity>
                    </View>        
            </ScrollView>
    </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    defaultFontFamily:{
        fontFamily:'Nexa-Light'
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
        height:70,
        width:'100%',       
    },
    headerIcon:{
        justifyContent:'center',
        alignItems:'center',
        position:'absolute',
        top:20,
        left:20,
      },
    title:{
        width:"60%",
        justifyContent:'center'
    },
    cards:{
        width:"100%",
        height:200,
        backgroundColor:'white',
        justifyContent:'center',
        alignItems:'flex-start',
    },
    titleContainer:{
        paddingLeft:10,
        width:"100%",
        flex:1,
        justifyContent:'center',
        backgroundColor:'#F8FAFF'
    },
    cardTitle:{
        fontFamily:'Marta-Regular',
        color:"#18398D",
        fontSize:16,
    },
    cardsItem:{
        flex:1,
        paddingLeft:10,
        justifyContent:'center',
        width:"100%",
        backgroundColor:'#FFF',
    },
    cardText:{
        fontSize:15,
        width:'100%',
        justifyContent:'center',
        fontFamily:'Nexa-Light',
    },
    upperCard:{
        borderBottomColor:'#F8FAFF',
        borderBottomWidth:2
    },
    pickerItem:{
        flex:1,
        justifyContent:'center',
        width:"100%",
        flexDirection:'row',
    },
    pickerText:{
        fontSize:15,
        flex:1,
        paddingLeft:10,
        justifyContent:'center',
        backgroundColor:'#FFF'
    },
  });
  
  const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      fontFamily:'Nexa-Bold',
      fontSize:12,
      color: '#145da0',
      justifyContent:'center',
      textAlign:'center',
      width:80,
      height:"100%",
      borderColor:"#ddd",
      borderLeftWidth:1,
      backgroundColor:'#FFF'
    },
    inputAndroid: {
        fontFamily:'Nexa-Bold',
        fontSize:12,
        color: '#145da0',
        justifyContent:'center',
        textAlign:'center',
        width:80,
        height:"100%",
        borderColor:"#ddd",
        borderLeftWidth:1,
        backgroundColor:'#FFF'
    },

  });