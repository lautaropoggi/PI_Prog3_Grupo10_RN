import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { FlatList } from 'react-native-web'



export default class Post extends Component {
  render() {
    return (
      <View style = {styles.flatlist}> 
      <FlatList
      data={[{nombre: "Lamine", id: 1}, {nombre: "Sadio", id: 2}, {nombre: "Mane", id: 3}]}
      keyExtractor={item => item.id.toString()}
      renderItem={({item}) => <Text>{item.nombre}</Text>}
     />
      </View>
    )
  }
}
const styles = {
  flatlist: {
  width: '100%',
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: 100,
  }
}