import * as React from 'react';
import {StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity , KeyboardAvoidingView, TextInput} from 'react-native';
import {useState, useEffect , useLayoutEffect} from 'react';
import {Avatar} from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import { Ionicons } from '@expo/vector-icons';
import * as firebase from "firebase";
import { auth , db} from '../../firebase'; 
import { Keyboard } from 'react-native';

export function Chat_patient({ navigation , route }){

    const [input , setInput] = useState("");
    const [messages, setMessages] = useState([]);
    const user = auth.currentUser;
    const [userData, setUserData] = useState("");
    const [doctorData, setDoctorData] = useState("");
    const getUser = async() => {
      db.collection('patients').doc(user.email).get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          setUserData(documentSnapshot.data()); 
        }
      }) 
      db.collection('doctors').doc(route.params.doctor).get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          setDoctorData(documentSnapshot.data()); 
        }
      })    
    }
    useEffect(() => {
      getUser();
    }, []);

    const send = () => {
        Keyboard.dismiss();
      //  console.log(route.params.chatName)
        db.collection('chats').doc(route.params.chatName).collection('messages').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message:input,
            displayName:userData.displayName,
            email : userData.email,
            profilePic: userData.profilePic,

        })
        setInput('');

    };

    useLayoutEffect(() => {

        const unsubscribe = db.collection('chats').doc(route.params.chatName)
          .collection('messages')
          .orderBy('timestamp', 'asc')
          .onSnapshot((snapshot) => {
            setMessages(
                snapshot.docs.map(doc => ({
                    id : doc.id,
                    data : doc.data(),
                }))
            )
          });
          return unsubscribe;
    }, [route]);

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
    
                        uri : doctorData.profilePic? doctorData.profilePic :  "https://media.istockphoto.com/vectors/doctor-icon-design-vector-id1163876251?k=6&m=1163876251&s=612x612&w=0&h=527Miz8LCLPbxREMx2Zs-xMyviI-RI8lJIMwqFa-3-U=",
                    }}
                />
                </View>
                <Text style={{fontFamily:'Nexa-Bold',color:'#fff'}} >Dr. {route.params.displayName}</Text>
            </View>
            <KeyboardAvoidingView 
                behavior={Platform.OS === 'ios' ? "padding" : "height"}
                style={{flex:1}}
                keyboardVerticalOffset={20}
            >
                <>
                <ScrollView contentContainerStyle={{}}>
                    {messages.map(({id , data}) => (
                        data.email === userData.email ?  (
                            <Animatable.View 
                            key={id} 
                            style={styles.sender}
                            animation="fadeInLeft"
                            >
                                <Avatar 
                                    rounded
                                    source={{uri : userData.profilePic? userData.profilePic : "https://microbiology.ucr.edu/sites/g/files/rcwecm2866/files/styles/form_preview/public/blank-profile-pic.png?itok=xMM7pLfb"}}
                                />
                                <View style={styles.sendermsg}>
                                    <Text style={{color:"#fff", fontFamily:'Nexa-Light'}}>{data.message}</Text>
                                </View>
                            </Animatable.View>
                        )
                        :
                        (
                            <Animatable.View key={id}
                                style={styles.receiver}
                            >
                                <Avatar
                                    rounded
                                    source={{uri :   "https://media.istockphoto.com/vectors/doctor-icon-design-vector-id1163876251?k=6&m=1163876251&s=612x612&w=0&h=527Miz8LCLPbxREMx2Zs-xMyviI-RI8lJIMwqFa-3-U=",}}
                                />
                                <View style={styles.receivermsg}>
                                    <Text style={{color:"#000", fontFamily:'Nexa-Light', fontSize:16}}>{data.message}</Text>
                                </View>
                            </Animatable.View>
                        )
                    ))}
                </ScrollView>
                <View style={styles.footer}>
                    <TextInput 
                        style={styles.messageInput}
                        placeholder="Message"
                        value={input}
                        onChangeText={(text) => setInput(text)}
                        onSubmitEditing={send}
                    />
                    <TouchableOpacity onPress={send} activeOpacity={.5} >
                        <Ionicons  name="send" size={24}  color="#5f99ea" />
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
        flexDirection:'row',
        alignItems:'center',
        width:"100%",
        padding : 15
    },
    messageInput:{
        bottom:0,
        height:40,
        flex:1,
        marginRight:15,
        borderColor:'transparent',
        backgroundColor:"#ececec",
        padding:10,
        color:'grey',
        borderRadius: 20
    },
    sender:{
        position: 'relative',
        margin: 5,
        alignSelf:'flex-end',
        paddingRight: 5,
        maxWidth: "80%",
        height: 40,
        fontFamily:'Marta-Regular',
        flexDirection:'row-reverse',
        justifyContent:'flex-start',
        alignItems:'center'
    },
    sendermsg:{
        width:"80%" , 
        backgroundColor:"#000c66", 
        height:40, 
        borderRadius:20, 
        marginRight:3,
        padding:10, 
        maxWidth:"100%",
        maxHeight:70
},
    receiver:{
        position: 'relative',
        margin: 5,
        alignSelf:'flex-start',
        paddingLeft: 5,
        width:250,
        maxWidth: "80%",
        height: 40,
        fontFamily:'Marta-Regular',
        flexDirection:'row',
        justifyContent:'flex-start',
    },
    receivermsg:{
        width:"80%" , 
        backgroundColor:"#c0c2c9", 
        height:40, 
        borderRadius:20, 
        marginLeft:3,
        padding:10, 
        maxWidth:"100%",
        maxHeight:70 
    }
});