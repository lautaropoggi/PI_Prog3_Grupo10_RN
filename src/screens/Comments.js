import React, { Component } from "react";
import { View, Text, TextInput, Pressable, FlatList, StyleSheet } from "react-native";
import firebase from "firebase";
import { db, auth } from "../firebase/config";

export default class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posteo: "",
      comentario: "",
      comentarios: [],
      owner: ''
    };

  }
  componentDidMount() {
    const posteoId = this.props.route.params.id;

    db.collection("posts")
      .doc(posteoId)
      .onSnapshot((doc) => {
        let posteo = doc.data().posteo;
        let comentarios = doc.data().comentarios;
        let owner = doc.data().owner
        
        this.setState({
          posteo: posteo,
          comentarios: comentarios,
          owner: owner
        });
      });
  }
  crearComentario() {
    if (this.state.comentario !== "") {
      const posteoId = this.props.route.params.id;
      db.collection("posts")
        .doc(posteoId)
        .update({
          comentarios: firebase.firestore.FieldValue.arrayUnion({
            user: auth.currentUser.email,
            descripcion: this.state.comentario,
            createdAt: Date.now(),
          }),
        })
        .then((resp) => this.setState({ comentario: "" }))
        .catch((err) => console.log(err));
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Posteo</Text>
        <View style={styles.posteo}>
          <Text style={styles.owner}>{this.state.owner}</Text>
          <Text style={styles.posteoText}>{this.state.posteo}</Text>
        </View>
       
        <Text style={styles.title}>Comentarios</Text>
        { this.state.comentarios.length != 0 ?
         <FlatList style={styles.flatList} data={this.state.comentarios} keyExtractor={(item) => item.id} 
        renderItem={({ item }) => (
          <View style={styles.commentBox}>
            <Text style={styles.comentarios}>{item.user}: {item.descripcion}</Text>
          </View>
        )}/> :
        <Text>No hay comentarios</Text> 
        }
        
        <View style={styles.formContainer} >
        <TextInput 
          placeholder="Comenta aqui el posteo !"
          onChangeText={(text) => this.setState({ comentario: text })}
          keyboardType="default"
          value={this.state.comentario}
        />

        <Pressable style={styles.button} onPress={() => this.crearComentario()}>
          <Text style={styles.buttonText}>Publicar Comentario</Text>
        </Pressable>

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f6fa",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 12,
    color: "#333",
  },
  posteo: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 14,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  owner: {
    fontSize: 14,
    fontWeight: "700",
    color: "#007bff",
    marginBottom: 6,
  },
  posteoText: {
    fontSize: 16,
    color: "#333",
  },
  flatList: {
    marginBottom: 20,
  },
  commentBox: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    marginVertical: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  
  },
  comentarios: {
    fontSize: 15,
    color: "#333",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 10,
    marginBottom: 8,
    textAlign: "center",
    color: "#444",
  },
  formContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
    marginBottom: 14,
    fontSize: 16,
    color: "#333",
    
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 15,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});