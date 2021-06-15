import * as React from 'react';
import { useState , useEffect } from 'react';
import * as Animatable from 'react-native-animatable';
import { SafeAreaView, ActivityIndicator, ScrollView, FlatList ,TextInput,StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { AntDesign , Ionicons } from '@expo/vector-icons';
import {auth, db} from '../../firebase';
import Svg, {G, Path } from "react-native-svg";

export function SvgComponent(props) {
    return (
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={100}
        height={100}
        viewBox="0 0 400 400"
        {...props}
      >
        <G fillRule="evenodd">
          <Path
            d="M192.56 85.568c-81.342 4.907-131.51 92.038-95.264 165.453 36.854 74.647 140.377 85.881 192.156 20.854 58.02-72.865 10.311-180.389-82.672-186.321-6.693-.427-6.917-.427-14.22.014m17.262 10.928c87.429 8.694 125.64 114.954 63.634 176.96-62.006 62.006-168.266 23.795-176.96-63.634-6.407-64.429 48.897-119.733 113.326-113.326m-26.047 74.582l-12.403 12.875-6.176-6.332-6.176-6.332-.018 12.978-.018 12.978 6.153 6.453 6.152 6.453 4.699-4.782a2128.51 2128.51 0 0012.582-12.986l7.883-8.203.016 17.675.015 17.676h17.579v-61.328h-17.886l-12.402 12.875m38.491-4.206v8.781l4.933.478c29.892 2.898 45.098 24.757 28.901 41.545l-1.79 1.855h22.108l.707-1.465c13.197-27.341-12.488-58.113-49.879-59.756l-4.98-.219v8.781m-93.75 51.487v29.297h17.578v-58.593h-17.578v29.296"
            fill="#0a1480"
          />
          <Path
            d="M194.531 96.332c-90.478 6.181-131.485 114.757-67.129 177.742 61.693 60.379 165.137 23.564 175.756-62.551 7.698-62.422-46.093-119.463-108.627-115.191m-38.715 71.344a4617.278 4617.278 0 0112.568 12.932l2.953 3.068 12.465-12.932 12.465-12.931h18.186V247.656h-17.969l-.002-2.832a71.513 71.513 0 00-.252-5.469l-.249-2.636h-4.184l-.005-20.215-.005-20.215-4.007 4.102a3485.633 3485.633 0 00-10.204 10.515l-6.197 6.414-5.323-5.437a684.94 684.94 0 01-9.909-10.367l-4.584-4.929-.064-3.469-.063-3.47-.284 3.711c-.156 2.041-.303 15.075-.327 28.965l-.044 25.254-4.785.26c-2.632.143-7.685.205-11.23.137l-6.446-.123-.1-44.532c-.056-24.492-.017-44.751.085-45.019.141-.371 2.317-.488 9.042-.488h8.856l9.613 9.863m74.318-9.455c45.142 4.556 66.268 45.731 37.507 73.101-10.255 9.759-27.165 16.334-42.008 16.334h-3.367v-17.851l3.688-.242c4.197-.276 10.328-1.443 13.499-2.57l2.149-.764-9.473-.029-9.473-.028v-3.013l4.004-.223c18.846-1.048 32.593-14.576 26.969-26.539-3.904-8.305-16.921-15.147-28.817-15.147h-2.038l-.252-3.809c-.139-2.094-.253-7.368-.254-11.718l-.002-7.91h1.911c1.052 0 3.732.183 5.957.408"
            fill="#ebebeb"
          />
          <Path
            d="M147.266 172.229v12.855l6.108 6.481c3.359 3.565 6.207 6.482 6.328 6.482.121 0 .009-.211-.249-.469-.345-.345-.469-3.85-.469-13.342v-12.873l.879.727c.484.399-2.107-2.298-5.757-5.994-3.65-3.697-6.682-6.721-6.738-6.721-.056 0-.102 5.784-.102 12.854m-18.929 7.166c-.149 10.366-.208 21.132-.131 23.925.088 3.204.171 1.51.225-4.59l.085-9.667h17.567l.135 12.207c.074 6.713.079 2.539.012-9.278-.068-11.816-.126-23.725-.13-26.465l-.006-4.98h-17.486l-.271 18.848m35.14 22.949c1.924 1.933 3.587 3.515 3.694 3.515.108 0-1.379-1.582-3.304-3.515-1.924-1.934-3.587-3.516-3.694-3.516-.108 0 1.379 1.582 3.304 3.516m117.12.586c.002 1.504.072 2.071.157 1.261.084-.811.083-2.041-.003-2.735-.087-.693-.156-.03-.154 1.474m-66.449 7.129l-.085 9.472h-17.579v26.172h17.486l.271-17.285c.149-9.507.208-19.658.131-22.559-.095-3.598-.166-2.265-.224 4.2m62.619 8.662c-.252.795-.466.81-11.387.81-8.792 0-11.071-.102-10.85-.488.153-.269-.232-.031-.856.528-5.906 5.293-16.88 9.374-26.833 9.981-5.144.313-4.724-.51-4.383 8.597l.285 7.604 9.234-.122 9.234-.123 4.861-1.695c11.03-3.844 20.021-9.811 25.863-17.162 2.394-3.013 5.612-8.218 5.284-8.547-.107-.107-.31.171-.452.617"
            fill="#5f98ea"
          />
          <Path
            d="M194.629 96.363c.376.098.991.098 1.367 0s.068-.179-.683-.179c-.752 0-1.06.081-.684.179m9.375 0c.376.098.991.098 1.367 0s.068-.179-.683-.179c-.752 0-1.06.081-.684.179m-77.647 30.297l-2.724 2.832 2.832-2.724c1.557-1.498 2.832-2.772 2.832-2.832 0-.286-.41.094-2.94 2.724m146.885-.097c1.493 1.503 2.802 2.734 2.909 2.734.107 0-1.026-1.231-2.518-2.734-1.493-1.504-2.802-2.735-2.909-2.735-.107 0 1.026 1.231 2.518 2.735m-144.857 31.51c-.143.143-.219 5.021-.17 10.84l.091 10.579.112-9.472.112-9.473h17.564l.091 10.058c.049 5.533.095 11.817.1 13.965.005 2.149.052 17.222.105 33.496l.094 29.59H150.781l.044-25.293c.024-13.911.171-26.963.327-29.004l.284-3.711.063 3.47.064 3.469 4.584 4.929a684.94 684.94 0 009.909 10.367l5.323 5.437 6.197-6.414c3.409-3.527 8.001-8.26 10.204-10.515l4.007-4.102.005 20.215.005 20.215h4.254l.146 1.855c.081 1.021.17-9.219.2-22.754l.053-24.609-2.327 2.495-2.326 2.494-.005-3.471-.005-3.471-3.991 4.101a7219.491 7219.491 0 01-10.23 10.479l-6.238 6.377-5.697-5.791a839.973 839.973 0 01-12.031-12.563l-6.334-6.771v-25.851l.899.752c.495.413.238.092-.571-.714l-1.47-1.464h-8.739c-4.807 0-8.856.117-9 .26m63.979 3.743l-1.544 1.661 1.66-1.545c1.544-1.436 1.84-1.776 1.545-1.776-.064 0-.811.747-1.661 1.66m-42.755-.366c0 .068.572.639 1.27 1.27l1.269 1.147-1.147-1.269c-1.069-1.184-1.392-1.449-1.392-1.148m32.998 10.523l-2.724 2.832 2.832-2.724c2.63-2.53 3.01-2.94 2.724-2.94-.06 0-1.334 1.274-2.832 2.832m-19.521 3.418c1.492 1.504 2.801 2.734 2.909 2.734.107 0-1.026-1.23-2.518-2.734-1.493-1.504-2.802-2.735-2.909-2.735-.108 0 1.026 1.231 2.518 2.735m105.469 0c1.058 1.074 2.011 1.953 2.119 1.953.107 0-.671-.879-1.729-1.953-1.058-1.075-2.011-1.953-2.119-1.953-.107 0 .671.878 1.729 1.953m-45.964 3.218l.129 2.641h2.066c11.923 0 24.935 6.833 28.843 15.147 5.624 11.963-8.123 25.491-26.969 26.539l-4.004.223v2.986l9.668.111 9.668.111 3.426-1.651c30.096-14.504 17.809-45.761-19.051-48.462l-3.906-.286.13 2.641m-49.956 3.715l-1.346 1.465 1.465-1.346c.806-.74 1.465-1.4 1.465-1.465 0-.298-.331-.017-1.584 1.346m-76.451 12.989c0 .751.081 1.059.179.683a3.215 3.215 0 000-1.367c-.098-.376-.179-.068-.179.684m207.422 0c0 .751.081 1.059.179.683a3.215 3.215 0 000-1.367c-.098-.376-.179-.068-.179.684m-207.422 9.375c0 .751.081 1.059.179.683a3.215 3.215 0 000-1.367c-.098-.376-.179-.068-.179.684m207.422 0c0 .751.081 1.059.179.683a3.215 3.215 0 000-1.367c-.098-.376-.179-.068-.179.684m-89.543 32.421v8.594h-17.579V247.656h17.969v-9.57c0-5.264-.088-9.57-.195-9.57-.108 0-.195 3.867-.195 8.593m8.284 5.762l-.081 4.785h3.367c3.255 0 10.44-.867 12.844-1.55.744-.211-1.921-.345-7.311-.368l-8.481-.035-.128-3.808c-.128-3.803-.128-3.802-.21.976m-89.415 5.077c2.537.068 6.58.068 8.985 0 2.404-.069.329-.125-4.612-.124-4.942 0-6.909.056-4.373.124m-6.565 25.49c1.493 1.503 2.802 2.734 2.909 2.734.107 0-1.026-1.231-2.518-2.734-1.493-1.504-2.802-2.735-2.909-2.735-.107 0 1.026 1.231 2.518 2.735m146.865.097l-2.724 2.832 2.832-2.724c2.63-2.53 3.01-2.94 2.724-2.94-.06 0-1.334 1.275-2.832 2.832m-78.603 30.25c.376.098.991.098 1.367 0s.068-.179-.683-.179c-.752 0-1.06.081-.684.179m9.375 0c.376.098.991.098 1.367 0s.068-.179-.683-.179c-.752 0-1.06.081-.684.179"
            fill="#98a8d6"
          />
          <Path
            d="M205.27 158.102l8.786.116.106 21.184.106 21.184-.005-21.289-.005-21.289-8.887-.011-8.887-.012 8.786.117m17.875-.01c.59.09 1.557.09 2.148 0 .591-.089.107-.162-1.074-.162-1.182 0-1.665.073-1.074.162m-36.447 9.779l-1.346 1.465 1.464-1.346c.806-.741 1.465-1.4 1.465-1.465 0-.298-.33-.017-1.583 1.346m36.642 8.186a5.574 5.574 0 001.758 0c.483-.093.088-.169-.879-.169s-1.363.076-.879.169m-47.772 3.338l-1.545 1.66 1.661-1.544c1.544-1.436 1.839-1.777 1.544-1.777-.064 0-.811.747-1.66 1.661m-5.646 3.222c.729.752 1.413 1.367 1.52 1.367.108 0-.401-.615-1.129-1.367-.729-.752-1.414-1.367-1.521-1.367-.107 0 .401.615 1.13 1.367m22.461 5.747c-2.149 2.204-3.167 3.322-2.262 2.485l1.644-1.523.113 3.345.114 3.345 2.262-2.484 2.261-2.484-.113-3.346-.113-3.345-3.906 4.007m-10.171 10.562l-1.939 2.051 2.051-1.939c1.128-1.066 2.051-1.989 2.051-2.051 0-.291-.362.033-2.163 1.939m-53.906 29.004c0 10.957.05 15.495.112 10.086.061-5.41.061-14.375 0-19.922-.061-5.548-.112-1.121-.112 9.836m17.967 2.734c0 9.453.051 13.264.113 8.47a781.55 781.55 0 000-17.188c-.062-4.658-.113-.735-.113 8.718"
            fill="#7474a3"
          />
        </G>
      </Svg>
    )
  }
  

export function Item ({ title}){
    const user = auth.currentUser;
    const [userData, setUserData] = useState("");
    const getUser = async() => {
      db.collection('doctors').doc(user.email).collection('treats').doc().get()
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
  return(
    <View style={styles.item}>
      <Text style={styles.itemText}>{item.name}   </Text>
      <View>
        <Text style={styles.itemText}>E-mail : {item.email}</Text>
        <Text style={styles.itemText}>GSM : {item.phone}</Text>
      </View>
      <View style={{position:'absolute',bottom:4,right:4 , width:"50%",height:"25%" , flexDirection:'row'}}>
        <TouchableOpacity style={styles.showBtn}  >
          <Text style={{color:"#fff"}}>Consulter</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteBtn}onPress={(item) => deletePatient(item.email)} >
          <Text style={{color:"#fff"}}>Supprimer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const deletePatient = async() => {

}

export function DoctorDashboard({ navigation }){
      const TriangleCorner = () => {
          return <View style={[styles.triangleCorner]} />;
        };
      
      const user = auth.currentUser;
      const [userData, setUserData] = useState("");
      const [patientEmail, setPatientEmail] = useState(null);
      const [patientData , setPatientData] = useState("");
      const [DATA, setDATA] = useState(null);
      const [loading , setLoading] = useState(true);

      const getUser = async() => {
          db.collection('doctors').doc(user.email).get()
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
                  await db.collection('doctors').doc(user.email).collection('treats').get()
                  .then((querySnapchot) => {
                      querySnapchot.forEach(doc => {
                      const { name, email, phone } = doc.data();
                        list.push({
                            id:Math.random().toString(36).substring(7), 
                            name: name,
                            email: email,
                            phone: phone,
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
      

    const ajout = async() => {
          if( !patientEmail ){
                alert("Le champ cordonnées de recherche ne peut pas être vide");
            }
            else {
                    const email = patientEmail.toLowerCase();
                    db.collection('patients').doc(email).get()
                    .then((documentSnapchot) => {
                        if ( !documentSnapchot.exists){
                          alert("Cet idnetifiant n'existe pas dans notre bases de données")
                          
                        }
                        else {
                          
                          db.collection('patients').doc(email).collection('doctor').get()
                          .then((querySnapchot) => {
                            if ( querySnapchot.exists){
                                alert("Ce patient est déjà assigné ")
                            }
                            else{
                              setPatientData(documentSnapchot.data());
                            
                              db.collection('doctors').doc(user.email).collection('treats').doc(email).set({
                                  name : patientData.displayName,
                                  email: patientData.email,
                                  phone: patientData.GSM,
                                  gender: patientData.gender,
                                  profilePic: patientData.profilePic? patientData.profilePic : null,
                              })
                              .then (
                                db.collection('patients').doc(email).collection('doctor').doc(user.email).set({
                                    email :userData.email,
                                    name  :userData.displayName,
                                })
                                .then (() => alert('Patient ajouté'))
                                  
                              )
                            }
                          })
                        }  

                    });
                }
    };


      return(
          <SafeAreaView  style={{flex:1, backgroundColor:"#fff"}} >      
              <ScrollView contentContainerStyle={styles.container}>
              <View style={{position:'absolute',top:0,right:0,zIndex:999}}><SvgComponent /></View>
              <TriangleCorner />
              <View style={styles.headerTitle}>
                  <TouchableOpacity>
                      <AntDesign name="bars" size={28} color="#000c66" onPress={() => navigation.openDrawer()}/>
                  </TouchableOpacity>
                  <Text style={styles.title}>Tableau de bord</Text>
              </View>
              <Animatable.View 
                  style={styles.greeting}
                  animation="fadeInLeft"
                  duration={2}
                  easing="ease"
                  iterationCount={1}
                  direction="alternate">
                      <Text style={{fontFamily:'Nexa-Bold', color:"#000c66",fontSize:40}}>
                      Bonjour
                      <Text style={{color:"#5f99ea"}}> {userData.displayName}</Text>
                      </Text>
              </Animatable.View>
                  <Animatable.View  
                      style={{width:"50%", height:4,borderRadius:2,backgroundColor:'#000c66',marginBottom:20}}
                      animation="fadeInUp"
                      easing="ease"
                      iterationCount={1}
                      >
                  </Animatable.View>
              <View style={styles.cards}>
                <Text style={styles.cardTitle}>Ajouter un Patient</Text>  
                  <View style={styles.add}>
                    <TextInput style={styles.input}
                        placeholder="saisir l'email du patient à ajouter"
                        value={patientEmail}
                        onChangeText={(value) => setPatientEmail(value)}
                    />
                    <View style={styles.search}>
                      <TouchableOpacity style={{flexDirection:'row'}}  onPress={ajout} >
                        <Ionicons name="add-circle-outline" size={16} color="#000c66" />
                        <Text style={{fontFamily:'Nexa-Bold',color:'#000',fontSize:16}}>Ajouter</Text>
                      </TouchableOpacity> 
                    </View>
                  </View>
              </View>
              <View style={[styles.cards, {paddingTop : 40}]}>
                  <Text style={styles.cardTitle}>Liste des Patients</Text> 
                  <FlatList
                      data={DATA}
                      renderItem={renderItem}
                      keyExtractor={item => item.id}
                      />
              </View>
              <View style={styles.cards}>

              </View>
                  
                  

                  <ActivityIndicator size='large' color='black'/>
              
              </ScrollView>
              </SafeAreaView>
      );
  }


const styles = StyleSheet.create({
    container: {
        width:"100%",
        alignItems: 'center',
        justifyContent: 'center',
      },
      headerTitle:{
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
        height:100,
        width:"100%",
        zIndex:-1,
        padding:20
      },
      title:{
        fontFamily:'Nexa-Bold',
        fontSize:22,
        color:'#000c66',
        marginLeft:20
      },
      greeting:{
        height:150,
        width:"100%", 
        justifyContent:'flex-start',
        paddingTop:40,
        paddingLeft:20,
        },
      add:{
        flexDirection:'column',
        width:"100%",
        marginTop:30,
        alignItems:'flex-start',
        justifyContent:'flex-start'
      },
      input:{
        backgroundColor:'#eaf0ff',
        padding:10,
        width:300,
        textAlign:'left',
        marginTop:5,
        fontFamily:'Nexa-Bold'
     },
      search:{
          justifyContent:'center',
          alignItems:'center',
          width:"100%",
          marginTop:25,
        },
      cards:{
          width:"90%",
          padding:10,
          margin:5,
          borderRadius:20,
          backgroundColor:'#f8faff',
          alignItems:'flex-start',
      },
      cardTitle:{
          position:'absolute', 
          top:15,
          left:15, 
          fontFamily:'Marta-Regular', 
          color:'#666'
        },
      cardText:{
          fontFamily:'Nexa-Light', 
          fontSize:14, color:"#0000ff", 
          marginTop:10
       },
       triangleCorner: {
        position:'absolute',
        top:0,
        right:0,
        width: 0,
        height: 0,
        backgroundColor: "transparent",
        borderStyle: "solid",
        borderRightWidth: 120,
        borderTopWidth: 120,
        borderRightColor: "transparent",
        borderTopColor: "#000c66",
        transform: [{ rotate: "90deg" }],
      },
      item: {
        paddingLeft: 20,
        width:300,
        height:80,
        justifyContent:'center',
        borderColor:'#000c66',
        borderWidth:1,
        borderRadius:8,
        marginBottom:3


      },
      itemText: {
        fontSize: 14,
        fontFamily:'Nexa-Light'
      },
      showBtn:{
        backgroundColor:"#5f99ea",
        borderRadius:4,
        height:"100%",
        width:"48%", 
        margin:2,
        alignItems:'center',
        justifyContent:'center'
      },
      deleteBtn:{
        backgroundColor:"red",
        borderRadius:4,
        height:"100%", 
        width:"48%", 
        margin:2,
        alignItems:'center',
        justifyContent:'center'
      }
    
    });


    const pickerSelectStyles = StyleSheet.create({
        inputAndroid: {
          fontFamily:'Nexa-Bold',
          fontSize:14,
          color: '#000',
          backgroundColor:'#eaf0ff',
          textAlign:'left',
          height:"100%",
          width:300,
          padding:10
        }
      });