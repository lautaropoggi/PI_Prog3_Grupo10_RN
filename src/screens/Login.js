import React, { Component } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { auth } from "../firebase/config";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      error: "",
    };
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.props.navigation.navigate("Home",);
      }
    });
  }

  Login(email, password) {
    if (!email.includes("@")) {
      this.setState({ error: "El mail debe contener @" });
      return;
    }

    if (password.length < 6) {
      this.setState({ error: "La contraseña debe tener más de 6 caracteres" });
      return;
    }

    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ error: "" });
        this.props.navigation.navigate("Home" );
      })
      .catch((error) => {
        this.setState({ error: "Credenciales incorrectas" });
        console.log("Error de login:", error);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>

        <TextInput
          style={styles.field}
          placeholder="Usuario"
          value={this.state.username}
          onChangeText={(text) => this.setState({ username: text })}
        />

        <TextInput
          style={styles.field}
          keyboardType="email-address"
          placeholder="Email"
          value={this.state.email}
          onChangeText={(text) => this.setState({ email: text })}
        />

        <TextInput
          style={styles.field}
          placeholder="Contraseña"
          secureTextEntry
          value={this.state.password}
          onChangeText={(text) => this.setState({ password: text })}
        />

    
        {!!this.state.error && (
          <Text style={styles.errorText}>{this.state.error}</Text>
        )}

        <Pressable
          style={styles.button}
          onPress={() => this.Login(this.state.email, this.state.password)}
        >
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>

        <Pressable
          style={styles.registerButton}
          onPress={() => this.props.navigation.navigate("Register")}
        >
          <Text style={styles.registerText}>No tengo cuenta</Text>
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
    backgroundColor: "#fff",
    marginBottom: 12,
  },
  errorText: {
    color: "red",
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "700" },
  registerButton: { marginTop: 12, alignItems: "center" },
  registerText: { color: "#007bff" },
});
