import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput, Alert, ImageBackground } from 'react-native';

const Water_Tracker = () => {
  const [totalGallons, setTotalGallons] = useState('');
  const [currentGallons, setCurrentGallons] = useState(0);

  // This section is for the increase and decrease buttons for the water intake.
  const increaseInGallons = () => {
    if (currentGallons < parseInt(totalGallons)) {
      setCurrentGallons(currentGallons + 1);
    }
  };

  const decreaseInGallons = () => {
    if (currentGallons > 0) {
      setCurrentGallons(currentGallons - 1);
    }
  };

  const setMaxGallons = () => {
    const maxGallons = parseInt(totalGallons);
    if (!isNaN(maxGallons) && maxGallons > 0) {
      setCurrentGallons(0);
      setTotalGallons(maxGallons.toString());
    } else {
      Alert.alert('Error', 'Please enter a valid number for max gallons.');
    }
  };

  const updateWaterIntake = async () => {
    const username = '[USERNAME]'; // Currently hardcoded to [USERNAME], but can be changed to any user that is logged in. 

    // Updates the water intake for the user on the server / database.
    try {
      const response = await fetch('http://xxx.xxx.x.xx:3000/update-water-intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: username,
          gallons: currentGallons,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(`Water intake updated for ${username}: ${data.totalWaterIntake} gallons`);
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      alert('Failed to update water intake');
    }
  };

  // Styling for the Water Intake Page
  return (
    <ImageBackground source={require('../assets/background.png')} style={styles.container}>
      <Text style={styles.title}>Water Intake Tracker</Text>

      <TextInput
        style={styles.input}
        placeholder="Max Gallons per Day"
        value={totalGallons}
        onChangeText={setTotalGallons}
        keyboardType="numeric"
      />

      <Text style={styles.currentText}>Current Gallons: {currentGallons}</Text>

      <View style={styles.buttonContainer}>
        <Button title="Increase" onPress={increaseInGallons} color="#2196F3" />
        <Button title="Decrease" onPress={decreaseInGallons} color="#2196F3" />
        <Button title="Set Max Gallons" onPress={setMaxGallons} color="#2196F3" />
        <Button title="Update Water Intake" onPress={updateWaterIntake} color="#2196F3" />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2196F3', 
  },

  input: {
    borderWidth: 1,
    borderColor: '#2196F3', 
    padding: 10,
    width: '80%',
    marginBottom: 15,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
  },

  currentText: {
    fontSize: 20,
    color: '#FFFFFF', 
    marginBottom: 20,
  },

  buttonContainer: {
    width: '80%',
    marginTop: 20,
    justifyContent: 'space-between',
  },
  
});

export default Water_Tracker;