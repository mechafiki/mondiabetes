import React from 'react';
import { SafeAreaView, View, FlatList,TouchableOpacity, StyleSheet, Text} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import {auth, db} from '../firebase';
 
export function renderItem({ item }){
  
 // console.log(item.mealName)
  return(
    <View style={styles.item}>
      <Text style={styles.itemTitle}>{item.createdAt} </Text>
      <View style={styles.cardLigne}>
        <Text style={styles.cardText}>Hydratation du jour: </Text>
        <Text style={styles.cardText_}>{item.hydratation}</Text>
        <Text style={styles.cardText}>Litres </Text>
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
    db.collection('patients').doc(user.email).collection('hydratation').doc().get()
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


export function Hydratation({navigation}){
    const user = auth.currentUser;
    const [DATA, setDATA] = React.useState(null);
    const [loading , setLoading] = React.useState(true);

    
    
    React.useEffect(() => {
        const fetchTests = async() => {
            if (!DATA){
                const list = []; 
                await db.collection('patients').doc(user.email).collection('hydratation').get()
                .then((querySnapchot) => {
                    querySnapchot.forEach(doc => {
                    const { id , createdAt ,hydratation} = doc.data();
                      list.push({
                          id: id,
                          createdAt: createdAt,
                          hydratation : hydratation
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
                    <Text style={{color:'white', fontFamily:'Nexa-Light', fontSize:20}}>Historique de l'hydratation</Text>
    
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
    
