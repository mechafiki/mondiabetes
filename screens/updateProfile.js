import { TextInput  , StyleSheet, Image, View, ActivityIndicator, NativeModules } from 'react-native';
import * as React from 'react';
import { useEffect} from 'react';
import { Button} from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons'; 
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import RNPickerSelect from 'react-native-picker-select';
import { useFonts } from '@expo-google-fonts/inter';
import * as ImagePicker from 'expo-image-picker';


export function updateProfile({ navigation }){
    return (
        <ScrollView contentContainerStyle={styles.container}>
            
            
        </ScrollView>
    );
    }
  



    const styles = StyleSheet.create({
        container: {
          flexGrow: 1,
          backgroundColor: '#f8faff',
          alignItems: 'center',
          justifyContent: 'center',
        }
    
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