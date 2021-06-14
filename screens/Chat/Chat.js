import * as React from 'react';
import {StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity , KeyboardAvoidingView, TextInput} from 'react-native';
import {useState, useEffect} from 'react';
import {Avatar} from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { auth , db} from '../../firebase'; 

export function Chat({ navigation , route }){

    const [input , setInput] = useState("");

    const send = () => {

    };

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.headerIcon} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back-outline" size={24} color="white" />
                </TouchableOpacity>
                <View style={{justifyContent:'center',alignItems:'center', marginRight:8}}>
               
                <Avatar 
                    rounded
                    source={{
    
                        uri :   "https://i.pravatar.cc/300",
                    }}
                />
                </View>
                <Text style={{fontFamily:'Nexa-Bold',color:'#fff', fontSize:22}} >{route.params.displayName}</Text>
            </View>
            <KeyboardAvoidingView 
                behavior={Platform.OS === 'ios' ? "padding" : "height"}
                style={{flex:1}}
                keyboardVerticalOffset={90}
            >
                <>
                <ScrollView contentContainerStyle={{}}>

                </ScrollView>
                <View style={styles.footer}>
                    <TextInput 
                        style={styles.messageInput}
                        placeholder="Message"
                        value={input}
                        onChangeText={(text) => setInput(text)}
                    />
                    <TouchableOpacity onPress={send} activeOpacity={.5} >
                        <Ionicons  name="send" size="24" color="#5f99ea" />
                    </TouchableOpacity>
                </View>
                </>
            </KeyboardAvoidingView>
            
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff'
    },
    header:{
        backgroundColor:'#5f99ea',
        width:"100%",
        height:60,
        flexDirection:'row',
        alignItems:'center',
    },
    headerIcon:{
        height:60, 
        width:50,
        alignItems:'center',
        justifyContent:'center'
    },
    footer:{

    },
    messageInput:{

    },
});