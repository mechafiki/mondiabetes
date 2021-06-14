import * as React from 'react';
import {StyleSheet } from 'react-native';
import {useState , useEffect} from 'react';
import { Avatar, ListItem } from 'react-native-elements';
import {db } from '../firebase';

export function ChatItem_patient({ id , chatName , displayName, enterChat }){

    const [userData, setUserData] = useState("");
    const getUser = async() => {
      db.collection('doctors').doc(chatName.toLowerCase()).get()
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
        <ListItem>
            {
                userData.profilePic
                ?
                <Avatar 
                    rounded
                    source={{
    
                        uri :   userData.profilePic,
                    }}
                />
                :
                <Avatar 
                    rounded
                    source={{
    
                        uri :   "https://media.istockphoto.com/vectors/doctor-icon-design-vector-id1163876251?k=6&m=1163876251&s=612x612&w=0&h=527Miz8LCLPbxREMx2Zs-xMyviI-RI8lJIMwqFa-3-U=",
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