import React, { useState } from 'react';
import {View,Text,TextInput,StyleSheet,Dimensions,TouchableOpacity,Alert,ImageBackground,} from 'react-native';

const { width, height } = Dimensions.get('window');
const Settings = () => {
  // variables for the settings page that are used to update the users information.
  const [username, setUsername] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');


  // Function that is used to update the users information in the database.
  const handleUpdate = async (field, value) => {
    const endpoint = `http://xxx.xxx.x.xx:3000/update-${field}`;
    const body = { username, [field]: value };

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Success', data.message);
      } else {
        Alert.alert('Error', data.message);
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred. Please try again.');
    }
  };

  // Styling for the Settings Page
  return (
    <ImageBackground source={require('./assets/background.png')} style={styles.container}>
      <Text style={styles.header}>Settings</Text>

      {/* Update Username */}
      <TextInput
        style={styles.input}
        placeholder="Current Username"
        placeholderTextColor="#ccc"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="New Username"
        placeholderTextColor="#ccc"
        value={newUsername}
        onChangeText={setNewUsername}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleUpdate('username', newUsername)}
      >
        <Text style={styles.buttonText}>Update Username</Text>
      </TouchableOpacity>

      {/* Update Password */}
      <TextInput
        style={styles.input}
        placeholder="Current Password"
        placeholderTextColor="#ccc"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="New Password"
        placeholderTextColor="#ccc"
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleUpdate('password', newPassword)}
      >
        <Text style={styles.buttonText}>Update Password</Text>
      </TouchableOpacity>

      {/* Update Weight */}
      <TextInput
        style={styles.input}
        placeholder="New Weight (kg)"
        placeholderTextColor="#ccc"
        keyboardType="numeric"
        value={weight}
        onChangeText={setWeight}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleUpdate('weight', weight)}
      >
        <Text style={styles.buttonText}>Update Weight</Text>
      </TouchableOpacity>

      {/* Update Height */}
      <TextInput
        style={styles.input}
        placeholder="New Height (cm)"
        placeholderTextColor="#ccc"
        keyboardType="numeric"
        value={height}
        onChangeText={setHeight}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleUpdate('height', height)}
      >
        <Text style={styles.buttonText}>Update Height</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      justifyContent: 'flex-start',
    },

    header: {
      fontSize: 28,
      fontWeight: 'bold',
      color: '#ffffff',
      marginBottom: 20,
      textShadowColor: 'rgba(0, 0, 0, 0.3)',
      textShadowOffset: { width: 2, height: 2 },
      textShadowRadius: 4,
      textAlign: 'center',
    },

    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      backgroundColor: '#e0e0e0', 
      padding: 10,
      borderRadius: 5,
      marginBottom: 10,
      color: '#000', 
    },

    button: {
      backgroundColor: '#FF8C00', 
      paddingVertical: 15,
      paddingHorizontal: 10,
      borderRadius: 30,
      alignItems: 'center',
      marginBottom: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 5,
    },
    
    buttonText: {
      color: '#ffffff',
      fontSize: 18,
      fontWeight: '600',
    },
  });
export default Settings;