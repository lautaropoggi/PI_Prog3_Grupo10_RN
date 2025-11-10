import React, { Component } from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import { db } from '../firebase/config';
import Post from '../components/Post';

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      posteosRecuperados: []
    }
  }

  componentDidMount() {
    db.collection('posts').orderBy('createdAt', 'desc').onSnapshot((docs) => {
      let postsDocs = []

      docs.forEach((doc) => {
        postsDocs.push({
          id: doc.id,
          data: doc.data()
        })
      })

      this.setState({
        posteosRecuperados: postsDocs
      })
    })
  }

  render() {
    console.log(this.state.posteosRecuperados);
    return (
      <View style={styles.container}>

        <Text style={styles.title}>Home</Text>

        <View style={styles.formContainer}>
          <FlatList
            data={this.state.posteosRecuperados}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Post data={item.data} id={item.id} navigation={this.props.navigation}  />
            )}
          />
        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f6fa",
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  formContainer: {
    flex: 1,
  },
  list: {
    paddingBottom: 20,
  },
  emptyText: {
    textAlign: "center",
    color: "#777",
    fontSize: 16,
    marginTop: 40,
  },
});
