import React from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { useFonts } from '@expo-google-fonts/inter';


import Onboarding from 'react-native-onboarding-swiper';



const Dots = ({selected}) => {
    let backgroundColor;

    backgroundColor = selected ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.3)';

    return (
        <View 
            style={{
                width:6,
                height: 6,
                marginHorizontal: 3,
                backgroundColor
            }}
        />
    );
}

const Skip = ({...props}) => (
    <TouchableOpacity
        style={{marginHorizontal:10}}
        {...props}
    >
        <Text style={{fontSize:16, fontFamily:'Nexa-Bold'}}>Sauter</Text>
    </TouchableOpacity>
);

const Next = ({...props}) => (
    <TouchableOpacity
        style={{marginHorizontal:10}}
        {...props}
    >
        <Text style={{fontSize:16, fontFamily:'Nexa-Bold'}}>Suivant</Text>
    </TouchableOpacity>
);

const Done = ({...props}) => (
    <TouchableOpacity
        style={{marginHorizontal:10}}
        {...props}
    >
        <Text style={{fontSize:16, fontFamily:'Nexa-Bold' }}>Continuer</Text>
    </TouchableOpacity>
);

export function OnboardingScreen({navigation}) {
    let [fontsLoaded] = useFonts({
        'Nexa-Bold': require('../assets/fonts/Nexa-Bold.otf'),
        'Nexa-Light': require('../assets/fonts/Nexa-Light.otf'),
        'Marta-Bold': require('../assets/fonts/Marta-Bold.otf'),
        'Marta-Regular': require('../assets/fonts/Marta-Regular.otf'),
      });
      if (!fontsLoaded) {
        return (
          <View style={styles.container}>
            <ActivityIndicator size="large" color="#59d7ee" />
          </View>
        );
      } 
    return (
        <Onboarding
        SkipButtonComponent={Skip}
        NextButtonComponent={Next}
        DoneButtonComponent={Done}
        DotComponent={Dots}
        onSkip={() => navigation.replace("LogIn")}
        onDone={() => navigation.navigate("LogIn")}
        pages={[
          {
            backgroundColor: '#fff',
            image: <Image source={require('../assets/onboarding-img1.png')} />,
            title: 'Bienvenue ',
            titleStyles:{color:'#E1341E', fontFamily:'Marta-Bold'},
            subtitle: 'Suiver votre glycémie, glucides, nutrition et activités physiques dans un clic!',
            subTitleStyles:{ fontSize:14, fontFamily:'Nexa-Light'}
          },
          {
            backgroundColor: '#d3f4fb',
            image: <Image source={require('../assets/onboarding-img2.png')}   />,
            title: 'Apprendre encore plus ',
            titleStyles:{color:'#ff00ae', fontFamily:'Marta-Bold' },
            subtitle: 'Notre système de recherche est à votre disposition',
            subTitleStyles:{ fontSize:14, fontFamily:'Nexa-Light' }
          },
          {
            backgroundColor: '#ddd',
            image: <Image source={require('../assets/onboarding-img3.png')} />,
            title: 'Become The Star',
            titleStyles:{fontFamily:'Marta-Bold' },
            subtitle: "Let The Spot Light Capture You",
            subTitleStyles:{ fontSize:14, fontFamily:'Nexa-Light' }
          },
        ]}
      />
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f8faff',
      alignItems: 'center',
      justifyContent: 'center',
    },
});