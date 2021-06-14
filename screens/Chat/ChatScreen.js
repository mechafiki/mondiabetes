import * as React from 'react';
import {StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import {useState, useEffect} from 'react';
import { ChatItem } from '../../components/ChatItem';
import {Avatar} from 'react-native-elements';
import { Ionicons , SimpleLineIcons } from '@expo/vector-icons';
import {auth, db} from '../../firebase'; 



export function ChatScreen({navigation}){
    const TriangleCorner = () => {
        return <View style={[styles.triangleCorner]} />;
      };

    const user = auth.currentUser;
    const [chats , setChats] = useState([]);

    useEffect(()=> {
         const unsubscribe = db.collection('doctors').doc(user.email).collection('chats').onSnapshot((snapshot) => {
             setChats(
                 snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data(),
                 }))
             )
         })
    }, []);

    const enterChat = (id, chatName , displayName) => {
            navigation.navigate('Chat', {
                id, 
                chatName,
                displayName,
            })
    }

    return(
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.addChat} activeOpacity={.6} onPress={() => navigation.navigate('AddChat')} >
                <SimpleLineIcons name="pencil" size={24} color="black" />
            </TouchableOpacity>
            <View style={styles.header}>
                <TriangleCorner />
                <TouchableOpacity style={styles.headerIcon} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back-outline" size={24} color="white" />
                </TouchableOpacity>
                <Text style={{fontFamily:'Nexa-Bold',color:'#fff', fontSize:24}} >monChat</Text>
                <View style={{position:'absolute', top:5,right:5}}>
                <Avatar
                    size="medium"
                    rounded
                    source={{
                        uri : "https://media.istockphoto.com/vectors/doctor-icon-design-vector-id1163876251?k=6&m=1163876251&s=612x612&w=0&h=527Miz8LCLPbxREMx2Zs-xMyviI-RI8lJIMwqFa-3-U=",
                    }}
                />
                </View>
            </View>
            <ScrollView contentContainerStyle={{zIndex:999, flex:1, backgroundColor:"#f8faff"}}>
                    {chats.map(({id, data:{chatName , displayName}}) => (
                        <ChatItem key={id}  id={id} chatName={chatName} displayName={displayName} enterChat={enterChat}/>
                    ))}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#f8faff'
    },
    header:{
        backgroundColor:'#000c66',
        width:"100%",
        height:60,
        justifyContent:'center',
        alignItems:'center'
    },
    headerIcon:{
        position:'absolute',
        top:0,
        left:0,
        height:60, 
        width:60,
        alignItems:'center',
        justifyContent:'center'
    },
    triangleCorner: {
        position:'absolute',
        top:0,
        right:0,
        width: 0,
        height: 0,
        backgroundColor: "transparent",
        borderStyle: "solid",
        borderRightWidth: 200,
        borderTopWidth: 200,
        borderRightColor: "transparent",
        borderTopColor: "#5f99ea",
        transform: [{ rotate: "90deg" }],
      },
    addChat:{
        position:'absolute' , 
        bottom:5,
        right:5 , 
        zIndex:1000,
        backgroundColor:"#5f99ea",
        height:50,
        width:50,
        borderRadius:25,
        justifyContent:'center',
        alignItems:'center'
    },
});