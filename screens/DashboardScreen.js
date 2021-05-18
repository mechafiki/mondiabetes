import {  StyleSheet, Text, View } from 'react-native';
import { Button} from 'react-native-elements';
import * as React from 'react';
import {auth} from '../firebase';


export function DashboardScreen({ navigation }){

    const logout = () => {
        auth
        .signOut()
    };

    return(
        <View style={styles.container}>
            <Text style={{marginBottom:30}}>Tableau de Bord</Text>
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
