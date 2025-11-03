import React, { Component } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { auth } from "../firebase/config";
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  Login(email, password) {

    if (!email.includes('@')) {
      this.setState({ error: 'Email mal formateado' });
      return;
    }


    if (!(password.length >= 6)) {
      this.setState({ error: 'La password debe tener una longitud mínima de 6 caracteres' });
      return;
    }


    this.setState({ error: '' });
    auth
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        this.setState({ loggedIn: true });
        this.props.navigation.replace('TabNavigation');
      })
      .catch((error) => {
        this.setState({ error: 'Credenciales incorrectas' });
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>

        <TextInput
          style={styles.field}
          keyboardType="email-address"
          placeholder="email"
          autoCapitalize="none"
          autoCorrect={false}
          value={this.state.email}
          onChangeText={(text) => this.setState({ email: text })}
        />

        <TextInput
          style={styles.field}
          placeholder="password"
          secureTextEntry
          autoCapitalize="none"
          value={this.state.password}
          onChangeText={(text) => this.setState({ password: text })}
        />

        <Pressable
          style={styles.button}
          onPress={() => this.Login(this.state.email, this.state.password)}
        >
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>
        <Pressable
          style={styles.registerButton}
          onPress={() => this.props.navigation.navigate('Register')}
        >
          <Text style={styles.registerText}>No tengo cuenta</Text>
        </Pressable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: "center", backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "700", textAlign: "center", marginBottom: 16 },
  field: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "700" },
});
