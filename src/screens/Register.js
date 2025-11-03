import React, { Component } from "react";
import { View, Text, Pressable, StyleSheet, TextInput } from "react-native";
import { auth, db } from "../firebase/config";

export default class Register extends Component {
  constructor(props){
    super(props);
    this.state = { 
      username: "",
      password: "", 
      email: "",
      error: "",
    };
  }

  Register(username, email, password) {
    if (!(username.length >= 3)) {
      this.setState({ error: "El nombre de usuario debe tener al menos 3 caracteres" });
      return;
    }
    if (!email.includes("@")) {
      this.setState({ error: "Email mal formateado" });
      return;
    }
    if (!(password.length >= 6)) {
      this.setState({ error: "La password debe tener una longitud mínima de 6 caracteres" });
      return;
    }

    this.setState({ error: "" });

    auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        db.collection("users")
          .add({
            email: auth.currentUser.email,
            username: username,
            createdAt: Date.now(),
          })
          .then(() => {
            this.props.navigation.navigate("Login");
          })
          .catch(() => {
            this.setState({ error: "No se pudo guardar el usuario en la base de datos" });
          });
      })
      .catch((error) => {
        let msg = "No se pudo crear la cuenta";
        if (error.code === "auth/email-already-in-use") msg = "El email ya está registrado";
        this.setState({ error: msg });
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>REGISTRÁ TU USUARIO</Text>

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="tu@correo.com"
            keyboardType="default"
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={(text) => this.setState({ email: text })}
            value={this.state.email}
          />
          <TextInput
            style={styles.input}
            placeholder="nombre de usuario"
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={(text) => this.setState({ username: text })}
            value={this.state.username}
          />
          <TextInput
            style={styles.input}
            placeholder="••••••••"
            secureTextEntry
            autoCapitalize="none"
            onChangeText={(text) => this.setState({ password: text })}
            value={this.state.password}
          />
          {this.state.error ? (
            <Text style={{ color: "red", textAlign: "center" }}>{this.state.error}</Text>
          ) : null}
          <Pressable
            style={styles.button}
            onPress={() =>
              this.Register(this.state.username, this.state.email, this.state.password)
            }
          >
            <Text style={styles.buttonText}>Enviar Registro</Text>
          </Pressable>

         <Pressable onPress={() => navigation.navigate('Login')} >
          <Text style={styles.linkText}>Ya tengo cuenta</Text>
          </Pressable>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: "center", backgroundColor: "#ffffff" },
  title: { fontSize: 22, fontWeight: "700", textAlign: "center", marginBottom: 16 },
  form: { gap: 12 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: { color: "#fff", fontWeight: "700" },
});
