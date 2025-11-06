import React, { Component } from "react";
import { View, Text, Pressable, StyleSheet, TextInput } from "react-native";
import { auth, db } from "../firebase/config";

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      error: "",
    };
  }

  Register(username, email, password) {
    if (username.length < 3) {
      this.setState({ error: "El nombre de usuario debe tener al menos 3 caracteres" });
      return;
    }

    if (!email.includes("@")) {
      this.setState({ error: "El email debe contener @" });
      return;
    }

    if (password.length < 6) {
      this.setState({ error: "La contraseña debe tener más de 6 caracteres" });
      return;
    }
    

    auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        db.collection("users").add({
          owner: email,
          username: username,
          createdAt: Date.now(),
        });
      })
      .then(() => {
        this.props.navigation.navigate("Login");
      })
      .catch((error) => {
        this.setState({ error: "Error al registrarse. Verificá los datos." });
        console.log(error);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>REGISTRÁ TU USUARIO</Text>

        <TextInput
          style={styles.field}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholder="Correo electrónico"
          onChangeText={(text) => this.setState({ email: text })}
          value={this.state.email}
        />

        <TextInput
          style={styles.field}
          placeholder="Nombre de usuario"
          onChangeText={(text) => this.setState({ username: text })}
          value={this.state.username}
        />

        <TextInput
          style={styles.field}
          placeholder="Contraseña"
          secureTextEntry
          onChangeText={(text) => this.setState({ password: text })}
          value={this.state.password}
        />

        {this.state.error ? (
          <Text style={styles.errorText}>{this.state.error}</Text>
        ) : null}

        <Pressable
          style={styles.button}
          onPress={() =>
            this.Register(this.state.username, this.state.email, this.state.password)
          }
        >
          <Text style={styles.buttonText}>Registrarse</Text>
        </Pressable>

        <Pressable
          style={styles.secondaryButton}
          onPress={() => this.props.navigation.navigate("Login")}
        >
          <Text style={styles.login}>Ya tengo cuenta</Text>
        </Pressable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 16,
  },
  field: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
    fontWeight: "600",
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
  },
  secondaryButton: {
    marginTop: 12,
    alignItems: "center",
  },
  login: {
    color: "#007bff",
  },
});
