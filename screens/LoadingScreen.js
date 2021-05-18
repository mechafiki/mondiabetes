import {  ActivityIndicator, View,StyleSheet} from 'react-native';
import * as React from 'react';
import {auth} from '../firebase';


export function LoadingScreen({ navigation }){

    React.useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
          if(authUser){
              navigation.replace('Home');
          }
          else 
                navigation.replace('LogIn');
        });

        return unsubscribe;

    }, []);

    return(
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#0000ff" />
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