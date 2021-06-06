import * as React from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import {auth} from '../firebase';


export function LoadingScreen({navigation}){
    React.useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
          if(authUser){
              navigation.replace('Home');
          }
          else {
              navigation.replace('LogIn');
          }
        });
        
        return unsubscribe;

    }, []);

    return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#057dcd" />
        </View>
      );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#f8faff',
        justifyContent:'center',
      }
});
