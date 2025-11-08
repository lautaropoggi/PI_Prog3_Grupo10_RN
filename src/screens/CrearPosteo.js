import React, { Component } from "react";
import { Pressable, Text, TextInput, View, StyleSheet } from "react-native";
import { db, auth } from "../firebase/config";

export default class Posteo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posteo: "",
    };
  }
  CrearPosteo(descripcion) {
    if (descripcion !== "") {
      db.collection("posts")
        .add({
          owner: auth.currentUser.email,
          posteo: descripcion,  
          createdAt: Date.now(),
          likes: [],
          comentarios: []
        })
        .then((resp) => this.props.navigation.navigate("StackComentarios", { screen: "Home" }))
        .catch((err) => console.log(err));
    }
  }
  render() {
    return (
      <View style={styles.container}>

        <Text style={styles.title}>Crea tu posteo!</Text>

        <View style={styles.box}>
          <TextInput
            style={styles.input}
            keyboardType="default"
            placeholder="Escribe lo que quieras decir..."
            onChangeText={(text) => this.setState({ posteo: text })}
            value={this.state.posteo} />

          <Pressable
            style={styles.button}
            onPress={() => this.CrearPosteo(this.state.posteo)} >
            <Text style={styles.buttonText}>Publicar Posteo</Text>
          </Pressable>
          
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f6fa",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  box: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
    marginBottom: 16,
    fontSize: 16,
    color: "#333",
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});