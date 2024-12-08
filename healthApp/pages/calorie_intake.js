import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert, ScrollView, ImageBackground } from 'react-native';

const Calorie_Tracker = () => {
  const [caloriesDaily, setCaloriesDaily] = useState('');
  const [userFood, setUserFood] = useState('');
  const [calories, setCalories] = useState('');
  const [foodLog, setFood] = useState([]);
  const [totalCalories, setTotalCalories] = useState(0);
  const username = '[USERNAME]'; // Currently hardcoded to [USERNAME], but can be changed to any user that is logged in. 

  // Adds food to the calorie intake log
  const addFood = async () => {
    if (!userFood || !calories) {
      Alert.alert('Error', 'Please enter both food and the amount of calories');
      return;
    }

    try {
      const response = await fetch('http://xxx.xxx.x.xx:3000/update-calories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          calories: Number(calories),
        }),
      });

      const result = await response.json();

      // If the request and information is sent succesfully, application will alert the user and update the calorie intake log showing the food and calories
      if (response.ok) {
        Alert.alert(
          'Success',
          `${userFood} with ${calories} calories has been added. Total calories: ${result.totalCalories}`
        );
        setFood([...foodLog, { item: userFood, calories: Number(calories) }]);
        setTotalCalories(result.totalCalories);
        setUserFood('');
        setCalories('');
      } else {
        Alert.alert('Error', result.message || 'Failed to update calories');
      }
    } catch (error) {
      Alert.alert('Error', 'Unable to connect to the server');
      console.error(error);
    }
  };

  // Styling for the Calorie Intake Page
  return (
    <ImageBackground source={require('../assets/background.png')} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {/* Header */}
        <Text style={styles.title}>Calorie Tracker</Text>

        {/* Daily Calorie Goal Section */}
        <View style={styles.goalSection}>
          <TextInput
            style={styles.input}
            placeholder="Enter Daily Calorie Goal"
            value={caloriesDaily}
            keyboardType="numeric"
            onChangeText={setCaloriesDaily}
          />
          <Text style={styles.goalText}>
            Daily Calorie Goal: {caloriesDaily} calories
          </Text>
        </View>

        {/* Food Entry Section */}
        <View style={styles.entrySection}>
          <TextInput
            style={styles.input}
            placeholder="Name of Food"
            value={userFood}
            onChangeText={setUserFood}
          />
          <TextInput
            style={styles.input}
            placeholder="Total Calories"
            value={calories}
            onChangeText={setCalories}
            keyboardType="numeric"
          />
          <Button 
            title="Add Food" 
            onPress={addFood} 
            color="1e90ff" 
          />
        </View>

        {/* Summary Section */}
        <View style={styles.summaryContainer}>
          <Text style={styles.summaryTitle}>
            Total Calories Consumed: {totalCalories}
          </Text>
        </View>

        {/* Food Log Section */}
        <View style={styles.foodLog}>
          <Text style={styles.logTitle}>Food Log</Text>
          {foodLog.length > 0 ? (
            foodLog.map((entry, index) => (
              <Text key={index} style={styles.logItem}>
                {entry.item} - {entry.calories} calories
              </Text>
            ))
          ) : (
            <Text style={styles.noFoodText}>
              No food has been entered yet
            </Text>
          )}
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

// Styling for the Calorie Tracker Page
const styles = StyleSheet.create({
  // Main container styling
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-start',
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },

  // ScrollView styling
  scrollView: {
    flexGrow: 1,
    paddingBottom: 20,
  },

  // Title text styling
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center', 
    marginBottom: 20,
  },

  // Input field styling
  input: {
    borderWidth: 1,
    borderColor: '1e90ff',
    borderRadius: 10,
    padding: 12,
    marginVertical: 12,
    width: '100%',
    fontSize: 16,
    backgroundColor: '#FFFFFF',

    // Shadow effect for input fields
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  // Goal text styling
  goalText: {
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 10,
    color: '#FFFFFF',
  },

  // Summary section container styling
  summaryContainer: {
    marginVertical: 20,
    padding: 15,
    backgroundColor: '1e90ff',
    borderRadius: 8,
    alignItems: 'center',
  },

  // Summary title text styling
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },

  // Food log section styling
  foodLog: {
    marginTop: 30,
  },

  // Log title styling
  logTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FFFFFF',
  },

  // Individual log item styling
  logItem: {
    fontSize: 16,
    marginBottom: 8,
    color: '#FFFFFF',
  },

  // Empty food log message styling
  noFoodText: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#BBBBBB',
  },
});

export default Calorie_Tracker;