
import React, { Component } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import firebase from "firebase";
import { db, auth } from "../firebase/config";

export default class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meGusta: false,
    };
  }
  componentDidMount(){
     let meGusta = this.props.data.likes.includes(auth.currentUser.email) 
     this.setState({
      meGusta: meGusta
     })
  }
    
  agregarMG() {
    db.collection("posts")
      .doc(this.props.id)
      .update({
        likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email),
      })
      .then(() =>
        this.setState({
          meGusta: true
        })
      );
  }
  sacarMG() {
    db.collection("posts")
      .doc(this.props.id)
      .update({
        likes: firebase.firestore.FieldValue.arrayRemove(
          auth.currentUser.email
        ),
      })
      .then(() =>
        this.setState({
          meGusta: false
        })
      );
  }
  render() {
    return (
      <View style={styles.container}>

        <Text style={styles.owner}>{this.props.data.owner}</Text>

        <Text style={styles.posteo}>{this.props.data.posteo}</Text>

        <Text>{this.props.data.descripcion}</Text>

        <View style={styles.botones}>
        {this.state.meGusta ? (
          <Pressable  onPress={() => this.sacarMG(this.props.id)}>
        <Text>{this.props.data.likes.length} <svg width="20" height="20" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">

  <path d="M100 170 L40 100 A30 30 0 1 1 100 60 A30 30 0 1 1 160 100 Z" fill="red"/>
</svg>
</Text>
          </Pressable>
        ) : (
          <Pressable  onPress={() => this.agregarMG(this.props.id)}>
            <Text>{this.props.data.likes.length} <svg width="20" height="20" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
 
  <path d="M100 170 L40 100 A30 30 0 1 1 100 60 A30 30 0 1 1 160 100 Z" fill="white" stroke="red" stroke-width="4"/>
</svg>
</Text>
          </Pressable>
        )}
      

        <Pressable
        style={styles.button}
          onPress={() =>
          this.props.pantalla === 'Profile' ?
            this.props.navigation.navigate("Home", {screen: "Comments",params: { id: this.props.id}})
          :
          this.props.navigation.navigate("Comments", { id: this.props.id}) }>
          <Text style={styles.buttonText}>Comentar</Text>
        </Pressable>

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    marginVertical: 10,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  owner: {
    fontSize: 14,
    fontWeight: "700",
    color: "#007bff",
    marginBottom: 6,
  },
  posteo: {
    fontSize: 16,
    color: "#333",
    marginBottom: 8,
  },
  botones: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
  },
});
