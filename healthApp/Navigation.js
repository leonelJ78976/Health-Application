// Navigation file that is used to navigate between the pages of the application.
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';
import CreateAccountScreen from './CreateAccount';
import ForgotCredentials  from './forgotCredentials';
import Settings from './Settings';

// Importing pages from pages folder
import HeartRate from './pages/heart_rate';
import Blood_Pressure from './pages/blood_pressure';
import Water_Tracker from './pages/water_intake';
import Calorie_Tracker from './pages/calorie_intake';
import Workout_Tracker from './pages/workouts';
import Summary from './pages/summary';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name = "CreateAccount" component = {CreateAccountScreen} />
        <Stack.Screen name = "ForgotCredentials" component = {ForgotCredentials} />
        <Stack.Screen name = "HeartRate" component={HeartRate} />
        <Stack.Screen name = "BloodPressure" component={Blood_Pressure} />
        <Stack.Screen name = "WaterTracker" component={Water_Tracker} />
        <Stack.Screen name = "CalorieTracker" component={Calorie_Tracker} />
        <Stack.Screen name = "Workouts" component={Workout_Tracker} />
        <Stack.Screen name = "Summary" component={Summary} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;