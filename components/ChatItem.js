import * as React from 'react';
import {useState , useEffect} from 'react';
import { Avatar, ListItem } from 'react-native-elements';
import {db } from '../firebase';

export function ChatItem({ id , patient , displayName ,chatName, enterChat }){
    const [userData, setUserData] = useState("");
    const getUser = async() => {
     await db.collection('patients').doc(patient.toLowerCase()).get()
      .then((documentSnapshot) => {
          
        if (documentSnapshot.exists) {
          setUserData(documentSnapshot.data());         
        }
      })
    }
    useEffect(() => {
      getUser();
    }, []);


    return(
        <ListItem  key={id}  onPress={()=> enterChat(id , patient, displayName ,chatName)}   >
            {
                userData.profilePic
                ?
                <Avatar 
                    rounded
                    source={{
    
                        uri :   userData.profilePic !== "" ? userData.profilePic :  "https://i.pravatar.cc/300" ,
                    }}
                />
                :
                <Avatar 
                    rounded
                    source={{
    
                        uri :   "https://i.pravatar.cc/300",
                    }}
                />

            }
            <ListItem.Content style={{justifyContent:'center'}}>
                <ListItem.Title style={{fontFamily:'Nexa-Bold'}}>
                     {userData.displayName}
                </ListItem.Title>
                <ListItem.Subtitle
                    numberOfLines={1}
                    ellipsizeMode="tail"    
                >
                </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    );
}
