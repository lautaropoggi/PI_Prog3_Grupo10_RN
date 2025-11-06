import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { FlatList } from 'react-native-web'
import { StyleSheet } from 'react-native'
import {db,auth} from '../firebase/config'


export default class Post extends Component {
constructor(props){
    super(props)
    this.state = {
      posts: []
    }

      db.collection('posts').onSnapshot(
    docs => {
      let posts = []
      docs.forEach( doc => {
        posts.push({
          id: doc.id,
          data: doc.data()
        })
        this.setState({
          posts: posts
        })   
        console.log(this.state.posts)
      })
    })

  }



  render() {
    return (
      <View style = {styles.flatlist}> 
      <FlatList
      data={[{nombre: "Lamine", id: 1}, {nombre: "Sadio", id: 2}, {nombre: "Mane", id: 3}, {nombre: "Keita", id: 4}, {nombre: "Diaz", id: 5}, {nombre: "Firmino", id: 6}, {nombre: "Alisson", id: 7}]}
      keyExtractor={item => item.id.toString()}
      renderItem={({item}) => 
    
    <View style = {styles.post}>
        <Text>{item.nombre}</Text>
        <Text>TEXT</Text>
      </View> 
    }>

    </FlatList>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  flatlist: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    marginTop: 20,

  },
  post: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    width: 300,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  } 
})