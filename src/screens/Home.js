import { Text, View } from 'react-native'
import React, { Component } from 'react'
import Post from '../components/Post'


export default class Home extends Component {
  render() {
    return (
      <View>
<Post/>
        <Text>Home</Text>
      </View>
    )
  }
}