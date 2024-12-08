import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';

// Login Page which takes the users username, and password in which is sent to the server to verify the users credentials.
const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Login Process Verification
  const handleLogin = async () => {
    const loginData = { username, password };

    try {
      const response = await fetch('http://xxx.xxx.x.xx:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (data.success) {
        navigation.navigate('Home', { username });
      } else {
        setErrorMessage(data.message || 'Incorrect username or password');
      }
    } catch (error) {
      setErrorMessage('Network Request Error: ' + error.message);
    }
  };


  // Styling for the Login Page
  return (
    <ImageBackground source={require('./assets/background.png')} style={styles.container}>
      <View style={styles.overlay}>
        <Text style={styles.title}>Login</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#ddd"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#ddd"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>
        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.linkButton}
          onPress={() => navigation.navigate('CreateAccount')}
        >
          <Text style={styles.linkText}>Don't have an account? Create one</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.linkButton}
          onPress={() => navigation.navigate('ForgotCredentials')}
        >
          <Text style={styles.linkText}>Forgot Username / Password?</Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>
          FrontEnd: Leonel J, BackEnd: Diego T, Gustavo G
        </Text>
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
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)', 
    justifyContent: 'center',
    width: '100%',
    padding: 20,
  },

  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 40,
    textAlign: 'center',
  },

  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },

  input: {
    height: 50,
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 30,
    paddingHorizontal: 15,
    fontSize: 18,
    marginBottom: 15,
    color: '#fff',
    backgroundColor: 'rgba(255, 255, 255, 0.2)', 
  },

  button: {
    backgroundColor: '#6200EE', 
    height: 50,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 20,
  },

  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },

  linkButton: {
    marginTop: 15,
  },

  linkText: {
    color: '#fff',
    fontSize: 16,
    textDecorationLine: 'underline',
  },

  footerText: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 14,
  },

  errorText: {
    color: 'red',
    marginBottom: 15,
    textAlign: 'center',
  },

});

export default LoginScreen;