import React from 'react';
import {useState , useEffect} from 'react';
import {SafeAreaView, StyleSheet, TouchableOpacity, View, Text , TextInput, FlatList, ActivityIndicator } from 'react-native';
import {Avatar} from 'react-native-elements';
import { Ionicons , EvilIcons } from '@expo/vector-icons'; 
import {auth, db} from '../../firebase';

export function Item ({ title}){
    const user = auth.currentUser;
    const [userData, setUserData] = useState("");
    const getUser = async() => {
      db.collection('patients').doc(user.email).collection('doctor').doc().get()
      .then((documentSnapshot) => {
          
        if (documentSnapshot.exists) {
          setUserData(documentSnapshot.data());
          
        }

      })
    }
    useEffect(() => {
      getUser();
    }, []);

    return(
          
    <View style={styles.item}>
      <Text style={styles.itemTitle}>{title}{userData.email}  </Text>  
    </View>
  );
  }

export function renderItem({ item }){

    const user = auth.currentUser;    
    const startChat = async() => {
       console.log(item.name)
        const chatName = ''+item.email.toLowerCase()+'&&'+user.email.toLowerCase(); 
        db.collection('chats').doc(chatName).get()
        .then((documentSnapchot) => {
          if (documentSnapchot.exists){
            alert("Ce chat existe déjà");
          }
          else{
              db.collection('chats').doc(chatName).set({
                  chatName:chatName,
                  doctor: item.email,
                  patient:user.email.toLocaleLowerCase(),
              })
              .then(()=>{
                db.collection('patients').doc(user.email.toLowerCase()).collection('chats').doc(item.email.toLowerCase()).set({
                    chatName:chatName,
                    doctor:item.email,
                    displayName:item.name                    
                })
                db.collection('doctors').doc(item.email.toLowerCase()).collection('chats').doc(user.email.toLowerCase()).set({
                  chatName:chatName,
                  patient:user.email,
                  displayName:user.displayName,
                })
                .then(()=>{
                  alert("Chat créé")
                })
              })
          }
        })
        
    }


    return(
        <TouchableOpacity style={styles.item} onPress={startChat}>
            <View style={{width:"20%", alignItems:'center', justifyContent:'center', height:"100%"}}>
            {
                item.profilePic?
                <Avatar
                size="medium"
                title={item.name[0]}
                placeholderStyle={ { backgroundColor:"limegreen"}}
                rounded
                source={{ uri : item.profilePic}}
            />
            :
            <Avatar
            size="medium"
            rounded
            source={{ uri : "https://media.istockphoto.com/vectors/doctor-icon-design-vector-id1163876251?k=6&m=1163876251&s=612x612&w=0&h=527Miz8LCLPbxREMx2Zs-xMyviI-RI8lJIMwqFa-3-U="}}
            />
            }
            </View>
            <View style={{heigth:"100%", alignItems:'flex-start', width:"80%"}}>
                <Text style={styles.itemTitle}>{item.name}   </Text>
                <Text>{item.email}</Text>
            </View>
        </TouchableOpacity>
  );
}



export function AddChat_patient({navigation}){

    const user = auth.currentUser;
    const [userData, setUserData] = useState("");
    const [ searchData , setSearchData] = useState(null);
    const [ resultArea , setResultArea] = useState(false);
    const [DATA, setDATA] = useState(null);
    const [loading , setLoading] = useState(true);

    const getUser = async() => {
       // console.log(user.email)
          db.collection('patients').doc(user.email).get()
          .then((documentSnapchot) => {
              if ( documentSnapchot.exists){
                  setUserData(documentSnapchot.data());
              }
          })
          if ( loading)
            setLoading(false);
      };

      useEffect(() => {
        getUser();
        const fetchList = async() => {
                const list = [];
                await db.collection('patients').doc(user.email).collection('doctor').get()
                .then((querySnapchot) => {
                    querySnapchot.forEach(doc => {
                    const { name, email, phone, profilePic, gender } = doc.data();
                      list.push({
                          id:Math.random().toString(36).substring(7), 
                          name: name,
                          email: email,
                          phone: phone,
                          profilePic: profilePic,
                          gender : gender,
                      })
                  });
                })
                setDATA(list);
              if(loading){
                  setLoading(false);
              }
            
        }
        fetchList();
    }, []);

    if ( loading)
    {
      return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#000c66" />
        </View>
      );
    }

    const search = async() => {
        setResultArea(true);
    };

    const TriangleCorner = () => {
        return <View style={[styles.triangleCorner]} />;
      };

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TriangleCorner />
                <TouchableOpacity style={styles.headerIcon} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back-outline" size={24} color="white" />
                </TouchableOpacity>
                <Text style={{fontFamily:'Nexa-Bold',color:'#fff', fontSize:24}} >Choisir contact</Text>
                <View style={{position:'absolute', top:5,right:5}}>
                <Avatar
                    size="medium"
                    rounded
                    source={{
                        uri : userData.profilePic,
                    }}
                />
                </View>
            </View>
            <View style={styles.body}>
                { false &&
                <View style={styles.searchBar}>
                    <EvilIcons name="search" size={22} color="#5f99ea" />
                    <TextInput
                    style={{width:"70%", fontFamily:'Nexa-Light', marginLeft:5}}
                        placeholder="Taper l'email ici"
                        placeholderTextColor="#5f99ea"
                        value={searchData}
                        onChangeText={(value) => setSearchData(value)}
                    />
                    <TouchableOpacity style={{width:"18%", }} onPress={search}>
                        <Text style={{color:"#5f99ea" , fontFamily:'Nexa-Bold'}}>Recherche</Text>
                    </TouchableOpacity>
                </View>
                }
                {
                    resultArea && 
                    <View style={{width:"100%" , height:70}}>
                        <Text>It works</Text>
                    </View>
                }
                <FlatList
                      data={DATA}
                      renderItem={renderItem}
                      keyExtractor={item => item.id}
                      />

            </View>   
        </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center'
    },
    header:{
        backgroundColor:'#000c66',
        width:"100%",
        height:60,
        justifyContent:'center',
        alignItems:'flex-start',
        paddingLeft:60
    },
    headerIcon:{
        position:'absolute',
        top:0,
        left:0,
        height:60, 
        width:60,
        alignItems:'center',
        justifyContent:'center'
    },
    triangleCorner: {
        position:'absolute',
        top:0,
        right:0,
        width: 0,
        height: 0,
        backgroundColor: "transparent",
        borderStyle: "solid",
        borderRightWidth: 180,
        borderTopWidth: 180,
        borderRightColor: "transparent",
        borderTopColor: "#5f99ea",
        transform: [{ rotate: "90deg" }],
      },
      body:{
          zIndex:999, 
          flex:1, 
          width:"100%", 
          backgroundColor:"#fff"
        },
      searchBar:{
          width:"95%", 
          height:50, 
          flexDirection:'row', 
          justifyContent:'center',
          alignItems:'center',
          borderRadius:5,
          borderWidth:1,
          borderColor:"#5f99ea",
          backgroundColor:"#f8faff"
        },
        item: {
            flexDirection:'row',
            padding:5,
            width:"100%",
            height:70,
            justifyContent:'flex-start',
            alignItems:'center',
          },
          itemTitle: {
            fontSize: 18,
            fontFamily:'Nexa-Bold'
          },
          showBtn:{
            backgroundColor:"#5f99ea",
            borderRadius:4,
            height:"100%",
            margin:2,
            alignItems:'center',
            justifyContent:'center'
          },
});