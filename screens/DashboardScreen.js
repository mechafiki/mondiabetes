import {  StyleSheet, Text, View } from 'react-native';
import * as React from 'react';


export function DashboardScreen({ navigation }){

    
    return(
        <View style={styles.container}>
            <Text >Tableau de Bord</Text>
            
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
