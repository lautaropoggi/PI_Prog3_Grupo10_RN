import react from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Comments from "../screens/Comments";

const Stack = createNativeStackNavigator();

export default function StackComentarios() {
  return (
    <Stack.Navigator> 
     <Stack.Screen name="Commentarios" component={Comments} options={{headerShown: false}} />
        
    </Stack.Navigator>
    );
}