import react from "react";
import { createNativeStackNavigator, NavigationContainer } from "@react-navigation/native-stack";
import Register from "../screens/Register";
import Login from "../screens/Login";       
import Home from "../screens/Home";
import TabNavigator from "./TabNavigator";
import Comments from "../screens/Comments";

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
   
    <Stack.Navigator 
    initialRouteName="Login"> 
        <Stack.Screen name="Register" component={Register} options={{headerShown: false}} />
        <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
        <Stack.Screen name="Home" component={TabNavigator} options={{headerShown: false}} />
    </Stack.Navigator>

    );
}
