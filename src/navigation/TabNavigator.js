import react from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import {FontAwesome, MaterialCommunityIcons} from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator> 
      <Tab.Screen name="Home" component={Home} options={{headerShown: false, tabBarIcon: () => <FontAwesome name="home" size={24} color="black" /> }} />
      <Tab.Screen name="Profile" component={Profile} options={{headerShown: false,tabBarIcon: () => <MaterialCommunityIcons name="face-man-profile" size={24} color="black" />  }} />
     
    </Tab.Navigator>
    );
}