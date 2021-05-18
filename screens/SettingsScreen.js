import {  StyleSheet, Text, View, Button } from 'react-native';
import * as React from 'react';


export function SettingsScreen({ navigation }){
    return(
        <View style={styles.container}>
            <Text>Settings</Text>
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