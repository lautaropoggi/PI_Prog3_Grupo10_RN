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
       error: ''

    };
  }

  Login(email, password) {

    if (!email.includes('@')) {
      this.setState({ error: 'El mail debe contener @' });
      return;
    }


    if (!(password.length >= 6)) {
      this.setState({ error: 'La contraseña debe tener mas de 6 caracteres' });
      return;
    }


   auth.signInWithEmailAndPassword(email,password)
          .then((user) => {this.props.navigation.navigate('TabNavigator',{screen: "Home"})})
          .catch((err)=> this.setState({error: err.message}, () => console.log("el error fue",err)) 
           )
        
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

        <Pressable
          style={styles.button}
          onPress={() => {
              this.Login(this.state.email, this.state.password);
              this.props.navigation.navigate('Home');
               }}
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
