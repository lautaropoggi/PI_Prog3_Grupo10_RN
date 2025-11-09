import React, { Component } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { auth, db } from "../firebase/config";
import { FlatList } from "react-native-web";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: auth.currentUser ? auth.currentUser.email : "",
      user: [],
      posts: []
    };
  }

componentDidMount() {
  db.collection("users").where("owner" , "==", this.state.email).onSnapshot((docs) => {
    let userDoc = [];
    docs.forEach((doc) => {
    
      userDoc.push({
      user: doc.data()
      })
    });
    this.setState({user: userDoc[0].user});
  });

  db.collection("posts").where("owner" , "==", this.state.email).onSnapshot((docs) => {
    let postsDocs = [];
    docs.forEach((doc) => {
   
      postsDocs.push({
        post: doc.data()
      });
      console.log("b" + postsDocs)  
    });
    this.setState({posts: postsDocs});
  });
}

  Logout() {
    console.log(this.state.user);
    auth
      .signOut()
      .then(() => {
        this.props.navigation.navigate("Login");
      })
      .catch((error) => console.log("Error al desloguearse:", error));
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.usuario}>{this.state.user.username}</Text>
        <Text style={styles.mail}>{this.state.user.owner}</Text>
<Text style={styles.text}>Cantidad de posteos: {this.state.posts.length}</Text>

  {this.state.posts.length != 0 ? (
                   <View style={styles.FlatListContainer}>
                           <FlatList
                             data={this.state.posts}
                             keyExtractor={(item) => item.id}
                             renderItem={({ item }) => (
                              <View style={styles.card}>
                          <Text>{item.post.posteo}</Text> 
                        <Text>Likes: {item.post.likes.length} Comentarios: {item.post.comentarios.length}</Text>
                        </View>
                             )}
                           />
                         </View>) : (<Text style={styles.text}>No hay posteos aun</Text>)}

        <Pressable style={styles.logoutButton} onPress={() => this.Logout()}>
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </Pressable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {marginBottom: 20, padding: 10, borderWidth: 1, borderColor: '#ccc', borderRadius: 5},
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
    FlatListContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  usuario: {
    fontSize: 25,
    fontWeight: "700",
    marginBottom: 10,
  },
  mail: {
    fontSize: 14,
    marginBottom: 10,},
  logoutButton: {
    backgroundColor: "#dc3545",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignItems: "center",
  },
  logoutText: {
    color: "#fff",
    fontWeight: "700",
  },
});
