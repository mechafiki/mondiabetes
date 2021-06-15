import * as React from 'react';
import {StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import {useState, useEffect} from 'react';
import { ChatItem_patient } from '../../components/ChatItem_patient';
import {Avatar} from 'react-native-elements';
import { Ionicons , SimpleLineIcons } from '@expo/vector-icons';
import {auth, db} from '../../firebase'; 



export function ChatScreen_patient({navigation}){
    const TriangleCorner = () => {
        return <View style={[styles.triangleCorner]} />;
      };

    const user = auth.currentUser;
    const [chats , setChats] = useState([]);
    const [userData, setUserData] = useState("");
    const getUser = async() => {
      db.collection('patients').doc(user.email).get()
      .then((documentSnapshot) => {
          
        if (documentSnapshot.exists) {
          setUserData(documentSnapshot.data());
          
        }

      })
    }
    useEffect(() => {
      getUser();
    }, []);

    useEffect(()=> {
         const unsubscribe = db.collection('patients').doc(user.email).collection('chats').onSnapshot((snapshot) => {
             setChats(
                 snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data(),
                 }))
             )
         })
    }, [])

    const enterChat = (id, doctor , displayName ,chatName ) => {
        navigation.navigate('Chat_patient', {
            id, 
            doctor,
            displayName,
            chatName
            
        })
        console.log(displayName)
}

    return(
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.addChat} activeOpacity={.6} onPress={() => navigation.navigate('AddChat_patient')} >
                <SimpleLineIcons name="pencil" size={24} color="black" />
            </TouchableOpacity>
            <View style={styles.header}>
                <TriangleCorner />
                <TouchableOpacity style={styles.headerIcon} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back-outline" size={24} color="white" />
                </TouchableOpacity>
                <Text style={{fontFamily:'Nexa-Bold',color:'#fff', fontSize:24}} >monChat</Text>
                <View style={{position:'absolute', top:5,right:5}}>
               {
                   userData.profilePic !== null ?
                   <Avatar
                    size="medium"
                    rounded
                    source={{
                        uri : userData.profilePic,
                    }}
                    />
                    : 
                    <Avatar
                    size="medium"
                    rounded
                    source={{
                        uri : "https://www.google.com/url?sa=i&url=https%3A%2F%2Fmicrobiology.ucr.edu%2Fimage%2Fprofile-image-placeholder&psig=AOvVaw2zkM0xBgPptK52hr9cWW37&ust=1623758871757000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCNCXqq6Ll_ECFQAAAAAdAAAAABAE",
                    }}
                    />
                    
               } 
               
               
                </View>
            </View>
            <ScrollView contentContainerStyle={{zIndex:999, flex:1, backgroundColor:"#f8faff"}}>
                    {chats.map(({id, data:{doctor , displayName, chatName}}) => (
                        <ChatItem_patient 
                        key={id}  
                        id={id} 
                        doctor={doctor} 
                        displayName={displayName}
                        chatName={chatName}
                        enterChat={enterChat}
                        />
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