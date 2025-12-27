import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const Stack = createNativeStackNavigator();

// Placeholder Login Screen
const LoginScreen = () => (
  <View className="flex-1 bg-background items-center justify-center">
    <Text className="text-3xl font-bold text-primary">Sontya Parent</Text>
    <Text className="text-gray-500 mt-2">Mobile App Setup Complete!</Text>
    <StatusBar style="auto" />
  </View>
);

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}