import {SafeAreaView,TextInput, Text , StyleSheet,View,TouchableOpacity } from 'react-native';
import * as React from 'react';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import {auth, db} from '../../firebase';
import { ScrollView } from 'react-native';

export function GlycemieScreen({ navigation }){
    
    const [userData, setUserData] = React.useState("");
    const user = auth.currentUser;
    const getUser = async() => {
       await db.collection('patients').doc(user.email).get()
        .then((documentSnapchot) => {
            if ( documentSnapchot.exists){
                setUserData(documentSnapchot.data());
            }
        })
    }

    React.useEffect(() => {
            getUser();
    }, [])

    const  submit = () => {
        db.collection('patients').doc(user.email).update({
              minGlycemieBeforeMeal:userData.minGlycemieBeforeMeal,
              maxGlycemieBeforeMeal:userData.maxGlycemieBeforeMeal,
              minGlycemieAfterMeal:userData.minGlycemieAfterMeal,
              maxGlycemieAfterMeal: userData.maxGlycemieAfterMeal,
            
        });
        alert('Votre objectif est modifiée ');
        navigation.goBack();
    };

    return (
        <SafeAreaView style={{flex:1, backgroundColor:"#f8faff"}}>
           <View style={styles.header}>
                <TouchableOpacity style={styles.headerIcon} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <View style={styles.title}>
                    <Text style={{color:'white', fontFamily:'Nexa-Light', fontSize:20}}>Objectif glycémique</Text>
                </View>
                <TouchableOpacity  style={styles.submit} onPress={submit}>
                    <Text style={styles.submitText}>Valider</Text>
                </TouchableOpacity>
            </View>
        <ScrollView contentContainerStyle={styles.container}>

            <View style={{width:"100%",padding:10}}>
                <Text style={styles.cardTitle}>Avant le repas</Text>
            </View>
            <View style={{width:'100%', flexDirection:'row',height:40}}>    
                <View style={styles.beforeORafter}>
                    <Text style={styles.valTitle}>Min / Max : ({userData.glycemicUnity? userData.glycemicUnity : '(unité pas défini)'})</Text>
                </View>
                <View style={{height:30,width:120,flexDirection:'row' ,position:'absolute',top:10,right:10}}>
                    <View style={styles.val}>
                        <Text style={styles.valText}>{userData.minGlycemieBeforeMeal? userData.minGlycemieBeforeMeal: '0.70'}</Text>
                    </View>
                    <View style={styles.val}>
                        <Text style={styles.valText}>{userData.maxGlycemieBeforeMeal? userData.maxGlycemieBeforeMeal : '1.40'}</Text>
                    </View>
                </View>
            </View>
            <View style={{flexDirection:'row'}}>
                <Slider thumbTintColor="#5298c1"
                    style={{width: 150, height: 70}}
                    value={userData.minGlycemieBeforeMeal}
                    onValueChange={ (val) => setUserData({...userData , minGlycemieBeforeMeal : val.toFixed(2) }) }
                    minimumValue={.5}
                    maximumValue={1.4}
                    minimumTrackTintColor="#5298c1"
                    maximumTrackTintColor="#000000"
                />
                <Slider thumbTintColor="#5298c1"
                    style={{width: 150, height: 70}}
                    value={userData.maxGlycemieBeforeMeal}
                    onValueChange={ (val) => setUserData({...userData , maxGlycemieBeforeMeal : val.toFixed(2) }) }
                    minimumValue={userData.minGlycemieBeforeMeal}
                    maximumValue={1.4}
                    minimumTrackTintColor="#5298c1"
                    maximumTrackTintColor="#000000"
                    
                />
            </View>
            <View style={{width:"90%"}}>
                <Text style={styles.paragraph}>
                    L'organisation mondiale de la santé recommande :
                </Text>
                <Text style={styles.paragraphLower}>0.7 - 1.25 g/l ( 3.85 - 6.88 mmol/l )</Text>
            </View>
            <View style={{width:"100%",padding:10,marginTop:10}}>
                <Text style={styles.cardTitle}>Après le repas</Text>
            </View>
            <View style={{width:'100%', flexDirection:'row',height:40}}>    
                <View style={styles.beforeORafter}>
                    <Text style={styles.valTitle}>Min / Max : ({userData.glycemicUnity? userData.glycemicUnity : '(unité pas défini)'})</Text>
                </View>
                <View style={{height:30,width:120,flexDirection:'row' ,position:'absolute',top:10,right:10}}>
                    <View style={styles.val}>
                        <Text style={styles.valText}>{userData.minGlycemieAfterMeal}</Text>
                    </View>
                    <View style={styles.val}>
                        <Text style={styles.valText}>{userData.maxGlycemieAfterMeal? userData.maxGlycemieAfterMeal : '1.40'}</Text>
                    </View>
                </View>
            </View>
            <View style={{flexDirection:'row'}}>
                <Slider thumbTintColor="#5298c1"
                    style={{width: 150, height: 70}}
                    value={userData.minGlycemieAfterMeal}
                    onValueChange={ (val) => setUserData({...userData , minGlycemieAfterMeal : val.toFixed(2) }) }
                    minimumValue={0.7}
                    maximumValue={1.4}
                    minimumTrackTintColor="#5298c1"
                    maximumTrackTintColor="#000000"
                />
                <Slider thumbTintColor="#5298c1"
                    style={{width: 150, height: 70}}
                    value={userData.maxGlycemieAfterMeal}
                    onValueChange={ (val) => setUserData({...userData , maxGlycemieAfterMeal : val.toFixed(2) }) }
                    minimumValue={0.7 }
                    maximumValue={1.4}
                    minimumTrackTintColor="#5298c1"
                    maximumTrackTintColor="#000000"
                    
                />
            </View>
            <View style={{width:"90%"}}>
                <Text style={styles.paragraph}>
                    L'organisation mondiale de la santé recommande :
                </Text>
                <Text style={styles.paragraphLower}>moins de 1.4 g/l ( 7.7 mmol/l )</Text>
                <Text style={styles.paragraphLower}>moins de 1.2 g/l pour la femme enceinte ( 6.6 mmol/l )</Text>
            </View>
            
        </ScrollView>
        </SafeAreaView>
    );
    }
  



    const styles = StyleSheet.create({
        container: {
          alignItems: 'center',
          justifyContent:'center',
          width:"100%"
        },
        header:{
            backgroundColor:'#000c66',
            display:'flex',
            alignItems:'center',
            justifyContent:'center',
            height:60,
            width:'100%',
            flexDirection:'row'       
        },
        headerIcon:{
            justifyContent:'center',
            alignItems:'center',
            flexGrow:.5
          },
        submit:{
            justifyContent:'center',
            alignItems:'center',
            backgroundColor:'#fff',
            height:'100%',
            flexGrow:.5
        },
        submitText:{
            color:'#000c66',
            fontFamily:'Nexa-Bold'
        },
        title:{
            flexGrow:1,
            justifyContent:'center',
        },
        cardTitle:{
            fontFamily:'Marta-Bold', 
            fontSize:18,
            color:"#000c66"
        },
        beforeORafter:{
            position:'absolute',
            top:10,
            left:10,
            marginTop:10, 
        },
        valTitle:{
            fontFamily:'Nexa-Bold',
            color:"#888"
        },
        val:{ 
            width:50, 
            height:30, 
            backgroundColor:"#fff",
            justifyContent:'center',
            alignItems:'center',
            borderRadius:5,
            margin:5,
            borderWidth:.2,
        },
        valText:{
            fontFamily:'Nexa-Light',
            color:"#000"
        },
        paragraph:{
            fontFamily:'Nexa-Bold',
            color:'#444'
        },
        paragraphLower:{
            fontFamily:'Nexa-Light',
            color:'#444'
        },
    
      });
    