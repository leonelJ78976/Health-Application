import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground } from 'react-native';

const CreateAccountScreen = ({ navigation }) => {
  // Variables for the Create Account section / page
  const [name, setName] = useState('');
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [sex, setSex] = useState('');  
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');

  // Confirms wether or not the user is running the app on an emulator or not.
  // if the user is running the application on an emulator, the server URL will be http://10.0.2.2:3000
  // if the user is running the application on a physical device, the server URL will be http://xxx.xxx.x.xx:3000

  const isEmulator = /android/i.test(navigator.userAgent);
  const serverURL = isEmulator ? 'http://10.0.2.2:3000' : 'http://xxx.xxx.x.xx:3000';  

  // Creates the account for the user on the server / database.
  const createAccount = async () => {
    try {
      const response = await fetch(`${serverURL}/add-user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
          sex,
          weight,
          height,
        }),
      });

      const data = await response.json();

      if (response.status === 201) {
        navigation.navigate('Home');
      } else {
        alert('Error creating account: ' + data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Network error. Please check your connection and try again.');
    }
  };

  // Styling for the Create Account Page  
  return (
    <ImageBackground 
      source={require('./assets/background.png')}  
      style={styles.container}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Create Account</Text>

        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
          placeholderTextColor="#ffffff"  
        />
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUserName}
          placeholderTextColor="#ffffff"  
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholderTextColor="#ffffff"  
        />
        <TextInput
          style={styles.input}
          placeholder="Sex (male/female)"
          value={sex}
          onChangeText={setSex}
          placeholderTextColor="#ffffff"  
        />
        <TextInput
          style={styles.input}
          placeholder="Weight (lb)"
          keyboardType="numeric"
          value={weight}
          onChangeText={setWeight}
          placeholderTextColor="#ffffff"  
        />
        <TextInput
          style={styles.input}
          placeholder="Height (cm)"
          keyboardType="numeric"
          value={height}
          onChangeText={setHeight}
          placeholderTextColor="#ffffff"  
        />
        <TouchableOpacity style={styles.button} onPress={createAccount}>
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },

  title: {
    fontSize: 30,
    color: '#fff',
    marginBottom: 20,
  },

  input: {
    width: '100%',
    height: 50,
    borderColor: '#fff',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
    color: '#fff',
    borderRadius: 5,
  },

  button: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  
});

export default CreateAccountScreen;