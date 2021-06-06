import React from 'react';
import { View, StyleSheet,SafeAreaView } from 'react-native';
import {auth, db} from '../firebase';
import { Avatar, Title, Caption, Drawer, Text, TouchableRipple, Switch } from 'react-native-paper';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons'; 
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export function DrawerContent(props){
    const user = auth.currentUser;
    const [isDarkTheme, setIsDarkTheme ] = React.useState(false);
    const [isEnabled, setIsEnabled] = React.useState(false);
    const [userData, setUserData] = React.useState("");
    const getUser = async() => {
        db.collection('users').doc(user.uid).get()
        .then((documentSnapchot) => {
            if ( documentSnapchot.exists){
                setUserData(documentSnapchot.data());
            }
        })
    }
  
    React.useEffect(() => {
        getUser();
    }, []);

    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const toggleTheme = () => {
        setIsDarkTheme(!isDarkTheme);

    }



    const logout = () => {
        auth
        .signOut()
    };

    return(
        <SafeAreaView style={{flex:1}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection:'row',marginTop: 15}}>
                            <Avatar.Image   source={{ uri : userData.profilePic }}/>
                            <View style={{marginLeft:15, flexDirection:'column'}}>
                                <Title style={styles.title}>{userData.displayName}</Title>
                                <Caption style={styles.caption}>{userData.email}</Caption>
                            </View>
                        </View>
                    </View>
                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem 
                            icon={() => (
                                <Icon 
                                name="view-dashboard-outline" 
                                color="#000c66"
                                size={24}
                                />
                            )}
                            label="Tableau de bord"
                            labelStyle={{
                                color:"#000c66",
                                fontFamily:'Marta-Regular'
                            }}
                            onPress={() => {props.navigation.navigate('Dashboard')}}
                        />
                        <DrawerItem 
                            icon={() => (
                                <Icon 
                                name="account-outline" 
                                color="#000c66"
                                size={24}
                                />
                            )}
                            label="Profile"
                            labelStyle={{
                                color:"#000c66",
                                fontFamily:'Marta-Regular'
                            }}
                            onPress={() => {props.navigation.navigate('Profile')}}
                        />
                        <DrawerItem 
                            icon={() => (
                                <Ionicons 
                                name="stats-chart-outline" 
                                color="#000c66"
                                size={24} 
                                />
                            )}
                            label="Statistiques"
                            labelStyle={{
                                    color:"#000c66",
                                    fontFamily:'Marta-Regular'
                            }}
                            onPress={() => {props.navigation.navigate('Stats')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Ionicons 
                                name="ios-settings-outline" color="#000c66"
                                size={24} 
                                />
                            )}
                            label="Paramètres"
                            labelStyle={{
                                color:"#000c66",
                                fontFamily:'Marta-Regular'
                            }}
                            onPress={() => {props.navigation.navigate('Settings')}}
                        />
                    </Drawer.Section>
                    <Drawer.Section title="Préférences"
                    style={{}}>
                        <TouchableRipple onPress={() => {toggleTheme()}}>
                            <View style={styles.preference}>
                                <Text style={{color:"#000c66", fontFamily:'Marta-Regular', fontSize:15,marginLeft:20}}>Thème sombre</Text>
                                <View pointerEvents="none">
                                    <Switch  value={isDarkTheme}
                                    trackColor={{ false: "#f8faff", true: "#000c66" }}
                                    thumbColor={isEnabled ? "#f5dd4b" : "#ddd"}
                                    onValueChange={toggleSwitch}
                                    />
                                </View>
                            </View>
                        </TouchableRipple>
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem 
                    icon={() => (
                        <Icon 
                        name="exit-to-app" 
                        color="#000c66"
                        size={24}
                        />
                    )}
                    label="Se déconnecter"
                    labelStyle={{
                        color:"#000c66",
                        fontFamily:'Marta-Regular',
                        fontSize:16
                    }}
                    onPress={() => {logout()}}
                />
            </Drawer.Section>
        </SafeAreaView>

    );
}


const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
      paddingLeft: 20,
    },
    title: {
      fontSize: 16,
      marginTop: 3,
      fontFamily:"Marta-Bold",
      color:'#000c66'
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
      fontFamily:"Marta-Regular",
      color:"#000"
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
  });
