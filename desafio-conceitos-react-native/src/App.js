import React, { useEffect, useState } from "react";

import {
   SafeAreaView,
   View,
   FlatList,
   Text,
   StatusBar,
   StyleSheet,
   TouchableOpacity,
} from "react-native";

import api from "./services/api"

export default function App() {

   const [repositories, setRepositories] = useState([])

   useEffect(() => {
      api.get("repositories").then(response => {
         console.log(response.data)
         setRepositories(response.data)
      })
   }, [])

   async function handleLikeRepository(id) {
      const response = await api.post(`repositories/${id}/like`)
      const likedRepository = response.data

      console.log(likedRepository)

      const updateRepositories = repositories.map(rep => {
         if(rep.id == id)
            return likedRepository
         return rep
      }) 

      setRepositories(updateRepositories)
   }

   return (
      <>
         <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
         <SafeAreaView style={styles.container}>
            <FlatList
               data={repositories}
               keyExtractor={rep => rep.id}
               renderItem={({ item: rep }) => (
                  <View style={styles.repositoryContainer}>
                     <Text style={styles.repository}>{rep.title}</Text>

                     <View style={styles.techsContainer}>
                        <FlatList 
                           data={rep.techs}
                           keyExtractor={tech => tech}
                           horizontal={true}
                           renderItem={({ item: tech }) => (
                              <Text style={styles.tech}>
                                 {tech}
                              </Text>
                           )}
                        />
                     </View>

                     <View style={styles.likesContainer}>
                        <Text
                           style={styles.likeText}
                           testID={`repository-likes-${rep.id}`}
                        >
                           {rep.likes} curtidas
                        </Text>
                     </View>

                     <TouchableOpacity
                        style={styles.button}
                        onPress={() => handleLikeRepository(rep.id)}
                        testID={`like-button-${rep.id}`}
                     >
                        <Text style={styles.buttonText}>Curtir</Text>
                     </TouchableOpacity>
                  </View>
               )}
            />
         </SafeAreaView>
      </>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "#7159c1",
   },
   repositoryContainer: {
      marginBottom: 15,
      marginHorizontal: 15,
      backgroundColor: "#fff",
      padding: 20,
      borderRadius: 5,
   },
   repository: {
      fontSize: 32,
      fontWeight: "bold",
   },
   techsContainer: {
      flexDirection: "row",
      marginTop: 10,
   },
   tech: {
      fontSize: 12,
      fontWeight: "bold",
      marginRight: 10,
      backgroundColor: "#04d361",
      paddingHorizontal: 10,
      paddingVertical: 5,
      color: "#fff",
   },
   likesContainer: {
      marginTop: 15,
      flexDirection: "row",
      justifyContent: "space-between",
   },
   likeText: {
      fontSize: 14,
      fontWeight: "bold",
      marginRight: 10,
   },
   button: {
      marginTop: 10,
   },
   buttonText: {
      fontSize: 14,
      fontWeight: "bold",
      marginRight: 10,
      color: "#fff",
      backgroundColor: "#7159c1",
      padding: 15,
      borderRadius: 5,
   },
});
