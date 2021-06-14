import * as React from 'react';
import {StyleSheet, View, Text } from 'react-native';
import {useState , useEffect} from 'react';
import { Avatar, ListItem } from 'react-native-elements';
import {db } from '../firebase';

export function ChatItem({ id , chatName , displayName, enterChat }){
    const [userData, setUserData] = useState("");
    const getUser = async() => {
      db.collection('patients').doc(chatName.toLowerCase()).get()
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
        <ListItem  key={id}  onPress={()=> enterChat(id , chatName , displayName)}   >
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
            <ListItem.Content>
                <ListItem.Title style={{fontFamily:'Nexa-Bold'}}>
                     {userData.displayName}
                </ListItem.Title>
                <ListItem.Subtitle
                    numberOfLines={1}
                    ellipsizeMode="tail"    
                >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas congue ligula a ornare scelerisque. Cras faucibus lorem ut lectus ultrices vestibulum. Aliquam erat volutpat. 
                </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    );
}

const styles = StyleSheet.create({

}) ;