import {  ActivityIndicator, ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import * as React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons'; 

import { SafeAreaView } from 'react-native-safe-area-context';


export function SettingsScreen({ navigation }){
    
    return(
        <SafeAreaView style={styles.container}>
           

        <View style={styles.header}>
            <TouchableOpacity style={styles.headerIcon} onPress={() => navigation.openDrawer()}>
                <AntDesign name="bars" size={24} color="white" />
            </TouchableOpacity>
            <View style={styles.title}>
                <Text style={{color:'white', fontFamily:'Nexa-Light', fontSize:20}}>Settings</Text>
            </View>
        </View>
        
        <ScrollView contentContainerStyle={{justifyContent:'center', alignItems:'center'}}>
            <View style={styles.cards}>
            <View style={styles.titleContainer}> 
            <Text style={styles.cardTitle}>Buts </Text>
            </View> 
                <TouchableOpacity style={[styles.upperCard, styles.cardsItem]}>
                <View style={styles.cardText}><Text style={styles.defaultFontFamily}>Glycémie</Text></View>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.cardsItem, styles.upperCard]}>
                <View style={styles.cardText}><Text style={styles.defaultFontFamily}>Activités</Text></View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cardsItem}>
                <View style={styles.cardText}><Text style={styles.defaultFontFamily}>Poids</Text></View>
                    
                </TouchableOpacity>
                
            </View>
            <View style={styles.cards}>
            
            <View style={styles.titleContainer}> 
            <Text style={styles.cardTitle}>Unités </Text>
            </View> 
                   <View  style={[styles.pickerItem, styles.upperCard]}>
                    <View style={styles.pickerText}><Text style={styles.defaultFontFamily}>Glycémie</Text></View>
                    <View >
                    <RNPickerSelect  onValueChange={(value) => console.log(value)} 
                      placeholder={{
                        label: 'unité',
                        value: null,
                        color:'grey'
                      }}
                      style={pickerSelectStyles}
                      useNativeAndroidPickerStyle={false}
                      items={[
                        { label: 'l/g', value: 'l/g' },
                        { label: 'mg/dl', value: 'mg/dl' },
                        
                       ]} />
                      </View>
                      </View>
                      <View  style={[styles.pickerItem, styles.upperCard]}>
                    <View style={styles.pickerText}><Text style={styles.defaultFontFamily}>Activités</Text></View>
                    <View >
                    <RNPickerSelect  onValueChange={(value) => console.log(value)} 
                      placeholder={{
                        label: 'unité',
                        value: null,
                        color:'grey'
                      }}
                      style={pickerSelectStyles}
                      useNativeAndroidPickerStyle={false}
                      items={[
                        { label: 'Km', value: 'Km' },
                        { label: 'miles', value: 'miles' },
                        
                       ]} />
                      </View>
                      </View>
                    <View  style={styles.pickerItem}>
                    <View style={styles.pickerText}><Text style={styles.defaultFontFamily}>Poids</Text></View>
                    <View >
                    <RNPickerSelect   onValueChange={(value) => console.log(value)} 
                    style={pickerSelectStyles}
                    useNativeAndroidPickerStyle={false}
                    placeholder={{
                        label: 'unité',
                        value: null,
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
        left:15,
        height:50
      
      },
    cards:{
        width:"100%",
        height:200,
        
        backgroundColor:'white',
        justifyContent:'center',
        alignItems:'flex-start',
       // backgroundColor:'#7ec8e3',
    },
    cardsItem:{
        flex:1,
        paddingLeft:10,
        justifyContent:'center',
        width:"100%",
        backgroundColor:'#FFF',
        
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
    title:{
        width:"60%",
    },
    icons:{
        backgroundColor:'red',
      //  marginRight:10,
        alignItems:'center',
        justifyContent:'center'
        
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
    cardText:{
        fontSize:15,
        width:'100%',
        justifyContent:'center',
        fontFamily:'Nexa-Light',
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
