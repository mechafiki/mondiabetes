import React from 'react';
import { SafeAreaView, View, FlatList,TouchableOpacity, StyleSheet, Text, ActivityIndicator} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import {auth, db} from '../firebase';
 
export function renderItem({ item }){
  
  console.log(item.mealName)
  return(
    <View style={styles.item}>
      <Text style={styles.itemTitle}>{item.createdAt} </Text>
      <View style={styles.cardLigne}>
        <Text style={styles.cardText}>Nom du repas: </Text>
        <Text style={styles.cardText_}>{item.mealName}</Text>
      </View>
      <View style={styles.cardLigne}>
        <Text style={styles.cardText}>Temps : </Text>
        <Text style={styles.cardText_}>{item.mealTime}</Text>
      </View>
      <View style={styles.cardLigne}>
        <Text style={styles.cardText}>Calories : </Text>
        <Text style={styles.cardText_}>{item.calories}</Text>
      </View>
      <View  style={styles.cardLigne_}>
        <Text style={styles.cardText}>Description : </Text>
        <View style={{marginLeft:10, paddingLeft: 10 , borderLeftWidth:.3, borderLeftColor:"#333",justifyContent:'center',paddingTop:5}}>
            <Text style={styles.cardText_}>{item.description}</Text>
        </View>
      </View>
    
      <View style={{position:'absolute', bottom:5,right:5}}>

      </View>


    </View>
  );
}

export function Item ({ title}){
  const user = auth.currentUser;
  const [userData, setUserData] = React.useState("");
  const getUser = async() => {
    db.collection('patients').doc(user.email).collection('meals').doc().get()
    .then((documentSnapshot) => {
      if (documentSnapshot.exists) {
      //  console.log('here');
        setUserData(documentSnapshot.data());
      }
    })
  }
  React.useEffect(() => {
    getUser();
  }, []);

  return(
        
  <View style={styles.item}>
  </View>
);
}


export function Meals({navigation}){
    const user = auth.currentUser;
    const [DATA, setDATA] = React.useState(null);
    const [loading , setLoading] = React.useState(true);

    
    
    React.useEffect(() => {
        const fetchTests = async() => {
            if (!DATA){
                const list = []; 
                await db.collection('patients').doc(user.email).collection('meals').get()
                .then((querySnapchot) => {
                    querySnapchot.forEach(doc => {
                    const { id, calories , createdAt , description, mealName , mealTime} = doc.data();
                      list.push({
                          id: id,
                          calories : calories,
                          createdAt: createdAt,
                          description: description,
                          mealName: mealName,
                          mealTime:mealTime,
                      })
                  });
                })
                setDATA(list);
                console.log(list);
               if(loading){
                   setLoading(false);
               }
            }
        }
        fetchTests();
    }, []);
    
    
      return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.headerIcon} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back-outline" size={24} color="white" />
                </TouchableOpacity>
                <View style={styles.title}>
                    <Text style={{color:'white', fontFamily:'Nexa-Light', fontSize:20}}>Historique des repas</Text>
    
                </View>
            </View>
            <FlatList
            data={DATA}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            />
        </SafeAreaView>
      );
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1
      },
      header:{
        flexDirection:'row',
        width:'100%',
        display:'flex',
        alignItems:'flex-start',
        justifyContent:'flex-start',
        backgroundColor:'#000c66',
        height:60,
        
      },
      title:{
        flexGrow:1, 
        height:"100%", 
        justifyContent:'center', 
        alignItems:'flex-start',
        marginLeft:"5%"
      },
      headerIcon:{
        height:"100%",
        width:"15%",
        marginLeft:'2%', 
        justifyContent:'center',
        alignItems:'center'
      },
      item: {
        backgroundColor: '#f8f8f8',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
      },
      itemTitle: {
        fontSize: 14,
      },
      cardText_:{
        fontFamily:'Nexa-Bold' , 
        fontSize:14,
        color:"#000c66"
      },
      cardLigne:{
        flexDirection:'row' , 
        marginTop:3
      },
      cardLigne_:{
        marginTop:3
      },
      cardText:{
        fontFamily:'Nexa-Bold' , 
        fontSize:14,
        color:"#333"
      }
    });
    
