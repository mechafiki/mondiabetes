import {  StyleSheet, Text, View} from 'react-native';
import * as React from 'react';
import {auth} from '../firebase';
import { Button} from 'react-native-elements';


export function ProfileScreen({ navigation }){

    const logout = () => {
        auth
        .signOut()
    };


    return(
        <View style={styles.container}>
            <Text style={{marginBottom:30}}>Profile</Text>
            <Button title="Déconnexion"
            onPress={logout} />
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8faff',
        alignItems: 'center',
        justifyContent: 'center',
      }

  });